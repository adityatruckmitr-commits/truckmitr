/**
 * TruckMitr One — Central Mock Data for Global Shell & Dashboards
 */

// 1. Sidebar Item Badges (Pending action counters)
export const SIDEBAR_BADGES = {
  approvals: { count: 12, variant: 'danger' },
  notifications: { count: 8, variant: 'danger' },
  'driver-ki-awaaz': { count: 14, variant: 'warning' },
  crm: { count: 6, variant: 'info' },
  tasks: { count: 3, variant: 'warning' }
};

// 2. Global Searchable Entities for CommandPalette (Ctrl+K)
export const SEARCHABLE_ENTITIES = [
  // Drivers
  { id: 'TM2609234', title: 'Ravi Kumar (32 yrs)', subtitle: 'HMV Driver • Haryana • TM2609234', type: 'Driver', category: 'Drivers', route: '/one/drivers' },
  { id: 'TM2609235', title: 'Suresh Yadav (28 yrs)', subtitle: 'Container Driver • Uttar Pradesh • TM2609235', type: 'Driver', category: 'Drivers', route: '/one/drivers' },
  { id: 'TM2609236', title: 'Amit Singh (35 yrs)', subtitle: 'Trailer Driver • Delhi • TM2609236', type: 'Driver', category: 'Drivers', route: '/one/drivers' },
  { id: 'TM2609237', title: 'Mahesh Patel (40 yrs)', subtitle: 'Tanker Driver • Gujarat • TM2609237', type: 'Driver', category: 'Drivers', route: '/one/drivers' },
  { id: 'TM2609238', title: 'Imran Khan (29 yrs)', subtitle: 'HMV Driver • Maharashtra • TM2609238', type: 'Driver', category: 'Drivers', route: '/one/drivers' },

  // Transporters
  { id: 'TR-1001', title: 'Sharma Logistics & Fleet', subtitle: 'Fleet Owner (24 Trucks) • GST: 27AABCS1234F1Z5 • Mumbai', type: 'Transporter', category: 'Transporters', route: '/one/transporters' },
  { id: 'TR-1002', title: 'Patel Transport Corporation', subtitle: 'Logistics Co • GST: 24ABFPP5678H2Z9 • Ahmedabad', type: 'Transporter', category: 'Transporters', route: '/one/transporters' },
  { id: 'TR-1003', title: 'Singh Roadlines Hub', subtitle: 'Fleet Owner (18 Trucks) • Gurgaon • Premium Tier', type: 'Transporter', category: 'Transporters', route: '/one/transporters' },
  { id: 'TR-1004', title: 'Kumar Freight Forwarders', subtitle: 'Broker & Fleet • Nagpur • Verified', type: 'Transporter', category: 'Transporters', route: '/one/transporters' },

  // Matchmaking Jobs
  { id: 'JB9823', title: 'Job #JB9823: Sharma Logistics', subtitle: 'Route: Sitapur → Hoshiarpur • 12 Ton Open • 2 Drivers Needed', type: 'Job', category: 'Matchmaking', route: '/one/matchmaking' },
  { id: 'JB9822', title: 'Job #JB9822: Patel Transport Co', subtitle: 'Route: Unnao → Kashipur • 10 Ton Open • 5 Drivers Needed', type: 'Job', category: 'Matchmaking', route: '/one/matchmaking' },
  { id: 'JB9821', title: 'Job #JB9821: Singh Roadlines', subtitle: 'Route: Delhi → Jaipur • 18 Ton Container • 3 Drivers Needed', type: 'Job', category: 'Matchmaking', route: '/one/matchmaking' },
  { id: 'JB9820', title: 'Job #JB9820: Kumar Freight', subtitle: 'Route: Nagpur → Bhopal • 12 Ton Open • 4 Drivers Needed', type: 'Job', category: 'Matchmaking', route: '/one/matchmaking' },

  // Employees
  { id: 'TMEMP001', title: 'Anil Kumar', subtitle: 'Chief Executive Officer • Executive & Finance', type: 'Staff', category: 'Employees', route: '/one/employees' },
  { id: 'TMEMP002', title: 'Deepak Arora', subtitle: 'Super Administrator • Technology & Product', type: 'Staff', category: 'Employees', route: '/one/employees' },
  { id: 'TMEMP003', title: 'Aditya Kumar', subtitle: 'Operations & Fleet Manager • Operations', type: 'Staff', category: 'Employees', route: '/one/employees' },
  { id: 'TMEMP004', title: 'Pratima Singh', subtitle: 'HR Lead & People Ops • Human Resources', type: 'Staff', category: 'Employees', route: '/one/employees' },
  { id: 'TMEMP005', title: 'Sonam Sharma', subtitle: 'Senior Matchmaking Telecaller • Sales & Calling', type: 'Staff', category: 'Employees', route: '/one/employees' },

  // Payments & Invoices
  { id: 'INV-260910-001', title: 'Invoice #INV-260910-001 (₹199)', subtitle: 'Sonu Yadav (Driver) • Subscription Payment (UPI)', type: 'Payment', category: 'Revenue', route: '/one/revenue' },
  { id: 'INV-260910-002', title: 'Invoice #INV-260910-002 (₹5,000)', subtitle: 'SVT Logistics • Driver Placement Fee (NEFT)', type: 'Payment', category: 'Revenue', route: '/one/revenue' }
];

