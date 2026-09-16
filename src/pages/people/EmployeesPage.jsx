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
  Users,
  Building2,
  CheckCircle2,
  Calendar,
  Briefcase,
  Plus,
  Download,
  Eye,
  Edit2,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Lock,
  IndianRupee,
  FileText,
  UserCheck
} from 'lucide-react';
import { INITIAL_EMPLOYEES_DATA, EMPLOYEE_STATS } from '../../services/mock/mockEmployees';

export const EmployeesPage = () => {
  const { can, getScope } = usePermissions();
  const { currentUser, currentRoleObj } = useAuth();

  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES_DATA);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  // Check department scope for employees module
  const employeeScope = getScope('employees');
  const userDeptId = currentUser?.departmentId || 'dept-ops';

  // Filters State (defaults to own department if role has DEPARTMENT scope)
  const [filtersState, setFiltersState] = useState({
    departmentId: employeeScope === 'DEPARTMENT' ? userDeptId : 'ALL',
    status: 'ALL'
  });

  const filterConfigs = [
    {
      key: 'departmentId',
      label: 'All Departments',
      options: DEPARTMENTS.map((d) => ({ value: d.id, label: d.name }))
    },
    {
      key: 'status',
      label: 'All Status',
      options: [
        { value: 'ACTIVE', label: 'Active Staff' },
        { value: 'INACTIVE', label: 'Inactive' }
      ]
    }
  ];

  // Helper to check if compensation section in drawer should be masked/hidden
  const canViewCompensation = can('payroll', 'view');
  const isCompensationMasked = (emp) => {
    if (!canViewCompensation) return true;
    const payrollScope = getScope('payroll');
    if (payrollScope === 'ALL' || currentUser?.roleSlug === 'admin' || currentUser?.roleSlug === 'ceo' || currentUser?.roleSlug === 'hr') {
      return false;
    }
    return emp.departmentId !== userDeptId;
  };

  const handleOpenDetail = (emp) => {
    setSelectedEmployee(emp);
    setIsDrawerOpen(true);
  };

  const handleDeleteEmployee = (empId) => {
    if (window.confirm('Are you sure you want to deactivate and remove this employee profile?')) {
      setEmployees((prev) => prev.filter((e) => e.id !== empId));
      if (selectedEmployee?.id === empId) {
        setIsDrawerOpen(false);
      }
    }
  };

  const handleExportCSV = () => {
    alert(`Exporting ${employees.length} employee records to CSV...`);
  };

  // Table Columns
  const columns = [
    {
      key: 'name',
      title: 'Employee Details',
      sortable: true,
      render: (_, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img
            src={row.avatarUrl}
            alt={row.name}
            style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #E2E8F0' }}
          />
          <div>
            <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '13px' }}>{row.name}</div>
            <div style={{ fontSize: '11px', color: '#64748B' }}>
              {row.designation}
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'employeeId',
      title: 'Employee ID',
      sortable: true,
      render: (val) => (
        <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#1E293B', fontSize: '12px' }}>
          {val}
        </span>
      )
    },
    {
      key: 'departmentName',
      title: 'Department',
      sortable: true,
      render: (val) => (
        <span
          style={{
            fontSize: '11px',
            fontWeight: 700,
            backgroundColor: '#F1F5F9',
            color: '#334155',
            padding: '3px 8px',
            borderRadius: '6px'
          }}
        >
          {val}
        </span>
      )
    },
    {
      key: 'phone',
      title: 'Contact',
      render: (_, row) => (
        <div>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>{row.phone}</div>
          <div style={{ fontSize: '11px', color: '#64748B' }}>{row.email}</div>
        </div>
      )
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (val) => <StatusBadge status={val} />
    },
    {
      key: 'joinedDate',
      title: 'Joined Date',
      sortable: true,
      render: (val) => <span style={{ fontSize: '12px', color: '#64748B' }}>{val}</span>
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} onClick={(e) => e.stopPropagation()}>
          <button
            title="View Details"
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

          {can('employees', 'edit') && (
            <button
              title="Edit Profile"
              onClick={() => handleOpenDetail(row)}
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

          {can('employees', 'delete') && (
            <button
              title="Deactivate / Delete"
              onClick={() => handleDeleteEmployee(row.id)}
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
            <span style={{ fontSize: '12px', color: '#1467FF', fontWeight: 600 }}>Employees</span>
          </div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#0F172A' }}>
            Master Employee & Staff Registry
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748B' }}>
            Staff directory, department allocations, reporting manager hierarchies, and KYC verification records.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {can('employees', 'export') && (
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

          {can('employees', 'create') && (
            <button
              onClick={() => setIsAddModalOpen(true)}
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
              <Plus size={16} /> Add Employee
            </button>
          )}
        </div>
      </div>

      {/* 2. Top KPI Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '16px',
          marginBottom: '20px'
        }}
      >
        <StatCard
          title="Total Active Headcount"
          value={EMPLOYEE_STATS.totalStaff.toString()}
          change="Across 6 Teams"
          isPositive={true}
          icon={Users}
          iconColor="#1467FF"
          iconBg="#EFF6FF"
        />

        <StatCard
          title="Departments"
          value={EMPLOYEE_STATS.departmentsCount.toString()}
          change="Operations, Sales, HR, Tech..."
          isPositive={true}
          icon={Building2}
          iconColor="#059669"
          iconBg="#ECFDF5"
        />

        <StatCard
          title="Work Mode Split"
          value={`${EMPLOYEE_STATS.onPremiseCount} Office / ${EMPLOYEE_STATS.hybridCount} Hybrid`}
          change="98% on premise"
          isPositive={true}
          icon={Briefcase}
          iconColor="#8B5CF6"
          iconBg="#F3E8FF"
        />

        <StatCard
          title="Avg Attendance Rate"
          value="96.5%"
          change="+1.2% this month"
          isPositive={true}
          icon={UserCheck}
          iconColor="#F59E0B"
          iconBg="#FEF3C7"
        />
      </div>

      {/* 3. Universal DataTable */}
      <DataTable
        columns={columns}
        data={employees}
        searchPlaceholder="Search by name, employee ID, designation, department, email, phone..."
        searchKeys={['name', 'employeeId', 'designation', 'departmentName', 'email', 'phone']}
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
        onRowClick={(emp) => handleOpenDetail(emp)}
      />

      {/* 4. Detail Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={selectedEmployee ? `${selectedEmployee.name} (${selectedEmployee.employeeId})` : 'Employee Profile'}
        subtitle="Staff Master Record, Reporting Line, KYC & Compensation"
        width="600px"
      >
        {selectedEmployee && (
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
                src={selectedEmployee.avatarUrl}
                alt={selectedEmployee.name}
                style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #FFFFFF' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>
                    {selectedEmployee.name}
                  </h4>
                  <StatusBadge status={selectedEmployee.status} />
                </div>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                  ID: <strong>{selectedEmployee.employeeId}</strong> • {selectedEmployee.designation}
                </div>
                <div style={{ fontSize: '11px', color: '#1467FF', fontWeight: 600, marginTop: '2px' }}>
                  {selectedEmployee.departmentName} • {selectedEmployee.workMode} ({selectedEmployee.location})
                </div>
              </div>
            </div>

            {/* Department & Reporting Hierarchy */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #F1F5F9' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>DEPARTMENT</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>
                  {selectedEmployee.departmentName}
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                  Head: {DEPARTMENTS.find((d) => d.id === selectedEmployee.departmentId)?.headName || 'Executive'}
                </div>
              </div>
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #F1F5F9' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>REPORTING MANAGER</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>
                  {selectedEmployee.reportingManagerName}
                </div>
                <div style={{ fontSize: '11px', color: '#059669', fontWeight: 600, marginTop: '2px' }}>
                  Joined: {selectedEmployee.joinedDate}
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #F1F5F9' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>PHONE</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>{selectedEmployee.phone}</div>
              </div>
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #F1F5F9' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>OFFICIAL EMAIL</div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A', marginTop: '2px', wordBreak: 'break-all' }}>
                  {selectedEmployee.email}
                </div>
              </div>
            </div>

            {/* Compensation & Salary Section (Independently Gated by can('payroll', 'view')) */}
            <div style={{ border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', backgroundColor: '#FFFFFF' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <IndianRupee size={16} color="#059669" />
                  <h5 style={{ margin: 0, fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>
                    Compensation & CTC Structure
                  </h5>
                </div>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#64748B', backgroundColor: '#F1F5F9', padding: '2px 6px', borderRadius: '4px' }}>
                  🔒 Payroll Gated
                </span>
              </div>

              {!canViewCompensation ? (
                <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '8px', textAlign: 'center', color: '#94A3B8', fontSize: '12px' }}>
                  <Lock size={16} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                  Compensation data restricted. Requires <strong>payroll:view</strong> permission.
                </div>
              ) : isCompensationMasked(selectedEmployee) ? (
                <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '8px', textAlign: 'center', color: '#94A3B8', fontSize: '12px' }}>
                  <Lock size={16} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                  Compensation figures masked for outside departments per role scope (<strong>DEPARTMENT</strong>).
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', fontSize: '12px' }}>
                  <div style={{ padding: '8px', backgroundColor: '#F8FAFC', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', color: '#64748B' }}>Basic Salary</div>
                    <strong style={{ color: '#0F172A', fontSize: '13px' }}>₹{selectedEmployee.salaryInfo.basicSalary.toLocaleString('en-IN')}</strong>
                  </div>
                  <div style={{ padding: '8px', backgroundColor: '#F8FAFC', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', color: '#64748B' }}>HRA</div>
                    <strong style={{ color: '#0F172A', fontSize: '13px' }}>₹{selectedEmployee.salaryInfo.hra.toLocaleString('en-IN')}</strong>
                  </div>
                  <div style={{ padding: '8px', backgroundColor: '#F8FAFC', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', color: '#1467FF' }}>Gross Pay</div>
                    <strong style={{ color: '#1467FF', fontSize: '13px' }}>₹{selectedEmployee.salaryInfo.grossPay.toLocaleString('en-IN')}</strong>
                  </div>
                  <div style={{ padding: '8px', backgroundColor: '#ECFDF5', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', color: '#059669' }}>Net Disbursed</div>
                    <strong style={{ color: '#059669', fontSize: '13px' }}>₹{selectedEmployee.salaryInfo.netPay.toLocaleString('en-IN')}</strong>
                  </div>
                </div>
              )}
            </div>

            {/* Employment History */}
            <div>
              <h5 style={{ margin: '0 0 10px 0', fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>
                Employment & Work Experience
              </h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedEmployee.employmentHistory.map((h, idx) => (
                  <div key={idx} style={{ padding: '10px 12px', borderRadius: '8px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '12px', color: '#0F172A' }}>{h.role}</div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>{h.company}</div>
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: '#475569' }}>{h.period}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Verification Documents */}
            <div>
              <h5 style={{ margin: '0 0 10px 0', fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>
                KYC & Compliance Documents
              </h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedEmployee.documents.map((doc, idx) => (
                  <div key={idx} style={{ padding: '10px 12px', borderRadius: '8px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FileText size={16} color="#1467FF" />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '12px', color: '#0F172A' }}>{doc.type}</div>
                        <div style={{ fontSize: '10px', color: '#64748B' }}>Verified on {doc.verifiedAt}</div>
                      </div>
                    </div>
                    <StatusBadge status={doc.status} />
                  </div>
                ))}
              </div>
            </div>

            {/* Drawer Action Footer */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px', borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
              <button
                onClick={() => alert(`Calling ${selectedEmployee.name} at ${selectedEmployee.phone}...`)}
                style={{
                  flex: 1,
                  backgroundColor: '#10B981',
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
                <Phone size={14} /> Call Employee
              </button>

              <button
                onClick={() => alert(`Sending email to ${selectedEmployee.email}...`)}
                style={{
                  flex: 1,
                  backgroundColor: '#1467FF',
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
                <Mail size={14} /> Email Staff
              </button>
            </div>
          </div>
        )}
      </Drawer>

      {/* 5. Add Employee Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Employee"
        subtitle="Provision staff profile, department, and reporting manager."
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target;
            const deptObj = DEPARTMENTS.find((d) => d.id === form.departmentId.value) || DEPARTMENTS[1];

            const newEmployee = {
              id: `emp-${Date.now()}`,
              employeeId: `TMEMP0${Math.floor(10 + Math.random() * 90)}`,
              name: form.name.value,
              avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
              email: form.email.value,
              phone: form.phone.value,
              designation: form.designation.value,
              departmentId: deptObj.id,
              departmentName: deptObj.name,
              reportingManagerId: deptObj.head_user_id,
              reportingManagerName: deptObj.headName,
              status: 'ACTIVE',
              joinedDate: new Date().toISOString().split('T')[0],
              workMode: form.workMode.value,
              location: 'Headquarters, Delhi',
              salaryInfo: {
                basicSalary: parseFloat(form.basicSalary.value) || 20000,
                hra: (parseFloat(form.basicSalary.value) || 20000) * 0.5,
                specialAllowance: 5000,
                grossPay: (parseFloat(form.basicSalary.value) || 20000) * 1.5 + 5000,
                netPay: ((parseFloat(form.basicSalary.value) || 20000) * 1.5 + 5000) * 0.9
              },
              employmentHistory: [
                { role: form.designation.value, company: 'TruckMitr One', period: '2026 - Present' }
              ],
              documents: [
                { type: 'Aadhaar Card', status: 'VERIFIED', verifiedAt: new Date().toISOString().split('T')[0] }
              ],
              stats: { attendanceRate: '100%', leavesRemaining: 18, openTasks: 0 }
            };

            setEmployees([newEmployee, ...employees]);
            setIsAddModalOpen(false);
          }}
          style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
        >
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
              Full Name *
            </label>
            <input
              name="name"
              required
              placeholder="e.g. Ramesh Kulkarni"
              style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Department *
              </label>
              <select
                name="departmentId"
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', backgroundColor: '#FFF' }}
              >
                {DEPARTMENTS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Designation *
              </label>
              <input
                name="designation"
                required
                placeholder="e.g. Operations Executive"
                style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Phone Number *
              </label>
              <input
                name="phone"
                required
                placeholder="+91 98765 00000"
                style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Work Email *
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="name@truckmitr.com"
                style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Work Mode
              </label>
              <select
                name="workMode"
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', backgroundColor: '#FFF' }}
              >
                <option value="Office">Office</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Basic Salary (₹)
              </label>
              <input
                name="basicSalary"
                type="number"
                defaultValue={20000}
                style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              style={{ padding: '9px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', background: '#FFF', color: '#475569', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ padding: '9px 18px', borderRadius: '8px', border: 'none', background: '#1467FF', color: '#FFF', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
            >
              Add Staff Record
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
