/**
 * TruckMitr One — Dedicated Mock Service for Expenses Module
 * Realistic operational spend consistent with company payroll & revenue scale.
 */

export const EXPENSE_CATEGORIES = [
  { id: 'FUEL', label: 'Fuel & Fleet Travel', color: '#3B82F6' },
  { id: 'TRAVEL', label: 'Interstate Client Travel', color: '#8B5CF6' },
  { id: 'CLIENT', label: 'Transporter Meetings & Meals', color: '#F59E0B' },
  { id: 'TELECOM', label: 'SIM Cards & Telecaller Data', color: '#10B981' },
  { id: 'OFFICE', label: 'Office Supplies & Peripherals', color: '#EC4899' },
  { id: 'MISC', label: 'Miscellaneous Operations', color: '#64748B' }
];

export const INITIAL_EXPENSES_DATA = [
  {
    id: 'exp-1',
    expenseCode: 'EXP-2609-01',
    submittedBy: {
      name: 'Aditya Kumar',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80',
      employeeId: 'TMEMP003'
    },
    departmentId: 'dept-ops',
    departmentName: 'Operations & Fleet',
    category: 'FUEL',
    categoryName: 'Fuel & Fleet Travel',
    amount: 3850,
    date: '2026-09-10',
    status: 'PENDING_APPROVAL',
    merchant: 'Indian Oil Petrol Pump, Sitapur Highway',
    notes: 'Fuel reimbursement for visiting Sharma Logistics warehouse yard inspection.',
    receiptUrl: 'https://images.unsplash.com/photo-1554415707-9e4c019d08e4?auto=format&fit=crop&w=600&h=400&q=80',
    approvalChain: [
      { step: 'Submission', actor: 'Aditya Kumar', timestamp: '10 Sep 2026 14:30', status: 'SUBMITTED', notes: 'Receipt attached' },
      { step: 'Manager Approval', actor: 'Anil Kumar (CEO)', timestamp: 'Pending', status: 'PENDING', notes: 'Awaiting financial review' }
    ]
  },
  {
    id: 'exp-2',
    expenseCode: 'EXP-2609-02',
    submittedBy: {
      name: 'Sonam Sharma',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=80&h=80&q=80',
      employeeId: 'TMEMP005'
    },
    departmentId: 'dept-sales',
    departmentName: 'Sales & Growth',
    category: 'TELECOM',
    categoryName: 'SIM Cards & Telecaller Data',
    amount: 1499,
    date: '2026-09-08',
    status: 'APPROVED',
    merchant: 'Airtel Enterprise Telephony',
    notes: 'Monthly bulk calling pack recharge for matchmaking dialer queues.',
    receiptUrl: 'https://images.unsplash.com/photo-1554415707-9e4c019d08e4?auto=format&fit=crop&w=600&h=400&q=80',
    approvalChain: [
      { step: 'Submission', actor: 'Sonam Sharma', timestamp: '08 Sep 2026 10:15', status: 'SUBMITTED', notes: 'Monthly invoice' },
      { step: 'Approval', actor: 'Aditya Kumar (Manager)', timestamp: '08 Sep 2026 16:00', status: 'APPROVED', notes: 'Verified telecom usage' }
    ]
  },
  {
    id: 'exp-3',
    expenseCode: 'EXP-2609-03',
    submittedBy: {
      name: 'Deepak Arora',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80',
      employeeId: 'TMEMP002'
    },
    departmentId: 'dept-tech',
    departmentName: 'Technology & Product',
    category: 'OFFICE',
    categoryName: 'Office Supplies & Peripherals',
    amount: 4200,
    date: '2026-09-05',
    status: 'APPROVED',
    merchant: 'Logitech Hub India',
    notes: '2x high-fidelity noise cancelling headsets for caller workstation.',
    receiptUrl: 'https://images.unsplash.com/photo-1554415707-9e4c019d08e4?auto=format&fit=crop&w=600&h=400&q=80',
    approvalChain: [
      { step: 'Submission', actor: 'Deepak Arora', timestamp: '05 Sep 2026 12:00', status: 'SUBMITTED', notes: 'Amazon commercial invoice' },
      { step: 'Approval', actor: 'Anil Kumar (CEO)', timestamp: '05 Sep 2026 17:30', status: 'APPROVED', notes: 'Approved for caller infrastructure' }
    ]
  },
  {
    id: 'exp-4',
    expenseCode: 'EXP-2609-04',
    submittedBy: {
      name: 'Raksha Patel',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&h=80&q=80',
      employeeId: 'TMEMP006'
    },
    departmentId: 'dept-ops',
    departmentName: 'Operations & Fleet',
    category: 'CLIENT',
    categoryName: 'Transporter Meetings & Meals',
    amount: 2150,
    date: '2026-09-07',
    status: 'PENDING_APPROVAL',
    merchant: 'Highway King Dhaba & Restaurant',
    notes: 'Lunch meeting with Patel Transport representatives for onboarding discussions.',
    receiptUrl: 'https://images.unsplash.com/photo-1554415707-9e4c019d08e4?auto=format&fit=crop&w=600&h=400&q=80',
    approvalChain: [
      { step: 'Submission', actor: 'Raksha Patel', timestamp: '07 Sep 2026 16:45', status: 'SUBMITTED', notes: 'Food & refreshments bill' },
      { step: 'Approval', actor: 'Aditya Kumar (Manager)', timestamp: 'Pending', status: 'PENDING', notes: 'Under manager review' }
    ]
  },
  {
    id: 'exp-5',
    expenseCode: 'EXP-2609-05',
    submittedBy: {
      name: 'Pratima Singh',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&h=80&q=80',
      employeeId: 'TMEMP004'
    },
    departmentId: 'dept-hr',
    departmentName: 'Human Resources',
    category: 'MISC',
    categoryName: 'Miscellaneous Operations',
    amount: 1800,
    date: '2026-09-02',
    status: 'REJECTED',
    merchant: 'Local Stationery Store',
    notes: 'Custom ID card printing without pre-approved PO.',
    receiptUrl: 'https://images.unsplash.com/photo-1554415707-9e4c019d08e4?auto=format&fit=crop&w=600&h=400&q=80',
    approvalChain: [
      { step: 'Submission', actor: 'Pratima Singh', timestamp: '02 Sep 2026 11:30', status: 'SUBMITTED', notes: 'Stationery receipt' },
      { step: 'Rejection', actor: 'Vikram Malhotra (Finance)', timestamp: '02 Sep 2026 15:00', status: 'REJECTED', notes: 'Must route via central vendor' }
    ]
  }
];

export const EXPENSE_BUDGET_STATS = {
  monthlyBudget: 45000,
  currentSpend: 13499,
  pendingApprovalsAmount: 6000
};
