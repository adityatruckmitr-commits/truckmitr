import React, { useState } from 'react';
import { usePermissions } from '../../context/PermissionContext';
import { StatCard } from '../../components/common/StatCard';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Drawer } from '../../components/common/Drawer';
import { Modal } from '../../components/common/Modal';
import {
  Truck,
  Building2,
  CheckCircle2,
  Clock,
  Briefcase,
  Plus,
  Download,
  Eye,
  Edit2,
  Trash2,
  ShieldCheck,
  FileText,
  Phone,
  Mail,
  MapPin,
  Route,
  Users
} from 'lucide-react';
import { INITIAL_TRANSPORTERS_DATA, TRANSPORTER_STATS } from '../../services/mock/mockTransporters';

export const TransportersPage = () => {
  const { can } = usePermissions();

  const [transporters, setTransporters] = useState(INITIAL_TRANSPORTERS_DATA);
  const [selectedTransporter, setSelectedTransporter] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  // Filters State
  const [filtersState, setFiltersState] = useState({
    status: 'ALL',
    verificationStatus: 'ALL',
    fleetSizeRange: 'ALL'
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
      key: 'fleetSizeRange',
      label: 'All Fleet Sizes',
      options: [
        { value: 'SMALL', label: '1 - 10 Trucks' },
        { value: 'MEDIUM', label: '11 - 30 Trucks' },
        { value: 'LARGE', label: '30+ Trucks' }
      ]
    }
  ];

  // Custom filter matcher for fleet size range
  const filteredData = transporters.filter((tr) => {
    if (filtersState.fleetSizeRange !== 'ALL') {
      if (filtersState.fleetSizeRange === 'SMALL' && tr.fleetSize > 10) return false;
      if (filtersState.fleetSizeRange === 'MEDIUM' && (tr.fleetSize <= 10 || tr.fleetSize > 30)) return false;
      if (filtersState.fleetSizeRange === 'LARGE' && tr.fleetSize <= 30) return false;
    }
    return true;
  });

  const handleOpenDetail = (transporter) => {
    setSelectedTransporter(transporter);
    setIsDrawerOpen(true);
  };

  const handleVerifyDocument = (docIndex) => {
    if (!selectedTransporter) return;
    const updatedDocs = [...selectedTransporter.documents];
    updatedDocs[docIndex] = {
      ...updatedDocs[docIndex],
      status: 'VERIFIED',
      verifiedAt: new Date().toLocaleString(),
      verifiedBy: 'Current User'
    };

    const isAllVerified = updatedDocs.every((d) => d.status === 'VERIFIED');
    const updatedTransporter = {
      ...selectedTransporter,
      documents: updatedDocs,
      verificationStatus: isAllVerified ? 'VERIFIED' : 'UNDER REVIEW'
    };

    setSelectedTransporter(updatedTransporter);
    setTransporters((prev) => prev.map((t) => (t.id === updatedTransporter.id ? updatedTransporter : t)));
  };

  const handleDeleteTransporter = (transporterId) => {
    if (window.confirm('Are you sure you want to delete this transporter account?')) {
      setTransporters((prev) => prev.filter((t) => t.id !== transporterId));
      if (selectedTransporter?.id === transporterId) {
        setIsDrawerOpen(false);
      }
    }
  };

  const handleExportCSV = () => {
    alert(`Exporting ${transporters.length} transporter accounts to CSV...`);
  };

  // Table Column Definitions
  const columns = [
    {
      key: 'companyName',
      title: 'Company & Fleet',
      sortable: true,
      render: (_, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: '#EFF6FF',
              border: '1px solid #DBEAFE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1467FF',
              flexShrink: 0
            }}
          >
            <Truck size={20} />
          </div>
          <div>
            <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '13px' }}>{row.companyName}</div>
            <div style={{ fontSize: '11px', color: '#64748B' }}>
              {row.fleetSize} Trucks • {row.fleetType}
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'transporterId',
      title: 'Transporter ID',
      sortable: true,
      render: (val) => (
        <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#1E293B', fontSize: '12px' }}>
          {val}
        </span>
      )
    },
    {
      key: 'contactPerson',
      title: 'Key Contact',
      render: (_, row) => (
        <div>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>{row.contactPerson}</div>
          <div style={{ fontSize: '11px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '3px' }}>
            <Phone size={11} color="#94A3B8" /> {row.phone}
          </div>
        </div>
      )
    },
    {
      key: 'city',
      title: 'Location',
      sortable: true,
      render: (_, row) => (
        <div style={{ fontSize: '12px', color: '#334155', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <MapPin size={12} color="#94A3B8" /> {row.city}, {row.state}
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
      key: 'registrationDate',
      title: 'Registered On',
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

          {can('transporters', 'edit') && (
            <button
              title="Edit Transporter"
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

          {can('transporters', 'delete') && (
            <button
              title="Delete Transporter"
              onClick={() => handleDeleteTransporter(row.id)}
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
            <span style={{ fontSize: '12px', color: '#1467FF', fontWeight: 600 }}>Transporters</span>
          </div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#0F172A' }}>
            Transporter & Fleet Registry
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748B' }}>
            Manage fleet owners, logistics enterprises, GST verifications, active job postings, and driver placements.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {can('transporters', 'export') && (
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

          {can('transporters', 'create') && (
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
              <Plus size={16} /> Add New Transporter
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
          title="Total Registered Transporters"
          value={TRANSPORTER_STATS.totalTransporters.toLocaleString()}
          change="+8%"
          isPositive={true}
          icon={Building2}
          iconColor="#1467FF"
          iconBg="#EFF6FF"
        />

        <StatCard
          title="Verified Fleets"
          value={TRANSPORTER_STATS.verifiedTransporters.toLocaleString()}
          change="79% of total"
          isPositive={true}
          icon={CheckCircle2}
          iconColor="#059669"
          iconBg="#ECFDF5"
        />

        <StatCard
          title="Total Commercial Fleet"
          value={TRANSPORTER_STATS.totalFleetCapacity.toLocaleString()}
          change="Trucks Managed"
          isPositive={true}
          icon={Truck}
          iconColor="#8B5CF6"
          iconBg="#F3E8FF"
        />

        <StatCard
          title="Active Job Openings"
          value={TRANSPORTER_STATS.activeJobs.toLocaleString()}
          change="+14% this month"
          isPositive={true}
          icon={Briefcase}
          iconColor="#F59E0B"
          iconBg="#FEF3C7"
        />
      </div>

      {/* 3. Universal DataTable */}
      <DataTable
        columns={columns}
        data={filteredData}
        searchPlaceholder="Search by company name, ID, contact person, phone, state, GST..."
        searchKeys={['companyName', 'transporterId', 'contactPerson', 'phone', 'state', 'city', 'gstNumber']}
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
        onRowClick={(transporter) => handleOpenDetail(transporter)}
      />

      {/* 4. Detail Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={selectedTransporter ? `${selectedTransporter.companyName}` : 'Transporter Profile'}
        subtitle="Transporter Fleet Profile, Active Job Postings & Placements"
        width="600px"
      >
        {selectedTransporter && (
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
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '12px',
                  backgroundColor: '#EFF6FF',
                  border: '1px solid #BFDBFE',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#1467FF',
                  flexShrink: 0
                }}
              >
                <Truck size={28} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>
                    {selectedTransporter.companyName}
                  </h4>
                  <StatusBadge status={selectedTransporter.verificationStatus} />
                </div>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                  ID: <strong>{selectedTransporter.transporterId}</strong> • {selectedTransporter.city}, {selectedTransporter.state}
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px', fontFamily: 'monospace' }}>
                  GST: {selectedTransporter.gstNumber} • PAN: {selectedTransporter.panNumber}
                </div>
              </div>
            </div>

            {/* Fleet Summary KPI Strip */}
            <div>
              <h5 style={{ margin: '0 0 8px 0', fontSize: '13px', fontWeight: 700, color: '#334155' }}>
                Fleet Capacity Breakdown
              </h5>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                <div style={{ padding: '10px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #F1F5F9', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>Total Fleet</div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>{selectedTransporter.fleetSummary.total}</div>
                </div>
                <div style={{ padding: '10px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #F1F5F9', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: '#059669' }}>On Road</div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#059669', marginTop: '2px' }}>{selectedTransporter.fleetSummary.activeOnRoad}</div>
                </div>
                <div style={{ padding: '10px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #F1F5F9', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: '#D97706' }}>Maintenance</div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#D97706', marginTop: '2px' }}>{selectedTransporter.fleetSummary.underMaintenance}</div>
                </div>
                <div style={{ padding: '10px', borderRadius: '10px', backgroundColor: '#FEF2F2', border: '1px solid #FEE2E2', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: '#DC2626' }}>Driver Deficit</div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#DC2626', marginTop: '2px' }}>{selectedTransporter.fleetSummary.driverDeficit}</div>
                </div>
              </div>
            </div>

            {/* Key Contact & Communication */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #F1F5F9' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>KEY CONTACT PERSON</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>{selectedTransporter.contactPerson}</div>
                <div style={{ fontSize: '12px', color: '#475569', marginTop: '2px' }}>{selectedTransporter.phone}</div>
              </div>
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #F1F5F9' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>EMAIL ADDRESS</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', marginTop: '2px', wordBreak: 'break-all' }}>
                  {selectedTransporter.email}
                </div>
              </div>
            </div>

            {/* Primary Routes */}
            <div>
              <h5 style={{ margin: '0 0 8px 0', fontSize: '13px', fontWeight: 700, color: '#334155' }}>
                Primary Operating Routes
              </h5>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {selectedTransporter.primaryRoutes.map((route, idx) => (
                  <span
                    key={idx}
                    style={{
                      backgroundColor: '#EFF6FF',
                      color: '#1E40AF',
                      border: '1px solid #DBEAFE',
                      borderRadius: '8px',
                      padding: '4px 10px',
                      fontSize: '12px',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Route size={12} color="#3B82F6" /> {route}
                  </span>
                ))}
              </div>
            </div>

            {/* Verification Documents List */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <h5 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>
                  Compliance & Verification Documents
                </h5>
                <span style={{ fontSize: '11px', color: '#64748B' }}>
                  {selectedTransporter.documents.filter((d) => d.status === 'VERIFIED').length} of {selectedTransporter.documents.length} Verified
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedTransporter.documents.map((doc, idx) => (
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
                      {can('transporters', 'approve') && doc.status !== 'VERIFIED' && (
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

            {/* Active Job Postings */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h5 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>
                  Active Job Openings ({selectedTransporter.activeJobPostings.length})
                </h5>
              </div>

              {selectedTransporter.activeJobPostings.length === 0 ? (
                <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#F8FAFC', textAlign: 'center', color: '#94A3B8', fontSize: '12px' }}>
                  No active job postings from this transporter.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedTransporter.activeJobPostings.map((job) => (
                    <div
                      key={job.id}
                      style={{
                        padding: '12px',
                        borderRadius: '10px',
                        border: '1px solid #E2E8F0',
                        backgroundColor: '#FFFFFF',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '13px', color: '#0F172A' }}>
                          {job.title} ({job.id})
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                          Route: {job.route} • {job.driversPlaced}/{job.driversNeeded} Placed
                        </div>
                      </div>
                      <StatusBadge status={job.status} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Driver Matches in Progress */}
            <div>
              <h5 style={{ margin: '0 0 10px 0', fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>
                Driver Matches in Progress
              </h5>
              {selectedTransporter.driverMatches.length === 0 ? (
                <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#F8FAFC', textAlign: 'center', color: '#94A3B8', fontSize: '12px' }}>
                  No live candidate matches in progress.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedTransporter.driverMatches.map((m, idx) => (
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
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>
                          {m.driverName} ({m.tmid})
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748B' }}>
                          Role: {m.jobTitle} • Matched {m.matchedOn}
                        </div>
                      </div>
                      <StatusBadge status={m.status} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Activity & Audit Timeline */}
            <div>
              <h5 style={{ margin: '0 0 10px 0', fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>
                Account Activity & Audit Timeline
              </h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedTransporter.timeline.map((event, idx) => (
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
                onClick={() => alert(`Calling ${selectedTransporter.contactPerson} at ${selectedTransporter.phone}...`)}
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
                <Phone size={14} /> Call Transporter
              </button>

              {can('transporters', 'edit') && (
                <button
                  onClick={() => alert('Open Create Job Posting modal for this transporter')}
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
                  <Plus size={14} /> Post New Job
                </button>
              )}
            </div>
          </div>
        )}
      </Drawer>

      {/* 5. Add New Transporter Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Register New Transporter / Fleet"
        subtitle="Onboard a fleet owner, business entity, and initial capacity profile."
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target;
            const newTransporter = {
              id: `tr-${Date.now()}`,
              transporterId: `TR-10${Math.floor(10 + Math.random() * 90)}`,
              companyName: form.companyName.value,
              contactPerson: form.contactPerson.value,
              phone: form.phone.value,
              email: form.email.value,
              city: form.city.value,
              state: form.state.value,
              fleetSize: parseInt(form.fleetSize.value, 10) || 5,
              fleetType: form.fleetType.value,
              primaryRoutes: form.routes.value ? form.routes.value.split(',').map((s) => s.trim()) : ['Regional Transport'],
              gstNumber: form.gstNumber.value,
              panNumber: form.panNumber.value,
              status: 'ACTIVE',
              verificationStatus: 'UNDER REVIEW',
              registrationDate: new Date().toISOString().split('T')[0],
              fleetSummary: {
                total: parseInt(form.fleetSize.value, 10) || 5,
                activeOnRoad: parseInt(form.fleetSize.value, 10) || 5,
                underMaintenance: 0,
                driverDeficit: 1
              },
              documents: [
                { type: 'GST Registration Certificate', status: 'UNDER REVIEW', verifiedAt: '-', verifiedBy: '-' },
                { type: 'Company PAN Card', status: 'UNDER REVIEW', verifiedAt: '-', verifiedBy: '-' }
              ],
              activeJobPostings: [],
              driverMatches: [],
              timeline: [{ time: 'Just now', action: 'Transporter Registered', actor: 'Current User' }]
            };

            setTransporters([newTransporter, ...transporters]);
            setIsAddModalOpen(false);
          }}
          style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
        >
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
              Company / Fleet Name *
            </label>
            <input
              name="companyName"
              required
              placeholder="e.g. Apex Roadlines Pvt Ltd"
              style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Key Contact Person *
              </label>
              <input
                name="contactPerson"
                required
                placeholder="e.g. Rajesh Singhal"
                style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>
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
                placeholder="e.g. Mumbai"
                style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Total Fleet Size *
              </label>
              <input
                name="fleetSize"
                type="number"
                defaultValue={10}
                required
                style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Fleet Types
              </label>
              <input
                name="fleetType"
                placeholder="e.g. Container, Multi-Axle"
                defaultValue="Container, Trailer"
                style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                GST Number *
              </label>
              <input
                name="gstNumber"
                required
                placeholder="e.g. 27AABCS1234F1Z5"
                style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Company PAN *
              </label>
              <input
                name="panNumber"
                required
                placeholder="e.g. AABCS1234F"
                style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
              Email Address
            </label>
            <input
              name="email"
              type="email"
              placeholder="contact@company.com"
              style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
              Primary Operating Routes (comma separated)
            </label>
            <input
              name="routes"
              placeholder="Delhi → Mumbai, Jaipur → Ahmedabad"
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
              Register Transporter
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
