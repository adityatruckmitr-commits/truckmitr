/**
 * TruckMitr One — Seeded Mock Data for Auth, Users & RBAC Permissions
 */

import { SYSTEM_ROLES, SYSTEM_MODULES, DEPARTMENTS } from '../utils/rbacConstants';

// 1. Initial Seeded Users across all Roles
export const INITIAL_USERS = [
  {
    id: 'usr-ceo-1',
    name: 'Anil Kumar',
    email: 'anil.kumar@truckmitr.com',
    phone: '+91 98765 43210',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
    designation: 'Chief Executive Officer',
    departmentId: 'dept-fin',
    departmentCode: 'FIN',
    departmentName: 'Executive & Finance',
    defaultRoleId: 'role-ceo',
    roleSlug: 'ceo',
    roleName: 'Chief Executive Officer (CEO)',
    status: 'ACTIVE',
    employeeId: 'TMEMP001',
    doj: '2024-01-01',
    workMode: 'Office',
    lastLogin: '2026-09-14 14:30:22',
    lastIp: '103.94.12.56'
  },
  {
    id: 'usr-admin-1',
    name: 'Deepak Arora',
    email: 'deepak.arora@truckmitr.com',
    phone: '+91 98765 43211',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
    designation: 'Super Administrator & Tech Lead',
    departmentId: 'dept-tech',
    departmentCode: 'TECH',
    departmentName: 'Technology & Product',
    defaultRoleId: 'role-admin',
    roleSlug: 'admin',
    roleName: 'Super Administrator',
    status: 'ACTIVE',
    employeeId: 'TMEMP002',
    doj: '2024-02-15',
    workMode: 'Office',
    lastLogin: '2026-09-14 14:15:10',
    lastIp: '103.94.12.78'
  },
  {
    id: 'usr-manager-1',
    name: 'Aditya Kumar',
    email: 'aditya.kumar@truckmitr.com',
    phone: '+91 98765 43212',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
    designation: 'Operations & Fleet Manager',
    departmentId: 'dept-ops',
    departmentCode: 'OPS',
    departmentName: 'Operations & Fleet',
    defaultRoleId: 'role-manager',
    roleSlug: 'manager',
    roleName: 'Operations & Fleet Manager',
    status: 'ACTIVE',
    employeeId: 'TMEMP003',
    doj: '2024-03-01',
    workMode: 'Office',
    lastLogin: '2026-09-14 13:45:00',
    lastIp: '49.36.22.11'
  },
  {
    id: 'usr-hr-1',
    name: 'Pratima Singh',
    email: 'pratima.singh@truckmitr.com',
    phone: '+91 98765 43213',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80',
    designation: 'HR Lead & People Ops',
    departmentId: 'dept-hr',
    departmentCode: 'HR',
    departmentName: 'Human Resources',
    defaultRoleId: 'role-hr',
    roleSlug: 'hr',
    roleName: 'Human Resources Lead',
    status: 'ACTIVE',
    employeeId: 'TMEMP004',
    doj: '2024-04-10',
    workMode: 'Office',
    lastLogin: '2026-09-14 12:20:18',
    lastIp: '103.94.12.33'
  },
  {
    id: 'usr-tele-1',
    name: 'Sonam Sharma',
    email: 'sonam.sharma@truckmitr.com',
    phone: '+91 98765 43214',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&h=120&q=80',
    designation: 'Senior Matchmaking Telecaller',
    departmentId: 'dept-sales',
    departmentCode: 'SALES',
    departmentName: 'Sales & Telecalling',
    defaultRoleId: 'role-telecaller',
    roleSlug: 'telecaller',
    roleName: 'Telecaller / Operations Staff',
    status: 'ACTIVE',
    employeeId: 'TMEMP005',
    doj: '2024-05-01',
    workMode: 'Office',
    lastLogin: '2026-09-14 14:28:45',
    lastIp: '49.36.22.07'
  },
  {
    id: 'usr-tele-2',
    name: 'Raksha Verma',
    email: 'raksha.verma@truckmitr.com',
    phone: '+91 98765 43215',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80',
    designation: 'Telecaller Executive',
    departmentId: 'dept-sales',
    departmentCode: 'SALES',
    departmentName: 'Sales & Telecalling',
    defaultRoleId: 'role-telecaller',
    roleSlug: 'telecaller',
    roleName: 'Telecaller / Operations Staff',
    status: 'ACTIVE',
    employeeId: 'TMEMP006',
    doj: '2024-06-15',
    workMode: 'WFH',
    lastLogin: '2026-09-14 11:10:00',
    lastIp: '49.36.21.89'
  },
  {
    id: 'usr-ops-2',
    name: 'Karan Mehta',
    email: 'karan.mehta@truckmitr.com',
    phone: '+91 98765 43216',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&h=120&q=80',
    designation: 'Partners & Ecosystem Lead',
    departmentId: 'dept-ops',
    departmentCode: 'OPS',
    departmentName: 'Operations & Fleet',
    defaultRoleId: 'role-manager',
    roleSlug: 'manager',
    roleName: 'Operations & Fleet Manager',
    status: 'ACTIVE',
    employeeId: 'TMEMP007',
    doj: '2024-07-01',
    workMode: 'Office',
    lastLogin: '2026-09-14 10:05:12',
    lastIp: '103.94.12.67'
  },
  {
    id: 'usr-ops-3',
    name: 'Kamini Gupta',
    email: 'kamini.gupta@truckmitr.com',
    phone: '+91 98765 43217',
    avatarUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=120&h=120&q=80',
    designation: 'Marketing & Community Executive',
    departmentId: 'dept-sales',
    departmentCode: 'SALES',
    departmentName: 'Sales & Telecalling',
    defaultRoleId: 'role-telecaller',
    roleSlug: 'telecaller',
    roleName: 'Telecaller / Operations Staff',
    status: 'ACTIVE',
    employeeId: 'TMEMP008',
    doj: '2024-08-01',
    workMode: 'Office',
    lastLogin: '2026-09-14 09:30:00',
    lastIp: '49.36.21.44'
  }
];

