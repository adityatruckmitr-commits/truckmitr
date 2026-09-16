/**
 * TruckMitr One — Dedicated Mock Service for Drivers Module
 */

export const INITIAL_DRIVERS_DATA = [
  {
    id: 'drv-1',
    tmid: 'TM2609234',
    name: 'Ravi Kumar',
    age: 32,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
    phone: '+91 98765 43210',
    state: 'Haryana',
    city: 'Karnal',
    licenseType: 'HMV',
    licenseNumber: 'HR-0520180034912',
    experienceYears: 7,
    status: 'ACTIVE',
    verificationStatus: 'VERIFIED',
    registeredAt: '2026-09-10',
    documents: [
      { type: 'Driving License (Commercial HMV)', status: 'VERIFIED', verifiedAt: '2026-09-10 14:20', verifiedBy: 'Deepak Arora' },
      { type: 'Aadhaar Card', status: 'VERIFIED', verifiedAt: '2026-09-10 14:22', verifiedBy: 'Deepak Arora' },
      { type: 'Police Clearance Certificate', status: 'VERIFIED', verifiedAt: '2026-09-11 11:00', verifiedBy: 'Deepak Arora' },
      { type: 'Medical Fitness Certificate', status: 'VERIFIED', verifiedAt: '2026-09-11 11:15', verifiedBy: 'Deepak Arora' }
    ],
    jobHistory: [
      { jobTitle: '18 Ton Container Driver', client: 'Sharma Logistics', route: 'Delhi → Mumbai', status: 'Joined', date: '10 Sep 2026' },
      { jobTitle: 'Open Body Bulk Freight', client: 'National Cargo', route: 'Jaipur → Bhopal', status: 'Completed', date: '15 Aug 2026' }
    ],
    timeline: [
      { time: '10 Sep 2026, 14:22', action: 'KYC Verified', actor: 'Deepak Arora (Admin)' },
      { time: '10 Sep 2026, 11:32', action: 'Driver Registered', actor: 'Ramesh (Telecaller)' }
    ]
  },
  {
    id: 'drv-2',
    tmid: 'TM2609235',
    name: 'Suresh Yadav',
    age: 28,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
    phone: '+91 98765 43211',
    state: 'Uttar Pradesh',
    city: 'Varanasi',
    licenseType: 'Container',
    licenseNumber: 'UP-6520190088123',
    experienceYears: 5,
    status: 'ACTIVE',
    verificationStatus: 'VERIFIED',
    registeredAt: '2026-09-10',
    documents: [
      { type: 'Driving License', status: 'VERIFIED', verifiedAt: '2026-09-10 15:30', verifiedBy: 'Deepak Arora' },
      { type: 'Aadhaar Card', status: 'VERIFIED', verifiedAt: '2026-09-10 15:35', verifiedBy: 'Deepak Arora' },
      { type: 'Police Verification', status: 'PENDING', verifiedAt: '-', verifiedBy: '-' }
    ],
    jobHistory: [
      { jobTitle: 'Container Route Driver', client: 'Singh Roadlines', route: 'Delhi → Jaipur', status: 'Interview Scheduled', date: '09 Sep 2026' }
    ],
    timeline: [
      { time: '10 Sep 2026, 15:35', action: 'Documents Verified', actor: 'Deepak Arora' },
      { time: '10 Sep 2026, 11:20', action: 'Registered via Mobile App', actor: 'Self' }
    ]
  },
  {
    id: 'drv-3',
    tmid: 'TM2609236',
    name: 'Amit Singh',
    age: 35,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
    phone: '+91 98765 43212',
    state: 'Delhi',
    city: 'Dwarka',
    licenseType: 'Trailer',
    licenseNumber: 'DL-0420170099411',
    experienceYears: 9,
    status: 'PENDING',
    verificationStatus: 'UNDER REVIEW',
    registeredAt: '2026-09-09',
    documents: [
      { type: 'Driving License', status: 'UNDER REVIEW', verifiedAt: '-', verifiedBy: '-' },
      { type: 'Aadhaar Card', status: 'VERIFIED', verifiedAt: '2026-09-09 16:00', verifiedBy: 'Sonam Sharma' }
    ],
    jobHistory: [],
    timeline: [
      { time: '09 Sep 2026, 16:00', action: 'Aadhaar Verified', actor: 'Sonam Sharma' },
      { time: '09 Sep 2026, 14:15', action: 'Registered via Telecaller', actor: 'Sonam Sharma' }
    ]
  },
  {
    id: 'drv-4',
    tmid: 'TM2609237',
    name: 'Mahesh Patel',
    age: 40,
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&h=120&q=80',
    phone: '+91 98765 43213',
    state: 'Gujarat',
    city: 'Surat',
    licenseType: 'Tanker',
    licenseNumber: 'GJ-0520150011987',
    experienceYears: 12,
    status: 'ACTIVE',
    verificationStatus: 'VERIFIED',
    registeredAt: '2026-09-09',
    documents: [
      { type: 'Hazardous Tanker License', status: 'VERIFIED', verifiedAt: '2026-09-09 17:30', verifiedBy: 'Aditya Kumar' },
      { type: 'Aadhaar Card', status: 'VERIFIED', verifiedAt: '2026-09-09 17:30', verifiedBy: 'Aditya Kumar' }
    ],
    jobHistory: [
      { jobTitle: 'Chemical Tanker Driver', client: 'Gujarat Chemical Freight', route: 'Surat → Dahej', status: 'Joined', date: '09 Sep 2026' }
    ],
    timeline: [
      { time: '09 Sep 2026, 17:30', action: 'Hazmat Verified', actor: 'Aditya Kumar' }
    ]
  },
  {
    id: 'drv-5',
    tmid: 'TM2609238',
    name: 'Imran Khan',
    age: 29,
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80',
    phone: '+91 98765 43214',
    state: 'Maharashtra',
    city: 'Pune',
    licenseType: 'HMV',
    licenseNumber: 'MH-1220200055441',
    experienceYears: 4,
    status: 'INACTIVE',
    verificationStatus: 'VERIFIED',
    registeredAt: '2026-09-08',
    documents: [
      { type: 'Driving License', status: 'VERIFIED', verifiedAt: '2026-09-08 11:00', verifiedBy: 'Deepak Arora' }
    ],
    jobHistory: [],
    timeline: [
      { time: '08 Sep 2026, 11:00', action: 'Verified & Profile Inactivated by User', actor: 'Self' }
    ]
  },
  {
    id: 'drv-6',
    tmid: 'TM2609239',
    name: 'Rakesh Sharma',
    age: 31,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
    phone: '+91 98765 43215',
    state: 'Rajasthan',
    city: 'Jaipur',
    licenseType: 'LCV',
    licenseNumber: 'RJ-1420190022314',
    experienceYears: 6,
    status: 'ACTIVE',
    verificationStatus: 'VERIFIED',
    registeredAt: '2026-09-08',
    documents: [
      { type: 'Driving License', status: 'VERIFIED', verifiedAt: '2026-09-08 14:00', verifiedBy: 'Deepak Arora' }
    ],
    jobHistory: [],
    timeline: []
  },
  {
    id: 'drv-7',
    tmid: 'TM2609240',
    name: 'Manoj Verma',
    age: 27,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
    phone: '+91 98765 43216',
    state: 'Madhya Pradesh',
    city: 'Bhopal',
    licenseType: 'HMV',
    licenseNumber: 'MP-0420210088712',
    experienceYears: 3,
    status: 'PENDING',
    verificationStatus: 'UNDER REVIEW',
    registeredAt: '2026-09-07',
    documents: [
      { type: 'Driving License', status: 'UNDER REVIEW', verifiedAt: '-', verifiedBy: '-' }
    ],
    jobHistory: [],
    timeline: []
  }
];

export const DRIVER_STATS = {
  totalDrivers: 73840,
  verifiedDrivers: 56210,
  pendingVerification: 8420,
  placedDrivers: 4200,
  inactiveDrivers: 5310
};
