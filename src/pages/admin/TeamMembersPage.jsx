import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UserPlus,
  Users,
  Building2,
  MapPin,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Save,
  X,
  PlusCircle,
  Edit,
  Trash2,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';
import { AdminLayout } from './AdminLayout';
import { useToast } from '../../context/ToastContext';

// Standard Department list matching TruckMitr operational hierarchy
export const DEPARTMENTS_LIST = [
  { id: 1, name: 'Operations' },
  { id: 2, name: 'Telecalling / CRM' },
  { id: 3, name: 'Verification & BGV' },
  { id: 4, name: 'Driver Management' },
  { id: 5, name: 'Transporter Fulfillment' },
  { id: 6, name: 'Accounts & Finance' },
  { id: 7, name: 'IT & Tech Support' },
  { id: 8, name: 'Marketing & Business Development' },
];

// Indian States list
export const STATES_LIST = [
  { id: 1, name: 'Rajasthan', code: 'RJ' },
  { id: 2, name: 'Haryana', code: 'HR' },
  { id: 3, name: 'Delhi', code: 'DL' },
  { id: 4, name: 'Uttar Pradesh', code: 'UP' },
  { id: 5, name: 'Punjab', code: 'PB' },
  { id: 6, name: 'Gujarat', code: 'GJ' },
  { id: 7, name: 'Maharashtra', code: 'MH' },
  { id: 8, name: 'Madhya Pradesh', code: 'MP' },
  { id: 9, name: 'Bihar', code: 'BR' },
  { id: 10, name: 'Andhra Pradesh', code: 'AP' },
  { id: 11, name: 'Karnataka', code: 'KA' },
  { id: 12, name: 'Tamil Nadu', code: 'TN' },
  { id: 13, name: 'West Bengal', code: 'WB' },
  { id: 14, name: 'Chhattisgarh', code: 'CG' },
  { id: 15, name: 'Jharkhand', code: 'JH' },
  { id: 16, name: 'Himachal Pradesh', code: 'HP' },
  { id: 17, name: 'Uttarakhand', code: 'UK' },
  { id: 18, name: 'Telangana', code: 'TS' },
  { id: 19, name: 'Odisha', code: 'OD' },
  { id: 20, name: 'Assam', code: 'AS' },
];

// Sample Initial Employees Dataset
const INITIAL_EMPLOYEES = [
  {
    id: 1,
    emp_id: 'TM-RJ-1001',
    full_name: 'Anjali Sharma',
    email: 'anjali.sharma@truckmitr.com',
    mobile: '9876543210',
    state: 1,
    state_name: 'Rajasthan',
    department: 1,
    department_name: 'Operations',
    status: 'Verified',
    created_at: '12 Jan 2026',
  },
  {
    id: 2,
    emp_id: 'TM-HR-1002',
    full_name: 'Amit Kumar',
    email: 'amit.kumar@truckmitr.com',
    mobile: '9812345678',
    state: 2,
    state_name: 'Haryana',
    department: 2,
    department_name: 'Telecalling / CRM',
    status: 'Submitted',
    created_at: '18 Jan 2026',
  },
  {
    id: 3,
    emp_id: 'TM-DL-1003',
    full_name: 'Vikram Singh',
    email: 'vikram.singh@truckmitr.com',
    mobile: '9823456789',
    state: 3,
    state_name: 'Delhi',
    department: 3,
    department_name: 'Verification & BGV',
    status: 'Verified',
    created_at: '24 Jan 2026',
  },
  {
    id: 4,
    emp_id: 'TM-UP-1004',
    full_name: 'Pooja Verma',
    email: 'pooja.verma@truckmitr.com',
    mobile: '9834567890',
    state: 4,
    state_name: 'Uttar Pradesh',
    department: 4,
    department_name: 'Driver Management',
    status: 'Pending',
    created_at: '02 Feb 2026',
  },
  {
    id: 5,
    emp_id: 'TM-GJ-1005',
    full_name: 'Rajesh Patel',
    email: 'rajesh.patel@truckmitr.com',
    mobile: '9845678901',
    state: 6,
    state_name: 'Gujarat',
    department: 5,
    department_name: 'Transporter Fulfillment',
    status: 'Verified',
    created_at: '10 Feb 2026',
  },
];

