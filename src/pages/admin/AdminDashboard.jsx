import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Truck,
  Briefcase,
  ShieldCheck,
  DollarSign,
  TrendingUp,
  Bell,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import { PortalLayout } from '../../components/layout/PortalLayout';
import { StatCard } from '../../components/common/StatCard';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const activityFeed = [
    { id: 1, title: 'New Transporter Registered: Apex Logistics Pvt Ltd', time: '10 mins ago', type: 'transporter' },
    { id: 2, title: 'Driver KYC Completed: Rajesh Kumar (DL + Aadhaar Verified)', time: '25 mins ago', type: 'driver' },
    { id: 3, title: 'Placement Confirmed: Gurpreet Singh @ GreenLine Cold Logistics', time: '1 hour ago', type: 'placement' },
    { id: 4, title: 'Razorpay Payment Received: ₹5,999 (Pro Subscription)', time: '2 hours ago', type: 'payment' },
  ];

  return (
    <PortalLayout title="Super Admin Command Center" subtitle="Global analytics, system health, revenue logs & user operations">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {/* KPI Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          <StatCard
            title="Total Registered Drivers"
            value="52,480"
            subtitle="+420 this week"
            icon={Users}
            variant="primary"
          />
          <StatCard
            title="Registered Transporters"
            value="14,520"
            subtitle="+85 this week"
            icon={Truck}
            variant="cyan"
          />
          <StatCard
            title="Total BGV Checks Executed"
            value="184,200"
            subtitle="₹46.05 Lakhs API Volume"
            icon={ShieldCheck}
            variant="emerald"
          />
          <StatCard
            title="Monthly Revenue"
            value="₹28.4 Lakhs"
            subtitle="Subscriptions & Commissions"
            icon={DollarSign}
            variant="purple"
          />
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <Button variant="primary" size="md" icon={Users} onClick={() => navigate('/admin/users')}>
            Manage Users & KYC Approvals
          </Button>
          <Button variant="secondary" size="md" icon={Bell} onClick={() => showToast('Dispatched FCM v3 Push Notification to 52,000+ devices', 'success')}>
            Broadcast Push Notification (FCM v3)
          </Button>
          <Button variant="outline" size="md" icon={ShieldCheck} onClick={() => showToast('All BEFISC & Vahan API endpoints are operational (Latency: 142ms)', 'info')}>
            System Health Diagnostics
          </Button>
        </div>

        {/* Live Activity Feed */}
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Live Platform Activity Stream</h3>
            <Badge variant="success" size="sm">● Realtime Sync</Badge>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {activityFeed.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '14px 18px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CheckCircle2 size={18} color="var(--color-success)" />
                  <span style={{ fontSize: '0.925rem', color: 'var(--text-main)', fontWeight: 500 }}>{item.title}</span>
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{item.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PortalLayout>
  );
};
