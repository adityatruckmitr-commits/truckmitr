import React from 'react';

export const Tabs = ({
  tabs = [],
  activeTab,
  onChange,
  variant = 'pills', // 'pills' | 'underline'
}) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: variant === 'pills' ? '8px' : '24px',
        borderBottom: variant === 'underline' ? '1px solid var(--border-subtle)' : 'none',
        overflowX: 'auto',
        paddingBottom: variant === 'underline' ? '0' : '4px',
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;

        if (variant === 'underline') {
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              style={{
                background: 'none',
                border: 'none',
                padding: '12px 4px',
                color: isActive ? 'var(--color-primary)' : 'var(--text-muted)',
                fontWeight: isActive ? 600 : 500,
                fontSize: '0.95rem',
                cursor: 'pointer',
                borderBottom: `2px solid ${isActive ? 'var(--color-primary)' : 'transparent'}`,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
              }}
            >
              {Icon && <Icon size={16} />}
              {tab.label}
              {tab.count !== undefined && (
                <span
                  style={{
                    backgroundColor: isActive ? 'var(--color-primary-light)' : 'var(--bg-surface)',
                    color: isActive ? 'var(--color-primary)' : 'var(--text-dim)',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                  }}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        }

        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            style={{
              background: isActive ? 'var(--color-primary)' : 'var(--bg-surface)',
              color: isActive ? '#FFFFFF' : 'var(--text-muted)',
              border: `1px solid ${isActive ? 'var(--color-primary)' : 'var(--border-subtle)'}`,
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              fontWeight: 600,
              fontSize: '0.875rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: isActive ? '0 4px 12px var(--color-primary-glow)' : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            {Icon && <Icon size={15} />}
            {tab.label}
            {tab.count !== undefined && (
              <span
                style={{
                  backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.08)',
                  color: isActive ? '#fff' : 'var(--text-muted)',
                  padding: '2px 6px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.75rem',
                }}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
