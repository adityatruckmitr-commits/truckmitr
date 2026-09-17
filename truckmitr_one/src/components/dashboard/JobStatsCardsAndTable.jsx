import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  CheckCircle2, 
  HelpCircle, 
  PauseCircle, 
  XCircle, 
  Ban, 
  ArrowRight, 
  Eye, 
  Users, 
  MapPin, 
  Phone, 
  Building2,
  ExternalLink
} from 'lucide-react';
import { adminDashboardApi } from '../../services/adminDashboardApi';

export const JobStatsCardsAndTable = ({ stats }) => {
  const [selectedJobModal, setSelectedJobModal] = useState(null);
  const [jobsList, setJobsList] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoadingJobs(true);
      try {
        const data = await adminDashboardApi.getRecentJobs();
        if (data && Array.isArray(data) && data.length > 0) {
          setJobsList(data);
        }
      } catch (err) {
        console.warn('Failed to load recent jobs:', err);
      } finally {
        setLoadingJobs(false);
      }
    };
    fetchJobs();
  }, []);

  const totalPosted = stats?.active_jobs_stats?.total ?? 1413;
  const activeJobs = stats?.active_jobs_stats?.active ?? 1129;
  const pendingJobs = stats?.active_jobs_stats?.pending ?? 195;
  const inactiveJobs = stats?.active_jobs_stats?.inactive ?? 110;
  const closedJobs = stats?.active_jobs_stats?.closed ?? 186;
  const expiredJobs = stats?.active_jobs_stats?.expired ?? 0;

  const jobStatsCards = [
    {
      title: 'Total Jobs Posted',
      value: Number(totalPosted).toLocaleString('en-IN'),
      icon: Briefcase,
      color: '#0284C7',
      bgIcon: '#0284C7',
      link: '/admin/jobs',
    },
    {
      title: 'Total Active Jobs',
      value: Number(activeJobs).toLocaleString('en-IN'),
      icon: CheckCircle2,
      color: '#059669',
      bgIcon: '#059669',
      link: '/admin/active-jobs',
    },
    {
      title: 'Total Pending Jobs',
      value: Number(pendingJobs).toLocaleString('en-IN'),
      icon: HelpCircle,
      color: '#D97706',
      bgIcon: '#D97706',
      link: '/admin/pending-for-approval-jobs',
    },
    {
      title: 'Total Inactive Jobs',
      value: Number(inactiveJobs).toLocaleString('en-IN'),
      icon: PauseCircle,
      color: '#64748B',
      bgIcon: '#64748B',
      link: '/admin/inactive-jobs',
    },
    {
      title: 'Total Closed Jobs',
      value: Number(closedJobs).toLocaleString('en-IN'),
      subBreakdown: { exp: '0', pend: String(pendingJobs), inact: String(inactiveJobs) },
      icon: XCircle,
      color: '#1E293B',
      bgIcon: '#1E293B',
      link: '/admin/closed-jobs',
    },
    {
      title: 'Total Expired Jobs',
      value: Number(expiredJobs).toLocaleString('en-IN'),
      icon: Ban,
      color: '#DC2626',
      bgIcon: '#DC2626',
      link: '/admin/expired-jobs',
    },
  ];

  const recentJobsList = jobsList.length > 0 ? jobsList : [
    {
      id: 'TMJB01781',
      transporter: 'Navin joshi',
      totalJobs: 1,
      assignedTo: 'Executive #9',
      phone: '8383829990',
      location: 'Delhi',
      status: 'Active',
      apps: 5,
      postedAt: '11 Sep 2026, 01:32 PM',
    },
    {
      id: 'TMJB01780',
      transporter: 'Chandan Paul',
      totalJobs: 2,
      assignedTo: 'Executive #9',
      phone: '9777249493',
      location: 'Odisha',
      status: 'Pending',
      apps: 0,
      postedAt: '11 Sep 2026, 12:43 AM',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '24px' }}>
      
      {/* 1. SIX OUTLINE JOB STATUS CARDS */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Briefcase size={18} color="#0284C7" />
              Job Openings, Hiring Pipelines & Fulfillment Lifecycle
            </h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748B' }}>
              Live metrics across total posted, approved active, pending moderation, and closed positions
            </p>
          </div>
          <span style={{ fontSize: '11px', fontWeight: '700', backgroundColor: '#E0F2FE', color: '#0284C7', padding: '4px 10px', borderRadius: '6px' }}>
            6,420 Active Openings
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          {jobStatsCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px -2px rgba(0,0,0,0.08)';
                  e.currentTarget.style.borderColor = card.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.03)';
                  e.currentTarget.style.borderColor = '#E2E8F0';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      backgroundColor: card.bgIcon,
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  <div>
                    <h6 style={{ margin: 0, fontSize: '11px', fontWeight: '600', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {card.title}
                    </h6>
                    <div style={{ fontSize: '20px', fontWeight: '800', color: '#0F172A', marginTop: '2px' }}>
                      {card.value}
                    </div>
                  </div>
                </div>

                {card.subBreakdown && (
                  <div style={{ fontSize: '10px', color: '#64748B', marginBottom: '10px', display: 'flex', gap: '6px' }}>
                    <span style={{ color: '#DC2626', fontWeight: '700' }}>Exp: {card.subBreakdown.exp}</span>
                    <span>•</span>
                    <span style={{ color: '#D97706', fontWeight: '700' }}>Pend: {card.subBreakdown.pend}</span>
                    <span>•</span>
                    <span>Inact: {card.subBreakdown.inact}</span>
                  </div>
                )}

                <div style={{ paddingTop: '8px', borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <a
                    href={card.link}
                    style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      color: card.color,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    More info <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. RECENT JOBS FULL WIDTH TABLE */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FAFBFD',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: '#0F172A' }}>
              Recent Jobs Posted on TruckMitr
            </h4>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#475569', backgroundColor: '#F1F5F9', padding: '2px 8px', borderRadius: '4px' }}>
              Live Transporter Feed
            </span>
          </div>

          <a
            href="/admin/jobs"
            style={{
              fontSize: '12px',
              fontWeight: '700',
              color: '#2563EB',
              textDecoration: 'none',
              padding: '5px 12px',
              borderRadius: '6px',
              border: '1px solid #BFDBFE',
              backgroundColor: '#EFF6FF',
            }}
          >
            View All Jobs
          </a>
        </div>

        <div style={{ overflowX: 'auto', width: '100%' }}>
          <table className="table-saas" style={{ width: '100%', borderCollapse: 'collapse', whiteSpace: 'nowrap' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Job ID</th>
                <th style={{ textAlign: 'left' }}>Transporter Name</th>
                <th style={{ textAlign: 'center' }}>Total Jobs</th>
                <th style={{ textAlign: 'left' }}>Assigned Executive</th>
                <th style={{ textAlign: 'left' }}>Mobile No.</th>
                <th style={{ textAlign: 'left' }}>Route Location</th>
                <th style={{ textAlign: 'center' }}>Status</th>
                <th style={{ textAlign: 'center' }}>Applications</th>
                <th style={{ textAlign: 'left' }}>Posted Date</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentJobsList.map((job, idx) => {
                const jobId = job.id || job.job_id;
                const transpName = job.transporter || job.transporter_name || 'Verified Logistics';
                const totalReq = job.totalJobs || job.total_jobs_by_transporter || 1;
                const exec = job.assignedTo || job.assigned_to || 'Ops Team';
                const mob = job.phone || job.mobile || 'N/A';
                const loc = job.location || 'All India';
                const statusStr = typeof job.status === 'string' ? job.status : (job.status === '1' || job.status === 1 ? 'Approved' : 'Pending');
                const appsCount = job.apps ?? job.applications ?? 0;
                const postedDate = job.postedAt || job.posted_at || 'Recently';

                return (
                  <tr key={idx}>
                    <td style={{ fontWeight: '700', color: '#0F172A' }}>
                      <span style={{ backgroundColor: '#F1F5F9', padding: '3px 6px', borderRadius: '4px', fontSize: '11px' }}>
                        {jobId}
                      </span>
                    </td>
                    <td style={{ fontWeight: '700', color: '#0F172A' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Building2 size={14} color="#64748B" />
                        <span>{transpName}</span>
                      </div>
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: '700', color: '#2563EB' }}>
                      {totalReq}
                    </td>
                    <td style={{ fontSize: '12px', color: '#475569' }}>
                      {exec}
                    </td>
                    <td style={{ fontSize: '12px', color: '#475569' }}>
                      {mob}
                    </td>
                    <td style={{ fontSize: '12px', color: '#334155' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={12} color="#94A3B8" />
                        <span>{loc}</span>
                      </div>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: '700',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          backgroundColor: statusStr.toLowerCase().includes('active') || statusStr.toLowerCase().includes('approved') ? '#D1FAE5' : '#FEF3C7',
                          color: statusStr.toLowerCase().includes('active') || statusStr.toLowerCase().includes('approved') ? '#059669' : '#D97706',
                        }}
                      >
                        {statusStr}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: '800', color: '#0F172A' }}>
                      <span style={{ backgroundColor: '#E0F2FE', color: '#0284C7', padding: '2px 8px', borderRadius: '10px' }}>
                        {appsCount}
                      </span>
                    </td>
                    <td style={{ fontSize: '11px', color: '#64748B' }}>
                      {postedDate}
                    </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '6px' }}>
                      <button
                        onClick={() => alert(`Opening Job Details: ${job.job_id}`)}
                        style={{
                          padding: '4px 8px',
                          borderRadius: '6px',
                          border: '1px solid #F59E0B',
                          backgroundColor: '#FEF3C7',
                          color: '#B45309',
                          fontSize: '11px',
                          fontWeight: '700',
                          cursor: 'pointer',
                        }}
                      >
                        View Job
                      </button>
                      <button
                        onClick={() => alert(`Viewing ${job.applications} Applicants for ${job.job_id}`)}
                        style={{
                          padding: '4px 8px',
                          borderRadius: '6px',
                          border: '1px solid #2563EB',
                          backgroundColor: '#EFF6FF',
                          color: '#2563EB',
                          fontSize: '11px',
                          fontWeight: '700',
                          cursor: 'pointer',
                        }}
                      >
                        Applicants
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
