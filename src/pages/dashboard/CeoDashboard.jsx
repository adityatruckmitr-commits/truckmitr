import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { usePermissions } from '../../context/PermissionContext';
import { StatCard } from '../../components/common/StatCard';
import { ExceptionAlert } from '../../components/common/ExceptionAlert';
import { PerformanceChart } from '../../components/charts/PerformanceChart';
import { DonutChart } from '../../components/charts/DonutChart';
import { BarTrendChart } from '../../components/charts/BarTrendChart';
import { FunnelPipeline } from '../../components/charts/FunnelPipeline';
import { WidgetGate } from '../../components/guards/WidgetGate';
import { getUnifiedPendingApprovals, subscribeToApprovals } from '../../services/approvalsRegistry';
import {
  IndianRupee,
  UserCheck,
  Truck,
  Briefcase,
  Users,
  PhoneCall,
  Calendar,
  Sparkles,
  ArrowRight,
  UserPlus,
  PlusCircle,
  PhoneForwarded,
  ShieldCheck
} from 'lucide-react';
import {
  BUSINESS_PERFORMANCE_DATA,
  MATCHMAKING_PIPELINE_DATA,
  REVENUE_MIX_DATA,
  CALL_OUTCOMES_DATA,
  DRIVER_TRANSPORTER_TREND,
  ACTION_CENTRE_ITEMS,
  TOP_PERFORMERS,
  RECENT_ACTIVITIES
} from '../../services/dashboardMockData';

