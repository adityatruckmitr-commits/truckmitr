import React from 'react';

export const Badge = ({
  children,
  variant = 'primary', // 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
  size = 'md', // 'sm' | 'md'
  icon: Icon,
  style = {},
  className = '',
}) => {
  const getBadgeStyle = () => {
    let base = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      fontWeight: 600,
      borderRadius: 'var(--radius-full)',
      lineHeight: 1,
    };

    if (size === 'sm') {
      base.padding = '4px 8px';
      base.fontSize = '0.75rem';
    } else {
      base.padding = '6px 12px';
      base.fontSize = '0.825rem';
    }

    if (variant === 'primary') {
      base.backgroundColor = 'var(--color-primary-light)';
      base.color = 'var(--color-primary)';
      base.border = '1px solid var(--border-primary)';
    } else if (variant === 'success') {
      base.backgroundColor = 'var(--color-success-bg)';
      base.color = 'var(--color-success)';
      base.border = '1px solid rgba(16, 185, 129, 0.3)';
    } else if (variant === 'warning') {
      base.backgroundColor = 'var(--color-warning-bg)';
      base.color = 'var(--color-warning)';
      base.border = '1px solid rgba(245, 158, 11, 0.3)';
    } else if (variant === 'danger') {
      base.backgroundColor = 'var(--color-danger-bg)';
      base.color = 'var(--color-danger)';
      base.border = '1px solid rgba(239, 68, 68, 0.3)';
    } else if (variant === 'info') {
      base.backgroundColor = 'var(--color-info-bg)';
      base.color = 'var(--color-info)';
      base.border = '1px solid rgba(59, 130, 246, 0.3)';
    } else {
      base.backgroundColor = 'var(--color-secondary-light)';
      base.color = 'var(--text-muted)';
      base.border = '1px solid var(--border-subtle)';
    }

    return { ...base, ...style };
  };

  return (
    <span style={getBadgeStyle()} className={`tm-badge ${className}`}>
      {Icon && <Icon size={size === 'sm' ? 12 : 14} />}
      {children}
    </span>
  );
};
