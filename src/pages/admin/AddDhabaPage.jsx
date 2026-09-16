import React, { useState } from 'react';
import { Utensils, UserPlus, MessageCircle, PlusCircle, Trash2, MapPin } from 'lucide-react';
import { AdminLayout } from './AdminLayout';
import { Table } from '../../components/common/Table';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Modal } from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';

export const AddDhabaPage = () => {
  const { showToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [dhabas, setDhabas] = useState([
    { id: 1, name: 'Sukhdev Dhaba & Rest Stop', highway: 'NH-44 (GT Road)', location: 'Murthal, Sonipat, Haryana', rating: 4.9, parkingSpots: 120, status: 'Verified' },
    { id: 2, name: 'Karnal Grand Royal Highway Hub', highway: 'NH-44', location: 'Karnal, Haryana', rating: 4.7, parkingSpots: 80, status: 'Verified' },
  ]);

  const [form, setForm] = useState({ name: '', highway: 'NH-44', location: '', parkingSpots: '50' });

  const handleAdd = () => {
    if (!form.name || !form.location) return;
    setDhabas([...dhabas, { id: Date.now(), ...form, rating: 5.0, status: 'Verified' }]);
    showToast(`Dhaba "${form.name}" registered and published to map!`, 'success');
    setModalOpen(false);
  };

  const columns = [
    { title: 'Highway Dhaba / Amenity Name', key: 'name', render: (val) => <strong style={{ color: '#0D6EFD' }}>🍲 {val}</strong> },
    { title: 'Highway Route', key: 'highway' },
    { title: 'Exact Location', key: 'location' },
    { title: 'Heavy Parking Capacity', key: 'parkingSpots', render: (val) => <strong>{val} Trucks</strong> },
    { title: 'Status', key: 'status', render: (val) => <span style={{ backgroundColor: '#D1FAE5', color: '#065F46', padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>✓ {val}</span> },
  ];

  return (
    <AdminLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: 0 }}>Highway Dhaba & Rest Stop Directory</h1>
            <p style={{ fontSize: '0.85rem', color: '#6B7280', margin: '4px 0 0' }}>Onboard highway restaurant partners, parking hubs, and driver rest facilities</p>
          </div>
          <Button variant="primary" size="md" icon={PlusCircle} onClick={() => setModalOpen(true)}>
            + Register New Dhaba
          </Button>
        </div>
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB' }}>
          <Table columns={columns} data={dhabas} />
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Register Highway Dhaba Partner" footer={<><Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button><Button variant="primary" onClick={handleAdd}>Save Partner</Button></>}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <Input label="Dhaba / Business Name" placeholder="e.g. Royal Highway Plaza" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <Input label="National Highway Corridor" placeholder="e.g. NH-48 (Delhi-Jaipur Expressway)" value={form.highway} onChange={(e) => setForm({ ...form, highway: e.target.value })} required />
          <Input label="City / State Location" placeholder="e.g. Kotputli, Rajasthan" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />
          <Input label="Estimated Heavy Truck Parking Capacity" type="number" placeholder="e.g. 50" value={form.parkingSpots} onChange={(e) => setForm({ ...form, parkingSpots: e.target.value })} />
        </div>
      </Modal>
    </AdminLayout>
  );
};

export const TeamMembersPage = () => {
  const { showToast } = useToast();
  const members = [
    { id: 1, name: 'Anjali Sharma', email: 'anjali@truckmitr.com', role: 'Welcome Call Team Lead', department: 'Operations', status: 'Active' },
    { id: 2, name: 'Amit Kumar', email: 'amit@truckmitr.com', role: 'Matchmaking Coordinator', department: 'Telecalling', status: 'Active' },
    { id: 3, name: 'Vikram Singh', email: 'vikram@truckmitr.com', role: 'Senior Field Agent (Margdarshak)', department: 'Verification', status: 'Active' },
  ];

  const columns = [
    { title: 'Employee Full Name', key: 'name', render: (val, row) => <div><strong style={{ color: '#111827' }}>👤 {val}</strong><div style={{ fontSize: '0.8rem', color: '#6B7280' }}>{row.email}</div></div> },
    { title: 'Designation Role', key: 'role', render: (val) => <strong style={{ color: '#0D6EFD' }}>{val}</strong> },
    { title: 'Department', key: 'department' },
    { title: 'Status', key: 'status', render: (val) => <span style={{ backgroundColor: '#D1FAE5', color: '#065F46', padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>{val}</span> },
  ];

  return (
    <AdminLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: 0 }}>TruckMitr Staff & Team Members</h1>
            <p style={{ fontSize: '0.85rem', color: '#6B7280', margin: '4px 0 0' }}>Manage telecallers, team leaders, verification agents, and departments</p>
          </div>
          <Button variant="primary" size="md" icon={PlusCircle} onClick={() => showToast('Open Add Staff modal', 'info')}>
            + Add Team Member
          </Button>
        </div>
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB' }}>
          <Table columns={columns} data={members} />
        </div>
      </div>
    </AdminLayout>
  );
};

export const WhatsAppGroupAdminPage = () => {
  const { showToast } = useToast();
  const groups = [
    { id: 1, title: 'TruckMitr Trailer Drivers Haryana & Delhi NCR', memberCount: 980, inviteLink: 'https://chat.whatsapp.com/TruckMitrHaryanaTrailer', status: 'Active' },
    { id: 2, title: 'Punjab Heavy Chemical Tanker Drivers Association', memberCount: 750, inviteLink: 'https://chat.whatsapp.com/PunjabTankerCrew', status: 'Active' },
    { id: 3, title: 'Transporter Logistics Fleet Owners Forum (Pan-India)', memberCount: 1020, inviteLink: 'https://chat.whatsapp.com/TransporterForumIndia', status: 'Active' },
  ];

  const columns = [
    { title: 'Community WhatsApp Group', key: 'title', render: (val) => <strong style={{ color: '#111827' }}>💬 {val}</strong> },
    { title: 'Members Joined', key: 'memberCount', render: (val) => <strong style={{ color: '#10B981' }}>{val} / 1024</strong> },
    { title: 'Invite Link', key: 'inviteLink', render: (val) => <a href={val} target="_blank" rel="noreferrer" style={{ color: '#0D6EFD', fontSize: '0.825rem' }}>{val}</a> },
    { title: 'Status', key: 'status', render: (val) => <span style={{ backgroundColor: '#D1FAE5', color: '#065F46', padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>{val}</span> },
  ];

  return (
    <AdminLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: 0 }}>WhatsApp Groups & Regional Community Channels</h1>
            <p style={{ fontSize: '0.85rem', color: '#6B7280', margin: '4px 0 0' }}>Manage driver broadcast groups, state-wise communities, and fleet forums</p>
          </div>
          <Button variant="primary" size="md" icon={PlusCircle} onClick={() => showToast('Open Add Group modal', 'info')}>
            + Create New Group Link
          </Button>
        </div>
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB' }}>
          <Table columns={columns} data={groups} />
        </div>
      </div>
    </AdminLayout>
  );
};
