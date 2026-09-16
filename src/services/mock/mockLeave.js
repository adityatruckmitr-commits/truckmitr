/**
 * TruckMitr One — Dedicated Mock Service for Leave Management Module
 */

export const LEAVE_TYPES = [
  { id: 'CASUAL', label: 'Casual Leave (CL)', maxDays: 12, color: '#3B82F6', bg: '#EFF6FF' },
  { id: 'SICK', label: 'Sick / Medical Leave (SL)', maxDays: 10, color: '#10B981', bg: '#ECFDF5' },
  { id: 'EARNED', label: 'Earned / Privilege Leave (EL)', maxDays: 15, color: '#8B5CF6', bg: '#F3E8FF' }
];

export const INITIAL_LEAVE_REQUESTS = [
  {
    id: 'lv-101',
    requestCode: 'LR-2609-01',
    employeeId: 'TMEMP005',
    employeeName: 'Sonam Sharma',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=80&h=80&q=80',
    departmentId: 'dept-sales',
    departmentName: 'Sales & Growth',
    leaveType: 'CASUAL',
    leaveTypeName: 'Casual Leave',
    startDate: '2026-09-12',
    endDate: '2026-09-13',
    daysCount: 2,
    reason: 'Family function in hometown (Mathura)',
    status: 'PENDING_APPROVAL',
    appliedOn: '2026-09-10 10:45',
    balanceRemaining: 7,
    approverName: 'Aditya Kumar (Manager)'
  },
  {
    id: 'lv-102',
    requestCode: 'LR-2609-02',
    employeeId: 'TMEMP003',
    employeeName: 'Aditya Kumar',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80',
    departmentId: 'dept-ops',
    departmentName: 'Operations & Fleet',
    leaveType: 'SICK',
    leaveTypeName: 'Sick Leave',
    startDate: '2026-09-11',
    endDate: '2026-09-11',
    daysCount: 1,
    reason: 'Dental surgery and post-op recovery',
    status: 'APPROVED',
    appliedOn: '2026-09-09 16:20',
    balanceRemaining: 8,
    approverName: 'Anil Kumar (CEO)'
  },
  {
    id: 'lv-103',
    requestCode: 'LR-2609-03',
    employeeId: 'TMEMP007',
    employeeName: 'Kamini Verma',
    avatarUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=80&h=80&q=80',
    departmentId: 'dept-sales',
    departmentName: 'Sales & Growth',
    leaveType: 'CASUAL',
    leaveTypeName: 'Casual Leave',
    startDate: '2026-09-06',
    endDate: '2026-09-06',
    daysCount: 1,
    reason: 'Personal urgent bank work',
    status: 'REJECTED',
    appliedOn: '2026-09-05 14:00',
    balanceRemaining: 9,
    approverName: 'Sonam Sharma (Lead)'
  },
  {
    id: 'lv-104',
    requestCode: 'LR-2609-04',
    employeeId: 'TMEMP006',
    employeeName: 'Raksha Patel',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&h=80&q=80',
    departmentId: 'dept-ops',
    departmentName: 'Operations & Fleet',
    leaveType: 'EARNED',
    leaveTypeName: 'Earned Leave',
    startDate: '2026-09-20',
    endDate: '2026-09-23',
    daysCount: 4,
    reason: 'Outstation festival travel',
    status: 'PENDING_APPROVAL',
    appliedOn: '2026-09-10 11:15',
    balanceRemaining: 11,
    approverName: 'Aditya Kumar (Manager)'
  }
];

export const MY_LEAVE_BALANCES = {
  CASUAL: { allocated: 12, used: 4, remaining: 8 },
  SICK: { allocated: 10, used: 2, remaining: 8 },
  EARNED: { allocated: 15, used: 3, remaining: 12 }
};
