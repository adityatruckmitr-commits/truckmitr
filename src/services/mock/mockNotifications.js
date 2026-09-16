/**
 * TruckMitr One — Dedicated Mock Service for Notifications Module
 * 
 * Provides cross-module event alerts referencing real entities, categorized by
 * Action Required, Reminder, and Info with deep linking.
 */

const NOTIF_STORAGE_KEY = 'tm_one_notifications';
const NOTIF_EVENT = 'tm_one_notifications_changed';

export const NOTIFICATION_CATEGORIES = [
  { id: 'ALL', label: 'All Notifications' },
  { id: 'ACTION_REQUIRED', label: 'Action Required', color: '#EF4444', bg: '#FEF2F2' },
  { id: 'REMINDER', label: 'Reminders', color: '#F59E0B', bg: '#FEF3C7' },
  { id: 'INFO', label: 'Informational', color: '#3B82F6', bg: '#EFF6FF' }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    category: 'ACTION_REQUIRED',
    title: 'Pending Leave Request: Sonam Sharma',
    message: 'Sonam Sharma submitted a 2-day Casual Leave request (12–13 Sep) awaiting manager approval.',
    timestamp: '10 mins ago',
    createdAt: '2026-09-14 14:20',
    module: 'leaves',
    link: '/one/approvals',
    isRead: false,
    severity: 'HIGH',
    entityId: 'LR-2609-01'
  },
  {
    id: 'notif-2',
    category: 'ACTION_REQUIRED',
    title: 'Expense Claim Submitted: ₹3,850',
    message: 'Aditya Kumar submitted a fuel expense claim for warehouse yard inspection.',
    timestamp: '45 mins ago',
    createdAt: '2026-09-14 13:45',
    module: 'expenses',
    link: '/one/approvals',
    isRead: false,
    severity: 'MEDIUM',
    entityId: 'EXP-2609-01'
  },
  {
    id: 'notif-3',
    category: 'ACTION_REQUIRED',
    title: 'Transporter KYC Under Review: Kumar Freight',
    message: 'Kumar Freight Forwarders registered with 8 trucks. GST and RC documents require verification.',
    timestamp: '2 hours ago',
    createdAt: '2026-09-14 12:30',
    module: 'transporters',
    link: '/one/transporters',
    isRead: false,
    severity: 'HIGH',
    entityId: 'TR-1004'
  },
  {
    id: 'notif-4',
    category: 'REMINDER',
    title: 'Matchmaking SLA Alert: Job #JB9823',
    message: 'Candidate interview scheduled on Sitapur → Hoshiarpur route is pending final placement decision.',
    timestamp: '3 hours ago',
    createdAt: '2026-09-14 11:30',
    module: 'matchmaking',
    link: '/one/matchmaking',
    isRead: false,
    severity: 'MEDIUM',
    entityId: 'JB9823'
  },
  {
    id: 'notif-5',
    category: 'REMINDER',
    title: 'Overdue Telecaller Callbacks (17 Leads)',
    message: '17 transporter callback requests have exceeded the 2-hour SLA response window.',
    timestamp: '4 hours ago',
    createdAt: '2026-09-14 10:30',
    module: 'crm',
    link: '/one/crm',
    isRead: false,
    severity: 'HIGH',
    entityId: 'CRM-QUEUE'
  },
  {
    id: 'notif-6',
    category: 'INFO',
    title: 'Payroll September Run Disbursed',
    message: 'Direct bank NEFT processed for 5 staff members (₹2,42,000 total net payout).',
    timestamp: '1 day ago',
    createdAt: '2026-09-13 18:00',
    module: 'payroll',
    link: '/one/payroll',
    isRead: true,
    severity: 'LOW',
    entityId: 'PAY-202609-01'
  },
  {
    id: 'notif-7',
    category: 'INFO',
    title: 'New Partner Onboarded: Tata Motors CV',
    message: 'National OEM agreement signed for driver placement and BS6 test drives.',
    timestamp: '2 days ago',
    createdAt: '2026-09-12 16:00',
    module: 'partners',
    link: '/one/partners',
    isRead: true,
    severity: 'LOW',
    entityId: 'PTR-OEM-01'
  },
  {
    id: 'notif-8',
    category: 'INFO',
    title: 'Security Audit: Admin Permissions Modified',
    message: 'Super Administrator Deepak Arora updated role-level permissions for Operations Manager.',
    timestamp: '3 days ago',
    createdAt: '2026-09-11 14:00',
    module: 'audit-logs',
    link: '/one/audit-logs',
    isRead: true,
    severity: 'LOW',
    entityId: 'AUD-1002'
  }
];

export const notifyNotificationsChanged = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(NOTIF_EVENT));
  }
};

export const subscribeToNotifications = (callback) => {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(NOTIF_EVENT, callback);
  return () => window.removeEventListener(NOTIF_EVENT, callback);
};

export const getNotifications = () => {
  if (typeof window === 'undefined') return INITIAL_NOTIFICATIONS;
  const val = localStorage.getItem(NOTIF_STORAGE_KEY);
  if (!val) {
    localStorage.setItem(NOTIF_STORAGE_KEY, JSON.stringify(INITIAL_NOTIFICATIONS));
    return INITIAL_NOTIFICATIONS;
  }
  try {
    return JSON.parse(val);
  } catch (e) {
    return INITIAL_NOTIFICATIONS;
  }
};

export const markAsRead = (id) => {
  const current = getNotifications();
  const updated = current.map((n) => (n.id === id ? { ...n, isRead: true } : n));
  if (typeof window !== 'undefined') {
    localStorage.setItem(NOTIF_STORAGE_KEY, JSON.stringify(updated));
    notifyNotificationsChanged();
  }
  return updated;
};

export const markAllAsRead = () => {
  const current = getNotifications();
  const updated = current.map((n) => ({ ...n, isRead: true }));
  if (typeof window !== 'undefined') {
    localStorage.setItem(NOTIF_STORAGE_KEY, JSON.stringify(updated));
    notifyNotificationsChanged();
  }
  return updated;
};

export const getUnreadNotificationsCount = () => {
  const all = getNotifications();
  return all.filter((n) => !n.isRead).length;
};
