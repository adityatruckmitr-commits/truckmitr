import React from 'react';
import {
  Headphones,
  PhoneCall,
  CheckCircle2,
  Clock,
  XCircle,
  HelpCircle,
  Award,
  ArrowUpRight,
} from 'lucide-react';

export const TelecallerStatsTable = () => {
  const telecallers = [
    {
      id: 1,
      name: 'Simranjeet Kaur',
      totalCalls: 148,
      connected: 92,
      callback: 24,
      notConnected: 22,
      pending: 10,
      conversion: '62.1%',
      badge: 'Top Performer',
    },
    {
      id: 2,
      name: 'Rohan Sharma',
      totalCalls: 135,
      connected: 81,
      callback: 28,
      notConnected: 19,
      pending: 7,
      conversion: '60.0%',
      badge: 'High Conversion',
    },
    {
      id: 3,
      name: 'Neha Verma',
      totalCalls: 122,
      connected: 70,
      callback: 22,
      notConnected: 21,
      pending: 9,
      conversion: '57.3%',
      badge: null,
    },
    {
      id: 4,
      name: 'Pooja Gupta',
      totalCalls: 110,
      connected: 61,
      callback: 20,
      notConnected: 24,
      pending: 5,
      conversion: '55.4%',
      badge: null,
    },
    {
      id: 5,
      name: 'Vikram Singh',
      totalCalls: 98,
      connected: 52,
      callback: 18,
      notConnected: 20,
      pending: 8,
      conversion: '53.0%',
      badge: null,
    },
  ];

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
          gap: '8px',
        }}
      >
        <div>
          <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#111827', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Headphones size={18} style={{ color: '#2563EB' }} />
            Today's Telecaller Call Performance & Conversion Leaderboard
          </h3>
          <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#6B7280' }}>
            Real-time CRM calling status and onboarding activity
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#059669', backgroundColor: '#ECFDF5', padding: '4px 10px', borderRadius: '12px' }}>
            ● Active Telecallers: 12
          </span>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #E2E8F0', color: '#334155', fontSize: '0.8rem', fontWeight: 700 }}>
              <th style={{ padding: '12px 18px' }}>Telecaller Name</th>
              <th style={{ padding: '12px 18px', textAlign: 'center' }}>Total Assigned</th>
              <th style={{ padding: '12px 18px', textAlign: 'center' }}>Connected</th>
              <th style={{ padding: '12px 18px', textAlign: 'center' }}>Callback Later</th>
              <th style={{ padding: '12px 18px', textAlign: 'center' }}>Not Connected</th>
              <th style={{ padding: '12px 18px', textAlign: 'center' }}>Feedback Pending</th>
              <th style={{ padding: '12px 18px', textAlign: 'center' }}>Conversion Rate</th>
            </tr>
          </thead>
          <tbody>
            {telecallers.map((tc, idx) => (
              <tr
                key={tc.id}
                style={{
                  borderBottom: '1px solid #F1F5F9',
                  backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#FAFAFA',
                }}
              >
                <td style={{ padding: '14px 18px', fontWeight: 600, color: '#111827' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: '#EFF6FF',
                        color: '#2563EB',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                      }}
                    >
                      {tc.name.charAt(0)}
                    </div>
                    <span>{tc.name}</span>
                    {tc.badge && (
                      <span
                        style={{
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          backgroundColor: '#FEF3C7',
                          color: '#B45309',
                          padding: '2px 6px',
                          borderRadius: '8px',
                        }}
                      >
                        ★ {tc.badge}
                      </span>
                    )}
                  </div>
                </td>

                <td style={{ padding: '14px 18px', textAlign: 'center', fontWeight: 700, color: '#111827' }}>
                  {tc.totalCalls}
                </td>

                <td style={{ padding: '14px 18px', textAlign: 'center' }}>
                  <span style={{ color: '#10B981', fontWeight: 700 }}>{tc.connected}</span>
                </td>

                <td style={{ padding: '14px 18px', textAlign: 'center' }}>
                  <span style={{ color: '#F59E0B', fontWeight: 700 }}>{tc.callback}</span>
                </td>

                <td style={{ padding: '14px 18px', textAlign: 'center' }}>
                  <span style={{ color: '#EF4444', fontWeight: 700 }}>{tc.notConnected}</span>
                </td>

                <td style={{ padding: '14px 18px', textAlign: 'center' }}>
                  <span style={{ color: '#8B5CF6', fontWeight: 700 }}>{tc.pending}</span>
                </td>

                <td style={{ padding: '14px 18px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <div style={{ width: '60px', height: '6px', backgroundColor: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
                      <div
                        style={{
                          width: tc.conversion,
                          height: '100%',
                          backgroundColor: '#10B981',
                          borderRadius: '3px',
                        }}
                      />
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#111827' }}>{tc.conversion}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
