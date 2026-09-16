/**
 * TruckMitr One — Dedicated Mock Service for Assets Management Module
 */

export const ASSET_TYPES = [
  { id: 'LAPTOP', label: 'Laptops & Workstations', color: '#3B82F6' },
  { id: 'PHONE', label: 'Calling Handsets & Tablets', color: '#10B981' },
  { id: 'SIM', label: 'Telephony SIM Cards', color: '#8B5CF6' },
  { id: 'VEHICLE', label: 'Operations Inspection Bikes/Cars', color: '#F59E0B' },
  { id: 'PERIPHERAL', label: 'Printers & Networking Hubs', color: '#EC4899' }
];

export const INITIAL_ASSETS_DATA = [
  {
    id: 'ast-1',
    assetTag: 'TM-AST-101',
    name: 'Dell Latitude 5420 Laptop',
    type: 'LAPTOP',
    typeName: 'Laptops & Workstations',
    serialNumber: 'DL-5420-998812',
    assignedTo: {
      name: 'Deepak Arora',
      employeeId: 'TMEMP002',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80'
    },
    departmentId: 'dept-tech',
    departmentName: 'Technology & Product',
    purchaseDate: '2024-03-01',
    purchaseCost: 65000,
    annualDepreciationRate: 20, // 20% per year
    condition: 'EXCELLENT',
    maintenanceStatus: 'OPERATIONAL',
    lastServiceDate: '2026-06-15',
    vendor: 'Dell India Direct Enterprise',
    assignmentHistory: [
      { employeeName: 'Deepak Arora', employeeId: 'TMEMP002', from: '2024-03-01', to: 'Present', notes: 'Primary developer workstation' }
    ],
    maintenanceLog: [
      { date: '2026-06-15', type: 'Preventive Cleaning & Thermal Paste', cost: 850, vendor: 'UrbanCare IT' },
      { date: '2025-06-10', type: 'RAM Upgrade (16GB -> 32GB)', cost: 4200, vendor: 'Dell Certified Service' }
    ]
  },
  {
    id: 'ast-2',
    assetTag: 'TM-AST-102',
    name: 'Samsung Galaxy F14 Calling Phone',
    type: 'PHONE',
    typeName: 'Calling Handsets & Tablets',
    serialNumber: 'SM-F14-883100',
    assignedTo: {
      name: 'Sonam Sharma',
      employeeId: 'TMEMP005',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=80&h=80&q=80'
    },
    departmentId: 'dept-sales',
    departmentName: 'Sales & Growth',
    purchaseDate: '2024-06-01',
    purchaseCost: 12500,
    annualDepreciationRate: 25,
    condition: 'GOOD',
    maintenanceStatus: 'OPERATIONAL',
    lastServiceDate: '2026-01-10',
    vendor: 'Samsung Commercial Sales',
    assignmentHistory: [
      { employeeName: 'Sonam Sharma', employeeId: 'TMEMP005', from: '2024-06-01', to: 'Present', notes: 'Daily driver calling device' }
    ],
    maintenanceLog: [
      { date: '2026-01-10', type: 'Screen Guard & Shockproof Case Replacement', cost: 450, vendor: 'Local Accessories' }
    ]
  },
  {
    id: 'ast-3',
    assetTag: 'TM-AST-103',
    name: 'Hero Splendor Plus Field Bike',
    type: 'VEHICLE',
    typeName: 'Operations Inspection Bikes/Cars',
    serialNumber: 'DL-08-AB-9821',
    assignedTo: {
      name: 'Aditya Kumar',
      employeeId: 'TMEMP003',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80'
    },
    departmentId: 'dept-ops',
    departmentName: 'Operations & Fleet',
    purchaseDate: '2024-04-15',
    purchaseCost: 78000,
    annualDepreciationRate: 15,
    condition: 'GOOD',
    maintenanceStatus: 'OPERATIONAL',
    lastServiceDate: '2026-08-10',
    vendor: 'Hero MotoCorp Delhi Dealership',
    assignmentHistory: [
      { employeeName: 'Aditya Kumar', employeeId: 'TMEMP003', from: '2024-04-15', to: 'Present', notes: 'Assigned for Sanjay Gandhi Transport Nagar yard visits' }
    ],
    maintenanceLog: [
      { date: '2026-08-10', type: 'Engine Oil Change & Brake Tuning', cost: 1200, vendor: 'Hero Authorized Workshop' },
      { date: '2026-02-14', type: 'Periodic Maintenance Service', cost: 1100, vendor: 'Hero Authorized Workshop' }
    ]
  },
  {
    id: 'ast-4',
    assetTag: 'TM-AST-104',
    name: 'HP LaserJet Pro MFP 4104fdw',
    type: 'PERIPHERAL',
    typeName: 'Printers & Networking Hubs',
    serialNumber: 'HP-MFP-4104-12',
    assignedTo: {
      name: 'Pratima Singh',
      employeeId: 'TMEMP004',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&h=80&q=80'
    },
    departmentId: 'dept-hr',
    departmentName: 'Human Resources',
    purchaseDate: '2024-05-10',
    purchaseCost: 38000,
    annualDepreciationRate: 20,
    condition: 'NEEDS_SERVICE',
    maintenanceStatus: 'UNDER_MAINTENANCE',
    lastServiceDate: '2026-09-02',
    vendor: 'HP India Commercial',
    assignmentHistory: [
      { employeeName: 'Pratima Singh', employeeId: 'TMEMP004', from: '2024-05-10', to: 'Present', notes: 'Central office agreements and payslips printing' }
    ],
    maintenanceLog: [
      { date: '2026-09-02', type: 'Toner Cartridge Replacement & Paper Jam Roller Fix', cost: 2400, vendor: 'HP Onsite Service' }
    ]
  },
  {
    id: 'ast-5',
    assetTag: 'TM-AST-105',
    name: 'Airtel Postpaid 5G Commercial SIM (8800123456)',
    type: 'SIM',
    typeName: 'Telephony SIM Cards',
    serialNumber: 'SIM-8991-0012-9988',
    assignedTo: {
      name: 'Kamini Verma',
      employeeId: 'TMEMP007',
      avatarUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=80&h=80&q=80'
    },
    departmentId: 'dept-sales',
    departmentName: 'Sales & Growth',
    purchaseDate: '2024-07-01',
    purchaseCost: 500,
    annualDepreciationRate: 0,
    condition: 'EXCELLENT',
    maintenanceStatus: 'OPERATIONAL',
    lastServiceDate: '2026-09-01',
    vendor: 'Bharti Airtel Enterprise',
    assignmentHistory: [
      { employeeName: 'Kamini Verma', employeeId: 'TMEMP007', from: '2024-07-01', to: 'Present', notes: 'Dedicated telecalling queue line' }
    ],
    maintenanceLog: []
  }
];

export const ASSET_STATS = {
  totalAssets: 18,
  assignedAssets: 16,
  underMaintenance: 2,
  totalBookValue: 345000
};
