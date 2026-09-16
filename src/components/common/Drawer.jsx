import React, { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Drawer: Slide-in side panel from right with header, close button and children slot
 */
export const Drawer = ({ isOpen, onClose, title, subtitle, children, width = '480px' }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(7, 25, 43, 0.6)',
        backdropFilter: 'blur(4px)',
        zIndex: 99999,
        display: 'flex',
        justifyContent: 'flex-end',
        transition: 'opacity 0.2s ease-in-out'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: width,
          height: '100%',
          backgroundColor: '#FFFFFF',
          boxShadow: '-8px 0 30px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          animation: 'slideInRight 0.22s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#F8FAFC'
          }}
        >
          <div>
            <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: '#0F172A' }}>
              {title}
            </h3>
            {subtitle && (
              <p style={{ margin: '3px 0 0 0', fontSize: '12px', color: '#64748B' }}>
                {subtitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            style={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              color: '#64748B',
              padding: '6px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>{children}</div>
      </div>
    </div>
  );
};