// 3. Time Series Data for PerformanceChart (Combo Bar + Line — Monthly Figures ~4x weekly run-rate)
export const BUSINESS_PERFORMANCE_DATA = [
  { month: 'Jan', revenue: 112000, registrations: 1200 },
  { month: 'Feb', revenue: 136000, registrations: 1650 },
  { month: 'Mar', revenue: 168000, registrations: 2100 },
  { month: 'Apr', revenue: 196000, registrations: 2450 },
  { month: 'May', revenue: 232000, registrations: 2900 },
  { month: 'Jun', revenue: 256000, registrations: 3150 },
  { month: 'Jul', revenue: 288000, registrations: 3420 },
  { month: 'Aug', revenue: 316000, registrations: 3780 },
  { month: 'Sep', revenue: 343528, registrations: 3891 }
];

// 4. Matchmaking Pipeline Funnel Data (Candidate Lifecycle Pipeline - Strictly Monotonic)
export const MATCHMAKING_PIPELINE_DATA = [
  { step: 'Applications', count: 128, percent: '100%', color: '#3B82F6', icon: 'FileText' },
  { step: 'Screened & Connected', count: 84, percent: '66%', color: '#8B5CF6', icon: 'PhoneCall' },
  { step: 'Interviews Scheduled', count: 48, percent: '38%', color: '#F59E0B', icon: 'Video' },
  { step: 'Selected', count: 24, percent: '19%', color: '#EC4899', icon: 'UserCheck' },
  { step: 'Joined & Deployed', count: 16, percent: '13%', color: '#10B981', icon: 'Award' }
];

// 5. Revenue Mix Donut Data
export const REVENUE_MIX_DATA = [
  { name: 'Subscriptions', value: 48500, percent: 56, color: '#1467FF' },
  { name: 'Matchmaking', value: 27500, percent: 32, color: '#F59E0B' },
  { name: 'Verification', value: 9882, percent: 12, color: '#10B981' }
];

// 6. Call Outcomes Donut Data
export const CALL_OUTCOMES_DATA = [
  { name: 'Connected', value: 1482, percent: 33, color: '#10B981' },
  { name: 'Not Connected', value: 2354, percent: 52, color: '#EF4444' },
  { name: 'Callback Later', value: 452, percent: 10, color: '#F59E0B' },
  { name: 'Not Interested', value: 232, percent: 5, color: '#9333EA' }
];

// 7. Driver vs Transporter Monthly Trend Data
export const DRIVER_TRANSPORTER_TREND = [
  { month: 'Jan', drivers: 2100, transporters: 420 },
  { month: 'Feb', drivers: 2450, transporters: 510 },
  { month: 'Mar', drivers: 2800, transporters: 620 },
  { month: 'Apr', drivers: 3050, transporters: 710 },
  { month: 'May', drivers: 3250, transporters: 800 },
  { month: 'Jun', drivers: 3450, transporters: 890 },
  { month: 'Jul', drivers: 3620, transporters: 950 },
  { month: 'Aug', drivers: 3780, transporters: 1010 },
  { month: 'Sep', drivers: 3891, transporters: 1056 }
];

