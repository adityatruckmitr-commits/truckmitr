import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';
import { BUSINESS_PERFORMANCE_DATA } from '../../services/dashboardMockData';

/**
 * PerformanceChart: Combo Bar + Line chart showing Revenue (Bars) vs Registrations (Line)
 */
export const PerformanceChart = ({
  data = BUSINESS_PERFORMANCE_DATA,
  height = 300,
  barColor = '#1467FF',
  lineColor = '#10B981'
}) => {
  const formatCurrency = (val) => `₹${(val / 1000).toFixed(0)}k`;

  return (
    <div style={{ width: '100%', height, minHeight: '220px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
          <XAxis
            dataKey="month"
            stroke="#94A3B8"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: '#E2E8F0' }}
          />
          <YAxis
            yAxisId="left"
            stroke="#94A3B8"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatCurrency}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#94A3B8"
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0F172A',
              color: '#FFFFFF',
              borderRadius: '10px',
              border: 'none',
              fontSize: '12px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
            }}
            formatter={(value, name) => [
              name === 'Revenue (₹)' ? `₹${value.toLocaleString('en-IN')}` : value,
              name
            ]}
          />
          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            wrapperStyle={{ paddingBottom: '10px', fontSize: '12px' }}
          />
          <Bar
            yAxisId="left"
            dataKey="revenue"
            name="Revenue (₹)"
            fill={barColor}
            radius={[6, 6, 0, 0]}
            barSize={24}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="registrations"
            name="Registrations"
            stroke={lineColor}
            strokeWidth={3}
            dot={{ r: 4, fill: '#FFFFFF', stroke: lineColor, strokeWidth: 2 }}
            activeDot={{ r: 6, fill: lineColor }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
