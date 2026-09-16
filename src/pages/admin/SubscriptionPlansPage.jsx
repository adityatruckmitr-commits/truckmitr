import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CreditCard,
  PlusCircle,
  Edit,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Briefcase,
  Users,
  Building2,
  Check,
  X,
  Clock,
  Sparkles,
  ArrowRight,
  RotateCcw,
  IndianRupee,
  Layers,
  FileCheck,
} from 'lucide-react';
import { AdminLayout } from './AdminLayout';
import { useToast } from '../../context/ToastContext';

// Verification check mapping dictionary
export const CHECK_LABELS = {
  dl: 'DL Check',
  aadhar: 'Aadhar Check',
  pan: 'PAN Check',
  face: 'Face Check',
  rc: 'RC Check',
  challan: 'Challan Check',
  voter_id: 'Voter ID',
  court: 'Court Check',
  address: 'Address Check',
  physical: 'Physical Check',
};

// Real database plans dataset
const INITIAL_SUBSCRIPTION_PLANS = [
  {
    id: 8,
    name: 'trusted',
    role: 'driver',
    amount: 499.0,
    duration_months: 12,
    checks: ['dl', 'aadhar', 'pan', 'face', 'rc', 'challan', 'voter_id', 'court', 'address'],
    job_limit: -1, // Unlimited
    is_recurring: 1,
    is_active: 1,
    created_at: '28 Dec 2025',
  },
  {
    id: 3,
    name: 'verified',
    role: 'driver',
    amount: 299.0,
    duration_months: 12,
    checks: ['dl', 'aadhar', 'pan', 'face', 'rc', 'challan', 'voter_id'],
    job_limit: 20,
    is_recurring: 1,
    is_active: 1,
    created_at: '27 Dec 2025',
  },
  {
    id: 1,
    name: 'job_ready',
    role: 'driver',
    amount: 199.0,
    duration_months: 12,
    checks: [],
    job_limit: 5,
    is_recurring: 1,
    is_active: 1,
    created_at: '27 Dec 2025',
  },
  {
    id: 4,
    name: 'standard',
    role: 'transporter',
    amount: 999.0,
    duration_months: 3,
    checks: [],
    job_limit: null,
    is_recurring: 1,
    is_active: 1,
    created_at: '27 Dec 2025',
  },
  {
    id: 11,
    name: 'foreman_pro',
    role: 'foreman',
    amount: 999.0,
    duration_months: 6,
    checks: [],
    job_limit: null,
    is_recurring: 1,
    is_active: 1,
    created_at: '22 Jan 2026',
  },
  {
    id: 12,
    name: 'association_pro',
    role: 'association',
    amount: 1299.0,
    duration_months: 6,
    checks: [],
    job_limit: null,
    is_recurring: 1,
    is_active: 1,
    created_at: '05 Feb 2026',
  },
];

const INITIAL_JOB_PLANS = [
  {
    id: 10,
    name: 'super_premium_job',
    role: 'transporter',
    amount: 2999.0,
    duration_months: null,
    checks: [],
    job_limit: null,
    is_recurring: 0,
    is_active: 1,
    created_at: '29 Dec 2025',
  },
  {
    id: 9,
    name: 'premium_job',
    role: 'transporter',
    amount: 1999.0,
    duration_months: null,
    checks: [],
    job_limit: null,
    is_recurring: 0,
    is_active: 1,
    created_at: '29 Dec 2025',
  },
];

const INITIAL_VERIFICATION_PLANS = [
  {
    id: 13,
    name: 'identity_verification',
    role: 'transporter',
    amount: 199.0,
    duration_months: null,
    checks: ['dl', 'pan'],
    job_limit: null,
    is_recurring: 0,
    is_active: 1,
    created_at: '05 Feb 2026',
  },
  {
    id: 14,
    name: 'digital_verification',
    role: 'transporter',
    amount: 499.0,
    duration_months: null,
    checks: ['dl', 'pan', 'court', 'address'],
    job_limit: null,
    is_recurring: 0,
    is_active: 1,
    created_at: '05 Feb 2026',
  },
  {
    id: 15,
    name: 'complete_verification',
    role: 'transporter',
    amount: 1180.0,
    duration_months: null,
    checks: ['dl', 'pan', 'court', 'address', 'physical'],
    job_limit: null,
    is_recurring: 0,
    is_active: 1,
    created_at: '05 Feb 2026',
  },
];

