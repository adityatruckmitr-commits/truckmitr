import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Truck,
  Calendar,
  Clock,
  Briefcase,
  Users,
  FileText,
  UserCheck,
  CheckCircle2,
  XCircle,
  CreditCard,
  RefreshCw,
  FileSpreadsheet,
  Filter,
  Eye,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  ArrowRight,
  Loader2,
  Search,
} from 'lucide-react';
import { AdminLayout } from './AdminLayout';
import { useToast } from '../../context/ToastContext';
import api from '../../services/api';

export const DriverFulfillmentPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Loading state
  const [loading, setLoading] = useState(true);

  // Filters State
  const [search, setSearch] = useState('');
  const [selectedExecutive, setSelectedExecutive] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('');
  const [activeJobsPage, setActiveJobsPage] = useState(1);
  const [deadlinesPage, setDeadlinesPage] = useState(1);

  // Page Data State
  const [data, setData] = useState({
    header_info: {
      date: '03 Sep 2026',
      last_updated: '01:55 PM',
    },
    top_kpis: {
      active_jobs: 95,
      required_drivers: 447,
      total_applications: 2483,
      unique_drivers: 1033,
      jobs_with_apps: 95,
      jobs_without_apps: 0,
      payments: { standard: 77, premium: 14, super_premium: 4 },
    },
    micro_metrics: {
      posted_today: 0,
      posted_last_7: 39,
      posted_last_30: 145,
      closing_next_7: 15,
      closing_next_2: 1,
    },
    job_type_summary: [
      { job_type: 'Premium', jobs: 14, req: 27, applied: 444, joined: 0, bal: 27, risk: 0 },
      { job_type: 'Standard', jobs: 77, req: 405, applied: 1925, joined: 0, bal: 405, risk: 27 },
      { job_type: 'Super Premium', jobs: 4, req: 15, applied: 114, joined: 0, bal: 15, risk: 4 },
      { job_type: 'Total', jobs: 95, req: 447, applied: 2483, joined: 0, bal: 447, risk: 31 },
    ],
    call_performance_summary: [
      { job_type: 'Premium', jobs: 14, unique_drivers: 210, called: 136, not_called: 61 },
      { job_type: 'Standard', jobs: 77, unique_drivers: 912, called: 175, not_called: 737 },
      { job_type: 'Super Premium', jobs: 4, unique_drivers: 89, called: 29, not_called: 60 },
      { job_type: 'Total', jobs: 95, unique_drivers: 1211, called: 340, not_called: 858 },
    ],
    risk_analysis: { green: 58, yellow: 24, red: 13 },
    executive_performance: [
      { executive: 'Kiran Kumari', jobs: 2, req: 7, joined: 0, bal: 7, success: '0%' },
      { executive: 'Raksha', jobs: 57, req: 357, joined: 0, bal: 357, success: '0%' },
      { executive: 'Angad', jobs: 10, req: 21, joined: 0, bal: 21, success: '0%' },
      { executive: 'Chandrabhan', jobs: 5, req: 9, joined: 0, bal: 9, success: '0%' },
      { executive: 'Aayushi Verma', jobs: 4, req: 8, joined: 0, bal: 8, success: '0%' },
      { executive: 'Akanksha Singh', jobs: 4, req: 22, joined: 0, bal: 22, success: '0%' },
    ],
    upcoming_deadlines: [
      { job_id: 'TMJB01676', transporter: 'Sunil Mankad', exec: 'Raksha', drivers: '3 Drivers', deadline: '04 Sep 2026', status: 'RED' },
      { job_id: 'TMJB01615', transporter: 'Ashwi', exec: 'Raksha', drivers: '2 Drivers', deadline: '05 Sep 2026', status: 'RED' },
      { job_id: 'TMJB01550', transporter: 'R. V. Enterprises', exec: 'Raksha', drivers: '2 Drivers', deadline: '05 Sep 2026', status: 'RED' },
      { job_id: 'TMJB01580', transporter: 'Kalpesh Jain', exec: 'Raksha', drivers: '1 Driver', deadline: '06 Sep 2026', status: 'RED' },
      { job_id: 'TMJB01674', transporter: 'Kanhaiya Paswan', exec: 'Raksha', drivers: '5 Drivers', deadline: '06 Sep 2026', status: 'RED' },
    ],
    recruitment_funnel: {
      active_jobs: 95,
      required_drivers: 447,
      applications: 2483,
      unique_drivers: 1033,
      interview_done: 35,
      matchmaking_done: 18,
    },
    job_status_overview: {
      active_jobs: 95,
      applications: 2483,
      joined: 0,
      balance: 447,
    },
    applications_trend: {
      labels: ['26 Aug', '27 Aug', '28 Aug', '29 Aug', '30 Aug', '31 Aug', '01 Sep'],
      data: [40, 52, 48, 75, 68, 55, 42],
    },
    jobs_by_status: {
      completed: 57,
      hiring: 27,
      pending_payment: 20,
      closing_soon: 4,
    },
    active_jobs_detail: {
      items: [
        { job_id: 'TMJB01676', transporter_name: 'Sunil Mankad', executive: 'Raksha', job_type: 'Standard', required_drivers: 3, applications: 7, unique_drivers: 7, joined: 0, balance: 3, interview_done: 0, deadline: '04 Sep 2026', days: 1 },
        { job_id: 'TMJB01580', transporter_name: 'Kalpesh Jain', executive: 'Raksha', job_type: 'Super Premium', required_drivers: 1, applications: 39, unique_drivers: 28, joined: 0, balance: 1, interview_done: 1, deadline: '06 Sep 2026', days: 2 },
        { job_id: 'TMJB01711', transporter_name: 'RGRT', executive: 'Raksha', job_type: 'Standard', required_drivers: 50, applications: 14, unique_drivers: 14, joined: 0, balance: 50, interview_done: 0, deadline: '05 Sep 2026', days: 2 },
        { job_id: 'TMJB01535', transporter_name: 'Banki', executive: 'Chandrabhan', job_type: 'Standard', required_drivers: 1, applications: 40, unique_drivers: 40, joined: 0, balance: 1, interview_done: 0, deadline: '05 Sep 2026', days: 2 },
        { job_id: 'TMJB01701', transporter_name: 'Puneet sabbi', executive: 'Angad', job_type: 'Super Premium', required_drivers: 1, applications: 15, unique_drivers: 13, joined: 0, balance: 1, interview_done: 0, deadline: '06 Sep 2026', days: 2 },
      ],
      total: 95,
      current_page: 1,
      per_page: 5,
      last_page: 19,
    },
  });

  // Fetch Fulfillment Data
  const fetchFulfillmentData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/driver-fulfillment/data', {
        params: {
          search: search,
          executive: selectedExecutive,
          job_type: selectedJobType,
          page: activeJobsPage,
        },
      });

      if (res?.data?.data) {
        setData((prev) => ({ ...prev, ...res.data.data }));
      } else if (res?.data && !res.data.status) {
        setData((prev) => ({ ...prev, ...res.data }));
      }
    } catch (err) {
      console.warn('Driver fulfillment API warning:', err);
    } finally {
      setLoading(false);
    }
  }, [search, selectedExecutive, selectedJobType, activeJobsPage]);

  useEffect(() => {
    fetchFulfillmentData();
  }, [fetchFulfillmentData]);

  // Safe accessor helpers
  const topKpis = data?.top_kpis || {};
  const payments = topKpis?.payments || {};
  const microMetrics = data?.micro_metrics || {};
  const headerInfo = data?.header_info || {};
  const jobTypeSummary = data?.job_type_summary || [];
  const callPerfSummary = data?.call_performance_summary || [];
  const riskAnalysis = data?.risk_analysis || { green: 58, yellow: 24, red: 13 };
  const execPerf = data?.executive_performance || [];
  const deadlines = data?.upcoming_deadlines || [];
  const funnel = data?.recruitment_funnel || {};
  const jobStatusOverview = data?.job_status_overview || {};
  const appTrend = data?.applications_trend || { labels: [], data: [] };
  const jobsByStatus = data?.jobs_by_status || { completed: 57, hiring: 27, pending_payment: 20, closing_soon: 4 };
  const activeJobsDetail = data?.active_jobs_detail || { items: [], total: 0 };

  return (
    <AdminLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* ============================================================ */}
        {/* HEADER: TITLE, SUBTITLE & TIMESTAMP BADGES */}
        {/* ============================================================ */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#172033', margin: 0, letterSpacing: '-0.3px' }}>
              Driver Fulfillment Dashboard
            </h1>
            <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '3px 0 0' }}>
              Track and monitor active jobs and driver fulfillment performance
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.75rem', color: '#475569' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#FFFFFF', padding: '5px 10px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
              <Calendar size={13} color="#1677FF" />
              <span>{headerInfo.date || '03 Sep 2026'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#FFFFFF', padding: '5px 10px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
              <Clock size={13} color="#10B981" />
              <span>Last Updated: <strong style={{ color: '#172033' }}>{headerInfo.last_updated || '01:55 PM'}</strong></span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* TOP FILTER / ACTION BAR */}
        {/* ============================================================ */}
        <div className="saas-card" style={{ padding: '12px 18px', border: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: '1 1 400px', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', flex: '1 1 200px' }}>
                <Search size={14} style={{ position: 'absolute', left: '10px', top: '10px', color: '#94A3B8' }} />
                <input
                  type="text"
                  placeholder="Search Job ID / Transporter"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ width: '100%', padding: '6px 10px 6px 30px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.78rem', outline: 'none' }}
                />
              </div>

              <select
                value={selectedExecutive}
                onChange={(e) => setSelectedExecutive(e.target.value)}
                style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.78rem', backgroundColor: '#FFFFFF', outline: 'none' }}
              >
                <option value="">All Executives</option>
                <option value="Raksha">Raksha</option>
                <option value="Angad">Angad</option>
                <option value="Chandrabhan">Chandrabhan</option>
                <option value="Kiran Kumari">Kiran Kumari</option>
                <option value="Aayushi Verma">Aayushi Verma</option>
              </select>

              <select
                value={selectedJobType}
                onChange={(e) => setSelectedJobType(e.target.value)}
                style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.78rem', backgroundColor: '#FFFFFF', outline: 'none' }}
              >
                <option value="">All Job Types</option>
                <option value="Standard">Standard</option>
                <option value="Premium">Premium</option>
                <option value="Super Premium">Super Premium</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => { fetchFulfillmentData(); showToast('Fulfillment data refreshed', 'info'); }}
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', color: '#475569', borderRadius: '6px', padding: '6px 12px', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <RefreshCw size={13} /> Refresh
              </button>
              <button
                onClick={() => showToast('Exporting Driver Fulfillment dataset (.xlsx)...', 'success')}
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', color: '#475569', borderRadius: '6px', padding: '6px 12px', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <FileSpreadsheet size={13} /> Export Excel
              </button>
              <button
                onClick={() => fetchFulfillmentData()}
                style={{ backgroundColor: '#1677FF', color: '#FFFFFF', border: 'none', borderRadius: '6px', padding: '6px 16px', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', boxShadow: '0 2px 6px rgba(22, 119, 255, 0.25)' }}
              >
                <Filter size={13} /> Filters
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* ROW 1: 4 MAIN KPI CARDS */}
        {/* ============================================================ */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          {/* Active Jobs */}
          <div className="saas-card" style={{ padding: '16px 18px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748B', letterSpacing: '0.3px', textTransform: 'uppercase' }}>Active Jobs</span>
                <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#172033', margin: '4px 0 2px', letterSpacing: '-0.5px' }}>{topKpis.active_jobs ?? 95}</h2>
                <span style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: 600 }}>↑ 0 vs yesterday</span>
              </div>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#D1FAE5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
                <Briefcase size={18} />
              </div>
            </div>
          </div>

          {/* Required Drivers */}
          <div className="saas-card" style={{ padding: '16px 18px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748B', letterSpacing: '0.3px', textTransform: 'uppercase' }}>Required Drivers</span>
                <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#172033', margin: '4px 0 2px', letterSpacing: '-0.5px' }}>{topKpis.required_drivers ?? 447}</h2>
                <span style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: 600 }}>↑ 10 vs yesterday</span>
              </div>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#E0F2FE', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0EA5E9' }}>
                <Users size={18} />
              </div>
            </div>
          </div>

          {/* Total Applications */}
          <div className="saas-card" style={{ padding: '16px 18px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748B', letterSpacing: '0.3px', textTransform: 'uppercase' }}>Total Applications</span>
                <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#172033', margin: '4px 0 2px', letterSpacing: '-0.5px' }}>{topKpis.total_applications ?? 2483}</h2>
                <span style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: 600 }}>↑ 42 vs yesterday</span>
              </div>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9333EA' }}>
                <FileText size={18} />
              </div>
            </div>
          </div>

          {/* Unique Drivers */}
          <div className="saas-card" style={{ padding: '16px 18px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748B', letterSpacing: '0.3px', textTransform: 'uppercase' }}>Unique Drivers</span>
                <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#172033', margin: '4px 0 2px', letterSpacing: '-0.5px' }}>{topKpis.unique_drivers ?? 1033}</h2>
                <span style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: 600 }}>↑ 11 vs yesterday</span>
              </div>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#FFEDD5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EA580C' }}>
                <UserCheck size={18} />
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* ROW 2: 3 CARDS (WITH APPS, WITHOUT APPS, PAYMENTS BREAKDOWN) */}
        {/* ============================================================ */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          {/* Jobs with Applications */}
          <div className="saas-card" style={{ padding: '16px 18px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Jobs with Applications</span>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#172033', margin: '4px 0 2px' }}>{topKpis.jobs_with_apps ?? 95}</h2>
                <span style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: 600 }}>↑ 7 vs yesterday</span>
              </div>
              <div style={{ width: '34px', height: '34px', borderRadius: '8px', backgroundColor: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16A34A' }}>
                <CheckCircle2 size={18} />
              </div>
            </div>
          </div>

          {/* Jobs without Applications */}
          <div className="saas-card" style={{ padding: '16px 18px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Jobs without Applications</span>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#172033', margin: '4px 0 2px' }}>{topKpis.jobs_without_apps ?? 0}</h2>
                <span style={{ fontSize: '0.72rem', color: '#EF4444', fontWeight: 600 }}>↓ 2 vs yesterday</span>
              </div>
              <div style={{ width: '34px', height: '34px', borderRadius: '8px', backgroundColor: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#DC2626' }}>
                <XCircle size={18} />
              </div>
            </div>
          </div>

          {/* Payments Breakdown */}
          <div className="saas-card" style={{ padding: '14px 18px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Payments</span>
              <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D97706' }}>
                <CreditCard size={15} />
              </div>
            </div>
            <div style={{ fontSize: '0.76rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Standard:</span> <strong style={{ color: '#172033' }}>{payments.standard ?? 77}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Premium:</span> <strong style={{ color: '#172033' }}>{payments.premium ?? 14}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Super Premium:</span> <strong style={{ color: '#172033' }}>{payments.super_premium ?? 4}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* ROW 3: 5 HORIZONTAL MICRO-METRIC CARDS */}
        {/* ============================================================ */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '12px' }}>
          <div className="saas-card" style={{ padding: '12px 14px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB' }}>
              <Briefcase size={16} />
            </div>
            <div>
              <span style={{ fontSize: '0.68rem', color: '#64748B', display: 'block' }}>Jobs Posted Today</span>
              <strong style={{ fontSize: '1.1rem', fontWeight: 800, color: '#172033' }}>{microMetrics.posted_today ?? 0}</strong>
              <span style={{ fontSize: '0.65rem', color: '#10B981', display: 'block' }}>↑ 0 vs yesterday</span>
            </div>
          </div>

          <div className="saas-card" style={{ padding: '12px 14px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16A34A' }}>
              <Calendar size={16} />
            </div>
            <div>
              <span style={{ fontSize: '0.68rem', color: '#64748B', display: 'block' }}>Jobs Posted Last 7 Days</span>
              <strong style={{ fontSize: '1.1rem', fontWeight: 800, color: '#172033' }}>{microMetrics.posted_last_7 ?? 39}</strong>
              <span style={{ fontSize: '0.65rem', color: '#10B981', display: 'block' }}>↑ 4 vs last 7 days</span>
            </div>
          </div>

          <div className="saas-card" style={{ padding: '12px 14px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: '#FAF5FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9333EA' }}>
              <Calendar size={16} />
            </div>
            <div>
              <span style={{ fontSize: '0.68rem', color: '#64748B', display: 'block' }}>Jobs Posted Last 30 Days</span>
              <strong style={{ fontSize: '1.1rem', fontWeight: 800, color: '#172033' }}>{microMetrics.posted_last_30 ?? 145}</strong>
              <span style={{ fontSize: '0.65rem', color: '#10B981', display: 'block' }}>↑ 15 vs last 30 days</span>
            </div>
          </div>

          <div className="saas-card" style={{ padding: '12px 14px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: '#FFF7ED', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EA580C' }}>
              <Clock size={16} />
            </div>
            <div>
              <span style={{ fontSize: '0.68rem', color: '#64748B', display: 'block' }}>Jobs Closing Next 7 Days</span>
              <strong style={{ fontSize: '1.1rem', fontWeight: 800, color: '#172033' }}>{microMetrics.closing_next_7 ?? 15}</strong>
              <span style={{ fontSize: '0.65rem', color: '#EF4444', display: 'block' }}>↓ 4 vs yesterday</span>
            </div>
          </div>

          <div className="saas-card" style={{ padding: '12px 14px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#DC2626' }}>
              <AlertTriangle size={16} />
            </div>
            <div>
              <span style={{ fontSize: '0.68rem', color: '#64748B', display: 'block' }}>Jobs Closing Next 2 Days</span>
              <strong style={{ fontSize: '1.1rem', fontWeight: 800, color: '#172033' }}>{microMetrics.closing_next_2 ?? 1}</strong>
              <span style={{ fontSize: '0.65rem', color: '#10B981', display: 'block' }}>↑ 1 vs yesterday</span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* MIDDLE SECTION — 2 COLUMNS (TABLES & RISK) */}
        {/* ============================================================ */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))', gap: '16px' }}>
          {/* LEFT COLUMN: JOB TYPE SUMMARY & CALL PERFORMANCE & RISK */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Job Type Summary */}
            <div className="saas-card" style={{ padding: '16px 18px', border: '1px solid #E2E8F0' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#172033', margin: '0 0 10px' }}>
                Job Type Summary
              </h4>
              <div style={{ overflowX: 'auto' }}>
                <table className="tm-table-clean" style={{ fontSize: '0.75rem', textAlign: 'center' }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left' }}>JOB TYPE</th>
                      <th>JOBS</th>
                      <th>REQ.</th>
                      <th>APPLIED</th>
                      <th>JOINED</th>
                      <th>BAL.</th>
                      <th>RISK</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobTypeSummary.map((row, idx) => (
                      <tr key={idx} style={{ fontWeight: row.job_type === 'Total' ? 800 : 500, backgroundColor: row.job_type === 'Total' ? '#F8FAFC' : 'transparent' }}>
                        <td style={{ textAlign: 'left', fontWeight: 700, color: '#334155' }}>{row.job_type}</td>
                        <td>{row.jobs}</td>
                        <td>{row.req}</td>
                        <td>{row.applied}</td>
                        <td>{row.joined}</td>
                        <td>{row.bal}</td>
                        <td style={{ color: row.risk > 0 ? '#DC2626' : '#64748B', fontWeight: row.risk > 0 ? 800 : 500 }}>{row.risk}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Call Performance Summary */}
            <div className="saas-card" style={{ padding: '16px 18px', border: '1px solid #E2E8F0' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#172033', margin: '0 0 10px' }}>
                Call Performance Summary
              </h4>
              <div style={{ overflowX: 'auto' }}>
                <table className="tm-table-clean" style={{ fontSize: '0.75rem', textAlign: 'center' }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left' }}>JOB TYPE</th>
                      <th>JOBS</th>
                      <th>UNIQUE DRIVERS</th>
                      <th>CALLED</th>
                      <th>NOT CALLED</th>
                    </tr>
                  </thead>
                  <tbody>
                    {callPerfSummary.map((row, idx) => (
                      <tr key={idx} style={{ fontWeight: row.job_type === 'Total' ? 800 : 500, backgroundColor: row.job_type === 'Total' ? '#F8FAFC' : 'transparent' }}>
                        <td style={{ textAlign: 'left', fontWeight: 700, color: '#334155' }}>{row.job_type}</td>
                        <td>{row.jobs}</td>
                        <td>{row.unique_drivers}</td>
                        <td>
                          {row.job_type === 'Total' ? (
                            <strong>{row.called}</strong>
                          ) : (
                            <span style={{ backgroundColor: '#DCFCE7', color: '#16A34A', padding: '2px 8px', borderRadius: '10px', fontWeight: 700 }}>
                              {row.called}
                            </span>
                          )}
                        </td>
                        <td>
                          {row.job_type === 'Total' ? (
                            <strong>{row.not_called}</strong>
                          ) : (
                            <span style={{ backgroundColor: '#FEE2E2', color: '#DC2626', padding: '2px 8px', borderRadius: '10px', fontWeight: 700 }}>
                              {row.not_called}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Risk Analysis */}
            <div className="saas-card" style={{ padding: '16px 18px', border: '1px solid #E2E8F0' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#172033', margin: '0 0 10px' }}>
                Risk Analysis
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', textAlign: 'center' }}>
                <div style={{ border: '1px solid #86EFAC', backgroundColor: '#F0FDF4', borderRadius: '8px', padding: '10px' }}>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#16A34A', margin: 0 }}>{riskAnalysis.green}</h3>
                  <span style={{ fontSize: '0.7rem', color: '#16A34A', fontWeight: 600 }}>Green Jobs (0-7d)</span>
                </div>
                <div style={{ border: '1px solid #FDE047', backgroundColor: '#FEFCE8', borderRadius: '8px', padding: '10px' }}>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#CA8A04', margin: 0 }}>{riskAnalysis.yellow}</h3>
                  <span style={{ fontSize: '0.7rem', color: '#CA8A04', fontWeight: 600 }}>Yellow Jobs (7-15d)</span>
                </div>
                <div style={{ border: '1px solid #FCA5A5', backgroundColor: '#FEF2F2', borderRadius: '8px', padding: '10px' }}>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#DC2626', margin: 0 }}>{riskAnalysis.red}</h3>
                  <span style={{ fontSize: '0.7rem', color: '#DC2626', fontWeight: 600 }}>Red Jobs (&gt;15d)</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: EXECUTIVE PERFORMANCE & UPCOMING DEADLINES */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Executive Performance */}
            <div className="saas-card" style={{ padding: '16px 18px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#172033', margin: 0 }}>
                  Executive Performance
                </h4>
                <span onClick={() => showToast('Viewing all executive performance records...', 'info')} style={{ fontSize: '0.74rem', color: '#1677FF', cursor: 'pointer', fontWeight: 600 }}>
                  View all executives →
                </span>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table className="tm-table-clean" style={{ fontSize: '0.75rem', textAlign: 'center' }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left' }}>EXECUTIVE</th>
                      <th>JOBS</th>
                      <th>REQ.</th>
                      <th>JOINED</th>
                      <th>BAL.</th>
                      <th>SUCCESS %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {execPerf.map((row, idx) => (
                      <tr key={idx}>
                        <td style={{ textAlign: 'left', fontWeight: 600, color: '#172033' }}>{row.executive}</td>
                        <td>{row.jobs}</td>
                        <td>{row.req}</td>
                        <td>{row.joined}</td>
                        <td>{row.bal}</td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
                            <span style={{ fontWeight: 600 }}>{row.success}</span>
                            <div style={{ width: '40px', height: '4px', backgroundColor: '#E2E8F0', borderRadius: '2px' }}>
                              <div style={{ width: row.success, height: '100%', backgroundColor: '#10B981', borderRadius: '2px' }} />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="saas-card" style={{ padding: '16px 18px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#172033', margin: 0 }}>
                  Upcoming Deadlines
                </h4>
                <span onClick={() => showToast('Viewing all upcoming job deadlines...', 'info')} style={{ fontSize: '0.74rem', color: '#1677FF', cursor: 'pointer', fontWeight: 600 }}>
                  View all →
                </span>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table className="tm-table-clean" style={{ fontSize: '0.75rem' }}>
                  <thead>
                    <tr>
                      <th>JOB ID</th>
                      <th>TRANSPORTER</th>
                      <th>EXEC.</th>
                      <th>DRIVERS</th>
                      <th>DEADLINE</th>
                      <th style={{ textAlign: 'center' }}>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deadlines.map((row, idx) => (
                      <tr key={idx}>
                        <td style={{ fontWeight: 700, color: '#1677FF' }}>{row.job_id}</td>
                        <td style={{ fontWeight: 600, color: '#334155' }}>{row.transporter}</td>
                        <td>{row.exec}</td>
                        <td>{row.drivers}</td>
                        <td style={{ color: '#64748B' }}>{row.deadline}</td>
                        <td style={{ textAlign: 'center' }}>
                          <span style={{ backgroundColor: '#FEE2E2', color: '#DC2626', padding: '2px 8px', borderRadius: '10px', fontSize: '0.7rem', fontWeight: 700 }}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Deadlines pagination */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px', marginTop: '10px' }}>
                <button
                  onClick={() => setDeadlinesPage((p) => Math.max(1, p - 1))}
                  style={{ width: '22px', height: '22px', borderRadius: '4px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                >
                  ‹
                </button>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <button
                    key={n}
                    onClick={() => setDeadlinesPage(n)}
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '4px',
                      border: n === deadlinesPage ? '1px solid #1677FF' : '1px solid #CBD5E1',
                      backgroundColor: n === deadlinesPage ? '#1677FF' : '#FFFFFF',
                      color: n === deadlinesPage ? '#FFFFFF' : '#334155',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {n}
                  </button>
                ))}
                <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>...</span>
                <button
                  onClick={() => setDeadlinesPage(19)}
                  style={{ width: '22px', height: '22px', borderRadius: '4px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', fontSize: '0.7rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  19
                </button>
                <button
                  onClick={() => setDeadlinesPage((p) => Math.min(19, p + 1))}
                  style={{ width: '22px', height: '22px', borderRadius: '4px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* RECRUITMENT FUNNEL & JOB STATUS OVERVIEW (2 COLUMNS) */}
        {/* ============================================================ */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))', gap: '16px' }}>
          {/* Recruitment Funnel */}
          <div className="saas-card" style={{ padding: '18px 20px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <Filter size={16} color="#1677FF" />
              <h4 style={{ fontSize: '0.925rem', fontWeight: 800, color: '#172033', margin: 0 }}>
                Recruitment Funnel
              </h4>
            </div>

            {/* Visual Funnel Stack */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', padding: '10px 0' }}>
              {/* Stage 1: Active Jobs */}
              <div style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '380px' }}>
                <div style={{ flex: 1, backgroundColor: '#2563EB', color: '#FFF', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', clipPath: 'polygon(0% 0%, 100% 0%, 93% 100%, 7% 100%)' }}>
                  {funnel.active_jobs ?? 95}
                </div>
                <div style={{ width: '140px', paddingLeft: '14px', fontSize: '0.78rem', color: '#1E293B', fontWeight: 700, fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ArrowRight size={12} color="#475569" /> Active Jobs
                </div>
              </div>

              {/* Stage 2: Required Drivers */}
              <div style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '380px' }}>
                <div style={{ width: '86%', margin: '0 auto', backgroundColor: '#9333EA', color: '#FFF', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', clipPath: 'polygon(0% 0%, 100% 0%, 92% 100%, 8% 100%)' }}>
                  {funnel.required_drivers ?? 447}
                </div>
                <div style={{ width: '140px', paddingLeft: '14px', fontSize: '0.78rem', color: '#1E293B', fontWeight: 700, fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ArrowRight size={12} color="#475569" /> Required Drivers
                </div>
              </div>

              {/* Stage 3: Applications */}
              <div style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '380px' }}>
                <div style={{ width: '72%', margin: '0 auto', backgroundColor: '#06B6D4', color: '#FFF', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', clipPath: 'polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%)' }}>
                  {funnel.applications ?? 2483}
                </div>
                <div style={{ width: '140px', paddingLeft: '14px', fontSize: '0.78rem', color: '#1E293B', fontWeight: 700, fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ArrowRight size={12} color="#475569" /> Applications
                </div>
              </div>

              {/* Stage 4: Unique Drivers */}
              <div style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '380px' }}>
                <div style={{ width: '58%', margin: '0 auto', backgroundColor: '#10B981', color: '#FFF', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', clipPath: 'polygon(0% 0%, 100% 0%, 88% 100%, 12% 100%)' }}>
                  {funnel.unique_drivers ?? 1033}
                </div>
                <div style={{ width: '140px', paddingLeft: '14px', fontSize: '0.78rem', color: '#1E293B', fontWeight: 700, fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ArrowRight size={12} color="#475569" /> Unique Drivers
                </div>
              </div>

              {/* Stage 5: Interview Done */}
              <div style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '380px' }}>
                <div style={{ width: '44%', margin: '0 auto', backgroundColor: '#F59E0B', color: '#FFF', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', clipPath: 'polygon(0% 0%, 100% 0%, 86% 100%, 14% 100%)' }}>
                  {funnel.interview_done ?? 35}
                </div>
                <div style={{ width: '140px', paddingLeft: '14px', fontSize: '0.78rem', color: '#1E293B', fontWeight: 700, fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ArrowRight size={12} color="#475569" /> Interview Done
                </div>
              </div>

              {/* Stage 6: Matchmaking Done */}
              <div style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '380px' }}>
                <div style={{ width: '32%', margin: '0 auto', backgroundColor: '#DC2626', color: '#FFF', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', borderRadius: '0 0 8px 8px' }}>
                  {funnel.matchmaking_done ?? 18}
                </div>
                <div style={{ width: '140px', paddingLeft: '14px', fontSize: '0.78rem', color: '#1E293B', fontWeight: 700, fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ArrowRight size={12} color="#475569" /> Matchmaking Done
                </div>
              </div>
            </div>
          </div>

          {/* Job Status Overview */}
          <div className="saas-card" style={{ padding: '18px 20px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <h4 style={{ fontSize: '0.925rem', fontWeight: 800, color: '#172033', margin: '0 0 14px' }}>
              Job Status Overview
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '10px 0' }}>
              {/* Active Jobs Bar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', color: '#475569', marginBottom: '4px' }}>
                  <span>Active Jobs</span>
                  <strong style={{ color: '#172033' }}>{jobStatusOverview.active_jobs ?? 95}</strong>
                </div>
                <div style={{ height: '8px', backgroundColor: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '25%', height: '100%', backgroundColor: '#2563EB', borderRadius: '4px' }} />
                </div>
              </div>

              {/* Applications Bar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', color: '#475569', marginBottom: '4px' }}>
                  <span>Applications</span>
                  <strong style={{ color: '#172033' }}>{jobStatusOverview.applications ?? 2483}</strong>
                </div>
                <div style={{ height: '8px', backgroundColor: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '100%', height: '100%', backgroundColor: '#9333EA', borderRadius: '4px' }} />
                </div>
              </div>

              {/* Joined Bar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', color: '#475569', marginBottom: '4px' }}>
                  <span>Joined</span>
                  <strong style={{ color: '#172033' }}>{jobStatusOverview.joined ?? 0}</strong>
                </div>
                <div style={{ height: '8px', backgroundColor: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '0%', height: '100%', backgroundColor: '#10B981', borderRadius: '4px' }} />
                </div>
              </div>

              {/* Balance Bar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', color: '#475569', marginBottom: '4px' }}>
                  <span>Balance</span>
                  <strong style={{ color: '#172033' }}>{jobStatusOverview.balance ?? 447}</strong>
                </div>
                <div style={{ height: '8px', backgroundColor: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '45%', height: '100%', backgroundColor: '#F97316', borderRadius: '4px' }} />
                </div>
              </div>
            </div>
            <div />
          </div>
        </div>

        {/* ============================================================ */}
        {/* LOWER ROW: APPLICATIONS TREND & JOBS BY STATUS (2 COLUMNS) */}
        {/* ============================================================ */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))', gap: '16px' }}>
          {/* Applications Trend (Last 7 Days) */}
          <div className="saas-card" style={{ padding: '18px 20px', border: '1px solid #E2E8F0' }}>
            <h4 style={{ fontSize: '0.925rem', fontWeight: 800, color: '#172033', margin: '0 0 14px' }}>
              Applications Trend (Last 7 Days)
            </h4>
            <div style={{ height: '160px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '10px 10px 0' }}>
              {(appTrend.data || [40, 52, 48, 75, 68, 55, 42]).map((val, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', flex: 1 }}>
                  <span style={{ fontSize: '0.7rem', color: '#2563EB', fontWeight: 700 }}>{val}</span>
                  <div
                    style={{
                      width: '28px',
                      height: `${(val / 80) * 110}px`,
                      background: 'linear-gradient(180deg, #3B82F6, #93C5FD)',
                      borderRadius: '4px 4px 0 0',
                    }}
                  />
                  <span style={{ fontSize: '0.68rem', color: '#64748B' }}>{(appTrend.labels || [])[idx] || ''}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Jobs by Status */}
          <div className="saas-card" style={{ padding: '18px 20px', border: '1px solid #E2E8F0' }}>
            <h4 style={{ fontSize: '0.925rem', fontWeight: 800, color: '#172033', margin: '0 0 14px' }}>
              Jobs by Status
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', gap: '20px', height: '160px' }}>
              {/* Donut Chart Visual */}
              <div
                style={{
                  width: '110px',
                  height: '110px',
                  borderRadius: '50%',
                  background: 'conic-gradient(#10B981 0% 57%, #2563EB 57% 84%, #F59E0B 84% 96%, #EF4444 96% 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div style={{ width: '60px', height: '60px', backgroundColor: '#FFFFFF', borderRadius: '50%' }} />
              </div>

              {/* Legend */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.78rem', color: '#475569' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                  <span>Completed: <strong style={{ color: '#172033' }}>{jobsByStatus.completed}%</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#2563EB' }} />
                  <span>Hiring: <strong style={{ color: '#172033' }}>{jobsByStatus.hiring}%</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
                  <span>Pending Payment: <strong style={{ color: '#172033' }}>{jobsByStatus.pending_payment}%</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
                  <span>Closing Soon: <strong style={{ color: '#172033' }}>{jobsByStatus.closing_soon}%</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* BOTTOM TABLE: ACTIVE JOBS DETAIL */}
        {/* ============================================================ */}
        <div className="saas-card" style={{ padding: 0, overflow: 'hidden', border: '1px solid #E2E8F0' }}>
          {/* Header & Filter Controls */}
          <div style={{ padding: '14px 20px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#172033', margin: 0 }}>
              Active Jobs Detail
            </h4>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <select style={{ padding: '5px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.75rem', outline: 'none', backgroundColor: '#FFFFFF' }}>
                <option value="">All Job Types</option>
                <option value="Standard">Standard</option>
                <option value="Premium">Premium</option>
                <option value="Super Premium">Super Premium</option>
              </select>

              <select style={{ padding: '5px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.75rem', outline: 'none', backgroundColor: '#FFFFFF' }}>
                <option value="">All Interviews</option>
                <option value="Done">Interview Done</option>
                <option value="Pending">Interview Pending</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table className="tm-table-clean" style={{ fontSize: '0.75rem' }}>
              <thead>
                <tr>
                  <th>JOB ID</th>
                  <th>TRANSPORTER NAME</th>
                  <th>EXECUTIVE</th>
                  <th>JOB TYPE</th>
                  <th style={{ textAlign: 'center' }}>REQUIRED DRIVERS</th>
                  <th style={{ textAlign: 'center' }}>APPLICATIONS</th>
                  <th style={{ textAlign: 'center' }}>UNIQUE DRIVERS</th>
                  <th style={{ textAlign: 'center' }}>JOINED</th>
                  <th style={{ textAlign: 'center' }}>BALANCE</th>
                  <th style={{ textAlign: 'center' }}>INTERVIEW DONE</th>
                  <th>DEADLINE</th>
                  <th>DAYS</th>
                </tr>
              </thead>
              <tbody>
                {(activeJobsDetail.items || []).map((row, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 800, color: '#1677FF' }}>{row.job_id}</td>
                    <td style={{ fontWeight: 600, color: '#334155' }}>{row.transporter_name}</td>
                    <td>{row.executive}</td>
                    <td>
                      <span
                        style={{
                          backgroundColor: row.job_type === 'Super Premium' ? '#FAF5FF' : row.job_type === 'Premium' ? '#EFF6FF' : '#F1F5F9',
                          color: row.job_type === 'Super Premium' ? '#7E22CE' : row.job_type === 'Premium' ? '#1D4ED8' : '#475569',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          fontWeight: 700,
                        }}
                      >
                        {row.job_type}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: 700 }}>{row.required_drivers}</td>
                    <td style={{ textAlign: 'center' }}>
                      <span style={{ fontWeight: 700, marginRight: '4px' }}>{row.applications}</span>
                      <Eye size={12} color="#1677FF" style={{ cursor: 'pointer', verticalAlign: 'middle' }} onClick={() => showToast(`Viewing applications for ${row.job_id}`, 'info')} />
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: 700 }}>{row.unique_drivers}</td>
                    <td style={{ textAlign: 'center' }}>{row.joined}</td>
                    <td style={{ textAlign: 'center', fontWeight: 700, color: '#F97316' }}>{row.balance}</td>
                    <td style={{ textAlign: 'center' }}>{row.interview_done}</td>
                    <td style={{ color: '#64748B' }}>{row.deadline}</td>
                    <td style={{ fontWeight: 600 }}>{row.days}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Pagination */}
          <div style={{ padding: '12px 20px', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
              Showing 1 to 5 of {activeJobsDetail.total || 95} entries
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button
                onClick={() => setActiveJobsPage((p) => Math.max(1, p - 1))}
                style={{ width: '26px', height: '26px', borderRadius: '4px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                ‹
              </button>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setActiveJobsPage(pageNum)}
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '4px',
                    border: pageNum === activeJobsPage ? '1px solid #1677FF' : '1px solid #CBD5E1',
                    backgroundColor: pageNum === activeJobsPage ? '#1677FF' : '#FFFFFF',
                    color: pageNum === activeJobsPage ? '#FFFFFF' : '#334155',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {pageNum}
                </button>
              ))}
              <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>...</span>
              <button
                onClick={() => setActiveJobsPage(19)}
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '4px',
                  border: activeJobsPage === 19 ? '1px solid #1677FF' : '1px solid #CBD5E1',
                  backgroundColor: activeJobsPage === 19 ? '#1677FF' : '#FFFFFF',
                  color: activeJobsPage === 19 ? '#FFFFFF' : '#334155',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                19
              </button>
              <button
                onClick={() => setActiveJobsPage((p) => Math.min(19, p + 1))}
                style={{ width: '26px', height: '26px', borderRadius: '4px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
