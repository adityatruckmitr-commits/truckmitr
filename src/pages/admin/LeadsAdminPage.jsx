import React, { useState } from 'react';
import { Phone, Truck, CheckCircle2, Download, Search, PlusCircle } from 'lucide-react';
import { AdminLayout } from './AdminLayout';
import { Table } from '../../components/common/Table';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';

export const LeadsAdminPage = () => {
  const { showToast } = useToast();
  const leads = [
    { id: 1, phone: '98765-43210', callerName: 'Rajesh Yadav', type: 'Toll-Free Helpline Lead', status: 'Converted to Placed Driver', time: '10:15 AM' },
    { id: 2, phone: '98112-99887', callerName: 'Harish Mehta (Apex Fleet)', type: 'Transporter Inquiry', status: 'Assigned to Telecaller Anjali', time: '09:40 AM' },
  ];

  const columns = [
    { title: 'Caller Name', key: 'callerName', render: (val) => <strong style={{ color: '#111827' }}>{val}</strong> },
    { title: 'Phone Number', key: 'phone', render: (val) => <span style={{ color: '#0D6EFD' }}>📞 {val}</span> },
    { title: 'Inbound Channel', key: 'type' },
    { title: 'Lead Status', key: 'status', render: (val) => <span style={{ backgroundColor: '#D1FAE5', color: '#065F46', padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>{val}</span> },
    { title: 'Call Timestamp', key: 'time' },
  ];

  return (
    <AdminLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: 0 }}>Toll-Free & Inbound Calling Leads</h1>
          <p style={{ fontSize: '0.85rem', color: '#6B7280', margin: '4px 0 0' }}>1800-TRUCK-MITR IVR and social media marketing lead conversions</p>
        </div>
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB' }}>
          <Table columns={columns} data={leads} />
        </div>
      </div>
    </AdminLayout>
  );
};

export const TransporterAdminPage = () => {
  const { showToast } = useToast();
  const transporters = [
    { id: 201, company: 'Sharma Freight Lines Pvt Ltd', owner: 'Ramesh Sharma', fleetSize: '45 Trucks', plan: 'Enterprise Pro', activeJobs: 4, verified: true },
    { id: 202, company: 'All-India Freight Express', owner: 'Vikram Mehta', fleetSize: '120 Trucks', plan: 'Corporate Custom', activeJobs: 12, verified: true },
    { id: 203, company: 'GreenLine Cold Logistics', owner: 'Suresh Rao', fleetSize: '35 Trucks', plan: 'Enterprise Pro', activeJobs: 2, verified: true },
  ];

  const columns = [
    { title: 'Company / Fleet Entity', key: 'company', render: (val, row) => <div><strong style={{ color: '#0D6EFD' }}>🏢 {val}</strong><div style={{ fontSize: '0.8rem', color: '#6B7280' }}>Contact: {row.owner}</div></div> },
    { title: 'Fleet Capacity', key: 'fleetSize' },
    { title: 'Subscription Tier', key: 'plan', render: (val) => <strong style={{ color: '#10B981' }}>{val}</strong> },
    { title: 'Open Vacancies', key: 'activeJobs', render: (val) => <strong>{val} Active</strong> },
    { title: 'Govt KYC', key: 'verified', render: (val) => <span style={{ backgroundColor: '#D1FAE5', color: '#065F46', padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}>✓ Verified Fleet</span> },
  ];

  return (
    <AdminLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: 0 }}>Transporter Directory & Fleet Operators</h1>
            <p style={{ fontSize: '0.85rem', color: '#6B7280', margin: '4px 0 0' }}>14,500+ registered logistics companies, transporters, and truck owners</p>
          </div>
          <Button variant="secondary" size="md" icon={Download} onClick={() => showToast('Exporting Transporter list to Excel...', 'success')}>
            Export Fleets List
          </Button>
        </div>
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB' }}>
          <Table columns={columns} data={transporters} />
        </div>
      </div>
    </AdminLayout>
  );
};
