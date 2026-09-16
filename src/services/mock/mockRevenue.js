/**
 * TruckMitr One — Revenue & Financials Mock Service
 * 
 * Sourced consistently with CEO Cockpit and Business Performance Data:
 * - Weekly Marketplace Revenue: ₹85,882
 * - Current Month (Sep) Run Rate: ~₹3,43,528
 * - Streams: Subscriptions, Matchmaking / Placement Commissions, Partner Referrals, Verification & Ads
 */

export const REVENUE_STREAMS = [
  { id: 'subscriptions', name: 'Fleet Subscriptions', color: '#1467FF', sharePct: 42, mtdAmount: 144280 },
  { id: 'matchmaking', name: 'Matchmaking Commissions', color: '#10B981', sharePct: 34, mtdAmount: 116800 },
  { id: 'partners', name: 'Partner Referrals & OEM', color: '#F59E0B', sharePct: 16, mtdAmount: 54965 },
  { id: 'other', name: 'Verification Fees & Ads', color: '#8B5CF6', sharePct: 8, mtdAmount: 27483 }
];

export const INITIAL_INVOICES = [
  {
    id: 'INV-2026-0901',
    invoiceNumber: 'TM-INV-9821',
    clientName: 'Sharma Transporters Ltd.',
    clientType: 'Transporter',
    stream: 'Fleet Subscriptions',
    streamId: 'subscriptions',
    description: 'Enterprise Fleet Plan (150 Trucks) - Annual Billing',
    amount: 54000,
    gstAmount: 9720,
    totalAmount: 63720,
    status: 'PAID',
    issueDate: '2026-09-01',
    dueDate: '2026-09-15',
    paidDate: '2026-09-05',
    paymentMethod: 'Bank Transfer (NEFT)',
    notes: 'Paid ahead of terms, 2% early settlement discount applied.'
  },
  {
    id: 'INV-2026-0902',
    invoiceNumber: 'TM-INV-9822',
    clientName: 'Tata Motors Dealership (Pune)',
    clientType: 'Partner',
    stream: 'Partner Referrals & OEM',
    streamId: 'partners',
    description: 'Driver Placement Referral Commission (8 Placements)',
    amount: 24000,
    gstAmount: 4320,
    totalAmount: 28320,
    status: 'PAID',
    issueDate: '2026-09-03',
    dueDate: '2026-09-17',
    paidDate: '2026-09-10',
    paymentMethod: 'UPI / Razorpay',
    notes: 'Q3 Referral payout batch 1.'
  },
  {
    id: 'INV-2026-0903',
    invoiceNumber: 'TM-INV-9823',
    clientName: 'Patel Roadways Logistics',
    clientType: 'Transporter',
    stream: 'Matchmaking Commissions',
    streamId: 'matchmaking',
    description: 'Specialized Hazmat Driver Sourcing & Verification (4 Drivers)',
    amount: 18500,
    gstAmount: 3330,
    totalAmount: 21830,
    status: 'SENT',
    issueDate: '2026-09-08',
    dueDate: '2026-09-22',
    paidDate: null,
    paymentMethod: 'Pending Payment Gateway Link',
    notes: 'Invoice sent via WhatsApp and Email to account head.'
  },
  {
    id: 'INV-2026-0904',
    invoiceNumber: 'TM-INV-9824',
    clientName: 'GreenLine Highway Express',
    clientType: 'Transporter',
    stream: 'Fleet Subscriptions',
    streamId: 'subscriptions',
    description: 'Quarterly Pro Fleet Plan (45 Trucks)',
    amount: 32000,
    gstAmount: 5760,
    totalAmount: 37760,
    status: 'SENT',
    issueDate: '2026-09-10',
    dueDate: '2026-09-24',
    paidDate: null,
    paymentMethod: 'Corporate NetBanking',
    notes: 'Follow-up call logged by accounts on Sep 12.'
  },
  {
    id: 'INV-2026-0905',
    invoiceNumber: 'TM-INV-9825',
    clientName: 'Castrol Lubricants Hub',
    clientType: 'Partner',
    stream: 'Verification Fees & Ads',
    streamId: 'other',
    description: 'Promotional Banner & Roadside Amenity Co-Branding (Sep 2026)',
    amount: 15000,
    gstAmount: 2700,
    totalAmount: 17700,
    status: 'PAID',
    issueDate: '2026-09-02',
    dueDate: '2026-09-16',
    paidDate: '2026-09-06',
    paymentMethod: 'Razorpay Auto-Debit',
    notes: 'Monthly sponsorship tier.'
  },
  {
    id: 'INV-2026-0906',
    invoiceNumber: 'TM-INV-9826',
    clientName: 'Bhilwara Transport Syndicate',
    clientType: 'Transporter',
    stream: 'Matchmaking Commissions',
    streamId: 'matchmaking',
    description: 'Bulk Driver Induction & Medical Clearance (6 Drivers)',
    amount: 22000,
    gstAmount: 3960,
    totalAmount: 25960,
    status: 'OVERDUE',
    issueDate: '2026-08-15',
    dueDate: '2026-08-30',
    paidDate: null,
    paymentMethod: 'Cheque Pending Clearance',
    notes: 'SLA overdue alert triggered. Manager Aditya Kumar notified.'
  },
  {
    id: 'INV-2026-0907',
    invoiceNumber: 'TM-INV-9827',
    clientName: 'Ashok Leyland Driving Academy',
    clientType: 'Partner',
    stream: 'Partner Referrals & OEM',
    streamId: 'partners',
    description: 'Academy Certified Driver Placement Fee (12 Candidates)',
    amount: 36000,
    gstAmount: 6480,
    totalAmount: 42480,
    status: 'DRAFT',
    issueDate: '2026-09-14',
    dueDate: '2026-09-28',
    paidDate: null,
    paymentMethod: 'NEFT',
    notes: 'Draft awaiting manager approval.'
  }
];

