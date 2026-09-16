import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { usePermissions } from '../../context/PermissionContext';
import { StatCard } from '../../components/common/StatCard';
import { ExceptionAlert } from '../../components/common/ExceptionAlert';
import { FunnelPipeline } from '../../components/charts/FunnelPipeline';
import { DonutChart } from '../../components/charts/DonutChart';
import { WidgetGate } from '../../components/guards/WidgetGate';
import {
  getUnifiedPendingApprovals,
  mutateUnifiedApproval,
  subscribeToApprovals
} from '../../services/approvalsRegistry';
import { getAuditLogs } from '../../services/mock/mockAuditLogs';
import { getTasks, subscribeToTasks } from '../../services/mock/mockTasks';
import { MATCHMAKING_FUNNEL_DATA } from '../../services/mock/mockMatchmaking';
import { CALL_OUTCOMES_DATA } from '../../services/dashboardMockData';
import {
  Briefcase,
  Users,
  PhoneCall,
  UserCheck,
  AlertCircle,
  Truck,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  GitFork,
  CheckSquare
} from 'lucide-react';

export const ManagerDashboard = () => {
  const { currentUser } = useAuth();
  const { can } = usePermissions();
  const navigate = useNavigate();

  const [approvalsList, setApprovalsList] = useState(() => getUnifiedPendingApprovals());
  const [tasksList, setTasksList] = useState(() => getTasks());
  const [auditLogs] = useState(() => getAuditLogs());

  useEffect(() => {
    const unsubAppr = subscribeToApprovals(() => {
      setApprovalsList(getUnifiedPendingApprovals());
    });
    const unsubTasks = subscribeToTasks(() => {
      setTasksList(getTasks());
    });
    return () => {
      unsubAppr();
      unsubTasks();
    };
  }, []);

  // Filter approvals manager can act on (drivers, transporters, matchmaking, expenses, leaves)
  const managerActionableApprovals = useMemo(() => {
    return approvalsList.filter((item) => can(item.module, 'approve'));
  }, [approvalsList, can]);

  // SLA Breaches / Overdue work items
  const overdueExceptions = useMemo(() => {
    const overdueTasks = tasksList.filter((t) => t.status === 'OVERDUE');
    const urgentApprovals = approvalsList.filter((a) => a.severity === 'HIGH');
    return { overdueTasks, urgentApprovals };
  }, [tasksList, approvalsList]);

  // Team activity table: filtered to operations, matchmaking, drivers, transporters, crm
  const teamActivities = useMemo(() => {
    const opsModules = ['matchmaking', 'drivers', 'transporters', 'crm', 'leaves', 'expenses'];
    return auditLogs.filter((l) => opsModules.includes(l.module)).slice(0, 6);
  }, [auditLogs]);

  // Handle Quick Approve
  const handleQuickApprove = (item, e) => {
    if (e) e.stopPropagation();
    mutateUnifiedApproval(item, 'APPROVE', 'Authorized via Operations Manager Cockpit');
  };

  const handleQuickReject = (item, e) => {
    if (e) e.stopPropagation();
    mutateUnifiedApproval(item, 'REJECT', 'Rejected via Operations Manager Cockpit');
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1440px', margin: '0 auto', fontFamily: "'Inter', sans-serif" }}>
      {/* 1. Header Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #075985 0%, #0369A1 100%)',
          borderRadius: '20px',
          padding: '28px 32px',
          color: '#FFFFFF',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          boxShadow: '0 10px 25px rgba(3, 105, 161, 0.2)'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: '#E0F2FE',
                padding: '3px 10px',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: 700
              }}
            >
              💼 OPERATIONS DESK
            </span>
            <span style={{ color: '#BAE6FD', fontSize: '12px' }}>• Team Performance & Velocity</span>
          </div>
          <h1 style={{ margin: '0 0 6px 0', fontSize: '26px', fontWeight: 800 }}>
            Operations Cockpit — {currentUser?.name || 'Aditya Kumar'}
          </h1>
          <p style={{ margin: 0, fontSize: '13px', color: '#E0F2FE' }}>
            Live throughput monitoring across driver fulfillment, transporter jobs, team SLA compliance, and pending approvals.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => navigate('/one/matchmaking')}
            style={{
              backgroundColor: '#FFFFFF',
              color: '#0369A1',
              border: 'none',
              borderRadius: '10px',
              padding: '10px 18px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(0,0,0,0.1)'
            }}
          >
            Match Drivers Now →
          </button>
        </div>
      </div>

      {/* 2. Top Summary StatCards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}
      >
        <WidgetGate module="matchmaking" title="Active Matchmaking Pipeline">
          <StatCard
            title="Active Job Pipeline"
            value="128"
            change="+18%"
            isPositive={true}
            icon={GitFork}
            iconColor="#1467FF"
            iconBg="#EFF6FF"
            onClick={() => navigate('/one/matchmaking')}
          />
        </WidgetGate>

        <WidgetGate module="crm" title="Calls Handled Today">
          <StatCard
            title="Team Calls Today"
            value="4,520"
            change="+7%"
            isPositive={true}
            icon={PhoneCall}
            iconColor="#10B981"
            iconBg="#ECFDF5"
            onClick={() => navigate('/one/crm')}
          />
        </WidgetGate>

        <WidgetGate module="approvals" title="Pending Team Approvals">
          <StatCard
            title="Awaiting Your Approval"
            value={String(managerActionableApprovals.length)}
            change={`${managerActionableApprovals.length} Actions Required`}
            isPositive={managerActionableApprovals.length === 0}
            icon={Clock}
            iconColor="#F59E0B"
            iconBg="#FEF3C7"
            onClick={() => navigate('/one/approvals')}
          />
        </WidgetGate>

        <WidgetGate module="tasks" title="Active Tasks">
          <StatCard
            title="Team Deliverables"
            value={String(tasksList.filter((t) => t.status !== 'DONE').length)}
            change={`${overdueExceptions.overdueTasks.length} Overdue SLA`}
            isPositive={overdueExceptions.overdueTasks.length === 0}
            icon={CheckSquare}
            iconColor="#8B5CF6"
            iconBg="#F3E8FF"
            onClick={() => navigate('/one/tasks')}
          />
        </WidgetGate>
      </div>

      {/* 3. Matchmaking Funnel Pipeline */}
      <div style={{ marginBottom: '24px' }}>
        <WidgetGate module="matchmaking" title="Matchmaking Conversion Funnel">
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
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>
                  Matchmaking Pipeline Throughput
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
                Open Console →
              </button>
            </div>
            <FunnelPipeline data={MATCHMAKING_FUNNEL_DATA} />
          </div>
        </WidgetGate>
      </div>

      {/* 4. Row: Quick-Approve Inbox & SLA Exception Alerts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px', marginBottom: '24px' }}>
        {/* Quick Approve Slice */}
        <WidgetGate module="approvals" title="Manager Quick-Approve Queue">
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
                  Quick Approval Queue
                </h3>
                <span style={{ fontSize: '11px', fontWeight: 800, backgroundColor: '#EFF6FF', color: '#1467FF', padding: '2px 8px', borderRadius: '999px' }}>
                  {managerActionableApprovals.length} Pending
                </span>
              </div>
              <button
                onClick={() => navigate('/one/approvals')}
                style={{ border: 'none', background: 'transparent', color: '#1467FF', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
              >
                View Hub →
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '280px', overflowY: 'auto' }}>
              {managerActionableApprovals.length === 0 ? (
                <div style={{ padding: '24px', textAlign: 'center', color: '#64748B', fontSize: '13px' }}>
                  <CheckCircle2 size={24} color="#10B981" style={{ margin: '0 auto 6px' }} />
                  No pending approvals awaiting your authorization.
                </div>
              ) : (
                managerActionableApprovals.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    style={{
                      padding: '12px',
                      borderRadius: '10px',
                      backgroundColor: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '10px', fontWeight: 800, color: item.badgeColor, backgroundColor: item.badgeBg, padding: '1px 6px', borderRadius: '4px' }}>
                          {item.module.toUpperCase()}
                        </span>
                        <strong style={{ fontSize: '13px', color: '#0F172A' }}>{item.title}</strong>
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                        From: {item.requestedBy} ({item.department}) • {item.requestedAt}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <button
                        onClick={(e) => handleQuickApprove(item, e)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '3px',
                          padding: '5px 9px',
                          borderRadius: '6px',
                          border: 'none',
                          backgroundColor: '#10B981',
                          color: '#FFFFFF',
                          fontSize: '11px',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        <CheckCircle2 size={12} /> Approve
                      </button>
                      <button
                        onClick={(e) => handleQuickReject(item, e)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '3px',
                          padding: '5px 9px',
                          borderRadius: '6px',
                          border: '1px solid #E2E8F0',
                          backgroundColor: '#FFFFFF',
                          color: '#EF4444',
                          fontSize: '11px',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        <XCircle size={12} /> Reject
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </WidgetGate>

        {/* SLA Exceptions */}
        <WidgetGate module="crm" title="Operational Exceptions & SLA Alerts">
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
                SLA Breaches & Escalations
              </h3>
              <span style={{ fontSize: '11px', color: '#EF4444', fontWeight: 700 }}>
                {overdueExceptions.overdueTasks.length + overdueExceptions.urgentApprovals.length} Exceptions
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {overdueExceptions.overdueTasks.map((t) => (
                <ExceptionAlert
                  key={t.id}
                  title={`Overdue Task: ${t.title}`}
                  description={`Assigned to ${t.assignee?.name} • Due ${t.dueDate}`}
                  severity="critical"
                  count={1}
                  onAction={() => navigate('/one/tasks')}
                />
              ))}
              {overdueExceptions.urgentApprovals.map((a) => (
                <ExceptionAlert
                  key={a.id}
                  title={`Urgent Clearance: ${a.title}`}
                  description={`Submitted by ${a.requestedBy} (${a.moduleLabel})`}
                  severity="warning"
                  count={1}
                  onAction={() => navigate('/one/approvals')}
                />
              ))}
            </div>
          </div>
        </WidgetGate>
      </div>

      {/* 5. Team Activity Stream Table */}
      <WidgetGate module={['matchmaking', 'drivers', 'transporters', 'crm']} title="Team Operational Activities">
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
                Team Operational Activity Stream
              </h3>
              <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#64748B' }}>
                Live action feed across direct reports in Operations & Calling desk
              </p>
            </div>
            {can('audit-logs', 'view') && (
              <button
                onClick={() => navigate('/one/audit-logs')}
                style={{ border: 'none', background: 'transparent', color: '#1467FF', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
              >
                View Full Audit Trail →
              </button>
            )}
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #E2E8F0', color: '#64748B' }}>
                  <th style={{ padding: '8px 12px', fontWeight: 700 }}>Time</th>
                  <th style={{ padding: '8px 12px', fontWeight: 700 }}>User Actor</th>
                  <th style={{ padding: '8px 12px', fontWeight: 700 }}>Module</th>
                  <th style={{ padding: '8px 12px', fontWeight: 700 }}>Action</th>
                  <th style={{ padding: '8px 12px', fontWeight: 700 }}>Event Summary</th>
                </tr>
              </thead>
              <tbody>
                {teamActivities.map((act) => (
                  <tr key={act.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '10px 12px', color: '#64748B' }}>{act.timestamp}</td>
                    <td style={{ padding: '10px 12px', fontWeight: 700, color: '#0F172A' }}>
                      {act.user?.name}
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', backgroundColor: '#F1F5F9', color: '#334155' }}>
                        {act.module.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{ fontSize: '10px', fontWeight: 800, color: '#1467FF' }}>{act.action}</span>
                    </td>
                    <td style={{ padding: '10px 12px', color: '#334155' }}>{act.summary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </WidgetGate>
    </div>
  );
};