// Helper to generate a default permission map for a role
const generateDefaultPermissions = (roleSlug) => {
  const perms = {};

  SYSTEM_MODULES.forEach((mod) => {
    perms[mod.slug] = {
      view: false,
      create: false,
      edit: false,
      delete: false,
      approve: false,
      export: false,
      scope: 'ALL'
    };

    if (roleSlug === 'ceo') {
      // CEO has View, Approve, Export everywhere; Edit/Create on key business/governance
      perms[mod.slug].view = true;
      perms[mod.slug].export = true;
      perms[mod.slug].approve = true;
      if (['revenue', 'approvals', 'tasks', 'settings', 'reports', 'driver-ki-awaaz'].includes(mod.slug)) {
        perms[mod.slug].edit = true;
        perms[mod.slug].create = true;
      }
    } else if (roleSlug === 'admin') {
      // Admin has Full Access everywhere
      perms[mod.slug].view = true;
      perms[mod.slug].create = true;
      perms[mod.slug].edit = true;
      perms[mod.slug].delete = true;
      perms[mod.slug].approve = true;
      perms[mod.slug].export = true;
    } else if (roleSlug === 'manager') {
      // Manager has operational and team oversight
      if (['drivers', 'transporters', 'matchmaking', 'crm', 'partners', 'tasks', 'approvals'].includes(mod.slug)) {
        perms[mod.slug].view = true;
        perms[mod.slug].create = true;
        perms[mod.slug].edit = true;
        perms[mod.slug].approve = true;
        perms[mod.slug].export = true;
        perms[mod.slug].scope = 'ALL';
      } else if (['employees', 'attendance', 'leaves', 'expenses'].includes(mod.slug)) {
        perms[mod.slug].view = true;
        perms[mod.slug].approve = true;
        perms[mod.slug].scope = 'DEPARTMENT';
      } else if (['revenue', 'growth-analytics', 'reports', 'driver-ki-awaaz', 'notifications'].includes(mod.slug)) {
        perms[mod.slug].view = true;
        perms[mod.slug].export = true;
        if (['reports', 'driver-ki-awaaz'].includes(mod.slug)) {
          perms[mod.slug].create = true;
        }
      }
    } else if (roleSlug === 'hr') {
      // HR has full control over People & HR + view on operations/approvals/reports
      if (['employees', 'attendance', 'leaves', 'payroll', 'expenses', 'assets'].includes(mod.slug)) {
        perms[mod.slug].view = true;
        perms[mod.slug].create = true;
        perms[mod.slug].edit = true;
        perms[mod.slug].delete = true;
        perms[mod.slug].approve = true;
        perms[mod.slug].export = true;
        perms[mod.slug].scope = 'ALL';
      } else if (['tasks', 'approvals', 'notifications', 'users'].includes(mod.slug)) {
        perms[mod.slug].view = true;
        perms[mod.slug].create = true;
        perms[mod.slug].edit = true;
        perms[mod.slug].approve = true;
      } else if (['drivers', 'transporters', 'reports'].includes(mod.slug)) {
        perms[mod.slug].view = true;
        if (mod.slug === 'reports') {
          perms[mod.slug].export = true;
          perms[mod.slug].create = true;
        }
      }
    } else if (roleSlug === 'telecaller') {
      // Telecaller: Day-to-day CRM, Driver/Transporter intake, Matchmaking, personal tasks
      if (['crm', 'matchmaking', 'drivers', 'transporters'].includes(mod.slug)) {
        perms[mod.slug].view = true;
        perms[mod.slug].create = true;
        perms[mod.slug].edit = true;
        perms[mod.slug].scope = 'ASSIGNED_ONLY';
      } else if (['tasks', 'notifications', 'driver-ki-awaaz'].includes(mod.slug)) {
        perms[mod.slug].view = true;
        perms[mod.slug].create = true;
        perms[mod.slug].edit = true;
      } else if (['leaves', 'expenses', 'attendance', 'payroll'].includes(mod.slug)) {
        perms[mod.slug].view = true;
        perms[mod.slug].create = true; // Request own leave / expense
        perms[mod.slug].scope = 'ASSIGNED_ONLY';
      }
    }

    // Sanitize: ensure no permission is granted for actions not supported by the module
    Object.keys(perms[mod.slug]).forEach((act) => {
      if (act !== 'scope' && !mod.allowedActions.includes(act)) {
        perms[mod.slug][act] = false;
      }
    });
  });

  return perms;
};

