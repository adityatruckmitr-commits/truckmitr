/**
 * TruckMitr One — Dedicated Mock Service for Attendance Module
 */

export const ATTENDANCE_DATES = [
  '01 Sep', '02 Sep', '03 Sep', '04 Sep', '05 Sep', '06 Sep', '07 Sep',
  '08 Sep', '09 Sep', '10 Sep', '11 Sep', '12 Sep', '13 Sep', '14 Sep'
];

export const INITIAL_ATTENDANCE_DATA = [
  {
    employeeId: 'TMEMP001',
    name: 'Anil Kumar',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
    designation: 'Chief Executive Officer',
    departmentId: 'dept-lead',
    departmentName: 'Leadership & Executive',
    dailyStatus: {
      '01 Sep': 'P', '02 Sep': 'P', '03 Sep': 'P', '04 Sep': 'P', '05 Sep': 'P', '06 Sep': 'W', '07 Sep': 'P',
      '08 Sep': 'P', '09 Sep': 'P', '10 Sep': 'P', '11 Sep': 'P', '12 Sep': 'P', '13 Sep': 'P', '14 Sep': 'P'
    },
    lateArrivals: 0,
    checkInAvg: '09:12 AM',
    checkOutAvg: '07:45 PM'
  },
  {
    employeeId: 'TMEMP002',
    name: 'Deepak Arora',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
    designation: 'Super Administrator & Tech Lead',
    departmentId: 'dept-tech',
    departmentName: 'Technology & Product',
    dailyStatus: {
      '01 Sep': 'P', '02 Sep': 'P', '03 Sep': 'P', '04 Sep': 'P', '05 Sep': 'W', '06 Sep': 'W', '07 Sep': 'P',
      '08 Sep': 'P', '09 Sep': 'P', '10 Sep': 'P', '11 Sep': 'P', '12 Sep': 'P', '13 Sep': 'P', '14 Sep': 'P'
    },
    lateArrivals: 1,
    checkInAvg: '09:25 AM',
    checkOutAvg: '08:15 PM'
  },
  {
    employeeId: 'TMEMP003',
    name: 'Aditya Kumar',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
    designation: 'Operations & Fleet Manager',
    departmentId: 'dept-ops',
    departmentName: 'Operations & Fleet',
    dailyStatus: {
      '01 Sep': 'P', '02 Sep': 'P', '03 Sep': 'P', '04 Sep': 'P', '05 Sep': 'P', '06 Sep': 'P', '07 Sep': 'P',
      '08 Sep': 'P', '09 Sep': 'P', '10 Sep': 'P', '11 Sep': 'L', '12 Sep': 'P', '13 Sep': 'P', '14 Sep': 'P'
    },
    lateArrivals: 2,
    checkInAvg: '09:18 AM',
    checkOutAvg: '07:30 PM'
  },
  {
    employeeId: 'TMEMP004',
    name: 'Pratima Singh',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80',
    designation: 'HR Lead & People Ops',
    departmentId: 'dept-hr',
    departmentName: 'Human Resources',
    dailyStatus: {
      '01 Sep': 'P', '02 Sep': 'P', '03 Sep': 'W', '04 Sep': 'P', '05 Sep': 'P', '06 Sep': 'P', '07 Sep': 'P',
      '08 Sep': 'P', '09 Sep': 'P', '10 Sep': 'P', '11 Sep': 'P', '12 Sep': 'P', '13 Sep': 'W', '14 Sep': 'P'
    },
    lateArrivals: 0,
    checkInAvg: '09:05 AM',
    checkOutAvg: '06:45 PM'
  },
  {
    employeeId: 'TMEMP005',
    name: 'Sonam Sharma',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&h=120&q=80',
    designation: 'Senior Matchmaking Telecaller',
    departmentId: 'dept-sales',
    departmentName: 'Sales & Growth',
    dailyStatus: {
      '01 Sep': 'P', '02 Sep': 'P', '03 Sep': 'P', '04 Sep': 'P', '05 Sep': 'P', '06 Sep': 'P', '07 Sep': 'P',
      '08 Sep': 'P', '09 Sep': 'P', '10 Sep': 'P', '11 Sep': 'P', '12 Sep': 'L', '13 Sep': 'L', '14 Sep': 'P'
    },
    lateArrivals: 3,
    checkInAvg: '09:35 AM',
    checkOutAvg: '06:30 PM'
  },
  {
    employeeId: 'TMEMP006',
    name: 'Raksha Patel',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80',
    designation: 'Operations Associate',
    departmentId: 'dept-ops',
    departmentName: 'Operations & Fleet',
    dailyStatus: {
      '01 Sep': 'P', '02 Sep': 'P', '03 Sep': 'P', '04 Sep': 'P', '05 Sep': 'P', '06 Sep': 'P', '07 Sep': 'P',
      '08 Sep': 'P', '09 Sep': 'P', '10 Sep': 'P', '11 Sep': 'P', '12 Sep': 'P', '13 Sep': 'P', '14 Sep': 'W'
    },
    lateArrivals: 1,
    checkInAvg: '09:10 AM',
    checkOutAvg: '06:40 PM'
  },
  {
    employeeId: 'TMEMP007',
    name: 'Kamini Verma',
    avatarUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=120&h=120&q=80',
    designation: 'Telecaller Associate',
    departmentId: 'dept-sales',
    departmentName: 'Sales & Growth',
    dailyStatus: {
      '01 Sep': 'P', '02 Sep': 'P', '03 Sep': 'P', '04 Sep': 'P', '05 Sep': 'P', '06 Sep': 'A', '07 Sep': 'P',
      '08 Sep': 'P', '09 Sep': 'P', '10 Sep': 'P', '11 Sep': 'P', '12 Sep': 'P', '13 Sep': 'P', '14 Sep': 'P'
    },
    lateArrivals: 4,
    checkInAvg: '09:42 AM',
    checkOutAvg: '06:30 PM'
  },
  {
    employeeId: 'TMEMP008',
    name: 'Vikram Malhotra',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
    designation: 'Senior Accountant',
    departmentId: 'dept-fin',
    departmentName: 'Finance & Accounts',
    dailyStatus: {
      '01 Sep': 'P', '02 Sep': 'P', '03 Sep': 'P', '04 Sep': 'P', '05 Sep': 'P', '06 Sep': 'P', '07 Sep': 'P',
      '08 Sep': 'P', '09 Sep': 'P', '10 Sep': 'P', '11 Sep': 'P', '12 Sep': 'P', '13 Sep': 'P', '14 Sep': 'P'
    },
    lateArrivals: 0,
    checkInAvg: '09:00 AM',
    checkOutAvg: '06:00 PM'
  }
];

export const STATUS_CODES = {
  P: { label: 'Present', color: '#059669', bg: '#ECFDF5', border: '#A7F3D0' },
  W: { label: 'WFH', color: '#2563EB', bg: '#EFF6FF', border: '#BFDBFE' },
  L: { label: 'On Leave', color: '#D97706', bg: '#FFFBEB', border: '#FDE68A' },
  A: { label: 'Absent', color: '#DC2626', bg: '#FEF2F2', border: '#FECACA' }
};