// =========================================================================
// 1. ADD NEW TEAM MEMBER PAGE (/admin/add-employee)
// =========================================================================
export const AddEmployeePage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: 'email',
    mobile: '',
    password: '',
    department: '',
    state: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.full_name.trim()) errs.full_name = 'Full name is required';
    if (!formData.email.trim() || formData.email === 'email' || !formData.email.includes('@')) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.mobile.trim() || formData.mobile.length !== 10) {
      errs.mobile = 'Please enter a valid 10-digit mobile number';
    }
    if (!formData.password || formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters long';
    }
    if (!formData.department) errs.department = 'Please select a department';
    if (!formData.state) errs.state = 'Please choose a state';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Please fill out all required fields correctly', 'error');
      return;
    }

    const selectedState = STATES_LIST.find((s) => s.id.toString() === formData.state.toString());
    const selectedDept = DEPARTMENTS_LIST.find((d) => d.id.toString() === formData.department.toString());
    const stateCode = selectedState ? selectedState.code : 'XX';
    const newEmpId = `TM-${stateCode}-${Math.floor(1000 + Math.random() * 9000)}`;

    showToast(`Team Member "${formData.full_name}" registered with ID: ${newEmpId}!`, 'success');
    navigate('/admin/employee');
  };

  return (
    <AdminLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', fontFamily: 'inherit' }}>
        
        {/* ========================================================================= */}
        {/* Page Header (Matching Reference Image)                                    */}
        {/* ========================================================================= */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div>
            <h1
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#111827',
                margin: 0,
                letterSpacing: '-0.02em',
              }}
            >
              Add New Team Member
            </h1>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.85rem',
                color: '#6B7280',
                marginTop: '4px',
              }}
            >
              <a href="/admin/dashboard" style={{ color: '#6B7280', textDecoration: 'none', fontWeight: 500 }}>
                Dashboard
              </a>
              <span>/</span>
              <a href="/admin/employee" style={{ color: '#6B7280', textDecoration: 'none', fontWeight: 500 }}>
                Members
              </a>
              <span>/</span>
              <span style={{ color: '#111827', fontWeight: 600 }}>Add</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/admin/employee')}
            style={{
              backgroundColor: '#475569',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 18px',
              fontSize: '0.875rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <Users size={16} />
            View Members List
          </button>
        </div>

        {/* ========================================================================= */}
        {/* Top Summary Metric Cards                                                  */}
        {/* ========================================================================= */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
          }}
        >
          {/* Card 1: Total Staff */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '18px 20px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <p style={{ fontSize: '0.8rem', color: '#6B7280', margin: 0, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Active Staff
              </p>
              <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#111827', margin: '4px 0 0' }}>
                48 Members
              </h3>
              <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 600 }}>
                ● 100% Operational
              </span>
            </div>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '10px',
                backgroundColor: '#EFF6FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#2563EB',
              }}
            >
              <Users size={22} />
            </div>
          </div>

          {/* Card 2: Departments */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '18px 20px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <p style={{ fontSize: '0.8rem', color: '#6B7280', margin: 0, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Departments
              </p>
              <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0284C7', margin: '4px 0 0' }}>
                {DEPARTMENTS_LIST.length} Units
              </h3>
              <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                CRM, BGV, Fleet, IT
              </span>
            </div>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '10px',
                backgroundColor: '#E0F2FE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0284C7',
              }}
            >
              <Building2 size={22} />
            </div>
          </div>

          {/* Card 3: Pending Submissions */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '18px 20px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <p style={{ fontSize: '0.8rem', color: '#6B7280', margin: 0, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Pending Verification
              </p>
              <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#D97706', margin: '4px 0 0' }}>
                3 Profiles
              </h3>
              <span style={{ fontSize: '0.75rem', color: '#D97706' }}>
                Awaiting Background Check
              </span>
            </div>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '10px',
                backgroundColor: '#FEF3C7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#D97706',
              }}
            >
              <Clock size={22} />
            </div>
          </div>

          {/* Card 4: State Coverage */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '18px 20px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <p style={{ fontSize: '0.8rem', color: '#6B7280', margin: 0, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Regional Hubs
              </p>
              <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#10B981', margin: '4px 0 0' }}>
                20 States
              </h3>
              <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                Pan-India Field Presence
              </span>
            </div>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '10px',
                backgroundColor: '#ECFDF5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#10B981',
              }}
            >
              <MapPin size={22} />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* Form Container (Exact Match to User Reference Screenshot)                 */}
        {/* ========================================================================= */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            overflow: 'hidden',
          }}
        >
          {/* Card Title Header */}
          <div
            style={{
              padding: '18px 24px',
              borderBottom: '1px solid #E5E7EB',
              backgroundColor: '#FFFFFF',
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: '1.1rem',
                fontWeight: 700,
                color: '#111827',
                letterSpacing: '-0.01em',
              }}
            >
              Team Member Details
            </h3>
          </div>

          {/* Card Body & Form */}
          <form onSubmit={handleSubmit} style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
            
            {/* Row 1: Full Name & Email */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
              <div>
                <label
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: '#374151',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  Full Name <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter full name"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  style={{
                    width: '100%',
                    height: '44px',
                    borderRadius: '8px',
                    border: errors.full_name ? '1px solid #EF4444' : '1px solid #CBD5E1',
                    padding: '0 14px',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box',
                    backgroundColor: '#FFFFFF',
                    outline: 'none',
                    transition: 'border-color 0.15s ease',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#2563EB')}
                  onBlur={(e) => (e.target.style.borderColor = errors.full_name ? '#EF4444' : '#CBD5E1')}
                />
                {errors.full_name && (
                  <span style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '4px', display: 'block' }}>
                    {errors.full_name}
                  </span>
                )}
              </div>

              <div>
                <label
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: '#374151',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  Email <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    height: '44px',
                    borderRadius: '8px',
                    border: errors.email ? '1px solid #EF4444' : '1px solid #CBD5E1',
                    padding: '0 14px',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box',
                    backgroundColor: '#FFFFFF',
                    outline: 'none',
                    transition: 'border-color 0.15s ease',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#2563EB')}
                  onBlur={(e) => (e.target.style.borderColor = errors.email ? '#EF4444' : '#CBD5E1')}
                />
                {errors.email && (
                  <span style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '4px', display: 'block' }}>
                    {errors.email}
                  </span>
                )}
              </div>
            </div>

            {/* Row 2: Mobile & Password */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
              <div>
                <label
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: '#374151',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  Mobile <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="Enter 10-digit mobile number"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '') })}
                  style={{
                    width: '100%',
                    height: '44px',
                    borderRadius: '8px',
                    border: errors.mobile ? '1px solid #EF4444' : '1px solid #CBD5E1',
                    padding: '0 14px',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box',
                    backgroundColor: '#FFFFFF',
                    outline: 'none',
                    transition: 'border-color 0.15s ease',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#2563EB')}
                  onBlur={(e) => (e.target.style.borderColor = errors.mobile ? '#EF4444' : '#CBD5E1')}
                />
                {errors.mobile && (
                  <span style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '4px', display: 'block' }}>
                    {errors.mobile}
                  </span>
                )}
              </div>

              <div>
                <label
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: '#374151',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  Password <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <div style={{ position: 'relative', width: '100%' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter secure password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    style={{
                      width: '100%',
                      height: '44px',
                      borderRadius: '8px',
                      border: errors.password ? '1px solid #EF4444' : '1px solid #CBD5E1',
                      paddingLeft: '14px',
                      paddingRight: '46px',
                      fontSize: '0.9rem',
                      boxSizing: 'border-box',
                      backgroundColor: '#FFFFFF',
                      outline: 'none',
                      transition: 'border-color 0.15s ease',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#2563EB')}
                    onBlur={(e) => (e.target.style.borderColor = errors.password ? '#EF4444' : '#CBD5E1')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '8px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#64748B',
                      cursor: 'pointer',
                      padding: '6px 8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <span style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '4px', display: 'block' }}>
                    {errors.password}
                  </span>
                )}
              </div>
            </div>

            {/* Row 3: Department & States */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
              <div>
                <label
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: '#374151',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  Department <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <select
                  required
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  style={{
                    width: '100%',
                    height: '44px',
                    borderRadius: '8px',
                    border: errors.department ? '1px solid #EF4444' : '1px solid #CBD5E1',
                    padding: '0 12px',
                    fontSize: '0.9rem',
                    backgroundColor: '#FFFFFF',
                    color: formData.department ? '#111827' : '#6B7280',
                    boxSizing: 'border-box',
                    outline: 'none',
                  }}
                >
                  <option value="">Select Department</option>
                  {DEPARTMENTS_LIST.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
                {errors.department && (
                  <span style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '4px', display: 'block' }}>
                    {errors.department}
                  </span>
                )}
              </div>

              <div>
                <label
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: '#374151',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  States<span style={{ color: '#EF4444' }}>*</span>
                </label>
                <select
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  style={{
                    width: '100%',
                    height: '44px',
                    borderRadius: '8px',
                    border: errors.state ? '1px solid #EF4444' : '1px solid #CBD5E1',
                    padding: '0 12px',
                    fontSize: '0.9rem',
                    backgroundColor: '#FFFFFF',
                    color: formData.state ? '#111827' : '#6B7280',
                    boxSizing: 'border-box',
                    outline: 'none',
                  }}
                >
                  <option value="">Select State</option>
                  {STATES_LIST.map((state) => (
                    <option key={state.id} value={state.id}>
                      {state.name}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <span style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '4px', display: 'block' }}>
                    {errors.state}
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons (Centered like the original reference image) */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '12px',
                marginTop: '16px',
                paddingTop: '16px',
              }}
            >
              <button
                type="submit"
                style={{
                  backgroundColor: '#2563EB',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '11px 26px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(37, 99, 235, 0.25)',
                  transition: 'background-color 0.15s ease',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1D4ED8')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2563EB')}
              >
                <Save size={17} />
                Save Member Details
              </button>

              <button
                type="button"
                onClick={() => navigate('/admin/employee')}
                style={{
                  backgroundColor: '#475569',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '11px 22px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#334155')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#475569')}
              >
                <X size={17} />
                Cancel
              </button>
            </div>

          </form>
        </div>

      </div>
    </AdminLayout>
  );
};

// =========================================================================
// 2. MEMBERS LIST PAGE (/admin/employee)
// =========================================================================
export const EmployeeListPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDept, setFilterDept] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Edit / Delete Modal State
  const [activeEmp, setActiveEmp] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [editForm, setEditForm] = useState({
    full_name: '',
    email: '',
    mobile: '',
    department: 1,
    state: 1,
    status: 'Verified',
  });

  const handleOpenEdit = (emp) => {
    setActiveEmp(emp);
    setEditForm({
      full_name: emp.full_name,
      email: emp.email,
      mobile: emp.mobile,
      department: emp.department,
      state: emp.state,
      status: emp.status,
    });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!activeEmp) return;

    const selectedDept = DEPARTMENTS_LIST.find((d) => d.id.toString() === editForm.department.toString());
    const selectedState = STATES_LIST.find((s) => s.id.toString() === editForm.state.toString());

    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === activeEmp.id
          ? {
              ...emp,
              full_name: editForm.full_name,
              email: editForm.email,
              mobile: editForm.mobile,
              department: Number(editForm.department),
              department_name: selectedDept ? selectedDept.name : emp.department_name,
              state: Number(editForm.state),
              state_name: selectedState ? selectedState.name : emp.state_name,
              status: editForm.status,
            }
          : emp
      )
    );

    showToast(`Employee "${editForm.full_name}" updated successfully!`, 'success');
    setIsEditModalOpen(false);
    setActiveEmp(null);
  };

  const handleConfirmDelete = () => {
    if (!activeEmp) return;
    setEmployees((prev) => prev.filter((emp) => emp.id !== activeEmp.id));
    showToast(`Employee "${activeEmp.full_name}" deleted!`, 'success');
    setIsDeleteModalOpen(false);
    setActiveEmp(null);
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.emp_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.mobile.includes(searchQuery);
    const matchesDept = filterDept === 'all' || emp.department.toString() === filterDept;
    const matchesStatus = filterStatus === 'all' || emp.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesDept && matchesStatus;
  });

  return (
    <AdminLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', fontFamily: 'inherit' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: 0 }}>
              Team Members
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#6B7280', marginTop: '4px' }}>
              <a href="/admin/dashboard" style={{ color: '#6B7280', textDecoration: 'none' }}>Dashboard</a>
              <span>/</span>
              <span style={{ color: '#111827', fontWeight: 600 }}>Members</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/admin/add-employee')}
            style={{
              backgroundColor: '#2563EB',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 18px',
              fontSize: '0.875rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)',
            }}
          >
            <PlusCircle size={17} />
            + Add New Member
          </button>
        </div>

        {/* Search & Filter Toolbar */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px',
          }}
        >
          <div style={{ position: 'relative', flex: '1 1 280px', maxWidth: '420px' }}>
            <Search size={17} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
            <input
              type="text"
              placeholder="Search by name, ID, email, or mobile..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                height: '38px',
                paddingLeft: '38px',
                paddingRight: '12px',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                fontSize: '0.85rem',
                backgroundColor: '#F8FAFC',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Filter size={15} style={{ color: '#6B7280' }} />
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569' }}>Dept:</span>
              <select
                value={filterDept}
                onChange={(e) => setFilterDept(e.target.value)}
                style={{ height: '36px', borderRadius: '6px', border: '1px solid #CBD5E1', padding: '0 10px', fontSize: '0.85rem', backgroundColor: '#FFFFFF' }}
              >
                <option value="all">All Departments</option>
                {DEPARTMENTS_LIST.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569' }}>Status:</span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{ height: '36px', borderRadius: '6px', border: '1px solid #CBD5E1', padding: '0 10px', fontSize: '0.85rem', backgroundColor: '#FFFFFF' }}
              >
                <option value="all">All Status</option>
                <option value="Verified">Verified</option>
                <option value="Submitted">Submitted</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Members List Table */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #E5E7EB' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#111827' }}>
              Members List
            </h3>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #E2E8F0', color: '#334155', fontSize: '0.85rem', fontWeight: 700 }}>
                  <th style={{ padding: '12px 16px', width: '50px', textAlign: 'center' }}>#</th>
                  <th style={{ padding: '12px 16px' }}>Emp ID</th>
                  <th style={{ padding: '12px 16px' }}>Full Name</th>
                  <th style={{ padding: '12px 16px' }}>Email</th>
                  <th style={{ padding: '12px 16px' }}>Mobile</th>
                  <th style={{ padding: '12px 16px' }}>State</th>
                  <th style={{ padding: '12px 16px' }}>Department</th>
                  <th style={{ padding: '12px 16px' }}>Submission Status</th>
                  <th style={{ padding: '12px 16px' }}>Registered at</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', width: '120px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.length === 0 ? (
                  <tr>
                    <td colSpan={10} style={{ padding: '32px', textAlign: 'center', color: '#64748B' }}>
                      No team members found.
                    </td>
                  </tr>
                ) : (
                  filteredEmployees.map((emp, index) => (
                    <tr key={emp.id} style={{ borderBottom: '1px solid #F1F5F9', backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#FAFAFA' }}>
                      <td style={{ padding: '14px 16px', textAlign: 'center', color: '#64748B', fontWeight: 600 }}>{index + 1}</td>
                      <td style={{ padding: '14px 16px', fontWeight: 700, color: '#2563EB', fontFamily: 'monospace' }}>{emp.emp_id}</td>
                      <td style={{ padding: '14px 16px', fontWeight: 600, color: '#111827' }}>{emp.full_name}</td>
                      <td style={{ padding: '14px 16px', color: '#475569' }}>{emp.email}</td>
                      <td style={{ padding: '14px 16px', color: '#475569', fontFamily: 'monospace' }}>{emp.mobile}</td>
                      <td style={{ padding: '14px 16px', color: '#334155', fontWeight: 500 }}>{emp.state_name}</td>
                      <td style={{ padding: '14px 16px', color: '#334155', fontWeight: 600 }}>{emp.department_name}</td>
                      <td style={{ padding: '14px 16px' }}>
                        <span
                          style={{
                            backgroundColor:
                              emp.status === 'Verified' ? '#DCFCE7' : emp.status === 'Submitted' ? '#FEF3C7' : '#F1F5F9',
                            color:
                              emp.status === 'Verified' ? '#15803D' : emp.status === 'Submitted' ? '#B45309' : '#475569',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            padding: '3px 9px',
                            borderRadius: '12px',
                            display: 'inline-block',
                          }}
                        >
                          {emp.status}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', color: '#64748B', fontSize: '0.85rem' }}>{emp.created_at}</td>
                      <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', gap: '6px' }}>
                          <button
                            onClick={() => handleOpenEdit(emp)}
                            style={{ backgroundColor: '#F59E0B', color: '#FFFFFF', border: 'none', borderRadius: '4px', padding: '5px 10px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setActiveEmp(emp);
                              setIsDeleteModalOpen(true);
                            }}
                            style={{ backgroundColor: '#EF4444', color: '#FFFFFF', border: 'none', borderRadius: '4px', padding: '5px 10px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Modal */}
        {isEditModalOpen && activeEmp && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', width: '100%', maxWidth: '560px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', overflow: 'hidden' }}>
              <div style={{ padding: '18px 24px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8FAFC' }}>
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: '#0F172A' }}>Edit Team Member</h3>
                <button onClick={() => setIsEditModalOpen(false)} style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer' }}><X size={20} /></button>
              </div>

              <form onSubmit={handleSaveEdit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>Full Name</label>
                  <input type="text" required value={editForm.full_name} onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })} style={{ width: '100%', height: '40px', borderRadius: '8px', border: '1px solid #CBD5E1', padding: '0 12px', boxSizing: 'border-box' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>Email</label>
                    <input type="email" required value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} style={{ width: '100%', height: '40px', borderRadius: '8px', border: '1px solid #CBD5E1', padding: '0 12px', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>Mobile</label>
                    <input type="tel" maxLength={10} required value={editForm.mobile} onChange={(e) => setEditForm({ ...editForm, mobile: e.target.value })} style={{ width: '100%', height: '40px', borderRadius: '8px', border: '1px solid #CBD5E1', padding: '0 12px', boxSizing: 'border-box' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>Department</label>
                    <select value={editForm.department} onChange={(e) => setEditForm({ ...editForm, department: e.target.value })} style={{ width: '100%', height: '40px', borderRadius: '8px', border: '1px solid #CBD5E1', padding: '0 10px', backgroundColor: '#FFFFFF', boxSizing: 'border-box' }}>
                      {DEPARTMENTS_LIST.map((dept) => (
                        <option key={dept.id} value={dept.id}>{dept.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>State</label>
                    <select value={editForm.state} onChange={(e) => setEditForm({ ...editForm, state: e.target.value })} style={{ width: '100%', height: '40px', borderRadius: '8px', border: '1px solid #CBD5E1', padding: '0 10px', backgroundColor: '#FFFFFF', boxSizing: 'border-box' }}>
                      {STATES_LIST.map((s) => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>Submission Status</label>
                  <select value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })} style={{ width: '100%', height: '40px', borderRadius: '8px', border: '1px solid #CBD5E1', padding: '0 10px', backgroundColor: '#FFFFFF', boxSizing: 'border-box' }}>
                    <option value="Verified">Verified</option>
                    <option value="Submitted">Submitted</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                  <button type="button" onClick={() => setIsEditModalOpen(false)} style={{ backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '8px', padding: '10px 18px', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" style={{ backgroundColor: '#2563EB', color: '#FFFFFF', border: 'none', borderRadius: '8px', padding: '10px 22px', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>Update Member</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {isDeleteModalOpen && activeEmp && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', width: '100%', maxWidth: '440px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', padding: '24px', textAlign: 'center' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#FEE2E2', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <AlertTriangle size={28} />
              </div>
              <h3 style={{ margin: '0 0 8px', fontSize: '1.2rem', fontWeight: 700, color: '#111827' }}>Delete Team Member?</h3>
              <p style={{ margin: '0 0 20px', fontSize: '0.875rem', color: '#64748B' }}>Are you sure you want to delete <strong>{activeEmp.full_name}</strong> ({activeEmp.emp_id})?</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                <button type="button" onClick={() => setIsDeleteModalOpen(false)} style={{ backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '8px', padding: '10px 20px', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                <button type="button" onClick={handleConfirmDelete} style={{ backgroundColor: '#EF4444', color: '#FFFFFF', border: 'none', borderRadius: '8px', padding: '10px 22px', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>Yes, Delete</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
};

// =========================================================================
// 3. DEPARTMENTS LIST PAGE (/admin/department/list)
// =========================================================================
export const DepartmentsListPage = () => {
  const { showToast } = useToast();
  const [departments, setDepartments] = useState(DEPARTMENTS_LIST);
  const [newDeptName, setNewDeptName] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddDepartment = (e) => {
    e.preventDefault();
    if (!newDeptName.trim()) {
      showToast('Please enter a department name', 'error');
      return;
    }
    const newDept = {
      id: Date.now(),
      name: newDeptName.trim(),
    };
    setDepartments([...departments, newDept]);
    showToast(`Department "${newDeptName}" added successfully!`, 'success');
    setNewDeptName('');
    setIsAddModalOpen(false);
  };

  const handleDeleteDept = (id, name) => {
    if (window.confirm(`Are you sure you want to delete department: ${name}?`)) {
      setDepartments(departments.filter((d) => d.id !== id));
      showToast(`Department "${name}" deleted!`, 'success');
    }
  };

  return (
    <AdminLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', fontFamily: 'inherit' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: 0 }}>
              Departments List
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#6B7280', marginTop: '4px' }}>
              <a href="/admin/dashboard" style={{ color: '#6B7280', textDecoration: 'none' }}>Dashboard</a>
              <span>/</span>
              <span style={{ color: '#111827', fontWeight: 600 }}>Departments</span>
            </div>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            style={{
              backgroundColor: '#2563EB',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 18px',
              fontSize: '0.875rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)',
            }}
          >
            <PlusCircle size={17} />
            + Add Department
          </button>
        </div>

        {/* Table */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #E5E7EB' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#111827' }}>
              All Registered Departments ({departments.length})
            </h3>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #E2E8F0', color: '#334155', fontSize: '0.85rem', fontWeight: 700 }}>
                <th style={{ padding: '12px 18px', width: '60px', textAlign: 'center' }}>#</th>
                <th style={{ padding: '12px 18px' }}>Department Name</th>
                <th style={{ padding: '12px 18px', textAlign: 'center', width: '140px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept, index) => (
                <tr key={dept.id} style={{ borderBottom: '1px solid #F1F5F9', backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#FAFAFA' }}>
                  <td style={{ padding: '14px 18px', textAlign: 'center', color: '#64748B', fontWeight: 600 }}>{index + 1}</td>
                  <td style={{ padding: '14px 18px', fontWeight: 600, color: '#111827' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Building2 size={16} style={{ color: '#2563EB' }} />
                      <span>{dept.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 18px', textAlign: 'center' }}>
                    <button
                      onClick={() => handleDeleteDept(dept.id, dept.name)}
                      style={{ backgroundColor: '#EF4444', color: '#FFFFFF', border: 'none', borderRadius: '4px', padding: '5px 12px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Dept Modal */}
        {isAddModalOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', width: '100%', maxWidth: '480px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', overflow: 'hidden' }}>
              <div style={{ padding: '18px 24px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8FAFC' }}>
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: '#0F172A' }}>+ Add New Department</h3>
                <button onClick={() => setIsAddModalOpen(false)} style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer' }}><X size={20} /></button>
              </div>
              <form onSubmit={handleAddDepartment} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>Department Name *</label>
                  <input type="text" required placeholder="e.g. Legal & Compliance" value={newDeptName} onChange={(e) => setNewDeptName(e.target.value)} style={{ width: '100%', height: '42px', borderRadius: '8px', border: '1px solid #CBD5E1', padding: '0 12px', boxSizing: 'border-box' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                  <button type="button" onClick={() => setIsAddModalOpen(false)} style={{ backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '8px', padding: '10px 18px', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" style={{ backgroundColor: '#2563EB', color: '#FFFFFF', border: 'none', borderRadius: '8px', padding: '10px 22px', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>Save Department</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
};
