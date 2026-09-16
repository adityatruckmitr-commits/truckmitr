import React, { useState } from 'react';
import { Bell, Send, Briefcase, HelpCircle, PlusCircle, Trash2 } from 'lucide-react';
import { AdminLayout } from './AdminLayout';
import { Table } from '../../components/common/Table';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Modal } from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';

export const NotificationsAdminPage = () => {
  const { showToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [target, setTarget] = useState('All Drivers');

  const notifications = [
    { id: 1, title: 'Urgent: 50+ Trailer Driver Openings in Delhi-NCR', audience: 'All Drivers (52,000+ Devices)', status: 'Delivered (FCM v3)', sentAt: 'Today, 10:00 AM', openRate: '34.2%' },
    { id: 2, title: 'New Feature: Instant RC & DL Verification Available', audience: 'All Transporters (14,500+)', status: 'Delivered (FCM v3)', sentAt: 'Yesterday', openRate: '28.5%' },
  ];

  const handleSend = () => {
    if (!title || !body) return;
    showToast(`Broadcast push notification "${title}" dispatched to ${target}!`, 'success');
    setModalOpen(false);
    setTitle('');
    setBody('');
  };

  const columns = [
    { title: 'Notification Campaign Title', key: 'title', render: (val) => <strong style={{ color: '#111827' }}>🔔 {val}</strong> },
    { title: 'Audience Target', key: 'audience' },
    { title: 'Delivery Status', key: 'status', render: (val) => <span style={{ backgroundColor: '#D1FAE5', color: '#065F46', padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>✓ {val}</span> },
    { title: 'Dispatched At', key: 'sentAt' },
    { title: 'Open Rate', key: 'openRate', render: (val) => <strong style={{ color: '#0D6EFD' }}>{val}</strong> },
  ];

  return (
    <AdminLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: 0 }}>Push Notifications & Broadcast Manager</h1>
            <p style={{ fontSize: '0.85rem', color: '#6B7280', margin: '4px 0 0' }}>Dispatch FCM v3 Dual-Payload push notifications to mobile devices</p>
          </div>
          <Button variant="primary" size="md" icon={Send} onClick={() => setModalOpen(true)}>
            + Send Push Notification
          </Button>
        </div>
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB' }}>
          <Table columns={columns} data={notifications} />
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Send Global Push Notification" footer={<><Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button><Button variant="primary" onClick={handleSend}>Dispatch Broadcast</Button></>}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <Input label="Notification Title" placeholder="e.g. 50+ High Paying Container Jobs Added" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: 500, color: '#111827', marginBottom: '6px', display: 'block' }}>Message Body</label>
            <textarea rows={3} value={body} onChange={(e) => setBody(e.target.value)} placeholder="Enter brief notification summary..." style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #D1D5DB', outline: 'none' }} />
          </div>
          <Select label="Target Audience" value={target} onChange={(e) => setTarget(e.target.value)} options={[{ value: 'All Drivers', label: 'All Registered Drivers (52k+)' }, { value: 'All Transporters', label: 'All Fleet Transporters (14k+)' }, { value: 'All Users', label: 'All App Users (Everyone)' }]} />
        </div>
      </Modal>
    </AdminLayout>
  );
};

export const CareerAdminPage = () => {
  const { showToast } = useToast();
  const careers = [
    { id: 1, position: 'Telecaller & Placement Executive (Hindi/Punjabi)', location: 'Sonipat Office / Remote', openings: 5, applicants: 42, status: 'Active' },
    { id: 2, position: 'Field Verification Agent (Margdarshak)', location: 'Delhi NCR Corridor', openings: 8, applicants: 19, status: 'Active' },
  ];

  const columns = [
    { title: 'Job Designation', key: 'position', render: (val) => <strong style={{ color: '#0D6EFD' }}>💼 {val}</strong> },
    { title: 'Location', key: 'location' },
    { title: 'Openings', key: 'openings' },
    { title: 'Applications Received', key: 'applicants', render: (val) => <strong>{val} Candidates</strong> },
    { title: 'Status', key: 'status', render: (val) => <span style={{ backgroundColor: '#D1FAE5', color: '#065F46', padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>{val}</span> },
  ];

  return (
    <AdminLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: 0 }}>TruckMitr Careers & Corporate Hiring</h1>
            <p style={{ fontSize: '0.85rem', color: '#6B7280', margin: '4px 0 0' }}>Internal corporate positions for telecallers, field agents, and software team</p>
          </div>
          <Button variant="primary" size="md" icon={PlusCircle} onClick={() => showToast('Open Add Career modal', 'info')}>
            + Post Career Opening
          </Button>
        </div>
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB' }}>
          <Table columns={columns} data={careers} />
        </div>
      </div>
    </AdminLayout>
  );
};

export const InquiryAdminPage = () => {
  const { showToast } = useToast();
  const inquiries = [
    { id: 1, name: 'Deepak Sharma', phone: '98765-44332', subject: 'Corporate Fleet BGV API Integration', date: '02 Sep 2026', status: 'Pending' },
    { id: 2, name: 'Balwant Singh', phone: '98112-88776', subject: 'Dhaba Partnership in Ambala Region', date: '01 Sep 2026', status: 'Resolved' },
  ];

  const columns = [
    { title: 'Inquirer Name', key: 'name', render: (val) => <strong style={{ color: '#111827' }}>{val}</strong> },
    { title: 'Mobile Number', key: 'phone', render: (val) => <span style={{ color: '#0D6EFD' }}>📞 {val}</span> },
    { title: 'Subject / Query', key: 'subject' },
    { title: 'Date', key: 'date' },
    { title: 'Status', key: 'status', render: (val) => <span style={{ backgroundColor: val === 'Resolved' ? '#D1FAE5' : '#FEF3C7', color: val === 'Resolved' ? '#065F46' : '#92400E', padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>{val}</span> },
  ];

  return (
    <AdminLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: 0 }}>Website Inquiries & Contact Forms</h1>
          <p style={{ fontSize: '0.85rem', color: '#6B7280', margin: '4px 0 0' }}>Leads submitted via public website contact forms</p>
        </div>
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB' }}>
          <Table columns={columns} data={inquiries} />
        </div>
      </div>
    </AdminLayout>
  );
};
