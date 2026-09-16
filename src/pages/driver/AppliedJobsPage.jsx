import React from 'react';
import { Briefcase, CheckCircle2, Clock, Phone, MapPin, Building, ShieldCheck } from 'lucide-react';
import { PortalLayout } from '../../components/layout/PortalLayout';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';

export const AppliedJobsPage = () => {
  const { showToast } = useToast();

  const applications = [
    {
      id: 101,
      jobTitle: 'HCV Container Trailer Driver (22 Wheeler)',
      company: 'All-India Freight Express',
      location: 'Delhi NCR to Mumbai Route',
      appliedOn: '01 Sep 2026',
      salary: '₹38,000 / month',
      contactPerson: 'Harish Mehta (Fleet HR)',
      contactPhone: '+91 98112-99887',
      stage: 3, // 1: Submitted, 2: Shortlisted, 3: Video Interview, 4: Placed
      stages: [
        { name: 'Application Submitted', completed: true, date: '01 Sep' },
        { name: 'Profile Shortlisted', completed: true, date: '01 Sep' },
        { name: 'Video Interview Scheduled', completed: true, date: 'Today 2:30 PM' },
        { name: 'Job Offer & Placement', completed: false, date: 'Pending' },
      ],
    },
    {
      id: 102,
      jobTitle: 'Multi-Axle Chemical Tanker Captain',
      company: 'GreenLine Cold & Liquid Logistics',
      location: 'Gujarat to Bengaluru',
      appliedOn: '29 Aug 2026',
      salary: '₹44,000 / month',
      contactPerson: 'Suresh Rao',
      contactPhone: '+91 99234-55443',
      stage: 2,
      stages: [
        { name: 'Application Submitted', completed: true, date: '29 Aug' },
        { name: 'Profile Shortlisted', completed: true, date: '30 Aug' },
        { name: 'Video Interview Scheduled', completed: false, date: 'Pending' },
        { name: 'Job Offer & Placement', completed: false, date: 'Pending' },
      ],
    },
  ];

  return (
    <PortalLayout title="My Job Applications" subtitle="Track real-time hiring progress across all your applied vacancies">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {applications.map((app) => (
          <Card key={app.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '4px' }}>{app.jobTitle}</h3>
                <p style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.95rem' }}>{app.company}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-dim)', marginTop: '4px' }}>
                  <MapPin size={14} color="var(--color-accent)" />
                  <span>{app.location}</span> • <span>Applied on {app.appliedOn}</span>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-success)', display: 'block' }}>{app.salary}</span>
                <Badge variant={app.stage === 3 ? 'warning' : 'info'} size="md">
                  {app.stages[app.stage - 1].name}
                </Badge>
              </div>
            </div>

            {/* Stepper Pipeline */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '12px',
                padding: '20px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)',
                marginBottom: '20px',
              }}
            >
              {app.stages.map((stg, idx) => (
                <div key={stg.name} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: stg.completed ? 'var(--color-success)' : 'var(--bg-surface)',
                      color: stg.completed ? '#FFFFFF' : 'var(--text-dim)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      border: `1.5px solid ${stg.completed ? 'var(--color-success)' : 'var(--border-subtle)'}`,
                    }}
                  >
                    {stg.completed ? <CheckCircle2 size={16} /> : idx + 1}
                  </div>
                  <div>
                    <h5 style={{ fontSize: '0.825rem', fontWeight: 600, color: stg.completed ? 'var(--text-main)' : 'var(--text-dim)', margin: 0 }}>
                      {stg.name}
                    </h5>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{stg.date}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Transporter Contact Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                Manager: <strong>{app.contactPerson}</strong> ({app.contactPhone})
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Button
                  variant="primary"
                  size="sm"
                  icon={Phone}
                  onClick={() => showToast(`Calling Fleet HR ${app.contactPerson}...`, 'info')}
                >
                  Call Transporter
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </PortalLayout>
  );
};
