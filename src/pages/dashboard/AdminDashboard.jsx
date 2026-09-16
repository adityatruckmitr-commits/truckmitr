import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { usePermissions } from '../../context/PermissionContext';
import { StatCard } from '../../components/common/StatCard';
import { ExceptionAlert } from '../../components/common/ExceptionAlert';
import { WidgetGate } from '../../components/guards/WidgetGate';
import { getAuditLogs } from '../../services/mock/mockAuditLogs';
import {
  getUnifiedPendingApprovals,
  mutateUnifiedApproval,
  subscribeToApprovals
} from '../../services/approvalsRegistry';
import { INITIAL_USERS } from '../../services/mockRbacData';
import { SYSTEM_ROLES } from '../../utils/rbacConstants';
import {
  ShieldAlert,
  Users,
  ShieldCheck,
  Activity,
  History,
  Lock,
  UserCog,
  CheckCircle2,
  XCircle,
  Clock,
  Terminal,
  Server
} from 'lucide-react';

export const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const { can } = usePermissions();
  const navigate = useNavigate();

  const [auditLogs] = useState(() => getAuditLogs());
  const [approvalsList, setApprovalsList] = useState(() => getUnifiedPendingApprovals());

  useEffect(() => {
    const unsub = subscribeToApprovals(() => {
      setApprovalsList(getUnifiedPendingApprovals());
    });
    return () => unsub();
  }, []);

  // Filter approvals that require admin or executive level clearance
  const adminClearances = useMemo(() => {
    return approvalsList.filter(
      (a) => a.module === 'payroll' || a.module === 'transporters' || a.module === 'partners'
    );
  }, [approvalsList]);

  // Critical security incidents from audit logs
  const criticalSecurityEvents = useMemo(() => {
    return auditLogs.filter((l) => l.severity === 'CRITICAL' || l.severity === 'HIGH');
  }, [auditLogs]);

  // Quick Action
  const handleQuickApprove = (item, e) => {
    if (e) e.stopPropagation();
    mutateUnifiedApproval(item, 'APPROVE', 'Authorized via Super Admin Control Center');
  };

  const handleQuickReject = (item, e) => {
    if (e) e.stopPropagation();
    mutateUnifiedApproval(item, 'REJECT', 'Rejected via Super Admin Control Center');
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1440px', margin: '0 auto', fontFamily: "'Inter', sans-serif" }}>
      {/* 1. Header Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #312E81 0%, #4338CA 100%)',
          borderRadius: '20px',
          padding: '28px 32px',
          color: '#FFFFFF',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          boxShadow: '0 10px 25px rgba(67, 56, 202, 0.2)'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: '#EEF2FF',
                padding: '3px 10px',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: 700
              }}
            >
              🛡️ SUPER ADMIN CONTROL CENTER
            </span>
            <span style={{ color: '#C7D2FE', fontSize: '12px' }}>• System Health & Governance</span>
          </div>
          <h1 style={{ margin: '0 0 6px 0', fontSize: '26px', fontWeight: 800 }}>
            Security & Administration — {currentUser?.name || 'Deepak Arora'}
          </h1>
          <p style={{ margin: 0, fontSize: '13px', color: '#EEF2FF' }}>
            All systems operational (99.98% uptime) • {INITIAL_USERS.length} active corporate identities • RBAC matrix active.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => navigate('/one/users')}
            style={{
              backgroundColor: '#FFFFFF',
              color: '#3730A3',
              border: 'none',
              borderRadius: '10px',
              padding: '10px 16px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Manage Users
          </button>
          <button
            onClick={() => navigate('/one/roles')}
            style={{
              backgroundColor: 'rgba(255,255,255,0.15)',
              color: '#FFFFFF',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '10px',
              padding: '10px 16px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Permission Matrix →
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
        <WidgetGate module="users" title="Active Identities">
          <StatCard
            title="Total Users"
            value={String(INITIAL_USERS.length)}
            change="Across 6 Departments"
            isPositive={true}
            icon={Users}
            iconColor="#1467FF"
            iconBg="#EFF6FF"
            onClick={() => navigate('/one/users')}
          />
        </WidgetGate>

        <WidgetGate module="roles" title="Roles Configured">
          <StatCard
            title="System Roles"
            value={String(SYSTEM_ROLES.length)}
            change="5 Roles Defined"
            isPositive={true}
            icon={ShieldCheck}
            iconColor="#4338CA"
            iconBg="#EEF2FF"
            onClick={() => navigate('/one/roles')}
          />
        </WidgetGate>

        <WidgetGate module="audit-logs" title="Security Logs">
          <StatCard
            title="Audit Events Logged"
            value={String(auditLogs.length)}
            change={`${criticalSecurityEvents.length} High Severity`}
            isPositive={criticalSecurityEvents.length === 0}
            icon={ShieldAlert}
            iconColor="#DC2626"
            iconBg="#FEF2F2"
            onClick={() => navigate('/one/audit-logs')}
          />
        </WidgetGate>

        <WidgetGate module="settings" title="System Health">
          <StatCard
            title="System Health"
            value="99.98%"
            change="All Services Online"
            isPositive={true}
            icon={Activity}
            iconColor="#059669"
            iconBg="#ECFDF5"
            onClick={() => navigate('/one/settings')}
          />
        </WidgetGate>
      </div>

      {/* 3. Main Grid: Security Incidents & Admin Quick-Clearance */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '20px', marginBottom: '24px' }}>
        {/* Critical Alerts */}
        <WidgetGate module="audit-logs" title="Security & Threat Alerts">
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
                Security & Access Alerts
              </h3>
              <span style={{ fontSize: '11px', color: '#DC2626', fontWeight: 700 }}>
                {criticalSecurityEvents.length} Active Events
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {criticalSecurityEvents.map((evt) => (
                <ExceptionAlert
                  key={evt.id}
                  title={`${evt.module.toUpperCase()}: ${evt.summary}`}
                  description={`Actor: ${evt.user.name} • IP: ${evt.ipAddress}`}
                  severity={evt.severity === 'CRITICAL' ? 'critical' : 'warning'}
                  count={1}
                  onAction={() => navigate('/one/audit-logs')}
                />
              ))}
            </div>
          </div>
        </WidgetGate>

        {/* Admin Clearances Queue */}
        <WidgetGate module="approvals" title="Admin Authorizations">
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
                  Admin Authorization Queue
                </h3>
                <span style={{ fontSize: '11px', color: '#64748B' }}>Payroll & Transporter KYC clearances</span>
              </div>
              <button
                onClick={() => navigate('/one/approvals')}
                style={{ border: 'none', background: 'transparent', color: '#1467FF', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
              >
                Approvals Hub →
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {adminClearances.map((item) => (
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
                      {item.requestedBy} • {item.requestedAt}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={(e) => handleQuickApprove(item, e)}
                      style={{
                        backgroundColor: '#10B981',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '5px 9px',
                        fontSize: '11px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Approve
                    </button>
                    <button
                      onClick={(e) => handleQuickReject(item, e)}
                      style={{
                        backgroundColor: '#FFFFFF',
                        color: '#EF4444',
                        border: '1px solid #E2E8F0',
                        borderRadius: '6px',
                        padding: '5px 9px',
                        fontSize: '11px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </WidgetGate>
      </div>

      {/* 4. Immutable Audit Trail Table Preview */}
      <WidgetGate module="audit-logs" title="System Audit Trail">
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
                Recent Security Audit Trail
              </h3>
              <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#64748B' }}>
                Latest mutations across RBAC, users, and administrative operations
              </p>
            </div>
            <button
              onClick={() => navigate('/one/audit-logs')}
              style={{ border: 'none', background: 'transparent', color: '#1467FF', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
            >
              View Full Audit Trail →
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #E2E8F0', color: '#64748B' }}>
                  <th style={{ padding: '8px 12px', fontWeight: 700 }}>Timestamp</th>
                  <th style={{ padding: '8px 12px', fontWeight: 700 }}>Actor</th>
                  <th style={{ padding: '8px 12px', fontWeight: 700 }}>Module</th>
                  <th style={{ padding: '8px 12px', fontWeight: 700 }}>Action</th>
                  <th style={{ padding: '8px 12px', fontWeight: 700 }}>Event Summary</th>
                  <th style={{ padding: '8px 12px', fontWeight: 700 }}>Client IP</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.slice(0, 6).map((log) => (
                  <tr key={log.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '10px 12px', color: '#64748B', whiteSpace: 'nowrap' }}>{log.timestamp}</td>
                    <td style={{ padding: '10px 12px', fontWeight: 700, color: '#0F172A' }}>{log.user.name}</td>
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', backgroundColor: '#F1F5F9', color: '#334155' }}>
                        {log.module.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{ fontSize: '10px', fontWeight: 800, color: '#1467FF' }}>{log.action}</span>
                    </td>
                    <td style={{ padding: '10px 12px', color: '#334155' }}>{log.summary}</td>
                    <td style={{ padding: '10px 12px', fontFamily: 'monospace', color: '#64748B' }}>{log.ipAddress}</td>
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
