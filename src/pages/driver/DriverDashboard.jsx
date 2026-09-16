import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Award,
  Video,
  ShieldCheck,
  CheckCircle,
  Clock,
  MapPin,
  TrendingUp,
  Sparkles,
  Truck,
  ArrowRight,
} from 'lucide-react';
import { PortalLayout } from '../../components/layout/PortalLayout';
import { StatCard } from '../../components/common/StatCard';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';

export const DriverDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const recentApplications = [
    {
      id: 101,
      title: 'HCV Container Trailer Driver',
      company: 'All-India Freight Express',
      salary: '₹38,000 / month',
      status: 'Interview Scheduled',
      date: 'Today, 2:30 PM',
      step: 3, // 1: Applied, 2: Shortlisted, 3: Interview, 4: Placed
    },
    {
      id: 102,
      title: 'Multi-Axle Chemical Tanker Captain',
      company: 'GreenLine Cold & Liquid Logistics',
      salary: '₹44,000 / month',
      status: 'Under Transporter Review',
      date: 'Yesterday',
      step: 2,
    },
  ];

  return (
    <PortalLayout
      title="Driver Command Center"
      subtitle={`Welcome, ${user?.name || 'Driver Captain'} • Member ID: TM-2026-DR-0842`}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {/* Top Digital Driver ID Card Banner */}
        <div
          className="glass-panel"
          style={{
            padding: '24px 32px',
            background: 'linear-gradient(135deg, rgba(255, 107, 0, 0.15) 0%, rgba(19, 27, 46, 0.9) 100%)',
            border: '1px solid var(--border-primary)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-primary)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.75rem',
                fontWeight: 800,
                boxShadow: '0 4px 20px var(--color-primary-glow)',
              }}
            >
              {user?.name ? user.name.charAt(0) : 'R'}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>{user?.name || 'Rajesh Kumar Verma'}</h2>
                <Badge variant="success" size="sm" icon={ShieldCheck}>Govt KYC Verified</Badge>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '4px 0 0' }}>
                License: <strong>Heavy Commercial Vehicle (HCV)</strong> • Exp: <strong>8 Years</strong> • Base: <strong>Sonipat, HR</strong>
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Button variant="primary" size="md" icon={Briefcase} onClick={() => navigate('/jobs')}>
              Find New Jobs
            </Button>
            <Button variant="secondary" size="md" icon={Video} onClick={() => navigate('/driver/welfare')}>
              Welfare Academy
            </Button>
          </div>
        </div>

        {/* KPI Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          <StatCard
            title="Active Job Applications"
            value="3"
            subtitle="1 interview scheduled"
            icon={Briefcase}
            variant="primary"
          />
          <StatCard
            title="Govt KYC Verification"
            value="100%"
            subtitle="DL, Aadhaar & Court Clean"
            icon={ShieldCheck}
            variant="emerald"
          />
          <StatCard
            title="Training Modules Completed"
            value="4 / 5"
            subtitle="Certificate ready to download"
            icon={Award}
            variant="cyan"
          />
          <StatCard
            title="Referral Bonus Wallet"
            value="₹450"
            subtitle="3 drivers referred"
            icon={TrendingUp}
            variant="purple"
          />
        </div>

        {/* Application Pipeline Status */}
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Your Job Application Status</h3>
            <Button variant="ghost" size="sm" onClick={() => navigate('/driver/applied-jobs')}>
              View All Applications <ArrowRight size={14} />
            </Button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {recentApplications.map((app) => (
              <div
                key={app.id}
                style={{
                  padding: '16px 20px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>{app.title}</h4>
                  <p style={{ color: 'var(--color-primary)', fontSize: '0.875rem', fontWeight: 600, margin: '2px 0 0' }}>
                    {app.company} • <span style={{ color: 'var(--color-success)' }}>{app.salary}</span>
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <Badge variant={app.step >= 3 ? 'warning' : 'info'} size="md">
                    {app.status}
                  </Badge>
                  <Button variant="secondary" size="sm" onClick={() => navigate('/driver/applied-jobs')}>
                    Track Status
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PortalLayout>
  );
};