export const AGING_BUCKETS = [
  { bucket: '0 - 30 Days', amount: 59590, count: 2, status: 'NORMAL', color: '#10B981' },
  { bucket: '31 - 60 Days', amount: 25960, count: 1, status: 'ATTENTION', color: '#F59E0B' },
  { bucket: '61 - 90 Days', amount: 8400, count: 1, status: 'CRITICAL', color: '#EF4444' },
  { bucket: '90+ Days', amount: 3200, count: 1, status: 'DEFAULT', color: '#6B7280' }
];

export const REVENUE_FORECAST = [
  { month: 'Jul 2026', actual: 298000, forecast: 290000, target: 280000 },
  { month: 'Aug 2026', actual: 322000, forecast: 315000, target: 300000 },
  { month: 'Sep 2026 (MTD)', actual: 343528, forecast: 345000, target: 330000 },
  { month: 'Oct 2026 (Proj)', actual: null, forecast: 385000, target: 360000 },
  { month: 'Nov 2026 (Proj)', actual: null, forecast: 425000, target: 400000 },
  { month: 'Dec 2026 (Proj)', actual: null, forecast: 480000, target: 450000 }
];

const STORAGE_KEY = 'tm_one_revenue_invoices_v1';

export const getInvoices = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse invoices from storage', err);
  }
  return INITIAL_INVOICES;
};

export const saveInvoices = (invoices) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
    window.dispatchEvent(new Event('tm_revenue_updated'));
  } catch (err) {
    console.error('Failed to save invoices to storage', err);
  }
};

export const addInvoice = (invoiceData) => {
  const current = getInvoices();
  const newInvoice = {
    ...invoiceData,
    id: `INV-${Date.now()}`,
    invoiceNumber: `TM-INV-${Math.floor(1000 + Math.random() * 9000)}`,
    gstAmount: Math.round(invoiceData.amount * 0.18),
    totalAmount: Math.round(invoiceData.amount * 1.18),
    status: invoiceData.status || 'SENT',
    issueDate: invoiceData.issueDate || new Date().toISOString().split('T')[0]
  };
  const updated = [newInvoice, ...current];
  saveInvoices(updated);
  return newInvoice;
};

export const updateInvoice = (id, updates) => {
  const current = getInvoices();
  const updated = current.map((inv) => {
    if (inv.id === id) {
      const amount = updates.amount !== undefined ? updates.amount : inv.amount;
      const gstAmount = Math.round(amount * 0.18);
      const totalAmount = Math.round(amount * 1.18);
      return { ...inv, ...updates, amount, gstAmount, totalAmount };
    }
    return inv;
  });
  saveInvoices(updated);
  return updated.find((i) => i.id === id);
};
