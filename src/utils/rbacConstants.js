/**
 * TruckMitr One — RBAC & Module Constants
 * Defines Roles, Departments, Modules (22), Actions, and Scopes
 */

export const SECTIONS = {
  OPERATIONS: { id: 'OPERATIONS', label: 'Operations', icon: 'Truck' },
  BUSINESS: { id: 'BUSINESS', label: 'Business & Finance', icon: 'TrendingUp' },
  PEOPLE: { id: 'PEOPLE', label: 'People & HR', icon: 'Users' },
  MY_WORK: { id: 'MY_WORK', label: 'My Work', icon: 'CheckSquare' },
  ADMINISTRATION: { id: 'ADMINISTRATION', label: 'Administration', icon: 'Shield' }
};

export const DEPARTMENTS = [
  { id: 'dept-lead', code: 'LEAD', name: 'Leadership & Executive', head_user_id: 'usr-ceo-1', headName: 'Anil Kumar' },
  { id: 'dept-ops', code: 'OPS', name: 'Operations & Fleet', head_user_id: 'usr-manager-1', headName: 'Aditya Kumar' },
  { id: 'dept-sales', code: 'SALES', name: 'Sales & Growth', head_user_id: 'usr-tele-1', headName: 'Sonam Sharma' },
  { id: 'dept-fin', code: 'FIN', name: 'Finance & Accounts', head_user_id: 'usr-ceo-1', headName: 'Anil Kumar' },
  { id: 'dept-hr', code: 'HR', name: 'Human Resources', head_user_id: 'usr-hr-1', headName: 'Pratima Singh' },
  { id: 'dept-tech', code: 'TECH', name: 'Technology & Product', head_user_id: 'usr-admin-1', headName: 'Deepak Arora' }
];

export const ACTIONS = [
  { id: 'view', label: 'View', description: 'Can browse and view records' },
  { id: 'create', label: 'Create', description: 'Can add new records' },
  { id: 'edit', label: 'Edit', description: 'Can update existing records' },
  { id: 'delete', label: 'Delete', description: 'Can remove or archive records' },
  { id: 'approve', label: 'Approve', description: 'Can make workflow approval/rejection decisions' },
  { id: 'export', label: 'Export', description: 'Can download reports, CSV, Excel, PDF data' }
];

export const SCOPES = {
  ALL: { id: 'ALL', label: 'All Records', description: 'Organization-wide access' },
  DEPARTMENT: { id: 'DEPARTMENT', label: 'Department Only', description: 'Access limited to own department' },
  ASSIGNED_ONLY: { id: 'ASSIGNED_ONLY', label: 'Assigned Only', description: 'Access limited to assigned/owned records' }
};

export const SYSTEM_ROLES = [
  {
    id: 'role-ceo',
    slug: 'ceo',
    name: 'Chief Executive Officer (CEO)',
    shortName: 'CEO',
    badge: '👑 CEO',
    color: '#D97706',
    bgColor: '#FEF3C7',
    hierarchyLevel: 100,
    description: 'Executive authority across all organization metrics, final approvals & business health.',
    isSystem: true
  },
  {
    id: 'role-admin',
    slug: 'admin',
    name: 'Super Administrator',
    shortName: 'Admin',
    badge: '🛡️ Admin',
    color: '#4F46E5',
    bgColor: '#EEF2FF',
    hierarchyLevel: 90,
    description: 'Full system configuration, security rules, user provisioning & role matrix management.',
    isSystem: true
  },
  {
    id: 'role-manager',
    slug: 'manager',
    name: 'Operations & Fleet Manager',
    shortName: 'Manager',
    badge: '💼 Manager',
    color: '#0284C7',
    bgColor: '#E0F2FE',
    hierarchyLevel: 70,
    description: 'Oversees team throughput, matchmaking pipelines, SLA escalations & team approvals.',
    isSystem: true
  },
  {
    id: 'role-hr',
    slug: 'hr',
    name: 'Human Resources Lead',
    shortName: 'HR',
    badge: '👥 HR',
    color: '#059669',
    bgColor: '#ECFDF5',
    hierarchyLevel: 60,
    description: 'Manages employees, attendance tracking, leave requests, payroll & policy compliance.',
    isSystem: true
  },
  {
    id: 'role-telecaller',
    slug: 'telecaller',
    name: 'Telecaller / Operations Staff',
    shortName: 'Telecaller',
    badge: '🎧 Telecaller',
    color: '#9333EA',
    bgColor: '#F3E8FF',
    hierarchyLevel: 30,
    description: 'Daily calling queues, candidate matchmaking, lead conversion & call record logging.',
    isSystem: true
  }
];

