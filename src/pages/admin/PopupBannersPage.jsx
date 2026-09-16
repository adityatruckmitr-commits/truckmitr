import React, { useState } from 'react';
import { MapPin, PlusCircle, Trash2 } from 'lucide-react';
import { AdminLayout } from './AdminLayout';
import { Table } from '../../components/common/Table';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';

export const PopupBannersPage = () => {
  const { showToast } = useToast();
  const guides = [
    { id: 1, title: 'How to verify your Driving License via OTP', category: 'Driver User Guide', status: 'Active', views: '28,940' },
    { id: 2, title: 'How fleet managers post and interview trailer drivers', category: 'Transporter Guide', status: 'Active', views: '9,410' },
  ];

  const columns = [
    { title: 'Interactive Guide Title', key: 'title', render: (val) => <strong style={{ color: '#111827' }}>📖 {val}</strong> },
    { title: 'Category', key: 'category' },
    { title: 'Total User Views', key: 'views' },
    { title: 'Status', key: 'status', render: (val) => <span style={{ backgroundColor: '#D1FAE5', color: '#065F46', padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>{val}</span> },
  ];

  return (
    <AdminLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: 0 }}>Popup Guides & Tutorials</h1>
            <p style={{ fontSize: '0.85rem', color: '#6B7280', margin: '4px 0 0' }}>Manage step-by-step onboarding walkthroughs and visual user guides</p>
          </div>
          <Button variant="primary" size="md" icon={PlusCircle} onClick={() => showToast('Open guide editor', 'info')}>
            + Create New Guide
          </Button>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB' }}>
          <Table columns={columns} data={guides} />
        </div>
      </div>
    </AdminLayout>
  );
};
