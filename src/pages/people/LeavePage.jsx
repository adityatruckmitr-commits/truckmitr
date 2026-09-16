import React, { useState } from 'react';
import { usePermissions } from '../../context/PermissionContext';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/common/StatCard';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Drawer } from '../../components/common/Drawer';
import { Modal } from '../../components/common/Modal';
import { DEPARTMENTS } from '../../utils/rbacConstants';
import {
  CalendarOff,
  Clock,
  CheckCircle2,
  XCircle,
  Plus,
  Download,
  Eye,
  Check,
  X,
  UserCheck,
  Calendar,
  Layers,
  HeartPulse,
  Sun
} from 'lucide-react';
import {
  LEAVE_TYPES,
  INITIAL_LEAVE_REQUESTS,
  MY_LEAVE_BALANCES
} from '../../services/mock/mockLeave';

export const LeavePage = () => {
  const { can, getScope } = usePermissions();
  const { currentUser } = useAuth();

  const [leaveRequests, setLeaveRequests] = useState(INITIAL_LEAVE_REQUESTS);
  const [viewMode, setViewMode] = useState('manager'); // 'manager' | 'self'
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  // Check department scope
  const leaveScope = getScope('leaves');
  const userDeptId = currentUser?.departmentId || 'dept-ops';

  const [filtersState, setFiltersState] = useState({
    departmentId: leaveScope === 'DEPARTMENT' ? userDeptId : 'ALL',
    status: 'ALL',
    leaveType: 'ALL'
  });

  const filterConfigs = [
    {
      key: 'departmentId',
      label: 'All Departments',
      options: DEPARTMENTS.map((d) => ({ value: d.id, label: d.name }))
    },
    {
      key: 'status',
      label: 'All Statuses',
      options: [
        { value: 'PENDING_APPROVAL', label: 'Pending Approval' },
        { value: 'APPROVED', label: 'Approved' },
        { value: 'REJECTED', label: 'Rejected' }
      ]
    },
    {
      key: 'leaveType',
      label: 'All Leave Types',
      options: LEAVE_TYPES.map((t) => ({ value: t.id, label: t.label }))
    }
  ];

  // Self-Service dataset (requests by current user or Sonam/Aditya)
  const myRequests = leaveRequests.filter(
    (req) => req.employeeId === (currentUser?.employeeId || 'TMEMP005') || req.employeeName === currentUser?.name
  );

  // Manager/Approval dataset (filtered by department scope)
  const managerRequests = leaveRequests.filter((req) => {
    if (filtersState.departmentId !== 'ALL' && req.departmentId !== filtersState.departmentId) return false;
    if (filtersState.status !== 'ALL' && req.status !== filtersState.status) return false;
    if (filtersState.leaveType !== 'ALL' && req.leaveType !== filtersState.leaveType) return false;
    return true;
  });

  const handleDecision = (id, newStatus) => {
    setLeaveRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: newStatus } : req))
    );
    if (selectedRequest?.id === id) {
      setSelectedRequest((prev) => ({ ...prev, status: newStatus }));
    }
  };

  const handleExportCSV = () => {
    alert(`Exporting ${leaveRequests.length} leave records to CSV...`);
  };

  // Manager Columns
  const managerColumns = [
    {
      key: 'employeeName',
      title: 'Employee Details',
      sortable: true,
      render: (_, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img
            src={row.avatarUrl}
            alt={row.employeeName}
            style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div>
            <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '13px' }}>{row.employeeName}</div>
            <div style={{ fontSize: '11px', color: '#64748B' }}>
              {row.employeeId} • {row.departmentName}
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'leaveTypeName',
      title: 'Leave Type',
      sortable: true,
      render: (val, row) => {
        const typeMeta = LEAVE_TYPES.find((t) => t.id === row.leaveType) || LEAVE_TYPES[0];
        return (
          <span
            style={{
              padding: '2px 8px',
              borderRadius: '6px',
              backgroundColor: typeMeta.bg,
              color: typeMeta.color,
              fontSize: '11px',
              fontWeight: 700
            }}
          >
            {val}
          </span>
        );
      }
    },
    {
      key: 'dates',
      title: 'Leave Duration',
      render: (_, row) => (
        <div>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>
            {row.startDate} {row.startDate !== row.endDate ? `to ${row.endDate}` : ''}
          </div>
          <div style={{ fontSize: '11px', color: '#64748B' }}>
            {row.daysCount} Day{row.daysCount > 1 ? 's' : ''} requested
          </div>
        </div>
      )
    },
    {
      key: 'balanceRemaining',
      title: 'Balance Left',
      sortable: true,
      render: (val) => (
        <span style={{ fontWeight: 700, color: '#0F172A', fontSize: '12px' }}>
          {val} days
        </span>
      )
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (val) => <StatusBadge status={val} />
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} onClick={(e) => e.stopPropagation()}>
          <button
            title="View Request Details"
            onClick={() => {
              setSelectedRequest(row);
              setIsDrawerOpen(true);
            }}
            style={{
              border: '1px solid #E2E8F0',
              backgroundColor: '#FFFFFF',
              color: '#1467FF',
              padding: '5px 8px',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px',
              fontWeight: 700
            }}
          >
            <Eye size={13} /> View
          </button>

          {can('leaves', 'approve') && row.status === 'PENDING_APPROVAL' && (
            <>
              <button
                title="Approve Request"
                onClick={() => handleDecision(row.id, 'APPROVED')}
                style={{
                  border: 'none',
                  backgroundColor: '#059669',
                  color: '#FFFFFF',
                  padding: '5px 8px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px'
                }}
              >
                <Check size={13} /> Approve
              </button>
              <button
                title="Reject Request"
                onClick={() => handleDecision(row.id, 'REJECTED')}
                style={{
                  border: 'none',
                  backgroundColor: '#EF4444',
                  color: '#FFFFFF',
                  padding: '5px 8px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px'
                }}
              >
                <X size={13} />
              </button>
            </>
          )}
        </div>
      )
    }
  ];

  return (
    <div style={{ padding: '24px', maxWidth: '1440px', margin: '0 auto', fontFamily: "'Inter', sans-serif" }}>
      {/* 1. Header Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>People & HR</span>
            <span style={{ color: '#CBD5E1' }}>/</span>
            <span style={{ fontSize: '12px', color: '#1467FF', fontWeight: 600 }}>Leave Management</span>
          </div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#0F172A' }}>
            Leave & Time-Off Management
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748B' }}>
            Employee leave balances, team availability calendar, and managerial approval queues.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* View Switcher Toggle */}
          <div
            style={{
              display: 'flex',
              backgroundColor: '#F1F5F9',
              borderRadius: '10px',
              padding: '3px',
              border: '1px solid #E2E8F0'
            }}
          >
            <button
              onClick={() => setViewMode('manager')}
              style={{
                padding: '7px 14px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: viewMode === 'manager' ? '#FFFFFF' : 'transparent',
                color: viewMode === 'manager' ? '#1467FF' : '#64748B',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: viewMode === 'manager' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'
              }}
            >
              Manager Approval Queue
            </button>
            <button
              onClick={() => setViewMode('self')}
              style={{
                padding: '7px 14px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: viewMode === 'self' ? '#FFFFFF' : 'transparent',
                color: viewMode === 'self' ? '#1467FF' : '#64748B',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: viewMode === 'self' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'
              }}
            >
              My Leave & Balances
            </button>
          </div>

          {can('leaves', 'export') && (
            <button
              onClick={handleExportCSV}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #CBD5E1',
                color: '#334155',
                borderRadius: '10px',
                padding: '9px 14px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Download size={14} /> Export CSV
            </button>
          )}

          {can('leaves', 'create') && (
            <button
              onClick={() => setIsApplyModalOpen(true)}
              style={{
                backgroundColor: '#1467FF',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '10px',
                padding: '9px 16px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 14px rgba(20, 103, 255, 0.25)'
              }}
            >
              <Plus size={16} /> Apply for Leave
            </button>
          )}
        </div>
      </div>

      {/* 2. Top Summary KPI Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '16px',
          marginBottom: '20px'
        }}
      >
        <StatCard
          title="Pending Approvals"
          value={leaveRequests.filter((r) => r.status === 'PENDING_APPROVAL').length.toString()}
          change="Awaiting Manager Review"
          isPositive={false}
          icon={Clock}
          iconColor="#D97706"
          iconBg="#FEF3C7"
        />

        <StatCard
          title="Approved This Month"
          value={leaveRequests.filter((r) => r.status === 'APPROVED').length.toString()}
          change="Active Leaves Cleared"
          isPositive={true}
          icon={CheckCircle2}
          iconColor="#059669"
          iconBg="#ECFDF5"
        />

        <StatCard
          title="Team Availability"
          value="94.2%"
          change="Available on Duty"
          isPositive={true}
          icon={UserCheck}
          iconColor="#1467FF"
          iconBg="#EFF6FF"
        />

        <StatCard
          title="My Remaining Leave"
          value="28 Days"
          change="8 CL • 8 SL • 12 EL"
          isPositive={true}
          icon={CalendarOff}
          iconColor="#8B5CF6"
          iconBg="#F3E8FF"
        />
      </div>

      {/* 3. Main Body: Manager Queue View vs Self-Service View */}
      {viewMode === 'manager' ? (
        /* MANAGER APPROVAL QUEUE */
        <DataTable
          columns={managerColumns}
          data={managerRequests}
          searchPlaceholder="Search leave requests by employee name, ID, reason, leave type..."
          searchKeys={['employeeName', 'employeeId', 'departmentName', 'reason', 'leaveTypeName']}
          filters={filterConfigs}
          filtersState={filtersState}
          onFilterChange={(key, val) => setFiltersState((prev) => ({ ...prev, [key]: val }))}
          onRowClick={(row) => {
            setSelectedRequest(row);
            setIsDrawerOpen(true);
          }}
        />
      ) : (
        /* SELF-SERVICE VIEW */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Leave Balances Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '14px', padding: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1E40AF', marginBottom: '8px' }}>
                <Sun size={20} />
                <span style={{ fontSize: '13px', fontWeight: 800 }}>Casual Leave (CL)</span>
              </div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#1E3A8A' }}>
                {MY_LEAVE_BALANCES.CASUAL.remaining}{' '}
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#60A5FA' }}>/ {MY_LEAVE_BALANCES.CASUAL.allocated} days</span>
              </div>
              <div style={{ fontSize: '11px', color: '#4B5563', marginTop: '4px' }}>
                {MY_LEAVE_BALANCES.CASUAL.used} days consumed this year
              </div>
            </div>

            <div style={{ backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '14px', padding: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#065F46', marginBottom: '8px' }}>
                <HeartPulse size={20} />
                <span style={{ fontSize: '13px', fontWeight: 800 }}>Sick Leave (SL)</span>
              </div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#064E3B' }}>
                {MY_LEAVE_BALANCES.SICK.remaining}{' '}
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#34D399' }}>/ {MY_LEAVE_BALANCES.SICK.allocated} days</span>
              </div>
              <div style={{ fontSize: '11px', color: '#4B5563', marginTop: '4px' }}>
                {MY_LEAVE_BALANCES.SICK.used} days consumed this year
              </div>
            </div>

            <div style={{ backgroundColor: '#F3E8FF', border: '1px solid #DDD6FE', borderRadius: '14px', padding: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6B21A8', marginBottom: '8px' }}>
                <CalendarOff size={20} />
                <span style={{ fontSize: '13px', fontWeight: 800 }}>Earned Leave (EL)</span>
              </div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#581C87' }}>
                {MY_LEAVE_BALANCES.EARNED.remaining}{' '}
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#A78BFA' }}>/ {MY_LEAVE_BALANCES.EARNED.allocated} days</span>
              </div>
              <div style={{ fontSize: '11px', color: '#4B5563', marginTop: '4px' }}>
                {MY_LEAVE_BALANCES.EARNED.used} days consumed this year
              </div>
            </div>
          </div>

          {/* My Requests History List */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '20px' }}>
            <h3 style={{ margin: '0 0 14px 0', fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>
              My Leave Request History
            </h3>

            {myRequests.length === 0 ? (
              <div style={{ padding: '30px', textAlign: 'center', color: '#94A3B8', fontSize: '13px' }}>
                You have no leave applications logged.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {myRequests.map((req) => (
                  <div
                    key={req.id}
                    style={{
                      padding: '14px',
                      borderRadius: '10px',
                      border: '1px solid #E2E8F0',
                      backgroundColor: '#F8FAFC',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 800, fontSize: '14px', color: '#0F172A' }}>{req.leaveTypeName}</span>
                        <StatusBadge status={req.status} />
                      </div>
                      <div style={{ fontSize: '12px', color: '#475569', marginTop: '3px' }}>
                        {req.startDate} to {req.endDate} ({req.daysCount} days) • Reason: {req.reason}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', fontSize: '11px', color: '#64748B' }}>
                      Applied: {req.appliedOn}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. Detail Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={selectedRequest ? `Leave Request: ${selectedRequest.requestCode}` : 'Request Details'}
        subtitle="Staff Leave Application, Approver History & Reason"
        width="560px"
      >
        {selectedRequest && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Header Profile Card */}
            <div
              style={{
                backgroundColor: '#F8FAFC',
                borderRadius: '14px',
                border: '1px solid #E2E8F0',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px'
              }}
            >
              <img
                src={selectedRequest.avatarUrl}
                alt={selectedRequest.employeeName}
                style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>
                    {selectedRequest.employeeName}
                  </h4>
                  <StatusBadge status={selectedRequest.status} />
                </div>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                  {selectedRequest.employeeId} • {selectedRequest.departmentName}
                </div>
                <div style={{ fontSize: '11px', color: '#1467FF', fontWeight: 600, marginTop: '2px' }}>
                  Balance Remaining: {selectedRequest.balanceRemaining} Days
                </div>
              </div>
            </div>

            {/* Leave Duration & Reason Breakdown */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #F1F5F9' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>DATES REQUESTED</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>
                  {selectedRequest.startDate} {selectedRequest.startDate !== selectedRequest.endDate ? `to ${selectedRequest.endDate}` : ''}
                </div>
                <div style={{ fontSize: '11px', color: '#059669', fontWeight: 600, marginTop: '2px' }}>
                  Total {selectedRequest.daysCount} Working Day{selectedRequest.daysCount > 1 ? 's' : ''}
                </div>
              </div>
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #F1F5F9' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>LEAVE TYPE</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>
                  {selectedRequest.leaveTypeName}
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                  Applied on {selectedRequest.appliedOn}
                </div>
              </div>
            </div>

            {/* Stated Reason */}
            <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, marginBottom: '4px' }}>
                REASON FOR LEAVE
              </div>
              <div style={{ fontSize: '13px', color: '#334155', lineHeight: 1.5 }}>
                {selectedRequest.reason}
              </div>
            </div>

            {/* Approver Line */}
            <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #F1F5F9', fontSize: '12px' }}>
              <span style={{ color: '#64748B' }}>Designated Approver:</span>{' '}
              <strong style={{ color: '#0F172A' }}>{selectedRequest.approverName}</strong>
            </div>

            {/* Action Footer for Approver */}
            {can('leaves', 'approve') && selectedRequest.status === 'PENDING_APPROVAL' && (
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px', borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
                <button
                  onClick={() => handleDecision(selectedRequest.id, 'APPROVED')}
                  style={{
                    flex: 1,
                    backgroundColor: '#059669',
                    color: '#FFF',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <Check size={14} /> Approve Leave Request
                </button>

                <button
                  onClick={() => handleDecision(selectedRequest.id, 'REJECTED')}
                  style={{
                    flex: 1,
                    backgroundColor: '#EF4444',
                    color: '#FFF',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <X size={14} /> Reject Request
                </button>
              </div>
            )}
          </div>
        )}
      </Drawer>

      {/* 5. Apply for Leave Modal */}
      <Modal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        title="Apply for Leave / Time-Off"
        subtitle="Submit a leave request to your reporting manager for approval."
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target;
            const typeMeta = LEAVE_TYPES.find((t) => t.id === form.leaveType.value) || LEAVE_TYPES[0];
            const start = form.startDate.value;
            const end = form.endDate.value;

            const newRequest = {
              id: `lv-${Date.now()}`,
              requestCode: `LR-2609-${Math.floor(10 + Math.random() * 90)}`,
              employeeId: currentUser?.employeeId || 'TMEMP005',
              employeeName: currentUser?.name || 'Staff User',
              avatarUrl: currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80',
              departmentId: currentUser?.departmentId || 'dept-sales',
              departmentName: currentUser?.departmentName || 'Sales & Growth',
              leaveType: form.leaveType.value,
              leaveTypeName: typeMeta.label.split('(')[0].trim(),
              startDate: start,
              endDate: end,
              daysCount: Math.max(1, Math.round((new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24)) + 1),
              reason: form.reason.value,
              status: 'PENDING_APPROVAL',
              appliedOn: new Date().toISOString().replace('T', ' ').substring(0, 16),
              balanceRemaining: 8,
              approverName: 'Reporting Manager'
            };

            setLeaveRequests([newRequest, ...leaveRequests]);
            setIsApplyModalOpen(false);
          }}
          style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
        >
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
              Leave Type *
            </label>
            <select
              name="leaveType"
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', backgroundColor: '#FFF' }}
            >
              {LEAVE_TYPES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Start Date *
              </label>
              <input
                name="startDate"
                type="date"
                required
                defaultValue="2026-09-15"
                style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                End Date *
              </label>
              <input
                name="endDate"
                type="date"
                required
                defaultValue="2026-09-16"
                style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
              Reason for Leave *
            </label>
            <textarea
              name="reason"
              required
              rows={3}
              placeholder="State reason for absence..."
              style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
            <button
              type="button"
              onClick={() => setIsApplyModalOpen(false)}
              style={{ padding: '9px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', background: '#FFF', color: '#475569', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ padding: '9px 18px', borderRadius: '8px', border: 'none', background: '#1467FF', color: '#FFF', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
            >
              Submit Application
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
