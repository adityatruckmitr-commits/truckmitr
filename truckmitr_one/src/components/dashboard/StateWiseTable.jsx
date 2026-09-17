import React, { useState } from 'react';
import {
  MapPin,
  Search,
  ArrowUpDown,
  Truck,
  Building2,
  Briefcase,
  CheckCircle2,
} from 'lucide-react';

export const StateWiseTable = () => {
  const [search, setSearch] = useState('');

  const stateData = [
    { state: 'Rajasthan', code: 'RJ', drivers: 34210, verifiedDrivers: 18450, transporters: 7890, verifiedTransporters: 4820, activeJobs: 2450, dhabas: 620 },
    { state: 'Haryana', code: 'HR', drivers: 22150, verifiedDrivers: 11200, transporters: 5410, verifiedTransporters: 3120, activeJobs: 1890, dhabas: 410 },
    { state: 'Delhi NCR', code: 'DL', drivers: 18940, verifiedDrivers: 9840, transporters: 4920, verifiedTransporters: 2980, activeJobs: 2150, dhabas: 180 },
    { state: 'Uttar Pradesh', code: 'UP', drivers: 28450, verifiedDrivers: 12400, transporters: 6120, verifiedTransporters: 3450, activeJobs: 1650, dhabas: 540 },
    { state: 'Gujarat', code: 'GJ', drivers: 16420, verifiedDrivers: 8920, transporters: 4210, verifiedTransporters: 2640, activeJobs: 1420, dhabas: 380 },
    { state: 'Maharashtra', code: 'MH', drivers: 14890, verifiedDrivers: 7650, transporters: 3890, verifiedTransporters: 2140, activeJobs: 1290, dhabas: 340 },
    { state: 'Punjab', code: 'PB', drivers: 12450, verifiedDrivers: 6840, transporters: 2980, verifiedTransporters: 1820, activeJobs: 980, dhabas: 290 },
    { state: 'Madhya Pradesh', code: 'MP', drivers: 10890, verifiedDrivers: 5410, transporters: 2450, verifiedTransporters: 1420, activeJobs: 820, dhabas: 310 },
  ];

  const filtered = stateData.filter((s) =>
    s.state.toLowerCase().includes(search.toLowerCase()) ||
    s.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '14px',
        border: '1px solid #E5E7EB',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
        overflow: 'hidden',
        marginBottom: '16px',
      }}
    >
      <div
        style={{
          padding: '16px 20px',
          borderBottom: '1px solid #E5E7EB',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        <div>
          <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#111827', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={18} style={{ color: '#2563EB' }} />
            Pan-India State-Wise Fleet, Drivers & Job Openings Matrix
          </h3>
          <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#6B7280' }}>
            Geographical penetration and verified supply counts
          </p>
        </div>

        <div style={{ position: 'relative', width: '240px' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
          <input
            type="text"
            placeholder="Search state..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              height: '32px',
              paddingLeft: '30px',
              paddingRight: '10px',
              borderRadius: '6px',
              border: '1px solid #CBD5E1',
              fontSize: '0.8rem',
              backgroundColor: '#F8FAFC',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #E2E8F0', color: '#334155', fontSize: '0.8rem', fontWeight: 700 }}>
              <th style={{ padding: '12px 18px' }}>State / Region</th>
              <th style={{ padding: '12px 18px', textAlign: 'center' }}>Total Drivers</th>
              <th style={{ padding: '12px 18px', textAlign: 'center' }}>Verified Drivers</th>
              <th style={{ padding: '12px 18px', textAlign: 'center' }}>Transporters</th>
              <th style={{ padding: '12px 18px', textAlign: 'center' }}>Verified Transporters</th>
              <th style={{ padding: '12px 18px', textAlign: 'center' }}>Live Jobs</th>
              <th style={{ padding: '12px 18px', textAlign: 'center' }}>Dhabas / Amenities</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((st, idx) => (
              <tr
                key={st.code}
                style={{
                  borderBottom: '1px solid #F1F5F9',
                  backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#FAFAFA',
                }}
              >
                <td style={{ padding: '14px 18px', fontWeight: 700, color: '#111827' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        padding: '2px 6px',
                        backgroundColor: '#EFF6FF',
                        color: '#2563EB',
                        borderRadius: '4px',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        fontFamily: 'monospace',
                      }}
                    >
                      {st.code}
                    </span>
                    <span>{st.state}</span>
                  </div>
                </td>

                <td style={{ padding: '14px 18px', textAlign: 'center', fontWeight: 600, color: '#111827' }}>
                  {st.drivers.toLocaleString()}
                </td>

                <td style={{ padding: '14px 18px', textAlign: 'center' }}>
                  <span style={{ color: '#059669', fontWeight: 700 }}>
                    {st.verifiedDrivers.toLocaleString()}
                  </span>
                </td>

                <td style={{ padding: '14px 18px', textAlign: 'center', fontWeight: 600, color: '#111827' }}>
                  {st.transporters.toLocaleString()}
                </td>

                <td style={{ padding: '14px 18px', textAlign: 'center' }}>
                  <span style={{ color: '#0284C7', fontWeight: 700 }}>
                    {st.verifiedTransporters.toLocaleString()}
                  </span>
                </td>

                <td style={{ padding: '14px 18px', textAlign: 'center' }}>
                  <span
                    style={{
                      backgroundColor: '#ECFDF5',
                      color: '#047857',
                      padding: '3px 8px',
                      borderRadius: '10px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                    }}
                  >
                    {st.activeJobs.toLocaleString()} Open
                  </span>
                </td>

                <td style={{ padding: '14px 18px', textAlign: 'center', color: '#4B5563', fontWeight: 600 }}>
                  {st.dhabas} Hubs
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
