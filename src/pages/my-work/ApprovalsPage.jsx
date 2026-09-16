import React, { useState, useEffect, useMemo } from 'react';
import { usePermissions } from '../../context/PermissionContext';
import { useAuth } from '../../context/AuthContext';
import {
  getUnifiedPendingApprovals,
  mutateUnifiedApproval,
  subscribeToApprovals
} from '../../services/approvalsRegistry';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Drawer } from '../../components/common/Drawer';
import { StatCard } from '../../components/common/StatCard';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Filter,
  Search,
  Download,
  CalendarOff,
  Receipt,
  CreditCard,
  Handshake,
  Truck,
  UserCheck,
  GitFork,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  FileText,
  Building2,
  User,
  Calendar,
  IndianRupee
} from 'lucide-react';

const MODULE_ICONS = {
  leaves: CalendarOff,
  expenses: Receipt,
  payroll: CreditCard,
  partners: Handshake,
  transporters: Truck,
  drivers: UserCheck,
  matchmaking: GitFork
};

export const ApprovalsPage = () => {
  const { can } = usePermissions();
  const { currentUser } = useAuth();

  const [approvalsList, setApprovalsList] = useState([]);
  const [selectedModule, setSelectedModule] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Decision Modal State
  const [actionModal, setActionModal] = useState({ isOpen: false, item: null, action: null, notes: '' });

  // Load approvals and listen for updates
  const refreshApprovals = () => {
    const list = getUnifiedPendingApprovals();
    setApprovalsList(list);
  };

  useEffect(() => {
    refreshApprovals();
    const unsubscribe = subscribeToApprovals(() => {
      refreshApprovals();
    });
    return () => unsubscribe();
  }, []);

  // Filtered dataset
  const filteredItems = useMemo(() => {
    return approvalsList.filter((item) => {
      const matchModule = selectedModule === 'ALL' || item.module === selectedModule;
      const matchSearch =
        !searchQuery ||
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.requestedBy?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.department?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchModule && matchSearch;
    });
  }, [approvalsList, selectedModule, searchQuery]);

  // Dynamic KPI Stats
  const stats = useMemo(() => {
    const total = approvalsList.length;
    const highSeverity = approvalsList.filter((i) => i.severity === 'HIGH').length;
    const financialCount = approvalsList.filter((i) => i.module === 'expenses' || i.module === 'payroll').length;
    const opsCount = approvalsList.filter(
      (i) => i.module === 'drivers' || i.module === 'transporters' || i.module === 'matchmaking'
    ).length;
    return { total, highSeverity, financialCount, opsCount };
  }, [approvalsList]);

  // Handle open drawer
  const handleRowClick = (item) => {
    setSelectedItem(item);
    setIsDrawerOpen(true);
  };

  // Open quick decision modal
  const openDecisionDialog = (item, action, e) => {
    if (e) e.stopPropagation();
    setActionModal({
      isOpen: true,
      item,
      action,
      notes: ''
    });
  };

  // Confirm decision mutation
  const handleConfirmDecision = () => {
    if (!actionModal.item || !actionModal.action) return;
    mutateUnifiedApproval(actionModal.item, actionModal.action, actionModal.notes);
    setActionModal({ isOpen: false, item: null, action: null, notes: '' });
    if (isDrawerOpen && selectedItem?.id === actionModal.item.id) {
      setIsDrawerOpen(false);
      setSelectedItem(null);
    }
  };

  // Export CSV
  const handleExport = () => {
    const headers = ['ID,Module,Type,Title,RequestedBy,Department,RequestedAt,Severity'];
    const rows = filteredItems.map(
      (i) =>
        `"${i.id}","${i.module}","${i.type}","${i.title}","${i.requestedBy}","${i.department}","${i.requestedAt}","${i.severity}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `truckmitr_pending_approvals_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Table Columns
  const columns = [
    {
      header: 'Module & Request',
      accessor: 'title',
      render: (val, row) => {
        const IconComponent = MODULE_ICONS[row.module] || Clock;
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: row.badgeBg,
                color: row.badgeColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <IconComponent size={18} />
            </div>
            <div>
              <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '13px' }}>{val}</div>
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>{row.subtitle}</div>
            </div>
          </div>
        );
      }
    },
    {
      header: 'Requested By',
      accessor: 'requestedBy',
      render: (val, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {row.requestedByAvatar ? (
            <img
              src={row.requestedByAvatar}
              alt={val}
              style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
            />
          ) : (
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: '#EFF6FF',
                color: '#1467FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '11px'
              }}
            >
              {val?.charAt(0) || 'U'}
            </div>
          )}
          <div>
            <div style={{ fontWeight: 600, color: '#0F172A', fontSize: '12px' }}>{val}</div>
            <div style={{ fontSize: '11px', color: '#94A3B8' }}>{row.department}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Type',
      accessor: 'type',
      render: (val) => (
        <span
          style={{
            fontSize: '11px',
            fontWeight: 700,
            padding: '3px 8px',
            borderRadius: '6px',
            backgroundColor: '#F1F5F9',
            color: '#475569'
          }}
        >
          {val}
        </span>
      )
    },
    {
      header: 'Requested On',
      accessor: 'requestedAt',
      render: (val) => <span style={{ fontSize: '12px', color: '#64748B' }}>{val}</span>
    },
    {
      header: 'Priority',
      accessor: 'severity',
      render: (val) => {
        const isHigh = val === 'HIGH';
        return (
          <span
            style={{
              fontSize: '10px',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '999px',
              backgroundColor: isHigh ? '#FEF2F2' : '#F8FAFC',
              color: isHigh ? '#DC2626' : '#64748B',
              border: isHigh ? '1px solid #FECACA' : '1px solid #E2E8F0'
            }}
          >
            {val}
          </span>
        );
      }
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (_, row) => {
        const hasApprovalRight = can(row.module, 'approve');
        if (!hasApprovalRight) {
          return (
            <span style={{ fontSize: '11px', color: '#94A3B8', fontStyle: 'italic' }}>
              Requires {row.module}:approve
            </span>
          );
        }

        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={(e) => openDecisionDialog(row, 'APPROVE', e)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '5px 10px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: '#10B981',
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <CheckCircle2 size={13} />
              Approve
            </button>
            <button
              onClick={(e) => openDecisionDialog(row, 'REJECT', e)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '5px 10px',
                borderRadius: '6px',
                border: '1px solid #E2E8F0',
                backgroundColor: '#FFFFFF',
                color: '#EF4444',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <XCircle size={13} />
              Reject
            </button>
          </div>
        );
      }
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
              GOVERNANCE & DECISIONS
            </span>
            <span style={{ color: '#94A3B8', fontSize: '12px' }}>• Cross-Module Hub</span>
          </div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.5px' }}>
            Unified Approvals Inbox
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748B' }}>
            Centralized authorization stream aggregating pending actions across Leaves, Expenses, Payroll, Partners, Transporters, and Drivers.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {can('approvals', 'export') && (
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
              Export Queue
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
          title="Total Pending Queue"
          value={String(stats.total)}
          change={`${stats.highSeverity} Urgent`}
          isPositive={false}
          icon={Clock}
          iconColor="#EF4444"
          iconBg="#FEF2F2"
        />
        <StatCard
          title="Financial Clearances"
          value={String(stats.financialCount)}
          change="Payroll & Claims"
          isPositive={true}
          icon={IndianRupee}
          iconColor="#10B981"
          iconBg="#ECFDF5"
        />
        <StatCard
          title="Operational Clearances"
          value={String(stats.opsCount)}
          change="Drivers & Fleets"
          isPositive={true}
          icon={Truck}
          iconColor="#1467FF"
          iconBg="#EFF6FF"
        />
        <StatCard
          title="High Priority SLAs"
          value={String(stats.highSeverity)}
          change="SLA < 24h"
          isPositive={false}
          icon={AlertCircle}
          iconColor="#F59E0B"
          iconBg="#FEF3C7"
        />
      </div>

      {/* 3. Filter Bar & Module Tabs */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '14px',
          padding: '16px',
          marginBottom: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}
      >
        {/* Module Category Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { id: 'ALL', label: 'All Modules', count: approvalsList.length },
            { id: 'leaves', label: 'Leaves', count: approvalsList.filter((i) => i.module === 'leaves').length },
            { id: 'expenses', label: 'Expenses', count: approvalsList.filter((i) => i.module === 'expenses').length },
            { id: 'payroll', label: 'Payroll', count: approvalsList.filter((i) => i.module === 'payroll').length },
            { id: 'partners', label: 'Partners', count: approvalsList.filter((i) => i.module === 'partners').length },
            { id: 'transporters', label: 'Transporters', count: approvalsList.filter((i) => i.module === 'transporters').length },
            { id: 'drivers', label: 'Drivers', count: approvalsList.filter((i) => i.module === 'drivers').length },
            { id: 'matchmaking', label: 'Matchmaking', count: approvalsList.filter((i) => i.module === 'matchmaking').length }
          ].map((tab) => {
            const isActive = selectedModule === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedModule(tab.id)}
                style={{
                  padding: '7px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: isActive ? '#0B223A' : '#F1F5F9',
                  color: isActive ? '#FFFFFF' : '#475569',
                  fontSize: '12px',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>{tab.label}</span>
                <span
                  style={{
                    backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : '#E2E8F0',
                    color: isActive ? '#FFFFFF' : '#334155',
                    fontSize: '10px',
                    fontWeight: 700,
                    padding: '1px 6px',
                    borderRadius: '999px'
                  }}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Live Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search
              size={16}
              color="#94A3B8"
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              placeholder="Search by candidate name, company, expense merchant, or employee..."
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
        </div>
      </div>

      {/* 4. Unified Data Table */}
      <DataTable
        columns={columns}
        data={filteredItems}
        onRowClick={handleRowClick}
        searchable={false}
        pagination={true}
        emptyMessage="No pending items awaiting authorization."
      />

      {/* 5. Detail Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={selectedItem?.title || 'Approval Context'}
        size="lg"
      >
        {selectedItem && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Header Banner */}
            <div
              style={{
                padding: '16px',
                borderRadius: '12px',
                backgroundColor: selectedItem.badgeBg,
                border: `1px solid ${selectedItem.badgeColor}30`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    backgroundColor: '#FFFFFF',
                    color: selectedItem.badgeColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {React.createElement(MODULE_ICONS[selectedItem.module] || Clock, { size: 22 })}
                </div>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: selectedItem.badgeColor }}>
                    {selectedItem.moduleLabel.toUpperCase()}
                  </div>
                  <h3 style={{ margin: '2px 0 0', fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>
                    {selectedItem.title}
                  </h3>
                </div>
              </div>

              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '4px 10px',
                  borderRadius: '999px',
                  backgroundColor: '#FEF3C7',
                  color: '#B45309'
                }}
              >
                AWAITING CLEARANCE
              </span>
            </div>

            {/* Submitter Details */}
            <div style={{ border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>
                Request Origin & Identity
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '12px' }}>
                <div>
                  <span style={{ color: '#64748B' }}>Requested By:</span>
                  <div style={{ fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>
                    {selectedItem.requestedBy}
                  </div>
                </div>
                <div>
                  <span style={{ color: '#64748B' }}>Department:</span>
                  <div style={{ fontWeight: 600, color: '#334155', marginTop: '2px' }}>
                    {selectedItem.department}
                  </div>
                </div>
                <div>
                  <span style={{ color: '#64748B' }}>Submission Timestamp:</span>
                  <div style={{ fontWeight: 600, color: '#334155', marginTop: '2px' }}>
                    {selectedItem.requestedAt}
                  </div>
                </div>
                <div>
                  <span style={{ color: '#64748B' }}>Reference Code:</span>
                  <div style={{ fontWeight: 700, color: '#1467FF', marginTop: '2px' }}>
                    {selectedItem.requestedByEmpId || selectedItem.sourceId}
                  </div>
                </div>
              </div>
            </div>

            {/* Contextual Payload Content */}
            <div style={{ border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>
                Record Parameters & Verification Proof
              </h4>

              {/* Leave Payload */}
              {selectedItem.module === 'leaves' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', backgroundColor: '#F8FAFC', borderRadius: '6px' }}>
                    <span style={{ color: '#64748B' }}>Leave Type:</span>
                    <strong style={{ color: '#0F172A' }}>{selectedItem.payload.leaveType}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', backgroundColor: '#F8FAFC', borderRadius: '6px' }}>
                    <span style={{ color: '#64748B' }}>Duration:</span>
                    <strong style={{ color: '#0F172A' }}>{selectedItem.payload.days} Day(s) ({selectedItem.payload.dates})</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', backgroundColor: '#F8FAFC', borderRadius: '6px' }}>
                    <span style={{ color: '#64748B' }}>Balance Remaining:</span>
                    <strong style={{ color: '#10B981' }}>{selectedItem.payload.balanceRemaining} Days</strong>
                  </div>
                  <div style={{ padding: '8px', backgroundColor: '#F8FAFC', borderRadius: '6px' }}>
                    <span style={{ color: '#64748B', display: 'block', marginBottom: '2px' }}>Reason:</span>
                    <span style={{ color: '#334155' }}>{selectedItem.payload.reason}</span>
                  </div>
                </div>
              )}

              {/* Expense Payload */}
              {selectedItem.module === 'expenses' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', backgroundColor: '#F8FAFC', borderRadius: '6px' }}>
                    <span style={{ color: '#64748B' }}>Claim Amount:</span>
                    <strong style={{ color: '#059669', fontSize: '14px' }}>{selectedItem.payload.amount}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', backgroundColor: '#F8FAFC', borderRadius: '6px' }}>
                    <span style={{ color: '#64748B' }}>Merchant / Vendor:</span>
                    <strong style={{ color: '#0F172A' }}>{selectedItem.payload.merchant}</strong>
                  </div>
                  <div style={{ padding: '8px', backgroundColor: '#F8FAFC', borderRadius: '6px' }}>
                    <span style={{ color: '#64748B', display: 'block', marginBottom: '2px' }}>Expense Purpose:</span>
                    <span style={{ color: '#334155' }}>{selectedItem.payload.notes}</span>
                  </div>
                  {selectedItem.payload.receiptUrl && (
                    <div style={{ marginTop: '6px' }}>
                      <span style={{ color: '#64748B', fontSize: '11px', display: 'block', marginBottom: '4px' }}>Receipt Proof:</span>
                      <img
                        src={selectedItem.payload.receiptUrl}
                        alt="Receipt"
                        style={{ width: '100%', maxHeight: '160px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #E2E8F0' }}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Payroll Payload */}
              {selectedItem.module === 'payroll' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', backgroundColor: '#F8FAFC', borderRadius: '6px' }}>
                    <span style={{ color: '#64748B' }}>Pay Period:</span>
                    <strong style={{ color: '#0F172A' }}>{selectedItem.payload.period}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', backgroundColor: '#F8FAFC', borderRadius: '6px' }}>
                    <span style={{ color: '#64748B' }}>Gross Salary:</span>
                    <strong style={{ color: '#334155' }}>{selectedItem.payload.grossPay}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', backgroundColor: '#F8FAFC', borderRadius: '6px' }}>
                    <span style={{ color: '#64748B' }}>Statutory Deductions:</span>
                    <strong style={{ color: '#EF4444' }}>{selectedItem.payload.deductions}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', backgroundColor: '#ECFDF5', borderRadius: '6px' }}>
                    <span style={{ color: '#047857', fontWeight: 700 }}>Net Disbursement:</span>
                    <strong style={{ color: '#047857', fontSize: '14px' }}>{selectedItem.payload.netPay}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', backgroundColor: '#F8FAFC', borderRadius: '6px' }}>
                    <span style={{ color: '#64748B' }}>Bank Account:</span>
                    <strong style={{ color: '#334155' }}>{selectedItem.payload.bankAccount}</strong>
                  </div>
                </div>
              )}

              {/* Partners / Transporters / Drivers / Matchmaking generic payloads */}
              {['partners', 'transporters', 'drivers', 'matchmaking'].includes(selectedItem.module) && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
                  {Object.entries(selectedItem.payload).map(([k, v]) => {
                    if (typeof v === 'object') return null;
                    return (
                      <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', backgroundColor: '#F8FAFC', borderRadius: '6px' }}>
                        <span style={{ color: '#64748B', textTransform: 'capitalize' }}>{k.replace(/([A-Z])/g, ' $1')}:</span>
                        <strong style={{ color: '#0F172A' }}>{String(v)}</strong>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Decision Action Bar */}
            {can(selectedItem.module, 'approve') ? (
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  padding: '16px',
                  borderRadius: '12px',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0'
                }}
              >
                <button
                  onClick={() => openDecisionDialog(selectedItem, 'APPROVE')}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '12px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#10B981',
                    color: '#FFFFFF',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  <CheckCircle2 size={16} />
                  Authorize & Approve
                </button>
                <button
                  onClick={() => openDecisionDialog(selectedItem, 'REJECT')}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #EF4444',
                    backgroundColor: '#FFFFFF',
                    color: '#EF4444',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  <XCircle size={16} />
                  Reject Request
                </button>
              </div>
            ) : (
              <div
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  backgroundColor: '#FEF2F2',
                  color: '#991B1B',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <AlertCircle size={16} />
                <span>Your active role lacks <code>{selectedItem.module}:approve</code> permission.</span>
              </div>
            )}
          </div>
        )}
      </Drawer>

      {/* 6. Decision Confirmation Modal */}
      {actionModal.isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(3px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '16px'
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              maxWidth: '460px',
              width: '100%',
              padding: '24px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              {actionModal.action === 'APPROVE' ? (
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#ECFDF5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircle2 size={20} />
                </div>
              ) : (
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#FEF2F2', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <XCircle size={20} />
                </div>
              )}
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>
                  {actionModal.action === 'APPROVE' ? 'Confirm Approval' : 'Reject Request'}
                </h3>
                <span style={{ fontSize: '12px', color: '#64748B' }}>
                  {actionModal.item?.title}
                </span>
              </div>
            </div>

            <p style={{ fontSize: '13px', color: '#475569', margin: '0 0 14px 0', lineHeight: 1.5 }}>
              {actionModal.action === 'APPROVE'
                ? `You are authorizing this ${actionModal.item?.type} for ${actionModal.item?.requestedBy}. State will instantly sync across all modules.`
                : `Are you sure you want to reject this ${actionModal.item?.type}? The submitter will be notified.`}
            </p>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Decision Audit Notes (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Enter audit comment or rationale..."
                value={actionModal.notes}
                onChange={(e) => setActionModal({ ...actionModal, notes: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '13px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setActionModal({ isOpen: false, item: null, action: null, notes: '' })}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  backgroundColor: '#FFFFFF',
                  color: '#475569',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDecision}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: actionModal.action === 'APPROVE' ? '#10B981' : '#EF4444',
                  color: '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Confirm {actionModal.action === 'APPROVE' ? 'Approval' : 'Rejection'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
