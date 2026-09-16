/**
 * TruckMitr One — Growth & Analytics Mock Service
 * 
 * Sourced consistently with organization totals:
 * - 3,891 Registered Drivers
 * - 1,056 Transporters & Fleets
 * - Channels: Organic, Direct Referral, Highway Ecosystem Partners, Ground Field Ops
 */

export const ACQUISITION_CHANNELS = [
  {
    channel: 'Organic & App Stores',
    drivers: 1840,
    transporters: 420,
    conversionRate: '18.4%',
    cac: '₹140',
    color: '#1467FF'
  },
  {
    channel: 'Driver & Transporter Referrals',
    drivers: 1120,
    transporters: 290,
    conversionRate: '24.2%',
    cac: '₹85',
    color: '#10B981'
  },
  {
    channel: 'Highway & Ecosystem Partners',
    drivers: 620,
    transporters: 210,
    conversionRate: '29.5%',
    cac: '₹110',
    color: '#F59E0B'
  },
  {
    channel: 'Ground Field Operations Team',
    drivers: 311,
    transporters: 136,
    conversionRate: '34.8%',
    cac: '₹220',
    color: '#8B5CF6'
  }
];

export const REGIONAL_GEOGRAPHY = [
  {
    state: 'Maharashtra',
    primaryHubs: 'Mumbai, JNPT, Pune, Nagpur',
    drivers: 1420,
    transporters: 380,
    activeFleet: 2850,
    growthMoM: '+14.2%',
    status: 'High Density'
  },
  {
    state: 'Gujarat',
    primaryHubs: 'Surat, Ahmedabad, Kandla Port, Mundra',
    drivers: 1080,
    transporters: 295,
    activeFleet: 2100,
    growthMoM: '+11.8%',
    status: 'High Density'
  },
  {
    state: 'Delhi-NCR & Haryana',
    primaryHubs: 'Gurugram, Manesar, Faridabad, Panipat',
    drivers: 920,
    transporters: 215,
    activeFleet: 1640,
    growthMoM: '+16.5%',
    status: 'Fast Growing'
  },
  {
    state: 'Rajasthan',
    primaryHubs: 'Jaipur, Bhilwara, Jodhpur, Kota',
    drivers: 680,
    transporters: 160,
    activeFleet: 1180,
    growthMoM: '+9.4%',
    status: 'Established'
  },
  {
    state: 'Uttar Pradesh',
    primaryHubs: 'Kanpur, Lucknow, Agra, Varanasi',
    drivers: 540,
    transporters: 120,
    activeFleet: 890,
    growthMoM: '+18.2%',
    status: 'Fast Growing'
  },
  {
    state: 'Madhya Pradesh',
    primaryHubs: 'Indore, Pithampur, Bhopal, Gwalior',
    drivers: 307,
    transporters: 86,
    activeFleet: 560,
    growthMoM: '+12.0%',
    status: 'Emerging'
  }
];

export const RETENTION_COHORTS = [
  { cohort: 'Apr 2026', baseUsers: 540, m0: 100, m1: 84, m2: 76, m3: 71, m4: 68, m5: 65 },
  { cohort: 'May 2026', baseUsers: 620, m0: 100, m1: 86, m2: 79, m3: 73, m4: 70, m5: null },
  { cohort: 'Jun 2026', baseUsers: 710, m0: 100, m1: 88, m2: 81, m3: 76, m4: null, m5: null },
  { cohort: 'Jul 2026', baseUsers: 840, m0: 100, m1: 89, m2: 83, m3: null, m4: null, m5: null },
  { cohort: 'Aug 2026', baseUsers: 980, m0: 100, m1: 91, m2: null, m3: null, m4: null, m5: null },
  { cohort: 'Sep 2026', baseUsers: 1120, m0: 100, m1: null, m2: null, m3: null, m4: null, m5: null }
];
