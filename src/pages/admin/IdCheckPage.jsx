import React, { useState } from 'react';
import { IdCard, ShieldCheck, Search, CheckCircle2, XCircle } from 'lucide-react';
import { AdminLayout } from './AdminLayout';
import { Table } from '../../components/common/Table';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useToast } from '../../context/ToastContext';

export const IdCheckPage = () => {
  const { showToast } = useToast();
  const [search, setSearch] = useState('');

  const verifications = [
    { id: 1, user: 'Rajesh Kumar Verma', docType: 'Driving License (DL)', docNumber: 'HR0620180098421', status: 'VALID', apiLatency: '180ms', date: '02 Sep 2026' },
    { id: 2, user: 'Gurpreet Singh', docType: 'Aadhaar Masking OCR', docNumber: 'XXXX-XXXX-4589', status: 'MATCH 99%', apiLatency: '320ms', date: '01 Sep 2026' },
    { id: 3, user: 'Sharma Freight Lines', docType: 'Vehicle RC', docNumber: 'HR55AN1024 (Tata Prima)', status: 'ACTIVE', apiLatency: '210ms', date: '31 Aug 2026' },
    { id: 4, user: 'Santosh Kumar Pal', docType: 'PAN Card', docNumber: 'ABCDE1234F', status: 'VERIFIED', apiLatency: '140ms', date: '30 Aug 2026' },
  ];

  const columns = [
    { title: 'User / Fleet Name', key: 'user', render: (val) => <strong style={{ color: '#0D6EFD' }}>{val}</strong> },
    { title: 'Document Type', key: 'docType' },
    { title: 'Document Identifier', key: 'docNumber' },
    { title: 'API Response Status', key: 'status', render: (val) => <span style={{ backgroundColor: '#D1FAE5', color: '#065F46', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}>✓ {val}</span> },
    { title: 'Latency', key: 'apiLatency', render: (val) => <span style={{ color: '#6B7280', fontSize: '0.8rem' }}>{val}</span> },
    { title: 'Verification Date', key: 'date' },
    {
      title: 'Action',
      key: 'actions',
      render: (_, row) => (
        <Button variant="secondary" size="sm" onClick={() => showToast(`Full raw BEFISC JSON payload loaded for #${row.id}`, 'info')}>
          Inspect Payload
        </Button>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: 0 }}>BEFISC ID Check & Vahan Audit Stream</h1>
            <p style={{ fontSize: '0.85rem', color: '#6B7280', margin: '4px 0 0' }}>Real-time government API verification log (DL, RC, Aadhaar OCR, PAN)</p>
          </div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB' }}>
          <Table columns={columns} data={verifications} />
        </div>
      </div>
    </AdminLayout>
  );
};