// 2. Initial Role-Permissions Matrix Map
export const INITIAL_ROLE_PERMISSIONS = {
  'role-ceo': generateDefaultPermissions('ceo'),
  'role-admin': generateDefaultPermissions('admin'),
  'role-manager': generateDefaultPermissions('manager'),
  'role-hr': generateDefaultPermissions('hr'),
  'role-telecaller': generateDefaultPermissions('telecaller')
};

// 3. Initial Audit Logs
export const INITIAL_AUDIT_LOGS = [
  {
    id: 'log-001',
    userId: 'usr-admin-1',
    userName: 'Deepak Arora',
    userRole: 'Admin',
    moduleId: 'mod-roles',
    moduleSlug: 'roles',
    action: 'UPDATE',
    details: 'Updated permission matrix for role "Telecaller / Operations Staff"',
    recordId: 'role-telecaller',
    severity: 'MEDIUM',
    ipAddress: '103.94.12.78',
    timestamp: '2026-09-14 14:15:10'
  },
  {
    id: 'log-002',
    userId: 'usr-ceo-1',
    userName: 'Anil Kumar',
    userRole: 'CEO',
    moduleId: 'mod-approvals',
    moduleSlug: 'approvals',
    action: 'APPROVE',
    details: 'Executive authorization granted for Vendor Payment #PR-2026-0914-03 (₹25,000)',
    recordId: 'PR-2026-0914-03',
    severity: 'HIGH',
    ipAddress: '103.94.12.56',
    timestamp: '2026-09-14 14:05:22'
  },
  {
    id: 'log-003',
    userId: 'usr-hr-1',
    userName: 'Pratima Singh',
    userRole: 'HR',
    moduleId: 'mod-leaves',
    moduleSlug: 'leaves',
    action: 'APPROVE',
    details: 'Approved 2 days Casual Leave for Sonam Sharma (TMEMP005)',
    recordId: 'LV-2026-0915-01',
    severity: 'LOW',
    ipAddress: '103.94.12.33',
    timestamp: '2026-09-14 12:20:18'
  },
  {
    id: 'log-004',
    userId: 'usr-manager-1',
    userName: 'Aditya Kumar',
    userRole: 'Manager',
    moduleId: 'mod-matchmaking',
    moduleSlug: 'matchmaking',
    action: 'CREATE',
    details: 'Dispatched candidate shortlist (3 drivers) for Sharma Logistics (Job #JB9823)',
    recordId: 'JB9823',
    severity: 'LOW',
    ipAddress: '49.36.22.11',
    timestamp: '2026-09-14 11:32:00'
  },
  {
    id: 'log-005',
    userId: 'usr-tele-1',
    userName: 'Sonam Sharma',
    userRole: 'Telecaller',
    moduleId: 'mod-crm',
    moduleSlug: 'crm',
    action: 'CREATE',
    details: 'Logged successful call outcome "Connected - Interested" for Driver Ravi Kumar (TM2609234)',
    recordId: 'CR-98234',
    severity: 'LOW',
    ipAddress: '49.36.22.07',
    timestamp: '2026-09-14 11:20:15'
  }
];
