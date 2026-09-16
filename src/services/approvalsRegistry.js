/**
 * TruckMitr One — Central Approvals Registry & Event Hub
 * 
 * Aggregates pending approval items from source modules (Leave, Expenses, Payroll, 
 * Partners, Transporters, Drivers, Matchmaking) into a unified dataset and ensures
 * bidirectional mutation synchronization across all screens.
 */

import { INITIAL_LEAVE_REQUESTS } from './mock/mockLeave';
import { INITIAL_EXPENSES_DATA } from './mock/mockExpenses';
import { INITIAL_PAYROLL_DATA } from './mock/mockPayroll';
import { INITIAL_PARTNERS_DATA } from './mock/mockPartners';
import { INITIAL_TRANSPORTERS_DATA } from './mock/mockTransporters';
import { INITIAL_DRIVERS_DATA } from './mock/mockDrivers';
import { INITIAL_MATCHES_DATA } from './mock/mockMatchmaking';

const STORAGE_KEYS = {
  LEAVES: 'tm_one_leaves_data',
  EXPENSES: 'tm_one_expenses_data',
  PAYROLL: 'tm_one_payroll_data',
  PARTNERS: 'tm_one_partners_data',
  TRANSPORTERS: 'tm_one_transporters_data',
  DRIVERS: 'tm_one_drivers_data',
  MATCHES: 'tm_one_matches_data'
};

// Event emitter for reactive state synchronization
const APPROVAL_EVENT = 'tm_one_approvals_changed';

export const notifyApprovalsChanged = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(APPROVAL_EVENT));
  }
};

export const subscribeToApprovals = (callback) => {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(APPROVAL_EVENT, callback);
  return () => window.removeEventListener(APPROVAL_EVENT, callback);
};

// 1. Storage Helpers
const getStoredData = (key, initial) => {
  if (typeof window === 'undefined') return initial;
  const val = localStorage.getItem(key);
  if (!val) {
    localStorage.setItem(key, JSON.stringify(initial));
    return initial;
  }
  try {
    return JSON.parse(val);
  } catch (e) {
    return initial;
  }
};

const setStoredData = (key, data) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(data));
    notifyApprovalsChanged();
  }
};

