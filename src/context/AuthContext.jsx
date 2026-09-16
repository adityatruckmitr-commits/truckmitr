import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiClient } from '../services/api/apiClient';
import { SYSTEM_ROLES } from '../utils/rbacConstants';
import { INITIAL_USERS } from '../services/mockRbacData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('tm_one_current_user');
    return saved ? JSON.parse(saved) : INITIAL_USERS[0];
  });

  const [activeRole, setActiveRole] = useState(() => {
    const saved = localStorage.getItem('tm_one_active_role');
    return saved || 'ceo';
  });

  const [users, setUsers] = useState(INITIAL_USERS);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch users from API
  const refreshUsers = useCallback(async () => {
    try {
      const res = await apiClient.get('/users');
      if (res.data && res.data.data) {
        setUsers(res.data.data);
      }
    } catch (err) {
      console.warn('API users fetch fallback to local state:', err.message);
    }
  }, []);

  // Initialize session on mount
  useEffect(() => {
    const initSession = async () => {
      const token = localStorage.getItem('tm_auth_token');
      if (token) {
        try {
          const res = await apiClient.get('/auth/me');
          if (res.data && res.data.user) {
            setCurrentUser(res.data.user);
            setActiveRole(res.data.user.role);
            localStorage.setItem('tm_one_current_user', JSON.stringify(res.data.user));
            localStorage.setItem('tm_one_active_role', res.data.user.role);
          }
        } catch (err) {
          console.warn('Session verification failed, logging in with default role');
          // Auto login with default role
          await loginByRole(activeRole || 'ceo');
        }
      } else {
        // Auto-login with initial role to seed token
        await loginByRole(activeRole || 'ceo');
      }
      await refreshUsers();
      setIsLoading(false);
    };

    initSession();
  }, []);

  const loginByRole = async (roleSlug) => {
    try {
      const res = await apiClient.post('/auth/login', { roleSlug });
      if (res.data && res.data.token) {
        localStorage.setItem('tm_auth_token', res.data.token);
        setCurrentUser(res.data.user);
        setActiveRole(res.data.user.role);
        localStorage.setItem('tm_one_current_user', JSON.stringify(res.data.user));
        localStorage.setItem('tm_one_active_role', res.data.user.role);
        return { success: true, user: res.data.user };
      }
    } catch (err) {
      console.error('Login by role failed:', err.message);
    }
    return { success: false };
  };

  // Switch Role (via Backend API)
  const switchRole = async (roleSlug) => {
    try {
      const res = await apiClient.post('/auth/switch-role', { targetRoleSlug: roleSlug });
      if (res.data && res.data.token) {
        localStorage.setItem('tm_auth_token', res.data.token);
        setCurrentUser(res.data.user);
        setActiveRole(res.data.user.role);
        localStorage.setItem('tm_one_current_user', JSON.stringify(res.data.user));
        localStorage.setItem('tm_one_active_role', res.data.user.role);
        window.dispatchEvent(new CustomEvent('tm_role_switched', { detail: res.data.user }));
        await refreshUsers();
        return;
      }
    } catch (err) {
      console.warn('API role switch failed, falling back to login:', err.message);
      await loginByRole(roleSlug);
      await refreshUsers();
    }
  };

  // Switch User
  const switchUser = async (userId) => {
    const targetUser = users.find((u) => u.id === userId);
    if (targetUser) {
      await switchRole(targetUser.roleSlug || 'user');
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      const res = await apiClient.post('/auth/login', { email, password });
      if (res.data && res.data.token) {
        localStorage.setItem('tm_auth_token', res.data.token);
        setCurrentUser(res.data.user);
        setActiveRole(res.data.user.role);
        localStorage.setItem('tm_one_current_user', JSON.stringify(res.data.user));
        localStorage.setItem('tm_one_active_role', res.data.user.role);
        await refreshUsers();
        return { success: true, user: res.data.user };
      }
    } catch (err) {
      console.error('Login error:', err.response?.data?.message || err.message);
      return { success: false, error: err.response?.data?.message || 'Login failed' };
    }
  };

  // Logout
  const logout = async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch (e) {
      // Ignore
    }
    localStorage.removeItem('tm_auth_token');
    localStorage.removeItem('tm_one_current_user');
    setCurrentUser(null);
  };

  // User Management Actions (via real API)
  const addUser = async (userData) => {
    try {
      const res = await apiClient.post('/users', userData);
      if (res.data && res.data.data) {
        await refreshUsers();
        return res.data.data;
      }
    } catch (err) {
      console.error('Failed to add user via API:', err);
      throw err;
    }
  };

  const updateUser = async (userId, updates) => {
    try {
      const res = await apiClient.patch(`/users/${userId}`, updates);
      if (res.data && res.data.data) {
        await refreshUsers();
        return res.data.data;
      }
    } catch (err) {
      console.error('Failed to update user via API:', err);
      throw err;
    }
  };

  const toggleUserStatus = async (userId) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;
    const nextStatus = user.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    await updateUser(userId, { status: nextStatus });
  };

  const deleteUser = async (userId) => {
    try {
      await apiClient.delete(`/users/${userId}`);
      await refreshUsers();
    } catch (err) {
      console.error('Failed to delete user via API:', err);
      throw err;
    }
  };

  const currentRoleObj = SYSTEM_ROLES.find((r) => r.slug === activeRole) || SYSTEM_ROLES[0];
  const isAuthenticated = Boolean(currentUser && (currentUser.id || currentUser.email));

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        user: currentUser,
        isAuthenticated,
        users,
        activeRole,
        role: activeRole || currentUser?.role || 'ceo',
        currentRoleObj,
        roles: SYSTEM_ROLES,
        isLoading,
        switchRole,
        switchDemoRole: switchRole,
        switchUser,
        login,
        loginByRole,
        logout,
        addUser,
        updateUser,
        toggleUserStatus,
        deleteUser,
        refreshUsers
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
