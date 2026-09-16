import React, { useState } from 'react';
import { MessageSquare, PhoneCall, Search, Download, Trash2, PlusCircle } from 'lucide-react';
import { AdminLayout } from './AdminLayout';
import { Table } from '../../components/common/Table';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';

export const PopupMessagesPage = () => {
  const { showToast } = useToast();
  const messages = [
    { id: 1, title: 'Notice: NH-44 Toll Updates in Sonipat Region', targetGroup: 'Active Drivers', status: 'Published', date: '01 Sep 2026' },
    { id: 2, title: 'Fleet Hiring Webinar on Saturday 4 PM', targetGroup: 'Transporters', status: 'Published', date: '29 Aug 2026' },
  ];

  const columns = [
    { title: 'In-App Popup Notice', key: 'title', render: (val) => <strong style={{ color: '#111827' }}>💬 {val}</strong> },
    { title: 'Audience Group', key: 'targetGroup' },
    { title: 'Publication Date', key: 'date' },
    { title: 'Status', key: 'status', render: (val) => <span style={{ backgroundColor: '#D1FAE5', color: '#065F46', padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>{val}</span> },
  ];

  return (
    <AdminLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: 0 }}>Popup Messages</h1>
            <p style={{ fontSize: '0.85rem', color: '#6B7280', margin: '4px 0 0' }}>Manage immediate broadcast alert popups sent to app users</p>
          </div>
          <Button variant="primary" size="md" icon={PlusCircle} onClick={() => showToast('Create popup notice', 'info')}>
            + Add New Popup
          </Button>
        </div>
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB' }}>
          <Table columns={columns} data={messages} />
        </div>
      </div>
    </AdminLayout>
  );
};

export const CallLogsTrackingPage = () => {
  const { showToast } = useToast();
  const logs = [
    { id: 1, caller: 'Pooja Singh (MM Agent)', receiver: 'Rajesh Kumar (Driver)', direction: 'Outbound IVR', duration: '4m 12s', outcome: 'Connected & Placed', time: '10:45 AM Today' },
    { id: 2, caller: 'Sharma Freight Lines', receiver: 'Gurpreet Singh', direction: 'Direct Transporter Call', duration: '6m 30s', outcome: 'Interview Scheduled', time: '09:20 AM Today' },
    { id: 3, caller: 'Anjali Sharma (Team Lead)', receiver: 'North-Zone Infra Logistics', direction: 'Outbound IVR', duration: '2m 15s', outcome: 'Requirement Confirmed', time: 'Yesterday' },
  ];

  const columns = [
    { title: 'Caller / Entity', key: 'caller', render: (val) => <strong style={{ color: '#0D6EFD' }}>{val}</strong> },
    { title: 'Receiver', key: 'receiver' },
    { title: 'Call Type', key: 'direction' },
    { title: 'Duration', key: 'duration' },
    { title: 'Call Outcome', key: 'outcome', render: (val) => <span style={{ backgroundColor: '#D1FAE5', color: '#065F46', padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>{val}</span> },
    { title: 'Timestamp', key: 'time' },
  ];

  return (
    <AdminLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: 0 }}>Telephony & Call Logs Tracking</h1>
            <p style={{ fontSize: '0.85rem', color: '#6B7280', margin: '4px 0 0' }}>Real-time IVR audio call recordings, duration metrics, and agent outcomes</p>
          </div>
          <Button variant="secondary" size="md" icon={Download} onClick={() => showToast('Exporting TeleCMI Call Logs to CSV...', 'success')}>
            Export Call Audio Logs
          </Button>
        </div>
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB' }}>
          <Table columns={columns} data={logs} />
        </div>
      </div>
    </AdminLayout>
  );
};
