import React, { useState } from 'react';
import { 
  X, 
  PhoneCall, 
  Download, 
  Share2, 
  CheckCircle, 
  Clock, 
  UserCheck, 
  PhoneMissed,
  RefreshCw,
  TrendingUp,
  Percent
} from 'lucide-react';

export const DailyCallReportModal = ({ isOpen, onClose }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  if (!isOpen) return null;

  const executiveData = [
    { name: 'Pooja Sharma', assigned: 90, dialed: 88, connected: 64, rate: '72.7%', avgDuration: '3m 45s', matches: 18 },
    { name: 'Rahul Verma', assigned: 85, dialed: 85, connected: 58, rate: '68.2%', avgDuration: '3m 12s', matches: 15 },
    { name: 'Anjali Gupta', assigned: 85, dialed: 82, connected: 54, rate: '65.8%', avgDuration: '4m 02s', matches: 14 },
    { name: 'Vikram Singh', assigned: 80, dialed: 79, connected: 51, rate: '64.5%', avgDuration: '2m 55s', matches: 12 },
    { name: 'Neha Patel', assigned: 80, dialed: 78, connected: 49, rate: '62.8%', avgDuration: '3m 30s', matches: 11 },
    { name: 'Amit Kumar', assigned: 75, dialed: 74, connected: 45, rate: '60.8%', avgDuration: '2m 40s', matches: 9 },
    { name: 'Sneha Deshmukh', assigned: 50, dialed: 50, connected: 38, rate: '76.0%', avgDuration: '4m 15s', matches: 10 },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '820px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          overflow: 'hidden',
          animation: 'modalSlideUp 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            backgroundColor: '#0F172A',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: 'rgba(13, 148, 136, 0.18)',
                color: '#0D9488',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PhoneCall size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '800', margin: 0, letterSpacing: '-0.02em' }}>
                Today's Telecalling & IVR Executive Report
              </h2>
              <p style={{ fontSize: '12px', color: '#94A3B8', margin: '2px 0 0 0' }}>
                Real-time driver calls, connection health, and placement conversion stats
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={handleRefresh}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#FFFFFF',
                borderRadius: '8px',
                padding: '6px 12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                fontWeight: '600',
              }}
            >
              <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
              Live Sync
            </button>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#94A3B8',
                borderRadius: '8px',
                padding: '6px',
                cursor: 'pointer',
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '24px', maxHeight: 'calc(85vh - 140px)', overflowY: 'auto' }}>
          
          {/* Top Metric Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '12px',
              marginBottom: '20px',
            }}
          >
            <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>Total Calls Dialed</div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#0F172A', marginTop: '2px' }}>536</div>
              <div style={{ fontSize: '10px', color: '#059669', fontWeight: '600' }}>98.3% target achieved</div>
            </div>

            <div style={{ padding: '12px', backgroundColor: '#FEF3EB', borderRadius: '10px', border: '1px solid #FCD9BD' }}>
              <div style={{ fontSize: '11px', color: '#E05A1B', fontWeight: '600' }}>Connected Calls</div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#E05A1B', marginTop: '2px' }}>359</div>
              <div style={{ fontSize: '10px', color: '#64748B' }}>67.0% Connection Rate</div>
            </div>

            <div style={{ padding: '12px', backgroundColor: '#E6FFFA', borderRadius: '10px', border: '1px solid #B2F5EA' }}>
              <div style={{ fontSize: '11px', color: '#0D9488', fontWeight: '600' }}>Drivers Matched</div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#0D9488', marginTop: '2px' }}>89</div>
              <div style={{ fontSize: '10px', color: '#059669', fontWeight: '600' }}>24.8% Match Rate</div>
            </div>

            <div style={{ padding: '12px', backgroundColor: '#F1F5F9', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>Avg Talk Duration</div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#0F172A', marginTop: '2px' }}>3m 28s</div>
              <div style={{ fontSize: '10px', color: '#64748B' }}>Total 31.2 Calling Hours</div>
            </div>
          </div>

          {/* Telecaller Breakdown Table */}
          <div style={{ borderRadius: '12px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
            <table className="table-saas" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left' }}>Executive Name</th>
                  <th style={{ textAlign: 'center' }}>Target</th>
                  <th style={{ textAlign: 'center' }}>Dialed</th>
                  <th style={{ textAlign: 'center' }}>Connected</th>
                  <th style={{ textAlign: 'center' }}>Connect %</th>
                  <th style={{ textAlign: 'center' }}>Avg Duration</th>
                  <th style={{ textAlign: 'center' }}>Matches</th>
                </tr>
              </thead>
              <tbody>
                {executiveData.map((item, idx) => (
                  <tr key={idx}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div
                          style={{
                            width: '26px',
                            height: '26px',
                            borderRadius: '50%',
                            backgroundColor: '#FEF3EB',
                            color: '#E05A1B',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '10px',
                            fontWeight: '800',
                          }}
                        >
                          {item.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <span style={{ fontWeight: '700', color: '#0F172A', fontSize: '13px' }}>{item.name}</span>
                      </div>
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: '600', color: '#64748B' }}>{item.assigned}</td>
                    <td style={{ textAlign: 'center', fontWeight: '700', color: '#0F172A' }}>{item.dialed}</td>
                    <td style={{ textAlign: 'center', fontWeight: '700', color: '#0D9488' }}>{item.connected}</td>
                    <td style={{ textAlign: 'center' }}>
                      <span
                        style={{
                          fontWeight: '700',
                          color: '#059669',
                          backgroundColor: '#D1FAE5',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '11px',
                        }}
                      >
                        {item.rate}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center', color: '#64748B', fontSize: '12px' }}>{item.avgDuration}</td>
                    <td style={{ textAlign: 'center', fontWeight: '800', color: '#E05A1B' }}>{item.matches}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

        {/* Footer */}
        <div
          style={{
            padding: '16px 24px',
            backgroundColor: '#F8FAFC',
            borderTop: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: '9px 16px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              backgroundColor: '#FFFFFF',
              color: '#475569',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
            }}
          >
            Close
          </button>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => alert('Sending Daily Call Summary to WhatsApp Group...')}
              style={{
                padding: '9px 16px',
                borderRadius: '8px',
                border: '1px solid #059669',
                backgroundColor: '#ECFDF5',
                color: '#059669',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Share2 size={16} />
              Share on WhatsApp
            </button>

            <button
              onClick={() => alert('Exporting Daily Report to PDF/Excel...')}
              style={{
                padding: '9px 20px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#0D9488',
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Download size={16} />
              Download Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
