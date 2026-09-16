import React, { useState } from 'react';
import { Truck, Shield, PlusCircle, Trash2, CheckCircle2, User, Search, Download } from 'lucide-react';
import { AdminLayout } from './AdminLayout';
import { Table } from '../../components/common/Table';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { useToast } from '../../context/ToastContext';

export const TruckListingsPage = () => {
  const { showToast } = useToast();
  const trucks = [
    { id: 1, model: 'Tata Prima 5530.S (6x4)', vehicleType: 'Trailer (Multi-Axle)', gvw: '55 Tons', owner: 'Sharma Freight Lines', rcNumber: 'HR55AN1024', status: 'Active' },
    { id: 2, model: 'Ashok Leyland 4220 HG', vehicleType: 'Open Body (14 Wheeler)', gvw: '42 Tons', owner: 'Bhardwaj Roadways', rcNumber: 'PB10CZ4499', status: 'Active' },
    { id: 3, model: 'BharatBenz 3528C Mining Tipper', vehicleType: 'Tipper / Dumper', gvw: '35 Tons', owner: 'North-Zone Infra', rcNumber: 'RJ14GB7721', status: 'Active' },
  ];

  const columns = [
    { title: 'Commercial Vehicle Model', key: 'model', render: (val) => <strong style={{ color: '#0D6EFD' }}>🚚 {val}</strong> },
    { title: 'Vehicle Category', key: 'vehicleType' },
    { title: 'GVW Tonnage', key: 'gvw' },
    { title: 'Fleet Owner', key: 'owner' },
    { title: 'Registered RC Number', key: 'rcNumber', render: (val) => <span style={{ color: '#10B981', fontWeight: 600 }}>{val}</span> },
    { title: 'Status', key: 'status', render: (val) => <span style={{ backgroundColor: '#D1FAE5', color: '#065F46', padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>{val}</span> },
  ];

  return (
    <AdminLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: 0 }}>Truck Listings & Fleet Registry</h1>
            <p style={{ fontSize: '0.85rem', color: '#6B7280', margin: '4px 0 0' }}>Comprehensive database of verified commercial trucks, trailers, and tippers</p>
          </div>
          <Button variant="primary" size="md" icon={PlusCircle} onClick={() => showToast('Open Add Truck modal', 'info')}>
            + Add New Truck
          </Button>
        </div>
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB' }}>
          <Table columns={columns} data={trucks} />
        </div>
      </div>
    </AdminLayout>
  );
};

export const DriverManagementAdminPage = () => {
  const { showToast } = useToast();
  const drivers = [
    { id: 101, name: 'Rajesh Kumar Verma', phone: '98765-43210', experience: '8 Years', licenseType: 'HCV Trailer', kycStatus: '100% Verified', hiringStatus: 'Placed @ All-India Freight' },
    { id: 102, name: 'Gurpreet Singh', phone: '98112-23344', experience: '12 Years', licenseType: 'Hazardous Chemical Tanker', kycStatus: '100% Verified', hiringStatus: 'Placed @ GreenLine' },
    { id: 103, name: 'Santosh Kumar Pal', phone: '97234-55667', experience: '6 Years', licenseType: 'Open Body Heavy Truck', kycStatus: 'DL Verified', hiringStatus: 'Available (Shortlisted)' },
  ];

  const columns = [
    { title: 'Driver Name', key: 'name', render: (val, row) => <div><strong style={{ color: '#111827' }}>{val}</strong><div style={{ fontSize: '0.8rem', color: '#6B7280' }}>ID: #DR-{row.id} • Exp: {row.experience}</div></div> },
    { title: 'Mobile Number', key: 'phone', render: (val) => <span style={{ color: '#0D6EFD' }}>📞 {val}</span> },
    { title: 'License Category', key: 'licenseType' },
    { title: 'Government KYC', key: 'kycStatus', render: (val) => <span style={{ backgroundColor: '#D1FAE5', color: '#065F46', padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>✓ {val}</span> },
    { title: 'Placement Status', key: 'hiringStatus', render: (val) => <strong style={{ color: val.includes('Placed') ? '#10B981' : '#F59E0B' }}>{val}</strong> },
    {
      title: 'Action',
      key: 'actions',
      render: (_, row) => (
        <Button variant="secondary" size="sm" onClick={() => showToast(`Driver dossier downloaded for ${row.name}`, 'info')}>
          Full Dossier
        </Button>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: 0 }}>Driver Management & Verification Master</h1>
            <p style={{ fontSize: '0.85rem', color: '#6B7280', margin: '4px 0 0' }}>52,000+ driver profiles, verification audits and placement tracking</p>
          </div>
          <Button variant="secondary" size="md" icon={Download} onClick={() => showToast('Exporting Driver master database to Excel...', 'success')}>
            Export Driver List
          </Button>
        </div>
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB' }}>
          <Table columns={columns} data={drivers} />
        </div>
      </div>
    </AdminLayout>
  );
};
