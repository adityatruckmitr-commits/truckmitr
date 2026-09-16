import React, { useState } from 'react';
import { usePermissions } from '../../context/PermissionContext';
import { StatCard } from '../../components/common/StatCard';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Drawer } from '../../components/common/Drawer';
import { Modal } from '../../components/common/Modal';
import { WidgetGate } from '../../components/guards/WidgetGate';
import {
  UserCheck,
  Users,
  Clock,
  Briefcase,
  AlertCircle,
  Plus,
  Download,
  Eye,
  Edit2,
  Trash2,
  ShieldCheck,
  FileText,
  Phone,
  MapPin,
  CheckCircle2,
  XCircle,
  Calendar,
  Layers
} from 'lucide-react';
import { INITIAL_DRIVERS_DATA, DRIVER_STATS } from '../../services/mock/mockDrivers';

export const DriversPage = () => {
  const { can } = usePermissions();

  const [drivers, setDrivers] = useState(INITIAL_DRIVERS_DATA);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  // Filters State
  const [filtersState, setFiltersState] = useState({
    status: 'ALL',
    verificationStatus: 'ALL',
    licenseType: 'ALL',
    state: 'ALL'
  });

  // Filter configuration for DataTable
  const filterConfigs = [
    {
      key: 'status',
      label: 'All Status',
      options: [
        { value: 'ACTIVE', label: 'Active' },
        { value: 'PENDING', label: 'Pending' },
        { value: 'INACTIVE', label: 'Inactive' }
      ]
    },
    {
      key: 'verificationStatus',
      label: 'All Verification',
      options: [
        { value: 'VERIFIED', label: 'Verified' },
        { value: 'UNDER REVIEW', label: 'Under Review' },
        { value: 'PENDING', label: 'Pending Docs' }
      ]
    },
    {
      key: 'licenseType',
      label: 'All License Types',
      options: [
        { value: 'HMV', label: 'HMV' },
        { value: 'Container', label: 'Container' },
        { value: 'Trailer', label: 'Trailer' },
        { value: 'Tanker', label: 'Tanker' },
        { value: 'LCV', label: 'LCV' }
      ]
    }
  ];

  const handleOpenDetail = (driver) => {
    setSelectedDriver(driver);
    setIsDrawerOpen(true);
  };

  const handleVerifyDocument = (docIndex) => {
    if (!selectedDriver) return;
    const updatedDocs = [...selectedDriver.documents];
    updatedDocs[docIndex] = {
      ...updatedDocs[docIndex],
      status: 'VERIFIED',
      verifiedAt: new Date().toLocaleString(),
      verifiedBy: 'Current User'
    };

    const isAllVerified = updatedDocs.every((d) => d.status === 'VERIFIED');
    const updatedDriver = {
      ...selectedDriver,
      documents: updatedDocs,
      verificationStatus: isAllVerified ? 'VERIFIED' : 'UNDER REVIEW'
    };

    setSelectedDriver(updatedDriver);
    setDrivers((prev) => prev.map((d) => (d.id === updatedDriver.id ? updatedDriver : d)));
  };

  const handleDeleteDriver = (driverId) => {
    if (window.confirm('Are you sure you want to delete this driver record?')) {
      setDrivers((prev) => prev.filter((d) => d.id !== driverId));
      if (selectedDriver?.id === driverId) {
        setIsDrawerOpen(false);
      }
    }
  };

  const handleExportCSV = () => {
    alert(`Exporting ${drivers.length} driver records to CSV...`);
  };

  // Table Column Definitions
  const columns = [
    {
      key: 'name',
      title: 'Driver Details',
      sortable: true,
      render: (_, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img
            src={row.avatarUrl}
            alt={row.name}
            style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #E2E8F0' }}
          />
          <div>
            <div style={{ fontWeight: 700, color: '#0F172A' }}>{row.name}</div>
            <div style={{ fontSize: '11px', color: '#64748B' }}>
              {row.age} yrs • {row.experienceYears} yrs exp
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'tmid',
      title: 'TMID',
      sortable: true,
      render: (val) => (
        <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#1E293B', fontSize: '12px' }}>
          {val}
        </span>
      )
    },
    {
      key: 'phone',
      title: 'Phone & Location',
      render: (_, row) => (
        <div>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>{row.phone}</div>
          <div style={{ fontSize: '11px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '3px' }}>
            <MapPin size={11} color="#94A3B8" /> {row.city}, {row.state}
          </div>
        </div>
      )
    },
    {
      key: 'licenseType',
      title: 'License Type',
      sortable: true,
      render: (val, row) => (
        <div>
          <span
            style={{
              padding: '2px 8px',
              borderRadius: '6px',
              backgroundColor: '#F1F5F9',
              color: '#334155',
              fontSize: '11px',
              fontWeight: 700
            }}
          >
            {val}
          </span>
          <div style={{ fontSize: '10px', color: '#94A3B8', fontFamily: 'monospace', marginTop: '2px' }}>
            {row.licenseNumber}
          </div>
        </div>
      )
    },
    {
      key: 'verificationStatus',
      title: 'Verification',
      sortable: true,
      render: (val) => <StatusBadge status={val} />
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (val) => <StatusBadge status={val} />
    },
    {
      key: 'registeredAt',
      title: 'Registered',
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

          {can('drivers', 'edit') && (
            <button
              title="Edit Driver"
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

          {can('drivers', 'delete') && (
            <button
              title="Delete Driver"
              onClick={() => handleDeleteDriver(row.id)}
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
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Operations</span>
            <span style={{ color: '#CBD5E1' }}>/</span>
            <span style={{ fontSize: '12px', color: '#1467FF', fontWeight: 600 }}>Drivers</span>
          </div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#0F172A' }}>
            Driver Management & Registry
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748B' }}>
            Manage commercial driver registrations, DL / KYC verifications, placements, and document workflows.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {can('drivers', 'export') && (
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

          {can('drivers', 'create') && (
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
              <Plus size={16} /> Add New Driver
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
          marginBottom: '24px'
        }}
      >
        <StatCard
          title="Total Registered Drivers"
          value={DRIVER_STATS.totalDrivers.toLocaleString()}
          change="+12%"
          isPositive={true}
          icon={Users}
          iconColor="#1467FF"
          iconBg="#EFF6FF"
        />

        <StatCard
          title="Verified Drivers"
          value={DRIVER_STATS.verifiedDrivers.toLocaleString()}
          change="76% of total"
          isPositive={true}
          icon={UserCheck}
          iconColor="#059669"
          iconBg="#ECFDF5"
        />

        <StatCard
          title="Pending Verification"
          value={DRIVER_STATS.pendingVerification.toLocaleString()}
          change="+5% vs last mo"
          isPositive={false}
          icon={Clock}
          iconColor="#D97706"
          iconBg="#FEF3C7"
        />

        <StatCard
          title="Placed Drivers"
          value={DRIVER_STATS.placedDrivers.toLocaleString()}
          change="+18%"
          isPositive={true}
          icon={Briefcase}
          iconColor="#9333EA"
          iconBg="#F3E8FF"
        />
      </div>

      {/* 3. Universal DataTable */}
      <DataTable
        columns={columns}
        data={drivers}
        searchPlaceholder="Search by name, TMID, license number, phone, state..."
        searchKeys={['name', 'tmid', 'phone', 'state', 'licenseNumber', 'city']}
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
        onRowClick={(driver) => handleOpenDetail(driver)}
      />

      {/* 4. Detail Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={selectedDriver ? `${selectedDriver.name} (${selectedDriver.tmid})` : 'Driver Profile'}
        subtitle="Driver Profile, Verification Documents & Placement Lifecycle"
        width="560px"
      >
        {selectedDriver && (
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
                src={selectedDriver.avatarUrl}
                alt={selectedDriver.name}
                style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #FFFFFF' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h4 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: '#0F172A' }}>
                    {selectedDriver.name}
                  </h4>
                  <StatusBadge status={selectedDriver.verificationStatus} />
                </div>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                  TMID: <strong>{selectedDriver.tmid}</strong> • {selectedDriver.licenseType} Driver
                </div>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                  {selectedDriver.city}, {selectedDriver.state} • {selectedDriver.experienceYears} Years Exp
                </div>
              </div>
            </div>

            {/* Quick Driver Attributes */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #F1F5F9' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>PHONE NUMBER</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>{selectedDriver.phone}</div>
              </div>
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #F1F5F9' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>LICENSE NUMBER</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', fontFamily: 'monospace', marginTop: '2px' }}>
                  {selectedDriver.licenseNumber}
                </div>
              </div>
            </div>

            {/* Verification Documents List */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <h5 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>
                  Verification Documents
                </h5>
                <span style={{ fontSize: '11px', color: '#64748B' }}>
                  {selectedDriver.documents.filter((d) => d.status === 'VERIFIED').length} of {selectedDriver.documents.length} Verified
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedDriver.documents.map((doc, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: '1px solid #E2E8F0',
                      backgroundColor: doc.status === 'VERIFIED' ? '#FFFFFF' : '#FFFBEB',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>
                        {doc.type}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                        {doc.status === 'VERIFIED' ? `Verified by ${doc.verifiedBy} on ${doc.verifiedAt}` : 'Pending review / Document upload'}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <StatusBadge status={doc.status} />
                      {can('drivers', 'approve') && doc.status !== 'VERIFIED' && (
                        <button
                          onClick={() => handleVerifyDocument(idx)}
                          style={{
                            backgroundColor: '#059669',
                            color: '#FFFFFF',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '4px 10px',
                            fontSize: '11px',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          Verify
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Matchmaking & Placement History */}
            <div>
              <h5 style={{ margin: '0 0 10px 0', fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>
                Matchmaking & Placement History
              </h5>
              {selectedDriver.jobHistory.length === 0 ? (
                <div style={{ padding: '16px', borderRadius: '10px', backgroundColor: '#F8FAFC', textAlign: 'center', color: '#94A3B8', fontSize: '12px' }}>
                  No past jobs or matchmaking records for this driver.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedDriver.jobHistory.map((job, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '12px',
                        borderRadius: '10px',
                        border: '1px solid #E2E8F0',
                        backgroundColor: '#FFFFFF'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontWeight: 700, fontSize: '13px', color: '#0F172A' }}>{job.jobTitle}</div>
                        <StatusBadge status={job.status} />
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                        Client: <strong>{job.client}</strong> • Route: {job.route}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Activity Timeline */}
            <div>
              <h5 style={{ margin: '0 0 10px 0', fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>
                Audit & Activity Timeline
              </h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedDriver.timeline.map((event, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '12px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#1467FF', marginTop: '5px' }} />
                    <div>
                      <strong style={{ color: '#0F172A' }}>{event.action}</strong> by {event.actor}
                      <div style={{ fontSize: '11px', color: '#94A3B8' }}>{event.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Drawer Action Footer */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px', borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
              <button
                onClick={() => alert(`Calling ${selectedDriver.phone}...`)}
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
                <Phone size={14} /> Call Driver
              </button>

              {can('drivers', 'edit') && (
                <button
                  onClick={() => alert('Assign driver to live matchmaking job modal')}
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
                  <Briefcase size={14} /> Assign to Job
                </button>
              )}
            </div>
          </div>
        )}
      </Drawer>

      {/* 5. Add New Driver Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Register New Driver"
        subtitle="Add driver profile, contact details, and initial license classification."
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target;
            const newDriver = {
              id: `drv-${Date.now()}`,
              tmid: `TM2609${Math.floor(100 + Math.random() * 900)}`,
              name: form.name.value,
              age: parseInt(form.age.value, 10) || 30,
              avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
              phone: form.phone.value,
              state: form.state.value,
              city: form.city.value,
              licenseType: form.licenseType.value,
              licenseNumber: form.licenseNumber.value,
              experienceYears: parseInt(form.experienceYears.value, 10) || 5,
              status: 'ACTIVE',
              verificationStatus: 'UNDER REVIEW',
              registeredAt: new Date().toISOString().split('T')[0],
              documents: [
                { type: 'Driving License', status: 'UNDER REVIEW', verifiedAt: '-', verifiedBy: '-' },
                { type: 'Aadhaar Card', status: 'UNDER REVIEW', verifiedAt: '-', verifiedBy: '-' }
              ],
              jobHistory: [],
              timeline: [{ time: 'Just now', action: 'Driver Registered', actor: 'Current User' }]
            };

            setDrivers([newDriver, ...drivers]);
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
              placeholder="e.g. Ramesh Yadav"
              style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Phone Number *
              </label>
              <input
                name="phone"
                required
                placeholder="+91 98765 43210"
                style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Age
              </label>
              <input
                name="age"
                type="number"
                defaultValue={30}
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
                placeholder="e.g. Haryana"
                style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                City
              </label>
              <input
                name="city"
                placeholder="e.g. Karnal"
                style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                License Type *
              </label>
              <select
                name="licenseType"
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', backgroundColor: '#FFF' }}
              >
                <option value="HMV">HMV</option>
                <option value="Container">Container</option>
                <option value="Trailer">Trailer</option>
                <option value="Tanker">Tanker</option>
                <option value="LCV">LCV</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Experience (Years)
              </label>
              <input
                name="experienceYears"
                type="number"
                defaultValue={5}
                style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
              Driving License Number *
            </label>
            <input
              name="licenseNumber"
              required
              placeholder="e.g. HR-0520200012345"
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
              Register Driver
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
