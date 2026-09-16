import React, { useState } from 'react';
import { PhoneCall, CheckCircle, XCircle, Clock, Calendar, MessageSquare, ShieldCheck, User } from 'lucide-react';
import { PortalLayout } from '../../components/layout/PortalLayout';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Select } from '../../components/common/Select';
import { useToast } from '../../context/ToastContext';

export const CallQueuePage = () => {
  const { showToast } = useToast();
  const [activeCallingLead, setActiveCallingLead] = useState(null);
  const [callOutcome, setCallOutcome] = useState('Connected & Interested');
  const [remarks, setRemarks] = useState('');

  const [leads, setLeads] = useState([
    {
      id: 1,
      name: 'Ramesh Singh Yadav',
      phone: '9876543210',
      type: 'Driver Welcome Call',
      location: 'Sonipat, Haryana',
      experience: '9 Years',
      license: 'Heavy Trailer HCV',
      status: 'pending',
    },
    {
      id: 2,
      name: 'Sharma Freight Lines (Transporter)',
      phone: '9811223344',
      type: 'Job Matchmaking Follow-up',
      location: 'Delhi NCR',
      experience: 'Fleet (45 Trucks)',
      license: 'Requires 3 Trailer Drivers',
      status: 'pending',
    },
    {
      id: 3,
      name: 'Gurpreet Singh',
      phone: '9923455667',
      type: 'Tanker Job Verification',
      location: 'Ludhiana, Punjab',
      experience: '12 Years',
      license: 'Hazardous Chemical Tanker',
      status: 'pending',
    },
  ]);

  const handleSaveOutcome = () => {
    setLeads(leads.map((l) => (l.id === activeCallingLead.id ? { ...l, status: 'completed' } : l)));
    showToast(`Call outcome logged: "${callOutcome}" for ${activeCallingLead.name}. Updated in CRM database.`, 'success');
    setActiveCallingLead(null);
    setRemarks('');
  };

  return (
    <PortalLayout title="Daily Telecaller Workspace" subtitle="Click-to-Call engine integrated with TeleCMI & MyOperator IVR">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {leads.map((lead) => (
            <Card key={lead.id} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '14px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <Badge variant="primary" size="sm">{lead.type}</Badge>
                  <Badge variant={lead.status === 'completed' ? 'success' : 'warning'} size="sm">
                    {lead.status === 'completed' ? '✓ Completed' : 'Pending Call'}
                  </Badge>
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '4px' }}>{lead.name}</h3>
                <p style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '8px' }}>
                  📞 {lead.phone}
                </p>

                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div><strong>Base:</strong> {lead.location}</div>
                  <div><strong>Details:</strong> {lead.experience} • {lead.license}</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', borderTop: '1px solid var(--border-subtle)', paddingTop: '14px' }}>
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  icon={PhoneCall}
                  onClick={() => {
                    setActiveCallingLead(lead);
                    showToast(`Calling ${lead.phone} via cloud IVR...`, 'info');
                  }}
                >
                  Click-to-Call (TeleCMI)
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Call Logging Modal */}
      {activeCallingLead && (
        <Modal
          isOpen={!!activeCallingLead}
          onClose={() => setActiveCallingLead(null)}
          title={`Call in Progress: ${activeCallingLead.name}`}
          footer={
            <>
              <Button variant="ghost" onClick={() => setActiveCallingLead(null)}>Cancel</Button>
              <Button variant="primary" onClick={handleSaveOutcome}>Save Call Outcome</Button>
            </>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '14px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <PhoneCall size={20} className="animate-pulse" />
              <div>
                <strong>Active Call:</strong> {activeCallingLead.phone} ({activeCallingLead.name})
              </div>
            </div>

            <Select
              label="Call Disposition / Outcome"
              value={callOutcome}
              onChange={(e) => setCallOutcome(e.target.value)}
              options={[
                { value: 'Connected & Interested', label: 'Connected & Interested (Proceed to Matchmaking)' },
                { value: 'Callback Scheduled', label: 'Callback Requested by Driver' },
                { value: 'Ringing / No Answer', label: 'Ringing / No Answer' },
                { value: 'Line Busy', label: 'Line Busy / Switch Off' },
                { value: 'Job Placed / Converted', label: 'Driver Confirmed & Placed 🎉' },
                { value: 'Not Interested', label: 'Not Interested / Invalid Number' },
              ]}
            />

            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-main)', marginBottom: '6px', display: 'block' }}>
                Agent Remarks & Notes
              </label>
              <textarea
                rows={3}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Driver ready for immediate joining on Delhi-Mumbai route at ₹38k salary..."
                style={{
                  width: '100%',
                  backgroundColor: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 14px',
                  color: 'var(--text-main)',
                  fontSize: '0.95rem',
                  outline: 'none',
                }}
              />
            </div>
          </div>
        </Modal>
      )}
    </PortalLayout>
  );
};
