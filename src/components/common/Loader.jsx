import React from 'react';

export const Loader = ({
  size = 'md', // 'sm' | 'md' | 'lg'
  text = 'Loading...',
  fullScreen = false,
}) => {
  const getDimension = () => {
    switch (size) {
      case 'sm': return 20;
      case 'lg': return 48;
      default: return 32;
    }
  };

  const spinner = (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
      <div
        style={{
          width: `${getDimension()}px`,
          height: `${getDimension()}px`,
          border: `3px solid rgba(255, 107, 0, 0.2)`,
          borderTopColor: 'var(--color-primary)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      {text && <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>{text}</span>}
    </div>
  );

  if (fullScreen) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'var(--bg-main)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
        }}
      >
        {spinner}
      </div>
    );
  }

  return (
    <div style={{ padding: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {spinner}
    </div>
  );
};
