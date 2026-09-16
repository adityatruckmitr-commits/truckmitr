import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Users, PlusCircle, CheckCircle, Clock, Eye, Trash2, Edit } from 'lucide-react';
import { PortalLayout } from '../../components/layout/PortalLayout';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Table } from '../../components/common/Table';
import { useToast } from '../../context/ToastContext';

export const ManageJobsPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'HCV Container Trailer Driver (22 Wheeler)',
      route: 'Delhi NCR - Mumbai JNPT',
      salary: '₹35,000 - ₹42,000 / mo',
      applicantsCount: 14,
      status: 'Active',
      createdDate: '28 Aug 2026',
    },
    {
      id: 2,
      title: 'Multi-Axle Chemical Tanker Captain',
      route: 'Dahej, Gujarat to Bengaluru',
      salary: '₹40,000 - ₹48,000 / mo',
      applicantsCount: 8,
      status: 'Active',
      createdDate: '25 Aug 2026',
    },
    {
      id: 3,
      title: 'Heavy Tipper / Dumper Mining Driver',
      route: 'Sonipat / Jaipur Corridor',
      salary: '₹28,000 - ₹34,000 / mo',
      applicantsCount: 6,
      status: 'Closed',
      createdDate: '15 Aug 2026',
    },
  ]);

  const toggleStatus = (id) => {
    setJobs(
      jobs.map((j) =>
        j.id === id ? { ...j, status: j.status === 'Active' ? 'Paused' : 'Active' } : j
      )
    );
    showToast('Job status toggled successfully', 'info');
  };

  const columns = [
    {
      title: 'Job Position & Route',
      key: 'title',
      render: (val, row) => (
        <div>
          <strong style={{ color: 'var(--text-main)', display: 'block' }}>{val}</strong>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-primary)' }}>{row.route}</span>
        </div>
      ),
    },
    {
      title: 'Monthly Salary',
      key: 'salary',
      render: (val) => <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>{val}</span>,
    },
    {
      title: 'Applicants',
      key: 'applicantsCount',
      render: (val) => <Badge variant="primary" size="sm">👥 {val} Candidates</Badge>,
    },
    {
      title: 'Status',
      key: 'status',
      render: (val, row) => (
        <Badge
          variant={val === 'Active' ? 'success' : val === 'Paused' ? 'warning' : 'neutral'}
          size="sm"
        >
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
            variant="secondary"
            size="sm"
            onClick={() => toggleStatus(row.id)}
          >
            {row.status === 'Active' ? 'Pause' : 'Activate'}
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/transporter/candidates')}
          >
            View Applicants
          </Button>
        </div>
      ),
    },
  ];

  return (
    <PortalLayout title="Manage Job Postings" subtitle="Monitor active vacancies, applicant counts, and status">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Total Active Vacancies: <strong style={{ color: 'var(--text-main)' }}>2</strong>
            </span>
          </div>
          <Button variant="primary" size="md" icon={PlusCircle} onClick={() => navigate('/transporter/post-job')}>
            Create New Job
          </Button>
        </div>

        <Card>
          <Table columns={columns} data={jobs} />
        </Card>
      </div>
    </PortalLayout>
  );
};