// 2. Aggregate Pending Approvals across all 7 source modules
export const getUnifiedPendingApprovals = () => {
  const items = [];

  // A. Leave Requests (Module: 'leaves' / 'leave')
  const leaves = getStoredData(STORAGE_KEYS.LEAVES, INITIAL_LEAVE_REQUESTS);
  leaves.forEach((l) => {
    if (l.status === 'PENDING_APPROVAL' || l.status === 'PENDING') {
      items.push({
        id: `appr-leave-${l.id}`,
        sourceId: l.id,
        module: 'leaves',
        moduleLabel: 'Leave Management',
        icon: 'CalendarOff',
        badgeColor: '#8B5CF6',
        badgeBg: '#F3E8FF',
        title: `${l.leaveTypeName || 'Leave'}: ${l.daysCount} Day(s)`,
        subtitle: `${l.startDate} to ${l.endDate} • ${l.reason}`,
        requestedBy: l.employeeName,
        requestedByAvatar: l.avatarUrl,
        requestedByEmpId: l.employeeId,
        department: l.departmentName,
        requestedAt: l.appliedOn || '2026-09-10 10:45',
        type: 'Leave Application',
        severity: 'MEDIUM',
        payload: {
          leaveType: l.leaveTypeName,
          days: l.daysCount,
          dates: `${l.startDate} to ${l.endDate}`,
          reason: l.reason,
          balanceRemaining: l.balanceRemaining,
          approver: l.approverName
        },
        rawRecord: l
      });
    }
  });

  // B. Expenses & Claims (Module: 'expenses')
  const expenses = getStoredData(STORAGE_KEYS.EXPENSES, INITIAL_EXPENSES_DATA);
  expenses.forEach((e) => {
    if (e.status === 'PENDING_APPROVAL' || e.status === 'PENDING') {
      items.push({
        id: `appr-exp-${e.id}`,
        sourceId: e.id,
        module: 'expenses',
        moduleLabel: 'Expenses & Claims',
        icon: 'Receipt',
        badgeColor: '#F59E0B',
        badgeBg: '#FEF3C7',
        title: `${e.categoryName || 'Expense'}: ₹${e.amount.toLocaleString('en-IN')}`,
        subtitle: `${e.merchant} • ${e.notes}`,
        requestedBy: e.submittedBy?.name || 'Staff Member',
        requestedByAvatar: e.submittedBy?.avatarUrl,
        requestedByEmpId: e.submittedBy?.employeeId,
        department: e.departmentName,
        requestedAt: `${e.date} 14:30`,
        type: 'Expense Reimbursement',
        severity: e.amount > 3000 ? 'HIGH' : 'MEDIUM',
        payload: {
          category: e.categoryName,
          amount: `₹${e.amount.toLocaleString('en-IN')}`,
          merchant: e.merchant,
          notes: e.notes,
          receiptUrl: e.receiptUrl,
          approvalChain: e.approvalChain
        },
        rawRecord: e
      });
    }
  });

  // C. Payroll Processing (Module: 'payroll')
  const payroll = getStoredData(STORAGE_KEYS.PAYROLL, INITIAL_PAYROLL_DATA);
  payroll.forEach((p) => {
    if (p.paymentStatus === 'PENDING_APPROVAL' || p.paymentStatus === 'PROCESSING') {
      items.push({
        id: `appr-pay-${p.id}`,
        sourceId: p.id,
        module: 'payroll',
        moduleLabel: 'Payroll & Salary',
        icon: 'CreditCard',
        badgeColor: '#10B981',
        badgeBg: '#ECFDF5',
        title: `Salary Disbursement: ₹${p.netPay.toLocaleString('en-IN')}`,
        subtitle: `${p.designation} • Pay Period: ${p.payPeriod}`,
        requestedBy: p.employeeName,
        requestedByAvatar: p.avatarUrl,
        requestedByEmpId: p.employeeId,
        department: p.departmentName,
        requestedAt: '2026-09-01 09:00',
        type: 'Payroll Release',
        severity: 'HIGH',
        payload: {
          period: p.payPeriod,
          grossPay: `₹${p.grossPay.toLocaleString('en-IN')}`,
          deductions: `₹${p.totalDeductions.toLocaleString('en-IN')}`,
          netPay: `₹${p.netPay.toLocaleString('en-IN')}`,
          bankAccount: p.bankAccount,
          uan: p.uanNumber
        },
        rawRecord: p
      });
    }
  });

  // D. Partners Onboarding & Agreements (Module: 'partners')
  const partners = getStoredData(STORAGE_KEYS.PARTNERS, INITIAL_PARTNERS_DATA);
  partners.forEach((ptr) => {
    if (ptr.onboardingStage === 'AGREEMENT_PENDING' || ptr.onboardingStage === 'COMMERCIAL_DISCUSSION' || ptr.status === 'ONBOARDING') {
      items.push({
        id: `appr-ptr-${ptr.id}`,
        sourceId: ptr.id,
        module: 'partners',
        moduleLabel: 'Ecosystem Partners',
        icon: 'Handshake',
        badgeColor: '#3B82F6',
        badgeBg: '#EFF6FF',
        title: `Partner Agreement: ${ptr.name}`,
        subtitle: `${ptr.type} • Stage: ${ptr.onboardingStage.replace('_', ' ')}`,
        requestedBy: ptr.keyContact?.name || 'Partner Contact',
        requestedByAvatar: ptr.logoUrl,
        requestedByEmpId: ptr.partnerCode,
        department: 'Ecosystem & Growth',
        requestedAt: ptr.joinedOn ? `${ptr.joinedOn} 10:00` : '2026-09-08 12:00',
        type: 'Partner Onboarding',
        severity: 'MEDIUM',
        payload: {
          partnerName: ptr.name,
          category: ptr.category,
          location: ptr.location,
          stage: ptr.onboardingStage,
          contact: `${ptr.keyContact?.name} (${ptr.keyContact?.phone})`,
          description: ptr.description
        },
        rawRecord: ptr
      });
    }
  });

  // E. Transporter Verification (Module: 'transporters')
  const transporters = getStoredData(STORAGE_KEYS.TRANSPORTERS, INITIAL_TRANSPORTERS_DATA);
  transporters.forEach((tr) => {
    if (tr.verificationStatus === 'UNDER REVIEW' || tr.status === 'PENDING') {
      items.push({
        id: `appr-tr-${tr.id}`,
        sourceId: tr.id,
        module: 'transporters',
        moduleLabel: 'Transporters',
        icon: 'Truck',
        badgeColor: '#6366F1',
        badgeBg: '#EEF2FF',
        title: `Transporter KYC: ${tr.companyName}`,
        subtitle: `Fleet: ${tr.fleetSize} Trucks • GST: ${tr.gstNumber}`,
        requestedBy: tr.contactPerson,
        requestedByAvatar: null,
        requestedByEmpId: tr.transporterId,
        department: 'Operations',
        requestedAt: `${tr.registrationDate} 10:15`,
        type: 'Fleet Verification',
        severity: 'HIGH',
        payload: {
          company: tr.companyName,
          fleet: `${tr.fleetSize} Trucks (${tr.fleetType})`,
          location: `${tr.city}, ${tr.state}`,
          gst: tr.gstNumber,
          pan: tr.panNumber,
          documents: tr.documents
        },
        rawRecord: tr
      });
    }
  });

  // F. Driver Documents Verification (Module: 'drivers')
  const drivers = getStoredData(STORAGE_KEYS.DRIVERS, INITIAL_DRIVERS_DATA);
  drivers.forEach((drv) => {
    const hasPendingDoc = drv.documents?.some((d) => d.status === 'PENDING' || d.status === 'UNDER REVIEW');
    if (drv.verificationStatus === 'UNDER REVIEW' || drv.status === 'PENDING' || hasPendingDoc) {
      items.push({
        id: `appr-drv-${drv.id}`,
        sourceId: drv.id,
        module: 'drivers',
        moduleLabel: 'Driver Verification',
        icon: 'UserCheck',
        badgeColor: '#1467FF',
        badgeBg: '#EFF6FF',
        title: `Driver License & KYC: ${drv.name}`,
        subtitle: `License: ${drv.licenseType} (${drv.licenseNumber}) • Exp: ${drv.experienceYears} Yrs`,
        requestedBy: drv.name,
        requestedByAvatar: drv.avatarUrl,
        requestedByEmpId: drv.tmid,
        department: 'Operations',
        requestedAt: `${drv.registeredAt} 14:15`,
        type: 'Driver Verification',
        severity: 'MEDIUM',
        payload: {
          name: drv.name,
          tmid: drv.tmid,
          licenseType: drv.licenseType,
          licenseNumber: drv.licenseNumber,
          location: `${drv.city}, ${drv.state}`,
          documents: drv.documents
        },
        rawRecord: drv
      });
    }
  });

  // G. Matchmaking Candidate Deployment (Module: 'matchmaking')
  const matches = getStoredData(STORAGE_KEYS.MATCHES, INITIAL_MATCHES_DATA);
  matches.forEach((m) => {
    if (m.stage === 'SELECTED' || m.stage === 'INTERVIEWS') {
      items.push({
        id: `appr-mm-${m.id}`,
        sourceId: m.id,
        module: 'matchmaking',
        moduleLabel: 'Matchmaking Pipeline',
        icon: 'GitFork',
        badgeColor: '#EC4899',
        badgeBg: '#FCE7F3',
        title: `Deployment Approval: ${m.driverName} → ${m.transporterName}`,
        subtitle: `Job: ${m.jobTitle} (${m.route}) • Salary: ${m.salaryOffer}`,
        requestedBy: m.driverName,
        requestedByAvatar: m.driverAvatar,
        requestedByEmpId: m.matchCode,
        department: 'Operations & Placement',
        requestedAt: m.createdDate ? `${m.createdDate} 16:30` : '2026-09-09 16:30',
        type: 'Candidate Placement',
        severity: 'HIGH',
        payload: {
          candidate: m.driverName,
          transporter: m.transporterName,
          job: m.jobTitle,
          route: m.route,
          salaryOffer: m.salaryOffer,
          stage: m.stage
        },
        rawRecord: m
      });
    }
  });

  return items;
};

