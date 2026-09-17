import React, { useState } from 'react';
import { 
  PhoneCall, 
  Calendar, 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  PhoneMissed 
} from 'lucide-react';

export const HourlyCallingActivityChart = () => {
  const [selectedDateFilter, setSelectedDateFilter] = useState('today');
  const [customDate, setCustomDate] = useState('2026-09-16');

  // Hourly slots from 9 AM to 7 PM
  const hourlyData = [
    { hour: '09:00 AM', connected: 28, callback: 8, missed: 12, total: 48 },
    { hour: '10:00 AM', connected: 42, callback: 14, missed: 18, total: 74 },
    { hour: '11:00 AM', connected: 56, callback: 18, missed: 22, total: 96 },
    { hour: '12:00 PM', connected: 64, callback: 20, missed: 24, total: 108 },
    { hour: '01:00 PM', connected: 38, callback: 12, missed: 15, total: 65 },
    { hour: '02:00 PM', connected: 58, callback: 19, missed: 20, total: 97 },
    { hour: '03:00 PM', connected: 62, callback: 22, missed: 21, total: 105 },
    { hour: '04:00 PM', connected: 54, callback: 16, missed: 19, total: 89 },
    { hour: '05:00 PM', connected: 48, callback: 15, missed: 18, total: 81 },
    { hour: '06:00 PM', connected: 35, callback: 11, missed: 14, total: 60 },
    { hour: '07:00 PM', connected: 22, callback: 7, missed: 10, total: 39 },
  ];

  const maxTotal = Math.max(...hourlyData.map(h => h.total));

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid #E2E8F0',
        padding: '20px 24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
        marginBottom: '24px',
      }}
    >
      {/* Header & Controls */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '20px',
        }}
      >
        <div>
          <h4
            style={{
              margin: 0,
              fontSize: '16px',
              fontWeight: '800',
              color: '#0F172A',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <PhoneCall size={18} color="#0EA5E9" />
            Daily Hourly Telecalling & IVR Distribution
          </h4>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748B' }}>
            Real-time call connection volume and executive activity across working hours
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>Select Date:</span>
            <select
              value={selectedDateFilter}
              onChange={(e) => setSelectedDateFilter(e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '12px',
                fontWeight: '600',
                color: '#0F172A',
                backgroundColor: '#F8FAFC',
              }}
            >
              <option value="today">Today (16 Sep)</option>
              <option value="yesterday">Yesterday (15 Sep)</option>
              <option value="custom">Custom Date</option>
            </select>
          </div>

          {selectedDateFilter === 'custom' && (
            <input
              type="date"
              value={customDate}
              onChange={(e) => setCustomDate(e.target.value)}
              style={{
                padding: '5px 10px',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                fontSize: '12px',
              }}
            />
          )}

          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              style={{
                padding: '6px 10px',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                backgroundColor: '#FFFFFF',
                color: '#475569',
                cursor: 'pointer',
              }}
            >
              <ArrowLeft size={13} />
            </button>
            <button
              style={{
                padding: '6px 10px',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                backgroundColor: '#FFFFFF',
                color: '#475569',
                cursor: 'pointer',
              }}
            >
              <ArrowRight size={13} />
            </button>
          </div>

        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#475569', fontWeight: '700' }}>
          <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#10B981' }} />
          <span>Connected Calls</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#475569', fontWeight: '700' }}>
          <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#F59E0B' }} />
          <span>Callback Later</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#475569', fontWeight: '700' }}>
          <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#EF4444' }} />
          <span>No Answer / Missed</span>
        </div>
      </div>

      {/* Vertical Bars Container */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${hourlyData.length}, 1fr)`,
          gap: '12px',
          alignItems: 'flex-end',
          height: '240px',
          padding: '16px 8px 30px 8px',
          borderBottom: '1px solid #E2E8F0',
          position: 'relative',
        }}
      >
        {hourlyData.map((item, idx) => {
          const totalHeightPercent = (item.total / maxTotal) * 100;
          const connPercent = (item.connected / item.total) * 100;
          const callbkPercent = (item.callback / item.total) * 100;
          const missedPercent = (item.missed / item.total) * 100;

          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
                justifyContent: 'flex-end',
                position: 'relative',
              }}
            >
              <div style={{ fontSize: '10px', fontWeight: '800', color: '#0F172A', marginBottom: '4px' }}>
                {item.total}
              </div>

              {/* Stacked Vertical Bar */}
              <div
                style={{
                  width: '32px',
                  height: `${totalHeightPercent}%`,
                  borderRadius: '6px 6px 0 0',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#F1F5F9',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                title={`${item.hour} - Total: ${item.total} (Connected: ${item.connected}, Callback: ${item.callback}, Missed: ${item.missed})`}
              >
                <div style={{ height: `${missedPercent}%`, backgroundColor: '#EF4444' }} />
                <div style={{ height: `${callbkPercent}%`, backgroundColor: '#F59E0B' }} />
                <div style={{ height: `${connPercent}%`, backgroundColor: '#10B981' }} />
              </div>

              {/* X-axis Label */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-24px',
                  fontSize: '9px',
                  fontWeight: '700',
                  color: '#64748B',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.hour.replace(':00', '')}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
