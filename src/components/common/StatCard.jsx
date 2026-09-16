import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

/**
 * StatCard: KPI metric card with MoM% trend indicator, custom icon, and deep-link click handler
 */
export const StatCard = ({
  title,
  value,
  change,
  isPositive = true,
  period = 'vs last month',
  icon: Icon,
  iconColor = '#1467FF',
  iconBg = '#EFF6FF',
  onClick,
  prefix = '',
  suffix = ''
}) => {
  const isInteractive = Boolean(onClick);

  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid #E2E8F0',
        padding: '20px',
        boxShadow: '0 2px 8px rgba(15, 35, 65, 0.04)',
        cursor: isInteractive ? 'pointer' : 'default',
        transition: 'all 0.18s ease-in-out',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        if (isInteractive) {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.borderColor = '#93C5FD';
          e.currentTarget.style.boxShadow = '0 8px 20px rgba(20, 103, 255, 0.08)';
        }
      }}
      onMouseLeave={(e) => {
        if (isInteractive) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.borderColor = '#E2E8F0';
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(15, 35, 65, 0.04)';
        }
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B' }}>{title}</span>
        {Icon && (
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: iconBg,
              color: iconColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Icon size={20} />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '8px' }}>
        <span style={{ fontSize: '26px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.5px' }}>
          {prefix}{value}{suffix}
        </span>
      </div>

      {change !== undefined && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '2px',
              fontWeight: 700,
              color: isPositive ? '#059669' : '#DC2626',
              backgroundColor: isPositive ? '#ECFDF5' : '#FEF2F2',
              padding: '2px 6px',
              borderRadius: '6px'
            }}
          >
            {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {change}
          </span>
          <span style={{ color: '#94A3B8', fontSize: '11px' }}>{period}</span>
        </div>
      )}
    </div>
  );
};
