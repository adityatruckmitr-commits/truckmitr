/**
 * TruckMitr One — Dedicated Mock Service for Calling & CRM Module
 */

export const INITIAL_CALL_LOGS = [
  {
    id: 'call-101',
    callId: 'CL-8801',
    agent: { name: 'Sonam Sharma', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=80&h=80&q=80', role: 'Senior Telecaller' },
    recipientName: 'Ravi Kumar',
    recipientType: 'Driver',
    recipientTmid: 'TM2609234',
    recipientPhone: '+91 98765 43210',
    timestamp: '2026-09-10 11:30',
    duration: '04:18',
    durationSeconds: 258,
    outcome: 'Connected',
    notes: 'Driver confirmed joining date with Sharma Logistics. Verification documents verified.',
    followUpDate: '2026-09-12'
  },
  {
    id: 'call-102',
    callId: 'CL-8802',
    agent: { name: 'Aditya Kumar', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80', role: 'Fleet Matchmaker' },
    recipientName: 'Karan Sharma',
    recipientType: 'Transporter',
    recipientTmid: 'TR-1001',
    recipientPhone: '+91 98234 56789',
    timestamp: '2026-09-10 11:15',
    duration: '06:45',
    durationSeconds: 405,
    outcome: 'Connected',
    notes: 'Discussed driver requirements for Sitapur-Hoshiarpur route. Agreed on ₹28.5k salary package.',
    followUpDate: '2026-09-11'
  },
  {
    id: 'call-103',
    callId: 'CL-8803',
    agent: { name: 'Sonam Sharma', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=80&h=80&q=80', role: 'Senior Telecaller' },
    recipientName: 'Suresh Yadav',
    recipientType: 'Driver',
    recipientTmid: 'TM2609235',
    recipientPhone: '+91 98765 43211',
    timestamp: '2026-09-10 10:50',
    duration: '03:12',
    durationSeconds: 192,
    outcome: 'Connected',
    notes: 'Interview scheduled with Singh Roadlines for tomorrow 11 AM.',
    followUpDate: '2026-09-11'
  },
  {
    id: 'call-104',
    callId: 'CL-8804',
    agent: { name: 'Raksha', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&h=80&q=80', role: 'Operations Associate' },
    recipientName: 'Amit Singh',
    recipientType: 'Driver',
    recipientTmid: 'TM2609236',
    recipientPhone: '+91 98765 43212',
    timestamp: '2026-09-10 10:30',
    duration: '00:00',
    durationSeconds: 0,
    outcome: 'Not Connected',
    notes: 'Call disconnected / Out of coverage area on highway.',
    followUpDate: '2026-09-10 15:00'
  },
  {
    id: 'call-105',
    callId: 'CL-8805',
    agent: { name: 'Raksha', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&h=80&q=80', role: 'Operations Associate' },
    recipientName: 'Vijay Kumar',
    recipientType: 'Transporter',
    recipientTmid: 'TR-1004',
    recipientPhone: '+91 97654 32109',
    timestamp: '2026-09-10 10:15',
    duration: '02:05',
    durationSeconds: 125,
    outcome: 'Callback Later',
    notes: 'Transporter in warehouse meeting; requested callback at 4 PM.',
    followUpDate: '2026-09-10 16:00'
  },
  {
    id: 'call-106',
    callId: 'CL-8806',
    agent: { name: 'Kamini', avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=80&h=80&q=80', role: 'Telecaller' },
    recipientName: 'Imran Khan',
    recipientType: 'Driver',
    recipientTmid: 'TM2609238',
    recipientPhone: '+91 98765 43214',
    timestamp: '2026-09-10 09:50',
    duration: '01:10',
    durationSeconds: 70,
    outcome: 'Not Interested',
    notes: 'Currently employed locally in Pune, not looking for interstate routes right now.',
    followUpDate: '-'
  },
  {
    id: 'call-107',
    callId: 'CL-8807',
    agent: { name: 'Pratima Singh', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&h=80&q=80', role: 'Lead Qualifier' },
    recipientName: 'Mahesh Patel',
    recipientType: 'Driver',
    recipientTmid: 'TM2609237',
    recipientPhone: '+91 98765 43213',
    timestamp: '2026-09-10 09:30',
    duration: '05:40',
    durationSeconds: 340,
    outcome: 'Connected',
    notes: 'Hazmat certificate verified and sent joining details for Dahej chemical corridor.',
    followUpDate: '2026-09-10'
  },
  {
    id: 'call-108',
    callId: 'CL-8808',
    agent: { name: 'Sonam Sharma', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=80&h=80&q=80', role: 'Senior Telecaller' },
    recipientName: 'Bhavesh Patel',
    recipientType: 'Transporter',
    recipientTmid: 'TR-1002',
    recipientPhone: '+91 98111 22334',
    timestamp: '2026-09-10 09:10',
    duration: '03:55',
    durationSeconds: 235,
    outcome: 'Connected',
    notes: 'Confirmed 3 tanker driver slots filled successfully.',
    followUpDate: '2026-09-15'
  }
];

export const RECIPIENT_CALL_HISTORIES = {
  '+91 98765 43210': [
    { timestamp: '10 Sep 2026, 11:30', agent: 'Sonam Sharma', duration: '04:18', outcome: 'Connected', notes: 'Driver confirmed joining date with Sharma Logistics' },
    { timestamp: '08 Sep 2026, 14:00', agent: 'Aditya Kumar', duration: '05:22', outcome: 'Connected', notes: 'Initial route match discussion and salary alignment' },
    { timestamp: '06 Sep 2026, 10:15', agent: 'Ramesh', duration: '02:40', outcome: 'Connected', notes: 'Registration follow-up and license photo received' }
  ],
  '+91 98234 56789': [
    { timestamp: '10 Sep 2026, 11:15', agent: 'Aditya Kumar', duration: '06:45', outcome: 'Connected', notes: 'Discussed driver requirements for Sitapur-Hoshiarpur route' },
    { timestamp: '08 Sep 2026, 16:30', agent: 'Aditya Kumar', duration: '04:10', outcome: 'Connected', notes: 'Job posting parameters and security deposit verification' }
  ]
};
