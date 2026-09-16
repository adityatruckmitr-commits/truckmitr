import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiClient } from '../services/api/apiClient';
import { INITIAL_ROLE_PERMISSIONS } from '../services/mockRbacData';
import { SYSTEM_MODULES, SYSTEM_ROLES } from '../utils/rbacConstants';
import { useAuth } from './AuthContext';

const PermissionContext = createContext(null);

export const PermissionProvider = ({ children }) => {
  const { activeRole, currentUser } = useAuth();

  // Role-Permissions state (maps roleId -> moduleSlug -> { view, create, edit, delete, approve, export, scope })
  const [rolePermissions, setRolePermissions] = useState(() => {
    const saved = localStorage.getItem('tm_one_role_permissions');
    return saved ? JSON.parse(saved) : INITIAL_ROLE_PERMISSIONS;
  });

  const [matrixData, setMatrixData] = useState(null);

  // Fetch full roles matrix from backend API
  const fetchRolesMatrix = useCallback(async () => {
    try {
      const res = await apiClient.get('/roles');
      if (res.data && res.data.matrix) {
        setMatrixData(res.data);
        setRolePermissions(res.data.matrix);
        localStorage.setItem('tm_one_role_permissions', JSON.stringify(res.data.matrix));
      }
    } catch (err) {
      console.warn('API roles fetch fallback to local permission matrix:', err.message);
    }
  }, []);

  useEffect(() => {
    fetchRolesMatrix();
    const handleRoleSwitch = () => fetchRolesMatrix();
    window.addEventListener('tm_role_switched', handleRoleSwitch);
    return () => window.removeEventListener('tm_role_switched', handleRoleSwitch);
  }, [fetchRolesMatrix]);

  // Find active role's ID
  const activeRoleObj = SYSTEM_ROLES.find((r) => r.slug === activeRole) || SYSTEM_ROLES[0];
  const activeRoleId = activeRoleObj.id;

  /**
   * Check if active role has permission for a specific action on a module
   * e.g. can('drivers', 'edit') => true/false
   */
  const can = (moduleSlug, action = 'view') => {
    // Admin always has full access
    if (activeRole === 'admin') return true;

    // Check user's direct permissions map if provided by server
    if (currentUser && currentUser.permissions && currentUser.permissions[moduleSlug]) {
      const perms = currentUser.permissions[moduleSlug];
      if (perms[action] !== undefined) {
        return Boolean(perms[action]);
      }
    }

    const currentRolePerms = rolePermissions[activeRoleId] || rolePermissions[activeRole];
    if (!currentRolePerms || !currentRolePerms[moduleSlug]) {
      return false;
    }

    return Boolean(currentRolePerms[moduleSlug][action]);
  };

  /**
   * Get row-level scope for a module (ALL, DEPARTMENT, ASSIGNED_ONLY)
   */
  const getScope = (moduleSlug) => {
    if (activeRole === 'admin') return 'ALL';

    if (currentUser && currentUser.permissions && currentUser.permissions[moduleSlug]) {
      return currentUser.permissions[moduleSlug].scope || 'ALL';
    }

    const currentRolePerms = rolePermissions[activeRoleId] || rolePermissions[activeRole];
    if (!currentRolePerms || !currentRolePerms[moduleSlug]) {
      return 'ALL';
    }
    return currentRolePerms[moduleSlug].scope || 'ALL';
  };

  /**
   * Check if current active role matches
   */
  const hasRole = (roleSlug) => {
    if (Array.isArray(roleSlug)) {
      return roleSlug.includes(activeRole);
    }
    return activeRole === roleSlug;
  };

  /**
   * Update permission toggle in the dynamic matrix and persist to backend
   */
  const updateRolePermission = async (roleId, moduleSlug, action, value) => {
    // Optimistic local update
    setRolePermissions((prev) => {
      const rolePerms = prev[roleId] || {};
      const modulePerms = rolePerms[moduleSlug] || {
        view: false,
        create: false,
        edit: false,
        delete: false,
        approve: false,
        export: false,
        scope: 'ALL'
      };

      const updated = {
        ...prev,
        [roleId]: {
          ...rolePerms,
          [moduleSlug]: {
            ...modulePerms,
            [action]: value
          }
        }
      };
      localStorage.setItem('tm_one_role_permissions', JSON.stringify(updated));
      return updated;
    });

    // Send API request to backend
    try {
      await apiClient.patch(`/roles/${roleId}/permissions`, {
        moduleSlug,
        action,
        granted: value
      });
    } catch (err) {
      console.error('Failed to update role permission on server:', err);
    }
  };

  /**
   * Update row-level scope in the matrix and persist to backend
   */
  const updateRoleScope = async (roleId, moduleSlug, scope) => {
    setRolePermissions((prev) => {
      const rolePerms = prev[roleId] || {};
      const modulePerms = rolePerms[moduleSlug] || {
        view: false,
        create: false,
        edit: false,
        delete: false,
        approve: false,
        export: false,
        scope: 'ALL'
      };

      const updated = {
        ...prev,
        [roleId]: {
          ...rolePerms,
          [moduleSlug]: {
            ...modulePerms,
            scope
          }
        }
      };
      localStorage.setItem('tm_one_role_permissions', JSON.stringify(updated));
      return updated;
    });

    try {
      await apiClient.patch(`/roles/${roleId}/permissions`, {
        moduleSlug,
        action: 'view', // trigger update
        scope
      });
    } catch (err) {
      console.error('Failed to update role scope on server:', err);
    }
  };

  /**
   * Reset all permissions to default seed
   */
  const resetPermissions = () => {
    setRolePermissions(INITIAL_ROLE_PERMISSIONS);
    localStorage.removeItem('tm_one_role_permissions');
    fetchRolesMatrix();
  };

  return (
    <PermissionContext.Provider
      value={{
        rolePermissions,
        matrixData,
        can,
        getScope,
        hasRole,
        activeRole,
        activeRoleId,
        activeRoleObj,
        updateRolePermission,
        updateRoleScope,
        resetPermissions,
        refetchPermissions: fetchRolesMatrix
      }}
    >
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermissions = () => {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error('usePermissions must be used within a PermissionProvider');
  }
  return context;
};
