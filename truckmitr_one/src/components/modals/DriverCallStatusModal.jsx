import React, { useState } from 'react';
import { 
  X, 
  PhoneCall, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  PhoneMissed, 
  AlertCircle, 
  UserPlus,
  ArrowRight,
  UserCheck,
  MapPin,
  Phone
} from 'lucide-react';

export const DriverCallStatusModal = ({ isOpen, onClose, initialStatus = 'connected' }) => {
  const [activeTab, setActiveTab] = useState(initialStatus);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const statusCategories = [
    { id: 'connected', label: 'Connected Calls', count: '1,420 (MTD)', since6pm: '34 today', color: '#0D9488', bg: '#E6FFFA' },
    { id: 'callback_later', label: 'Callback Later', count: '380 (MTD)', since6pm: '12 today', color: '#E05A1B', bg: '#FEF3EB' },
    { id: 'not_connected', label: 'Not Connected', count: '512 (MTD)', since6pm: '18 today', color: '#EF4444', bg: '#FEE2E2' },
    { id: 'feedback_pending', label: 'Feedback Pending', count: '145 (MTD)', since6pm: '6 today', color: '#F59E0B', bg: '#FEF3C7' },
    { id: 'fresh', label: 'Fresh Leads', count: '890 Uncontacted', since6pm: '42 today', color: '#6366F1', bg: '#EEF2FF' },
  ];

  const callRecords = [
    {
      tmid: 'TM-DRV-10291',
      name: 'Rameshwar Lal Gurjar',
      phone: '+91 98290 12345',
      state: 'Rajasthan (Ajmer)',
      status: 'connected',
      feedback: 'Looking for 14-wheeler trailer job in Gujarat-Maharashtra route. Salary req: 28k+.',
      telecaller: 'Pooja Sharma',
      time: 'Today, 2:15 PM',
      matchedJob: 'Apex Logistics (Multi-Axle)',
    },
    {
      tmid: 'TM-DRV-10290',
      name: 'Satwinder Singh Gill',
      phone: '+91 94172 65432',
      state: 'Punjab (Jalandhar)',
      status: 'connected',
      feedback: 'Interested in BGV verified badge. Ready to upload Aadhaar and Driving License.',
      telecaller: 'Rahul Verma',
      time: 'Today, 1:40 PM',
      matchedJob: 'QuickMove Express',
    },
    {
      tmid: 'TM-DRV-10289',
      name: 'Vikas Chandrakant Patil',
      phone: '+91 97631 88990',
      state: 'Maharashtra (Nashik)',
      status: 'callback_later',
      feedback: 'Driving vehicle on NH-3 highway. Requested callback after 7:00 PM today evening.',
      telecaller: 'Anjali Gupta',
      time: 'Today, 1:10 PM',
      matchedJob: 'Pending Callback',
    },
    {
      tmid: 'TM-DRV-10288',
      name: 'Mukesh Kumar Meena',
      phone: '+91 98711 22334',
      state: 'Madhya Pradesh (Indore)',
      status: 'not_connected',
      feedback: 'Call ringing but unanswered (Attempt 2). Auto-scheduled retry tomorrow 11:00 AM.',
      telecaller: 'Vikram Singh',
      time: 'Today, 12:45 PM',
      matchedJob: 'None',
    },
    {
      tmid: 'TM-DRV-10287',
      name: 'Harpreet Singh Dhillon',
      phone: '+91 98150 99887',
      state: 'Haryana (Ambala)',
      status: 'feedback_pending',
      feedback: 'Spoke with driver; verifying truck experience certificates and license validity.',
      telecaller: 'Sneha Deshmukh',
      time: 'Today, 11:30 AM',
      matchedJob: 'Verification In Progress',
    },
    {
      tmid: 'TM-DRV-10286',
      name: 'Sunil Jagdish Rawat',
      phone: '+91 99234 55443',
      state: 'Gujarat (Vapi)',
      status: 'fresh',
      feedback: 'New registration via TruckMitr Driver App. Awaiting first telecaller outreach.',
      telecaller: 'Unassigned',
      time: 'Today, 10:15 AM',
      matchedJob: 'Awaiting Call',
    },
  ];

  const filteredRecords = callRecords.filter((rec) => {
    if (activeTab !== 'all' && rec.status !== activeTab) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        rec.name.toLowerCase().includes(q) ||
        rec.phone.includes(q) ||
        rec.tmid.toLowerCase().includes(q) ||
        rec.state.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '920px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
          animation: 'modalSlideUp 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            backgroundColor: '#0F172A',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: 'rgba(224, 90, 27, 0.18)',
                color: '#E05A1B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PhoneCall size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '800', margin: 0 }}>
                Driver Call Breakdown & Status Registry
              </h2>
              <p style={{ fontSize: '12px', color: '#94A3B8', margin: '2px 0 0 0' }}>
                Complete logs for Connected, Callback, Missed, Pending and Fresh Driver leads
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: '#94A3B8',
              borderRadius: '8px',
              padding: '6px',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Filter Bar */}
        <div
          style={{
            padding: '12px 24px',
            backgroundColor: '#F8FAFC',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
            <button
              onClick={() => setActiveTab('all')}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: activeTab === 'all' ? '1px solid #0F172A' : '1px solid #CBD5E1',
                backgroundColor: activeTab === 'all' ? '#0F172A' : '#FFFFFF',
                color: activeTab === 'all' ? '#FFFFFF' : '#475569',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer',
              }}
            >
              All Calls
            </button>
            {statusCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: activeTab === cat.id ? `1.5px solid ${cat.color}` : '1px solid #CBD5E1',
                  backgroundColor: activeTab === cat.id ? cat.bg : '#FFFFFF',
                  color: activeTab === cat.id ? cat.color : '#475569',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap',
                }}
              >
                <span>{cat.label}</span>
                <span
                  style={{
                    fontSize: '10px',
                    padding: '1px 5px',
                    borderRadius: '4px',
                    backgroundColor: activeTab === cat.id ? 'rgba(0,0,0,0.06)' : '#F1F5F9',
                  }}
                >
                  {cat.since6pm}
                </span>
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', width: '220px' }}>
            <Search size={14} color="#94A3B8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search driver, TMID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '6px 10px 6px 30px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '12px',
              }}
            />
          </div>
        </div>

        {/* Records Table */}
        <div style={{ padding: '16px 24px', maxHeight: 'calc(85vh - 200px)', overflowY: 'auto' }}>
          <table className="table-saas" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Driver Profile</th>
                <th style={{ textAlign: 'left' }}>Location</th>
                <th style={{ textAlign: 'center' }}>Call Status</th>
                <th style={{ textAlign: 'left' }}>Call Notes & Requirements</th>
                <th style={{ textAlign: 'left' }}>Executive</th>
                <th style={{ textAlign: 'right' }}>Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '32px', color: '#94A3B8' }}>
                    No call records matching current filter.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((item, idx) => (
                  <tr key={idx}>
                    <td>
                      <div>
                        <div style={{ fontWeight: '700', color: '#0F172A', fontSize: '13px' }}>{item.name}</div>
                        <div style={{ fontSize: '11px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ fontWeight: '600', color: '#E05A1B' }}>{item.tmid}</span>
                          <span>•</span>
                          <span>{item.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontSize: '12px', color: '#475569' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <MapPin size={11} color="#94A3B8" /> {item.state}
                      </div>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: '700',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          textTransform: 'capitalize',
                          backgroundColor:
                            item.status === 'connected' ? '#D1FAE5' :
                            item.status === 'callback_later' ? '#FEF3EB' :
                            item.status === 'not_connected' ? '#FEE2E2' :
                            item.status === 'feedback_pending' ? '#FEF3C7' : '#EEF2FF',
                          color:
                            item.status === 'connected' ? '#059669' :
                            item.status === 'callback_later' ? '#E05A1B' :
                            item.status === 'not_connected' ? '#DC2626' :
                            item.status === 'feedback_pending' ? '#D97706' : '#4F46E5',
                        }}
                      >
                        {item.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td style={{ fontSize: '12px', color: '#334155', maxWidth: '280px' }}>
                      <div>{item.feedback}</div>
                      {item.matchedJob !== 'None' && item.matchedJob !== 'Awaiting Call' && (
                        <div style={{ fontSize: '10px', color: '#0D9488', fontWeight: '700', marginTop: '2px' }}>
                          Match: {item.matchedJob}
                        </div>
                      )}
                    </td>
                    <td style={{ fontSize: '12px', fontWeight: '600', color: '#0F172A' }}>
                      {item.telecaller}
                    </td>
                    <td style={{ textAlign: 'right', fontSize: '11px', color: '#64748B', whiteSpace: 'nowrap' }}>
                      {item.time}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '14px 24px',
            backgroundColor: '#F8FAFC',
            borderTop: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: '12px', color: '#64748B' }}>
            Showing <strong>{filteredRecords.length}</strong> active call records
          </span>
          <button
            onClick={onClose}
            style={{
              padding: '8px 18px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#0F172A',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
            }}
          >
            Close Drilldown
          </button>
        </div>
      </div>
    </div>
  );
};
