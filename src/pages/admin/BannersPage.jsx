import React, { useState } from 'react';
import { Image, PlusCircle, Trash2, Eye } from 'lucide-react';
import { AdminLayout } from './AdminLayout';
import { Table } from '../../components/common/Table';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { useToast } from '../../context/ToastContext';

export const BannersPage = () => {
  const { showToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [banners, setBanners] = useState([
    { id: 1, title: 'Commercial Driver Hiring Season 2026', position: 'App Homepage Carousel', status: 'Active', clicks: '4,280', redirectUrl: '/jobs' },
    { id: 2, title: 'Instant DL & RC Verification Discount', position: 'Transporter Dashboard Banner', status: 'Active', clicks: '1,890', redirectUrl: '/transporter/verification-suite' },
    { id: 3, title: 'Safe Highway Night Driving Academy', position: 'Driver Welfare Header', status: 'Active', clicks: '6,140', redirectUrl: '/driver/welfare' },
  ]);

  const [form, setForm] = useState({ title: '', position: 'App Homepage Carousel', redirectUrl: '/jobs' });

  const handleAdd = () => {
    if (!form.title) return;
    setBanners([...banners, { id: Date.now(), ...form, status: 'Active', clicks: '0' }]);
    showToast('Promotional Banner uploaded & published!', 'success');
    setModalOpen(false);
    setForm({ title: '', position: 'App Homepage Carousel', redirectUrl: '/jobs' });
  };

  const columns = [
    { title: 'Banner Campaign Title', key: 'title', render: (val) => <strong style={{ color: '#111827' }}>🖼️ {val}</strong> },
    { title: 'Display Slot', key: 'position' },
    { title: 'Target Redirect', key: 'redirectUrl', render: (val) => <span style={{ color: '#0D6EFD' }}>{val}</span> },
    { title: 'Total Clicks', key: 'clicks' },
    { title: 'Status', key: 'status', render: (val) => <span style={{ backgroundColor: '#D1FAE5', color: '#065F46', padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>{val}</span> },
    {
      title: 'Action',
      key: 'actions',
      render: (_, row) => (
        <button onClick={() => { setBanners(banners.filter((b) => b.id !== row.id)); showToast('Banner deactivated', 'info'); }} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}>
          <Trash2 size={16} />
        </button>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: 0 }}>Banner & Carousel Manager</h1>
            <p style={{ fontSize: '0.85rem', color: '#6B7280', margin: '4px 0 0' }}>Manage app promotional banners, discount sliders, and welfare graphics</p>
          </div>
          <Button variant="primary" size="md" icon={PlusCircle} onClick={() => setModalOpen(true)}>
            + Upload New Banner
          </Button>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB' }}>
          <Table columns={columns} data={banners} />
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Upload Application Banner" footer={<><Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button><Button variant="primary" onClick={handleAdd}>Publish Banner</Button></>}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <Input label="Campaign Title" placeholder="e.g. Monsoon Tyre Safety Discount" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <Select
            label="Placement Location"
            value={form.position}
            onChange={(e) => setForm({ ...form, position: e.target.value })}
            options={[
              { value: 'App Homepage Carousel', label: 'App Homepage Top Carousel' },
              { value: 'Transporter Dashboard Banner', label: 'Transporter Dashboard' },
              { value: 'Driver Welfare Header', label: 'Driver Welfare Academy' },
            ]}
          />
          <Input label="Target Redirect URL / Screen" placeholder="e.g. /jobs or /amenities" value={form.redirectUrl} onChange={(e) => setForm({ ...form, redirectUrl: e.target.value })} required />
        </div>
      </Modal>
    </AdminLayout>
  );
};
