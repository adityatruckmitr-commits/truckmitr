import React from 'react';
import { usePermissions } from '../../context/PermissionContext';
import { useAuth } from '../../context/AuthContext';
import { Lock } from 'lucide-react';

/**
 * WidgetGate: Enforces widget-level permission checks within composite dashboards
 * Usage:
 * <WidgetGate module="revenue" title="Revenue Mix">
 *   <DonutChart data={...} />
 * </WidgetGate>
 */
export const WidgetGate = ({ module, action = 'view', title, children, minHeight = '180px' }) => {
  const { can } = usePermissions();
  const { currentRoleObj } = useAuth();

  // Array of modules implements OR semantics (renders widget if user has access to ANY listed module)
  const isAllowed = Array.isArray(module)
    ? module.some((m) => can(m, action))
    : can(module, action);

  if (!isAllowed) {
    return (
      <div
        style={{
          backgroundColor: '#F8FAFC',
          borderRadius: '16px',
          border: '1px dashed #CBD5E1',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          minHeight,
          boxSizing: 'border-box'
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748B',
            marginBottom: '10px'
          }}
        >
          <Lock size={18} />
        </div>
        <div style={{ fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
          {title ? `${title} (Restricted)` : 'Widget Restricted'}
        </div>
        <div style={{ fontSize: '11px', color: '#64748B', maxWidth: '280px', lineHeight: 1.4 }}>
          Your active role ({currentRoleObj?.name || 'Staff'}) does not have '{action}' permission on the <strong>{module}</strong> module.
        </div>
      </div>
    );
  }

  return children;
};
