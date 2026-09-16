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
  Receipt,
  IndianRupee,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Download,
  Eye,
  Edit2,
  Trash2,
  Check,
  X,
  FileText,
  Building2,
  Layers,
  Calendar
} from 'lucide-react';
import {
  EXPENSE_CATEGORIES,
  INITIAL_EXPENSES_DATA,
  EXPENSE_BUDGET_STATS
} from '../../services/mock/mockExpenses';

export const ExpensesPage = () => {
  const { can, getScope } = usePermissions();
  const { currentUser } = useAuth();

  const [expenses, setExpenses] = useState(INITIAL_EXPENSES_DATA);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  // Check department scope
  const expenseScope = getScope('expenses');
  const userDeptId = currentUser?.departmentId || 'dept-ops';

  const [filtersState, setFiltersState] = useState({
    departmentId: expenseScope === 'DEPARTMENT' ? userDeptId : 'ALL',
    status: 'ALL',
    category: 'ALL'
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
      key: 'category',
      label: 'All Categories',
      options: EXPENSE_CATEGORIES.map((c) => ({ value: c.id, label: c.label }))
    }
  ];

  // Dynamic Computation of Top KPI Stats
  const stats = useMemo(() => {
    const pendingAmount = expenses
      .filter((e) => e.status === 'PENDING_APPROVAL')
      .reduce((acc, curr) => acc + curr.amount, 0);

    const approvedSpend = expenses
      .filter((e) => e.status === 'APPROVED')
      .reduce((acc, curr) => acc + curr.amount, 0);

    const budgetUtilization = Math.round((approvedSpend / EXPENSE_BUDGET_STATS.monthlyBudget) * 100);

    return {
      pendingAmount: `₹${pendingAmount.toLocaleString('en-IN')}`,
      approvedSpend: `₹${approvedSpend.toLocaleString('en-IN')}`,
      budgetUtilization: `${budgetUtilization}%`,
      budgetRemaining: `₹${(EXPENSE_BUDGET_STATS.monthlyBudget - approvedSpend).toLocaleString('en-IN')}`
    };
  }, [expenses]);

  const handleOpenDetail = (expense) => {
    setSelectedExpense(expense);
    setIsDrawerOpen(true);
  };

  const handleDecision = (id, newStatus) => {
    const updatedApprovalStep = {
      step: 'Manager Decision',
      actor: currentUser?.name || 'Authorized Manager',
      timestamp: new Date().toLocaleString(),
      status: newStatus,
      notes: newStatus === 'APPROVED' ? 'Approved for reimbursement' : 'Rejected after audit'
    };

    setExpenses((prev) =>
      prev.map((exp) =>
        exp.id === id
          ? {
              ...exp,
              status: newStatus,
              approvalChain: [...exp.approvalChain, updatedApprovalStep]
            }
          : exp
      )
    );

    if (selectedExpense?.id === id) {
      setSelectedExpense((prev) => ({
        ...prev,
        status: newStatus,
        approvalChain: [...prev.approvalChain, updatedApprovalStep]
      }));
    }
  };

  const handleDeleteExpense = (expenseId) => {
    if (window.confirm('Are you sure you want to delete this expense claim?')) {
      setExpenses((prev) => prev.filter((e) => e.id !== expenseId));
      if (selectedExpense?.id === expenseId) {
        setIsDrawerOpen(false);
      }
    }
  };

  const handleExportCSV = () => {
    alert(`Exporting ${expenses.length} expense claims to CSV...`);
  };

  // Table Columns
  const columns = [
    {
      key: 'submittedBy',
      title: 'Submitted By',
      sortable: true,
      render: (_, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img
            src={row.submittedBy.avatarUrl}
            alt={row.submittedBy.name}
            style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div>
            <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '13px' }}>{row.submittedBy.name}</div>
            <div style={{ fontSize: '11px', color: '#64748B' }}>
              {row.expenseCode} • {row.departmentName}
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'categoryName',
      title: 'Category',
      sortable: true,
      render: (val, row) => {
        const catMeta = EXPENSE_CATEGORIES.find((c) => c.id === row.category) || EXPENSE_CATEGORIES[0];
        return (
          <span
            style={{
              padding: '3px 8px',
              borderRadius: '6px',
              backgroundColor: '#F1F5F9',
              color: '#334155',
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
      key: 'merchant',
      title: 'Merchant / Purpose',
      render: (val, row) => (
        <div>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#0F172A' }}>{val}</div>
          <div style={{ fontSize: '11px', color: '#64748B', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {row.notes}
          </div>
        </div>
      )
    },
    {
      key: 'amount',
      title: 'Amount (₹)',
      sortable: true,
      render: (val) => (
        <span style={{ fontWeight: 800, color: '#0F172A', fontSize: '13px' }}>
          ₹{val.toLocaleString('en-IN')}
        </span>
      )
    },
    {
      key: 'date',
      title: 'Expense Date',
      sortable: true,
      render: (val) => <span style={{ fontSize: '12px', color: '#64748B' }}>{val}</span>
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
            title="View Expense & Receipt"
            onClick={() => handleOpenDetail(row)}
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

          {can('expenses', 'approve') && row.status === 'PENDING_APPROVAL' && (
            <>
              <button
                title="Approve Claim"
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
                title="Reject Claim"
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

          {can('expenses', 'delete') && (
            <button
              title="Delete Claim"
              onClick={() => handleDeleteExpense(row.id)}
              style={{
                border: '1px solid #FEE2E2',
                backgroundColor: '#FFFFFF',
                color: '#EF4444',
                padding: '5px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              <Trash2 size={13} />
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
            <span style={{ fontSize: '12px', color: '#1467FF', fontWeight: 600 }}>Expenses</span>
          </div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#0F172A' }}>
            Employee Expenses & Reimbursements
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748B' }}>
            Submit operational expense claims, audit proof of spend, and track departmental budgets.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {can('expenses', 'export') && (
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

          {can('expenses', 'create') && (
            <button
              onClick={() => setIsSubmitModalOpen(true)}
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
              <Plus size={16} /> Submit Expense Claim
            </button>
          )}
        </div>
      </div>

      {/* 2. Top Summary KPI Cards (Computed dynamically) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '16px',
          marginBottom: '20px'
        }}
      >
        <StatCard
          title="Pending Approval"
          value={stats.pendingAmount}
          change="Awaiting Manager Review"
          isPositive={false}
          icon={Clock}
          iconColor="#D97706"
          iconBg="#FEF3C7"
        />

        <StatCard
          title="This Month's Spend"
          value={stats.approvedSpend}
          change="Approved Claims"
          isPositive={true}
          icon={CheckCircle2}
          iconColor="#059669"
          iconBg="#ECFDF5"
        />

        <StatCard
          title="Budget Utilization"
          value={stats.budgetUtilization}
          change={`Budget: ₹${(EXPENSE_BUDGET_STATS.monthlyBudget / 1000).toFixed(0)}k / mo`}
          isPositive={true}
          icon={IndianRupee}
          iconColor="#1467FF"
          iconBg="#EFF6FF"
        />

        <StatCard
          title="Remaining Budget"
          value={stats.budgetRemaining}
          change="Available for Sep 2026"
          isPositive={true}
          icon={Receipt}
          iconColor="#8B5CF6"
          iconBg="#F3E8FF"
        />
      </div>

      {/* 3. Universal DataTable */}
      <DataTable
        columns={columns}
        data={expenses}
        searchPlaceholder="Search by submitter, code, category, merchant, notes..."
        searchKeys={['expenseCode', 'merchant', 'notes', 'categoryName', 'departmentName']}
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
        onRowClick={(expense) => handleOpenDetail(expense)}
      />

      {/* 4. Detail Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={selectedExpense ? `Claim: ${selectedExpense.expenseCode}` : 'Expense Details'}
        subtitle="Expense Proof, Receipt Voucher & Multi-Stage Approval Chain"
        width="560px"
      >
        {selectedExpense && (
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
                src={selectedExpense.submittedBy.avatarUrl}
                alt={selectedExpense.submittedBy.name}
                style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>
                    {selectedExpense.submittedBy.name}
                  </h4>
                  <StatusBadge status={selectedExpense.status} />
                </div>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                  {selectedExpense.submittedBy.employeeId} • {selectedExpense.departmentName}
                </div>
                <div style={{ fontSize: '11px', color: '#1467FF', fontWeight: 600, marginTop: '2px' }}>
                  Claim Code: {selectedExpense.expenseCode}
                </div>
              </div>
            </div>

            {/* Amount & Merchant Callout */}
            <div
              style={{
                backgroundColor: '#EFF6FF',
                borderRadius: '12px',
                border: '1px solid #BFDBFE',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontSize: '11px', color: '#1E40AF', fontWeight: 700 }}>CLAIMED AMOUNT</div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#1E3A8A', marginTop: '2px' }}>
                  ₹{selectedExpense.amount.toLocaleString('en-IN')}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '11px', color: '#1E40AF' }}>Category</div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#1E3A8A' }}>
                  {selectedExpense.categoryName}
                </div>
              </div>
            </div>

            {/* Merchant Details & Notes */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #F1F5F9' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>MERCHANT / VENDOR</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>
                  {selectedExpense.merchant}
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>Date: {selectedExpense.date}</div>
              </div>
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #F1F5F9' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>EXPENSE JUSTIFICATION</div>
                <div style={{ fontSize: '12px', color: '#334155', marginTop: '2px' }}>
                  {selectedExpense.notes}
                </div>
              </div>
            </div>

            {/* Receipt Preview Placeholder Box */}
            <div>
              <h5 style={{ margin: '0 0 8px 0', fontSize: '13px', fontWeight: 700, color: '#334155' }}>
                Receipt Voucher Proof
              </h5>
              <div
                style={{
                  border: '1px solid #CBD5E1',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  position: 'relative',
                  backgroundColor: '#F8FAFC',
                  maxHeight: '160px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <img
                  src={selectedExpense.receiptUrl}
                  alt="Receipt Preview"
                  style={{ width: '100%', height: '160px', objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    bottom: '8px',
                    right: '8px',
                    backgroundColor: 'rgba(15, 23, 42, 0.85)',
                    color: '#FFF',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    fontSize: '10px',
                    fontWeight: 700
                  }}
                >
                  Verified Receipt Voucher
                </span>
              </div>
            </div>

            {/* Approval Chain Trail */}
            <div>
              <h5 style={{ margin: '0 0 10px 0', fontSize: '13px', fontWeight: 700, color: '#334155' }}>
                Approval Chain & Audit Trail
              </h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedExpense.approvalChain.map((step, idx) => (
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
                      <div style={{ fontWeight: 700, fontSize: '12px', color: '#0F172A' }}>
                        {step.step}: {step.actor}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>{step.notes}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: '4px',
                          backgroundColor: step.status === 'APPROVED' ? '#ECFDF5' : step.status === 'REJECTED' ? '#FEF2F2' : '#EFF6FF',
                          color: step.status === 'APPROVED' ? '#059669' : step.status === 'REJECTED' ? '#DC2626' : '#2563EB'
                        }}
                      >
                        {step.status}
                      </span>
                      <div style={{ fontSize: '10px', color: '#94A3B8', marginTop: '2px' }}>{step.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Footer for Approvers */}
            {can('expenses', 'approve') && selectedExpense.status === 'PENDING_APPROVAL' && (
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px', borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
                <button
                  onClick={() => handleDecision(selectedExpense.id, 'APPROVED')}
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
                  <Check size={14} /> Authorize Reimbursement
                </button>

                <button
                  onClick={() => handleDecision(selectedExpense.id, 'REJECTED')}
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
                  <X size={14} /> Reject Claim
                </button>
              </div>
            )}
          </div>
        )}
      </Drawer>

      {/* 5. Submit Expense Claim Modal */}
      <Modal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        title="Submit New Expense Claim"
        subtitle="Log operational reimbursement with category, merchant, and receipt proof."
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target;
            const catObj = EXPENSE_CATEGORIES.find((c) => c.id === form.category.value) || EXPENSE_CATEGORIES[0];

            const newExpense = {
              id: `exp-${Date.now()}`,
              expenseCode: `EXP-2609-${Math.floor(10 + Math.random() * 90)}`,
              submittedBy: {
                name: currentUser?.name || 'Staff User',
                avatarUrl: currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80',
                employeeId: currentUser?.employeeId || 'TMEMP005'
              },
              departmentId: currentUser?.departmentId || 'dept-ops',
              departmentName: currentUser?.departmentName || 'Operations & Fleet',
              category: form.category.value,
              categoryName: catObj.label,
              amount: parseFloat(form.amount.value) || 1200,
              date: form.date.value || new Date().toISOString().split('T')[0],
              status: 'PENDING_APPROVAL',
              merchant: form.merchant.value,
              notes: form.notes.value,
              receiptUrl: 'https://images.unsplash.com/photo-1554415707-9e4c019d08e4?auto=format&fit=crop&w=600&h=400&q=80',
              approvalChain: [
                {
                  step: 'Submission',
                  actor: currentUser?.name || 'Staff User',
                  timestamp: new Date().toLocaleString(),
                  status: 'SUBMITTED',
                  notes: 'Direct claim submission'
                }
              ]
            };

            setExpenses([newExpense, ...expenses]);
            setIsSubmitModalOpen(false);
          }}
          style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Expense Category *
              </label>
              <select
                name="category"
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', backgroundColor: '#FFF' }}
              >
                {EXPENSE_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Claim Amount (₹) *
              </label>
              <input
                name="amount"
                type="number"
                required
                placeholder="e.g. 2450"
                style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Merchant / Vendor *
              </label>
              <input
                name="merchant"
                required
                placeholder="e.g. HPCL Petrol Pump / Airtel"
                style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Expense Date *
              </label>
              <input
                name="date"
                type="date"
                required
                defaultValue="2026-09-10"
                style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
              Business Justification & Notes *
            </label>
            <textarea
              name="notes"
              required
              rows={3}
              placeholder="State purpose of expenditure and trip details..."
              style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
            <button
              type="button"
              onClick={() => setIsSubmitModalOpen(false)}
              style={{ padding: '9px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', background: '#FFF', color: '#475569', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ padding: '9px 18px', borderRadius: '8px', border: 'none', background: '#1467FF', color: '#FFF', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
            >
              Submit Claim
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