export const SYSTEM_MODULES = [
  // OPERATIONS
  {
    id: 'mod-drivers',
    slug: 'drivers',
    name: 'Drivers',
    section: 'OPERATIONS',
    icon: 'UserCheck',
    route: '/one/drivers',
    description: 'Driver registry, TMID generation, DL/Aadhaar/Police verification & placement pipeline.',
    orderIndex: 1,
    allowedActions: ['view', 'create', 'edit', 'delete', 'approve', 'export']
  },
  {
    id: 'mod-transporters',
    slug: 'transporters',
    name: 'Transporters',
    section: 'OPERATIONS',
    icon: 'Truck',
    route: '/one/transporters',
    description: 'Transporter registry, GST & fleet verification, active subscription plans & job postings.',
    orderIndex: 2,
    allowedActions: ['view', 'create', 'edit', 'delete', 'approve', 'export']
  },
  {
    id: 'mod-matchmaking',
    slug: 'matchmaking',
    name: 'Matchmaking',
    section: 'OPERATIONS',
    icon: 'GitFork',
    route: '/one/matchmaking',
    description: '6-stage matchmaking funnel: Posted -> Required -> Applications -> Interviews -> Selected -> Joined.',
    orderIndex: 3,
    allowedActions: ['view', 'create', 'edit', 'delete', 'approve', 'export']
  },
  {
    id: 'mod-crm',
    slug: 'crm',
    name: 'Calling & CRM',
    section: 'OPERATIONS',
    icon: 'PhoneCall',
    route: '/one/crm',
    description: 'Live caller desk, click-to-call queues, call outcomes (Connected, Callback, Not Interested).',
    orderIndex: 4,
    allowedActions: ['view', 'create', 'edit', 'delete', 'approve', 'export']
  },
  {
    id: 'mod-driver-ki-awaaz',
    slug: 'driver-ki-awaaz',
    name: 'Driver Ki Awaaz',
    section: 'OPERATIONS',
    icon: 'Radio',
    route: '/one/driver-ki-awaaz',
    description: 'Community audio/video media platform, trending road stories & content moderation.',
    orderIndex: 5,
    allowedActions: ['view', 'create', 'edit', 'delete', 'approve', 'export']
  },
  {
    id: 'mod-partners',
    slug: 'partners',
    name: 'Partners',
    section: 'OPERATIONS',
    icon: 'Handshake',
    route: '/one/partners',
    description: 'OEMs, Fleets, Training Institutes, Dhabas, Puncture Shops & Onboarding pipeline.',
    orderIndex: 6,
    allowedActions: ['view', 'create', 'edit', 'delete', 'approve', 'export']
  },

  // BUSINESS & FINANCE
  {
    id: 'mod-revenue',
    slug: 'revenue',
    name: 'Revenue',
    section: 'BUSINESS',
    icon: 'IndianRupee',
    route: '/one/revenue',
    description: 'Revenue streams (Subscriptions, Matchmaking, Verification, Ads), invoicing & ARPU forecast.',
    orderIndex: 7,
    allowedActions: ['view', 'create', 'edit', 'delete', 'approve', 'export']
  },
  {
    id: 'mod-growth-analytics',
    slug: 'growth-analytics',
    name: 'Growth & Analytics',
    section: 'BUSINESS',
    icon: 'BarChart2',
    route: '/one/growth-analytics',
    description: 'User acquisition funnels, regional penetration maps, churn analysis & cohort retention.',
    orderIndex: 8,
    allowedActions: ['view', 'export']
  },
  {
    id: 'mod-reports',
    slug: 'reports',
    name: 'Reports Hub',
    section: 'BUSINESS',
    icon: 'FileText',
    route: '/one/reports',
    description: 'Enterprise reporting center for operations, finance, CRM, HR and scheduled auto-exports.',
    orderIndex: 9,
    allowedActions: ['view', 'create', 'export']
  },

  // PEOPLE & HR
  {
    id: 'mod-employees',
    slug: 'employees',
    name: 'Employees',
    section: 'PEOPLE',
    icon: 'Users',
    route: '/one/employees',
    description: 'Master staff registry, department headcount, work modes (Office/WFH), designation & DOJ.',
    orderIndex: 10,
    allowedActions: ['view', 'create', 'edit', 'delete', 'approve', 'export']
  },
  {
    id: 'mod-attendance',
    slug: 'attendance',
    name: 'Attendance',
    section: 'PEOPLE',
    icon: 'CalendarCheck',
    route: '/one/attendance',
    description: 'Daily presence tracking, late check-ins, overtime hours & monthly team capacity matrix.',
    orderIndex: 11,
    allowedActions: ['view', 'create', 'edit', 'delete', 'approve', 'export']
  },
  {
    id: 'mod-leaves',
    slug: 'leaves',
    name: 'Leave Management',
    section: 'PEOPLE',
    icon: 'CalendarOff',
    route: '/one/leaves',
    description: 'Employee leave requests, balance ledger (Casual, Sick, Earned) & Manager approval queue.',
    orderIndex: 12,
    allowedActions: ['view', 'create', 'edit', 'delete', 'approve', 'export']
  },
  {
    id: 'mod-payroll',
    slug: 'payroll',
    name: 'Payroll',
    section: 'PEOPLE',
    icon: 'CreditCard',
    route: '/one/payroll',
    description: 'Monthly salary disbursements, CTC breakdowns, statutory PF/ESIC deductions & payslip generator.',
    orderIndex: 13,
    allowedActions: ['view', 'create', 'edit', 'approve', 'export']
  },
  {
    id: 'mod-expenses',
    slug: 'expenses',
    name: 'Expenses',
    section: 'PEOPLE',
    icon: 'Receipt',
    route: '/one/expenses',
    description: 'Employee reimbursement claims (Fuel, Travel, Client), receipt proofs & budget controls.',
    orderIndex: 14,
    allowedActions: ['view', 'create', 'edit', 'delete', 'approve', 'export']
  },
  {
    id: 'mod-assets',
    slug: 'assets',
    name: 'Assets Management',
    section: 'PEOPLE',
    icon: 'Monitor',
    route: '/one/assets',
    description: 'Company hardware, SIM cards, ID cards, vehicles, maintenance schedules & depreciation.',
    orderIndex: 15,
    allowedActions: ['view', 'create', 'edit', 'delete', 'approve', 'export']
  },

  // MY WORK
  {
    id: 'mod-tasks',
    slug: 'tasks',
    name: 'Tasks',
    section: 'MY_WORK',
    icon: 'CheckSquare',
    route: '/one/tasks',
    description: 'Personal and team assigned tasks, priority deadlines, overdue SLA alerts & progress bars.',
    orderIndex: 16,
    allowedActions: ['view', 'create', 'edit', 'delete', 'approve', 'export']
  },
  {
    id: 'mod-approvals',
    slug: 'approvals',
    name: 'Approvals Hub',
    section: 'MY_WORK',
    icon: 'CheckCircle2',
    route: '/one/approvals',
    description: 'Unified queue of pending approvals across Leave, Expenses, Payments, Access & Jobs.',
    orderIndex: 17,
    allowedActions: ['view', 'edit', 'approve', 'export']
  },
  {
    id: 'mod-notifications',
    slug: 'notifications',
    name: 'Notifications',
    section: 'MY_WORK',
    icon: 'Bell',
    route: '/one/notifications',
    description: 'Categorized alerts (Info, Reminders, Action Required) across operations and system events.',
    orderIndex: 18,
    allowedActions: ['view', 'edit', 'delete', 'export']
  },

  // ADMINISTRATION
  {
    id: 'mod-users',
    slug: 'users',
    name: 'Users',
    section: 'ADMINISTRATION',
    icon: 'UserCog',
    route: '/one/users',
    description: 'Identity management: user provisioning, role assignments, department allocation & status.',
    orderIndex: 19,
    allowedActions: ['view', 'create', 'edit', 'delete', 'approve', 'export']
  },
  {
    id: 'mod-roles',
    slug: 'roles',
    name: 'Roles & Permissions',
    section: 'ADMINISTRATION',
    icon: 'ShieldCheck',
    route: '/one/roles',
    description: 'Interactive User -> Role -> Permission -> Module -> Action matrix with row-level scoping.',
    orderIndex: 20,
    allowedActions: ['view', 'create', 'edit', 'delete', 'approve', 'export']
  },
  {
    id: 'mod-workflows',
    slug: 'workflows',
    name: 'Workflows',
    section: 'ADMINISTRATION',
    icon: 'Workflow',
    route: '/one/workflows',
    description: 'Automated trigger-condition-action rule engine (e.g. Lead assigned -> Send WhatsApp -> SLA 2h).',
    orderIndex: 21,
    allowedActions: ['view', 'create', 'edit', 'delete', 'approve', 'export']
  },
  {
    id: 'mod-audit-logs',
    slug: 'audit-logs',
    name: 'Audit Logs',
    section: 'ADMINISTRATION',
    icon: 'History',
    route: '/one/audit-logs',
    description: 'Immutable security log: User, Action, Module, Old/New Snapshot, IP Address & Severity.',
    orderIndex: 22,
    allowedActions: ['view', 'export']
  },
  {
    id: 'mod-settings',
    slug: 'settings',
    name: 'Settings',
    section: 'ADMINISTRATION',
    icon: 'Settings',
    route: '/one/settings',
    description: 'Organization profile, notification gateway credentials, 2FA security & system cache.',
    orderIndex: 23,
    allowedActions: ['view', 'edit']
  }
];
