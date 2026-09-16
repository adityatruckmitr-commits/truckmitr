/**
 * TruckMitr One — Dedicated Mock Service for Audit Logs & Security
 * 
 * Provides structured audit records with Old/New values, IP tracking, 
 * user actors, and severity levels per RBAC schema.
 */

export const AUDIT_ACTIONS = [
  { id: 'CREATE', label: 'CREATE', color: '#10B981', bg: '#ECFDF5' },
  { id: 'UPDATE', label: 'UPDATE', color: '#3B82F6', bg: '#EFF6FF' },
  { id: 'DELETE', label: 'DELETE', color: '#EF4444', bg: '#FEF2F2' },
  { id: 'APPROVE', label: 'APPROVE', color: '#8B5CF6', bg: '#F3E8FF' },
  { id: 'REJECT', label: 'REJECT', color: '#F59E0B', bg: '#FEF3C7' },
  { id: 'LOGIN', label: 'LOGIN', color: '#06B6D4', bg: '#ECFEFF' },
  { id: 'EXPORT', label: 'EXPORT', color: '#64748B', bg: '#F1F5F9' }
];

export const AUDIT_MODULES = [
  'drivers',
  'transporters',
  'matchmaking',
  'crm',
  'payroll',
  'expenses',
  'leaves',
  'employees',
  'users',
  'roles',
  'settings'
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: 'aud-1001',
    timestamp: '2026-09-14 14:30:22',
    user: {
      id: 'usr-ceo-1',
      name: 'Anil Kumar',
      email: 'anil.kumar@truckmitr.com',
      role: 'CEO',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80'
    },
    module: 'payroll',
    action: 'APPROVE',
    recordId: 'PAY-202609-01',
    recordName: 'Salary Run Batch Sep 2026',
    ipAddress: '103.94.12.56',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/128.0',
    severity: 'HIGH',
    summary: 'Approved executive payroll disbursement of ₹2,83,000 for September 2026',
    changes: {
      oldValues: { status: 'PENDING_APPROVAL', disbursementDate: null },
      newValues: { status: 'PAID', disbursementDate: '2026-09-14', approvedBy: 'Anil Kumar' }
    }
  },
  {
    id: 'aud-1002',
    timestamp: '2026-09-14 14:15:10',
    user: {
      id: 'usr-admin-1',
      name: 'Deepak Arora',
      email: 'deepak.arora@truckmitr.com',
      role: 'Super Admin',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80'
    },
    module: 'roles',
    action: 'UPDATE',
    recordId: 'role-manager',
    recordName: 'Operations Manager Permissions',
    ipAddress: '103.94.12.78',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Chrome/128.0',
    severity: 'CRITICAL',
    summary: 'Updated role permission: Granted expenses.approve to Operations Manager',
    changes: {
      oldValues: { 'expenses.approve': false, 'expenses.scope': 'DEPARTMENT' },
      newValues: { 'expenses.approve': true, 'expenses.scope': 'DEPARTMENT' }
    }
  },
  {
    id: 'aud-1003',
    timestamp: '2026-09-14 13:45:00',
    user: {
      id: 'usr-manager-1',
      name: 'Aditya Kumar',
      email: 'aditya.kumar@truckmitr.com',
      role: 'Manager',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80'
    },
    module: 'matchmaking',
    action: 'UPDATE',
    recordId: 'MM-901',
    recordName: 'Match: Ravi Kumar → Sharma Logistics',
    ipAddress: '49.36.22.11',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/127.0',
    severity: 'MEDIUM',
    summary: 'Advanced candidate stage from Selected to Joined & Deployed',
    changes: {
      oldValues: { stage: 'SELECTED', truckAssigned: false },
      newValues: { stage: 'JOINED', truckAssigned: true, joiningDate: '2026-09-14' }
    }
  },
  {
    id: 'aud-1004',
    timestamp: '2026-09-14 12:20:18',
    user: {
      id: 'usr-hr-1',
      name: 'Pratima Singh',
      email: 'pratima.singh@truckmitr.com',
      role: 'HR Lead',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&h=80&q=80'
    },
    module: 'employees',
    action: 'CREATE',
    recordId: 'TMEMP008',
    recordName: 'New Employee Profile: Vikram Malhotra',
    ipAddress: '103.94.12.33',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Edge/128.0',
    severity: 'MEDIUM',
    summary: 'Onboarded new employee Vikram Malhotra as Finance Officer in Executive & Finance',
    changes: {
      oldValues: null,
      newValues: { employeeId: 'TMEMP008', name: 'Vikram Malhotra', department: 'dept-fin', role: 'Staff' }
    }
  },
  {
    id: 'aud-1005',
    timestamp: '2026-09-14 11:10:00',
    user: {
      id: 'usr-tele-2',
      name: 'Raksha Verma',
      email: 'raksha.verma@truckmitr.com',
      role: 'Telecaller',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&h=80&q=80'
    },
    module: 'crm',
    action: 'CREATE',
    recordId: 'CALL-260914-082',
    recordName: 'Call Log: Suresh Yadav',
    ipAddress: '49.36.21.89',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/128.0',
    severity: 'LOW',
    summary: 'Logged 4m 12s call with driver Suresh Yadav — Confirmed interview on NH-48 corridor',
    changes: {
      oldValues: null,
      newValues: { durationSeconds: 252, outcome: 'CONNECTED', followUpNeeded: false }
    }
  },
  {
    id: 'aud-1006',
    timestamp: '2026-09-14 10:05:12',
    user: {
      id: 'usr-admin-1',
      name: 'Deepak Arora',
      email: 'deepak.arora@truckmitr.com',
      role: 'Super Admin',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80'
    },
    module: 'transporters',
    action: 'APPROVE',
    recordId: 'TR-1001',
    recordName: 'Sharma Logistics & Fleet Services',
    ipAddress: '103.94.12.78',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Chrome/128.0',
    severity: 'HIGH',
    summary: 'Approved GST & Master Transporter Agreement for Sharma Logistics (24 Trucks)',
    changes: {
      oldValues: { verificationStatus: 'UNDER REVIEW', status: 'PENDING' },
      newValues: { verificationStatus: 'VERIFIED', status: 'ACTIVE' }
    }
  },
  {
    id: 'aud-1007',
    timestamp: '2026-09-14 09:30:45',
    user: {
      id: 'usr-ceo-1',
      name: 'Anil Kumar',
      email: 'anil.kumar@truckmitr.com',
      role: 'CEO',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80'
    },
    module: 'users',
    action: 'LOGIN',
    recordId: 'usr-ceo-1',
    recordName: 'Session Authentication',
    ipAddress: '103.94.12.56',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/128.0',
    severity: 'LOW',
    summary: 'Successful 2FA corporate login from verified static IP 103.94.12.56',
    changes: {
      oldValues: { lastLogin: '2026-09-13 18:22:01' },
      newValues: { lastLogin: '2026-09-14 09:30:45', sessionActive: true }
    }
  },
  {
    id: 'aud-1008',
    timestamp: '2026-09-13 17:40:00',
    user: {
      id: 'usr-manager-1',
      name: 'Aditya Kumar',
      email: 'aditya.kumar@truckmitr.com',
      role: 'Manager',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80'
    },
    module: 'drivers',
    action: 'EXPORT',
    recordId: 'EXPORT-DRV-2609',
    recordName: 'Driver Roster CSV',
    ipAddress: '49.36.22.11',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/127.0',
    severity: 'MEDIUM',
    summary: 'Exported active HMV driver list (250 records) for Regional RTO Compliance',
    changes: {
      oldValues: null,
      newValues: { format: 'CSV', recordCount: 250, filter: { state: 'Haryana', type: 'HMV' } }
    }
  }
];

export const getAuditLogs = () => {
  if (typeof window === 'undefined') return INITIAL_AUDIT_LOGS;
  const val = localStorage.getItem('tm_one_audit_logs');
  if (!val) {
    localStorage.setItem('tm_one_audit_logs', JSON.stringify(INITIAL_AUDIT_LOGS));
    return INITIAL_AUDIT_LOGS;
  }
  try {
    return JSON.parse(val);
  } catch (e) {
    return INITIAL_AUDIT_LOGS;
  }
};

export const addAuditLog = (entry) => {
  const current = getAuditLogs();
  const newEntry = {
    id: `aud-${Date.now()}`,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    ipAddress: '103.94.12.56',
    userAgent: navigator.userAgent || 'TruckMitr Internal OS',
    severity: 'MEDIUM',
    ...entry
  };
  const updated = [newEntry, ...current];
  if (typeof window !== 'undefined') {
    localStorage.setItem('tm_one_audit_logs', JSON.stringify(updated));
  }
  return newEntry;
};
