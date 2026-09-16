import React, { useState } from 'react';
import { GraduationCap, Briefcase, Headphones, PlusCircle, Trash2, CheckCircle2, Download, Search } from 'lucide-react';
import { AdminLayout } from './AdminLayout';
import { Table } from '../../components/common/Table';
import { Button } from '../../components/common/Button';
import { Tabs } from '../../components/common/Tabs';
import { useToast } from '../../context/ToastContext';

export const DtsAdminPage = () => {
  const { showToast } = useToast();
  const institutes = [
    { id: 1, name: 'National Institute of Commercial Driving (NICD)', location: 'Murthal, Sonipat, Haryana', trainers: 12, passedDrivers: 1450, status: 'Active' },
    { id: 2, name: 'Punjab Heavy Transport Academy', location: 'Ludhiana, Punjab', trainers: 8, passedDrivers: 980, status: 'Active' },
  ];

  const columns = [
    { title: 'Training Institute Name', key: 'name', render: (val) => <strong style={{ color: '#0D6EFD' }}>🎓 {val}</strong> },
    { title: 'Campus Location', key: 'location' },
    { title: 'Certified Trainers', key: 'trainers' },
    { title: 'Trained Drivers Placed', key: 'passedDrivers', render: (val) => <strong style={{ color: '#10B981' }}>{val} Drivers</strong> },
    { title: 'Status', key: 'status', render: (val) => <span style={{ backgroundColor: '#D1FAE5', color: '#065F46', padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>{val}</span> },
  ];

  return (
    <AdminLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: 0 }}>Driver Training Schools (DTS) & Institutes</h1>
          <p style={{ fontSize: '0.85rem', color: '#6B7280', margin: '4px 0 0' }}>Approved commercial driving academies and government test centers</p>
        </div>
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB' }}>
          <Table columns={columns} data={institutes} />
        </div>
      </div>
    </AdminLayout>
  );
};

export const JobAdminPage = () => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('active');

  const jobs = [
    { id: 1, title: 'HCV Container Trailer Driver (22W)', transporter: 'All-India Freight Express', route: 'Delhi-Mumbai', salary: '₹38,000 / mo', applicants: 14, status: 'Active' },
    { id: 2, title: 'Multi-Axle Chemical Tanker Captain', transporter: 'GreenLine Cold Logistics', route: 'Gujarat-BLR', salary: '₹44,000 / mo', applicants: 8, status: 'Active' },
    { id: 3, title: 'Heavy Tipper / Dumper Mining Driver', transporter: 'North-Zone Infra Logistics', route: 'Sonipat Mining', salary: '₹32,000 / mo', applicants: 6, status: 'Inactive' },
    { id: 4, title: 'Electric LCV Delivery Driver', transporter: 'EcoLogistics India', route: 'Bengaluru Intra-City', salary: '₹26,000 / mo', applicants: 19, status: 'Pending Approval' },
  ];

  const columns = [
    { title: 'Job Designation & Route', key: 'title', render: (val, row) => <div><strong style={{ color: '#0D6EFD' }}>💼 {val}</strong><div style={{ fontSize: '0.8rem', color: '#6B7280' }}>Route: {row.route} • Company: {row.transporter}</div></div> },
    { title: 'Salary', key: 'salary', render: (val) => <strong style={{ color: '#10B981' }}>{val}</strong> },
    { title: 'Applications', key: 'applicants', render: (val) => <strong>{val} Candidates</strong> },
    { title: 'Status', key: 'status', render: (val) => <span style={{ backgroundColor: val === 'Active' ? '#D1FAE5' : val.includes('Pending') ? '#FEF3C7' : '#F3F4F6', color: val === 'Active' ? '#065F46' : val.includes('Pending') ? '#92400E' : '#4B5563', padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>{val}</span> },
    {
      title: 'Action',
      key: 'actions',
      render: (_, row) => (
        <Button variant="secondary" size="sm" onClick={() => showToast(`Job #${row.id} details inspected`, 'info')}>
          Manage
        </Button>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: 0 }}>Master Job Vacancies & Moderation</h1>
            <p style={{ fontSize: '0.85rem', color: '#6B7280', margin: '4px 0 0' }}>Moderate transporter job postings, approve pending submissions, track placement rates</p>
          </div>
          <Button variant="secondary" size="md" icon={Download} onClick={() => showToast('Exporting all Job listings to Excel...', 'success')}>
            Export Jobs
          </Button>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB' }}>
          <Table columns={columns} data={jobs} />
        </div>
      </div>
    </AdminLayout>
  );
};

export const TeleChampAdminPage = () => {
  const { showToast } = useToast();
  const staff = [
    { id: 1, name: 'Anjali Sharma', department: 'Welcome Call Team (WCT)', callsToday: 42, connected: 36, conversions: 5, status: 'Active' },
    { id: 2, name: 'Pooja Singh', department: 'Matchmaking & Video Calling (MM)', callsToday: 38, connected: 31, conversions: 4, status: 'Active' },
    { id: 3, name: 'Amit Kumar', department: 'Driver Welfare & Retention (DW)', callsToday: 30, connected: 26, conversions: 3, status: 'Active' },
  ];

  const columns = [
    { title: 'Telecaller Executive Name', key: 'name', render: (val) => <strong style={{ color: '#111827' }}>🎧 {val}</strong> },
    { title: 'Assigned Department', key: 'department', render: (val) => <strong style={{ color: '#0D6EFD' }}>{val}</strong> },
    { title: 'Calls Today', key: 'callsToday' },
    { title: 'Connected Calls', key: 'connected', render: (val) => <strong style={{ color: '#10B981' }}>{val}</strong> },
    { title: 'Successful Placements', key: 'conversions', render: (val) => <span style={{ backgroundColor: '#D1FAE5', color: '#065F46', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}>{val} Placed 🎉</span> },
  ];

  return (
    <AdminLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: 0 }}>Tele Champ & CRM Operations Department</h1>
          <p style={{ fontSize: '0.85rem', color: '#6B7280', margin: '4px 0 0' }}>Agent productivity meters, department quotas, and placement incentives</p>
        </div>
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB' }}>
          <Table columns={columns} data={staff} />
        </div>
      </div>
    </AdminLayout>
  );
};
