/**
 * TruckMitr One — Reports Hub Mock Service
 * 
 * Standardized enterprise report templates aggregating real underlying data
 * from Revenue, Drivers, Transporters, Payroll, Partners, and CRM.
 */

import { getInvoices } from './mockRevenue';
import { INITIAL_DRIVERS_DATA } from './mockDrivers';
import { INITIAL_TRANSPORTERS_DATA } from './mockTransporters';
import { INITIAL_PAYROLL_DATA } from './mockPayroll';
import { INITIAL_PARTNERS_DATA } from './mockPartners';
import { INITIAL_CALL_LOGS } from './mockCrm';

export const REPORT_TEMPLATES = [
  {
    id: 'rep-tpl-01',
    title: 'Monthly Revenue & Financial Summary',
    category: 'Finance',
    sourceModule: 'revenue',
    schedule: 'Monthly on 1st',
    format: 'PDF / XLSX',
    description: 'Consolidated revenue streams, invoice settlement status, and aging receivables ledger.',
    lastGenerated: '2026-09-01 08:00',
    recordsCount: 7,
    getPreviewData: () => {
      const invoices = getInvoices() || [];
      return invoices.map((inv) => ({
        id: inv.invoiceNumber || 'INV-000',
        col1: inv.clientName || 'Client',
        col2: inv.stream || 'Subscriptions',
        col3: `₹${(inv.totalAmount || inv.amount || 0).toLocaleString('en-IN')}`,
        col4: inv.status || 'PAID',
        date: inv.dueDate || '2026-09-15'
      }));
    },
    previewHeaders: ['Invoice #', 'Client', 'Stream', 'Total Amount', 'Status', 'Due Date']
  },
  {
    id: 'rep-tpl-02',
    title: 'Driver Registration & Verification Ledger',
    category: 'Operations',
    sourceModule: 'drivers',
    schedule: 'Weekly on Monday',
    format: 'CSV / PDF',
    description: 'Master list of registered drivers, Aadhaar/DL verification states, and placement status.',
    lastGenerated: '2026-09-08 09:30',
    recordsCount: (INITIAL_DRIVERS_DATA || []).length,
    getPreviewData: () => {
      return (INITIAL_DRIVERS_DATA || []).map((d) => ({
        id: d.tmid || d.id,
        col1: d.name || 'Driver',
        col2: d.licenseType || 'Commercial HMV',
        col3: d.experienceYears ? `${d.experienceYears} yrs` : (d.experience || '5 yrs'),
        col4: d.verificationStatus || 'VERIFIED',
        date: d.registeredAt || d.registrationDate || '2026-09-10'
      }));
    },
    previewHeaders: ['TMID', 'Driver Name', 'License Type', 'Experience', 'Verification', 'Registered']
  },
  {
    id: 'rep-tpl-03',
    title: 'Transporter Fleet & Capacity Audit',
    category: 'Operations',
    sourceModule: 'transporters',
    schedule: 'Bi-Weekly',
    format: 'XLSX',
    description: 'Fleet size, active vehicle capacity, primary transit corridors, and GST compliance.',
    lastGenerated: '2026-09-10 11:15',
    recordsCount: (INITIAL_TRANSPORTERS_DATA || []).length,
    getPreviewData: () => {
      return (INITIAL_TRANSPORTERS_DATA || []).map((t) => ({
        id: t.transporterId || t.id,
        col1: t.companyName || 'Transporter Corp',
        col2: `${t.fleetSize || 20} Vehicles`,
        col3: t.location || (t.city ? `${t.city}, ${t.state}` : 'North Corridor'),
        col4: t.verificationStatus || 'VERIFIED',
        date: t.registrationDate || t.registeredDate || '2026-08-15'
      }));
    },
    previewHeaders: ['Transporter ID', 'Company Name', 'Fleet Size', 'Location', 'KYC Status', 'Onboarded']
  },
  {
    id: 'rep-tpl-04',
    title: 'Monthly Staff Payroll & Statutory Compliance',
    category: 'People & HR',
    sourceModule: 'payroll',
    schedule: 'Monthly on 28th',
    format: 'PDF / CSV',
    description: 'Gross compensation, statutory PF/ESIC deductions, TDS withholdings, and net payouts.',
    lastGenerated: '2026-08-31 18:00',
    recordsCount: (INITIAL_PAYROLL_DATA || []).length,
    getPreviewData: () => {
      return (INITIAL_PAYROLL_DATA || []).map((p) => ({
        id: p.employeeId || p.id,
        col1: p.employeeName || p.name || 'Staff Member',
        col2: p.designation || 'Staff',
        col3: `₹${(p.netPay || p.netPayable || p.basicSalary || 0).toLocaleString('en-IN')}`,
        col4: p.paymentStatus || p.status || 'PAID',
        date: '2026-08-31'
      }));
    },
    previewHeaders: ['Employee ID', 'Employee Name', 'Designation', 'Net Salary', 'Disbursement', 'Pay Period']
  },
  {
    id: 'rep-tpl-05',
    title: 'Highway Partner Referrals & Leads',
    category: 'Operations',
    sourceModule: 'partners',
    schedule: 'Weekly on Friday',
    format: 'CSV',
    description: 'Partner lead generation, dhaba footfalls, conversion ratios, and referral payouts.',
    lastGenerated: '2026-09-12 17:00',
    recordsCount: (INITIAL_PARTNERS_DATA || []).length,
    getPreviewData: () => {
      return (INITIAL_PARTNERS_DATA || []).map((p) => ({
        id: p.partnerCode || p.id,
        col1: p.name || 'Partner',
        col2: p.category || p.type || 'Ecosystem Partner',
        col3: `${p.jobsLeadsGenerated || p.leadsGenerated || 0} Leads`,
        col4: p.status || 'ACTIVE',
        date: p.createdDate || p.partnershipDate || p.joinedDate || '2026-08-01'
      }));
    },
    previewHeaders: ['Partner ID', 'Partner Name', 'Category', 'Leads Sourced', 'Status', 'Joined']
  },
  {
    id: 'rep-tpl-06',
    title: 'Telecaller CRM SLA & Connect Rate Analysis',
    category: 'CRM & Sales',
    sourceModule: 'crm',
    schedule: 'Daily at 20:00',
    format: 'CSV / XLSX',
    description: 'Agent call logs, connect rates, callback turnaround times, and lead conversion velocity.',
    lastGenerated: '2026-09-14 09:00',
    recordsCount: (INITIAL_CALL_LOGS || []).length,
    getPreviewData: () => {
      return (INITIAL_CALL_LOGS || []).map((c) => ({
        id: c.callId || c.id,
        col1: typeof c.agent === 'object' ? c.agent.name : (c.agent || 'Telecaller'),
        col2: c.recipientName || 'Candidate',
        col3: c.outcome || 'Connected',
        col4: c.duration || '03:30',
        date: c.timestamp || '2026-09-10'
      }));
    },
    previewHeaders: ['Call ID', 'Agent', 'Lead / Recipient', 'Outcome', 'Duration', 'Timestamp']
  }
];

export const INITIAL_GENERATION_HISTORY = [
  {
    id: 'gen-101',
    templateTitle: 'Monthly Revenue & Financial Summary',
    generatedBy: 'Anil Kumar (CEO)',
    timestamp: '2026-09-14 10:15',
    records: 7,
    fileSize: '1.4 MB',
    format: 'PDF',
    status: 'READY'
  },
  {
    id: 'gen-102',
    templateTitle: 'Driver Registration & Verification Ledger',
    generatedBy: 'Aditya Kumar (Manager)',
    timestamp: '2026-09-14 09:30',
    records: 6,
    fileSize: '840 KB',
    format: 'CSV',
    status: 'READY'
  },
  {
    id: 'gen-103',
    templateTitle: 'Monthly Staff Payroll & Statutory Compliance',
    generatedBy: 'Pratima Singh (HR)',
    timestamp: '2026-09-13 16:45',
    records: 8,
    fileSize: '2.1 MB',
    format: 'PDF',
    status: 'READY'
  }
];
