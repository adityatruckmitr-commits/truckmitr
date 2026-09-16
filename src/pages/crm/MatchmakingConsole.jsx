import React, { useState } from 'react';
import { Users, Truck, Sparkles, CheckCircle2, ArrowRight, Zap, Video } from 'lucide-react';
import { PortalLayout } from '../../components/layout/PortalLayout';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';

export const MatchmakingConsole = () => {
  const { showToast } = useToast();
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);

  const drivers = [
    { id: 1, name: 'Ramesh Singh Yadav', vehicle: 'Trailer', experience: '9 Yrs', location: 'Haryana', salaryReq: '₹38,000' },
    { id: 2, name: 'Gurpreet Singh', vehicle: 'Tanker', experience: '12 Yrs', location: 'Punjab', salaryReq: '₹44,000' },
    { id: 3, name: 'Santosh Kumar Pal', vehicle: 'Open Body', experience: '6 Yrs', location: 'UP', salaryReq: '₹34,000' },
  ];

  const openings = [
    { id: 101, title: 'HCV Container Trailer (22W)', company: 'All-India Freight Express', salary: '₹38,000 / mo', vehicle: 'Trailer', location: 'Delhi-Mumbai' },
    { id: 102, title: 'Chemical Tanker Captain', company: 'GreenLine Cold & Liquid', salary: '₹44,000 / mo', vehicle: 'Tanker', location: 'Gujarat-BLR' },
  ];

  const handleMatch = () => {
    if (!selectedDriver || !selectedJob) {
      showToast('Please select one Driver and one Job Opening to pair', 'warning');
      return;
    }
    showToast(`⚡ Match Confirmed! Paired ${selectedDriver.name} with ${selectedJob.company}. Video interview link dispatched via SMS & WhatsApp.`, 'success');
    setSelectedDriver(null);
    setSelectedJob(null);
  };

  return (
    <PortalLayout title="Matchmaking & Placement Engine" subtitle="Pair pre-verified drivers with open transporter fleet vacancies">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Match Action Bar */}
        <div
          className="glass-panel"
          style={{
            padding: '18px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 107, 0, 0.08)',
            border: '1px solid var(--border-primary)',
          }}
        >
          <div>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Selected Driver: </span>
            <strong style={{ color: 'var(--text-main)' }}>{selectedDriver ? selectedDriver.name : 'None Selected'}</strong>
            <span style={{ margin: '0 12px', color: 'var(--text-dim)' }}>➔</span>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Selected Fleet: </span>
            <strong style={{ color: 'var(--text-main)' }}>{selectedJob ? selectedJob.company : 'None Selected'}</strong>
          </div>

          <Button
            variant="primary"
            size="md"
            icon={Zap}
            disabled={!selectedDriver || !selectedJob}
            onClick={handleMatch}
          >
            Pair & Schedule Interview
          </Button>
        </div>

        {/* Dual Column Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
          {/* Left Column: Drivers */}
          <Card>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px' }}>1. Select Available Driver</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {drivers.map((driver) => {
                const isSelected = selectedDriver?.id === driver.id;
                return (
                  <div
                    key={driver.id}
                    onClick={() => setSelectedDriver(driver)}
                    style={{
                      padding: '14px 18px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: isSelected ? 'var(--color-primary-light)' : 'rgba(255, 255, 255, 0.02)',
                      border: `1.5px solid ${isSelected ? 'var(--color-primary)' : 'var(--border-subtle)'}`,
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>{driver.name}</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', margin: '2px 0 0' }}>
                        {driver.vehicle} • Exp: {driver.experience} • {driver.location}
                      </p>
                    </div>
                    <Badge variant="primary" size="sm">{driver.salaryReq}</Badge>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Right Column: Open Jobs */}
          <Card>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px' }}>2. Select Fleet Job Opening</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {openings.map((job) => {
                const isSelected = selectedJob?.id === job.id;
                return (
                  <div
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    style={{
                      padding: '14px 18px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: isSelected ? 'var(--color-primary-light)' : 'rgba(255, 255, 255, 0.02)',
                      border: `1.5px solid ${isSelected ? 'var(--color-primary)' : 'var(--border-subtle)'}`,
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>{job.title}</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--color-primary)', margin: '2px 0 0' }}>
                        {job.company} • {job.location}
                      </p>
                    </div>
                    <Badge variant="success" size="sm">{job.salary}</Badge>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </PortalLayout>
  );
};
