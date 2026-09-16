import React, { useState } from 'react';
import { CreditCard, Phone, CheckCircle2, Download, Search, FileSpreadsheet } from 'lucide-react';
import { AdminLayout } from './AdminLayout';
import { Table } from '../../components/common/Table';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';

export const PaymentAdminPage = () => {
  const { showToast } = useToast();
  const payments = [
    { id: 'pay_Nq8x91234', payer: 'Sharma Freight Lines Pvt Ltd', amount: '₹5,999.00', purpose: 'Pro Subscription Plan', method: 'Razorpay / HDFC UPI', status: 'SUCCESS', date: '02 Sep 2026, 09:15 AM' },
    { id: 'pay_Nq8x95678', payer: 'All-India Freight Express', amount: '₹2,400.00', purpose: 'BGV 100 API Credits Recharge', method: 'Razorpay / Net Banking', status: 'SUCCESS', date: '01 Sep 2026, 04:30 PM' },
    { id: 'pay_Nq8x99999', payer: 'North-Zone Infra Logistics', amount: '₹14,999.00', purpose: 'Corporate Custom Annual Plan', method: 'Razorpay / Corporate Card', status: 'SUCCESS', date: '28 Aug 2026, 11:20 AM' },
  ];

  const columns = [
    { title: 'Razorpay Payment ID', key: 'id', render: (val) => <strong style={{ color: '#0D6EFD' }}>{val}</strong> },
    { title: 'Payer Entity', key: 'payer' },
    { title: 'Amount', key: 'amount', render: (val) => <strong style={{ color: '#10B981', fontSize: '1rem' }}>{val}</strong> },
    { title: 'Billing Purpose', key: 'purpose' },
    { title: 'Method', key: 'method' },
    { title: 'Gateway Status', key: 'status', render: (val) => <span style={{ backgroundColor: '#D1FAE5', color: '#065F46', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}>✓ {val}</span> },
    { title: 'Timestamp', key: 'date' },
    {
      title: 'Tax Invoice',
      key: 'actions',
      render: (_, row) => (
        <Button variant="secondary" size="sm" icon={Download} onClick={() => showToast(`Downloaded GST Tax Invoice PDF for ${row.id}`, 'success')}>
          GST Invoice
        </Button>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: 0 }}>Razorpay Payments & Transactions Ledger</h1>
            <p style={{ fontSize: '0.85rem', color: '#6B7280', margin: '4px 0 0' }}>Real-time payment gateway transactions, GST invoicing and refunds</p>
          </div>
          <Button variant="secondary" size="md" icon={FileSpreadsheet} onClick={() => showToast('Exporting Payments report to Excel...', 'success')}>
            Export Ledger
          </Button>
        </div>
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB' }}>
          <Table columns={columns} data={payments} />
        </div>
      </div>
    </AdminLayout>
  );
};

export const CallbackRequestsPage = () => {
  const { showToast } = useToast();
  const callbacks = [
    { id: 1, name: 'Suresh Verma', phone: '98765-11223', userType: 'Driver (Looking for Trailer Job)', requestedAt: '10 mins ago', status: 'Pending', assignedAgent: 'Pooja Singh' },
    { id: 2, name: 'Apex Roadlines HR', phone: '98110-44556', userType: 'Transporter (Needs 5 Drivers)', requestedAt: '45 mins ago', status: 'In Progress', assignedAgent: 'Anjali Sharma' },
    { id: 3, name: 'Kishan Lal', phone: '99220-77889', userType: 'Highway Dhaba Partner', requestedAt: '2 hours ago', status: 'Resolved', assignedAgent: 'Amit Kumar' },
  ];

  const columns = [
    { title: 'Contact Person Name', key: 'name', render: (val) => <strong style={{ color: '#111827' }}>{val}</strong> },
    { title: 'Mobile Number', key: 'phone', render: (val) => <span style={{ color: '#0D6EFD', fontWeight: 600 }}>📞 {val}</span> },
    { title: 'Inquiry Category', key: 'userType' },
    { title: 'Requested Time', key: 'requestedAt' },
    { title: 'Assigned Agent', key: 'assignedAgent' },
    { title: 'Status', key: 'status', render: (val) => <span style={{ backgroundColor: val === 'Resolved' ? '#D1FAE5' : '#FEF3C7', color: val === 'Resolved' ? '#065F46' : '#92400E', padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>{val}</span> },
    {
      title: 'Action',
      key: 'actions',
      render: (_, row) => (
        <Button variant="primary" size="sm" onClick={() => showToast(`Initiated click-to-call for ${row.name} (${row.phone})`, 'info')}>
          Call Now
        </Button>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: 0 }}>Inbound Callback Requests</h1>
          <p style={{ fontSize: '0.85rem', color: '#6B7280', margin: '4px 0 0' }}>Driver and fleet callback queue submitted from public website and mobile app</p>
        </div>
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB' }}>
          <Table columns={columns} data={callbacks} />
        </div>
      </div>
    </AdminLayout>
  );
};
