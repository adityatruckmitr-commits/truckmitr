/**
 * TruckMitr One — Dedicated Mock Service for Transporters Module
 */

export const INITIAL_TRANSPORTERS_DATA = [
  {
    id: 'tr-1',
    transporterId: 'TR-1001',
    companyName: 'Sharma Logistics & Fleet Services',
    contactPerson: 'Karan Sharma',
    phone: '+91 98234 56789',
    email: 'karan@sharmalogistics.in',
    city: 'Mumbai',
    state: 'Maharashtra',
    fleetSize: 24,
    fleetType: 'Container, Multi-Axle, Trailer',
    primaryRoutes: ['Mumbai → Delhi', 'Sitapur → Hoshiarpur', 'Pune → Ahmedabad'],
    gstNumber: '27AABCS1234F1Z5',
    panNumber: 'AABCS1234F',
    status: 'ACTIVE',
    verificationStatus: 'VERIFIED',
    registrationDate: '2026-08-15',
    fleetSummary: { total: 24, activeOnRoad: 19, underMaintenance: 2, driverDeficit: 3 },
    documents: [
      { type: 'GST Registration Certificate', status: 'VERIFIED', verifiedAt: '2026-08-16 11:20', verifiedBy: 'Deepak Arora' },
      { type: 'Company PAN Card', status: 'VERIFIED', verifiedAt: '2026-08-16 11:25', verifiedBy: 'Deepak Arora' },
      { type: 'Fleet Vehicle RC Suite', status: 'VERIFIED', verifiedAt: '2026-08-16 14:00', verifiedBy: 'Deepak Arora' },
      { type: 'Transporter Master Agreement', status: 'VERIFIED', verifiedAt: '2026-08-17 10:00', verifiedBy: 'Deepak Arora' }
    ],
    activeJobPostings: [
      { id: 'JB9823', title: '18 Ton Container Driver', route: 'Sitapur → Hoshiarpur', driversNeeded: 2, driversPlaced: 1, status: 'Active', postedDate: '08 Sep 2026' },
      { id: 'JB9820', title: 'Open Body Bulk Trailer', route: 'Mumbai → Delhi', driversNeeded: 3, driversPlaced: 2, status: 'Active', postedDate: '02 Sep 2026' }
    ],
    driverMatches: [
      { driverName: 'Ravi Kumar', tmid: 'TM2609234', jobTitle: '18 Ton Container', matchedOn: '10 Sep 2026', status: 'Joined' },
      { driverName: 'Suresh Yadav', tmid: 'TM2609235', jobTitle: '18 Ton Container', matchedOn: '09 Sep 2026', status: 'Interviewing' }
    ],
    timeline: [
      { time: '10 Sep 2026, 11:20', action: 'Driver Ravi Kumar Joined on JB9823', actor: 'System' },
      { time: '08 Sep 2026, 09:30', action: 'Posted Job #JB9823', actor: 'Karan Sharma' },
      { time: '16 Aug 2026, 14:00', action: 'Full Verification Completed', actor: 'Deepak Arora' }
    ]
  },
  {
    id: 'tr-2',
    transporterId: 'TR-1002',
    companyName: 'Patel Transport Corporation',
    contactPerson: 'Bhavesh Patel',
    phone: '+91 98111 22334',
    email: 'bhavesh@pateltransport.co.in',
    city: 'Ahmedabad',
    state: 'Gujarat',
    fleetSize: 45,
    fleetType: 'Chemical Tankers, Bulk Carriers',
    primaryRoutes: ['Surat → Dahej', 'Ahmedabad → Delhi', 'Vadodara → Jaipur'],
    gstNumber: '24ABFPP5678H2Z9',
    panNumber: 'ABFPP5678H',
    status: 'ACTIVE',
    verificationStatus: 'VERIFIED',
    registrationDate: '2026-08-20',
    fleetSummary: { total: 45, activeOnRoad: 38, underMaintenance: 3, driverDeficit: 4 },
    documents: [
      { type: 'GST Registration Certificate', status: 'VERIFIED', verifiedAt: '2026-08-21 10:15', verifiedBy: 'Deepak Arora' },
      { type: 'Company PAN Card', status: 'VERIFIED', verifiedAt: '2026-08-21 10:20', verifiedBy: 'Deepak Arora' },
      { type: 'Hazmat Carrier Licenses', status: 'VERIFIED', verifiedAt: '2026-08-21 15:00', verifiedBy: 'Aditya Kumar' }
    ],
    activeJobPostings: [
      { id: 'JB9822', title: 'Hazmat Tanker Driver', route: 'Surat → Dahej', driversNeeded: 5, driversPlaced: 3, status: 'Active', postedDate: '07 Sep 2026' }
    ],
    driverMatches: [
      { driverName: 'Mahesh Patel', tmid: 'TM2609237', jobTitle: 'Hazmat Tanker Driver', matchedOn: '09 Sep 2026', status: 'Joined' }
    ],
    timeline: [
      { time: '09 Sep 2026, 17:30', action: 'Driver Mahesh Patel Joined', actor: 'Aditya Kumar' },
      { time: '07 Sep 2026, 14:10', action: 'Job #JB9822 Created', actor: 'Bhavesh Patel' }
    ]
  },
  {
    id: 'tr-3',
    transporterId: 'TR-1003',
    companyName: 'Singh Roadlines Hub',
    contactPerson: 'Harpreet Singh',
    phone: '+91 98450 99887',
    email: 'contact@singhroadlines.com',
    city: 'Gurgaon',
    state: 'Haryana',
    fleetSize: 18,
    fleetType: 'LCV, Heavy Multi-Axle Trucks',
    primaryRoutes: ['Delhi → Jaipur', 'Chandigarh → Ludhiana', 'Delhi → Lucknow'],
    gstNumber: '06AAACS9988D1Z2',
    panNumber: 'AAACS9988D',
    status: 'ACTIVE',
    verificationStatus: 'VERIFIED',
    registrationDate: '2026-08-28',
    fleetSummary: { total: 18, activeOnRoad: 15, underMaintenance: 1, driverDeficit: 2 },
    documents: [
      { type: 'GST Registration Certificate', status: 'VERIFIED', verifiedAt: '2026-08-29 12:00', verifiedBy: 'Deepak Arora' },
      { type: 'Company PAN Card', status: 'VERIFIED', verifiedAt: '2026-08-29 12:05', verifiedBy: 'Deepak Arora' }
    ],
    activeJobPostings: [
      { id: 'JB9821', title: 'Container Route Driver', route: 'Delhi → Jaipur', driversNeeded: 3, driversPlaced: 1, status: 'Active', postedDate: '05 Sep 2026' }
    ],
    driverMatches: [
      { driverName: 'Suresh Yadav', tmid: 'TM2609235', jobTitle: 'Container Route Driver', matchedOn: '09 Sep 2026', status: 'Interviewing' }
    ],
    timeline: [
      { time: '09 Sep 2026, 15:40', action: 'Interview Scheduled with Suresh Yadav', actor: 'Sonam Sharma' }
    ]
  },
  {
    id: 'tr-4',
    transporterId: 'TR-1004',
    companyName: 'Kumar Freight Forwarders',
    contactPerson: 'Vijay Kumar',
    phone: '+91 97654 32109',
    email: 'vijay@kumarfreight.com',
    city: 'Nagpur',
    state: 'Maharashtra',
    fleetSize: 8,
    fleetType: 'Open Body 12 Ton',
    primaryRoutes: ['Nagpur → Bhopal', 'Nagpur → Raipur'],
    gstNumber: '27AABCK9901M1Z4',
    panNumber: 'AABCK9901M',
    status: 'PENDING',
    verificationStatus: 'UNDER REVIEW',
    registrationDate: '2026-09-05',
    fleetSummary: { total: 8, activeOnRoad: 5, underMaintenance: 1, driverDeficit: 2 },
    documents: [
      { type: 'GST Registration Certificate', status: 'UNDER REVIEW', verifiedAt: '-', verifiedBy: '-' },
      { type: 'Company PAN Card', status: 'VERIFIED', verifiedAt: '2026-09-06 16:30', verifiedBy: 'Deepak Arora' }
    ],
    activeJobPostings: [
      { id: 'JB9820', title: '12 Ton Open Body Driver', route: 'Nagpur → Bhopal', driversNeeded: 4, driversPlaced: 0, status: 'Pending Approval', postedDate: '06 Sep 2026' }
    ],
    driverMatches: [],
    timeline: [
      { time: '06 Sep 2026, 16:30', action: 'PAN Card Verified', actor: 'Deepak Arora' },
      { time: '05 Sep 2026, 10:15', action: 'Transporter Registered', actor: 'Vijay Kumar' }
    ]
  },
  {
    id: 'tr-5',
    transporterId: 'TR-1005',
    companyName: 'Eastern Express Logistics',
    contactPerson: 'Subhash Roy',
    phone: '+91 98300 12345',
    email: 'subhash@easternexpress.co',
    city: 'Kolkata',
    state: 'West Bengal',
    fleetSize: 32,
    fleetType: 'Container, Long Haul 16 Wheeler',
    primaryRoutes: ['Kolkata → Patna', 'Kolkata → Guwahati', 'Kolkata → Cuttack'],
    gstNumber: '19AAACE4411P1ZK',
    panNumber: 'AAACE4411P',
    status: 'ACTIVE',
    verificationStatus: 'VERIFIED',
    registrationDate: '2026-08-10',
    fleetSummary: { total: 32, activeOnRoad: 28, underMaintenance: 2, driverDeficit: 2 },
    documents: [
      { type: 'GST Registration Certificate', status: 'VERIFIED', verifiedAt: '2026-08-11 11:00', verifiedBy: 'Deepak Arora' },
      { type: 'Company PAN Card', status: 'VERIFIED', verifiedAt: '2026-08-11 11:05', verifiedBy: 'Deepak Arora' }
    ],
    activeJobPostings: [],
    driverMatches: [],
    timeline: []
  },
  {
    id: 'tr-6',
    transporterId: 'TR-1006',
    companyName: 'Apex Cold Chain Carriers',
    contactPerson: 'Rahul Nair',
    phone: '+91 98470 55443',
    email: 'nair@apexcoldchain.com',
    city: 'Kochi',
    state: 'Kerala',
    fleetSize: 12,
    fleetType: 'Reefer / Temperature Controlled Trucks',
    primaryRoutes: ['Kochi → Bengaluru', 'Kochi → Chennai'],
    gstNumber: '32AAACA1299Q1Z1',
    panNumber: 'AAACA1299Q',
    status: 'INACTIVE',
    verificationStatus: 'PENDING',
    registrationDate: '2026-09-01',
    fleetSummary: { total: 12, activeOnRoad: 8, underMaintenance: 2, driverDeficit: 2 },
    documents: [
      { type: 'GST Registration Certificate', status: 'PENDING', verifiedAt: '-', verifiedBy: '-' },
      { type: 'Company PAN Card', status: 'PENDING', verifiedAt: '-', verifiedBy: '-' }
    ],
    activeJobPostings: [],
    driverMatches: [],
    timeline: []
  }
];

export const TRANSPORTER_STATS = {
  totalTransporters: 1240,
  verifiedTransporters: 980,
  totalFleetCapacity: 14850,
  activeJobs: 116,
  pendingVerification: 42
};