export const SubscriptionPlansPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [subscriptionPlans, setSubscriptionPlans] = useState(INITIAL_SUBSCRIPTION_PLANS);
  const [jobPlans, setJobPlans] = useState(INITIAL_JOB_PLANS);
  const [verificationPlans, setVerificationPlans] = useState(INITIAL_VERIFICATION_PLANS);

  // Edit Modal State
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [editSection, setEditSection] = useState('subscription'); // subscription | job | verification
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    role: 'driver',
    amount: 0,
    duration_months: 12,
    job_limit: '',
    is_recurring: 1,
    is_active: 1,
    checks: [],
  });

  const handleOpenEdit = (plan, section) => {
    setSelectedPlan(plan);
    setEditSection(section);
    setEditForm({
      name: plan.name,
      role: plan.role,
      amount: plan.amount,
      duration_months: plan.duration_months || 12,
      job_limit: plan.job_limit === -1 ? 'Unlimited' : plan.job_limit ?? '',
      is_recurring: plan.is_recurring,
      is_active: plan.is_active,
      checks: plan.checks || [],
    });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!selectedPlan) return;

    const updatedJobLimit =
      editForm.job_limit === 'Unlimited' || editForm.job_limit === -1
        ? -1
        : editForm.job_limit === ''
        ? null
        : Number(editForm.job_limit);

    const updatedPlan = {
      ...selectedPlan,
      amount: Number(editForm.amount),
      duration_months: editForm.duration_months ? Number(editForm.duration_months) : null,
      job_limit: updatedJobLimit,
      is_recurring: editForm.is_recurring,
      is_active: editForm.is_active,
      checks: editForm.checks,
    };

    if (editSection === 'subscription') {
      setSubscriptionPlans((prev) => prev.map((p) => (p.id === selectedPlan.id ? updatedPlan : p)));
    } else if (editSection === 'job') {
      setJobPlans((prev) => prev.map((p) => (p.id === selectedPlan.id ? updatedPlan : p)));
    } else {
      setVerificationPlans((prev) => prev.map((p) => (p.id === selectedPlan.id ? updatedPlan : p)));
    }

    showToast(`Plan "${selectedPlan.name}" updated successfully!`, 'success');
    setIsEditModalOpen(false);
    setSelectedPlan(null);
  };

  const toggleCheck = (checkKey) => {
    setEditForm((prev) => {
      const exists = prev.checks.includes(checkKey);
      return {
        ...prev,
        checks: exists ? prev.checks.filter((c) => c !== checkKey) : [...prev.checks, checkKey],
      };
    });
  };

  // Helper role badge renderer
  const renderRoleBadge = (role) => {
    const roleColors = {
      driver: { bg: '#0284C7', color: '#FFFFFF' },
      transporter: { bg: '#0284C7', color: '#FFFFFF' },
      foreman: { bg: '#0284C7', color: '#FFFFFF' },
      association: { bg: '#0284C7', color: '#FFFFFF' },
    };
    const style = roleColors[role.toLowerCase()] || { bg: '#0284C7', color: '#FFFFFF' };
    return (
      <span
        style={{
          backgroundColor: style.bg,
          color: style.color,
          fontSize: '0.75rem',
          fontWeight: 600,
          padding: '3px 8px',
          borderRadius: '4px',
          textTransform: 'capitalize',
          display: 'inline-block',
        }}
      >
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    );
  };

  return (
    <AdminLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', fontFamily: 'inherit' }}>
        
        {/* ========================================================================= */}
        {/* Page Header                                                               */}
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
              Subscription Plans
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
              <span style={{ color: '#111827', fontWeight: 600 }}>Subscription Plans</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/admin/subscriptionplans/create')}
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
              transition: 'background-color 0.15s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1D4ED8')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2563EB')}
          >
            <PlusCircle size={17} />
            + Create New Plan
          </button>
        </div>

        {/* ========================================================================= */}
        {/* Top Summary Stat Cards                                                    */}
        {/* ========================================================================= */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
          }}
        >
          {/* Card 1: Total Plans */}
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
                Total Active Plans
              </p>
              <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#111827', margin: '4px 0 0' }}>
                {subscriptionPlans.length + jobPlans.length + verificationPlans.length} Plans
              </h3>
              <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 600 }}>● Across 4 Roles</span>
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
              <CreditCard size={22} />
            </div>
          </div>

          {/* Card 2: Driver Memberships */}
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
                Driver Subscriptions
              </p>
              <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0284C7', margin: '4px 0 0' }}>
                3 Tiers
              </h3>
              <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>Trusted, Verified, Job Ready</span>
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
              <Users size={22} />
            </div>
          </div>

          {/* Card 3: Job Credits */}
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
                Job Posting Plans
              </p>
              <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#7C3AED', margin: '4px 0 0' }}>
                2 Tiers
              </h3>
              <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>Super Premium & Premium</span>
            </div>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '10px',
                backgroundColor: '#F5F3FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#7C3AED',
              }}
            >
              <Briefcase size={22} />
            </div>
          </div>

          {/* Card 4: Verification Packs */}
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
                Transporter BGV Packs
              </p>
              <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#10B981', margin: '4px 0 0' }}>
                3 Packs
              </h3>
              <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>Identity, Digital, Complete</span>
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
              <ShieldCheck size={22} />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 1: Subscription Plans                                             */}
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
          {/* Section Header */}
          <div
            style={{
              padding: '16px 20px',
              borderBottom: '1px solid #E5E7EB',
              backgroundColor: '#FFFFFF',
            }}
          >
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#111827' }}>
              Subscription Plans
            </h3>
          </div>

          {/* Table 1 */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr
                  style={{
                    backgroundColor: '#F8FAFC',
                    borderBottom: '2px solid #E2E8F0',
                    color: '#334155',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                  }}
                >
                  <th style={{ padding: '12px 16px', width: '50px', textAlign: 'center' }}>#</th>
                  <th style={{ padding: '12px 16px' }}>Plan Name</th>
                  <th style={{ padding: '12px 16px' }}>Role</th>
                  <th style={{ padding: '12px 16px' }}>Amount (INR)</th>
                  <th style={{ padding: '12px 16px' }}>Recurring</th>
                  <th style={{ padding: '12px 16px' }}>Duration</th>
                  <th style={{ padding: '12px 16px' }}>Job Limit</th>
                  <th style={{ padding: '12px 16px', minWidth: '220px' }}>Checks</th>
                  <th style={{ padding: '12px 16px' }}>Status</th>
                  <th style={{ padding: '12px 16px' }}>Created At</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', width: '100px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {subscriptionPlans.map((plan, index) => (
                  <tr
                    key={plan.id}
                    style={{
                      borderBottom: '1px solid #F1F5F9',
                      backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#FBFBFB',
                    }}
                  >
                    <td style={{ padding: '14px 16px', textAlign: 'center', color: '#64748B', fontWeight: 600 }}>
                      {index + 1}
                    </td>

                    <td style={{ padding: '14px 16px', fontWeight: 600, color: '#111827' }}>
                      {plan.name}
                    </td>

                    <td style={{ padding: '14px 16px' }}>
                      {renderRoleBadge(plan.role)}
                    </td>

                    <td style={{ padding: '14px 16px', fontWeight: 600, color: '#334155' }}>
                      {plan.amount.toFixed(2)}
                    </td>

                    <td style={{ padding: '14px 16px' }}>
                      <span
                        style={{
                          backgroundColor: plan.is_recurring ? '#10B981' : '#6B7280',
                          color: '#FFFFFF',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          padding: '3px 8px',
                          borderRadius: '4px',
                        }}
                      >
                        {plan.is_recurring ? 'Yes' : 'No'}
                      </span>
                    </td>

                    <td style={{ padding: '14px 16px', color: '#334155', fontWeight: 500 }}>
                      {plan.duration_months ? `${plan.duration_months} Months` : '—'}
                    </td>

                    <td style={{ padding: '14px 16px', color: '#334155', fontWeight: 500 }}>
                      {plan.job_limit === -1 ? 'Unlimited' : plan.job_limit ?? '—'}
                    </td>

                    <td style={{ padding: '14px 16px' }}>
                      {plan.checks && plan.checks.length > 0 ? (
                        <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.8rem', color: '#475569' }}>
                          {plan.checks.map((c) => (
                            <li key={c}>{CHECK_LABELS[c] || c}</li>
                          ))}
                        </ul>
                      ) : (
                        <span style={{ color: '#94A3B8' }}>—</span>
                      )}
                    </td>

                    <td style={{ padding: '14px 16px' }}>
                      <span
                        style={{
                          backgroundColor: plan.is_active ? '#10B981' : '#EF4444',
                          color: '#FFFFFF',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          padding: '3px 8px',
                          borderRadius: '4px',
                        }}
                      >
                        {plan.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>

                    <td style={{ padding: '14px 16px', color: '#475569', fontSize: '0.85rem' }}>
                      {plan.created_at}
                    </td>

                    <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                      <button
                        onClick={() => handleOpenEdit(plan, 'subscription')}
                        style={{
                          backgroundColor: '#F59E0B',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '5px 14px',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'background 0.15s',
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#D97706')}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#F59E0B')}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 2: Job Plans                                                      */}
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
          {/* Section Header */}
          <div
            style={{
              padding: '16px 20px',
              borderBottom: '1px solid #E5E7EB',
              backgroundColor: '#FFFFFF',
            }}
          >
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#111827' }}>
              Job Plans
            </h3>
          </div>

          {/* Table 2 */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr
                  style={{
                    backgroundColor: '#F8FAFC',
                    borderBottom: '2px solid #E2E8F0',
                    color: '#334155',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                  }}
                >
                  <th style={{ padding: '12px 16px', width: '50px', textAlign: 'center' }}>#</th>
                  <th style={{ padding: '12px 16px' }}>Plan Name</th>
                  <th style={{ padding: '12px 16px' }}>Role</th>
                  <th style={{ padding: '12px 16px' }}>Amount (INR)</th>
                  <th style={{ padding: '12px 16px' }}>Recurring</th>
                  <th style={{ padding: '12px 16px' }}>Status</th>
                  <th style={{ padding: '12px 16px' }}>Created At</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', width: '100px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {jobPlans.map((plan, index) => (
                  <tr
                    key={plan.id}
                    style={{
                      borderBottom: '1px solid #F1F5F9',
                      backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#FBFBFB',
                    }}
                  >
                    <td style={{ padding: '14px 16px', textAlign: 'center', color: '#64748B', fontWeight: 600 }}>
                      {index + 1}
                    </td>

                    <td style={{ padding: '14px 16px', fontWeight: 600, color: '#111827' }}>
                      {plan.name}
                    </td>

                    <td style={{ padding: '14px 16px' }}>
                      {renderRoleBadge(plan.role)}
                    </td>

                    <td style={{ padding: '14px 16px', fontWeight: 600, color: '#334155' }}>
                      {plan.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>

                    <td style={{ padding: '14px 16px' }}>
                      <span
                        style={{
                          backgroundColor: plan.is_recurring ? '#10B981' : '#6B7280',
                          color: '#FFFFFF',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          padding: '3px 8px',
                          borderRadius: '4px',
                        }}
                      >
                        {plan.is_recurring ? 'Yes' : 'No'}
                      </span>
                    </td>

                    <td style={{ padding: '14px 16px' }}>
                      <span
                        style={{
                          backgroundColor: plan.is_active ? '#10B981' : '#EF4444',
                          color: '#FFFFFF',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          padding: '3px 8px',
                          borderRadius: '4px',
                        }}
                      >
                        {plan.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>

                    <td style={{ padding: '14px 16px', color: '#475569', fontSize: '0.85rem' }}>
                      {plan.created_at}
                    </td>

                    <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                      <button
                        onClick={() => handleOpenEdit(plan, 'job')}
                        style={{
                          backgroundColor: '#F59E0B',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '5px 14px',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'background 0.15s',
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#D97706')}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#F59E0B')}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 3: Transporter Verification Plans                                 */}
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
          {/* Section Header */}
          <div
            style={{
              padding: '16px 20px',
              borderBottom: '1px solid #E5E7EB',
              backgroundColor: '#FFFFFF',
            }}
          >
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#111827' }}>
              Transporter Verification Plans
            </h3>
          </div>

          {/* Table 3 */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr
                  style={{
                    backgroundColor: '#F8FAFC',
                    borderBottom: '2px solid #E2E8F0',
                    color: '#334155',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                  }}
                >
                  <th style={{ padding: '12px 16px', width: '50px', textAlign: 'center' }}>#</th>
                  <th style={{ padding: '12px 16px' }}>Plan Name</th>
                  <th style={{ padding: '12px 16px' }}>Role</th>
                  <th style={{ padding: '12px 16px' }}>Amount (INR)</th>
                  <th style={{ padding: '12px 16px' }}>Recurring</th>
                  <th style={{ padding: '12px 16px', minWidth: '220px' }}>Checks</th>
                  <th style={{ padding: '12px 16px' }}>Status</th>
                  <th style={{ padding: '12px 16px' }}>Created At</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', width: '100px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {verificationPlans.map((plan, index) => (
                  <tr
                    key={plan.id}
                    style={{
                      borderBottom: '1px solid #F1F5F9',
                      backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#FBFBFB',
                    }}
                  >
                    <td style={{ padding: '14px 16px', textAlign: 'center', color: '#64748B', fontWeight: 600 }}>
                      {index + 1}
                    </td>

                    <td style={{ padding: '14px 16px', fontWeight: 600, color: '#111827' }}>
                      {plan.name}
                    </td>

                    <td style={{ padding: '14px 16px' }}>
                      {renderRoleBadge(plan.role)}
                    </td>

                    <td style={{ padding: '14px 16px', fontWeight: 600, color: '#334155' }}>
                      {plan.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>

                    <td style={{ padding: '14px 16px' }}>
                      <span
                        style={{
                          backgroundColor: plan.is_recurring ? '#10B981' : '#6B7280',
                          color: '#FFFFFF',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          padding: '3px 8px',
                          borderRadius: '4px',
                        }}
                      >
                        {plan.is_recurring ? 'Yes' : 'No'}
                      </span>
                    </td>

                    <td style={{ padding: '14px 16px' }}>
                      {plan.checks && plan.checks.length > 0 ? (
                        <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.8rem', color: '#475569' }}>
                          {plan.checks.map((c) => (
                            <li key={c}>{CHECK_LABELS[c] || c}</li>
                          ))}
                        </ul>
                      ) : (
                        <span style={{ color: '#94A3B8' }}>—</span>
                      )}
                    </td>

                    <td style={{ padding: '14px 16px' }}>
                      <span
                        style={{
                          backgroundColor: plan.is_active ? '#10B981' : '#EF4444',
                          color: '#FFFFFF',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          padding: '3px 8px',
                          borderRadius: '4px',
                        }}
                      >
                        {plan.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>

                    <td style={{ padding: '14px 16px', color: '#475569', fontSize: '0.85rem' }}>
                      {plan.created_at}
                    </td>

                    <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                      <button
                        onClick={() => handleOpenEdit(plan, 'verification')}
                        style={{
                          backgroundColor: '#F59E0B',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '5px 14px',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'background 0.15s',
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#D97706')}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#F59E0B')}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* EDIT PLAN MODAL                                                           */}
        {/* ========================================================================= */}
        {isEditModalOpen && selectedPlan && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(15, 23, 42, 0.65)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              padding: '20px',
            }}
          >
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                width: '100%',
                maxWidth: '620px',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Header */}
              <div
                style={{
                  padding: '20px 24px',
                  borderBottom: '1px solid #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '16px 16px 0 0',
                }}
              >
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: '#0F172A' }}>
                    Edit Plan: {selectedPlan.name}
                  </h3>
                  <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: '#64748B' }}>
                    Update pricing, duration, job limits, and included check features
                  </p>
                </div>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#64748B',
                    cursor: 'pointer',
                    padding: '6px',
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSaveEdit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                
                {/* Plan Name & Role (Disabled for ID safety) */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                      Plan Name
                    </label>
                    <input
                      type="text"
                      disabled
                      value={editForm.name}
                      style={{
                        width: '100%',
                        height: '40px',
                        borderRadius: '8px',
                        border: '1px solid #E2E8F0',
                        backgroundColor: '#F8FAFC',
                        padding: '0 12px',
                        fontSize: '0.875rem',
                        boxSizing: 'border-box',
                        color: '#64748B',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                      Target Role
                    </label>
                    <input
                      type="text"
                      disabled
                      value={editForm.role}
                      style={{
                        width: '100%',
                        height: '40px',
                        borderRadius: '8px',
                        border: '1px solid #E2E8F0',
                        backgroundColor: '#F8FAFC',
                        padding: '0 12px',
                        fontSize: '0.875rem',
                        boxSizing: 'border-box',
                        color: '#64748B',
                        textTransform: 'capitalize',
                      }}
                    />
                  </div>
                </div>

                {/* Amount & Status */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                      Amount (INR) <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <input
                      type="number"
                      required
                      step="0.01"
                      value={editForm.amount}
                      onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
                      style={{
                        width: '100%',
                        height: '40px',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        padding: '0 12px',
                        fontSize: '0.9rem',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                      Status
                    </label>
                    <select
                      value={editForm.is_active}
                      onChange={(e) => setEditForm({ ...editForm, is_active: Number(e.target.value) })}
                      style={{
                        width: '100%',
                        height: '40px',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        padding: '0 10px',
                        fontSize: '0.875rem',
                        backgroundColor: '#FFFFFF',
                      }}
                    >
                      <option value={1}>Active</option>
                      <option value={0}>Inactive</option>
                    </select>
                  </div>
                </div>

                {/* Duration & Job Limit (If subscription) */}
                {editSection === 'subscription' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                        Duration (Months)
                      </label>
                      <input
                        type="number"
                        value={editForm.duration_months}
                        onChange={(e) => setEditForm({ ...editForm, duration_months: e.target.value })}
                        style={{
                          width: '100%',
                          height: '40px',
                          borderRadius: '8px',
                          border: '1px solid #CBD5E1',
                          padding: '0 12px',
                          fontSize: '0.9rem',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                        Job Limit (Type 'Unlimited' or number)
                      </label>
                      <input
                        type="text"
                        value={editForm.job_limit}
                        onChange={(e) => setEditForm({ ...editForm, job_limit: e.target.value })}
                        placeholder="e.g. 20 or Unlimited"
                        style={{
                          width: '100%',
                          height: '40px',
                          borderRadius: '8px',
                          border: '1px solid #CBD5E1',
                          padding: '0 12px',
                          fontSize: '0.9rem',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Verification Checks Selector (If subscription or verification pack) */}
                {editSection !== 'job' && (
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '8px' }}>
                      Included Verification Checks
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
                      {Object.entries(CHECK_LABELS).map(([key, label]) => {
                        const isChecked = editForm.checks.includes(key);
                        return (
                          <label
                            key={key}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              padding: '6px 10px',
                              borderRadius: '6px',
                              border: isChecked ? '1px solid #2563EB' : '1px solid #E2E8F0',
                              backgroundColor: isChecked ? '#EFF6FF' : '#FFFFFF',
                              cursor: 'pointer',
                              fontSize: '0.8rem',
                              fontWeight: 500,
                              color: isChecked ? '#1D4ED8' : '#475569',
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleCheck(key)}
                              style={{ width: '15px', height: '15px', accentColor: '#2563EB' }}
                            />
                            <span>{label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Modal Footer Buttons */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    style={{
                      backgroundColor: '#F1F5F9',
                      color: '#475569',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '10px 18px',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    style={{
                      backgroundColor: '#2563EB',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '10px 22px',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)',
                    }}
                  >
                    Update Plan
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export const CreateSubscriptionPlanPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    plan_type: 'subscription', // subscription | job | verification
    amount: '',
    duration_months: '12',
    job_limit: '',
    is_recurring: '1',
    is_active: '1',
    checks: [],
  });

  const toggleCheck = (checkKey) => {
    setFormData((prev) => {
      const exists = prev.checks.includes(checkKey);
      return {
        ...prev,
        checks: exists ? prev.checks.filter((c) => c !== checkKey) : [...prev.checks, checkKey],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('Please enter a plan name', 'error');
      return;
    }
    if (!formData.role) {
      showToast('Please select a target role', 'error');
      return;
    }
    if (!formData.amount) {
      showToast('Please enter a plan pricing amount', 'error');
      return;
    }

    showToast(`Subscription plan "${formData.name}" created successfully!`, 'success');
    navigate('/admin/subscriptionplans');
  };

  return (
    <AdminLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: 'inherit' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: 0 }}>
              Create Subscription Plan
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#6B7280', marginTop: '4px' }}>
              <a href="/admin/dashboard" style={{ color: '#6B7280', textDecoration: 'none' }}>Dashboard</a>
              <span>/</span>
              <a href="/admin/subscriptionplans" style={{ color: '#6B7280', textDecoration: 'none' }}>Subscription Plans</a>
              <span>/</span>
              <span style={{ color: '#111827', fontWeight: 600 }}>Create</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/admin/subscriptionplans')}
            style={{
              backgroundColor: '#475569',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 18px',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            ← Back to Plans
          </button>
        </div>

        {/* Card Form */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '28px 32px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>
                  Plan Name <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. enterprise_fleet_pro"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', height: '42px', borderRadius: '8px', border: '1px solid #CBD5E1', padding: '0 12px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>
                  Target Role <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <select
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  style={{ width: '100%', height: '42px', borderRadius: '8px', border: '1px solid #CBD5E1', padding: '0 10px', backgroundColor: '#FFFFFF', boxSizing: 'border-box' }}
                >
                  <option value="">-- Select Role --</option>
                  <option value="driver">Driver</option>
                  <option value="transporter">Transporter</option>
                  <option value="foreman">Foreman</option>
                  <option value="association">Association</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>
                  Amount (INR) <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 499.00"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  style={{ width: '100%', height: '42px', borderRadius: '8px', border: '1px solid #CBD5E1', padding: '0 12px', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>
                  Plan Category
                </label>
                <select
                  value={formData.plan_type}
                  onChange={(e) => setFormData({ ...formData, plan_type: e.target.value })}
                  style={{ width: '100%', height: '42px', borderRadius: '8px', border: '1px solid #CBD5E1', padding: '0 10px', backgroundColor: '#FFFFFF', boxSizing: 'border-box' }}
                >
                  <option value="subscription">Membership Subscription Plan</option>
                  <option value="job">Job Posting Credit Plan</option>
                  <option value="verification">Verification Check Pack</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>
                  Recurring (Auto-Renewal)
                </label>
                <select
                  value={formData.is_recurring}
                  onChange={(e) => setFormData({ ...formData, is_recurring: e.target.value })}
                  style={{ width: '100%', height: '42px', borderRadius: '8px', border: '1px solid #CBD5E1', padding: '0 10px', backgroundColor: '#FFFFFF', boxSizing: 'border-box' }}
                >
                  <option value="1">Yes (Recurring)</option>
                  <option value="0">No (One-Time)</option>
                </select>
              </div>

              {formData.plan_type === 'subscription' && (
                <div>
                  <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>
                    Duration (Months)
                  </label>
                  <input
                    type="number"
                    value={formData.duration_months}
                    onChange={(e) => setFormData({ ...formData, duration_months: e.target.value })}
                    style={{ width: '100%', height: '42px', borderRadius: '8px', border: '1px solid #CBD5E1', padding: '0 12px', boxSizing: 'border-box' }}
                  />
                </div>
              )}
            </div>

            {/* Checks Selection */}
            {formData.plan_type !== 'job' && (
              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '8px' }}>
                  Included Verification Checks
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px' }}>
                  {Object.entries(CHECK_LABELS).map(([key, label]) => {
                    const isChecked = formData.checks.includes(key);
                    return (
                      <label
                        key={key}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          border: isChecked ? '1px solid #2563EB' : '1px solid #CBD5E1',
                          backgroundColor: isChecked ? '#EFF6FF' : '#FFFFFF',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          fontWeight: 500,
                          color: isChecked ? '#1D4ED8' : '#374151',
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleCheck(key)}
                          style={{ width: '16px', height: '16px', accentColor: '#2563EB' }}
                        />
                        <span>{label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button
                type="submit"
                style={{
                  backgroundColor: '#2563EB',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 24px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)',
                }}
              >
                Create Plan
              </button>

              <button
                type="button"
                onClick={() => navigate('/admin/subscriptionplans')}
                style={{
                  backgroundColor: '#475569',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 18px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </div>

          </form>
        </div>

      </div>
    </AdminLayout>
  );
};
