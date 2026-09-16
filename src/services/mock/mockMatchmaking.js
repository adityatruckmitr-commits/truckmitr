/**
 * TruckMitr One — Dedicated Mock Service for Matchmaking Module
 */

export const MATCHMAKING_STAGES = [
  { id: 'APPLICATIONS', label: 'Applications', color: '#3B82F6', bgColor: '#EFF6FF', borderColor: '#BFDBFE' },
  { id: 'SCREENED', label: 'Screened & Connected', color: '#8B5CF6', bgColor: '#F5F3FF', borderColor: '#DDD6FE' },
  { id: 'INTERVIEWS', label: 'Interviews Scheduled', color: '#F59E0B', bgColor: '#FFFBEB', borderColor: '#FDE68A' },
  { id: 'SELECTED', label: 'Selected', color: '#EC4899', bgColor: '#FDF2F8', borderColor: '#FBCFE8' },
  { id: 'JOINED', label: 'Joined & Deployed', color: '#10B981', bgColor: '#ECFDF5', borderColor: '#A7F3D0' }
];

export const MATCHMAKING_FUNNEL_DATA = [
  { step: 'Applications', count: 128, percent: '100%', color: '#3B82F6', icon: 'FileText' },
  { step: 'Screened & Connected', count: 84, percent: '66%', color: '#8B5CF6', icon: 'PhoneCall' },
  { step: 'Interviews Scheduled', count: 48, percent: '38%', color: '#F59E0B', icon: 'Video' },
  { step: 'Selected', count: 24, percent: '19%', color: '#EC4899', icon: 'UserCheck' },
  { step: 'Joined & Deployed', count: 16, percent: '13%', color: '#10B981', icon: 'Award' }
];

export const INITIAL_MATCHES_DATA = [
  {
    id: 'mm-1',
    matchCode: 'MM-901',
    stage: 'JOINED',
    driverName: 'Ravi Kumar',
    driverTmid: 'TM2609234',
    driverAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
    driverPhone: '+91 98765 43210',
    driverLicense: 'HMV Commercial',
    driverExperience: '7 Years',
    jobId: 'JB9823',
    jobTitle: '18 Ton Container Driver',
    transporterName: 'Sharma Logistics & Fleet Services',
    transporterId: 'TR-1001',
    transporterPhone: '+91 98234 56789',
    route: 'Sitapur → Hoshiarpur',
    vehicleType: '18 Ton Container',
    salaryOffer: '₹28,500 / month',
    daysInStage: 1,
    createdDate: '2026-09-06',
    stageHistory: [
      { stage: 'Applications', timestamp: '06 Sep 2026 10:30', updatedBy: 'Ramesh (Telecaller)', notes: 'Candidate expressed high interest in north corridor' },
      { stage: 'Screened & Connected', timestamp: '07 Sep 2026 14:15', updatedBy: 'Sonam Sharma', notes: 'DL verified, verified clean accident record' },
      { stage: 'Interviews Scheduled', timestamp: '08 Sep 2026 11:00', updatedBy: 'Sonam Sharma', notes: 'Telephonic interview with Fleet Manager Karan' },
      { stage: 'Selected', timestamp: '09 Sep 2026 16:30', updatedBy: 'Aditya Kumar', notes: 'Offer letter generated at ₹28.5k' },
      { stage: 'Joined & Deployed', timestamp: '10 Sep 2026 11:20', updatedBy: 'Aditya Kumar', notes: 'Physical truck handover completed' }
    ]
  },
  {
    id: 'mm-2',
    matchCode: 'MM-902',
    stage: 'INTERVIEWS',
    driverName: 'Suresh Yadav',
    driverTmid: 'TM2609235',
    driverAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
    driverPhone: '+91 98765 43211',
    driverLicense: 'Container / Heavy',
    driverExperience: '5 Years',
    jobId: 'JB9821',
    jobTitle: 'Container Route Driver',
    transporterName: 'Singh Roadlines Hub',
    transporterId: 'TR-1003',
    transporterPhone: '+91 98450 99887',
    route: 'Delhi → Jaipur',
    vehicleType: '24 Ton Trailer',
    salaryOffer: '₹26,000 / month',
    daysInStage: 2,
    createdDate: '2026-09-08',
    stageHistory: [
      { stage: 'Applications', timestamp: '08 Sep 2026 11:00', updatedBy: 'Sonam Sharma', notes: 'Auto-matched based on Delhi residence' },
      { stage: 'Screened & Connected', timestamp: '08 Sep 2026 16:00', updatedBy: 'Sonam Sharma', notes: 'Candidate confirmed availability for long routes' },
      { stage: 'Interviews Scheduled', timestamp: '09 Sep 2026 15:40', updatedBy: 'Sonam Sharma', notes: 'Interview scheduled with Harpreet Singh' }
    ]
  },
  {
    id: 'mm-3',
    matchCode: 'MM-903',
    stage: 'SELECTED',
    driverName: 'Mahesh Patel',
    driverTmid: 'TM2609237',
    driverAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&h=120&q=80',
    driverPhone: '+91 98765 43213',
    driverLicense: 'Tanker / Hazmat',
    driverExperience: '12 Years',
    jobId: 'JB9822',
    jobTitle: 'Hazmat Tanker Driver',
    transporterName: 'Patel Transport Corporation',
    transporterId: 'TR-1002',
    transporterPhone: '+91 98111 22334',
    route: 'Surat → Dahej',
    vehicleType: 'Chemical Tanker',
    salaryOffer: '₹34,000 / month',
    daysInStage: 1,
    createdDate: '2026-09-07',
    stageHistory: [
      { stage: 'Applications', timestamp: '07 Sep 2026 09:30', updatedBy: 'Aditya Kumar', notes: 'Hazmat endorsed driver matched' },
      { stage: 'Screened & Connected', timestamp: '08 Sep 2026 10:00', updatedBy: 'Aditya Kumar', notes: 'Safety certificate verified' },
      { stage: 'Interviews Scheduled', timestamp: '08 Sep 2026 15:00', updatedBy: 'Bhavesh Patel', notes: 'Technical yard driving test cleared' },
      { stage: 'Selected', timestamp: '09 Sep 2026 17:30', updatedBy: 'Aditya Kumar', notes: 'Joining scheduled for tomorrow' }
    ]
  },
  {
    id: 'mm-4',
    matchCode: 'MM-904',
    stage: 'SCREENED',
    driverName: 'Amit Singh',
    driverTmid: 'TM2609236',
    driverAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
    driverPhone: '+91 98765 43212',
    driverLicense: 'Trailer Commercial',
    driverExperience: '9 Years',
    jobId: 'JB9820',
    jobTitle: '12 Ton Open Body Driver',
    transporterName: 'Kumar Freight Forwarders',
    transporterId: 'TR-1004',
    transporterPhone: '+91 97654 32109',
    route: 'Nagpur → Bhopal',
    vehicleType: '12 Ton Open Body',
    salaryOffer: '₹22,000 / month',
    daysInStage: 3,
    createdDate: '2026-09-08',
    stageHistory: [
      { stage: 'Applications', timestamp: '08 Sep 2026 14:00', updatedBy: 'Raksha (Telecaller)', notes: 'Lead received from WhatsApp campaign' },
      { stage: 'Screened & Connected', timestamp: '09 Sep 2026 11:20', updatedBy: 'Raksha', notes: 'Awaiting Transporter interview slot' }
    ]
  },
  {
    id: 'mm-5',
    matchCode: 'MM-905',
    stage: 'APPLICATIONS',
    driverName: 'Rakesh Sharma',
    driverTmid: 'TM2609239',
    driverAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
    driverPhone: '+91 98765 43215',
    driverLicense: 'LCV Commercial',
    driverExperience: '6 Years',
    jobId: 'JB9823',
    jobTitle: '18 Ton Container Driver',
    transporterName: 'Sharma Logistics & Fleet Services',
    transporterId: 'TR-1001',
    transporterPhone: '+91 98234 56789',
    route: 'Sitapur → Hoshiarpur',
    vehicleType: '18 Ton Container',
    salaryOffer: '₹27,000 / month',
    daysInStage: 1,
    createdDate: '2026-09-10',
    stageHistory: [
      { stage: 'Applications', timestamp: '10 Sep 2026 09:00', updatedBy: 'System', notes: 'Direct in-app driver application' }
    ]
  },
  {
    id: 'mm-6',
    matchCode: 'MM-906',
    stage: 'APPLICATIONS',
    driverName: 'Manoj Verma',
    driverTmid: 'TM2609240',
    driverAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
    driverPhone: '+91 98765 43216',
    driverLicense: 'HMV Commercial',
    driverExperience: '3 Years',
    jobId: 'JB9820',
    jobTitle: '12 Ton Open Body Driver',
    transporterName: 'Kumar Freight Forwarders',
    transporterId: 'TR-1004',
    transporterPhone: '+91 97654 32109',
    route: 'Nagpur → Bhopal',
    vehicleType: '12 Ton Open Body',
    salaryOffer: '₹21,000 / month',
    daysInStage: 4,
    createdDate: '2026-09-07',
    stageHistory: [
      { stage: 'Applications', timestamp: '07 Sep 2026 15:30', updatedBy: 'System', notes: 'Application pending initial verification' }
    ]
  }
];

