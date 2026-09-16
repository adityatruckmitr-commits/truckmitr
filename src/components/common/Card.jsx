import React from 'react';

export const Card = ({
  children,
  className = '',
  style = {},
  onClick,
  hoverable = true,
  glow = false,
  padding = '24px',
}) => {
  return (
    <div
      onClick={onClick}
      className={`${hoverable ? 'glass-card' : 'glass-panel'} ${glow ? 'animate-glow' : ''} ${className}`}
      style={{
        padding,
        position: 'relative',
        cursor: onClick ? 'pointer' : 'default',
        overflow: 'hidden',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
