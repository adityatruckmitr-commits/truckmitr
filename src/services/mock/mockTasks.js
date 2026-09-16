/**
 * TruckMitr One — Dedicated Mock Service for Tasks Module
 * 
 * Supports list and Kanban board views with entity linking chips, priorities,
 * due dates, assignees, and CRUD mutations.
 */

const TASKS_STORAGE_KEY = 'tm_one_tasks_data';
const TASKS_EVENT = 'tm_one_tasks_changed';

export const TASK_STATUSES = [
  { id: 'TODO', label: 'To Do', color: '#64748B', bg: '#F1F5F9', border: '#CBD5E1' },
  { id: 'IN_PROGRESS', label: 'In Progress', color: '#3B82F6', bg: '#EFF6FF', border: '#BFDBFE' },
  { id: 'REVIEW', label: 'Under Review', color: '#F59E0B', bg: '#FEF3C7', border: '#FDE68A' },
  { id: 'DONE', label: 'Completed', color: '#10B981', bg: '#ECFDF5', border: '#A7F3D0' },
  { id: 'OVERDUE', label: 'Overdue SLA', color: '#EF4444', bg: '#FEF2F2', border: '#FECACA' }
];

export const TASK_PRIORITIES = [
  { id: 'URGENT', label: 'Urgent', color: '#DC2626', bg: '#FEE2E2' },
  { id: 'HIGH', label: 'High', color: '#EA580C', bg: '#FFEDD5' },
  { id: 'MEDIUM', label: 'Medium', color: '#2563EB', bg: '#DBEAFE' },
  { id: 'LOW', label: 'Low', color: '#4B5563', bg: '#F3F4F6' }
];

export const INITIAL_TASKS = [
  {
    id: 'tsk-101',
    taskCode: 'TSK-2609-01',
    title: 'Verify RC & Permit documents for Kumar Freight',
    description: 'Verify 8 open body 12-ton truck commercial permits before activating job postings on Nagpur → Bhopal corridor.',
    assignee: {
      id: 'usr-admin-1',
      name: 'Deepak Arora',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80',
      role: 'Super Admin'
    },
    department: 'Operations',
    dueDate: '2026-09-15',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    linkedEntity: {
      type: 'Transporter',
      id: 'TR-1004',
      title: 'Kumar Freight Forwarders',
      route: '/one/transporters'
    },
    createdAt: '2026-09-12 11:30',
    completionNotes: ''
  },
  {
    id: 'tsk-102',
    taskCode: 'TSK-2609-02',
    title: 'Sign MoU agreement with Highway King Dhabas',
    description: 'Execute finalized service agreement for driver welfare amenities, clean resting rooms, and meal discounts on NH-48.',
    assignee: {
      id: 'usr-ceo-1',
      name: 'Anil Kumar',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80',
      role: 'CEO'
    },
    department: 'Executive & Growth',
    dueDate: '2026-09-16',
    status: 'TODO',
    priority: 'MEDIUM',
    linkedEntity: {
      type: 'Partner',
      id: 'PTR-SRV-05',
      title: 'Highway King Dhabas & Amenities',
      route: '/one/partners'
    },
    createdAt: '2026-09-13 14:00',
    completionNotes: ''
  },
  {
    id: 'tsk-103',
    taskCode: 'TSK-2609-03',
    title: 'Resolve SLA breach on Sitapur → Hoshiarpur route',
    description: 'Job #JB9823 candidate shortlist has been stalled for 48 hours. Follow up with fleet manager Karan Sharma.',
    assignee: {
      id: 'usr-manager-1',
      name: 'Aditya Kumar',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80',
      role: 'Manager'
    },
    department: 'Operations',
    dueDate: '2026-09-14',
    status: 'OVERDUE',
    priority: 'URGENT',
    linkedEntity: {
      type: 'Matchmaking Job',
      id: 'JB9823',
      title: 'Job #JB9823 (Sharma Logistics)',
      route: '/one/matchmaking'
    },
    createdAt: '2026-09-11 09:00',
    completionNotes: ''
  },
  {
    id: 'tsk-104',
    taskCode: 'TSK-2609-04',
    title: 'Complete Driving License check for Amit Singh',
    description: 'Cross-check Sarathi commercial trailer DL records for candidate TM2609236 before placement dispatch.',
    assignee: {
      id: 'usr-tele-1',
      name: 'Sonam Sharma',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=80&h=80&q=80',
      role: 'Telecaller'
    },
    department: 'Sales & Calling',
    dueDate: '2026-09-15',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    linkedEntity: {
      type: 'Driver',
      id: 'TM2609236',
      title: 'Amit Singh (Trailer Driver)',
      route: '/one/drivers'
    },
    createdAt: '2026-09-14 10:15',
    completionNotes: ''
  },
  {
    id: 'tsk-105',
    taskCode: 'TSK-2609-05',
    title: 'Audit August ESIC and Statutory Deductions',
    description: 'Verify reconciliation between HR payroll calculations and central bank PF remittance challans.',
    assignee: {
      id: 'usr-hr-1',
      name: 'Pratima Singh',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&h=80&q=80',
      role: 'HR Lead'
    },
    department: 'Human Resources',
    dueDate: '2026-09-10',
    status: 'DONE',
    priority: 'MEDIUM',
    linkedEntity: {
      type: 'Payroll Batch',
      id: 'PAY-202609-01',
      title: 'Payroll September Run',
      route: '/one/payroll'
    },
    createdAt: '2026-09-08 15:30',
    completionNotes: 'All 7 employee records reconciled with ₹26,782 statutory challan paid.'
  }
];

export const notifyTasksChanged = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(TASKS_EVENT));
  }
};

export const subscribeToTasks = (callback) => {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(TASKS_EVENT, callback);
  return () => window.removeEventListener(TASKS_EVENT, callback);
};

export const getTasks = () => {
  if (typeof window === 'undefined') return INITIAL_TASKS;
  const val = localStorage.getItem(TASKS_STORAGE_KEY);
  if (!val) {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(INITIAL_TASKS));
    return INITIAL_TASKS;
  }
  try {
    return JSON.parse(val);
  } catch (e) {
    return INITIAL_TASKS;
  }
};

export const saveTasks = (tasks) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    notifyTasksChanged();
  }
};

export const createTask = (taskData) => {
  const current = getTasks();
  const newTask = {
    id: `tsk-${Date.now()}`,
    taskCode: `TSK-2609-${String(current.length + 1).padStart(2, '0')}`,
    createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    status: 'TODO',
    ...taskData
  };
  const updated = [newTask, ...current];
  saveTasks(updated);
  return newTask;
};

export const updateTask = (id, updates) => {
  const current = getTasks();
  const updated = current.map((t) => (t.id === id ? { ...t, ...updates } : t));
  saveTasks(updated);
  return updated;
};

export const deleteTask = (id) => {
  const current = getTasks();
  const updated = current.filter((t) => t.id !== id);
  saveTasks(updated);
  return updated;
};