export const DRILLDOWN_JOBS = [
  {
    id: 'JB9823',
    title: '18 Ton Container Driver',
    transporter: 'Sharma Logistics',
    route: 'Sitapur → Hoshiarpur',
    vehicleType: '18 Ton Container',
    driversNeeded: 2,
    driversPlaced: 1,
    stageCounts: { APPLICATIONS: 1, SCREENED: 0, INTERVIEWS: 0, SELECTED: 0, JOINED: 1 },
    status: 'Active'
  },
  {
    id: 'JB9822',
    title: 'Hazmat Tanker Driver',
    transporter: 'Patel Transport Co',
    route: 'Surat → Dahej',
    vehicleType: 'Chemical Tanker',
    driversNeeded: 5,
    driversPlaced: 3,
    stageCounts: { APPLICATIONS: 0, SCREENED: 0, INTERVIEWS: 0, SELECTED: 1, JOINED: 2 },
    status: 'Active'
  },
  {
    id: 'JB9821',
    title: 'Container Route Driver',
    transporter: 'Singh Roadlines Hub',
    route: 'Delhi → Jaipur',
    vehicleType: '24 Ton Trailer',
    driversNeeded: 3,
    driversPlaced: 1,
    stageCounts: { APPLICATIONS: 0, SCREENED: 0, INTERVIEWS: 1, SELECTED: 0, JOINED: 1 },
    status: 'Active'
  },
  {
    id: 'JB9820',
    title: '12 Ton Open Body Driver',
    transporter: 'Kumar Freight Forwarders',
    route: 'Nagpur → Bhopal',
    vehicleType: '12 Ton Open Body',
    driversNeeded: 4,
    driversPlaced: 0,
    stageCounts: { APPLICATIONS: 1, SCREENED: 1, INTERVIEWS: 0, SELECTED: 0, JOINED: 0 },
    status: 'Pending'
  }
];
