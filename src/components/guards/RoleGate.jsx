import React from 'react';
import { usePermissions } from '../../context/PermissionContext';

/**
 * RoleGate: Conditionally renders children if active user has one of the allowed roles
 * Usage: <RoleGate roles={['ceo', 'admin']} fallback={<p>Access Denied</p>}>...</RoleGate>
 */
export const RoleGate = ({ roles = [], children, fallback = null }) => {
  const { hasRole } = usePermissions();

  if (!roles || roles.length === 0) return children;

  const isAllowed = Array.isArray(roles) ? roles.some((r) => hasRole(r)) : hasRole(roles);

  if (!isAllowed) {
    return fallback;
  }

  return children;
};
