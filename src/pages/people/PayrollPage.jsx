import React, { useState, useMemo } from 'react';
import { usePermissions } from '../../context/PermissionContext';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/common/StatCard';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Drawer } from '../../components/common/Drawer';
import { Modal } from '../../components/common/Modal';
import { DEPARTMENTS } from '../../utils/rbacConstants';
import {
  CreditCard,
  IndianRupee,
  ShieldAlert,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  Edit2,
  Lock,
  FileText,
  Building2,
  Check,
  Send,
  AlertCircle,
  Users
} from 'lucide-react';
import { INITIAL_PAYROLL_DATA, PAYROLL_SUMMARY_STATS } from '../../services/mock/mockPayroll';

export const PayrollPage = () => {
  const { can, getScope } = usePermissions();
  const { currentUser, currentRoleObj } = useAuth();

  const [payrollData, setPayrollData] = useState(INITIAL_PAYROLL_DATA);
  const [selectedPayslip, setSelectedPayslip] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);
  const [adjustingRecord, setAdjustingRecord] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  // Check Scope on payroll module: ALL, DEPARTMENT, or ASSIGNED_ONLY
  const payrollScope = getScope('payroll');
  const userDeptId = currentUser?.departmentId || 'dept-ops';

  // Default department filter based on scope:
  // If role has DEPARTMENT scope, default to user's department, otherwise 'ALL'
  const [filtersState, setFiltersState] = useState({
    departmentId: payrollScope === 'DEPARTMENT' ? userDeptId : 'ALL',
    paymentStatus: 'ALL'
  });

  // Strict Page-Level Gate Check:
  // If the active role does not have 'view' permission on payroll, block page with a security guard
  const hasPageAccess = can('payroll', 'view');

  const filterConfigs = [
    {
      key: 'departmentId',
      label: 'All Departments',
      options: DEPARTMENTS.map((d) => ({ value: d.id, label: d.name }))
    },
    {
      key: 'paymentStatus',
      label: 'All Statuses',
      options: [
        { value: 'PAID', label: 'Paid & Disbursed' },
        { value: 'PENDING_APPROVAL', label: 'Pending Approval' },
        { value: 'PROCESSING', label: 'Processing' }
      ]
    }
  ];

  // Helper to check if a specific row's financial figures should be masked
  const isRowMasked = (row) => {
    if (payrollScope === 'ALL' || currentUser?.roleSlug === 'admin' || currentUser?.roleSlug === 'ceo' || currentUser?.roleSlug === 'hr') {
      return false;
    }
    // If user has DEPARTMENT scope and row is in another department, mask figures
    return row.departmentId !== userDeptId;
  };

  const handleOpenPayslip = (row) => {
    setSelectedPayslip(row);
    setIsDrawerOpen(true);
  };

  const handleApprovePayroll = (id) => {
    setPayrollData((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              paymentStatus: 'PAID',
              paymentDate: new Date().toISOString().split('T')[0]
            }
          : p
      )
    );
    if (selectedPayslip?.id === id) {
      setSelectedPayslip((prev) => ({
        ...prev,
        paymentStatus: 'PAID',
        paymentDate: new Date().toISOString().split('T')[0]
      }));
    }
    alert('Payroll disbursement authorized and released successfully.');
  };

  const handleExportCSV = () => {
    alert(`Exporting confidential payroll ledger (${payrollData.length} records) to Bank NEFT CSV...`);
  };

  if (!hasPageAccess) {
    return (
      <div style={{ padding: '40px 24px', maxWidth: '800px', margin: '60px auto', fontFamily: "'Inter', sans-serif" }}>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid #E2E8F0',
            padding: '40px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.04)'
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#FEF2F2',
              border: '1px solid #FEE2E2',
              color: '#EF4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}
          >
            <Lock size={32} />
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', margin: '0 0 8px 0' }}>
            Confidential Payroll & Compensation Ledger Restricted
          </h2>
          <p style={{ fontSize: '13px', color: '#64748B', maxWidth: '480px', margin: '0 auto 20px', lineHeight: 1.5 }}>
            Your active role (<strong>{currentRoleObj?.name || 'Staff'}</strong>) is not authorized to view enterprise compensation, payslips, or statutory tax disbursements.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#94A3B8' }}>
            <ShieldAlert size={14} /> Gated by <code style={{ color: '#0F172A', fontWeight: 700 }}>payroll:view</code> policy
          </div>
        </div>
      </div>
    );
  }

  // Table Column Definitions
  const columns = [
    {
      key: 'employeeName',
      title: 'Employee Details',
      sortable: true,
      render: (_, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img
            src={row.avatarUrl}
            alt={row.employeeName}
            style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #E2E8F0' }}
          />
          <div>
            <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '13px' }}>{row.employeeName}</div>
            <div style={{ fontSize: '11px', color: '#64748B' }}>
              {row.employeeId} • {row.designation}
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'departmentName',
      title: 'Department',
      sortable: true,
      render: (val) => (
        <span style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>
          {val}
        </span>
      )
    },
    {
      key: 'grossPay',
      title: 'Gross Salary',
      sortable: true,
      render: (val, row) => (
        <span style={{ fontWeight: 700, color: '#0F172A', fontSize: '13px' }}>
          {isRowMasked(row) ? '₹••••••' : `₹${val.toLocaleString('en-IN')}`}
        </span>
      )
    },
    {
      key: 'totalDeductions',
      title: 'Deductions (PF/Tax)',
      sortable: true,
      render: (val, row) => (
        <span style={{ fontSize: '12px', color: '#EF4444', fontWeight: 600 }}>
          {isRowMasked(row) ? '₹••••••' : `-₹${val.toLocaleString('en-IN')}`}
        </span>
      )
    },
    {
      key: 'netPay',
      title: 'Net Disbursed',
      sortable: true,
      render: (val, row) => (
        <span style={{ fontWeight: 800, color: '#059669', fontSize: '13px' }}>
          {isRowMasked(row) ? '₹••••••' : `₹${val.toLocaleString('en-IN')}`}
        </span>
      )
    },
    {
      key: 'paymentStatus',
      title: 'Status',
      sortable: true,
      render: (val) => <StatusBadge status={val} />
    },
    {
      key: 'payPeriod',
      title: 'Pay Period',
      sortable: true,
      render: (val) => <span style={{ fontSize: '12px', color: '#64748B' }}>{val}</span>
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} onClick={(e) => e.stopPropagation()}>
          <button
            title="View Full Payslip Breakdown"
            onClick={() => handleOpenPayslip(row)}
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
            <Eye size={13} /> Payslip
          </button>

          {can('payroll', 'edit') && (
            <button
              title="Adjust Compensation / Deductions"
              onClick={() => {
                setAdjustingRecord(row);
                setIsAdjustModalOpen(true);
              }}
              style={{
                border: '1px solid #E2E8F0',
                backgroundColor: '#FFFFFF',
                color: '#475569',
                padding: '5px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              <Edit2 size={13} />
            </button>
          )}

          {can('payroll', 'approve') && row.paymentStatus === 'PENDING_APPROVAL' && (
            <button
              title="Authorize & Release Payment"
              onClick={() => handleApprovePayroll(row.id)}
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
              <Check size={13} /> Release
            </button>
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
            <span style={{ fontSize: '12px', color: '#1467FF', fontWeight: 600 }}>Payroll</span>
          </div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#0F172A' }}>
            Payroll & Compensation Governance
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748B' }}>
            Manage monthly salary runs, statutory PF/ESIC deductions, payslips, and compliance records.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {can('payroll', 'export') && (
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
              <Download size={14} /> Export Bank File
            </button>
          )}
        </div>
      </div>

      {/* 2. Top Compliance StatCards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '16px',
          marginBottom: '20px'
        }}
      >
        <StatCard
          title="Total Monthly Payroll"
          value={`₹${(PAYROLL_SUMMARY_STATS.totalMonthlyDisbursement / 1000).toFixed(1)}k`}
          change="Sep 2026 Run"
          isPositive={true}
          icon={IndianRupee}
          iconColor="#10B981"
          iconBg="#ECFDF5"
        />

        <StatCard
          title="Processed Employees"
          value={`${PAYROLL_SUMMARY_STATS.totalProcessedCount} of ${PAYROLL_SUMMARY_STATS.totalEmployees}`}
          change="71% Disbursed"
          isPositive={true}
          icon={CheckCircle2}
          iconColor="#1467FF"
          iconBg="#EFF6FF"
        />

        <StatCard
          title="Pending Approval"
          value={PAYROLL_SUMMARY_STATS.pendingProcessingCount.toString()}
          change="Awaiting release"
          isPositive={false}
          icon={Clock}
          iconColor="#D97706"
          iconBg="#FEF3C7"
        />

        <StatCard
          title="Statutory Dues Remitted"
          value="₹26.7k"
          change="PF & ESIC Cleared"
          isPositive={true}
          icon={FileText}
          iconColor="#8B5CF6"
          iconBg="#F3E8FF"
        />
      </div>

      {/* 3. Universal DataTable */}
      <DataTable
        columns={columns}
        data={payrollData}
        searchPlaceholder="Search by employee name, ID, designation, bank..."
        searchKeys={['employeeName', 'employeeId', 'designation', 'departmentName', 'bankAccount']}
        filters={filterConfigs}
        filtersState={filtersState}
        onFilterChange={(key, val) => setFiltersState((prev) => ({ ...prev, [key]: val }))}
        selectable={true}
        selectedRows={selectedRows}
        onSelectRow={(id, checked) => {
          setSelectedRows((prev) => (checked ? [...prev, id] : prev.filter((r) => r !== id)));
        }}
        onSelectAll={(checked, visibleRows) => {
          setSelectedRows(checked ? visibleRows.map((r) => r.id) : []);
        }}
        onRowClick={(row) => handleOpenPayslip(row)}
      />

      {/* 4. Detail Drawer: Comprehensive Payslip Breakdown */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={selectedPayslip ? `Payslip: ${selectedPayslip.employeeName} (${selectedPayslip.payPeriod})` : 'Payslip Breakdown'}
        subtitle="Confidential Employee Salary Breakdown & Statutory Deductions"
        width="600px"
      >
        {selectedPayslip && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Header Profile Card */}
            <div
              style={{
                backgroundColor: '#F8FAFC',
                borderRadius: '14px',
                border: '1px solid #E2E8F0',
                padding: '18px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}
            >
              <img
                src={selectedPayslip.avatarUrl}
                alt={selectedPayslip.employeeName}
                style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #FFFFFF' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>
                    {selectedPayslip.employeeName}
                  </h4>
                  <StatusBadge status={selectedPayslip.paymentStatus} />
                </div>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                  {selectedPayslip.employeeId} • {selectedPayslip.designation}
                </div>
                <div style={{ fontSize: '11px', color: '#1467FF', fontWeight: 600, marginTop: '2px' }}>
                  {selectedPayslip.departmentName} • {selectedPayslip.payableDays} Payable Days
                </div>
              </div>
            </div>

            {/* Net Salary Highlight Callout */}
            <div
              style={{
                backgroundColor: '#ECFDF5',
                borderRadius: '12px',
                border: '1px solid #A7F3D0',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontSize: '12px', color: '#047857', fontWeight: 700 }}>NET TAKE-HOME SALARY</div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#065F46', marginTop: '2px' }}>
                  ₹{selectedPayslip.netPay.toLocaleString('en-IN')}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '11px', color: '#047857' }}>Payment Mode</div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#065F46' }}>
                  {selectedPayslip.paymentMode}
                </div>
              </div>
            </div>

            {/* Earnings & Deductions Breakdown Tables */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              {/* Earnings */}
              <div style={{ border: '1px solid #E2E8F0', borderRadius: '10px', padding: '14px', backgroundColor: '#FFFFFF' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', borderBottom: '1px solid #F1F5F9', paddingBottom: '8px', marginBottom: '8px' }}>
                  Earnings (+)
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B' }}>Basic Salary</span>
                    <strong style={{ color: '#0F172A' }}>₹{selectedPayslip.basicSalary.toLocaleString('en-IN')}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B' }}>HRA (50%)</span>
                    <strong style={{ color: '#0F172A' }}>₹{selectedPayslip.hra.toLocaleString('en-IN')}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B' }}>Special Allow.</span>
                    <strong style={{ color: '#0F172A' }}>₹{selectedPayslip.specialAllowance.toLocaleString('en-IN')}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #F1F5F9', paddingTop: '6px', marginTop: '4px' }}>
                    <strong style={{ color: '#0F172A' }}>Total Gross</strong>
                    <strong style={{ color: '#1467FF' }}>₹{selectedPayslip.grossPay.toLocaleString('en-IN')}</strong>
                  </div>
                </div>
              </div>

              {/* Deductions */}
              <div style={{ border: '1px solid #E2E8F0', borderRadius: '10px', padding: '14px', backgroundColor: '#FFFFFF' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', borderBottom: '1px solid #F1F5F9', paddingBottom: '8px', marginBottom: '8px' }}>
                  Deductions (-)
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B' }}>Provident Fund</span>
                    <strong style={{ color: '#EF4444' }}>₹{selectedPayslip.pfDeduction.toLocaleString('en-IN')}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B' }}>ESIC</span>
                    <strong style={{ color: '#EF4444' }}>₹{selectedPayslip.esicDeduction.toLocaleString('en-IN')}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B' }}>TDS / Income Tax</span>
                    <strong style={{ color: '#EF4444' }}>₹{selectedPayslip.tdsDeduction.toLocaleString('en-IN')}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #F1F5F9', paddingTop: '6px', marginTop: '4px' }}>
                    <strong style={{ color: '#0F172A' }}>Total Deductions</strong>
                    <strong style={{ color: '#EF4444' }}>₹{selectedPayslip.totalDeductions.toLocaleString('en-IN')}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Compliance & Bank Account Details */}
            <div style={{ padding: '12px 14px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #F1F5F9' }}>
              <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, marginBottom: '6px' }}>
                STATUTORY & BANKING IDENTIFIERS
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '12px' }}>
                <div>
                  <div style={{ color: '#94A3B8', fontSize: '10px' }}>UAN NUMBER</div>
                  <div style={{ fontWeight: 700, color: '#0F172A', fontFamily: 'monospace' }}>{selectedPayslip.uanNumber}</div>
                </div>
                <div>
                  <div style={{ color: '#94A3B8', fontSize: '10px' }}>PAN NUMBER</div>
                  <div style={{ fontWeight: 700, color: '#0F172A', fontFamily: 'monospace' }}>{selectedPayslip.panNumber}</div>
                </div>
                <div>
                  <div style={{ color: '#94A3B8', fontSize: '10px' }}>BANK ACCOUNT</div>
                  <div style={{ fontWeight: 700, color: '#0F172A' }}>{selectedPayslip.bankAccount}</div>
                </div>
              </div>
            </div>

            {/* Historical Payslips Stream */}
            <div>
              <h5 style={{ margin: '0 0 10px 0', fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>
                Past Payslip History
              </h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedPayslip.payslipHistory.map((hist, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #E2E8F0',
                      backgroundColor: '#FFFFFF',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '12px', color: '#0F172A' }}>{hist.month}</div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>
                        Gross: ₹{hist.gross.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontWeight: 800, color: '#059669', fontSize: '13px' }}>
                        ₹{hist.net.toLocaleString('en-IN')}
                      </span>
                      <StatusBadge status={hist.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Footer */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px', borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
              <button
                onClick={() => alert(`Downloading signed PDF payslip for ${selectedPayslip.employeeName} (${selectedPayslip.payPeriod})...`)}
                style={{
                  flex: 1,
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  color: '#334155',
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
                <Download size={14} /> Download PDF
              </button>

              {can('payroll', 'approve') && selectedPayslip.paymentStatus === 'PENDING_APPROVAL' && (
                <button
                  onClick={() => handleApprovePayroll(selectedPayslip.id)}
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
                  <Check size={14} /> Authorize Disbursement
                </button>
              )}
            </div>
          </div>
        )}
      </Drawer>

      {/* 5. Compensation Adjustment Modal */}
      {adjustingRecord && (
        <Modal
          isOpen={isAdjustModalOpen}
          onClose={() => setIsAdjustModalOpen(false)}
          title={`Adjust Compensation: ${adjustingRecord.employeeName}`}
          subtitle="Update basic salary, HRA, or special allowances prior to monthly payroll release."
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target;
              const basic = parseFloat(form.basicSalary.value) || adjustingRecord.basicSalary;
              const hra = parseFloat(form.hra.value) || adjustingRecord.hra;
              const allowance = parseFloat(form.specialAllowance.value) || adjustingRecord.specialAllowance;
              const gross = basic + hra + allowance;
              const deductions = adjustingRecord.totalDeductions;
              const net = gross - deductions;

              const updatedRecord = {
                ...adjustingRecord,
                basicSalary: basic,
                hra: hra,
                specialAllowance: allowance,
                grossPay: gross,
                netPay: net
              };

              setPayrollData((prev) => prev.map((p) => (p.id === updatedRecord.id ? updatedRecord : p)));
              setIsAdjustModalOpen(false);
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
          >
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Basic Salary (₹) *
              </label>
              <input
                name="basicSalary"
                type="number"
                defaultValue={adjustingRecord.basicSalary}
                required
                style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                House Rent Allowance / HRA (₹) *
              </label>
              <input
                name="hra"
                type="number"
                defaultValue={adjustingRecord.hra}
                required
                style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Special Allowance / Performance Incentive (₹) *
              </label>
              <input
                name="specialAllowance"
                type="number"
                defaultValue={adjustingRecord.specialAllowance}
                required
                style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
              <button
                type="button"
                onClick={() => setIsAdjustModalOpen(false)}
                style={{ padding: '9px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', background: '#FFF', color: '#475569', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{ padding: '9px 18px', borderRadius: '8px', border: 'none', background: '#1467FF', color: '#FFF', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
              >
                Save Compensation Adjustment
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
