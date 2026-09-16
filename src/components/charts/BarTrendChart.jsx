import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';
import { DRIVER_TRANSPORTER_TREND } from '../../services/dashboardMockData';

/**
 * BarTrendChart: Monthly comparative bar chart for growth and attendance trends
 */
export const BarTrendChart = ({
  data = DRIVER_TRANSPORTER_TREND,
  height = 250,
  series = [
    { dataKey: 'drivers', name: 'Drivers', color: '#1467FF' },
    { dataKey: 'transporters', name: 'Transporters', color: '#10B981' }
  ],
  xAxisKey = 'month'
}) => {
  return (
    <div style={{ width: '100%', height, minHeight: '200px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
          <XAxis
            dataKey={xAxisKey}
            stroke="#94A3B8"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: '#E2E8F0' }}
          />
          <YAxis
            stroke="#94A3B8"
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0F172A',
              color: '#FFFFFF',
              borderRadius: '8px',
              border: 'none',
              fontSize: '11px',
              boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
            }}
          />
          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            wrapperStyle={{ paddingBottom: '10px', fontSize: '11px' }}
          />
          {series.map((s) => (
            <Bar
              key={s.dataKey}
              dataKey={s.dataKey}
              name={s.name}
              fill={s.color}
              radius={[4, 4, 0, 0]}
              barSize={16}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
