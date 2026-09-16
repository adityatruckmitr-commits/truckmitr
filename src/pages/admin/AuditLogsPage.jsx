import React, { useState, useMemo } from 'react';
import { usePermissions } from '../../context/PermissionContext';
import { useAuth } from '../../context/AuthContext';
import {
  getAuditLogs,
  AUDIT_ACTIONS,
  AUDIT_MODULES
} from '../../services/mock/mockAuditLogs';
import { DataTable } from '../../components/common/DataTable';
import { Drawer } from '../../components/common/Drawer';
import { StatCard } from '../../components/common/StatCard';
import {
  ShieldCheck,
  Search,
  Filter,
  Download,
  AlertTriangle,
  Clock,
  User,
  Layers,
  ArrowRight,
  Terminal,
  Activity,
  FileCode
} from 'lucide-react';

export const AuditLogsPage = () => {
  const { can } = usePermissions();
  const { currentUser } = useAuth();

  const [logs] = useState(() => getAuditLogs());
  const [selectedModule, setSelectedModule] = useState('ALL');
  const [selectedAction, setSelectedAction] = useState('ALL');
  const [selectedSeverity, setSelectedSeverity] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLog, setSelectedLog] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Permission Gate
  if (!can('audit-logs', 'view')) {
    return (
      <div style={{ padding: '40px 24px', textAlign: 'center', fontFamily: "'Inter', sans-serif" }}>
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#FEF2F2',
            color: '#DC2626',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}
        >
          <ShieldCheck size={32} />
        </div>
        <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', margin: '0 0 8px 0' }}>
          Access Restricted
        </h2>
        <p style={{ color: '#64748B', fontSize: '13px', maxWidth: '420px', margin: '0 auto' }}>
          You do not have <code>audit-logs:view</code> permissions required to inspect security event trails.
        </p>
      </div>
    );
  }

  // Filtered dataset
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchModule = selectedModule === 'ALL' || log.module === selectedModule;
      const matchAction = selectedAction === 'ALL' || log.action === selectedAction;
      const matchSeverity = selectedSeverity === 'ALL' || log.severity === selectedSeverity;
      const matchSearch =
        !searchQuery ||
        log.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.recordId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.recordName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.ipAddress?.includes(searchQuery);
      return matchModule && matchAction && matchSeverity && matchSearch;
    });
  }, [logs, selectedModule, selectedAction, selectedSeverity, searchQuery]);

  // Dynamic KPI Stats
  const stats = useMemo(() => {
    const total = logs.length;
    const criticalCount = logs.filter((l) => l.severity === 'CRITICAL' || l.severity === 'HIGH').length;
    const permissionsCount = logs.filter((l) => l.module === 'roles' || l.module === 'users').length;
    const financialOps = logs.filter((l) => l.module === 'payroll' || l.module === 'expenses').length;
    return { total, criticalCount, permissionsCount, financialOps };
  }, [logs]);

  const handleRowClick = (log) => {
    setSelectedLog(log);
    setIsDrawerOpen(true);
  };

  const handleExport = () => {
    const headers = ['Timestamp,User,Role,Module,Action,RecordId,Severity,IP,Summary'];
    const rows = filteredLogs.map(
      (l) =>
        `"${l.timestamp}","${l.user.name}","${l.user.role}","${l.module}","${l.action}","${l.recordId}","${l.severity}","${l.ipAddress}","${l.summary}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `truckmitr_audit_logs_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = [
    {
      header: 'Timestamp',
      accessor: 'timestamp',
      render: (val) => (
        <span style={{ fontSize: '12px', fontWeight: 600, color: '#475569', whiteSpace: 'nowrap' }}>
          {val}
        </span>
      )
    },
    {
      header: 'Actor / User',
      accessor: 'user',
      render: (val) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {val?.avatarUrl ? (
            <img
              src={val.avatarUrl}
              alt={val.name}
              style={{ width: '26px', height: '26px', borderRadius: '50%', objectFit: 'cover' }}
            />
          ) : (
            <div
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                backgroundColor: '#EFF6FF',
                color: '#1467FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: 700
              }}
            >
              {val?.name?.charAt(0) || 'U'}
            </div>
          )}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>{val?.name}</div>
            <div style={{ fontSize: '11px', color: '#94A3B8' }}>{val?.role}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Module',
      accessor: 'module',
      render: (val) => (
        <span
          style={{
            fontSize: '11px',
            fontWeight: 700,
            padding: '2px 8px',
            borderRadius: '6px',
            backgroundColor: '#F1F5F9',
            color: '#334155',
            textTransform: 'uppercase'
          }}
        >
          {val}
        </span>
      )
    },
    {
      header: 'Action',
      accessor: 'action',
      render: (val) => {
        const actObj = AUDIT_ACTIONS.find((a) => a.id === val) || AUDIT_ACTIONS[0];
        return (
          <span
            style={{
              fontSize: '10px',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '999px',
              backgroundColor: actObj.bg,
              color: actObj.color,
              border: `1px solid ${actObj.color}30`
            }}
          >
            {val}
          </span>
        );
      }
    },
    {
      header: 'Record & Event Summary',
      accessor: 'summary',
      render: (val, row) => (
        <div>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#0F172A' }}>{val}</div>
          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
            Target: <code style={{ color: '#1467FF' }}>{row.recordId}</code> ({row.recordName})
          </div>
        </div>
      )
    },
    {
      header: 'Severity',
      accessor: 'severity',
      render: (val) => {
        const isCritical = val === 'CRITICAL';
        const isHigh = val === 'HIGH';
        return (
          <span
            style={{
              fontSize: '10px',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '999px',
              backgroundColor: isCritical ? '#FEF2F2' : isHigh ? '#FFFBEB' : '#F8FAFC',
              color: isCritical ? '#DC2626' : isHigh ? '#D97706' : '#64748B',
              border: isCritical ? '1px solid #FECACA' : isHigh ? '1px solid #FDE68A' : '1px solid #E2E8F0'
            }}
          >
            {val}
          </span>
        );
      }
    },
    {
      header: 'Client IP',
      accessor: 'ipAddress',
      render: (val) => <span style={{ fontSize: '11px', color: '#64748B', fontFamily: 'monospace' }}>{val}</span>
    }
  ];

  return (
    <div style={{ padding: '24px', maxWidth: '1440px', margin: '0 auto', fontFamily: "'Inter', sans-serif" }}>
      {/* 1. Header Banner */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '20px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span
              style={{
                backgroundColor: '#EFF6FF',
                color: '#1467FF',
                padding: '3px 10px',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: 700
              }}
            >
              ADMINISTRATION & SECURITY
            </span>
            <span style={{ color: '#94A3B8', fontSize: '12px' }}>• System Audit Log</span>
          </div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.5px' }}>
            Audit Logs & Security Trail
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748B' }}>
            Immutable chronological record of administrative actions, permission mutations, financial disbursements, and authentication events.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {can('audit-logs', 'export') && (
            <button
              onClick={handleExport}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 14px',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                backgroundColor: '#FFFFFF',
                color: '#334155',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <Download size={15} />
              Export Audit Trail
            </button>
          )}
        </div>
      </div>

      {/* 2. Top Summary StatCards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}
      >
        <StatCard
          title="Total Events Logged"
          value={String(stats.total)}
          change="Last 30 Days"
          isPositive={true}
          icon={Activity}
          iconColor="#1467FF"
          iconBg="#EFF6FF"
        />
        <StatCard
          title="Security & Auth Events"
          value={String(stats.criticalCount)}
          change="Critical Severity"
          isPositive={false}
          icon={ShieldCheck}
          iconColor="#EF4444"
          iconBg="#FEF2F2"
        />
        <StatCard
          title="RBAC & User Mutations"
          value={String(stats.permissionsCount)}
          change="Admin Changes"
          isPositive={true}
          icon={User}
          iconColor="#8B5CF6"
          iconBg="#F3E8FF"
        />
        <StatCard
          title="Financial Clearances"
          value={String(stats.financialOps)}
          change="Payroll & Expenses"
          isPositive={true}
          icon={Terminal}
          iconColor="#10B981"
          iconBg="#ECFDF5"
        />
      </div>

      {/* 3. Filters Bar */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '14px',
          padding: '16px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ position: 'relative', flex: '1 1 240px' }}>
          <Search
            size={16}
            color="#94A3B8"
            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
          />
          <input
            type="text"
            placeholder="Search by actor, IP, record code, summary..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '9px 12px 9px 36px',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              fontSize: '13px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Module Filter */}
        <select
          value={selectedModule}
          onChange={(e) => setSelectedModule(e.target.value)}
          style={{
            padding: '9px 12px',
            borderRadius: '8px',
            border: '1px solid #E2E8F0',
            fontSize: '13px',
            backgroundColor: '#FFFFFF',
            outline: 'none',
            color: '#334155'
          }}
        >
          <option value="ALL">All Modules</option>
          {AUDIT_MODULES.map((m) => (
            <option key={m} value={m}>
              Module: {m.toUpperCase()}
            </option>
          ))}
        </select>

        {/* Action Type Filter */}
        <select
          value={selectedAction}
          onChange={(e) => setSelectedAction(e.target.value)}
          style={{
            padding: '9px 12px',
            borderRadius: '8px',
            border: '1px solid #E2E8F0',
            fontSize: '13px',
            backgroundColor: '#FFFFFF',
            outline: 'none',
            color: '#334155'
          }}
        >
          <option value="ALL">All Actions</option>
          {AUDIT_ACTIONS.map((a) => (
            <option key={a.id} value={a.id}>
              {a.label}
            </option>
          ))}
        </select>

        {/* Severity Filter */}
        <select
          value={selectedSeverity}
          onChange={(e) => setSelectedSeverity(e.target.value)}
          style={{
            padding: '9px 12px',
            borderRadius: '8px',
            border: '1px solid #E2E8F0',
            fontSize: '13px',
            backgroundColor: '#FFFFFF',
            outline: 'none',
            color: '#334155'
          }}
        >
          <option value="ALL">All Severities</option>
          <option value="CRITICAL">Critical</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>
      </div>

      {/* 4. Table */}
      <DataTable
        columns={columns}
        data={filteredLogs}
        onRowClick={handleRowClick}
        searchable={false}
        pagination={true}
        emptyMessage="No audit logs matched your query."
      />

      {/* 5. Detail Drawer with JSON State Diff */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={selectedLog ? `Audit Event: ${selectedLog.id}` : 'Log Context'}
        size="lg"
      >
        {selectedLog && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Overview Card */}
            <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#1467FF' }}>
                  {selectedLog.module.toUpperCase()} • {selectedLog.action}
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: '999px',
                    backgroundColor: selectedLog.severity === 'CRITICAL' ? '#FEF2F2' : '#F1F5F9',
                    color: selectedLog.severity === 'CRITICAL' ? '#DC2626' : '#475569'
                  }}
                >
                  {selectedLog.severity} SEVERITY
                </span>
              </div>
              <h3 style={{ margin: '0 0 6px 0', fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
                {selectedLog.summary}
              </h3>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748B' }}>
                Target Entity: <strong>{selectedLog.recordName}</strong> (<code>{selectedLog.recordId}</code>)
              </p>
            </div>

            {/* Actor & Session Telemetry */}
            <div style={{ border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>
                Actor & Network Telemetry
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '12px' }}>
                <div>
                  <span style={{ color: '#64748B' }}>User Actor:</span>
                  <div style={{ fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>
                    {selectedLog.user.name} ({selectedLog.user.role})
                  </div>
                </div>
                <div>
                  <span style={{ color: '#64748B' }}>Email:</span>
                  <div style={{ fontWeight: 600, color: '#334155', marginTop: '2px' }}>
                    {selectedLog.user.email}
                  </div>
                </div>
                <div>
                  <span style={{ color: '#64748B' }}>Client IP Address:</span>
                  <div style={{ fontWeight: 700, color: '#1467FF', fontFamily: 'monospace', marginTop: '2px' }}>
                    {selectedLog.ipAddress}
                  </div>
                </div>
                <div>
                  <span style={{ color: '#64748B' }}>Timestamp:</span>
                  <div style={{ fontWeight: 600, color: '#334155', marginTop: '2px' }}>
                    {selectedLog.timestamp}
                  </div>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <span style={{ color: '#64748B' }}>User Agent:</span>
                  <div style={{ fontSize: '11px', color: '#475569', fontFamily: 'monospace', marginTop: '2px' }}>
                    {selectedLog.userAgent}
                  </div>
                </div>
              </div>
            </div>

            {/* Before vs After JSON Diffs */}
            <div style={{ border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                <FileCode size={16} color="#1467FF" />
                <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>
                  State Changes (Old vs New Diff)
                </h4>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {/* Old Values */}
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#DC2626', display: 'block', marginBottom: '4px' }}>
                    PREVIOUS STATE (Old Values)
                  </span>
                  <pre
                    style={{
                      margin: 0,
                      padding: '10px',
                      backgroundColor: '#FEF2F2',
                      border: '1px solid #FECACA',
                      borderRadius: '8px',
                      fontSize: '11px',
                      color: '#991B1B',
                      overflowX: 'auto',
                      maxHeight: '180px'
                    }}
                  >
                    {selectedLog.changes?.oldValues
                      ? JSON.stringify(selectedLog.changes.oldValues, null, 2)
                      : '// No prior state (Entity Created)'}
                  </pre>
                </div>

                {/* New Values */}
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#16A34A', display: 'block', marginBottom: '4px' }}>
                    NEW STATE (Mutated Values)
                  </span>
                  <pre
                    style={{
                      margin: 0,
                      padding: '10px',
                      backgroundColor: '#F0FDF4',
                      border: '1px solid #BBF7D0',
                      borderRadius: '8px',
                      fontSize: '11px',
                      color: '#166534',
                      overflowX: 'auto',
                      maxHeight: '180px'
                    }}
                  >
                    {selectedLog.changes?.newValues
                      ? JSON.stringify(selectedLog.changes.newValues, null, 2)
                      : '// Entity Deleted'}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};
