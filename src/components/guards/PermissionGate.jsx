import React from 'react';
import { usePermissions } from '../../context/PermissionContext';

/**
 * PermissionGate: Conditionally renders UI elements based on action-level permission
 * Usage: <PermissionGate module="drivers" action="edit" fallback={<button disabled>Edit</button>}>
 *          <button onClick={handleEdit}>Edit</button>
 *        </PermissionGate>
 */
export const PermissionGate = ({ module, action = 'view', children, fallback = null }) => {
  const { can } = usePermissions();

  const isAllowed = can(module, action);

  if (!isAllowed) {
    return fallback;
  }

  return children;
};
