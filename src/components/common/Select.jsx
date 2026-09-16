import React from 'react';

export const Select = ({
  label,
  options = [],
  error,
  helperText,
  id,
  value,
  onChange,
  placeholder = 'Select an option',
  containerStyle = {},
  ...props
}) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%', ...containerStyle }}>
      {label && (
        <label
          htmlFor={selectId}
          style={{
            fontSize: '0.875rem',
            fontWeight: 500,
            color: 'var(--text-main)',
          }}
        >
          {label}
        </label>
      )}

      <select
        id={selectId}
        value={value}
        onChange={onChange}
        style={{
          width: '100%',
          backgroundColor: 'var(--bg-input)',
          border: `1px solid ${error ? 'var(--color-danger)' : 'var(--border-subtle)'}`,
          borderRadius: 'var(--radius-md)',
          padding: '12px 14px',
          color: 'var(--text-main)',
          fontSize: '0.95rem',
          outline: 'none',
          cursor: 'pointer',
        }}
        {...props}
      >
        {placeholder && <option value="" disabled style={{ background: '#131B2E', color: '#94A3B8' }}>{placeholder}</option>}
        {options.map((opt) => (
          <option
            key={opt.value ?? opt}
            value={opt.value ?? opt}
            style={{ background: '#131B2E', color: '#F8FAFC' }}
          >
            {opt.label ?? opt}
          </option>
        ))}
      </select>

      {error && <span style={{ fontSize: '0.8rem', color: 'var(--color-danger)' }}>{error}</span>}
      {helperText && !error && <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{helperText}</span>}
    </div>
  );
};
