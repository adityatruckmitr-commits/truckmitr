/**
 * TruckMitr One — Dedicated Mock Service for Employees Module
 */

export const INITIAL_EMPLOYEES_DATA = [
  {
    id: 'emp-1',
    employeeId: 'TMEMP001',
    name: 'Anil Kumar',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
    email: 'anil.kumar@truckmitr.com',
    phone: '+91 98765 43210',
    designation: 'Chief Executive Officer',
    departmentId: 'dept-lead',
    departmentName: 'Leadership & Executive',
    reportingManagerId: null,
    reportingManagerName: 'Board of Directors',
    status: 'ACTIVE',
    joinedDate: '2024-01-01',
    workMode: 'Office',
    location: 'Headquarters, Delhi',
    salaryInfo: {
      basicSalary: 45000,
      hra: 22500,
      specialAllowance: 17500,
      grossPay: 85000,
      netPay: 76500
    },
    employmentHistory: [
      { role: 'Co-Founder & CEO', company: 'TruckMitr Logistics', period: '2024 - Present' },
      { role: 'VP Operations', company: 'National Freight Carriers', period: '2018 - 2023' }
    ],
    documents: [
      { type: 'Aadhaar Card', status: 'VERIFIED', verifiedAt: '2024-01-02' },
      { type: 'PAN Card', status: 'VERIFIED', verifiedAt: '2024-01-02' },
      { type: 'Executive Employment Agreement', status: 'VERIFIED', verifiedAt: '2024-01-01' }
    ],
    stats: { attendanceRate: '100%', leavesRemaining: 18, openTasks: 4 }
  },
  {
    id: 'emp-2',
    employeeId: 'TMEMP002',
    name: 'Deepak Arora',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
    email: 'deepak.arora@truckmitr.com',
    phone: '+91 98765 43211',
    designation: 'Super Administrator & Tech Lead',
    departmentId: 'dept-tech',
    departmentName: 'Technology & Product',
    reportingManagerId: 'usr-ceo-1',
    reportingManagerName: 'Anil Kumar (CEO)',
    status: 'ACTIVE',
    joinedDate: '2024-02-15',
    workMode: 'Office',
    location: 'Headquarters, Delhi',
    salaryInfo: {
      basicSalary: 30000,
      hra: 15000,
      specialAllowance: 10000,
      grossPay: 55000,
      netPay: 49800
    },
    employmentHistory: [
      { role: 'Tech Lead', company: 'TruckMitr One', period: '2024 - Present' },
      { role: 'Senior Systems Architect', company: 'LogiTech Solutions', period: '2020 - 2024' }
    ],
    documents: [
      { type: 'Aadhaar Card', status: 'VERIFIED', verifiedAt: '2024-02-16' },
      { type: 'Degree Certificate', status: 'VERIFIED', verifiedAt: '2024-02-16' }
    ],
    stats: { attendanceRate: '98%', leavesRemaining: 14, openTasks: 6 }
  },
  {
    id: 'emp-3',
    employeeId: 'TMEMP003',
    name: 'Aditya Kumar',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
    email: 'aditya.kumar@truckmitr.com',
    phone: '+91 98765 43212',
    designation: 'Operations & Fleet Manager',
    departmentId: 'dept-ops',
    departmentName: 'Operations & Fleet',
    reportingManagerId: 'usr-ceo-1',
    reportingManagerName: 'Anil Kumar (CEO)',
    status: 'ACTIVE',
    joinedDate: '2024-03-01',
    workMode: 'Office',
    location: 'Headquarters, Delhi',
    salaryInfo: {
      basicSalary: 20000,
      hra: 10000,
      specialAllowance: 5000,
      grossPay: 35000,
      netPay: 31700
    },
    employmentHistory: [
      { role: 'Operations Manager', company: 'TruckMitr One', period: '2024 - Present' },
      { role: 'Fleet Supervisor', company: 'Sharma Transport', period: '2021 - 2024' }
    ],
    documents: [
      { type: 'Aadhaar Card', status: 'VERIFIED', verifiedAt: '2024-03-02' },
      { type: 'Experience Certificate', status: 'VERIFIED', verifiedAt: '2024-03-02' }
    ],
    stats: { attendanceRate: '96%', leavesRemaining: 11, openTasks: 8 }
  },
  {
    id: 'emp-4',
    employeeId: 'TMEMP004',
    name: 'Pratima Singh',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80',
    email: 'pratima.singh@truckmitr.com',
    phone: '+91 98765 43213',
    designation: 'HR Lead & People Ops',
    departmentId: 'dept-hr',
    departmentName: 'Human Resources',
    reportingManagerId: 'usr-ceo-1',
    reportingManagerName: 'Anil Kumar (CEO)',
    status: 'ACTIVE',
    joinedDate: '2024-04-10',
    workMode: 'Hybrid',
    location: 'Headquarters, Delhi',
    salaryInfo: {
      basicSalary: 22000,
      hra: 11000,
      specialAllowance: 5000,
      grossPay: 38000,
      netPay: 34400
    },
    employmentHistory: [
      { role: 'HR Lead', company: 'TruckMitr One', period: '2024 - Present' },
      { role: 'HR Executive', company: 'Apex Human Capital', period: '2022 - 2024' }
    ],
    documents: [
      { type: 'Aadhaar Card', status: 'VERIFIED', verifiedAt: '2024-04-11' },
      { type: 'MBA Certificate', status: 'VERIFIED', verifiedAt: '2024-04-11' }
    ],
    stats: { attendanceRate: '95%', leavesRemaining: 9, openTasks: 3 }
  },
  {
    id: 'emp-5',
    employeeId: 'TMEMP005',
    name: 'Sonam Sharma',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&h=120&q=80',
    email: 'sonam.sharma@truckmitr.com',
    phone: '+91 98765 43214',
    designation: 'Senior Matchmaking Telecaller',
    departmentId: 'dept-sales',
    departmentName: 'Sales & Growth',
    reportingManagerId: 'usr-manager-1',
    reportingManagerName: 'Aditya Kumar (Manager)',
    status: 'ACTIVE',
    joinedDate: '2024-05-01',
    workMode: 'Office',
    location: 'Regional Hub, Jaipur',
    salaryInfo: {
      basicSalary: 15000,
      hra: 7500,
      specialAllowance: 2500,
      grossPay: 25000,
      netPay: 22600
    },
    employmentHistory: [
      { role: 'Senior Matchmaker', company: 'TruckMitr One', period: '2024 - Present' },
      { role: 'Telecaller Associate', company: 'QuickDial BPO', period: '2022 - 2024' }
    ],
    documents: [
      { type: 'Aadhaar Card', status: 'VERIFIED', verifiedAt: '2024-05-02' }
    ],
    stats: { attendanceRate: '97%', leavesRemaining: 13, openTasks: 12 }
  },
  {
    id: 'emp-6',
    employeeId: 'TMEMP006',
    name: 'Raksha Patel',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80',
    email: 'raksha.patel@truckmitr.com',
    phone: '+91 98765 43215',
    designation: 'Operations Associate',
    departmentId: 'dept-ops',
    departmentName: 'Operations & Fleet',
    reportingManagerId: 'usr-manager-1',
    reportingManagerName: 'Aditya Kumar (Manager)',
    status: 'ACTIVE',
    joinedDate: '2024-06-15',
    workMode: 'Office',
    location: 'Headquarters, Delhi',
    salaryInfo: {
      basicSalary: 14000,
      hra: 7000,
      specialAllowance: 2000,
      grossPay: 23000,
      netPay: 20800
    },
    employmentHistory: [
      { role: 'Operations Associate', company: 'TruckMitr One', period: '2024 - Present' }
    ],
    documents: [
      { type: 'Aadhaar Card', status: 'VERIFIED', verifiedAt: '2024-06-16' }
    ],
    stats: { attendanceRate: '94%', leavesRemaining: 15, openTasks: 5 }
  },
  {
    id: 'emp-7',
    employeeId: 'TMEMP007',
    name: 'Kamini Verma',
    avatarUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=120&h=120&q=80',
    email: 'kamini.verma@truckmitr.com',
    phone: '+91 98765 43216',
    designation: 'Telecaller Associate',
    departmentId: 'dept-sales',
    departmentName: 'Sales & Growth',
    reportingManagerId: 'usr-tele-1',
    reportingManagerName: 'Sonam Sharma (Lead)',
    status: 'ACTIVE',
    joinedDate: '2024-07-01',
    workMode: 'Office',
    location: 'Regional Hub, Jaipur',
    salaryInfo: {
      basicSalary: 13500,
      hra: 6750,
      specialAllowance: 1750,
      grossPay: 22000,
      netPay: 19900
    },
    employmentHistory: [
      { role: 'Telecaller Associate', company: 'TruckMitr One', period: '2024 - Present' }
    ],
    documents: [
      { type: 'Aadhaar Card', status: 'VERIFIED', verifiedAt: '2024-07-02' }
    ],
    stats: { attendanceRate: '92%', leavesRemaining: 16, openTasks: 7 }
  },
  {
    id: 'emp-8',
    employeeId: 'TMEMP008',
    name: 'Vikram Malhotra',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
    email: 'vikram.malhotra@truckmitr.com',
    phone: '+91 98765 43217',
    designation: 'Senior Accountant & Comptroller',
    departmentId: 'dept-fin',
    departmentName: 'Finance & Accounts',
    reportingManagerId: 'usr-ceo-1',
    reportingManagerName: 'Anil Kumar (CEO)',
    status: 'ACTIVE',
    joinedDate: '2024-03-15',
    workMode: 'Office',
    location: 'Headquarters, Delhi',
    salaryInfo: {
      basicSalary: 24000,
      hra: 12000,
      specialAllowance: 6000,
      grossPay: 42000,
      netPay: 37900
    },
    employmentHistory: [
      { role: 'Accountant', company: 'TruckMitr One', period: '2024 - Present' },
      { role: 'Audit Assistant', company: 'Singhal & Co. CAs', period: '2020 - 2024' }
    ],
    documents: [
      { type: 'Aadhaar Card', status: 'VERIFIED', verifiedAt: '2024-03-16' },
      { type: 'B.Com Degree', status: 'VERIFIED', verifiedAt: '2024-03-16' }
    ],
    stats: { attendanceRate: '99%', leavesRemaining: 12, openTasks: 2 }
  }
];

export const EMPLOYEE_STATS = {
  totalStaff: 8,
  activeStaff: 8,
  onPremiseCount: 7,
  hybridCount: 1,
  departmentsCount: 6
};
