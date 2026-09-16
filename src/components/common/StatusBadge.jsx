import React from 'react';

export const StatusBadge = ({ status, text, size = 'sm' }) => {
  const norm = (status || '').toUpperCase();

  const configs = {
    ACTIVE: { bg: '#E8F8F0', text: '#059669', border: '#A7F3D0', dot: '#10B981' },
    VERIFIED: { bg: '#E8F8F0', text: '#059669', border: '#A7F3D0', dot: '#10B981' },
    APPROVED: { bg: '#E8F8F0', text: '#059669', border: '#A7F3D0', dot: '#10B981' },
    COMPLETED: { bg: '#E8F8F0', text: '#059669', border: '#A7F3D0', dot: '#10B981' },
    CONNECTED: { bg: '#E8F8F0', text: '#059669', border: '#A7F3D0', dot: '#10B981' },
    
    PENDING: { bg: '#FEF3C7', text: '#D97706', border: '#FDE68A', dot: '#F59E0B' },
    'UNDER REVIEW': { bg: '#FEF3C7', text: '#D97706', border: '#FDE68A', dot: '#F59E0B' },
    'IN PROGRESS': { bg: '#FEF3C7', text: '#D97706', border: '#FDE68A', dot: '#F59E0B' },
    CALLBACK: { bg: '#FEF3C7', text: '#D97706', border: '#FDE68A', dot: '#F59E0B' },
    
    INACTIVE: { bg: '#F1F5F9', text: '#64748B', border: '#E2E8F0', dot: '#94A3B8' },
    SUSPENDED: { bg: '#FEE2E2', text: '#DC2626', border: '#FECACA', dot: '#EF4444' },
    REJECTED: { bg: '#FEE2E2', text: '#DC2626', border: '#FECACA', dot: '#EF4444' },
    FAILED: { bg: '#FEE2E2', text: '#DC2626', border: '#FECACA', dot: '#EF4444' },
    OVERDUE: { bg: '#FEE2E2', text: '#DC2626', border: '#FECACA', dot: '#EF4444' },
    'NOT CONNECTED': { bg: '#FEE2E2', text: '#DC2626', border: '#FECACA', dot: '#EF4444' },
    
    HIGH: { bg: '#FEE2E2', text: '#DC2626', border: '#FECACA', dot: '#EF4444' },
    MEDIUM: { bg: '#FEF3C7', text: '#D97706', border: '#FDE68A', dot: '#F59E0B' },
    LOW: { bg: '#E8F8F0', text: '#059669', border: '#A7F3D0', dot: '#10B981' },
    CRITICAL: { bg: '#7F1D1D', text: '#FFFFFF', border: '#991B1B', dot: '#EF4444' }
  };

  const styleConfig = configs[norm] || {
    bg: '#EFF6FF',
    text: '#1D4ED8',
    border: '#BFDBFE',
    dot: '#3B82F6'
  };

  const isSmall = size === 'sm';

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding: isSmall ? '2px 8px' : '4px 12px',
        fontSize: isSmall ? '11px' : '12px',
        fontWeight: 600,
        borderRadius: '9999px',
        backgroundColor: styleConfig.bg,
        color: styleConfig.text,
        border: `1px solid ${styleConfig.border}`,
        whiteSpace: 'nowrap'
      }}
    >
      <span
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: styleConfig.dot
        }}
      />
      {text || status}
    </span>
  );
};
