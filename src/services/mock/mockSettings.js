/**
 * TruckMitr One — System Settings Mock Service
 * 
 * Organization-wide configuration and governance settings.
 */

export const INITIAL_COMPANY_PROFILE = {
  companyName: 'TruckMitr Logistics Technologies Pvt. Ltd.',
  brandTagline: 'Empowering India’s Truck Drivers & Fleet Owners',
  cin: 'U72900DL2024PTC394821',
  gstin: '07AABCT8921K1Z4',
  pan: 'AABCT8921K',
  headquarters: 'Unit 402, Signature Tower B, South City 1, Gurugram, Haryana - 122001',
  primaryEmail: 'admin@truckmitr.com',
  supportPhone: '+91 1800 890 2345',
  website: 'https://truckmitr.com'
};

export const INITIAL_NOTIFICATION_PREFERENCES = [
  {
    id: 'notif-sla-breach',
    title: 'SLA Escalation & Overdue Alert',
    description: 'Dispatch immediate push notifications and SMS to department heads when an SLA crosses 24h.',
    enabled: true,
    channel: 'Email + SMS'
  },
  {
    id: 'notif-high-expense',
    title: 'High-Value Expense Notification (> ₹10,000)',
    description: 'Notify CEO and Finance Lead immediately upon submission of high-value reimbursement claims.',
    enabled: true,
    channel: 'Email + Push'
  },
  {
    id: 'notif-transporter-kyc',
    title: 'Transporter KYC & Fleet Verification Queue',
    description: 'Alert Operations team whenever a new transporter submits commercial registration documents.',
    enabled: true,
    channel: 'Push + Slack Webhook'
  },
  {
    id: 'notif-attendance-digest',
    title: 'Daily Morning Attendance Digest (09:30 AM)',
    description: 'Send automated workforce attendance summary to HR and executive management.',
    enabled: false,
    channel: 'Email'
  }
];

export const INITIAL_INTEGRATIONS = [
  {
    id: 'integ-razorpay',
    name: 'Razorpay Payment Gateway',
    category: 'Billing & Payments',
    status: 'CONNECTED',
    apiKeyMasked: 'rzp_live_••••••••••••8912',
    lastSync: '2026-09-14 11:20:00',
    description: 'Auto-debit fleet subscription plans, instant driver verification fee collection.'
  },
  {
    id: 'integ-gupshup',
    name: 'Gupshup WhatsApp Enterprise',
    category: 'Messaging & CRM',
    status: 'CONNECTED',
    apiKeyMasked: 'gup_waba_••••••••••••3319',
    lastSync: '2026-09-14 11:45:10',
    description: 'Automated job notification alerts, OTP verifications, and candidate interview reminders.'
  },
  {
    id: 'integ-surepass',
    name: 'Surepass Gov Verification APIs',
    category: 'Identity Verification',
    status: 'CONNECTED',
    apiKeyMasked: 'sp_live_••••••••••••7741',
    lastSync: '2026-09-14 11:50:00',
    description: 'Real-time Sarathi Driving Licence, Aadhaar OTP verification, and Court record checks.'
  },
  {
    id: 'integ-vahan',
    name: 'NIC Vahan Vehicle Registry API',
    category: 'Fleet Compliance',
    status: 'CONNECTED',
    apiKeyMasked: 'vahan_gov_••••••••••••1029',
    lastSync: '2026-09-14 10:15:00',
    description: 'Real-time vehicle fitness, road tax, permit, and pollution certificate verification.'
  },
  {
    id: 'integ-tally',
    name: 'Tally Prime ERP & Accounting Sync',
    category: 'ERP & Finance',
    status: 'DISCONNECTED',
    apiKeyMasked: 'Not configured',
    lastSync: 'Never',
    description: 'Bi-directional synchronization of payroll ledgers, vendor payouts, and invoicing.'
  }
];

export const INITIAL_SECURITY_SETTINGS = {
  sessionTimeoutMinutes: '30',
  require2FA: true,
  passwordMinLength: '8',
  enforcePasswordComplexity: true,
  ipWhitelistEnabled: false,
  allowedIpRanges: '103.94.12.0/24, 49.36.21.0/24',
  auditRetentionDays: '365'
};

const STORAGE_KEY = 'tm_one_system_settings_v1';

export const getSystemSettings = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse system settings', err);
  }
  return {
    company: INITIAL_COMPANY_PROFILE,
    notifications: INITIAL_NOTIFICATION_PREFERENCES,
    integrations: INITIAL_INTEGRATIONS,
    security: INITIAL_SECURITY_SETTINGS
  };
};

export const saveSystemSettings = (settings) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    window.dispatchEvent(new Event('tm_settings_updated'));
  } catch (err) {
    console.error('Failed to save system settings', err);
  }
};
