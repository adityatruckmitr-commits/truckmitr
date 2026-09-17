import React, { useState } from 'react';
import { 
  Users, 
  Truck, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Search, 
  Filter, 
  ArrowUpRight,
  MapPin,
  Phone,
  UserCheck,
  Building2,
  Wrench,
  Coffee
} from 'lucide-react';

export const RecentActivityTables = () => {
  const [roleSearch, setRoleSearch] = useState('');
  const [activityFilter, setActivityFilter] = useState('all');

  // Role Breakdown Summary matching AdminController metrics
  const roleBreakdown = [
    {
      role: 'Commercial Drivers',
      total: 18420,
      active: 16890,
      pendingKyc: 1140,
      rejected: 390,
      icon: Truck,
      color: '#E05A1B',
      bgColor: '#FEF3EB',
      growth: '+14.2%',
    },
    {
      role: 'Transporters & Fleet Owners',
      total: 5210,
      active: 4890,
      pendingKyc: 240,
      rejected: 80,
      icon: Building2,
      color: '#0D9488',
      bgColor: '#E6FFFA',
      growth: '+8.6%',
    },
    {
      role: 'Fleet Foremans',
      total: 1140,
      active: 1050,
      pendingKyc: 65,
      rejected: 25,
      icon: Users,
      color: '#7C3AED',
      bgColor: '#F3E8FF',
      growth: '+5.4%',
    },
    {
      role: 'Transport Associations',
      total: 380,
      active: 365,
      pendingKyc: 12,
      rejected: 3,
      icon: ShieldCheck,
      color: '#2563EB',
      bgColor: '#EFF6FF',
      growth: '+3.1%',
    },
    {
      role: 'Highway Dhabas',
      total: 1650,
      active: 1520,
      pendingKyc: 95,
      rejected: 35,
      icon: Coffee,
      color: '#D97706',
      bgColor: '#FEF3C7',
      growth: '+11.8%',
    },
    {
      role: 'Puncture & Repair Hubs',
      total: 2190,
      active: 2010,
      pendingKyc: 130,
      rejected: 50,
      icon: Wrench,
      color: '#059669',
      bgColor: '#D1FAE5',
      growth: '+9.4%',
    },
  ];

  // Recent Onboardings / Live Feed
  const recentActivities = [
    {
      id: 'TM-89412',
      name: 'Rajesh Kumar Yadav',
      phone: '+91 98765 43210',
      role: 'Driver',
      roleColor: '#E05A1B',
      roleBg: '#FEF3EB',
      state: 'Maharashtra (Pune)',
      date: 'Just now',
      kycStatus: 'Verified',
      kycBadge: 'badge-success',
      avatar: 'RK',
    },
    {
      id: 'TM-89411',
      name: 'Apex Logistics Corp',
      phone: '+91 98231 11223',
      role: 'Transporter',
      roleColor: '#0D9488',
      roleBg: '#E6FFFA',
      state: 'Gujarat (Ahmedabad)',
      date: '4 mins ago',
      kycStatus: 'Verified',
      kycBadge: 'badge-success',
      avatar: 'AL',
    },
    {
      id: 'TM-89410',
      name: 'Balwinder Singh Sandhu',
      phone: '+91 99123 44556',
      role: 'Driver',
      roleColor: '#E05A1B',
      roleBg: '#FEF3EB',
      state: 'Punjab (Ludhiana)',
      date: '12 mins ago',
      kycStatus: 'Pending KYC',
      kycBadge: 'badge-warning',
      avatar: 'BS',
    },
    {
      id: 'TM-89409',
      name: 'Shree Ganesh Dhaba & Rest',
      phone: '+91 97654 32198',
      role: 'Dhaba',
      roleColor: '#D97706',
      roleBg: '#FEF3C7',
      state: 'Rajasthan (Jaipur NH-8)',
      date: '25 mins ago',
      kycStatus: 'Verified',
      kycBadge: 'badge-success',
      avatar: 'SG',
    },
    {
      id: 'TM-89408',
      name: 'Manoj Kumar Tiwari',
      phone: '+91 91234 56789',
      role: 'Foreman',
      roleColor: '#7C3AED',
      roleBg: '#F3E8FF',
      state: 'Uttar Pradesh (Kanpur)',
      date: '42 mins ago',
      kycStatus: 'Verified',
      kycBadge: 'badge-success',
      avatar: 'MT',
    },
    {
      id: 'TM-89407',
      name: 'National Truck Tyres & Repair',
      phone: '+91 98321 65498',
      role: 'Puncture Hub',
      roleColor: '#059669',
      roleBg: '#D1FAE5',
      state: 'Haryana (Gurugram)',
      date: '1 hour ago',
      kycStatus: 'Pending KYC',
      kycBadge: 'badge-warning',
      avatar: 'NT',
    },
  ];

  const filteredActivities = recentActivities.filter((act) => {
    if (activityFilter === 'all') return true;
    if (activityFilter === 'verified') return act.kycStatus === 'Verified';
    if (activityFilter === 'pending') return act.kycStatus === 'Pending KYC';
    if (activityFilter === 'drivers') return act.role === 'Driver';
    return true;
  });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '20px', marginBottom: '24px' }}>
      
      {/* 1. ROLE WISE DISTRIBUTION CARD */}
      <div className="card-saas">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid #F1F5F9' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={18} color="#E05A1B" />
              Role-Wise Member Overview
            </h3>
            <p style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
              Active users, pending verifications, and verified profiles by category
            </p>
          </div>
          <span style={{ fontSize: '11px', fontWeight: '700', backgroundColor: '#F1F5F9', color: '#475569', padding: '4px 8px', borderRadius: '6px' }}>
            6 User Categories
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {roleBreakdown.map((item, idx) => {
            const Icon = item.icon;
            const activePercent = Math.round((item.active / item.total) * 100);

            return (
              <div
                key={idx}
                style={{
                  padding: '12px',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '10px',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '1 1 200px' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '8px',
                      backgroundColor: item.bgColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={19} color={item.color} />
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#0F172A' }}>{item.role}</div>
                    <div style={{ fontSize: '11px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: '#059669', fontWeight: '600' }}>{item.growth}</span>
                      <span>•</span>
                      <span>{item.active.toLocaleString('en-IN')} active</span>
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'center', minWidth: '90px' }}>
                  <div style={{ fontSize: '14px', fontWeight: '800', color: '#0F172A' }}>
                    {item.total.toLocaleString('en-IN')}
                  </div>
                  <div style={{ fontSize: '10px', color: '#94A3B8' }}>Total Registered</div>
                </div>

                <div style={{ minWidth: '110px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '3px' }}>
                    <span style={{ color: '#64748B', fontWeight: '600' }}>Active %</span>
                    <span style={{ color: item.color, fontWeight: '700' }}>{activePercent}%</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', backgroundColor: '#E2E8F0', borderRadius: '999px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${activePercent}%`,
                        height: '100%',
                        backgroundColor: item.color,
                        borderRadius: '999px',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', minWidth: '70px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      color: item.pendingKyc > 0 ? '#D97706' : '#059669',
                      backgroundColor: item.pendingKyc > 0 ? '#FEF3C7' : '#D1FAE5',
                      padding: '2px 7px',
                      borderRadius: '4px',
                    }}
                  >
                    {item.pendingKyc} KYC Req
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. RECENT REGISTRATIONS & LIVE FEED */}
      <div className="card-saas">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid #F1F5F9' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={18} color="#0D9488" />
              Live Registration Stream
            </h3>
            <p style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
              Real-time user on-boardings, verified profiles, and KYC updates
            </p>
          </div>

          <div style={{ display: 'flex', gap: '4px' }}>
            {['all', 'verified', 'pending', 'drivers'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActivityFilter(tab)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: activityFilter === tab ? '1px solid #0D9488' : '1px solid #E2E8F0',
                  backgroundColor: activityFilter === tab ? '#E6FFFA' : '#FFFFFF',
                  color: activityFilter === tab ? '#0D9488' : '#64748B',
                  fontSize: '11px',
                  fontWeight: '700',
                  textTransform: 'capitalize',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {filteredActivities.map((act, index) => (
            <div
              key={index}
              style={{
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid #F1F5F9',
                backgroundColor: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F8FAFC';
                e.currentTarget.style.borderColor = '#CBD5E1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.borderColor = '#F1F5F9';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: act.roleBg,
                    color: act.roleColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: '800',
                    flexShrink: 0,
                  }}
                >
                  {act.avatar}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#0F172A' }}>{act.name}</span>
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: '700',
                        color: act.roleColor,
                        backgroundColor: act.roleBg,
                        padding: '1px 6px',
                        borderRadius: '4px',
                      }}
                    >
                      {act.role}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <Phone size={10} color="#94A3B8" /> {act.phone}
                    </span>
                    <span>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <MapPin size={10} color="#94A3B8" /> {act.state}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span className={`badge ${act.kycBadge}`} style={{ fontSize: '10px', marginBottom: '2px' }}>
                  {act.kycStatus}
                </span>
                <div style={{ fontSize: '10px', color: '#94A3B8', marginTop: '2px' }}>
                  {act.date}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '14px', textAlign: 'center', paddingTop: '10px', borderTop: '1px solid #F1F5F9' }}>
          <button
            style={{
              background: 'transparent',
              border: 'none',
              color: '#0D9488',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            View Complete Member Directory (29,000+ Profiles)
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>

    </div>
  );
};
