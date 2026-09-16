import React, { useState } from 'react';
import { usePermissions } from '../../context/PermissionContext';
import { StatCard } from '../../components/common/StatCard';
import { DataTable } from '../../components/common/DataTable';
import {
  ACQUISITION_CHANNELS,
  REGIONAL_GEOGRAPHY,
  RETENTION_COHORTS
} from '../../services/mock/mockGrowthAnalytics';
import {
  TrendingUp,
  Users,
  Truck,
  MapPin,
  Download,
  Filter,
  BarChart2,
  Compass,
  Repeat,
  Zap,
  Layers
} from 'lucide-react';

export const GrowthAnalyticsPage = () => {
  const { can } = usePermissions();
  const [activeTab, setActiveTab] = useState('acquisition'); // 'acquisition' | 'geography' | 'retention'

  const totalDrivers = 3891;
  const totalTransporters = 1056;

  const handleExportCsv = () => {
    let csvData = '';
    if (activeTab === 'acquisition') {
      csvData =
        'Channel,Drivers,Transporters,Conversion Rate,CAC\n' +
        ACQUISITION_CHANNELS.map(
          (c) => `"${c.channel}",${c.drivers},${c.transporters},"${c.conversionRate}","${c.cac}"`
        ).join('\n');
    } else if (activeTab === 'geography') {
      csvData =
        'State,Primary Hubs,Drivers,Transporters,Active Fleet,Growth MoM\n' +
        REGIONAL_GEOGRAPHY.map(
          (g) => `"${g.state}","${g.primaryHubs}",${g.drivers},${g.transporters},${g.activeFleet},"${g.growthMoM}"`
        ).join('\n');
    } else {
      csvData =
        'Cohort,Base Users,M0,M1,M2,M3,M4,M5\n' +
        RETENTION_COHORTS.map(
          (r) => `"${r.cohort}",${r.baseUsers},${r.m0 || ''}%,${r.m1 || ''}%,${r.m2 || ''}%,${r.m3 || ''}%,${r.m4 || ''}%,${r.m5 || ''}%`
        ).join('\n');
    }

    const encodedUri = encodeURI('data:text/csv;charset=utf-8,' + csvData);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `TruckMitr_Growth_${activeTab}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1440px', margin: '0 auto' }}>
      {/* Header Banner */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
            Growth & Platform Analytics
          </h1>
          <p style={{ color: '#64748B', fontSize: '14px', margin: '4px 0 0' }}>
            Multi-channel acquisition funnels, state-wise density heatmaps, and MoM cohort retention metrics.
          </p>
        </div>

        {can('growth-analytics', 'export') && (
          <button
            onClick={handleExportCsv}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#334155',
              cursor: 'pointer'
            }}
          >
            <Download size={16} /> Export {activeTab.toUpperCase()} CSV
          </button>
        )}
      </div>

      {/* KPI StatCards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}
      >
        <StatCard
          title="Total Registered Drivers"
          value={totalDrivers.toLocaleString('en-IN')}
          change="+18.4% MoM"
          isPositive={true}
          iconColor="#1467FF"
          iconBg="#EFF6FF"
          icon={Users}
        />
        <StatCard
          title="Transporters & Fleets"
          value={totalTransporters.toLocaleString('en-IN')}
          change="+12.6% MoM"
          isPositive={true}
          iconColor="#10B981"
          iconBg="#ECFDF5"
          icon={Truck}
        />
        <StatCard
          title="Blended CAC"
          value="₹128"
          change="-14.5% vs Q2 (Optimized)"
          isPositive={true}
          iconColor="#059669"
          iconBg="#ECFDF5"
          icon={Zap}
        />
        <StatCard
          title="90-Day Cohort Retention"
          value="74.2%"
          change="+4.8% vs last cohort"
          isPositive={true}
          iconColor="#8B5CF6"
          iconBg="#F3E8FF"
          icon={Repeat}
        />
      </div>

      {/* View Tabs */}
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid #E2E8F0',
          marginBottom: '20px',
          gap: '24px'
        }}
      >
        {[
          { id: 'acquisition', label: 'Acquisition Funnels & Channels', icon: BarChart2 },
          { id: 'geography', label: 'Regional & State Breakdown', icon: MapPin },
          { id: 'retention', label: 'Month-over-Month Cohort Retention', icon: Layers }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 4px',
                border: 'none',
                background: 'none',
                fontSize: '14px',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? '#1467FF' : '#64748B',
                borderBottom: isActive ? '2px solid #1467FF' : '2px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Acquisition Funnel */}
      {activeTab === 'acquisition' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '16px'
            }}
          >
            {ACQUISITION_CHANNELS.map((ch) => (
              <div
                key={ch.channel}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '20px',
                  border: '1px solid #E2E8F0',
                  borderTop: `4px solid ${ch.color}`
                }}
              >
                <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '15px' }}>{ch.channel}</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '16px' }}>
                  <div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>Drivers Sourced</div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: '#1467FF' }}>
                      {ch.drivers.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>Transporters</div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: '#10B981' }}>
                      {ch.transporters.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>Conversion Rate</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>{ch.conversionRate}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>Est. CAC</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#059669' }}>{ch.cac}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E2E8F0' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', marginTop: 0, marginBottom: '12px' }}>
              Acquisition Efficiency Insights
            </h3>
            <p style={{ fontSize: '13px', color: '#64748B', lineHeight: '1.6' }}>
              Highway Partner channels (Dhabas, Puncture shops, OEM dealerships) continue to produce the highest verified driver conversion rate (29.5%) with strong initial document completion rates.
              The field operations ground team produces the highest enterprise fleet acquisition rate.
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: Geography & Regional Breakdown */}
      {activeTab === 'geography' && (
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', marginTop: 0, marginBottom: '16px' }}>
            State-wise Density & Fleet Volume Leaderboard
          </h3>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #E2E8F0', backgroundColor: '#F8FAFC', textAlign: 'left' }}>
                  <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475569' }}>State / Region</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475569' }}>Key Industrial & Freight Hubs</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475569' }}>Drivers</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475569' }}>Transporters</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475569' }}>Active Fleet</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475569' }}>Growth MoM</th>
                </tr>
              </thead>
              <tbody>
                {REGIONAL_GEOGRAPHY.map((row, idx) => (
                  <tr key={row.state} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0F172A' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span
                          style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            backgroundColor: idx < 3 ? '#E0F2FE' : '#F1F5F9',
                            color: idx < 3 ? '#0284C7' : '#64748B',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '11px',
                            fontWeight: 800
                          }}
                        >
                          {idx + 1}
                        </span>
                        <span>{row.state}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', color: '#64748B' }}>{row.primaryHubs}</td>
                    <td style={{ padding: '14px 16px', fontWeight: 600, color: '#1467FF' }}>
                      {row.drivers.toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '14px 16px', fontWeight: 600, color: '#10B981' }}>
                      {row.transporters.toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0F172A' }}>
                      {row.activeFleet.toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '14px 16px', color: '#059669', fontWeight: 700 }}>
                      {row.growthMoM}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Cohort Retention */}
      {activeTab === 'retention' && (
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', marginTop: 0, marginBottom: '6px' }}>
            Transporter & Driver Monthly Cohort Retention Matrix
          </h3>
          <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '20px' }}>
            Percentage of active accounts transacting, dispatching, or taking trips within months following initial onboarding.
          </p>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'center' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: 700, color: '#475569' }}>Cohort</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: 700, color: '#475569' }}>Base Users</th>
                  <th style={{ padding: '12px', fontWeight: 700, color: '#475569' }}>Month 0</th>
                  <th style={{ padding: '12px', fontWeight: 700, color: '#475569' }}>Month 1</th>
                  <th style={{ padding: '12px', fontWeight: 700, color: '#475569' }}>Month 2</th>
                  <th style={{ padding: '12px', fontWeight: 700, color: '#475569' }}>Month 3</th>
                  <th style={{ padding: '12px', fontWeight: 700, color: '#475569' }}>Month 4</th>
                  <th style={{ padding: '12px', fontWeight: 700, color: '#475569' }}>Month 5</th>
                </tr>
              </thead>
              <tbody>
                {RETENTION_COHORTS.map((row) => (
                  <tr key={row.cohort} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '12px', textAlign: 'left', fontWeight: 700, color: '#0F172A' }}>{row.cohort}</td>
                    <td style={{ padding: '12px', textAlign: 'left', color: '#64748B', fontWeight: 600 }}>
                      {row.baseUsers.toLocaleString('en-IN')}
                    </td>
                    {[row.m0, row.m1, row.m2, row.m3, row.m4, row.m5].map((val, i) => {
                      if (val === null) {
                        return (
                          <td key={i} style={{ padding: '12px', color: '#CBD5E1' }}>
                            -
                          </td>
                        );
                      }
                      let bg = '#DCFCE7';
                      let text = '#15803D';
                      if (val < 70) {
                        bg = '#FEF3C7';
                        text = '#B45309';
                      }
                      if (val >= 85) {
                        bg = '#DBEAFE';
                        text = '#1E40AF';
                      }
                      return (
                        <td key={i} style={{ padding: '10px' }}>
                          <span
                            style={{
                              display: 'inline-block',
                              padding: '4px 10px',
                              borderRadius: '6px',
                              backgroundColor: bg,
                              color: text,
                              fontWeight: 700,
                              fontSize: '12px',
                              minWidth: '48px'
                            }}
                          >
                            {val}%
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
