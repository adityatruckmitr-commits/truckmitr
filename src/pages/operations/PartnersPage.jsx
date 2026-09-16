import React, { useState } from 'react';
import { usePermissions } from '../../context/PermissionContext';
import { StatCard } from '../../components/common/StatCard';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Drawer } from '../../components/common/Drawer';
import { Modal } from '../../components/common/Modal';
import { BarTrendChart } from '../../components/charts/BarTrendChart';
import {
  Handshake,
  Building2,
  Users,
  TrendingUp,
  Clock,
  Plus,
  Download,
  Eye,
  Edit2,
  Trash2,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Layers,
  ChevronRight,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import {
  PARTNER_TABS,
  ONBOARDING_STAGES,
  INITIAL_PARTNERS_DATA,
  PARTNER_STATS
} from '../../services/mock/mockPartners';

export const PartnersPage = () => {
  const { can } = usePermissions();

  const [partners, setPartners] = useState(INITIAL_PARTNERS_DATA);
  const [activeTab, setActiveTab] = useState('ALL');
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  // Filters State
  const [filtersState, setFiltersState] = useState({
    status: 'ALL',
    onboardingStage: 'ALL'
  });

  const filterConfigs = [
    {
      key: 'status',
      label: 'All Status',
      options: [
        { value: 'ACTIVE', label: 'Active & Live' },
        { value: 'ONBOARDING', label: 'In Onboarding' },
        { value: 'INACTIVE', label: 'Inactive' }
      ]
    },
    {
      key: 'onboardingStage',
      label: 'All Onboarding Stages',
      options: ONBOARDING_STAGES.map((s) => ({ value: s.id, label: s.label }))
    }
  ];

  // Filter partners by Active Category Tab + filtersState
  const tabFilteredPartners = partners.filter((p) => {
    if (activeTab !== 'ALL' && p.category !== activeTab) return false;
    if (filtersState.status !== 'ALL' && p.status !== filtersState.status) return false;
    if (filtersState.onboardingStage !== 'ALL' && p.onboardingStage !== filtersState.onboardingStage) return false;
    return true;
  });

  const handleOpenDetail = (partner) => {
    setSelectedPartner(partner);
    setIsDrawerOpen(true);
  };

  const handleAdvanceStage = () => {
    if (!selectedPartner) return;
    const currentIdx = ONBOARDING_STAGES.findIndex((s) => s.id === selectedPartner.onboardingStage);
    if (currentIdx >= ONBOARDING_STAGES.length - 1) return;

    const nextStage = ONBOARDING_STAGES[currentIdx + 1];
    const isCompleted = nextStage.id === 'ONBOARDED';

    const updatedPartner = {
      ...selectedPartner,
      onboardingStage: nextStage.id,
      onboardingProgress: Math.round(((currentIdx + 2) / ONBOARDING_STAGES.length) * 100),
      status: isCompleted ? 'ACTIVE' : selectedPartner.status,
      contactHistory: [
        {
          date: 'Just now',
          type: 'Stage Advance',
          summary: `Onboarding stage approved and advanced to ${nextStage.label}`,
          staff: 'Current User'
        },
        ...selectedPartner.contactHistory
      ]
    };

    setSelectedPartner(updatedPartner);
    setPartners((prev) => prev.map((p) => (p.id === updatedPartner.id ? updatedPartner : p)));
  };

  const handleDeletePartner = (partnerId) => {
    if (window.confirm('Are you sure you want to remove this ecosystem partner?')) {
      setPartners((prev) => prev.filter((p) => p.id !== partnerId));
      if (selectedPartner?.id === partnerId) {
        setIsDrawerOpen(false);
      }
    }
  };

  const handleExportCSV = () => {
    alert(`Exporting ${partners.length} partner records to CSV...`);
  };

  // Table Columns
  const columns = [
    {
      key: 'name',
      title: 'Partner Name',
      sortable: true,
      render: (_, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img
            src={row.logoUrl}
            alt={row.name}
            style={{ width: '38px', height: '38px', borderRadius: '10px', objectFit: 'cover', border: '1px solid #E2E8F0' }}
          />
          <div>
            <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '13px' }}>{row.name}</div>
            <div style={{ fontSize: '11px', color: '#64748B' }}>
              {row.partnerCode} • <span style={{ fontWeight: 600, color: '#1467FF' }}>{row.type}</span>
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'location',
      title: 'Location',
      sortable: true,
      render: (_, row) => (
        <div style={{ fontSize: '12px', color: '#334155', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <MapPin size={12} color="#94A3B8" /> {row.location}
        </div>
      )
    },
    {
      key: 'keyContact',
      title: 'Key Contact',
      render: (_, row) => (
        <div>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>{row.keyContact.name}</div>
          <div style={{ fontSize: '11px', color: '#64748B' }}>{row.keyContact.role}</div>
        </div>
      )
    },
    {
      key: 'status',
      title: 'Status / Stage',
      sortable: true,
      render: (_, row) => (
        <div>
          <StatusBadge status={row.status} />
          {row.status === 'ONBOARDING' && (
            <div style={{ fontSize: '10px', color: '#D97706', fontWeight: 700, marginTop: '2px' }}>
              {ONBOARDING_STAGES.find((s) => s.id === row.onboardingStage)?.label || row.onboardingStage}
            </div>
          )}
        </div>
      )
    },
    {
      key: 'jobsLeadsGenerated',
      title: 'Leads Generated',
      sortable: true,
      render: (val) => (
        <span style={{ fontWeight: 800, color: '#0F172A', fontSize: '13px' }}>
          {val.toLocaleString()}
        </span>
      )
    },
    {
      key: 'conversionRate',
      title: 'Conversion %',
      sortable: true,
      render: (val) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span
            style={{
              padding: '2px 8px',
              borderRadius: '6px',
              backgroundColor: val >= 60 ? '#ECFDF5' : '#FEF3C7',
              color: val >= 60 ? '#059669' : '#D97706',
              fontSize: '11px',
              fontWeight: 800
            }}
          >
            {val}%
          </span>
        </div>
      )
    },
    {
      key: 'joinedOn',
      title: 'Joined On',
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

          {can('partners', 'edit') && (
            <button
              title="Edit Partner"
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

          {can('partners', 'delete') && (
            <button
              title="Delete Partner"
              onClick={() => handleDeletePartner(row.id)}
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
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Operations</span>
            <span style={{ color: '#CBD5E1' }}>/</span>
            <span style={{ fontSize: '12px', color: '#1467FF', fontWeight: 600 }}>Partners</span>
          </div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#0F172A' }}>
            Highway & Ecosystem Partners
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748B' }}>
            Manage OEMs, Training Institutes, Vehicle Financiers, Dhabas, and Roadside Service Partners.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {can('partners', 'export') && (
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

          {can('partners', 'create') && (
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
              <Plus size={16} /> Add New Partner
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
          title="Total Ecosystem Partners"
          value={PARTNER_STATS.totalPartners.toLocaleString()}
          change="+15%"
          isPositive={true}
          icon={Handshake}
          iconColor="#1467FF"
          iconBg="#EFF6FF"
        />

        <StatCard
          title="Active Live Partners"
          value={PARTNER_STATS.activePartners.toLocaleString()}
          change="81% active rate"
          isPositive={true}
          icon={CheckCircle2}
          iconColor="#059669"
          iconBg="#ECFDF5"
        />

        <StatCard
          title="In Onboarding Pipeline"
          value={PARTNER_STATS.inOnboarding.toLocaleString()}
          change="Awaiting verification"
          isPositive={false}
          icon={Clock}
          iconColor="#D97706"
          iconBg="#FEF3C7"
        />

        <StatCard
          title="Jobs & Leads Generated"
          value={PARTNER_STATS.totalLeadsGenerated.toLocaleString()}
          change="+24% this quarter"
          isPositive={true}
          icon={TrendingUp}
          iconColor="#8B5CF6"
          iconBg="#F3E8FF"
        />
      </div>

      {/* 3. Category Tabs Bar */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '12px',
          marginBottom: '16px',
          borderBottom: '1px solid #E2E8F0'
        }}
      >
        {PARTNER_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const count =
            tab.id === 'ALL'
              ? partners.length
              : partners.filter((p) => p.category === tab.id).length;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '10px',
                border: isActive ? '1px solid #1467FF' : '1px solid #E2E8F0',
                backgroundColor: isActive ? '#EFF6FF' : '#FFFFFF',
                color: isActive ? '#1467FF' : '#475569',
                fontSize: '13px',
                fontWeight: isActive ? 800 : 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.label}
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  backgroundColor: isActive ? '#1467FF' : '#F1F5F9',
                  color: isActive ? '#FFFFFF' : '#64748B',
                  padding: '1px 7px',
                  borderRadius: '999px'
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 4. Universal DataTable */}
      <DataTable
        columns={columns}
        data={tabFilteredPartners}
        searchPlaceholder="Search by partner name, type, contact person, location, code..."
        searchKeys={['name', 'partnerCode', 'type', 'location', 'city', 'state']}
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
        onRowClick={(partner) => handleOpenDetail(partner)}
      />

      {/* 5. Detail Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={selectedPartner ? selectedPartner.name : 'Partner Profile'}
        subtitle="Partner Governance, Lead Metrics & Onboarding Workflow"
        width="600px"
      >
        {selectedPartner && (
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
                src={selectedPartner.logoUrl}
                alt={selectedPartner.name}
                style={{ width: '60px', height: '60px', borderRadius: '12px', objectFit: 'cover', border: '2px solid #FFFFFF' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>
                    {selectedPartner.name}
                  </h4>
                  <StatusBadge status={selectedPartner.status} />
                </div>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                  Code: <strong>{selectedPartner.partnerCode}</strong> • {selectedPartner.type}
                </div>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                  {selectedPartner.location}
                </div>
              </div>
            </div>

            {/* Description */}
            <div style={{ padding: '12px 14px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #F1F5F9', fontSize: '12px', color: '#475569', lineHeight: 1.5 }}>
              {selectedPartner.description}
            </div>

            {/* Onboarding Stage Tracker Banner (If in onboarding) */}
            {selectedPartner.status === 'ONBOARDING' && (
              <div
                style={{
                  backgroundColor: '#FFFBEB',
                  border: '1px solid #FDE68A',
                  borderRadius: '12px',
                  padding: '14px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <div>
                    <strong style={{ fontSize: '13px', color: '#92400E' }}>Onboarding Progress</strong>
                    <div style={{ fontSize: '11px', color: '#B45309' }}>
                      Current Stage: {ONBOARDING_STAGES.find((s) => s.id === selectedPartner.onboardingStage)?.label}
                    </div>
                  </div>
                  {can('partners', 'approve') && selectedPartner.onboardingStage !== 'ONBOARDED' && (
                    <button
                      onClick={handleAdvanceStage}
                      style={{
                        backgroundColor: '#D97706',
                        color: '#FFF',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '6px 12px',
                        fontSize: '11px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      Advance Stage →
                    </button>
                  )}
                </div>

                {/* Visual Progress Stepper */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
                  {ONBOARDING_STAGES.slice(0, 4).map((stage, idx) => {
                    const currentIdx = ONBOARDING_STAGES.findIndex((s) => s.id === selectedPartner.onboardingStage);
                    const isDone = currentIdx >= idx;

                    return (
                      <div
                        key={stage.id}
                        style={{
                          height: '6px',
                          borderRadius: '3px',
                          backgroundColor: isDone ? '#D97706' : '#FDE68A'
                        }}
                        title={stage.label}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Monthly Leads Generated Trend Chart */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid #E2E8F0',
                padding: '16px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h5 style={{ margin: 0, fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>
                  Monthly Leads & Jobs Generated
                </h5>
                <span style={{ fontSize: '11px', color: '#059669', fontWeight: 700 }}>
                  {selectedPartner.jobsLeadsGenerated} Total ({selectedPartner.conversionRate}% Conversion)
                </span>
              </div>
              <BarTrendChart data={selectedPartner.monthlyTrend} height={180} />
            </div>

            {/* Key Contact Person */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #F1F5F9' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>KEY CONTACT PERSON</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>{selectedPartner.keyContact.name}</div>
                <div style={{ fontSize: '11px', color: '#64748B' }}>{selectedPartner.keyContact.role}</div>
              </div>
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #F1F5F9' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>CONTACT DETAILS</div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>{selectedPartner.keyContact.phone}</div>
                <div style={{ fontSize: '11px', color: '#64748B', wordBreak: 'break-all' }}>{selectedPartner.keyContact.email}</div>
              </div>
            </div>

            {/* Contact & Meeting History Log */}
            <div>
              <h5 style={{ margin: '0 0 10px 0', fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>
                Contact & Meeting Interaction Log
              </h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedPartner.contactHistory.map((log, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '8px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E2E8F0'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B' }}>{log.type}</span>
                      <span style={{ fontSize: '11px', color: '#94A3B8' }}>{log.date}</span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#475569', marginTop: '3px' }}>{log.summary}</div>
                    <div style={{ fontSize: '11px', color: '#1467FF', fontWeight: 600, marginTop: '2px' }}>By: {log.staff}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Drawer Action Footer */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px', borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
              <button
                onClick={() => alert(`Calling ${selectedPartner.keyContact.name} at ${selectedPartner.keyContact.phone}...`)}
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
                <Phone size={14} /> Call Partner
              </button>

              <button
                onClick={() => alert(`Opening email client for ${selectedPartner.keyContact.email}...`)}
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
                <Mail size={14} /> Send Email
              </button>
            </div>
          </div>
        )}
      </Drawer>

      {/* 6. Add New Partner Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Onboard New Highway & Ecosystem Partner"
        subtitle="Register an OEM, Training Institute, Financier, or Service Partner."
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target;
            const newPartner = {
              id: `ptr-${Date.now()}`,
              partnerCode: `PTR-${form.category.value.substring(0, 3)}-${Math.floor(10 + Math.random() * 90)}`,
              name: form.name.value,
              type: form.type.value,
              category: form.category.value,
              logoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=100&h=100&q=80',
              location: `${form.city.value}, ${form.state.value}`,
              city: form.city.value,
              state: form.state.value,
              keyContact: {
                name: form.contactName.value,
                role: form.contactRole.value || 'Partner Manager',
                phone: form.phone.value,
                email: form.email.value
              },
              status: 'ONBOARDING',
              onboardingStage: 'KYC_VERIFICATION',
              onboardingProgress: 20,
              jobsLeadsGenerated: 0,
              conversionRate: 0,
              joinedOn: new Date().toISOString().split('T')[0],
              description: form.description.value || 'Ecosystem partner onboarded via Admin console.',
              contactHistory: [
                {
                  date: 'Today',
                  type: 'Partner Registered',
                  summary: 'Onboarding initiated',
                  staff: 'Current User'
                }
              ],
              monthlyTrend: [{ month: 'Sep', value: 0, label: '0' }]
            };

            setPartners([newPartner, ...partners]);
            setIsAddModalOpen(false);
          }}
          style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
        >
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
              Partner Organization Name *
            </label>
            <input
              name="name"
              required
              placeholder="e.g. Mahindra Commercial Vehicles Hub"
              style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Category *
              </label>
              <select
                name="category"
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', backgroundColor: '#FFF' }}
              >
                <option value="OEM">OEM</option>
                <option value="FLEET">Fleet & Transporter</option>
                <option value="TRAINING">Training Institute</option>
                <option value="FINANCIER">Financier</option>
                <option value="SERVICE">Service Partner / Dhaba</option>
                <option value="ASSOCIATION">Association</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Specific Partner Type
              </label>
              <input
                name="type"
                placeholder="e.g. Commercial Vehicle OEM"
                defaultValue="OEM"
                style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                State *
              </label>
              <input
                name="state"
                required
                placeholder="e.g. Maharashtra"
                style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                City *
              </label>
              <input
                name="city"
                required
                placeholder="e.g. Pune"
                style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Key Contact Name *
              </label>
              <input
                name="contactName"
                required
                placeholder="e.g. Ramesh Kulkarni"
                style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Designation / Role
              </label>
              <input
                name="contactRole"
                placeholder="e.g. VP Fleet Relations"
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
                placeholder="+91 98765 11111"
                style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Email Address
              </label>
              <input
                name="email"
                type="email"
                placeholder="contact@partner.com"
                style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
              Partnership Scope & Objectives
            </label>
            <textarea
              name="description"
              rows={2}
              placeholder="Describe collaboration scope, driver hiring targets, amenities, or discounts..."
              style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
            />
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
              Onboard Partner
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
