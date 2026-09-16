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
  Monitor,
  Laptop,
  Smartphone,
  Truck,
  Plus,
  Download,
  Eye,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
  Wrench,
  TrendingDown,
  Building2,
  UserCheck
} from 'lucide-react';
import {
  ASSET_TYPES,
  INITIAL_ASSETS_DATA,
  ASSET_STATS
} from '../../services/mock/mockAssets';

export const AssetsPage = () => {
  const { can, getScope } = usePermissions();
  const { currentUser } = useAuth();

  const [assets, setAssets] = useState(INITIAL_ASSETS_DATA);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  // Check department scope
  const assetScope = getScope('assets');
  const userDeptId = currentUser?.departmentId || 'dept-ops';

  const [filtersState, setFiltersState] = useState({
    departmentId: assetScope === 'DEPARTMENT' ? userDeptId : 'ALL',
    type: 'ALL',
    maintenanceStatus: 'ALL'
  });

  const filterConfigs = [
    {
      key: 'departmentId',
      label: 'All Departments',
      options: DEPARTMENTS.map((d) => ({ value: d.id, label: d.name }))
    },
    {
      key: 'type',
      label: 'All Asset Types',
      options: ASSET_TYPES.map((t) => ({ value: t.id, label: t.label }))
    },
    {
      key: 'maintenanceStatus',
      label: 'All Maintenance Status',
      options: [
        { value: 'OPERATIONAL', label: 'Operational & Active' },
        { value: 'UNDER_MAINTENANCE', label: 'Under Maintenance' },
        { value: 'RETIRED', label: 'Retired' }
      ]
    }
  ];

  // Helper to calculate depreciation value based on purchase date & rate
  const calculateDepreciation = (asset) => {
    const purchaseYear = new Date(asset.purchaseDate).getFullYear();
    const currentYear = 2026;
    const yearsInUse = Math.max(0.5, currentYear - purchaseYear + 0.5);
    const totalDepreciationPercent = Math.min(80, yearsInUse * (asset.annualDepreciationRate || 20));
    const depreciationAmount = Math.round((asset.purchaseCost * totalDepreciationPercent) / 100);
    const currentBookValue = Math.max(0, asset.purchaseCost - depreciationAmount);

    return {
      yearsInUse: yearsInUse.toFixed(1),
      depreciationPercent: `${Math.round(totalDepreciationPercent)}%`,
      depreciationAmount,
      currentBookValue
    };
  };

  const handleOpenDetail = (asset) => {
    setSelectedAsset(asset);
    setIsDrawerOpen(true);
  };

  const handleDeleteAsset = (assetId) => {
    if (window.confirm('Are you sure you want to retire and archive this hardware asset?')) {
      setAssets((prev) => prev.filter((a) => a.id !== assetId));
      if (selectedAsset?.id === assetId) {
        setIsDrawerOpen(false);
      }
    }
  };

  const handleExportCSV = () => {
    alert(`Exporting asset registry (${assets.length} hardware units) to CSV...`);
  };

  // Table Columns
  const columns = [
    {
      key: 'name',
      title: 'Asset Name & Tag',
      sortable: true,
      render: (_, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: '#EFF6FF',
              color: '#1467FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <Monitor size={18} />
          </div>
          <div>
            <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '13px' }}>{row.name}</div>
            <div style={{ fontSize: '11px', color: '#64748B', fontFamily: 'monospace' }}>
              Tag: {row.assetTag} • {row.typeName}
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'assignedTo',
      title: 'Assigned To',
      sortable: true,
      render: (val) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img
            src={val.avatarUrl}
            alt={val.name}
            style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>{val.name}</div>
            <div style={{ fontSize: '10px', color: '#64748B' }}>{val.employeeId}</div>
          </div>
        </div>
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
            padding: '2px 8px',
            borderRadius: '6px'
          }}
        >
          {val}
        </span>
      )
    },
    {
      key: 'condition',
      title: 'Condition',
      sortable: true,
      render: (val) => (
        <span
          style={{
            fontSize: '11px',
            fontWeight: 800,
            padding: '2px 8px',
            borderRadius: '6px',
            backgroundColor: val === 'EXCELLENT' ? '#ECFDF5' : val === 'GOOD' ? '#EFF6FF' : '#FEF3C7',
            color: val === 'EXCELLENT' ? '#059669' : val === 'GOOD' ? '#2563EB' : '#D97706'
          }}
        >
          {val}
        </span>
      )
    },
    {
      key: 'maintenanceStatus',
      title: 'Status',
      sortable: true,
      render: (val) => <StatusBadge status={val} />
    },
    {
      key: 'purchaseDate',
      title: 'Purchase Date',
      sortable: true,
      render: (val) => <span style={{ fontSize: '12px', color: '#64748B' }}>{val}</span>
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} onClick={(e) => e.stopPropagation()}>
          <button
            title="View Asset Details"
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

          {can('assets', 'edit') && (
            <button
              title="Reassign / Edit Asset"
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

          {can('assets', 'delete') && (
            <button
              title="Retire Asset"
              onClick={() => handleDeleteAsset(row.id)}
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
            <span style={{ fontSize: '12px', color: '#1467FF', fontWeight: 600 }}>Assets</span>
          </div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#0F172A' }}>
            Corporate Hardware & Asset Registry
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748B' }}>
            Track laptops, telecaller SIMs, inspection vehicles, maintenance logs, and asset depreciation.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {can('assets', 'export') && (
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

          {can('assets', 'create') && (
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
              <Plus size={16} /> Add New Asset
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
          title="Total Hardware Inventory"
          value={ASSET_STATS.totalAssets.toString()}
          change="100% Tracked"
          isPositive={true}
          icon={Monitor}
          iconColor="#1467FF"
          iconBg="#EFF6FF"
        />

        <StatCard
          title="Assigned to Staff"
          value={ASSET_STATS.assignedAssets.toString()}
          change="Active in Deployment"
          isPositive={true}
          icon={UserCheck}
          iconColor="#059669"
          iconBg="#ECFDF5"
        />

        <StatCard
          title="Under Maintenance"
          value={ASSET_STATS.underMaintenance.toString()}
          change="Scheduled Repairs"
          isPositive={false}
          icon={Wrench}
          iconColor="#D97706"
          iconBg="#FEF3C7"
        />

        <StatCard
          title="Estimated Book Value"
          value={`₹${(ASSET_STATS.totalBookValue / 1000).toFixed(0)}k`}
          change="After Depreciation"
          isPositive={true}
          icon={TrendingDown}
          iconColor="#8B5CF6"
          iconBg="#F3E8FF"
        />
      </div>

      {/* 3. Universal DataTable */}
      <DataTable
        columns={columns}
        data={assets}
        searchPlaceholder="Search by asset name, tag, serial number, assigned employee..."
        searchKeys={['name', 'assetTag', 'serialNumber', 'typeName', 'departmentName']}
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
        onRowClick={(asset) => handleOpenDetail(asset)}
      />

      {/* 4. Detail Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={selectedAsset ? `${selectedAsset.name}` : 'Asset Details'}
        subtitle="Asset Lifecycle, Depreciation Estimate & Service Logs"
        width="600px"
      >
        {selectedAsset && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Header Asset Card */}
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
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  backgroundColor: '#EFF6FF',
                  color: '#1467FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Monitor size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>
                    {selectedAsset.name}
                  </h4>
                  <StatusBadge status={selectedAsset.maintenanceStatus} />
                </div>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                  Tag: <strong>{selectedAsset.assetTag}</strong> • Serial: {selectedAsset.serialNumber}
                </div>
                <div style={{ fontSize: '11px', color: '#1467FF', fontWeight: 600, marginTop: '2px' }}>
                  {selectedAsset.typeName} • {selectedAsset.departmentName}
                </div>
              </div>
            </div>

            {/* Depreciation Estimate Banner (Plausible calculation based on purchase date + rate) */}
            {(() => {
              const dep = calculateDepreciation(selectedAsset);

              return (
                <div
                  style={{
                    backgroundColor: '#F8FAFC',
                    borderRadius: '12px',
                    border: '1px solid #E2E8F0',
                    padding: '16px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <TrendingDown size={16} color="#8B5CF6" /> Straight-Line Depreciation Estimate
                    </div>
                    <span style={{ fontSize: '11px', color: '#64748B' }}>
                      {dep.yearsInUse} Years in Service
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', textAlign: 'center' }}>
                    <div style={{ padding: '8px', backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #F1F5F9' }}>
                      <div style={{ fontSize: '10px', color: '#64748B' }}>Original Cost</div>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>
                        ₹{selectedAsset.purchaseCost.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div style={{ padding: '8px', backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #F1F5F9' }}>
                      <div style={{ fontSize: '10px', color: '#64748B' }}>Annual Rate</div>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: '#3B82F6', marginTop: '2px' }}>
                        {selectedAsset.annualDepreciationRate}%/yr
                      </div>
                    </div>
                    <div style={{ padding: '8px', backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #F1F5F9' }}>
                      <div style={{ fontSize: '10px', color: '#DC2626' }}>Total Depreciated</div>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: '#DC2626', marginTop: '2px' }}>
                        -₹{dep.depreciationAmount.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div style={{ padding: '8px', backgroundColor: '#ECFDF5', borderRadius: '8px', border: '1px solid #A7F3D0' }}>
                      <div style={{ fontSize: '10px', color: '#059669' }}>Est. Book Value</div>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: '#059669', marginTop: '2px' }}>
                        ₹{dep.currentBookValue.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Current Custodian & Procurement */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #F1F5F9' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>CURRENT CUSTODIAN</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>
                  {selectedAsset.assignedTo.name} ({selectedAsset.assignedTo.employeeId})
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                  Condition: <strong>{selectedAsset.condition}</strong>
                </div>
              </div>
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #F1F5F9' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>VENDOR & PROCURED DATE</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>
                  {selectedAsset.vendor}
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                  Date: {selectedAsset.purchaseDate}
                </div>
              </div>
            </div>

            {/* Assignment History Log */}
            <div>
              <h5 style={{ margin: '0 0 10px 0', fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>
                Assignment & Custody History
              </h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedAsset.assignmentHistory.map((assign, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '8px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '12px', color: '#0F172A' }}>
                        {assign.employeeName} ({assign.employeeId})
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>{assign.notes}</div>
                    </div>
                    <span style={{ fontSize: '11px', color: '#1467FF', fontWeight: 600 }}>
                      {assign.from} → {assign.to}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Maintenance & Repair Log */}
            <div>
              <h5 style={{ margin: '0 0 10px 0', fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>
                Maintenance & Service History
              </h5>
              {selectedAsset.maintenanceLog.length === 0 ? (
                <div style={{ padding: '14px', backgroundColor: '#F8FAFC', borderRadius: '8px', textAlign: 'center', color: '#94A3B8', fontSize: '12px' }}>
                  No maintenance tickets or repair logs recorded for this asset.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedAsset.maintenanceLog.map((log, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '8px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E2E8F0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '12px', color: '#0F172A' }}>{log.type}</div>
                        <div style={{ fontSize: '11px', color: '#64748B' }}>
                          Vendor: {log.vendor} • Cost: ₹{log.cost.toLocaleString('en-IN')}
                        </div>
                      </div>
                      <span style={{ fontSize: '11px', color: '#64748B' }}>{log.date}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </Drawer>

      {/* 5. Add New Asset Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Provision New Hardware Asset"
        subtitle="Register corporate equipment, tag number, and initial custodian."
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target;
            const typeObj = ASSET_TYPES.find((t) => t.id === form.type.value) || ASSET_TYPES[0];
            const deptObj = DEPARTMENTS.find((d) => d.id === form.departmentId.value) || DEPARTMENTS[1];

            const newAsset = {
              id: `ast-${Date.now()}`,
              assetTag: `TM-AST-${Math.floor(100 + Math.random() * 900)}`,
              name: form.name.value,
              type: form.type.value,
              typeName: typeObj.label,
              serialNumber: form.serialNumber.value,
              assignedTo: {
                name: form.assignedName.value,
                employeeId: form.assignedEmployeeId.value || 'TMEMP005',
                avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80'
              },
              departmentId: deptObj.id,
              departmentName: deptObj.name,
              purchaseDate: form.purchaseDate.value || new Date().toISOString().split('T')[0],
              purchaseCost: parseFloat(form.purchaseCost.value) || 25000,
              annualDepreciationRate: 20,
              condition: 'EXCELLENT',
              maintenanceStatus: 'OPERATIONAL',
              lastServiceDate: new Date().toISOString().split('T')[0],
              vendor: form.vendor.value || 'Authorized Commercial Vendor',
              assignmentHistory: [
                {
                  employeeName: form.assignedName.value,
                  employeeId: form.assignedEmployeeId.value || 'TMEMP005',
                  from: new Date().toISOString().split('T')[0],
                  to: 'Present',
                  notes: 'Initial provisioning assignment'
                }
              ],
              maintenanceLog: []
            };

            setAssets([newAsset, ...assets]);
            setIsAddModalOpen(false);
          }}
          style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
        >
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
              Asset Name & Model *
            </label>
            <input
              name="name"
              required
              placeholder="e.g. Lenovo ThinkPad E14"
              style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Asset Type *
              </label>
              <select
                name="type"
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', backgroundColor: '#FFF' }}
              >
                {ASSET_TYPES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Serial Number *
              </label>
              <input
                name="serialNumber"
                required
                placeholder="e.g. SN-9988-1240"
                style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>
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
                Assigned Employee Name *
              </label>
              <input
                name="assignedName"
                required
                placeholder="e.g. Sonam Sharma"
                style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Purchase Cost (₹) *
              </label>
              <input
                name="purchaseCost"
                type="number"
                required
                defaultValue={45000}
                style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Purchase Date
              </label>
              <input
                name="purchaseDate"
                type="date"
                defaultValue="2026-09-01"
                style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
              Vendor / Dealership
            </label>
            <input
              name="vendor"
              placeholder="e.g. Lenovo Commercial India"
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
              Register Asset
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