// 3. Central Mutation Dispatcher (Updates source module in real-time)
export const mutateUnifiedApproval = (item, action, notes = '') => {
  const isApproved = action === 'APPROVE';
  const newStatus = isApproved ? 'APPROVED' : 'REJECTED';

  switch (item.module) {
    case 'leaves': {
      const data = getStoredData(STORAGE_KEYS.LEAVES, INITIAL_LEAVE_REQUESTS);
      const updated = data.map((l) =>
        l.id === item.sourceId ? { ...l, status: newStatus, approvalNotes: notes } : l
      );
      setStoredData(STORAGE_KEYS.LEAVES, updated);
      break;
    }
    case 'expenses': {
      const data = getStoredData(STORAGE_KEYS.EXPENSES, INITIAL_EXPENSES_DATA);
      const updated = data.map((e) =>
        e.id === item.sourceId ? { ...e, status: newStatus, reviewNotes: notes } : e
      );
      setStoredData(STORAGE_KEYS.EXPENSES, updated);
      break;
    }
    case 'payroll': {
      const data = getStoredData(STORAGE_KEYS.PAYROLL, INITIAL_PAYROLL_DATA);
      const updated = data.map((p) =>
        p.id === item.sourceId
          ? { ...p, paymentStatus: isApproved ? 'PAID' : 'HELD', paymentDate: isApproved ? '2026-09-14' : '-' }
          : p
      );
      setStoredData(STORAGE_KEYS.PAYROLL, updated);
      break;
    }
    case 'partners': {
      const data = getStoredData(STORAGE_KEYS.PARTNERS, INITIAL_PARTNERS_DATA);
      const updated = data.map((ptr) =>
        ptr.id === item.sourceId
          ? { ...ptr, onboardingStage: isApproved ? 'ONBOARDED' : 'COMMERCIAL_DISCUSSION', status: isApproved ? 'ACTIVE' : 'ONBOARDING' }
          : ptr
      );
      setStoredData(STORAGE_KEYS.PARTNERS, updated);
      break;
    }
    case 'transporters': {
      const data = getStoredData(STORAGE_KEYS.TRANSPORTERS, INITIAL_TRANSPORTERS_DATA);
      const updated = data.map((tr) =>
        tr.id === item.sourceId
          ? {
              ...tr,
              verificationStatus: isApproved ? 'VERIFIED' : 'REJECTED',
              status: isApproved ? 'ACTIVE' : 'INACTIVE',
              documents: tr.documents.map((d) => ({ ...d, status: isApproved ? 'VERIFIED' : 'REJECTED' }))
            }
          : tr
      );
      setStoredData(STORAGE_KEYS.TRANSPORTERS, updated);
      break;
    }
    case 'drivers': {
      const data = getStoredData(STORAGE_KEYS.DRIVERS, INITIAL_DRIVERS_DATA);
      const updated = data.map((drv) =>
        drv.id === item.sourceId
          ? {
              ...drv,
              verificationStatus: isApproved ? 'VERIFIED' : 'REJECTED',
              status: isApproved ? 'ACTIVE' : 'INACTIVE',
              documents: drv.documents.map((d) => ({ ...d, status: isApproved ? 'VERIFIED' : 'REJECTED' }))
            }
          : drv
      );
      setStoredData(STORAGE_KEYS.DRIVERS, updated);
      break;
    }
    case 'matchmaking': {
      const data = getStoredData(STORAGE_KEYS.MATCHES, INITIAL_MATCHES_DATA);
      const updated = data.map((m) =>
        m.id === item.sourceId
          ? {
              ...m,
              stage: isApproved ? 'JOINED' : 'INTERVIEWS',
              stageHistory: [
                ...(m.stageHistory || []),
                {
                  stage: isApproved ? 'Joined & Deployed' : 'Offer Rejected',
                  timestamp: new Date().toLocaleString('en-IN'),
                  updatedBy: 'Approvals Hub',
                  notes: notes || (isApproved ? 'Approved for joining' : 'Rejected candidate offer')
                }
              ]
            }
          : m
      );
      setStoredData(STORAGE_KEYS.MATCHES, updated);
      break;
    }
    default:
      break;
  }

  notifyApprovalsChanged();
};
