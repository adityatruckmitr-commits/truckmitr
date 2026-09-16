/**
 * TruckMitr One — Dedicated Mock Service for Workflows Module
 * 
 * Provides automated rule definitions tied to real system module event triggers,
 * conditions, actions, and historical execution run logs.
 */

const WORKFLOWS_STORAGE_KEY = 'tm_one_workflows_data';

export const WORKFLOW_TRIGGERS = [
  { id: 'LEAVE_SUBMITTED', label: 'Leave Request Submitted', module: 'leaves', icon: 'CalendarOff' },
  { id: 'EXPENSE_SUBMITTED', label: 'Expense Claim Submitted', module: 'expenses', icon: 'Receipt' },
  { id: 'DRIVER_REGISTERED', label: 'New Driver Registration', module: 'drivers', icon: 'UserCheck' },
  { id: 'TRANSPORTER_REGISTERED', label: 'New Transporter Registered', module: 'transporters', icon: 'Truck' },
  { id: 'MATCH_DEPLOYED', label: 'Candidate Joined & Deployed', module: 'matchmaking', icon: 'Award' },
  { id: 'SLA_BREACHED', label: 'Matchmaking SLA Breached (>48h)', module: 'matchmaking', icon: 'AlertTriangle' },
  { id: 'PARTNER_AGREEMENT_READY', label: 'Partner Agreement Signed', module: 'partners', icon: 'Handshake' },
  { id: 'PAYROLL_CALCULATED', label: 'Monthly Payroll Run Generated', module: 'payroll', icon: 'CreditCard' }
];

export const WORKFLOW_ACTIONS = [
  { id: 'ASSIGN_TASK', label: 'Create & Assign Task to Role/User' },
  { id: 'SEND_NOTIFICATION', label: 'Send High-Priority Notification' },
  { id: 'ESCALATE_TO_CEO', label: 'Escalate to CEO Action Centre' },
  { id: 'AUTO_APPROVE', label: 'Auto-Approve Low Value Claim' },
  { id: 'NOTIFY_TELECALLER', label: 'Dispatch Verification Call to Telecaller' }
];

