import React, { useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

/**
 * DonutChart: Breakdown donut with hoverable legend showing label + value + %
 */
export const DonutChart = ({
  data = [],
  height = 240,
  innerRadius = 55,
  outerRadius = 80,
  centerValue,
  centerLabel = 'Total'
}) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const totalValue = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        minHeight: `${height}px`,
        flexWrap: 'wrap',
        gap: '12px'
      }}
    >
      {/* Chart Canvas with Center Stat */}
      <div style={{ position: 'relative', width: '180px', height, flexShrink: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              contentStyle={{
                backgroundColor: '#0F172A',
                color: '#FFFFFF',
                borderRadius: '8px',
                border: 'none',
                fontSize: '11px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
              }}
              formatter={(value, name) => [`${value.toLocaleString('en-IN')}`, name]}
            />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={4}
              dataKey="value"
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color || '#1467FF'}
                  opacity={activeIndex === null || activeIndex === index ? 1 : 0.4}
                  style={{ transition: 'opacity 0.2s', outline: 'none' }}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Label in Donut */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            pointerEvents: 'none'
          }}
        >
          <div style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', lineHeight: 1.1 }}>
            {centerValue !== undefined ? centerValue : totalValue.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600, marginTop: '2px' }}>
            {centerLabel}
          </div>
        </div>
      </div>

      {/* Interactive Legend on the right */}
      <div style={{ flex: 1, minWidth: '150px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {data.map((item, index) => {
          const isHovered = activeIndex === index;
          const percentage = item.percent !== undefined ? item.percent : ((item.value / totalValue) * 100).toFixed(0);

          return (
            <div
              key={item.name}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '5px 8px',
                borderRadius: '8px',
                backgroundColor: isHovered ? '#F1F5F9' : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: item.color || '#1467FF',
                    flexShrink: 0
                  }}
                />
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: isHovered ? 700 : 500,
                    color: '#334155',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {item.name}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>
                  {percentage}%
                </span>
                <span style={{ fontSize: '11px', color: '#94A3B8' }}>
                  ({typeof item.value === 'number' ? item.value.toLocaleString('en-IN') : item.value})
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
