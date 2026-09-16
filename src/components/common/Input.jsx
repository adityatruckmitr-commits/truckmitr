import React from 'react';

export const Input = ({
  label,
  error,
  icon: Icon,
  helperText,
  id,
  className = '',
  containerStyle = {},
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%', ...containerStyle }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            fontSize: '0.875rem',
            fontWeight: 500,
            color: 'var(--text-main)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          {label}
        </label>
      )}

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {Icon && (
          <div
            style={{
              position: 'absolute',
              left: '14px',
              color: 'var(--text-dim)',
              display: 'flex',
              alignItems: 'center',
              pointerEvents: 'none',
            }}
          >
            <Icon size={18} />
          </div>
        )}

        <input
          id={inputId}
          style={{
            width: '100%',
            backgroundColor: 'var(--bg-input)',
            border: `1px solid ${error ? 'var(--color-danger)' : 'var(--border-subtle)'}`,
            borderRadius: 'var(--radius-md)',
            padding: Icon ? '12px 14px 12px 42px' : '12px 14px',
            color: 'var(--text-main)',
            fontSize: '0.95rem',
            outline: 'none',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          }}
          className={className}
          {...props}
        />
      </div>

      {error && (
        <span style={{ fontSize: '0.8rem', color: 'var(--color-danger)' }}>{error}</span>
      )}
      {helperText && !error && (
        <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{helperText}</span>
      )}
    </div>
  );
};
