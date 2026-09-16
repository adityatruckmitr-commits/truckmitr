/**
 * TruckMitr One — Central Route Configuration & Permission Manifest
 * 
 * =========================================================================================
 * ARCHITECTURAL NOTE ON DASHBOARD DUAL-GATING:
 * -----------------------------------------------------------------------------------------
 * The 5 role-specific dashboard routes below (/one/dashboard/ceo, manager, telecaller, hr, admin)
 * enforce a DUAL-LAYER GATE:
 * 
 * 1. Base RBAC Check: can(route.module, route.action || 'view')
 * 2. Executive Role Allowlist: route.roles.includes(activeRole)
 * 
 * WHY: Dashboards consolidate sensitive, cross-departmental business data (e.g. CEO dashboard
 * displays financial P&L alongside executive escalations and team conversion metrics). 
 * Therefore, even if a user is granted 'revenue:view' in the permission matrix, they cannot 
 * access the CEO Dashboard unless they hold the 'ceo' (or 'admin') role.
 * 
 * Standard operational routes below (/one/drivers, /one/leaves, etc.) use SINGLE-LAYER gating 
 * via can(module, action) alone, so changes in the Roles & Permissions Matrix immediately 
 * reflect across all non-dashboard screens.
 * =========================================================================================
 */

export const ONE_ROUTES = [
  // ---------------------------------------------------------------------------------------
  // 1. Role Dashboards (Dual-Gated: Module Permission + Role Allowlist)
  // ---------------------------------------------------------------------------------------
  {
    path: '/one/dashboard/ceo',
    title: 'CEO Strategic Dashboard',
    module: 'revenue',
    action: 'view',
    roles: ['ceo', 'admin'],
    isRoleLocked: true,
    description: 'Executive overview, business performance, revenue mix, and strategic escalations.'
  },
  {
    path: '/one/dashboard/manager',
    title: 'Operations Manager Dashboard',
    module: 'matchmaking',
    action: 'view',
    roles: ['manager', 'admin', 'ceo'],
    isRoleLocked: true,
    description: 'Operations throughput, team queue, matchmaking funnel, and SLA escalations.'
  },
  {
    path: '/one/dashboard/telecaller',
    title: 'Telecaller Dashboard',
    module: 'crm',
    action: 'view',
    roles: ['telecaller', 'manager', 'admin', 'ceo'],
    isRoleLocked: true,
    description: 'Personal call queue, live call status, and daily conversions.'
  },
  {
    path: '/one/dashboard/hr',
    title: 'HR & People Dashboard',
    module: 'employees',
    action: 'view',
    roles: ['hr', 'admin', 'ceo'],
    isRoleLocked: true,
    description: 'People operations, daily attendance, pending leave approvals, and onboarding.'
  },
  {
    path: '/one/dashboard/admin',
    title: 'Super Admin Control Center',
    module: 'roles',
    action: 'view',
    roles: ['admin'],
    isRoleLocked: true,
    description: 'System health, access management, security events, and audit logs.'
  },

  // ---------------------------------------------------------------------------------------
  // 2. Standard Operational Routes (Single-Gated via can(module, action))
  // ---------------------------------------------------------------------------------------
  // Operations & Marketplace
  { path: '/one/drivers', title: 'Driver Management', module: 'drivers', action: 'view' },
  { path: '/one/transporters', title: 'Transporter Management', module: 'transporters', action: 'view' },
  { path: '/one/matchmaking', title: 'Matchmaking Pipeline', module: 'matchmaking', action: 'view' },
  { path: '/one/crm', title: 'Calling & CRM', module: 'crm', action: 'view' },
  { path: '/one/driver-ki-awaaz', title: 'Driver Ki Awaaz', module: 'driver-ki-awaaz', action: 'view' },
  { path: '/one/partners', title: 'Highway & Ecosystem Partners', module: 'partners', action: 'view' },

  // Business & Finance
  { path: '/one/revenue', title: 'Revenue & Financials', module: 'revenue', action: 'view' },
  { path: '/one/growth-analytics', title: 'Growth & Analytics', module: 'growth-analytics', action: 'view' },
  { path: '/one/reports', title: 'Reports Hub', module: 'reports', action: 'view' },

  // People & HR
  { path: '/one/employees', title: 'Employee Management', module: 'employees', action: 'view' },
  { path: '/one/attendance', title: 'Attendance Matrix', module: 'attendance', action: 'view' },
  { path: '/one/leaves', title: 'Leave Management', module: 'leaves', action: 'view' },
  { path: '/one/payroll', title: 'Payroll & Compensation', module: 'payroll', action: 'view' },
  { path: '/one/expenses', title: 'Expenses & Claims', module: 'expenses', action: 'view' },
  { path: '/one/assets', title: 'Assets Management', module: 'assets', action: 'view' },

  // My Work
  { path: '/one/tasks', title: 'Tasks Board', module: 'tasks', action: 'view' },
  { path: '/one/approvals', title: 'Approvals Hub', module: 'approvals', action: 'view' },
  { path: '/one/notifications', title: 'Notification Center', module: 'notifications', action: 'view' },

  // Administration
  { path: '/one/users', title: 'User Management', module: 'users', action: 'view' },
  { path: '/one/roles', title: 'Roles & Permissions', module: 'roles', action: 'view' },
  { path: '/one/workflows', title: 'Workflow Automations', module: 'workflows', action: 'view' },
  { path: '/one/audit-logs', title: 'Audit Logs & Security', module: 'audit-logs', action: 'view' },
  { path: '/one/settings', title: 'System Settings', module: 'settings', action: 'view' }
];

/**
 * Helper to lookup route metadata by pathname
 */
export const getRouteConfig = (pathname) => {
  // Exact match
  const found = ONE_ROUTES.find((r) => r.path === pathname);
  if (found) return found;

  // Prefix match (e.g. /one/dashboard)
  const prefixMatch = ONE_ROUTES.find((r) => pathname.startsWith(r.path));
  return prefixMatch || null;
};
