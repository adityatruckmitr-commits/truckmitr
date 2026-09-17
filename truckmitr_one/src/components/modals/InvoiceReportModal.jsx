import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  Download, 
  Calendar, 
  Filter, 
  CreditCard, 
  CheckCircle, 
  ArrowRight,
  Receipt,
  FileSpreadsheet
} from 'lucide-react';

export const InvoiceReportModal = ({ isOpen, onClose }) => {
  const [dateRange, setDateRange] = useState({
    from: '2026-09-01',
    to: '2026-09-16'
  });
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [exportFormat, setExportFormat] = useState('excel');
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert('Invoice report downloaded successfully!');
      onClose();
    }, 900);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '680px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          overflow: 'hidden',
          animation: 'modalSlideUp 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            backgroundColor: '#0F172A',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: 'rgba(224, 90, 27, 0.18)',
                color: '#E05A1B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Receipt size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '800', margin: 0, letterSpacing: '-0.02em' }}>
                Invoice & Billing Report Generator
              </h2>
              <p style={{ fontSize: '12px', color: '#94A3B8', margin: '2px 0 0 0' }}>
                Export GST invoices, subscription receipts, and revenue breakdowns
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: '#94A3B8',
              borderRadius: '8px',
              padding: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px', maxHeight: 'calc(85vh - 140px)', overflowY: 'auto' }}>
          
          {/* Quick Metrics Bar */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
              padding: '14px',
              backgroundColor: '#F8FAFC',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
              marginBottom: '20px',
            }}
          >
            <div>
              <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>Month Billing (MTD)</div>
              <div style={{ fontSize: '16px', fontWeight: '800', color: '#0F172A', marginTop: '2px' }}>
                ₹24,80,000
              </div>
              <div style={{ fontSize: '10px', color: '#059669', fontWeight: '600' }}>+12.4% vs last month</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>Total Invoices</div>
              <div style={{ fontSize: '16px', fontWeight: '800', color: '#0F172A', marginTop: '2px' }}>
                482 Invoices
              </div>
              <div style={{ fontSize: '10px', color: '#64748B' }}>468 Paid • 14 Pending</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>GST Collected (18%)</div>
              <div style={{ fontSize: '16px', fontWeight: '800', color: '#0D9488', marginTop: '2px' }}>
                ₹4,46,400
              </div>
              <div style={{ fontSize: '10px', color: '#64748B' }}>CGST: ₹2.23L • SGST: ₹2.23L</div>
            </div>
          </div>

          {/* Date Selection */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>
              Select Date Range
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#64748B', display: 'block', marginBottom: '4px' }}>From Date</span>
                <input
                  type="date"
                  value={dateRange.from}
                  onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13px',
                    color: '#0F172A',
                    fontWeight: '600',
                  }}
                />
              </div>
              <div>
                <span style={{ fontSize: '11px', color: '#64748B', display: 'block', marginBottom: '4px' }}>To Date</span>
                <input
                  type="date"
                  value={dateRange.to}
                  onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13px',
                    color: '#0F172A',
                    fontWeight: '600',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Filters: Category & Payment Status */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                User Category
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '13px',
                  color: '#0F172A',
                  fontWeight: '600',
                  backgroundColor: '#FFFFFF',
                }}
              >
                <option value="all">All User Types (Transporters, Drivers, Vendors)</option>
                <option value="transporter">Transporters & Fleet Owners</option>
                <option value="driver">Drivers (Premium & BGV)</option>
                <option value="dhaba">Highway Dhabas</option>
                <option value="puncture">Puncture & Repair Hubs</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                Payment Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '13px',
                  color: '#0F172A',
                  fontWeight: '600',
                  backgroundColor: '#FFFFFF',
                }}
              >
                <option value="all">All Invoices (Paid, Pending, Failed)</option>
                <option value="paid">Paid & Captured (Successful)</option>
                <option value="pending">Payment Pending</option>
                <option value="refunded">Refunded / Cancelled</option>
              </select>
            </div>
          </div>

          {/* Export File Type */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>
              Select File Format
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {[
                { id: 'excel', label: 'Excel Spreadsheet', desc: '.XLSX with formula sheets', icon: FileSpreadsheet },
                { id: 'csv', label: 'CSV Comma Delimited', desc: '.CSV compatible with ERP', icon: FileText },
                { id: 'pdf_zip', label: 'PDF Invoice ZIP', desc: 'All GST PDF invoices in .ZIP', icon: Receipt },
              ].map((fmt) => {
                const Icon = fmt.icon;
                const isSelected = exportFormat === fmt.id;
                return (
                  <div
                    key={fmt.id}
                    onClick={() => setExportFormat(fmt.id)}
                    style={{
                      padding: '12px',
                      borderRadius: '10px',
                      border: isSelected ? '2px solid #E05A1B' : '1px solid #E2E8F0',
                      backgroundColor: isSelected ? '#FEF3EB' : '#FFFFFF',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <Icon size={16} color={isSelected ? '#E05A1B' : '#64748B'} />
                      <span style={{ fontSize: '12px', fontWeight: '700', color: isSelected ? '#E05A1B' : '#0F172A' }}>
                        {fmt.label}
                      </span>
                    </div>
                    <div style={{ fontSize: '10px', color: '#64748B' }}>{fmt.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div
          style={{
            padding: '16px 24px',
            backgroundColor: '#F8FAFC',
            borderTop: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: '9px 16px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              backgroundColor: '#FFFFFF',
              color: '#475569',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>

          <button
            onClick={handleDownload}
            disabled={isGenerating}
            style={{
              padding: '9px 22px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#E05A1B',
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: '700',
              cursor: isGenerating ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 6px -1px rgba(224, 90, 27, 0.3)',
            }}
          >
            {isGenerating ? (
              <span>Generating Report...</span>
            ) : (
              <>
                <Download size={16} />
                Generate & Download ({exportFormat.toUpperCase()})
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
