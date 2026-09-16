import React, { useState, useEffect, useMemo } from 'react';
import { usePermissions } from '../../context/PermissionContext';
import { StatCard } from '../../components/common/StatCard';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Drawer } from '../../components/common/Drawer';
import { PerformanceChart } from '../../components/charts/PerformanceChart';
import { DonutChart } from '../../components/charts/DonutChart';
import {
  getInvoices,
  saveInvoices,
  addInvoice,
  updateInvoice,
  REVENUE_STREAMS,
  AGING_BUCKETS,
  REVENUE_FORECAST
} from '../../services/mock/mockRevenue';
import {
  IndianRupee,
  TrendingUp,
  FileText,
  AlertCircle,
  Plus,
  Download,
  CheckCircle2,
  Clock,
  Send,
  Building,
  Filter,
  DollarSign,
  PieChart,
  Calendar
} from 'lucide-react';

export const RevenuePage = () => {
  const { can } = usePermissions();
  const [invoices, setInvoices] = useState(getInvoices());
  const [activeTab, setActiveTab] = useState('invoices'); // 'invoices' | 'streams' | 'collections' | 'forecast'
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [streamFilter, setStreamFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Form states
  const [formData, setFormData] = useState({
    clientName: '',
    clientType: 'Transporter',
    streamId: 'subscriptions',
    stream: 'Fleet Subscriptions',
    amount: '',
    dueDate: '',
    notes: '',
    description: ''
  });

  useEffect(() => {
    const handleUpdate = () => setInvoices(getInvoices());
    window.addEventListener('tm_revenue_updated', handleUpdate);
    return () => window.removeEventListener('tm_revenue_updated', handleUpdate);
  }, []);

  // Summary figures (consistent with CEO Dashboard ₹85,882 weekly / ~₹3.43L monthly)
  const totalMtd = 343528;
  const weeklyMarketplace = 85882;
  const totalOutstanding = useMemo(() => {
    return invoices
      .filter((i) => i.status === 'SENT' || i.status === 'OVERDUE')
      .reduce((sum, i) => sum + i.totalAmount, 0);
  }, [invoices]);

  const totalCollected = useMemo(() => {
    return invoices
      .filter((i) => i.status === 'PAID')
      .reduce((sum, i) => sum + i.totalAmount, 0);
  }, [invoices]);

  // Filtered invoices
  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      const matchStream = streamFilter === 'ALL' || inv.streamId === streamFilter;
      const matchStatus = statusFilter === 'ALL' || inv.status === statusFilter;
      return matchStream && matchStatus;
    });
  }, [invoices, streamFilter, statusFilter]);

  // Donut chart stream data
  const streamChartData = useMemo(() => {
    return REVENUE_STREAMS.map((s) => ({
      name: s.name,
      value: s.mtdAmount,
      color: s.color
    }));
  }, []);

  const handleCreateInvoice = (e) => {
    e.preventDefault();
    if (!formData.clientName || !formData.amount) return;

    const streamObj = REVENUE_STREAMS.find((s) => s.id === formData.streamId);
    addInvoice({
      clientName: formData.clientName,
      clientType: formData.clientType,
      stream: streamObj ? streamObj.name : 'Fleet Subscriptions',
      streamId: formData.streamId,
      description: formData.description || `${formData.stream} fee`,
      amount: parseFloat(formData.amount),
      dueDate: formData.dueDate || new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      notes: formData.notes
    });

    setIsCreateModalOpen(false);
    setFormData({
      clientName: '',
      clientType: 'Transporter',
      streamId: 'subscriptions',
      stream: 'Fleet Subscriptions',
      amount: '',
      dueDate: '',
      notes: '',
      description: ''
    });
  };

  const handleUpdateInvoiceStatus = (status) => {
    if (!selectedInvoice) return;
    updateInvoice(selectedInvoice.id, {
      status,
      paidDate: status === 'PAID' ? new Date().toISOString().split('T')[0] : null
    });
    setSelectedInvoice((prev) => ({ ...prev, status }));
  };

  const handleExportCsv = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Invoice #,Client,Stream,Amount,GST,Total,Status,Issue Date,Due Date']
        .concat(
          invoices.map(
            (i) =>
              `"${i.invoiceNumber}","${i.clientName}","${i.stream}",${i.amount},${i.gstAmount},${i.totalAmount},"${i.status}","${i.issueDate}","${i.dueDate}"`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `TruckMitr_Invoices_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = [
    {
      key: 'invoiceNumber',
      title: 'Invoice #',
      sortable: true,
      render: (_, row) => (
        <div>
          <div style={{ fontWeight: 700, color: '#1467FF' }}>{row.invoiceNumber}</div>
          <div style={{ fontSize: '11px', color: '#64748B' }}>{row.issueDate}</div>
        </div>
      )
    },
    {
      key: 'clientName',
      title: 'Client / Entity',
      sortable: true,
      render: (_, row) => (
        <div>
          <div style={{ fontWeight: 600, color: '#0F172A' }}>{row.clientName}</div>
          <div style={{ fontSize: '11px', color: '#64748B' }}>{row.clientType}</div>
        </div>
      )
    },
    {
      key: 'stream',
      title: 'Revenue Stream',
      sortable: true,
      render: (val) => (
        <span
          style={{
            fontSize: '12px',
            fontWeight: 600,
            padding: '3px 8px',
            borderRadius: '6px',
            backgroundColor: '#F1F5F9',
            color: '#334155'
          }}
        >
          {val}
        </span>
      )
    },
    {
      key: 'totalAmount',
      title: 'Total Amount',
      sortable: true,
      render: (_, row) => (
        <div>
          <div style={{ fontWeight: 700, color: '#0F172A' }}>₹{(row.totalAmount || 0).toLocaleString('en-IN')}</div>
          <div style={{ fontSize: '10px', color: '#64748B' }}>Base: ₹{(row.amount || 0).toLocaleString('en-IN')} + 18% GST</div>
        </div>
      )
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (val) => {
        let variant = 'info';
        if (val === 'PAID') variant = 'success';
        if (val === 'OVERDUE') variant = 'danger';
        if (val === 'DRAFT') variant = 'warning';
        return <StatusBadge status={val} variant={variant} />;
      }
    },
    {
      key: 'dueDate',
      title: 'Due Date',
      sortable: true,
      render: (_, row) => (
        <div style={{ fontSize: '12px', color: row.status === 'OVERDUE' ? '#EF4444' : '#64748B', fontWeight: 500 }}>
          {row.dueDate}
        </div>
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, row) => (
        <button
          onClick={() => setSelectedInvoice(row)}
          style={{
            padding: '6px 12px',
            borderRadius: '6px',
            border: '1px solid #E2E8F0',
            backgroundColor: '#FFFFFF',
            color: '#1E293B',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          View Details
        </button>
      )
    }
  ];

  return (
    <div style={{ padding: '24px', maxWidth: '1440px', margin: '0 auto' }}>
      {/* Header Banner */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
            Revenue & Financial Hub
          </h1>
          <p style={{ color: '#64748B', fontSize: '14px', margin: '4px 0 0' }}>
            Enterprise billing ledger, revenue stream analytics, aging collections, and Q3/Q4 forecasting.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          {can('revenue', 'export') && (
            <button
              onClick={handleExportCsv}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#334155',
                cursor: 'pointer'
              }}
            >
              <Download size={16} /> Export Invoices CSV
            </button>
          )}

          {can('revenue', 'create') && (
            <button
              onClick={() => setIsCreateModalOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                backgroundColor: '#1467FF',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(20, 103, 255, 0.25)'
              }}
            >
              <Plus size={16} /> Create Invoice
            </button>
          )}
        </div>
      </div>

      {/* KPI StatCards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}
      >
        <StatCard
          title="September MTD Run-Rate"
          value={`₹${totalMtd.toLocaleString('en-IN')}`}
          change="+14.2% MoM"
          isPositive={true}
          iconColor="#1467FF"
          iconBg="#EFF6FF"
          icon={TrendingUp}
        />
        <StatCard
          title="Weekly Marketplace Revenue"
          value={`₹${weeklyMarketplace.toLocaleString('en-IN')}`}
          change="+8.6% vs last wk"
          isPositive={true}
          iconColor="#10B981"
          iconBg="#ECFDF5"
          icon={IndianRupee}
        />
        <StatCard
          title="Total Collections Received"
          value={`₹${totalCollected.toLocaleString('en-IN')}`}
          change="3 Invoices Settled"
          isPositive={true}
          iconColor="#059669"
          iconBg="#ECFDF5"
          icon={CheckCircle2}
        />
        <StatCard
          title="Outstanding Receivables"
          value={`₹${totalOutstanding.toLocaleString('en-IN')}`}
          change="2 Overdue / Pending"
          isPositive={false}
          iconColor="#EF4444"
          iconBg="#FEF2F2"
          icon={AlertCircle}
        />
      </div>

      {/* View Tabs */}
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid #E2E8F0',
          marginBottom: '20px',
          gap: '24px'
        }}
      >
        {[
          { id: 'invoices', label: 'Invoices & Billing', icon: FileText },
          { id: 'streams', label: 'Revenue Streams Breakdown', icon: PieChart },
          { id: 'collections', label: 'Aging & Receivables', icon: Clock },
          { id: 'forecast', label: 'Projections & Forecast', icon: TrendingUp }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 4px',
                border: 'none',
                background: 'none',
                fontSize: '14px',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? '#1467FF' : '#64748B',
                borderBottom: isActive ? '2px solid #1467FF' : '2px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Invoices & Billing */}
      {activeTab === 'invoices' && (
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E2E8F0' }}>
          {/* Table Filters */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              marginBottom: '16px',
              alignItems: 'center',
              flexWrap: 'wrap'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Filter size={16} color="#64748B" />
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Stream:</span>
              <select
                value={streamFilter}
                onChange={(e) => setStreamFilter(e.target.value)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  fontSize: '13px',
                  backgroundColor: '#F8FAFC'
                }}
              >
                <option value="ALL">All Streams</option>
                {REVENUE_STREAMS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  fontSize: '13px',
                  backgroundColor: '#F8FAFC'
                }}
              >
                <option value="ALL">All Statuses</option>
                <option value="PAID">Paid</option>
                <option value="SENT">Sent</option>
                <option value="OVERDUE">Overdue</option>
                <option value="DRAFT">Draft</option>
              </select>
            </div>
          </div>

          <DataTable
            columns={columns}
            data={filteredInvoices}
            searchable={true}
            searchPlaceholder="Search invoices by client, invoice #, stream..."
            pagination={true}
            pageSize={6}
          />
        </div>
      )}

      {/* TAB 2: Revenue Streams Breakdown */}
      {activeTab === 'streams' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E2E8F0' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', marginTop: 0, marginBottom: '16px' }}>
              Revenue Contribution Mix (Sep MTD)
            </h3>
            <DonutChart data={streamChartData} height={260} />
          </div>

          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E2E8F0' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', marginTop: 0, marginBottom: '16px' }}>
              Stream Breakdown Details
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {REVENUE_STREAMS.map((st) => (
                <div
                  key={st.id}
                  style={{
                    padding: '14px',
                    borderRadius: '8px',
                    backgroundColor: '#F8FAFC',
                    borderLeft: `4px solid ${st.color}`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '14px' }}>{st.name}</div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>{st.sharePct}% of Total MTD Revenue</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '15px' }}>
                      ₹{st.mtdAmount.toLocaleString('en-IN')}
                    </div>
                    <div style={{ fontSize: '11px', color: '#10B981', fontWeight: 600 }}>Active Stream</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Aging & Collections */}
      {activeTab === 'collections' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px'
            }}
          >
            {AGING_BUCKETS.map((b) => (
              <div
                key={b.bucket}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '18px',
                  border: '1px solid #E2E8F0',
                  borderTop: `4px solid ${b.color}`
                }}
              >
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>{b.bucket}</div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', margin: '6px 0 2px' }}>
                  ₹{b.amount.toLocaleString('en-IN')}
                </div>
                <div style={{ fontSize: '12px', color: '#64748B' }}>{b.count} invoices outstanding</div>
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E2E8F0' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', marginTop: 0, marginBottom: '14px' }}>
              Receivables Collection Policy
            </h3>
            <p style={{ fontSize: '13px', color: '#64748B', lineHeight: '1.6' }}>
              Invoices carry Net-14 payment terms. Automated reminder notifications are dispatched via SMS & Email at Day 7, Day 12, and Day 15.
              Accounts exceeding 30 days overdue trigger manager SLA escalation and temporary subscription feature locking.
            </p>
          </div>
        </div>
      )}

      {/* TAB 4: Projections & Forecast */}
      {activeTab === 'forecast' && (
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', marginTop: 0, marginBottom: '16px' }}>
            9-Month Marketplace Financial Trajectory & Q4 Outlook
          </h3>
          <PerformanceChart height={340} />
        </div>
      )}

      {/* Invoice Detail Drawer */}
      <Drawer
        isOpen={Boolean(selectedInvoice)}
        onClose={() => setSelectedInvoice(null)}
        title={selectedInvoice ? `Invoice: ${selectedInvoice.invoiceNumber}` : ''}
      >
        {selectedInvoice && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Status Callout */}
            <div
              style={{
                padding: '16px',
                borderRadius: '8px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ fontSize: '12px', color: '#64748B' }}>Invoice Status</div>
                <div style={{ marginTop: '4px' }}>
                  <StatusBadge
                    status={selectedInvoice.status}
                    variant={
                      selectedInvoice.status === 'PAID'
                        ? 'success'
                        : selectedInvoice.status === 'OVERDUE'
                        ? 'danger'
                        : 'info'
                    }
                  />
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '12px', color: '#64748B' }}>Total Payable</div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A' }}>
                  ₹{selectedInvoice.totalAmount.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            {/* Client Info */}
            <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <h4 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>Client Details</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '13px' }}>
                <div>
                  <span style={{ color: '#64748B' }}>Client Name:</span>
                  <div style={{ fontWeight: 600, color: '#0F172A' }}>{selectedInvoice.clientName}</div>
                </div>
                <div>
                  <span style={{ color: '#64748B' }}>Category:</span>
                  <div style={{ fontWeight: 600, color: '#0F172A' }}>{selectedInvoice.clientType}</div>
                </div>
                <div>
                  <span style={{ color: '#64748B' }}>Issue Date:</span>
                  <div style={{ fontWeight: 600, color: '#0F172A' }}>{selectedInvoice.issueDate}</div>
                </div>
                <div>
                  <span style={{ color: '#64748B' }}>Due Date:</span>
                  <div style={{ fontWeight: 600, color: '#0F172A' }}>{selectedInvoice.dueDate}</div>
                </div>
              </div>
            </div>

            {/* Line Item Breakdown */}
            <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <h4 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>Line Items</h4>
              <div style={{ fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#334155' }}>{selectedInvoice.description}</span>
                  <span style={{ fontWeight: 600 }}>₹{selectedInvoice.amount.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                  <span>CGST (9%) + SGST (9%)</span>
                  <span>₹{selectedInvoice.gstAmount.toLocaleString('en-IN')}</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderTop: '1px solid #E2E8F0',
                    paddingTop: '8px',
                    fontWeight: 800,
                    fontSize: '14px'
                  }}
                >
                  <span>Grand Total</span>
                  <span style={{ color: '#1467FF' }}>₹{selectedInvoice.totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            {can('revenue', 'edit') && (
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                {selectedInvoice.status !== 'PAID' && (
                  <button
                    onClick={() => handleUpdateInvoiceStatus('PAID')}
                    style={{
                      flex: 1,
                      padding: '10px',
                      backgroundColor: '#10B981',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Mark as Paid
                  </button>
                )}
                {selectedInvoice.status === 'DRAFT' && (
                  <button
                    onClick={() => handleUpdateInvoiceStatus('SENT')}
                    style={{
                      flex: 1,
                      padding: '10px',
                      backgroundColor: '#1467FF',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Send Invoice
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </Drawer>

      {/* Create Invoice Modal */}
      {isCreateModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '24px',
              width: '100%',
              maxWidth: '520px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            }}
          >
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', marginTop: 0, marginBottom: '16px' }}>
              Create New Invoice
            </h2>

            <form onSubmit={handleCreateInvoice} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                  Client / Entity Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sharma Transporters Ltd."
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13px'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                    Client Type
                  </label>
                  <select
                    value={formData.clientType}
                    onChange={(e) => setFormData({ ...formData, clientType: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: '1px solid #CBD5E1',
                      fontSize: '13px'
                    }}
                  >
                    <option value="Transporter">Transporter</option>
                    <option value="Partner">Partner</option>
                    <option value="OEM">OEM / Dealership</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                    Revenue Stream
                  </label>
                  <select
                    value={formData.streamId}
                    onChange={(e) => setFormData({ ...formData, streamId: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: '1px solid #CBD5E1',
                      fontSize: '13px'
                    }}
                  >
                    {REVENUE_STREAMS.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                    Amount (₹, Excl. GST) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 45000"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: '1px solid #CBD5E1',
                      fontSize: '13px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: '1px solid #CBD5E1',
                      fontSize: '13px'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                  Description / Service Details
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Pro Fleet Subscription (40 vehicles) for Q3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13px',
                    resize: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#F1F5F9',
                    border: '1px solid #E2E8F0',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '8px 20px',
                    backgroundColor: '#1467FF',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Generate Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
