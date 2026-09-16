import React, { useState } from 'react';
import { Users, Video, ShieldCheck, Phone, CheckCircle2, XCircle, Star, Sparkles, MapPin } from 'lucide-react';
import { PortalLayout } from '../../components/layout/PortalLayout';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Tabs } from '../../components/common/Tabs';
import { Modal } from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';

export const CandidatePipelinePage = () => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('all');
  const [activeVideoModal, setActiveVideoModal] = useState(null);

  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: 'Ramesh Singh Yadav',
      experience: '9 Years',
      location: 'Sonipat, Haryana',
      vehicle: '22-Wheeler Trailer',
      matchScore: 96,
      rating: 4.9,
      status: 'interview',
      phone: '+91 98765-43210',
      dlVerified: true,
      courtClean: true,
    },
    {
      id: 2,
      name: 'Gurpreet Singh',
      experience: '12 Years',
      location: 'Ludhiana, Punjab',
      vehicle: 'Chemical Tanker',
      matchScore: 98,
      rating: 5.0,
      status: 'shortlisted',
      phone: '+91 98112-23344',
      dlVerified: true,
      courtClean: true,
    },
    {
      id: 3,
      name: 'Santosh Kumar Pal',
      experience: '6 Years',
      location: 'Kanpur, UP',
      vehicle: 'Open Body Truck',
      matchScore: 92,
      rating: 4.8,
      status: 'hired',
      phone: '+91 97234-55667',
      dlVerified: true,
      courtClean: true,
    },
  ]);

  const handleHire = (id, name) => {
    setCandidates(candidates.map((c) => (c.id === id ? { ...c, status: 'hired' } : c)));
    showToast(`🎉 Driver ${name} marked as HIRED! Onboarding documents dispatched.`, 'success');
  };

  const handleReject = (id, name) => {
    setCandidates(candidates.filter((c) => c.id !== id));
    showToast(`Candidate ${name} rejected from pipeline.`, 'info');
  };

  const filteredCandidates = candidates.filter((c) => {
    if (activeTab === 'shortlisted') return c.status === 'shortlisted';
    if (activeTab === 'interview') return c.status === 'interview';
    if (activeTab === 'hired') return c.status === 'hired';
    return true;
  });

  return (
    <PortalLayout title="Candidate Recruitment Pipeline" subtitle="Screen, interview via video, and hire pre-verified drivers">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Stage Filter Tabs */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <Tabs
            tabs={[
              { id: 'all', label: 'All Candidates', count: candidates.length },
              { id: 'shortlisted', label: 'Shortlisted', count: candidates.filter((c) => c.status === 'shortlisted').length },
              { id: 'interview', label: 'Video Interview', count: candidates.filter((c) => c.status === 'interview').length },
              { id: 'hired', label: 'Hired & Placed', count: candidates.filter((c) => c.status === 'hired').length },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
        </div>

        {/* Candidate Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {filteredCandidates.map((candidate) => (
            <Card key={candidate.id} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: 'var(--color-primary-light)',
                        color: 'var(--color-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '1.2rem',
                      }}
                    >
                      {candidate.name.charAt(0)}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{candidate.name}</h3>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{candidate.location}</span>
                    </div>
                  </div>

                  <Badge variant="success" size="sm">
                    ⚡ {candidate.matchScore}% Match
                  </Badge>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                  {candidate.dlVerified && <Badge variant="success" size="sm" icon={ShieldCheck}>DL Valid</Badge>}
                  {candidate.courtClean && <Badge variant="info" size="sm" icon={ShieldCheck}>Court Clean</Badge>}
                  <Badge variant="neutral" size="sm">Exp: {candidate.experience}</Badge>
                </div>

                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  Vehicle Capability: <strong style={{ color: 'var(--text-main)' }}>{candidate.vehicle}</strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', borderTop: '1px solid var(--border-subtle)', paddingTop: '14px' }}>
                <Button
                  variant="primary"
                  size="sm"
                  icon={Video}
                  onClick={() => setActiveVideoModal(candidate)}
                >
                  Agora Video Call
                </Button>
                {candidate.status !== 'hired' ? (
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={CheckCircle2}
                    onClick={() => handleHire(candidate.id, candidate.name)}
                  >
                    Hire
                  </Button>
                ) : (
                  <Badge variant="success" size="md">✓ Hired</Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  icon={XCircle}
                  onClick={() => handleReject(candidate.id, candidate.name)}
                >
                  Reject
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Video Call Modal Simulation (Agora Engine) */}
      {activeVideoModal && (
        <Modal
          isOpen={!!activeVideoModal}
          onClose={() => setActiveVideoModal(null)}
          title={`Agora Live Video Interview: ${activeVideoModal.name}`}
          maxWidth="700px"
          footer={
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-success)', fontSize: '0.85rem', fontWeight: 600 }}>
                <span style={{ width: '8px', height: '8px', backgroundColor: 'var(--color-success)', borderRadius: '50%' }} />
                HD Audio & Video Encrypted Session
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Button variant="danger" size="sm" onClick={() => setActiveVideoModal(null)}>End Call</Button>
                <Button variant="primary" size="sm" onClick={() => { handleHire(activeVideoModal.id, activeVideoModal.name); setActiveVideoModal(null); }}>Offer Job Now</Button>
              </div>
            </div>
          }
        >
          <div
            style={{
              height: '340px',
              backgroundColor: '#05080F',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--border-subtle)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  fontWeight: 800,
                  margin: '0 auto 16px',
                  animation: 'pulseGlow 2s infinite',
                }}
              >
                {activeVideoModal.name.charAt(0)}
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>{activeVideoModal.name}</h3>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>Connected via Agora RTC SDK • 1080p 60fps</p>
            </div>
          </div>
        </Modal>
      )}
    </PortalLayout>
  );
};
