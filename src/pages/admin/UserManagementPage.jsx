import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Users, Search, Phone, Mail, CheckCircle2, Shield } from 'lucide-react';
import { AdminLayout } from './AdminLayout';
import { Table } from '../../components/common/Table';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useToast } from '../../context/ToastContext';

export const UserManagementPage = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('search') || '';
  const [query, setQuery] = useState(initialQuery);
  const { showToast } = useToast();

  const allUsers = [
    { id: 'TM-101', name: 'Rajesh Kumar Verma', role: 'Commercial Driver', phone: '98765-43210', email: 'rajesh.driver@gmail.com', status: 'KYC Verified', date: '12 Jan 2026' },
    { id: 'TM-102', name: 'Gurpreet Singh', role: 'Commercial Driver', phone: '98112-23344', email: 'gurpreet.trucker@gmail.com', status: 'KYC Verified', date: '18 Jan 2026' },
    { id: 'TM-201', name: 'Sharma Freight Lines Pvt Ltd', role: 'Fleet Transporter', phone: '98100-99887', email: 'dispatch@sharmafreight.in', status: 'Enterprise Active', date: '04 Feb 2026' },
    { id: 'TM-202', name: 'All-India Freight Express', role: 'Fleet Transporter', phone: '98220-11223', email: 'fleet@allindiafreight.com', status: 'Corporate Active', date: '10 Feb 2026' },
  ];

  const filteredUsers = allUsers.filter((u) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      u.id.toLowerCase().includes(q) ||
      u.phone.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
    );
  });

  const columns = [
    { title: 'TMID & User Name', key: 'name', render: (val, row) => <div><strong style={{ color: '#111827' }}>{val}</strong><div style={{ fontSize: '0.8rem', color: '#0D6EFD', fontWeight: 600 }}>#{row.id}</div></div> },
    { title: 'User Persona', key: 'role', render: (val) => <span style={{ backgroundColor: '#EFF6FF', color: '#1E40AF', padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>{val}</span> },
    { title: 'Mobile Contact', key: 'phone', render: (val) => <span style={{ color: '#374151' }}>📞 {val}</span> },
    { title: 'Email Address', key: 'email', render: (val) => <span style={{ color: '#6B7280', fontSize: '0.825rem' }}>{val}</span> },
    { title: 'Verification Status', key: 'status', render: (val) => <span style={{ backgroundColor: '#D1FAE5', color: '#065F46', padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}>✓ {val}</span> },
    {
      title: 'Action',
      key: 'actions',
      render: (_, row) => (
        <Button variant="secondary" size="sm" onClick={() => showToast(`Loaded complete user profile for #${row.id}`, 'info')}>
          View Profile
        </Button>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: 0 }}>Unified User Search & Profile Directory</h1>
            <p style={{ fontSize: '0.85rem', color: '#6B7280', margin: '4px 0 0' }}>Search across 96,000+ drivers, fleet transporters, partners and staff</p>
          </div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '16px', border: '1px solid #E5E7EB', display: 'flex', gap: '12px' }}>
          <Input
            placeholder="Search by TMID, Name, Mobile Number, or Email..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button variant="primary" onClick={() => showToast(`Search executed for "${query}"`, 'info')}>
            Search
          </Button>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB' }}>
          <Table columns={columns} data={filteredUsers} />
        </div>
      </div>
    </AdminLayout>
  );
};
