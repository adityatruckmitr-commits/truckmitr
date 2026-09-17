import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  CreditCard, 
  Eye, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Clock,
  ArrowRight
} from 'lucide-react';
import { adminDashboardApi } from '../../services/adminDashboardApi';

export const TransportersRecentTables = ({ stats }) => {
  const [transporterData, setTransporterData] = useState({ registered: [], subscribed: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTransporters = async () => {
      setLoading(true);
      try {
        const data = await adminDashboardApi.getRecentTransporters();
        if (data && (data.registered || data.subscribed)) {
          setTransporterData(data);
        }
      } catch (err) {
        console.warn('Failed to load recent transporters:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTransporters();
  }, []);

  const recentRegisteredTransporters = transporterData.registered?.length > 0 ? transporterData.registered : [
    {
      unique_id: 'TM2609ASTR399750',
      name: 'Flipkart',
      mobile: '8472994755',
      state: 'Assam',
      created_at: '11 Sep 2026, 06:39 PM',
    },
    {
      unique_id: 'TM2609MHTR399744',
      name: 'Nurture enterprises',
      mobile: '7219509110',
      state: 'Maharashtra',
      created_at: '11 Sep 2026, 06:18 PM',
    },
  ];

  const recentPaidTransporters = transporterData.subscribed?.length > 0 ? transporterData.subscribed : [
    {
      unique_id: 'TM2510UPDR11820',
      name: 'Chandrakesh',
      mobile: '₹499',
      state: 'Uttar Pradesh',
      payment_status: 'Received',
      payment_date: '11 Sep 2026',
      amount: '₹499',
    },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '20px', marginBottom: '24px' }}>
      
      {/* 1. LEFT SIDE: RECENT REGISTERED TRANSPORTERS */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FAFBFD',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building2 size={18} color="#0D9488" />
            <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: '#0F172A' }}>
              Recent Registered Transporters
            </h4>
          </div>

          <a
            href="/admin/transporter"
            style={{
              fontSize: '12px',
              fontWeight: '700',
              color: '#0D9488',
              textDecoration: 'none',
              padding: '4px 10px',
              borderRadius: '6px',
              border: '1px solid #99F6E4',
              backgroundColor: '#F0FDFA',
            }}
          >
            View All
          </a>
        </div>

        <div style={{ overflowX: 'auto', width: '100%' }}>
          <table className="table-saas" style={{ width: '100%', borderCollapse: 'collapse', whiteSpace: 'nowrap' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>TMID</th>
                <th style={{ textAlign: 'left' }}>Transporter Name</th>
                <th style={{ textAlign: 'left' }}>Mobile</th>
                <th style={{ textAlign: 'left' }}>State</th>
                <th style={{ textAlign: 'left' }}>Date</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentRegisteredTransporters.map((trp, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: '700', color: '#0D9488' }}>
                    <span style={{ backgroundColor: '#F0FDFA', padding: '2px 6px', borderRadius: '4px', fontSize: '11px' }}>
                      {trp.unique_id}
                    </span>
                  </td>
                  <td style={{ fontWeight: '700', color: '#0F172A' }}>
                    {trp.name}
                  </td>
                  <td style={{ fontSize: '12px', color: '#475569' }}>
                    {trp.mobile}
                  </td>
                  <td style={{ fontSize: '12px', color: '#334155' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={11} color="#94A3B8" />
                      <span>{trp.state}</span>
                    </div>
                  </td>
                  <td style={{ fontSize: '11px', color: '#64748B' }}>
                    {trp.created_at}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      onClick={() => alert(`Opening Transporter Profile: ${trp.name} (${trp.unique_id})`)}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '6px',
                        border: '1px solid #CBD5E1',
                        backgroundColor: '#F8FAFC',
                        color: '#0D9488',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      title="View Transporter"
                    >
                      <Eye size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. RIGHT SIDE: RECENT SUBSCRIBED TRANSPORTERS */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FAFBFD',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CreditCard size={18} color="#059669" />
            <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: '#0F172A' }}>
              Recent Subscribed Transporters
            </h4>
          </div>

          <a
            href="/admin/subscribed-transporters"
            style={{
              fontSize: '12px',
              fontWeight: '700',
              color: '#059669',
              textDecoration: 'none',
              padding: '4px 10px',
              borderRadius: '6px',
              border: '1px solid #A7F3D0',
              backgroundColor: '#ECFDF5',
            }}
          >
            View All
          </a>
        </div>

        <div style={{ overflowX: 'auto', width: '100%' }}>
          <table className="table-saas" style={{ width: '100%', borderCollapse: 'collapse', whiteSpace: 'nowrap' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>TMID</th>
                <th style={{ textAlign: 'left' }}>Transporter Name</th>
                <th style={{ textAlign: 'left' }}>State</th>
                <th style={{ textAlign: 'center' }}>Status</th>
                <th style={{ textAlign: 'left' }}>Payment Date</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentPaidTransporters.map((trp, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: '700', color: '#059669' }}>
                    <span style={{ backgroundColor: '#ECFDF5', padding: '2px 6px', borderRadius: '4px', fontSize: '11px' }}>
                      {trp.unique_id}
                    </span>
                  </td>
                  <td style={{ fontWeight: '700', color: '#0F172A' }}>
                    <div>{trp.name}</div>
                    <div style={{ fontSize: '10px', color: '#059669', fontWeight: '700' }}>{trp.amount}</div>
                  </td>
                  <td style={{ fontSize: '12px', color: '#334155' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={11} color="#94A3B8" />
                      <span>{trp.state}</span>
                    </div>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span className="badge badge-success">
                      <CheckCircle2 size={10} /> Received
                    </span>
                  </td>
                  <td style={{ fontSize: '11px', color: '#64748B' }}>
                    {trp.payment_date}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      onClick={() => alert(`Opening Transporter Details: ${trp.name}`)}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '6px',
                        border: '1px solid #CBD5E1',
                        backgroundColor: '#F8FAFC',
                        color: '#059669',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      title="View Details"
                    >
                      <Eye size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
