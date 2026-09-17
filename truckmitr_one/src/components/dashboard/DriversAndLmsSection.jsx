import React, { useState, useEffect } from 'react';
import { 
  Truck, 
  PlayCircle, 
  CheckCircle2, 
  Eye, 
  MapPin, 
  Phone, 
  Award, 
  GraduationCap,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { adminDashboardApi } from '../../services/adminDashboardApi';

export const DriversAndLmsSection = ({ stats }) => {
  const [driversList, setDriversList] = useState([]);
  const [loadingDrivers, setLoadingDrivers] = useState(false);

  useEffect(() => {
    const fetchDrivers = async () => {
      setLoadingDrivers(true);
      try {
        const data = await adminDashboardApi.getRecentDrivers();
        if (data && Array.isArray(data) && data.length > 0) {
          setDriversList(data);
        }
      } catch (err) {
        console.warn('Failed to load recent drivers:', err);
      } finally {
        setLoadingDrivers(false);
      }
    };
    fetchDrivers();
  }, []);

  const recentDrivers = driversList.length > 0 ? driversList : [
    {
      unique_id: 'TM2609MHDR399749',
      tmid: 'TM2609MHDR399749',
      name: 'Acche Lal',
      mobile: '9129953508',
      state: 'Maharashtra',
      subscription_amount: null,
      date: '11 Sep 2026, 06:38 PM',
      badge: 'Free',
    },
    {
      unique_id: 'TM2609JHDR399748',
      tmid: 'TM2609JHDR399748',
      name: 'Nawab',
      mobile: '6201031432',
      state: 'Jharkhand',
      subscription_amount: null,
      date: '11 Sep 2026, 06:37 PM',
      badge: 'Free',
    },
  ];

  const m1Quiz = stats?.lms_stats?.module1?.quizzes ?? 813;
  const m2Quiz = stats?.lms_stats?.module2?.quizzes ?? 348;
  const m3Quiz = stats?.lms_stats?.module3?.quizzes ?? 0;
  const overallCertified = stats?.lms_stats?.overall?.certified ?? (m1Quiz + m2Quiz + m3Quiz);

  const lmsModules = [
    {
      module: 'Module 1 - Highway Safety & Defensive Driving',
      seen: '1,420 Drivers',
      quiz: `${m1Quiz} Passed`,
      color: '#DC2626',
      borderColor: '#FCA5A5',
      bgColor: '#FEF2F2',
      iconBg: '#DC2626',
    },
    {
      module: 'Module 2 - Fuel Efficiency & Cost Optimization',
      seen: '980 Drivers',
      quiz: `${m2Quiz} Passed`,
      color: '#D97706',
      borderColor: '#FDE68A',
      bgColor: '#FFFBEB',
      iconBg: '#D97706',
    },
    {
      module: 'Module 3 - Health, First Aid & Cargo Safety',
      seen: '540 Drivers',
      quiz: `${m3Quiz} Passed`,
      color: '#059669',
      borderColor: '#A7F3D0',
      bgColor: '#ECFDF5',
      iconBg: '#059669',
    },
    {
      module: 'Overall Certified Drivers Status',
      seen: '1,850 Completed',
      quiz: `${overallCertified} Certified`,
      color: '#2563EB',
      borderColor: '#BFDBFE',
      bgColor: '#EFF6FF',
      iconBg: '#2563EB',
    },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '20px', marginBottom: '24px' }}>
      
      {/* 1. LEFT SIDE (col-8): RECENT REGISTERED DRIVERS */}
      <div
        style={{
          gridColumn: 'span 8',
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
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
            <Truck size={18} color="#E05A1B" />
            <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: '#0F172A' }}>
              Recent Registered Commercial Drivers
            </h4>
          </div>

          <a
            href="/admin/driver-list"
            style={{
              fontSize: '12px',
              fontWeight: '700',
              color: '#E05A1B',
              textDecoration: 'none',
              padding: '4px 10px',
              borderRadius: '6px',
              border: '1px solid #FDBA74',
              backgroundColor: '#FEF3EB',
            }}
          >
            View All Drivers
          </a>
        </div>

        <div style={{ overflowX: 'auto', width: '100%', flex: 1 }}>
          <table className="table-saas" style={{ width: '100%', borderCollapse: 'collapse', whiteSpace: 'nowrap' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>TM ID</th>
                <th style={{ textAlign: 'left' }}>Driver Name</th>
                <th style={{ textAlign: 'left' }}>Mobile No.</th>
                <th style={{ textAlign: 'left' }}>State</th>
                <th style={{ textAlign: 'center' }}>Subscription</th>
                <th style={{ textAlign: 'left' }}>Registration Date</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentDrivers.map((item, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: '700', color: '#E05A1B' }}>
                    <span style={{ backgroundColor: '#FEF3EB', padding: '2px 6px', borderRadius: '4px', fontSize: '11px' }}>
                      {item.unique_id}
                    </span>
                  </td>
                  <td style={{ fontWeight: '700', color: '#0F172A' }}>
                    {item.name}
                  </td>
                  <td style={{ fontSize: '12px', color: '#475569' }}>
                    {item.mobile}
                  </td>
                  <td style={{ fontSize: '12px', color: '#334155' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={11} color="#94A3B8" />
                      <span>{item.state}</span>
                    </div>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {item.subscription_amount ? (
                      <span className="badge badge-success">₹{item.subscription_amount}</span>
                    ) : (
                      <span style={{ fontSize: '10px', color: '#94A3B8', backgroundColor: '#F1F5F9', padding: '2px 6px', borderRadius: '4px' }}>
                        Free Tier
                      </span>
                    )}
                  </td>
                  <td style={{ fontSize: '11px', color: '#64748B' }}>
                    {item.date}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      onClick={() => alert(`Viewing Driver Profile: ${item.name} (${item.unique_id})`)}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '6px',
                        border: '1px solid #CBD5E1',
                        backgroundColor: '#F8FAFC',
                        color: '#2563EB',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      title="View Driver Profile"
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

      {/* 2. RIGHT SIDE (col-4): LMS VIDEO & QUIZ PROGRESS */}
      <div
        style={{
          gridColumn: 'span 4',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '4px' }}>
          <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <GraduationCap size={18} color="#7C3AED" />
            LMS Driver Training Progress
          </h4>
          <span style={{ fontSize: '10px', color: '#7C3AED', fontWeight: '700', backgroundColor: '#F3E8FF', padding: '2px 6px', borderRadius: '4px' }}>
            3 Modules
          </span>
        </div>

        {lmsModules.map((mod, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: `1.5px solid ${mod.borderColor}`,
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 12px -2px rgba(0,0,0,0.06)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.03)';
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: mod.iconBg,
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <PlayCircle size={20} />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {mod.module}
              </div>
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px', display: 'flex', justifyContent: 'space-between' }}>
                <span>Videos Seen: <strong style={{ color: '#0F172A' }}>{mod.seen}</strong></span>
                <span>Quizzes: <strong style={{ color: mod.color }}>{mod.quiz}</strong></span>
              </div>
            </div>
          </div>
        ))}

        <div style={{ textAlign: 'center', marginTop: '4px' }}>
          <a
            href="/admin/lms-training"
            style={{
              fontSize: '11px',
              fontWeight: '700',
              color: '#7C3AED',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            View Complete Training Dashboard & Certificates <ArrowRight size={12} />
          </a>
        </div>
      </div>

    </div>
  );
};