export const INITIAL_WORKFLOWS = [
  {
    id: 'wf-101',
    code: 'WF-EXP-01',
    name: 'High-Value Expense CEO Escalation',
    description: 'Automatically route any reimbursement claim above ₹3,000 to CEO Action Centre for dual financial authorization.',
    trigger: 'EXPENSE_SUBMITTED',
    triggerLabel: 'Expense Claim Submitted',
    module: 'expenses',
    condition: 'Claim Amount > ₹3,000',
    action: 'ESCALATE_TO_CEO',
    actionLabel: 'Escalate to CEO Action Centre',
    status: 'ACTIVE',
    runCount: 42,
    lastRun: '2026-09-14 14:30',
    createdAt: '2026-08-01',
    author: 'Deepak Arora (Admin)',
    recentRuns: [
      { id: 'run-1', timestamp: '2026-09-14 14:30', triggeredBy: 'Aditya Kumar (EXP-2609-01, ₹3,850)', status: 'SUCCESS', details: 'Escalated to CEO Action Centre' },
      { id: 'run-2', timestamp: '2026-09-05 12:00', triggeredBy: 'Deepak Arora (EXP-2609-03, ₹4,200)', status: 'SUCCESS', details: 'Dual approval task created' },
      { id: 'run-3', timestamp: '2026-08-28 16:15', triggeredBy: 'Karan Mehta (EXP-2608-12, ₹3,500)', status: 'SUCCESS', details: 'Notification dispatched to Anil Kumar' }
    ]
  },
  {
    id: 'wf-102',
    code: 'WF-DRV-02',
    name: 'Instant Driver Telecaller Dispatch',
    description: 'When a new driver self-registers via the mobile app, automatically assign a KYC verification task to active telecallers.',
    trigger: 'DRIVER_REGISTERED',
    triggerLabel: 'New Driver Registration',
    module: 'drivers',
    condition: 'Registration Channel == Mobile App',
    action: 'NOTIFY_TELECALLER',
    actionLabel: 'Dispatch Verification Call to Telecaller',
    status: 'ACTIVE',
    runCount: 389,
    lastRun: '2026-09-14 11:20',
    createdAt: '2026-08-05',
    author: 'Aditya Kumar (Manager)',
    recentRuns: [
      { id: 'run-4', timestamp: '2026-09-14 11:20', triggeredBy: 'Suresh Yadav (TM2609235)', status: 'SUCCESS', details: 'Added to Sonam Sharma dialer queue' },
      { id: 'run-5', timestamp: '2026-09-13 15:40', triggeredBy: 'Ramesh Patel (TM2609238)', status: 'SUCCESS', details: 'Added to Raksha Verma dialer queue' }
    ]
  },
  {
    id: 'wf-103',
    code: 'WF-TRN-03',
    name: 'Transporter GST Auto-Verification Alert',
    description: 'Trigger admin verification audit whenever a transporter registers with fleet size greater than 10 trucks.',
    trigger: 'TRANSPORTER_REGISTERED',
    triggerLabel: 'New Transporter Registered',
    module: 'transporters',
    condition: 'Fleet Size >= 10 Trucks',
    action: 'ASSIGN_TASK',
    actionLabel: 'Create & Assign Task to Role/User',
    status: 'ACTIVE',
    runCount: 56,
    lastRun: '2026-09-10 10:15',
    createdAt: '2026-08-10',
    author: 'Deepak Arora (Admin)',
    recentRuns: [
      { id: 'run-6', timestamp: '2026-09-10 10:15', triggeredBy: 'Sharma Logistics (TR-1001, 24 Trucks)', status: 'SUCCESS', details: 'Admin verification task generated' },
      { id: 'run-7', timestamp: '2026-08-28 11:00', triggeredBy: 'Singh Roadlines (TR-1003, 18 Trucks)', status: 'SUCCESS', details: 'Compliance review completed' }
    ]
  },
  {
    id: 'wf-104',
    code: 'WF-MAT-04',
    name: 'Matchmaking 48h SLA Escalation Guard',
    description: 'Monitor candidate interview pipeline stages and flag overdue items exceeding 48 hours to Operations Manager.',
    trigger: 'SLA_BREACHED',
    triggerLabel: 'Matchmaking SLA Breached (>48h)',
    module: 'matchmaking',
    condition: 'Days in Stage > 2 Days',
    action: 'SEND_NOTIFICATION',
    actionLabel: 'Send High-Priority Notification',
    status: 'ACTIVE',
    runCount: 18,
    lastRun: '2026-09-14 09:00',
    createdAt: '2026-08-15',
    author: 'Anil Kumar (CEO)',
    recentRuns: [
      { id: 'run-8', timestamp: '2026-09-14 09:00', triggeredBy: 'Job #JB9823 (Sitapur → Hoshiarpur)', status: 'SUCCESS', details: 'Exception banner raised on Cockpit' }
    ]
  },
  {
    id: 'wf-105',
    code: 'WF-LEV-05',
    name: 'Multi-Day Leave Manager Notification',
    description: 'Notify Department Head and update shared team calendar whenever a staff member requests >1 consecutive day off.',
    trigger: 'LEAVE_SUBMITTED',
    triggerLabel: 'Leave Request Submitted',
    module: 'leaves',
    condition: 'Days Count > 1 Day',
    action: 'SEND_NOTIFICATION',
    actionLabel: 'Send High-Priority Notification',
    status: 'PAUSED',
    runCount: 24,
    lastRun: '2026-09-10 10:45',
    createdAt: '2026-08-20',
    author: 'Pratima Singh (HR)',
    recentRuns: [
      { id: 'run-9', timestamp: '2026-09-10 10:45', triggeredBy: 'Sonam Sharma (2 Days CL)', status: 'SUCCESS', details: 'Dispatched push notification to Aditya Kumar' }
    ]
  }
];

export const getWorkflows = () => {
  if (typeof window === 'undefined') return INITIAL_WORKFLOWS;
  const val = localStorage.getItem(WORKFLOWS_STORAGE_KEY);
  if (!val) {
    localStorage.setItem(WORKFLOWS_STORAGE_KEY, JSON.stringify(INITIAL_WORKFLOWS));
    return INITIAL_WORKFLOWS;
  }
  try {
    return JSON.parse(val);
  } catch (e) {
    return INITIAL_WORKFLOWS;
  }
};

export const saveWorkflows = (workflows) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(WORKFLOWS_STORAGE_KEY, JSON.stringify(workflows));
  }
};

export const createWorkflow = (wfData) => {
  const current = getWorkflows();
  const newWf = {
    id: `wf-${Date.now()}`,
    code: `WF-AUTO-${String(current.length + 1).padStart(2, '0')}`,
    createdAt: new Date().toISOString().substring(0, 10),
    runCount: 0,
    lastRun: 'Never',
    status: 'ACTIVE',
    recentRuns: [],
    ...wfData
  };
  const updated = [newWf, ...current];
  saveWorkflows(updated);
  return newWf;
};

export const toggleWorkflowStatus = (id) => {
  const current = getWorkflows();
  const updated = current.map((w) =>
    w.id === id ? { ...w, status: w.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE' } : w
  );
  saveWorkflows(updated);
  return updated;
};

export const deleteWorkflow = (id) => {
  const current = getWorkflows();
  const updated = current.filter((w) => w.id !== id);
  saveWorkflows(updated);
  return updated;
};
