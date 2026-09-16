import React from 'react';

export const Button = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  fullWidth = false,
  className = '',
  onClick,
  type = 'button',
  style = {},
  ...props
}) => {
  const getStyles = () => {
    let baseStyles = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      fontFamily: 'var(--font-heading)',
      fontWeight: 600,
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      opacity: disabled || loading ? 0.6 : 1,
      borderRadius: 'var(--radius-md)',
      transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      border: '1px solid transparent',
      width: fullWidth ? '100%' : 'auto',
      textDecoration: 'none',
      outline: 'none',
    };

    // Sizing
    if (size === 'sm') {
      baseStyles.padding = '6px 12px';
      baseStyles.fontSize = '0.85rem';
    } else if (size === 'lg') {
      baseStyles.padding = '14px 28px';
      baseStyles.fontSize = '1.05rem';
    } else {
      baseStyles.padding = '10px 20px';
      baseStyles.fontSize = '0.95rem';
    }

    // Variants
    if (variant === 'primary') {
      baseStyles.backgroundColor = 'var(--color-primary)';
      baseStyles.color = '#FFFFFF';
      baseStyles.boxShadow = '0 4px 15px var(--color-primary-glow)';
    } else if (variant === 'secondary') {
      baseStyles.backgroundColor = 'var(--color-secondary-light)';
      baseStyles.color = 'var(--text-main)';
      baseStyles.borderColor = 'var(--border-subtle)';
    } else if (variant === 'outline') {
      baseStyles.backgroundColor = 'transparent';
      baseStyles.color = 'var(--color-primary)';
      baseStyles.borderColor = 'var(--color-primary)';
    } else if (variant === 'danger') {
      baseStyles.backgroundColor = 'var(--color-danger)';
      baseStyles.color = '#FFFFFF';
    } else if (variant === 'ghost') {
      baseStyles.backgroundColor = 'transparent';
      baseStyles.color = 'var(--text-muted)';
    }

    return { ...baseStyles, ...style };
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      style={getStyles()}
      className={`tm-btn ${className}`}
      {...props}
    >
      {loading ? (
        <span style={{ display: 'inline-block', width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 18} />}
          {children}
          {Icon && iconPosition === 'right' && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 18} />}
        </>
      )}
    </button>
  );
};
