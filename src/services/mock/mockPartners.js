/**
 * TruckMitr One — Dedicated Mock Service for Partners Module
 */

export const PARTNER_TABS = [
  { id: 'ALL', label: 'All Partners' },
  { id: 'OEM', label: 'OEMs' },
  { id: 'FLEET', label: 'Fleets & Transporters' },
  { id: 'TRAINING', label: 'Training Institutes' },
  { id: 'FINANCIER', label: 'Financiers' },
  { id: 'SERVICE', label: 'Service Partners' },
  { id: 'ASSOCIATION', label: 'Associations' },
  { id: 'OTHER', label: 'Others' }
];

export const ONBOARDING_STAGES = [
  { id: 'KYC_VERIFICATION', label: 'KYC Verification', order: 1 },
  { id: 'DOCUMENT_REVIEW', label: 'Document Review', order: 2 },
  { id: 'COMMERCIAL_DISCUSSION', label: 'Commercial Discussion', order: 3 },
  { id: 'AGREEMENT_PENDING', label: 'Agreement Pending', order: 4 },
  { id: 'ONBOARDED', label: 'Onboarded & Live', order: 5 }
];

export const INITIAL_PARTNERS_DATA = [
  {
    id: 'ptr-1',
    partnerCode: 'PTR-OEM-01',
    name: 'Tata Motors Commercial Vehicles',
    type: 'OEM',
    category: 'OEM',
    logoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=100&h=100&q=80',
    location: 'Pune, Maharashtra',
    city: 'Pune',
    state: 'Maharashtra',
    keyContact: { name: 'Sanjay Deshmukh', role: 'VP Dealer & Fleet Relations', phone: '+91 98220 11223', email: 'sanjay.deshmukh@tatamotors.com' },
    status: 'ACTIVE',
    onboardingStage: 'ONBOARDED',
    onboardingProgress: 100,
    jobsLeadsGenerated: 450,
    conversionRate: 68,
    joinedOn: '2026-01-15',
    description: 'National OEM partnership for driver placement, BS6 vehicle training curriculum, and new truck test drives.',
    contactHistory: [
      { date: '04 Sep 2026', type: 'Review Meeting', summary: 'Quarterly fleet demand sync; 120 new chassis driver requirement', staff: 'Anil Kumar (CEO)' },
      { date: '18 Aug 2026', type: 'Training Workshop', summary: 'Conducted fuel-efficiency driving masterclass for 80 drivers', staff: 'Aditya Kumar' }
    ],
    monthlyTrend: [
      { month: 'Apr', value: 42, label: '42' },
      { month: 'May', value: 58, label: '58' },
      { month: 'Jun', value: 65, label: '65' },
      { month: 'Jul', value: 80, label: '80' },
      { month: 'Aug', value: 95, label: '95' },
      { month: 'Sep', value: 110, label: '110' }
    ]
  },
  {
    id: 'ptr-2',
    partnerCode: 'PTR-TRN-02',
    name: 'Ashok Leyland Driver Training Institute',
    type: 'Training Institute',
    category: 'TRAINING',
    logoUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=100&h=100&q=80',
    location: 'Namakkal, Tamil Nadu',
    city: 'Namakkal',
    state: 'Tamil Nadu',
    keyContact: { name: 'R. Soundararajan', role: 'Director of Training', phone: '+91 98427 44556', email: 'director@al-dti.edu' },
    status: 'ACTIVE',
    onboardingStage: 'ONBOARDED',
    onboardingProgress: 100,
    jobsLeadsGenerated: 320,
    conversionRate: 74,
    joinedOn: '2026-03-10',
    description: 'Accredited commercial driving certification hub delivering verified heavy-vehicle graduates directly into TruckMitr pipeline.',
    contactHistory: [
      { date: '01 Sep 2026', type: 'Batch Graduation', summary: '45 HMV drivers completed defensive driving cert', staff: 'Deepak Arora' }
    ],
    monthlyTrend: [
      { month: 'Apr', value: 30, label: '30' },
      { month: 'May', value: 45, label: '45' },
      { month: 'Jun', value: 50, label: '50' },
      { month: 'Jul', value: 60, label: '60' },
      { month: 'Aug', value: 68, label: '68' },
      { month: 'Sep', value: 75, label: '75' }
    ]
  },
  {
    id: 'ptr-3',
    partnerCode: 'PTR-FIN-03',
    name: 'Cholamandalam Vehicle Finance',
    type: 'Financier',
    category: 'FINANCIER',
    logoUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=100&h=100&q=80',
    location: 'Chennai, Tamil Nadu',
    city: 'Chennai',
    state: 'Tamil Nadu',
    keyContact: { name: 'Karthik Raman', role: 'Head of Commercial Lending', phone: '+91 98400 77889', email: 'karthik.r@chola.com' },
    status: 'ONBOARDING',
    onboardingStage: 'COMMERCIAL_DISCUSSION',
    onboardingProgress: 60,
    jobsLeadsGenerated: 85,
    conversionRate: 42,
    joinedOn: '2026-08-25',
    description: 'Providing low-interest micro-credit for driver insurance, permit renewals, and small fleet expansion loans.',
    contactHistory: [
      { date: '08 Sep 2026', type: 'Commercial Sync', summary: 'Commission structure finalized: 1.2% per disbursed loan', staff: 'Anil Kumar (CEO)' }
    ],
    monthlyTrend: [
      { month: 'Jul', value: 10, label: '10' },
      { month: 'Aug', value: 35, label: '35' },
      { month: 'Sep', value: 40, label: '40' }
    ]
  },
  {
    id: 'ptr-4',
    partnerCode: 'PTR-FLT-04',
    name: 'VRL Logistics Hub Partner',
    type: 'Fleet Partner',
    category: 'FLEET',
    logoUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=100&h=100&q=80',
    location: 'Hubballi, Karnataka',
    city: 'Hubballi',
    state: 'Karnataka',
    keyContact: { name: 'Anand Kulkarni', role: 'Regional Ops Head', phone: '+91 98860 33445', email: 'anand.k@vrl.in' },
    status: 'ACTIVE',
    onboardingStage: 'ONBOARDED',
    onboardingProgress: 100,
    jobsLeadsGenerated: 280,
    conversionRate: 62,
    joinedOn: '2026-04-02',
    description: 'Strategic corridor fleet partner hiring 30+ long-haul multi-axle drivers monthly across South-West routes.',
    contactHistory: [
      { date: '02 Sep 2026', type: 'Call', summary: 'Requested 15 container drivers for Belgaum to Bengaluru route', staff: 'Sonam Sharma' }
    ],
    monthlyTrend: [
      { month: 'May', value: 35, label: '35' },
      { month: 'Jun', value: 48, label: '48' },
      { month: 'Jul', value: 55, label: '55' },
      { month: 'Aug', value: 64, label: '64' },
      { month: 'Sep', value: 78, label: '78' }
    ]
  },
  {
    id: 'ptr-5',
    partnerCode: 'PTR-SRV-05',
    name: 'Highway King Dhabas & Amenities',
    type: 'Service Partner',
    category: 'SERVICE',
    logoUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=100&h=100&q=80',
    location: 'Kotputli, Rajasthan',
    city: 'Kotputli',
    state: 'Rajasthan',
    keyContact: { name: 'Ratan Lal', role: 'Owner & Operator', phone: '+91 98290 88776', email: 'ratan@highwayking.in' },
    status: 'ONBOARDING',
    onboardingStage: 'AGREEMENT_PENDING',
    onboardingProgress: 80,
    jobsLeadsGenerated: 140,
    conversionRate: 35,
    joinedOn: '2026-08-30',
    description: 'Driver resting lounge, hygienic washrooms, secure overnight truck parking, and discounted food partner on NH-48.',
    contactHistory: [
      { date: '09 Sep 2026', type: 'Agreement Draft', summary: 'Sent final MOU for QR code driver meal discount verification', staff: 'Aditya Kumar' }
    ],
    monthlyTrend: [
      { month: 'Aug', value: 60, label: '60' },
      { month: 'Sep', value: 80, label: '80' }
    ]
  },
  {
    id: 'ptr-6',
    partnerCode: 'PTR-ASC-06',
    name: 'All India Motor Transport Congress (AIMTC)',
    type: 'Association',
    category: 'ASSOCIATION',
    logoUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=100&h=100&q=80',
    location: 'New Delhi, Delhi',
    city: 'Delhi',
    state: 'Delhi',
    keyContact: { name: 'Bal Malkit Singh', role: 'Chairman - Coordination Committee', phone: '+91 98100 55667', email: 'aimtc.delhi@gmail.com' },
    status: 'ACTIVE',
    onboardingStage: 'ONBOARDED',
    onboardingProgress: 100,
    jobsLeadsGenerated: 510,
    conversionRate: 71,
    joinedOn: '2026-02-18',
    description: 'Apex national transport body collaborating on driver welfare policies, challan resolution desks, and safety awareness.',
    contactHistory: [
      { date: '05 Sep 2026', type: 'Policy Panel', summary: 'Joint symposium on mandatory AC truck cabins implementation', staff: 'Anil Kumar (CEO)' }
    ],
    monthlyTrend: [
      { month: 'Apr', value: 65, label: '65' },
      { month: 'May', value: 78, label: '78' },
      { month: 'Jun', value: 85, label: '85' },
      { month: 'Jul', value: 90, label: '90' },
      { month: 'Aug', value: 92, label: '92' },
      { month: 'Sep', value: 100, label: '100' }
    ]
  },
  {
    id: 'ptr-7',
    partnerCode: 'PTR-OTH-07',
    name: 'Apollo Tyres Roadside Assistance',
    type: 'Other / Component OEM',
    category: 'OTHER',
    logoUrl: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=100&h=100&q=80',
    location: 'Gurgaon, Haryana',
    city: 'Gurgaon',
    state: 'Haryana',
    keyContact: { name: 'Pooja Bhatia', role: 'Commercial Fleet Head', phone: '+91 98118 99001', email: 'pooja.bhatia@apollotyres.com' },
    status: 'ONBOARDING',
    onboardingStage: 'KYC_VERIFICATION',
    onboardingProgress: 20,
    jobsLeadsGenerated: 30,
    conversionRate: 25,
    joinedOn: '2026-09-08',
    description: 'Highway emergency puncture, retreading discounts, and tyre safety inspection camps across transport nagars.',
    contactHistory: [
      { date: '08 Sep 2026', type: 'KYC Request', summary: 'Initial KYC & GST documents requested for corporate partnership', staff: 'Deepak Arora' }
    ],
    monthlyTrend: [
      { month: 'Sep', value: 30, label: '30' }
    ]
  }
];

export const PARTNER_STATS = {
  totalPartners: 84,
  activePartners: 68,
  inOnboarding: 16,
  totalLeadsGenerated: 1820
};
