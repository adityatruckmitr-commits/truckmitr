import React, { useState } from 'react';
import { Handshake, Search, Users, Truck, CheckCircle2, Zap } from 'lucide-react';
import { AdminLayout } from './AdminLayout';
import { Table } from '../../components/common/Table';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useToast } from '../../context/ToastContext';

export const MatchmakingPage = () => {
  const { showToast } = useToast();

  const pairs = [
    { id: 1, driver: 'Ramesh Singh Yadav (Trailer 9Y)', transporter: 'All-India Freight Express', route: 'Delhi NCR - Mumbai', matchScore: '96%', status: 'Interview Scheduled' },
    { id: 2, driver: 'Gurpreet Singh (Tanker 12Y)', transporter: 'GreenLine Cold & Liquid', route: 'Gujarat - Bengaluru', matchScore: '98%', status: 'Placed 🎉' },
    { id: 3, driver: 'Santosh Kumar Pal (Open Body 6Y)', transporter: 'North-Zone Infra Logistics', route: 'Sonipat - Jaipur', matchScore: '92%', status: 'Shortlisted' },
  ];

  const columns = [
    { title: 'Candidate Driver', key: 'driver', render: (val) => <strong style={{ color: '#111827' }}>{val}</strong> },
    { title: 'Target Fleet / Transporter', key: 'transporter', render: (val) => <span style={{ color: '#0D6EFD', fontWeight: 600 }}>{val}</span> },
    { title: 'Corridor / Route', key: 'route' },
    { title: 'Match Score', key: 'matchScore', render: (val) => <span style={{ color: '#10B981', fontWeight: 700 }}>⚡ {val}</span> },
    { title: 'Hiring Stage', key: 'status', render: (val) => <span style={{ backgroundColor: val.includes('Placed') ? '#D1FAE5' : '#FEF3C7', color: val.includes('Placed') ? '#065F46' : '#92400E', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>{val}</span> },
  ];

  return (
    <AdminLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: 0 }}>Driver Matchmaking Master Console</h1>
            <p style={{ fontSize: '0.85rem', color: '#6B7280', margin: '4px 0 0' }}>AI and coordinator assisted driver-to-job pairing overview</p>
          </div>
          <Button variant="primary" size="md" icon={Zap} onClick={() => showToast('Matchmaking auto-dispatch initiated', 'info')}>
            Trigger Auto-Match Dispatch
          </Button>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB' }}>
          <Table columns={columns} data={pairs} />
        </div>
      </div>
    </AdminLayout>
  );
};
