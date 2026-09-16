import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PhoneCall, Users, CheckCircle2, Clock, Calendar, ArrowRight, Zap, TrendingUp } from 'lucide-react';
import { PortalLayout } from '../../components/layout/PortalLayout';
import { StatCard } from '../../components/common/StatCard';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Table } from '../../components/common/Table';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const CrmDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const callQueue = [
    {
      id: 1,
      name: 'Ramesh Singh Yadav',
      type: 'Driver Welcome Call',
      phone: '+91 98765-43210',
      status: 'Pending',
      priority: 'High',
      lastAttempt: 'None',
    },
    {
      id: 2,
      name: 'Sharma Freight Lines (Transporter)',
      type: 'Job Matchmaking Follow-up',
      phone: '+91 98112-23344',
      status: 'Callback (2:30 PM)',
      priority: 'Urgent',
      lastAttempt: '11:00 AM (Busy)',
    },
    {
      id: 3,
      name: 'Gurpreet Singh',
      type: 'Tanker Job Verification',
      phone: '+91 99234-55667',
      status: 'Pending',
      priority: 'Normal',
      lastAttempt: 'None',
    },
  ];

  const columns = [
    {
      title: 'Contact Name & Type',
      key: 'name',
      render: (val, row) => (
        <div>
          <strong style={{ color: 'var(--text-main)', display: 'block' }}>{val}</strong>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-primary)' }}>{row.type}</span>
        </div>
      ),
    },
    {
      title: 'Phone Number',
      key: 'phone',
      render: (val) => <span style={{ color: 'var(--text-muted)' }}>{val}</span>,
    },
    {
      title: 'Priority',
      key: 'priority',
      render: (val) => (
        <Badge variant={val === 'Urgent' ? 'danger' : val === 'High' ? 'warning' : 'neutral'} size="sm">
          {val}
        </Badge>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (val) => (
        <Badge variant={val.includes('Callback') ? 'warning' : 'info'} size="sm">
          {val}
        </Badge>
      ),
    },
    {
      title: 'Quick Action',
      key: 'actions',
      render: (_, row) => (
        <Button
          variant="primary"
          size="sm"
          icon={PhoneCall}
          onClick={() => {
            navigate('/crm/calls');
            showToast(`Initiating TeleCMI click-to-call for ${row.name}...`, 'info');
          }}
        >
          Call Lead
        </Button>
      ),
    },
  ];

  return (
    <PortalLayout
      title="Telecalling & Matchmaking CRM"
      subtitle={`Agent: ${user?.name || 'Anjali Sharma (Team Lead)'} • Shift Target: 40 Calls / 5 Placements`}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {/* KPI Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          <StatCard
            title="Calls Completed Today"
            value="24 / 40"
            subtitle="60% of daily target"
            icon={PhoneCall}
            variant="primary"
          />
          <StatCard
            title="Connected Call Rate"
            value="83.3%"
            subtitle="20 connected, 4 busy"
            icon={CheckCircle2}
            variant="emerald"
          />
          <StatCard
            title="Driver Placements Today"
            value="3"
            subtitle="₹1,500 daily incentive earned"
            icon={Users}
            variant="cyan"
          />
          <StatCard
            title="Pending Callbacks"
            value="5"
            subtitle="Next scheduled in 15 mins"
            icon={Clock}
            variant="purple"
          />
        </div>

        {/* Action Row */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="primary" size="md" icon={PhoneCall} onClick={() => navigate('/crm/calls')}>
            Open Daily Call Queue
          </Button>
          <Button variant="secondary" size="md" icon={Users} onClick={() => navigate('/crm/matchmaking')}>
            Open Driver-Job Matchmaker
          </Button>
        </div>

        {/* Priority Lead Queue */}
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Assigned Telecaller Lead Queue</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Priority queue automatically sorted by urgency & callbacks</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/crm/calls')}>
              View Full Queue <ArrowRight size={14} />
            </Button>
          </div>

          <Table columns={columns} data={callQueue} />
        </Card>
      </div>
    </PortalLayout>
  );
};