export const CeoDashboard = () => {
  const { currentUser } = useAuth();
  const { can } = usePermissions();
  const navigate = useNavigate();

  const [pendingApprovalsCount, setPendingApprovalsCount] = useState(() => getUnifiedPendingApprovals().length);

  useEffect(() => {
    const unsub = subscribeToApprovals(() => {
      setPendingApprovalsCount(getUnifiedPendingApprovals().length);
    });
    return () => unsub();
  }, []);

  return (
    <div style={{ padding: '24px', maxWidth: '1440px', margin: '0 auto', fontFamily: "'Inter', sans-serif" }}>
      {/* 1. Panoramic Welcome Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0B223A 0%, #07192B 60%, #0F365E 100%)',
          borderRadius: '20px',
          padding: '28px 32px',
          color: '#FFFFFF',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          boxShadow: '0 10px 30px rgba(7, 25, 43, 0.15)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span
              style={{
                backgroundColor: 'rgba(20, 103, 255, 0.25)',
                color: '#60A5FA',
                padding: '3px 10px',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: 700,
                border: '1px solid rgba(96, 165, 250, 0.3)'
              }}
            >
              👑 CEO EXECUTIVE COCKPIT
            </span>
            <span style={{ color: '#94A3B8', fontSize: '12px' }}>• Strategic View</span>
          </div>
          <h1 style={{ margin: '0 0 6px 0', fontSize: '26px', fontWeight: 800, letterSpacing: '-0.5px' }}>
            Good Afternoon, {currentUser?.name || 'Anil'} 👋
          </h1>
          <p style={{ margin: 0, fontSize: '13px', color: '#94A3B8' }}>
            Here is your live enterprise pulse across drivers, transporters, revenue streams, and pending approvals.
          </p>
        </div>

        <div style={{ zIndex: 2, display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '12px',
              padding: '10px 16px',
              textAlign: 'right'
            }}
          >
            <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 600 }}>TODAY'S DATE</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF' }}>Wednesday, 10 Sep 2026</div>
          </div>
        </div>

        {/* Ambient glow accent */}
        <div
          style={{
            position: 'absolute',
            right: '-60px',
            top: '-60px',
            width: '240px',
            height: '240px',
            borderRadius: '50%',
            backgroundColor: 'rgba(20, 103, 255, 0.15)',
            filter: 'blur(50px)',
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* 2. Top Executive StatCards Grid (Each gated with WidgetGate) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}
      >
        <WidgetGate module="revenue" title="Weekly Marketplace Revenue">
          <StatCard
            title="Weekly Marketplace Revenue"
            value="85,882"
            prefix="₹"
            change="+12%"
            isPositive={true}
            icon={IndianRupee}
            iconColor="#10B981"
            iconBg="#ECFDF5"
            onClick={() => navigate('/one/revenue')}
          />
        </WidgetGate>

        <WidgetGate module="drivers" title="Driver Registrations">
          <StatCard
            title="Driver Registrations"
            value="3,891"
            change="+8%"
            isPositive={true}
            icon={UserCheck}
            iconColor="#1467FF"
            iconBg="#EFF6FF"
            onClick={() => navigate('/one/drivers')}
          />
        </WidgetGate>

        <WidgetGate module="transporters" title="Transporters">
          <StatCard
            title="Transporter Registrations"
            value="1,056"
            change="+5%"
            isPositive={true}
            icon={Truck}
            iconColor="#8B5CF6"
            iconBg="#F3E8FF"
            onClick={() => navigate('/one/transporters')}
          />
        </WidgetGate>

        <WidgetGate module="matchmaking" title="Active Jobs">
          <StatCard
            title="Active Jobs"
            value="116"
            change="+18%"
            isPositive={true}
            icon={Briefcase}
            iconColor="#F59E0B"
            iconBg="#FEF3C7"
            onClick={() => navigate('/one/matchmaking')}
          />
        </WidgetGate>

        <WidgetGate module="revenue" title="Paid Users">
          <StatCard
            title="Paid Users"
            value="108"
            change="+11%"
            isPositive={true}
            icon={Users}
            iconColor="#EC4899"
            iconBg="#FCE7F3"
            onClick={() => navigate('/one/revenue')}
          />
        </WidgetGate>

        <WidgetGate module="crm" title="Total Calls Today">
          <StatCard
            title="Total Calls Today"
            value="4,520"
            change="+7%"
            isPositive={true}
            icon={PhoneCall}
            iconColor="#0284C7"
            iconBg="#E0F2FE"
            onClick={() => navigate('/one/crm')}
          />
        </WidgetGate>
      </div>

      {/* 3. Main Operational & Business Performance Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1.2fr',
          gap: '20px',
          marginBottom: '24px'
        }}
      >
        {/* Business Performance 9M Combo Chart */}
        <WidgetGate module="growth-analytics" title="Business Performance Trend">
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>
                  Business Performance
                </h3>
                <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748B' }}>
                  Monthly Revenue (₹) vs Driver & Transporter Registrations
                </p>
              </div>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  backgroundColor: '#F1F5F9',
                  color: '#475569',
                  padding: '4px 10px',
                  borderRadius: '8px'
                }}
              >
                Last 9 Months
              </span>
            </div>

            <PerformanceChart data={BUSINESS_PERFORMANCE_DATA} height={280} />
          </div>
        </WidgetGate>

        {/* Executive Action Centre (Urgent Exceptions / SLA Breaches) */}
        <WidgetGate module="approvals" title="Executive Action Centre">
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>
                  Action Centre
                </h3>
                <span
                  style={{
                    backgroundColor: '#EF4444',
                    color: '#FFF',
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: '999px'
                  }}
                >
                  {pendingApprovalsCount}
                </span>
              </div>
              <button
                onClick={() => navigate('/one/approvals')}
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: '#1467FF',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                View All →
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', maxHeight: '280px' }}>
              {ACTION_CENTRE_ITEMS.map((item) => (
                <ExceptionAlert
                  key={item.id}
                  title={item.label}
                  count={item.count}
                  severity={item.level === 'CRITICAL' ? 'critical' : 'warning'}
                  actionLabel="Resolve"
                  onAction={() => navigate(item.route)}
                />
              ))}
            </div>
          </div>
        </WidgetGate>
      </div>

      {/* 4. Matchmaking Pipeline Funnel Row */}
      <div style={{ marginBottom: '24px' }}>
        <WidgetGate module="matchmaking" title="Matchmaking Pipeline Funnel">
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>
                  Matchmaking Conversion Funnel
                </h3>
                <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748B' }}>
                  Full lifecycle stage progression from job posting to driver onboarding
                </p>
              </div>
              <button
                onClick={() => navigate('/one/matchmaking')}
                style={{
                  border: 'none',
                  background: '#EFF6FF',
                  color: '#1467FF',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Open Console
              </button>
            </div>

            <FunnelPipeline data={MATCHMAKING_PIPELINE_DATA} />
          </div>
        </WidgetGate>
      </div>

      {/* 5. Donut Breakdowns Row (Revenue Mix, Call Outcomes, Growth Trend) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '20px',
          marginBottom: '24px'
        }}
      >
        {/* Revenue Mix Donut */}
        <WidgetGate module="revenue" title="Revenue Mix">
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
                Weekly Revenue Mix
              </h3>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#059669' }}>
                ₹85,882 Weekly
              </span>
            </div>
            <DonutChart data={REVENUE_MIX_DATA} centerValue="₹85.8k" centerLabel="Weekly Total" height={200} />
          </div>
        </WidgetGate>

        {/* Call Outcomes Donut */}
        <WidgetGate module="crm" title="Call Outcomes">
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
                Call Outcomes
              </h3>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#0284C7' }}>
                4,520 Calls
              </span>
            </div>
            <DonutChart data={CALL_OUTCOMES_DATA} centerValue="4,520" centerLabel="Total Calls" height={200} />
          </div>
        </WidgetGate>

        {/* Monthly Driver vs Transporter Growth */}
        <WidgetGate module="growth-analytics" title="Driver & Transporter Growth">
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
                User Growth Trend
              </h3>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748B' }}>
                Drivers vs Transporters
              </span>
            </div>
            <BarTrendChart data={DRIVER_TRANSPORTER_TREND} height={200} />
          </div>
        </WidgetGate>
      </div>

      {/* 6. Recent Operational Activities Table & Top Performers */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1.2fr',
          gap: '20px'
        }}
      >
        {/* Recent Activities (Operational Activity Feed gated by operations access, linking to audit trail if permitted) */}
        <WidgetGate module={['drivers', 'matchmaking', 'transporters', 'audit-logs']} title="Recent Operational Activities">
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
                  Recent Operational Activities
                </h3>
                <span style={{ fontSize: '11px', color: '#64748B' }}>Live operations stream</span>
              </div>
              {can('audit-logs', 'view') ? (
                <button
                  onClick={() => navigate('/one/audit-logs')}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color: '#1467FF',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  View Audit Trail →
                </button>
              ) : (
                <button
                  onClick={() => navigate('/one/drivers')}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color: '#1467FF',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  View Operations →
                </button>
              )}
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #E2E8F0', color: '#64748B' }}>
                    <th style={{ padding: '8px 12px', fontWeight: 700 }}>Time</th>
                    <th style={{ padding: '8px 12px', fontWeight: 700 }}>Type</th>
                    <th style={{ padding: '8px 12px', fontWeight: 700 }}>Details</th>
                    <th style={{ padding: '8px 12px', fontWeight: 700 }}>User</th>
                    <th style={{ padding: '8px 12px', fontWeight: 700 }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT_ACTIVITIES.map((act, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '10px 12px', color: '#64748B' }}>{act.time}</td>
                      <td style={{ padding: '10px 12px', fontWeight: 600, color: '#0F172A' }}>{act.type}</td>
                      <td style={{ padding: '10px 12px', color: '#334155' }}>{act.details}</td>
                      <td style={{ padding: '10px 12px', fontWeight: 600, color: '#1467FF' }}>{act.user}</td>
                      <td style={{ padding: '10px 12px' }}>
                        <span
                          style={{
                            padding: '2px 8px',
                            borderRadius: '999px',
                            fontSize: '10px',
                            fontWeight: 700,
                            backgroundColor: act.status === 'Completed' ? '#ECFDF5' : '#FEF3C7',
                            color: act.status === 'Completed' ? '#059669' : '#D97706'
                          }}
                        >
                          {act.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </WidgetGate>

        {/* Top Performers Today */}
        <WidgetGate module="crm" title="Top Performers Today">
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
                Top Performers Today
              </h3>
              <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>By Conversions</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {TOP_PERFORMERS.map((perf) => (
                <div
                  key={perf.name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: '10px',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #F1F5F9'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: perf.rank === 1 ? '#FEF3C7' : '#F1F5F9',
                        color: perf.rank === 1 ? '#D97706' : '#64748B',
                        fontSize: '11px',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {perf.rank}
                    </span>
                    <img
                      src={perf.avatar}
                      alt={perf.name}
                      style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>
                      {perf.name}
                    </span>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#059669' }}>
                      {perf.conversions} Conversions
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>
                      ₹{perf.revenue.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </WidgetGate>
      </div>
    </div>
  );
};
