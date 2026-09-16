import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Users,
  ShieldCheck,
  Wallet,
  PlusCircle,
  Video,
  CheckCircle,
  Clock,
  Phone,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { PortalLayout } from '../../components/layout/PortalLayout';
import { StatCard } from '../../components/common/StatCard';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Table } from '../../components/common/Table';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const TransporterDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const candidates = [
    {
      id: 1,
      name: 'Ramesh Singh Yadav',
      jobApplied: 'HCV Container Trailer Driver (22 Wheeler)',
      experience: '9 Years',
      matchScore: '96%',
      status: 'Interview Scheduled',
      date: 'Today 2:30 PM',
    },
    {
      id: 2,
      name: 'Gurpreet Singh',
      jobApplied: 'Multi-Axle Chemical Tanker Captain',
      experience: '12 Years',
      matchScore: '98%',
      status: 'Under Review',
      date: 'Yesterday',
    },
    {
      id: 3,
      name: 'Santosh Kumar Pal',
      jobApplied: 'Open Body Heavy Truck Driver',
      experience: '6 Years',
      matchScore: '92%',
      status: 'New Applicant',
      date: '2 hours ago',
    },
  ];

  const columns = [
    {
      title: 'Candidate Name',
      key: 'name',
      render: (val, row) => (
        <div>
          <strong style={{ color: 'var(--text-main)', display: 'block' }}>{val}</strong>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Exp: {row.experience}</span>
        </div>
      ),
    },
    {
      title: 'Applied Job',
      key: 'jobApplied',
      render: (val) => <span style={{ color: 'var(--color-primary)', fontWeight: 500 }}>{val}</span>,
    },
    {
      title: 'AI Match Score',
      key: 'matchScore',
      render: (val) => <Badge variant="success" size="sm">⚡ {val} Match</Badge>,
    },
    {
      title: 'Status',
      key: 'status',
      render: (val) => (
        <Badge variant={val.includes('Interview') ? 'warning' : 'info'} size="sm">
          {val}
        </Badge>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, row) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            variant="primary"
            size="sm"
            icon={Video}
            onClick={() => {
              navigate('/transporter/candidates');
              showToast(`Opening Video Interview room for ${row.name}`, 'info');
            }}
          >
            Interview
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => showToast(`Driver profile of ${row.name} downloaded`, 'success')}
          >
            Profile
          </Button>
        </div>
      ),
    },
  ];

  return (
    <PortalLayout
      title="Transporter Fleet Command"
      subtitle={`Company: ${user?.companyName || 'Sharma Freight Lines Pvt Ltd'} • Fleet: 45 Trucks`}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {/* KPI Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          <StatCard
            title="Active Job Openings"
            value="4"
            subtitle="2 expiring soon"
            icon={Briefcase}
            variant="primary"
          />
          <StatCard
            title="Candidate Applications"
            value="28"
            subtitle="6 high-score matches"
            icon={Users}
            variant="cyan"
          />
          <StatCard
            title="BGV Wallet Balance"
            value="₹2,400"
            subtitle="Approx. 24 verification checks"
            icon={Wallet}
            variant="emerald"
          />
          <StatCard
            title="Active Traqo Trackers"
            value="18"
            subtitle="Real-time SIM tracking"
            icon={TrendingUp}
            variant="purple"
          />
        </div>

        {/* Action Row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <Button variant="primary" size="md" icon={PlusCircle} onClick={() => navigate('/transporter/post-job')}>
            Post a New Driver Job
          </Button>
          <Button variant="secondary" size="md" icon={ShieldCheck} onClick={() => navigate('/transporter/verification-suite')}>
            Instant DL / RC Verification
          </Button>
          <Button variant="outline" size="md" icon={Wallet} onClick={() => showToast('Recharge BGV Wallet with Razorpay', 'info')}>
            Recharge Wallet (+₹1,000)
          </Button>
        </div>

        {/* Applicant Pipeline Table */}
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Recent Candidate Applicants</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Pre-screened commercial drivers matching your requirements</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/transporter/candidates')}>
              View Full Pipeline <ArrowRight size={14} />
            </Button>
          </div>

          <Table columns={columns} data={candidates} />
        </Card>
      </div>
    </PortalLayout>
  );
};
