import React from 'react';
import { AlertTriangle, AlertOctagon, Info, ChevronRight } from 'lucide-react';

/**
 * ExceptionAlert: Callout banner for overdue items, SLA breaches, and urgent escalations
 */
export const ExceptionAlert = ({
  title,
  description,
  count,
  severity = 'warning', // 'warning', 'critical', 'info'
  actionLabel,
  onAction,
  icon: CustomIcon
}) => {
  const configs = {
    critical: {
      bg: '#FEF2F2',
      border: '#FCA5A5',
      text: '#991B1B',
      titleColor: '#7F1D1D',
      iconColor: '#DC2626',
      badgeBg: '#DC2626',
      badgeText: '#FFFFFF',
      Icon: AlertOctagon
    },
    warning: {
      bg: '#FFFBEB',
      border: '#FCD34D',
      text: '#92400E',
      titleColor: '#78350F',
      iconColor: '#D97706',
      badgeBg: '#D97706',
      badgeText: '#FFFFFF',
      Icon: AlertTriangle
    },
    info: {
      bg: '#EFF6FF',
      border: '#BAE6FD',
      text: '#075985',
      titleColor: '#0369A1',
      iconColor: '#0284C7',
      badgeBg: '#0284C7',
      badgeText: '#FFFFFF',
      Icon: Info
    }
  };

  const currentConfig = configs[severity] || configs.warning;
  const IconComponent = CustomIcon || currentConfig.Icon;

  return (
    <div
      style={{
        backgroundColor: currentConfig.bg,
        border: `1px solid ${currentConfig.border}`,
        borderRadius: '12px',
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        marginBottom: '10px',
        transition: 'all 0.15s ease'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flex: 1, minWidth: 0 }}>
        <div style={{ color: currentConfig.iconColor, marginTop: '2px', flexShrink: 0 }}>
          <IconComponent size={18} />
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: currentConfig.titleColor }}>
              {title}
            </span>
            {count !== undefined && (
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  backgroundColor: currentConfig.badgeBg,
                  color: currentConfig.badgeText,
                  padding: '1px 7px',
                  borderRadius: '999px'
                }}
              >
                {count}
              </span>
            )}
          </div>
          {description && (
            <div style={{ fontSize: '12px', color: currentConfig.text, marginTop: '2px', lineHeight: 1.4 }}>
              {description}
            </div>
          )}
        </div>
      </div>

      {(actionLabel || onAction) && (
        <button
          onClick={onAction}
          style={{
            border: 'none',
            background: 'transparent',
            color: currentConfig.iconColor,
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            flexShrink: 0,
            padding: '4px 8px',
            borderRadius: '6px'
          }}
        >
          <span>{actionLabel || 'Review'}</span>
          <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
};
