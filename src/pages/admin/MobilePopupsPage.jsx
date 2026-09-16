import React, { useState } from 'react';
import { Smartphone, PlusCircle, Trash2 } from 'lucide-react';
import { AdminLayout } from './AdminLayout';
import { Table } from '../../components/common/Table';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { useToast } from '../../context/ToastContext';

export const MobilePopupsPage = () => {
  const { showToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [popups, setPopups] = useState([
    { id: 1, title: 'Complete Your Aadhaar KYC to Unlock 500+ Verified Jobs', targetRole: 'Driver', triggerEvent: 'App Open (If KYC Incomplete)', status: 'Active', impressions: '18,450' },
    { id: 2, title: 'Get 5 Free DL Verifications with Pro Fleet Plan', targetRole: 'Transporter', triggerEvent: 'Post Job Screen', status: 'Active', impressions: '4,120' },
  ]);

  const [form, setForm] = useState({ title: '', targetRole: 'Driver', triggerEvent: 'App Open' });

  const handleAdd = () => {
    if (!form.title) return;
    setPopups([...popups, { id: Date.now(), ...form, status: 'Active', impressions: '0' }]);
    showToast('Mobile Dialog Popup published to React Native app!', 'success');
    setModalOpen(false);
  };

  const columns = [
    { title: 'Modal Notification Title', key: 'title', render: (val) => <strong style={{ color: '#111827' }}>📱 {val}</strong> },
    { title: 'Target User Persona', key: 'targetRole', render: (val) => <span style={{ backgroundColor: '#EFF6FF', color: '#1E40AF', padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>{val}</span> },
    { title: 'Trigger Event', key: 'triggerEvent' },
    { title: 'Impressions', key: 'impressions' },
    { title: 'Status', key: 'status', render: (val) => <span style={{ backgroundColor: '#D1FAE5', color: '#065F46', padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>{val}</span> },
    {
      title: 'Action',
      key: 'actions',
      render: (_, row) => (
        <button onClick={() => { setPopups(popups.filter((p) => p.id !== row.id)); showToast('Popup disabled', 'info'); }} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}>
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
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: 0 }}>Mobile App Popup Dialogs</h1>
            <p style={{ fontSize: '0.85rem', color: '#6B7280', margin: '4px 0 0' }}>Trigger targeted interactive modal dialogs on specific app events</p>
          </div>
          <Button variant="primary" size="md" icon={PlusCircle} onClick={() => setModalOpen(true)}>
            + Create App Popup
          </Button>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB' }}>
          <Table columns={columns} data={popups} />
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Create Mobile In-App Popup" footer={<><Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button><Button variant="primary" onClick={handleAdd}>Deploy Popup</Button></>}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <Input label="Popup Message Headline" placeholder="e.g. Upload your DL to get hired faster" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <Select label="Target Audience" value={form.targetRole} onChange={(e) => setForm({ ...form, targetRole: e.target.value })} options={[{ value: 'Driver', label: 'Commercial Drivers' }, { value: 'Transporter', label: 'Fleet Owners' }, { value: 'All', label: 'All Users' }]} />
          <Input label="Trigger Screen / Event" placeholder="e.g. App Open / Job Apply" value={form.triggerEvent} onChange={(e) => setForm({ ...form, triggerEvent: e.target.value })} required />
        </div>
      </Modal>
    </AdminLayout>
  );
};