// 8. Department Wise Headcount Data
export const DEPARTMENT_HEADCOUNT_DATA = [
  { name: 'Operations', value: 10, percent: 31, color: '#1467FF' },
  { name: 'Sales & Telecalling', value: 8, percent: 25, color: '#10B981' },
  { name: 'Technology', value: 5, percent: 16, color: '#8B5CF6' },
  { name: 'HR & Admin', value: 3, percent: 9, color: '#F59E0B' },
  { name: 'Marketing', value: 3, percent: 9, color: '#EC4899' },
  { name: 'Finance', value: 2, percent: 6, color: '#0284C7' },
  { name: 'Others', value: 1, percent: 4, color: '#64748B' }
];

// 9. Recent Activities for CEO & Admin Dashboards
export const RECENT_ACTIVITIES = [
  { time: '11:32 AM', type: 'Driver Registration', details: 'New driver registered (TM2609234 - Ravi Kumar)', user: 'Ramesh', status: 'Completed' },
  { time: '11:20 AM', type: 'Job Posted', details: 'New job posted (Job ID: JB9823 - Sharma Logistics)', user: 'Karan', status: 'Pending Approval' },
  { time: '10:45 AM', type: 'Leave Request', details: 'Leave request from Sonam (2 days Casual)', user: 'Sonam', status: 'Pending Approval' },
  { time: '10:30 AM', type: 'Payment Received', details: '₹2,500 subscription payment (SVT Logistics)', user: 'System', status: 'Completed' },
  { time: '09:50 AM', type: 'DL Verification', details: 'Driving License verified for Suresh Yadav (TM2609235)', user: 'Deepak', status: 'Completed' }
];

// 10. Live Team / Caller Status
export const LIVE_TEAM_STATUS = [
  { name: 'Sonam', status: 'On Call', currentCall: 'Ravi Kumar', duration: '02:14', color: '#10B981' },
  { name: 'Aditya', status: 'On Call', currentCall: 'Sharma Trans.', duration: '01:32', color: '#10B981' },
  { name: 'Raksha', status: 'Callback', currentCall: '-', duration: '-', color: '#F59E0B' },
  { name: 'Pratima', status: 'Idle (26m)', currentCall: '-', duration: '-', color: '#EF4444' },
  { name: 'Kamini', status: 'On Call', currentCall: 'Verma Logistics', duration: '03:12', color: '#10B981' }
];

// 11. Top Performers Leaderboard
export const TOP_PERFORMERS = [
  { rank: 1, name: 'Sonam', conversions: 15, revenue: 6005, avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=80&h=80&q=80' },
  { rank: 2, name: 'Aditya', conversions: 12, revenue: 11388, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80' },
  { rank: 3, name: 'Raksha', conversions: 5, revenue: 4155, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&h=80&q=80' },
  { rank: 4, name: 'Pratima', conversions: 2, revenue: 2980, avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&h=80&q=80' },
  { rank: 5, name: 'Kamini', conversions: 1, revenue: 1250, avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=80&h=80&q=80' }
];

// 12. Urgent Action Centre Items (Exceptions / SLA Breaches)
export const ACTION_CENTRE_ITEMS = [
  { id: 'act-1', label: 'Driver jobs awaiting authentication', count: 12, level: 'HIGH', route: '/one/matchmaking' },
  { id: 'act-2', label: 'Leave requests awaiting approval', count: 5, level: 'MEDIUM', route: '/one/approvals' },
  { id: 'act-3', label: 'Expenses requiring authorization', count: 3, level: 'HIGH', route: '/one/approvals' },
  { id: 'act-4', label: 'Job postings awaiting approval', count: 8, level: 'HIGH', route: '/one/matchmaking' },
  { id: 'act-5', label: 'Callbacks overdue (> 2 hours)', count: 17, level: 'CRITICAL', route: '/one/crm' },
  { id: 'act-6', label: 'Driver verification pending > 24 hrs', count: 4, level: 'HIGH', route: '/one/drivers' }
];
