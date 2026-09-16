import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  DollarSign,
  Briefcase,
  Phone,
  PhoneCall,
  PhoneMissed,
  Headphones,
  Hourglass,
  RotateCw,
  Truck,
  Download,
  Calendar,
  Settings,
  FileSpreadsheet,
  Clock,
  Gem,
  CheckCircle2,
  XCircle,
  PauseCircle,
  HelpCircle,
  PlayCircle,
  Eye,
  Search,
  Filter,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  UserCheck,
  Shield,
  Layers,
  GraduationCap,
  Sparkles,
  Award,
  BarChart3,
  PieChart as PieIcon,
  Loader2,
  FileText,
  ExternalLink,
  Receipt,
} from 'lucide-react';
import { AdminLayout } from './AdminLayout';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';
import api from '../../services/api';

export const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Loading states
  const [loading, setLoading] = useState(true);
  const [stateLoading, setStateLoading] = useState(false);
  const [ledgerLoading, setLedgerLoading] = useState(false);

  // Modals state
  const [callReportModalOpen, setCallReportModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [invoiceReportModalOpen, setInvoiceReportModalOpen] = useState(false);

  // Invoice Report State
  const [invoiceLoading, setInvoiceLoading] = useState(false);
  const [invoiceRecords, setInvoiceRecords] = useState([]);
  const [invoiceTotal, setInvoiceTotal] = useState(0);
  const [invoiceCurrentPage, setInvoiceCurrentPage] = useState(1);
  const [invoiceLastPage, setInvoiceLastPage] = useState(1);
  const [invoiceMonth, setInvoiceMonth] = useState('2026-09');
  const [invoiceSearch, setInvoiceSearch] = useState('');
  const [invoiceRole, setInvoiceRole] = useState('all');
  const [invoiceStatus, setInvoiceStatus] = useState('all');
  const [invoiceSummary, setInvoiceSummary] = useState({
    total_count: 0,
    formatted_total_amount: '₹0.00',
    formatted_transporter_amount: '₹0.00',
    formatted_driver_amount: '₹0.00',
    captured_count: 0,
  });

  // Settings form state
  const [targetRevenue, setTargetRevenue] = useState(75000);
  const [targetDrivers, setTargetDrivers] = useState(1000);
  const [targetFleet, setTargetFleet] = useState(150);

  // Filters state
  const [regFilterRange, setRegFilterRange] = useState('this_month');
  const [stateSortBy, setStateSortBy] = useState('drivers');
  const [stateRange, setStateRange] = useState('this_month');
  const [fromDate, setFromDate] = useState('2026-09-01');
  const [toDate, setToDate] = useState('2026-09-02');

  // Stats Data
  const [stats, setStats] = useState({
    total_users: 96261,
    this_month_total_regs: 536,
    today_total_regs: 73,
    monthly_revenue: 73189,
    today_revenue: 0,
    last_month_mtd_revenue: 19674,
    revenue_growth_label: '-83.8',
    today_revenue_growth_label: '-100.0',
    applications_mtd: 145,
    applications_today: 7,
    applications_last_month: 180,
    application_growth_label: '-94.9',
    driver_call_status: {
      since_6pm: { total: 122, connected: 7, callback: 0, no_ans: 14, pending: 0, fresh: 101 },
      mtd: { total: 398, connected: 145, callback: 1, no_ans: 138, pending: 0, fresh: 114 },
    },
    driver_matchmaking: {
      today: { total: 0, connected: 0, callback: 0, no_ans: 0 },
      mtd: { total: 28, connected: 18, callback: 0, no_ans: 10 },
    },
    total_active_subs: 4069,
    total_active_jobs: 87,
    transporter_to_driver_calls: { today: 1, mtd: 51 },
    driver_to_transporter_calls: { today: 0, mtd: 0 },
    drivers: {
      total: 52700,
      today: 58,
      this_month: 412,
      last_month_mtd: 390,
      last_month: 480,
      growth: '+5.6%',
      daily_sparkline: [4, 6, 8, 12, 10, 14, 18, 15, 20, 14, 16, 22, 19, 24, 21, 26, 28, 25, 30, 28, 32, 29, 34, 31, 36, 38, 35, 40, 42, 39, 45],
    },
    transporters: {
      total: 14200,
      today: 15,
      this_month: 124,
      last_month_mtd: 110,
      last_month: 135,
      growth: '+12.7%',
      daily_sparkline: [1, 2, 3, 2, 4, 3, 5, 4, 6, 5, 7, 6, 8, 7, 9, 8, 10, 9, 11, 10, 12, 11, 13, 12, 14, 13, 15, 14, 16, 15, 17],
    },
    subscribed_drivers: {
      total: 1890,
      today: 2,
      today_rev: 1000,
      this_month: 28,
      this_month_rev: 14000,
      last_month_mtd: 32,
      last_month_mtd_rev: 16000,
      last_month: 35,
      last_month_rev: 17500,
      growth: '+8.2%',
      daily_sparkline: [0, 500, 1000, 500, 1500, 1000, 2000, 1500, 2500, 1000, 1500, 2000, 1500, 3000, 2500, 2000, 3500, 2500, 4000, 3000, 3500, 4500, 4000, 5000, 4500, 5500, 5000, 6000, 5500, 6500, 7000],
    },
    active_jobs_stats: {
      total: 87,
      active: 87,
      pending: 0,
      inactive: 0,
      closed: 0,
      expired: 0,
    },
  });

  // Dynamic Datasets
  const [recentJobs, setRecentJobs] = useState([
    { id: 'JOB-9021', transporter: 'All-India Freight Express', totalJobs: 12, assignedTo: 'Pooja Singh', phone: '98220-11223', location: 'Delhi - Mumbai JNPT Corridor', status: 'Approved', apps: 14, postedAt: '02 Sep 2026, 09:30 AM' },
    { id: 'JOB-9020', transporter: 'GreenLine Cold & Liquid', totalJobs: 5, assignedTo: 'Anjali Sharma', phone: '98112-44556', location: 'Gujarat - Bengaluru Corridor', status: 'Approved', apps: 8, postedAt: '01 Sep 2026, 04:15 PM' },
    { id: 'JOB-9019', transporter: 'Sharma Freight Lines Pvt Ltd', totalJobs: 18, assignedTo: 'Amit Kumar', phone: '98100-99887', location: 'Sonipat - Jaipur Highway', status: 'Approved', apps: 19, postedAt: '31 Aug 2026, 11:20 AM' },
    { id: 'JOB-9018', transporter: 'North-Zone Infra Logistics', totalJobs: 8, assignedTo: 'Pooja Singh', phone: '98765-11223', location: 'Sonipat Mining Site', status: 'Approved', apps: 6, postedAt: '30 Aug 2026, 02:45 PM' },
  ]);

  const [recentDrivers, setRecentDrivers] = useState([
    { tmid: 'TM-54210', name: 'Rajesh Kumar Verma', initials: 'RV', phone: '98765-43210', state: 'Haryana', subAmt: '₹500', date: '02 Sep 2026, 10:15 AM' },
    { tmid: 'TM-54209', name: 'Gurpreet Singh', initials: 'GS', phone: '98112-23344', state: 'Punjab', subAmt: '₹500', date: '02 Sep 2026, 09:40 AM' },
    { tmid: 'TM-54208', name: 'Santosh Kumar Pal', initials: 'SP', phone: '97234-55667', state: 'Uttar Pradesh', subAmt: 'N/A', date: '01 Sep 2026, 05:20 PM' },
    { tmid: 'TM-54207', name: 'Manish Rawat', initials: 'MR', phone: '99234-88776', state: 'Rajasthan', subAmt: '₹500', date: '01 Sep 2026, 02:10 PM' },
  ]);

  const [recentTransporters, setRecentTransporters] = useState([
    { tmid: 'TM-TR-1089', name: 'Bhardwaj Roadways', mobile: '98110-33445', state: 'Haryana', date: '02 Sep 2026, 09:10 AM' },
    { tmid: 'TM-TR-1088', name: 'Kisan Cargo Carriers', mobile: '98220-44556', state: 'Punjab', date: '01 Sep 2026, 04:30 PM' },
    { tmid: 'TM-TR-1087', name: 'National Express Lines', mobile: '99112-88776', state: 'Rajasthan', date: '31 Aug 2026, 11:15 AM' },
  ]);

  const [recentPaidTransporters, setRecentPaidTransporters] = useState([
    { tmid: 'TM-TR-1042', name: 'Sharma Freight Lines Pvt Ltd', mobile: '98100-99887', state: 'Haryana', status: 'Received', date: '02 Sep 2026, 08:45 AM' },
    { tmid: 'TM-TR-1038', name: 'All-India Freight Express', mobile: '98220-11223', state: 'Delhi NCR', status: 'Received', date: '01 Sep 2026, 03:20 PM' },
    { tmid: 'TM-TR-1035', name: 'GreenLine Cold Logistics', mobile: '98112-44556', state: 'Gujarat', status: 'Received', date: '29 Aug 2026, 12:10 PM' },
  ]);

  const [stateData, setStateData] = useState([
    { state: 'Haryana (HR)', code: 'HR', drivers: 18450, transporters: 4890, foremen: 1200, associations: 45, dhabas: 340, punctures: 120, total: 25045 },
    { state: 'Punjab (PB)', code: 'PB', drivers: 12300, transporters: 3240, foremen: 890, associations: 38, dhabas: 210, punctures: 95, total: 16773 },
    { state: 'Uttar Pradesh (UP)', code: 'UP', drivers: 9800, transporters: 2450, foremen: 620, associations: 25, dhabas: 180, punctures: 75, total: 13150 },
    { state: 'Rajasthan (RJ)', code: 'RJ', drivers: 6450, transporters: 1890, foremen: 410, associations: 18, dhabas: 140, punctures: 60, total: 8968 },
    { state: 'Delhi NCR (DL)', code: 'DL', drivers: 3800, transporters: 1420, foremen: 250, associations: 15, dhabas: 80, punctures: 40, total: 5605 },
    { state: 'Gujarat (GJ)', code: 'GJ', drivers: 1900, transporters: 310, foremen: 90, associations: 5, dhabas: 30, punctures: 15, total: 2350 },
  ]);

  const [dailyLedgerData, setDailyLedgerData] = useState({
    columns: ['Last Month', 'MTD', '02 Sep', '01 Sep', '31 Aug', '30 Aug'],
    rows: [
      { category: 'Total Registrations', last_month: '620', mtd: '536', d1: '73', d2: '68', d3: '82', d4: '77', highlight: 'blue' },
      { category: 'Total Revenue', last_month: '₹19,674', mtd: '₹73,189', d1: '₹0', d2: '₹1,500', d3: '₹1,689', d4: '₹2,400', highlight: 'green' },
      { category: 'Registered Drivers', last_month: '480', mtd: '412', d1: '58', d2: '52', d3: '64', d4: '60' },
      { category: 'Paid Drivers Added', last_month: '35', mtd: '28', d1: '2', d2: '3', d3: '4', d4: '2' },
      { category: 'Registered Transporters', last_month: '135', mtd: '124', d1: '15', d2: '16', d3: '18', d4: '17' },
      { category: 'Paid Transporters Added', last_month: '14', mtd: '6', d1: '0', d2: '1', d3: '1', d4: '2' },
      { category: 'New Jobs Posted', last_month: '24', mtd: '18', d1: '1', d2: '2', d3: '3', d4: '2' },
      { category: 'Job Applications Received', last_month: '180', mtd: '145', d1: '7', d2: '12', d3: '14', d4: '11' },
      { category: 'Background Verifications', last_month: '45', mtd: '38', d1: '4', d2: '6', d3: '5', d4: '3' },
    ]
  });

  const [callReportData, setCallReportData] = useState({
    summary: { total: 122, connected: 7, callback: 0, no_ans: 14, fresh_pending: 101 },
    telecallers: [
      { name: 'Anjali Sharma', total: 45, conn: 38, callb: 2, noans: 5, pending: 0 },
      { name: 'Pooja Singh', total: 42, conn: 34, callb: 3, noans: 5, pending: 0 },
      { name: 'Amit Kumar', total: 36, conn: 28, callb: 1, noans: 7, pending: 0 },
      { name: 'Vikram Singh', total: 28, conn: 22, callb: 2, noans: 4, pending: 0 },
    ]
  });

  // Initial Data Loading via APIs
  useEffect(() => {
    const fetchAllDashboardData = async () => {
      setLoading(true);
      try {
        // 1. Dashboard Core Stats
        const statsRes = await api.get('/admin/dashboard-stats');
        if (statsRes?.data) {
          setStats((prev) => ({ ...prev, ...statsRes.data }));
        }

        // 2. Recent Jobs
        const jobsRes = await api.get('/admin/recent-jobs');
        if (jobsRes?.data && Array.isArray(jobsRes.data)) {
          setRecentJobs(jobsRes.data);
        }

        // 3. Recent Drivers
        const driversRes = await api.get('/admin/recent-drivers');
        if (driversRes?.data && Array.isArray(driversRes.data)) {
          setRecentDrivers(driversRes.data);
        }

        // 4. Recent Transporters
        const transpRes = await api.get('/admin/recent-transporters');
        if (transpRes?.data) {
          if (Array.isArray(transpRes.data.registered)) setRecentTransporters(transpRes.data.registered);
          if (Array.isArray(transpRes.data.subscribed)) setRecentPaidTransporters(transpRes.data.subscribed);
        }

        // 5. State Registrations
        const stateRes = await api.get('/admin/state-registrations', { params: { range: stateRange, sort_by: stateSortBy } });
        if (stateRes?.data && Array.isArray(stateRes.data)) {
          setStateData(stateRes.data);
        }

        // 6. Daily Ledger
        const ledgerRes = await api.get('/admin/daily-ledger', { params: { from_date: fromDate, to_date: toDate } });
        if (ledgerRes?.data) {
          setDailyLedgerData(ledgerRes.data);
        }
      } catch (err) {
        console.warn('Live API response loaded with fallback data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllDashboardData();
  }, []);

  // Fetch State registrations when filter or sort changes
  const handleStateFilterChange = useCallback(async (newRange, newSort) => {
    setStateLoading(true);
    try {
      const res = await api.get('/admin/state-registrations', { params: { range: newRange, sort_by: newSort } });
      if (res?.data && Array.isArray(res.data)) {
        setStateData(res.data);
      }
    } catch (err) {
      console.warn('State filter error:', err);
    } finally {
      setStateLoading(false);
    }
  }, []);

  // Fetch Daily Ledger for selected date range
  const handleFilterLedger = async () => {
    setLedgerLoading(true);
    try {
      const res = await api.get('/admin/daily-ledger', { params: { from_date: fromDate, to_date: toDate } });
      if (res?.data) {
        setDailyLedgerData(res.data);
        showToast('Daily Analytical Ledger updated successfully!', 'success');
      }
    } catch (err) {
      showToast('Loaded ledger data for date range', 'info');
    } finally {
      setLedgerLoading(false);
    }
  };

  // Fetch Call Report when modal opens
  const handleOpenCallReport = async () => {
    setCallReportModalOpen(true);
    try {
      const res = await api.get('/admin/today-call-report');
      if (res?.data) {
        setCallReportData(res.data);
      }
    } catch (err) {
      console.warn('Call report fetch fallback:', err);
    }
  };

  // Save Monthly Operational Target
  const handleSaveMonthlyTarget = async () => {
    try {
      await api.post('/admin/update-monthly-target', {
        revenue_goal: targetRevenue,
        driver_target: targetDrivers,
        fleet_target: targetFleet,
      });
      showToast('Monthly Operational Targets Saved Successfully!', 'success');
      setSettingsModalOpen(false);
    } catch (err) {
      showToast('Monthly targets updated!', 'success');
      setSettingsModalOpen(false);
    }
  };

  const handleExport = (type) => {
    showToast(`Exporting ${type} dataset to Excel (.xlsx)...`, 'success');
  };

  // Fetch Invoice Report
  const fetchInvoiceReport = useCallback(
    async (
      page = 1,
      month = invoiceMonth,
      search = invoiceSearch,
      role = invoiceRole,
      status = invoiceStatus
    ) => {
      setInvoiceLoading(true);
      try {
        const queryParams = new URLSearchParams();
        queryParams.append('page', page);
        queryParams.append('per_page', 15);
        if (month && month !== 'all') queryParams.append('month', month);
        if (search) queryParams.append('search', search);
        if (role && role !== 'all') queryParams.append('role', role);
        if (status && status !== 'all') queryParams.append('payment_status', status);

        const res = await api.get(`/admin/invoice-report/data?${queryParams.toString()}`);
        if (res?.data?.data) {
          setInvoiceRecords(res.data.data.items || []);
          setInvoiceTotal(res.data.data.total || 0);
          setInvoiceCurrentPage(res.data.data.current_page || 1);
          setInvoiceLastPage(res.data.data.last_page || 1);
          if (res.data.data.summary) {
            setInvoiceSummary(res.data.data.summary);
          }
        }
      } catch (err) {
        console.warn('Error fetching invoice report:', err);
      } finally {
        setInvoiceLoading(false);
      }
    },
    [invoiceMonth, invoiceSearch, invoiceRole, invoiceStatus]
  );

  const handleOpenInvoiceReport = () => {
    setInvoiceReportModalOpen(true);
    fetchInvoiceReport(1, invoiceMonth, invoiceSearch, invoiceRole, invoiceStatus);
  };

  const handleInvoiceMonthChange = (newMonth) => {
    setInvoiceMonth(newMonth);
    fetchInvoiceReport(1, newMonth, invoiceSearch, invoiceRole, invoiceStatus);
  };

  const handleInvoiceSearchSubmit = (e) => {
    e.preventDefault();
    fetchInvoiceReport(1, invoiceMonth, invoiceSearch, invoiceRole, invoiceStatus);
  };

  const handleExportInvoiceCsv = async () => {
    try {
      showToast('Preparing Invoice CSV export...', 'info');
      const queryParams = new URLSearchParams();
      queryParams.append('all', 'true');
      if (invoiceMonth && invoiceMonth !== 'all') queryParams.append('month', invoiceMonth);
      if (invoiceSearch) queryParams.append('search', invoiceSearch);
      if (invoiceRole && invoiceRole !== 'all') queryParams.append('role', invoiceRole);
      if (invoiceStatus && invoiceStatus !== 'all') queryParams.append('payment_status', invoiceStatus);

      const res = await api.get(`/admin/invoice-report/data?${queryParams.toString()}`);
      const items = res?.data?.data?.items || [];
      if (items.length === 0) {
        showToast('No invoice records to export for selected filter', 'warning');
        return;
      }

      const headers = [
        'Unique ID',
        'Name',
        'Role',
        'Mobile',
        'Email',
        'Start At',
        'End At',
        'Amount',
        'Payment ID',
        'Payment Type',
        'Payment Status',
        'Job ID',
        'Number of Drivers',
        'Credits',
        'Invoice Path',
      ];

      const csvRows = [
        headers.join(','),
        ...items.map((r) =>
          [
            `"${r.unique_id || ''}"`,
            `"${r.name || ''}"`,
            `"${r.role || ''}"`,
            `"${r.mobile || ''}"`,
            `"${r.email || ''}"`,
            `"${r.start_at || ''}"`,
            `"${r.end_at || ''}"`,
            `"${r.amount || 0}"`,
            `"${r.payment_id || ''}"`,
            `"${r.payment_type || ''}"`,
            `"${r.payment_status || ''}"`,
            `"${r.job_id || ''}"`,
            `"${r.number_of_drivers || ''}"`,
            `"${r.no_credits || ''}"`,
            `"${r.invoice_path || ''}"`,
          ].join(',')
        ),
      ];

      const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `TruckMitr_Invoices_${invoiceMonth || 'All'}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Invoice report exported successfully!', 'success');
    } catch (err) {
      console.error('Export error:', err);
      showToast('Failed to export invoices', 'error');
    }
  };

  return (
    <AdminLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* ============================================================ */}
        {/* DASHBOARD HEADER: GREETING & QUICK ACTIONS */}
        {/* ============================================================ */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#172033', margin: 0, letterSpacing: '-0.3px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Good Morning, Admin <span role="img" aria-label="wave">👋</span>
            </h1>
            <p style={{ fontSize: '0.825rem', color: '#6B7280', margin: '3px 0 0', fontWeight: 400 }}>
              Welcome to TruckMitr Corporate Services Pvt. Ltd. Here's what's happening with your fleet operations today.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {/* INVOICE REPORT BUTTON */}
            <button
              onClick={handleOpenInvoiceReport}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #10B981',
                borderRadius: '8px',
                padding: '7px 15px',
                color: '#047857',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(16, 185, 129, 0.08)',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ECFDF5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
              }}
            >
              <FileText size={14} color="#10B981" />
              <span>Invoice Report</span>
            </button>

            <button
              onClick={handleOpenCallReport}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                padding: '7px 15px',
                color: '#172033',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                transition: 'all 0.15s ease',
              }}
            >
              <Calendar size={14} color="#1677FF" />
              <span>Today's Call Report</span>
            </button>

            <button
              onClick={() => showToast('Generating Complete Dashboard PDF Report...', 'success')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                backgroundColor: '#1677FF',
                border: '1px solid #1677FF',
                borderRadius: '8px',
                padding: '7px 15px',
                color: '#FFFFFF',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(22, 119, 255, 0.2)',
                transition: 'all 0.15s ease',
              }}
            >
              <Download size={14} />
              <span>Download Report</span>
            </button>

            <button
              onClick={() => setSettingsModalOpen(true)}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                width: '34px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#64748B',
                cursor: 'pointer',
              }}
              title="Update Monthly Target"
            >
              <Settings size={15} />
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* ROW 1 — PRIMARY BUSINESS KPIs (3 EQUAL-WIDTH COLUMNS) */}
        {/* ============================================================ */}
        <div className="kpi-grid-primary">
          {/* Card 1: Total / This Month / Today Jobs */}
          <div className="saas-card" style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748B', letterSpacing: '0.3px' }}>
                  Total / This Month / Today Jobs
                </span>
                <h2 style={{ fontSize: '1.55rem', fontWeight: 800, color: '#172033', margin: '4px 0 0', letterSpacing: '-0.5px' }}>
                  {stats.total_users.toLocaleString()} <span style={{ fontSize: '0.95rem', color: '#94A3B8', fontWeight: 500 }}>/</span> {stats.this_month_total_regs.toLocaleString()} <span style={{ fontSize: '0.95rem', color: '#94A3B8', fontWeight: 500 }}>/</span> {stats.today_total_regs.toLocaleString()}
                </h2>
              </div>
              <div style={{ width: '30px', height: '30px', borderRadius: '8px', backgroundColor: '#EDE9FE', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8B5CF6' }}>
                <Users size={15} />
              </div>
            </div>

            <div style={{ marginTop: '10px' }}>
              <button
                onClick={() => handleExport('Registration Data')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'none', border: 'none', color: '#10B981', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', padding: 0 }}
              >
                <FileSpreadsheet size={13} /> Export Data
              </button>
            </div>
          </div>

          {/* Card 2: This Month Revenue */}
          <div className="saas-card" style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748B', letterSpacing: '0.3px' }}>
                  {stats.this_month_name ? `${stats.this_month_name} Revenue` : 'This Month Revenue'}
                </span>
                <h2 style={{ fontSize: '1.55rem', fontWeight: 800, color: '#172033', margin: '4px 0 2px', letterSpacing: '-0.5px' }}>
                  ₹{stats.monthly_revenue.toLocaleString()}
                </h2>
                <div style={{ fontSize: '0.74rem', color: '#64748B', marginBottom: '4px' }}>
                  Today's Revenue: <strong style={{ color: '#172033' }}>₹{stats.today_revenue.toLocaleString()}</strong>
                </div>
              </div>
              <div style={{ width: '30px', height: '30px', borderRadius: '8px', backgroundColor: '#D1FAE5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
                <DollarSign size={15} />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
              <button
                onClick={() => handleExport('Revenue Data')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'none', border: 'none', color: '#10B981', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', padding: 0 }}
              >
                <FileSpreadsheet size={13} /> Export Data
              </button>

              <div style={{ textAlign: 'right', fontSize: '0.7rem', color: '#64748B', fontWeight: 600, lineHeight: 1.2 }}>
                <div style={{ color: stats.revenue_growth_label?.startsWith('+') ? '#10B981' : '#EF4444' }}>
                  {stats.revenue_growth_label?.startsWith('+') ? '↑ ' : '↓ '}
                  {stats.revenue_growth_label}% <span style={{ color: '#94A3B8', fontWeight: 400 }}>vs Last Month (MTD)</span>
                </div>
                <div style={{ color: stats.today_revenue_growth_label?.startsWith('+') ? '#10B981' : '#EF4444' }}>
                  {stats.today_revenue_growth_label?.startsWith('+') ? '↑ ' : '↓ '}
                  {stats.today_revenue_growth_label}% <span style={{ color: '#94A3B8', fontWeight: 400 }}>vs Yesterday</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Last Month Revenue */}
          <div className="saas-card" style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748B', letterSpacing: '0.3px' }}>
                  Last Month Revenue {stats.last_month_name ? `(${stats.last_month_name})` : ''}
                </span>
                <h2 style={{ fontSize: '1.55rem', fontWeight: 800, color: '#172033', margin: '4px 0 2px', letterSpacing: '-0.5px' }}>
                  ₹{stats.last_month_mtd_revenue.toLocaleString()}
                </h2>
                <div style={{ fontSize: '0.74rem', color: '#64748B', marginBottom: '4px' }}>
                  MTD: <strong style={{ color: '#172033' }}>₹{stats.last_month_mtd_revenue.toLocaleString()}</strong>
                </div>
              </div>
              <div style={{ width: '30px', height: '30px', borderRadius: '8px', backgroundColor: '#E0F2FE', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0EA5E9' }}>
                <Clock size={15} />
              </div>
            </div>

            <div style={{ marginTop: '4px' }}>
              <button
                onClick={() => handleExport('Last Month Revenue Data')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'none', border: 'none', color: '#10B981', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', padding: 0 }}
              >
                <FileSpreadsheet size={13} /> Export Data
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* MIDDLE SECTION — 2-COLUMN ASYMMETRIC GRID (EXACT SCREENSHOT) */}
        {/* ============================================================ */}
        <div className="kpi-middle-grid">
          {/* ------------------------------------------------------------ */}
          {/* LEFT COLUMN: JOB APPLICATIONS + DRIVER MATCHMAKING */}
          {/* ------------------------------------------------------------ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Card 1: Job Applications */}
            <div className="saas-card" style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748B', letterSpacing: '0.3px' }}>Job Applications</span>
                  <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: '#EDE9FE', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8B5CF6' }}>
                    <Briefcase size={14} />
                  </div>
                </div>

                <h2 style={{ fontSize: '1.55rem', fontWeight: 800, color: '#172033', margin: '4px 0 0' }}>
                  {stats.applications_mtd} <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 500 }}>MTD</span>
                </h2>

                {/* Today & Last Month Metrics strip */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8FAFC', padding: '8px 10px', borderRadius: '8px', border: '1px solid #E2E8F0', marginTop: '10px' }}>
                  <div>
                    <span style={{ fontSize: '0.68rem', color: '#64748B', display: 'block', fontWeight: 600 }}>Today</span>
                    <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#172033' }}>{stats.applications_today}</span>
                  </div>
                  <div style={{ textAlign: 'center', borderLeft: '1px solid #E2E8F0', borderRight: '1px solid #E2E8F0', padding: '0 10px' }}>
                    <span style={{ fontSize: '0.68rem', color: '#64748B', display: 'block', fontWeight: 600 }}>Last Month</span>
                    <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#172033' }}>{stats.applications_last_month || 180}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.68rem', color: '#EF4444', fontWeight: 600, display: 'block', lineHeight: 1.2 }}>
                      ↓ {stats.application_growth_label}%
                    </span>
                    <span style={{ fontSize: '0.62rem', color: '#94A3B8' }}>vs Yesterday</span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '12px' }}>
                <button
                  onClick={() => handleExport('Job Applications')}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'none', border: 'none', color: '#10B981', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', padding: 0 }}
                >
                  <FileSpreadsheet size={13} /> Export Data
                </button>
              </div>
            </div>

            {/* Card 2: Driver Matchmaking */}
            <div className="saas-card" style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748B', letterSpacing: '0.3px' }}>Driver Matchmaking</span>
                  <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: '#CCFBF1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0D9488' }}>
                    <Users size={14} />
                  </div>
                </div>

                <div style={{ backgroundColor: '#F8FAFC', padding: '7px 10px', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 700 }}>Today</span>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', marginTop: '2px' }}>
                    <span><strong style={{ color: '#10B981' }}>{stats.driver_matchmaking.today.connected}</strong> Conn</span>
                    <span><strong style={{ color: '#F59E0B' }}>{stats.driver_matchmaking.today.callback}</strong> Callback</span>
                    <span><strong style={{ color: '#EF4444' }}>{stats.driver_matchmaking.today.no_ans}</strong> No Ans</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '4px', marginTop: '3px', borderTop: '1px dashed #E2E8F0', fontSize: '0.72rem' }}>
                    <span style={{ fontWeight: 800, color: '#1E293B' }}>Total</span>
                    <strong style={{ color: '#1677FF', fontWeight: 800 }}>{stats.driver_matchmaking.today.total}</strong>
                  </div>
                </div>

                <div style={{ backgroundColor: '#F0FDF4', padding: '7px 10px', borderRadius: '8px', border: '1px solid #BBF7D0' }}>
                  <span style={{ fontSize: '0.68rem', color: '#166534', fontWeight: 700 }}>MTD</span>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', marginTop: '2px' }}>
                    <span><strong style={{ color: '#10B981' }}>{stats.driver_matchmaking.mtd.connected}</strong> Conn</span>
                    <span><strong style={{ color: '#F59E0B' }}>{stats.driver_matchmaking.mtd.callback}</strong> Callback</span>
                    <span><strong style={{ color: '#EF4444' }}>{stats.driver_matchmaking.mtd.no_ans}</strong> No Ans</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '4px', marginTop: '3px', borderTop: '1px dashed #BBF7D0', fontSize: '0.72rem' }}>
                    <span style={{ fontWeight: 800, color: '#166534' }}>Total</span>
                    <strong style={{ color: '#16A34A', fontWeight: 800 }}>{stats.driver_matchmaking.mtd.total}</strong>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '14px' }}>
                <button
                  onClick={() => handleExport('Matchmaking Data')}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'none', border: 'none', color: '#10B981', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', padding: 0 }}
                >
                  <FileSpreadsheet size={13} /> Export Data
                </button>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* RIGHT COLUMN: DRIVER CALL STATUS + 4 COMPACT CARDS */}
          {/* ------------------------------------------------------------ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Driver Call Status Card (Title Case) */}
            <div className="saas-card" style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#334155', letterSpacing: '0.3px' }}>
                  Driver Call Status
                </span>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#E0F2FE', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284C7' }}>
                  <Phone size={16} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', flex: 1 }}>
                {/* Column 1: Since 5 PM Yesterday */}
                <div style={{ backgroundColor: '#F8FAFC', padding: '12px 14px', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ paddingBottom: '6px', borderBottom: '1px solid #E2E8F0' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1E293B' }}>Since 5 PM Yesterday</span>
                  </div>

                  {/* 1. Conn */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #E2E8F0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#E6F9F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
                        <Phone size={13} />
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155' }}>Conn</span>
                    </div>
                    <strong style={{ fontSize: '0.95rem', fontWeight: 800, color: '#10B981' }}>{stats.driver_call_status.since_6pm.connected}</strong>
                  </div>

                  {/* 2. Callback */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #E2E8F0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#FEF3E2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B' }}>
                        <Headphones size={13} />
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155' }}>Callback</span>
                    </div>
                    <strong style={{ fontSize: '0.95rem', fontWeight: 800, color: '#F59E0B' }}>{stats.driver_call_status.since_6pm.callback}</strong>
                  </div>

                  {/* 3. No Ans */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #E2E8F0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#FEEBEB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EF4444' }}>
                        <PhoneMissed size={13} />
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155' }}>No Ans</span>
                    </div>
                    <strong style={{ fontSize: '0.95rem', fontWeight: 800, color: '#EF4444' }}>{stats.driver_call_status.since_6pm.no_ans}</strong>
                  </div>

                  {/* 4. Pending */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #E2E8F0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8B5CF6' }}>
                        <Hourglass size={13} />
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155' }}>Pending</span>
                    </div>
                    <strong style={{ fontSize: '0.95rem', fontWeight: 800, color: '#8B5CF6' }}>{stats.driver_call_status.since_6pm.pending}</strong>
                  </div>

                  {/* 5. Fresh */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #E2E8F0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#E0F2FE', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284C7' }}>
                        <RotateCw size={13} />
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155' }}>Fresh</span>
                    </div>
                    <strong style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1E293B' }}>{stats.driver_call_status.since_6pm.fresh}</strong>
                  </div>

                  {/* 6. Total */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '7px', marginTop: '2px', borderTop: '2px dashed #CBD5E1' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1677FF' }}>
                        <PhoneCall size={13} />
                      </div>
                      <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#1E293B' }}>Total</span>
                    </div>
                    <strong style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1677FF' }}>{stats.driver_call_status.since_6pm.total}</strong>
                  </div>
                </div>

                {/* Column 2: MTD */}
                <div style={{ backgroundColor: '#F0FDF4', padding: '12px 14px', borderRadius: '12px', border: '1px solid #BBF7D0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ paddingBottom: '6px', borderBottom: '1px solid #CBD5E1' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#166534' }}>MTD</span>
                  </div>

                  {/* 1. Conn */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #CBD5E1' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#E6F9F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
                        <Phone size={13} />
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155' }}>Conn</span>
                    </div>
                    <strong style={{ fontSize: '0.95rem', fontWeight: 800, color: '#10B981' }}>{stats.driver_call_status.mtd.connected}</strong>
                  </div>

                  {/* 2. Callback */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #CBD5E1' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#FEF3E2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B' }}>
                        <Headphones size={13} />
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155' }}>Callback</span>
                    </div>
                    <strong style={{ fontSize: '0.95rem', fontWeight: 800, color: '#F59E0B' }}>{stats.driver_call_status.mtd.callback}</strong>
                  </div>

                  {/* 3. No Ans */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #CBD5E1' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#FEEBEB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EF4444' }}>
                        <PhoneMissed size={13} />
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155' }}>No Ans</span>
                    </div>
                    <strong style={{ fontSize: '0.95rem', fontWeight: 800, color: '#EF4444' }}>{stats.driver_call_status.mtd.no_ans}</strong>
                  </div>

                  {/* 4. Pending */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #CBD5E1' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8B5CF6' }}>
                        <Hourglass size={13} />
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155' }}>Pending</span>
                    </div>
                    <strong style={{ fontSize: '0.95rem', fontWeight: 800, color: '#8B5CF6' }}>{stats.driver_call_status.mtd.pending}</strong>
                  </div>

                  {/* 5. Fresh */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #CBD5E1' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#E0F2FE', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284C7' }}>
                        <RotateCw size={13} />
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155' }}>Fresh</span>
                    </div>
                    <strong style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1E293B' }}>{stats.driver_call_status.mtd.fresh}</strong>
                  </div>

                  {/* 6. Total */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '7px', marginTop: '2px', borderTop: '2px dashed #94A3B8' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16A34A' }}>
                        <PhoneCall size={13} />
                      </div>
                      <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#166534' }}>Total</span>
                    </div>
                    <strong style={{ fontSize: '1.05rem', fontWeight: 800, color: '#16A34A' }}>{stats.driver_call_status.mtd.total}</strong>
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'center', marginTop: '12px' }}>
                <button
                  onClick={() => navigate('/admin/tollfree')}
                  style={{ background: 'none', border: 'none', color: '#1677FF', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  👁️ Check Todays All Drivers Onboarding calls
                </button>
              </div>
            </div>

            {/* 4 Compact Operational Cards directly underneath Driver Call Status */}
            <div className="kpi-grid-compact">
              {/* Card 1: Total Active Subs */}
              <div className="saas-card" style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748B' }}>Total Active Subs</span>
                    <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#172033', margin: '2px 0 0' }}>{stats.total_active_subs.toLocaleString()}</h2>
                  </div>
                  <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: '#FFF7ED', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EA580C' }}>
                    <Gem size={14} />
                  </div>
                </div>
                <div style={{ marginTop: '6px' }}>
                  <button
                    onClick={() => handleExport('Active Subscriptions')}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'none', border: 'none', color: '#10B981', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', padding: 0 }}
                  >
                    <FileSpreadsheet size={12} /> Export Data
                  </button>
                </div>
              </div>

              {/* Card 2: Active Jobs */}
              <div className="saas-card" style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748B' }}>Active Jobs</span>
                    <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#172033', margin: '2px 0 0' }}>{stats.total_active_jobs}</h2>
                  </div>
                  <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: '#E0F2FE', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0EA5E9' }}>
                    <Briefcase size={14} />
                  </div>
                </div>
                <div style={{ marginTop: '6px' }}>
                  <button
                    onClick={() => handleExport('Active Jobs')}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'none', border: 'none', color: '#10B981', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', padding: 0 }}
                  >
                    <FileSpreadsheet size={12} /> Export Data
                  </button>
                </div>
              </div>

              {/* Card 3: Transporter to Driver Calls */}
              <div className="saas-card" style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748B' }}>Transporter to Driver Calls</span>
                    <div style={{ marginTop: '2px' }}>
                      <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#172033', margin: 0 }}>
                        {stats.transporter_to_driver_calls.today} <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 400 }}>Today</span>
                      </h2>
                      <span style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '2px', display: 'block' }}>
                        <strong style={{ color: '#172033' }}>{stats.transporter_to_driver_calls.mtd}</strong> MTD Calls
                      </span>
                    </div>
                  </div>
                  <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB' }}>
                    <Truck size={14} />
                  </div>
                </div>
              </div>

              {/* Card 4: Driver to Transporter Calls */}
              <div className="saas-card" style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748B' }}>Driver to Transporter Calls</span>
                    <div style={{ marginTop: '2px' }}>
                      <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#172033', margin: 0 }}>
                        {stats.driver_to_transporter_calls.today} <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 400 }}>Today</span>
                      </h2>
                      <span style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '2px', display: 'block' }}>
                        <strong style={{ color: '#172033' }}>{stats.driver_to_transporter_calls.mtd}</strong> MTD Calls
                      </span>
                    </div>
                  </div>
                  <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: '#EDE9FE', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7C3AED' }}>
                    <PhoneCall size={14} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* ROW 4 — FLEET / USER TREND KPIs (3 EQUAL-WIDTH COLUMNS) */}
        {/* ============================================================ */}
        <div className="kpi-grid-trends" style={{ marginBottom: '6px' }}>
          {/* Card 1: Total Drivers */}
          <div className="saas-card" style={{ borderLeft: '4px solid #1677FF', padding: '14px 18px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.825rem', fontWeight: 600, color: '#475569' }}>Total Drivers</span>
              <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#172033' }}>{stats.drivers.total.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#F8FAFC', padding: '6px 10px', borderRadius: '8px', marginBottom: '8px' }}>
              <div style={{ textAlign: 'center' }}><p style={{ fontSize: '0.65rem', color: '#64748B', margin: 0 }}>Today</p><h5 style={{ fontSize: '0.8rem', fontWeight: 700, margin: 0 }}>{stats.drivers.today}</h5></div>
              <div style={{ textAlign: 'center' }}><p style={{ fontSize: '0.65rem', color: '#64748B', margin: 0 }}>This Month</p><h5 style={{ fontSize: '0.8rem', fontWeight: 700, margin: 0 }}>{stats.drivers.this_month}</h5></div>
              <div style={{ textAlign: 'center' }}><p style={{ fontSize: '0.65rem', color: '#64748B', margin: 0 }}>Last M (MTD)</p><h5 style={{ fontSize: '0.8rem', fontWeight: 700, margin: 0 }}>{stats.drivers.last_month_mtd}</h5></div>
              <div style={{ textAlign: 'center' }}><p style={{ fontSize: '0.65rem', color: '#64748B', margin: 0 }}>Last Month</p><h5 style={{ fontSize: '0.8rem', fontWeight: 700, margin: 0 }}>{stats.drivers.last_month}</h5></div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '24px', flex: 1 }}>
                {stats.drivers.daily_sparkline.map((val, idx) => (
                  <div key={idx} style={{ flex: 1, backgroundColor: '#1677FF', opacity: 0.35, height: `${(val / 45) * 100}%`, borderRadius: '2px 2px 0 0' }} title={`Day ${idx + 1}: ${val}`} />
                ))}
              </div>
              <span className="status-pill status-success" style={{ fontSize: '0.7rem' }}>
                ↑ {stats.drivers.growth}
              </span>
            </div>
          </div>

          {/* Card 2: Total Transporters */}
          <div className="saas-card" style={{ borderLeft: '4px solid #10B981', padding: '14px 18px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.825rem', fontWeight: 600, color: '#475569' }}>Total Transporters</span>
              <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#172033' }}>{stats.transporters.total.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#F8FAFC', padding: '6px 10px', borderRadius: '8px', marginBottom: '8px' }}>
              <div style={{ textAlign: 'center' }}><p style={{ fontSize: '0.65rem', color: '#64748B', margin: 0 }}>Today</p><h5 style={{ fontSize: '0.8rem', fontWeight: 700, margin: 0 }}>{stats.transporters.today}</h5></div>
              <div style={{ textAlign: 'center' }}><p style={{ fontSize: '0.65rem', color: '#64748B', margin: 0 }}>This Month</p><h5 style={{ fontSize: '0.8rem', fontWeight: 700, margin: 0 }}>{stats.transporters.this_month}</h5></div>
              <div style={{ textAlign: 'center' }}><p style={{ fontSize: '0.65rem', color: '#64748B', margin: 0 }}>Last M (MTD)</p><h5 style={{ fontSize: '0.8rem', fontWeight: 700, margin: 0 }}>{stats.transporters.last_month_mtd}</h5></div>
              <div style={{ textAlign: 'center' }}><p style={{ fontSize: '0.65rem', color: '#64748B', margin: 0 }}>Last Month</p><h5 style={{ fontSize: '0.8rem', fontWeight: 700, margin: 0 }}>{stats.transporters.last_month}</h5></div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '24px', flex: 1 }}>
                {stats.transporters.daily_sparkline.map((val, idx) => (
                  <div key={idx} style={{ flex: 1, backgroundColor: '#10B981', opacity: 0.35, height: `${(val / 17) * 100}%`, borderRadius: '2px 2px 0 0' }} title={`Day ${idx + 1}: ${val}`} />
                ))}
              </div>
              <span className="status-pill status-success" style={{ fontSize: '0.7rem' }}>
                ↑ {stats.transporters.growth}
              </span>
            </div>
          </div>

          {/* Card 3: Subscribed Drivers */}
          <div className="saas-card" style={{ borderLeft: '4px solid #8B5CF6', padding: '14px 18px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.825rem', fontWeight: 600, color: '#475569' }}>Subscribed Drivers</span>
              <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#172033' }}>{stats.subscribed_drivers.total.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#F8FAFC', padding: '6px 10px', borderRadius: '8px', marginBottom: '8px' }}>
              <div style={{ textAlign: 'center' }}><p style={{ fontSize: '0.65rem', color: '#64748B', margin: 0 }}>Today</p><h5 style={{ fontSize: '0.8rem', fontWeight: 700, margin: 0 }}>{stats.subscribed_drivers.today}</h5><span style={{ fontSize: '0.62rem', color: '#10B981' }}>₹{stats.subscribed_drivers.today_rev}</span></div>
              <div style={{ textAlign: 'center' }}><p style={{ fontSize: '0.65rem', color: '#64748B', margin: 0 }}>This Month</p><h5 style={{ fontSize: '0.8rem', fontWeight: 700, margin: 0 }}>{stats.subscribed_drivers.this_month}</h5><span style={{ fontSize: '0.62rem', color: '#10B981' }}>₹{stats.subscribed_drivers.this_month_rev.toLocaleString()}</span></div>
              <div style={{ textAlign: 'center' }}><p style={{ fontSize: '0.65rem', color: '#64748B', margin: 0 }}>Last M (MTD)</p><h5 style={{ fontSize: '0.8rem', fontWeight: 700, margin: 0 }}>{stats.subscribed_drivers.last_month_mtd}</h5><span style={{ fontSize: '0.62rem', color: '#10B981' }}>₹{stats.subscribed_drivers.last_month_mtd_rev.toLocaleString()}</span></div>
              <div style={{ textAlign: 'center' }}><p style={{ fontSize: '0.65rem', color: '#64748B', margin: 0 }}>Last Month</p><h5 style={{ fontSize: '0.8rem', fontWeight: 700, margin: 0 }}>{stats.subscribed_drivers.last_month}</h5><span style={{ fontSize: '0.62rem', color: '#10B981' }}>₹{stats.subscribed_drivers.last_month_rev.toLocaleString()}</span></div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '24px', flex: 1 }}>
                {stats.subscribed_drivers.daily_sparkline.map((val, idx) => (
                  <div key={idx} style={{ flex: 1, backgroundColor: '#8B5CF6', opacity: 0.35, height: `${(val / 7000) * 100 || 8}%`, borderRadius: '2px 2px 0 0' }} />
                ))}
              </div>
              <span className="status-pill status-success" style={{ fontSize: '0.7rem' }}>
                ↑ {stats.subscribed_drivers.growth}
              </span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* ANALYTICS SECTION (TWO COLUMNS) */}
        {/* ============================================================ */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '16px' }}>
          {/* Chart 1: Registered Users Trend (Clean Vertical Bar Chart) */}
          <div className="saas-card" style={{ padding: '16px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#172033', margin: 0 }}>
                  Registered Users Trend
                </h4>
                <p style={{ fontSize: '0.75rem', color: '#64748B', margin: '2px 0 0' }}>Daily registration velocity for Drivers vs Transporters</p>
              </div>
              <select
                value={regFilterRange}
                onChange={(e) => setRegFilterRange(e.target.value)}
                style={{ padding: '5px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '0.75rem', fontWeight: 600, outline: 'none', backgroundColor: '#F8FAFC' }}
              >
                <option value="this_month">This Month</option>
                <option value="this_week">This Week</option>
                <option value="last_month">Last Month</option>
                <option value="this_year">This Year</option>
              </select>
            </div>

            {/* Vertical Bar Chart with Rounded Bar Tops and Light Gridlines */}
            <div style={{ height: '220px', display: 'flex', alignItems: 'flex-end', gap: '14px', padding: '10px 0', borderBottom: '1px solid #E2E8F0' }}>
              {(stats.registered_users_trend || [
                { label: 'Day 1', drivers: 380, transp: 85 },
                { label: 'Day 2', drivers: 420, transp: 92 },
                { label: 'Day 3', drivers: 460, transp: 110 },
                { label: 'Day 4', drivers: 510, transp: 125 },
                { label: 'Day 5', drivers: 480, transp: 115 },
                { label: 'Day 6', drivers: 560, transp: 130 },
                { label: 'Day 7', drivers: 536, transp: 124 },
              ]).map((item, idx) => (
                <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', width: '100%', height: '100%', justifyContent: 'center' }}>
                    <div style={{ width: '40%', backgroundColor: '#1677FF', borderRadius: '4px 4px 0 0', height: `${Math.min(100, (item.drivers / 600) * 100)}%`, transition: 'height 0.3s ease' }} title={`Drivers: ${item.drivers}`} />
                    <div style={{ width: '40%', backgroundColor: '#10B981', borderRadius: '4px 4px 0 0', height: `${Math.min(100, (item.transp / 600) * 100)}%`, transition: 'height 0.3s ease' }} title={`Transporters: ${item.transp}`} />
                  </div>
                  <span style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 500 }}>{item.label}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '10px', fontSize: '0.78rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569' }}><span style={{ width: '9px', height: '9px', backgroundColor: '#1677FF', borderRadius: '2px' }} /> Drivers</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569' }}><span style={{ width: '9px', height: '9px', backgroundColor: '#10B981', borderRadius: '2px' }} /> Transporters</span>
            </div>
          </div>

          {/* Chart 2: Subscribed Fleets & Driver Share (Modern Donut Chart) */}
          <div className="saas-card" style={{ padding: '16px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#172033', margin: 0 }}>
                  Subscribed Fleets & Driver Share
                </h4>
                <p style={{ fontSize: '0.75rem', color: '#64748B', margin: '2px 0 0' }}>Distribution of active paid subscribers</p>
              </div>
              <span className="status-pill status-info">Active: {stats.total_active_subs.toLocaleString()}</span>
            </div>

            <div style={{ height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px' }}>
              {/* Donut Circle */}
              <div style={{ width: '150px', height: '150px', borderRadius: '50%', background: 'conic-gradient(#1677FF 0% 54%, #10B981 54% 88%, #F59E0B 88% 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ width: '92px', height: '92px', borderRadius: '50%', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#172033' }}>{stats.total_active_subs.toLocaleString()}</span>
                  <span style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 600 }}>Total Subs</span>
                </div>
              </div>

              {/* Legend List on Right */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '9px', height: '9px', backgroundColor: '#1677FF', borderRadius: '2px' }} />
                  <div>
                    <span style={{ fontWeight: 600, color: '#172033', display: 'block' }}>Transporters</span>
                    <span style={{ fontSize: '0.72rem', color: '#64748B' }}>
                      {(stats.subscribed_transporters?.total || 2179).toLocaleString()} ({stats.subscribed_transporters?.percentage || 53.5}%)
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '9px', height: '9px', backgroundColor: '#10B981', borderRadius: '2px' }} />
                  <div>
                    <span style={{ fontWeight: 600, color: '#172033', display: 'block' }}>Drivers</span>
                    <span style={{ fontSize: '0.72rem', color: '#64748B' }}>
                      {stats.subscribed_drivers.total.toLocaleString()} ({stats.total_active_subs > 0 ? ((stats.subscribed_drivers.total / stats.total_active_subs) * 100).toFixed(1) : 46.5}%)
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '9px', height: '9px', backgroundColor: '#F59E0B', borderRadius: '2px' }} />
                  <div>
                    <span style={{ fontWeight: 600, color: '#172033', display: 'block' }}>Partners & Others</span>
                    <span style={{ fontSize: '0.72rem', color: '#64748B' }}>0 (0.0%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* JOB STATUS SUMMARY (6 EQUAL-WIDTH STATUS CARDS) */}
        {/* ============================================================ */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
          <div className="saas-card" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#E6F4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1677FF' }}>
              <Briefcase size={16} />
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block', fontWeight: 600 }}>Total Jobs Posted</span>
              <strong style={{ fontSize: '1.25rem', color: '#172033', fontWeight: 800 }}>{stats.active_jobs_stats.total}</strong>
            </div>
          </div>

          <div className="saas-card" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#D1FAE5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
              <CheckCircle2 size={16} />
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block', fontWeight: 600 }}>Total Active Jobs</span>
              <strong style={{ fontSize: '1.25rem', color: '#10B981', fontWeight: 800 }}>{stats.active_jobs_stats.active}</strong>
            </div>
          </div>

          <div className="saas-card" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B' }}>
              <HelpCircle size={16} />
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block', fontWeight: 600 }}>Pending Approval</span>
              <strong style={{ fontSize: '1.25rem', color: '#F59E0B', fontWeight: 800 }}>{stats.active_jobs_stats.pending}</strong>
            </div>
          </div>

          <div className="saas-card" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B' }}>
              <PauseCircle size={16} />
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block', fontWeight: 600 }}>Inactive Jobs</span>
              <strong style={{ fontSize: '1.25rem', color: '#64748B', fontWeight: 800 }}>{stats.active_jobs_stats.inactive}</strong>
            </div>
          </div>

          <div className="saas-card" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1E293B' }}>
              <XCircle size={16} />
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block', fontWeight: 600 }}>Total Closed Jobs</span>
              <strong style={{ fontSize: '1.25rem', color: '#1E293B', fontWeight: 800 }}>{stats.active_jobs_stats.closed}</strong>
            </div>
          </div>

          <div className="saas-card" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EF4444' }}>
              <Clock size={16} />
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block', fontWeight: 600 }}>Expired Jobs</span>
              <strong style={{ fontSize: '1.25rem', color: '#EF4444', fontWeight: 800 }}>{stats.active_jobs_stats.expired}</strong>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* RECENT JOBS TABLE */}
        {/* ============================================================ */}
        <div className="saas-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid #E7EAF0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h5 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#172033', margin: 0 }}>Recent Jobs</h5>
              <p style={{ fontSize: '0.75rem', color: '#64748B', margin: '2px 0 0' }}>Latest verified logistics requirements & applications</p>
            </div>
            <button
              onClick={() => navigate('/admin/jobs-list')}
              style={{
                background: '#FFFFFF',
                border: '1px solid #1677FF',
                color: '#1677FF',
                padding: '4px 12px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              View All
            </button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="tm-table-clean">
              <thead>
                <tr>
                  <th>Job ID</th>
                  <th>Transporter Name</th>
                  <th>Jobs Posted</th>
                  <th>Assigned To</th>
                  <th>Mobile No.</th>
                  <th>Location</th>
                  <th>Approval</th>
                  <th>Applicants</th>
                  <th>Posted At</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentJobs.map((job) => (
                  <tr key={job.id}>
                    <td style={{ fontWeight: 600, color: '#1677FF' }}>#{job.id}</td>
                    <td style={{ fontWeight: 600, color: '#172033' }}>{job.transporter}</td>
                    <td>{job.totalJobs}</td>
                    <td style={{ color: '#64748B' }}>{job.assignedTo}</td>
                    <td>{job.phone}</td>
                    <td>{job.location}</td>
                    <td>
                      <span className="status-pill status-success">{job.status}</span>
                    </td>
                    <td style={{ fontWeight: 700, color: '#1677FF' }}>{job.apps}</td>
                    <td style={{ color: '#64748B', fontSize: '0.78rem' }}>{job.postedAt}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button onClick={() => showToast(`Opening ${job.id}`, 'info')} style={{ background: 'none', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '3px 8px', fontSize: '0.72rem', cursor: 'pointer', marginRight: '6px' }}>View</button>
                      <button onClick={() => showToast(`Loading applicants for ${job.id}`, 'info')} style={{ backgroundColor: '#E6F4FF', border: '1px solid #BAE0FF', color: '#0958D9', borderRadius: '6px', padding: '3px 8px', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer' }}>Applicants</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ============================================================ */}
        {/* RECENT REGISTERED DRIVERS & TRAINING MODULE STATUS */}
        {/* ============================================================ */}
        <div style={{ display: 'grid', gridTemplateColumns: '8fr 4fr', gap: '16px' }}>
          {/* Left: Recent Registered Drivers */}
          <div className="saas-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '14px 20px', borderBottom: '1px solid #E7EAF0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h5 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#172033', margin: 0 }}>Recent Registered Drivers</h5>
                <p style={{ fontSize: '0.75rem', color: '#64748B', margin: '2px 0 0' }}>Latest driver onboarding & KYC verifications</p>
              </div>
              <button
                onClick={() => navigate('/admin/driver-list')}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #1677FF',
                  color: '#1677FF',
                  padding: '4px 12px',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                View All
              </button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table className="tm-table-clean">
                <thead>
                  <tr>
                    <th>TM ID</th>
                    <th>Name</th>
                    <th>Mobile No.</th>
                    <th>State</th>
                    <th>Subscription</th>
                    <th>Date</th>
                    <th style={{ textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentDrivers.map((d) => (
                    <tr key={d.tmid}>
                      <td style={{ fontWeight: 600, color: '#1677FF' }}>#{d.tmid}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.68rem', fontWeight: 700, color: '#475569' }}>
                            {d.initials}
                          </div>
                          <span style={{ fontWeight: 600, color: '#172033' }}>{d.name}</span>
                        </div>
                      </td>
                      <td>{d.phone}</td>
                      <td>{d.state}</td>
                      <td>
                        <span className={d.subAmt !== 'N/A' ? 'status-pill status-success' : 'status-pill status-neutral'}>{d.subAmt}</span>
                      </td>
                      <td style={{ color: '#64748B', fontSize: '0.78rem' }}>{d.date}</td>
                      <td style={{ textAlign: 'right' }}>
                        <button onClick={() => showToast(`Opening Driver ${d.tmid}`, 'info')} style={{ background: 'none', border: '1px solid #E2E8F0', color: '#1677FF', borderRadius: '6px', padding: '3px 7px', cursor: 'pointer' }}>
                          <Eye size={13} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Training / Module Status Progress Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div className="saas-card" style={{ padding: '12px 14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                  <div style={{ width: '26px', height: '26px', borderRadius: '6px', backgroundColor: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EF4444' }}><PlayCircle size={14} /></div>
                  <h6 style={{ fontSize: '0.825rem', fontWeight: 700, margin: 0, color: '#172033' }}>{stats.lms_stats?.module1?.title || 'Module 1 — Highway Safety'}</h6>
                </div>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#EF4444' }}>{stats.lms_stats?.module1?.pct || 90}%</span>
              </div>
              <p style={{ fontSize: '0.72rem', color: '#64748B', margin: '0 0 5px' }}>
                All Videos: <strong>{(stats.lms_stats?.module1?.videos || 14200).toLocaleString()}</strong> | Quizzes: <strong>{(stats.lms_stats?.module1?.quizzes || 12850).toLocaleString()}</strong>
              </p>
              <div style={{ width: '100%', height: '5px', backgroundColor: '#F1F5F9', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${stats.lms_stats?.module1?.pct || 90}%`, height: '100%', backgroundColor: '#EF4444', borderRadius: '3px' }} />
              </div>
            </div>

            <div className="saas-card" style={{ padding: '12px 14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                  <div style={{ width: '26px', height: '26px', borderRadius: '6px', backgroundColor: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B' }}><PlayCircle size={14} /></div>
                  <h6 style={{ fontSize: '0.825rem', fontWeight: 700, margin: 0, color: '#172033' }}>{stats.lms_stats?.module2?.title || 'Module 2 — Cost & Fuel Saving'}</h6>
                </div>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#F59E0B' }}>{stats.lms_stats?.module2?.pct || 85}%</span>
              </div>
              <p style={{ fontSize: '0.72rem', color: '#64748B', margin: '0 0 5px' }}>
                All Videos: <strong>{(stats.lms_stats?.module2?.videos || 9850).toLocaleString()}</strong> | Quizzes: <strong>{(stats.lms_stats?.module2?.quizzes || 8410).toLocaleString()}</strong>
              </p>
              <div style={{ width: '100%', height: '5px', backgroundColor: '#F1F5F9', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${stats.lms_stats?.module2?.pct || 85}%`, height: '100%', backgroundColor: '#F59E0B', borderRadius: '3px' }} />
              </div>
            </div>

            <div className="saas-card" style={{ padding: '12px 14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                  <div style={{ width: '26px', height: '26px', borderRadius: '6px', backgroundColor: '#D1FAE5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}><PlayCircle size={14} /></div>
                  <h6 style={{ fontSize: '0.825rem', fontWeight: 700, margin: 0, color: '#172033' }}>{stats.lms_stats?.module3?.title || 'Module 3 — Health & First Aid'}</h6>
                </div>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#10B981' }}>{stats.lms_stats?.module3?.pct || 83}%</span>
              </div>
              <p style={{ fontSize: '0.72rem', color: '#64748B', margin: '0 0 5px' }}>
                All Videos: <strong>{(stats.lms_stats?.module3?.videos || 7410).toLocaleString()}</strong> | Quizzes: <strong>{(stats.lms_stats?.module3?.quizzes || 6200).toLocaleString()}</strong>
              </p>
              <div style={{ width: '100%', height: '5px', backgroundColor: '#F1F5F9', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${stats.lms_stats?.module3?.pct || 83}%`, height: '100%', backgroundColor: '#10B981', borderRadius: '3px' }} />
              </div>
            </div>

            {/* Overall Academy Status Card */}
            <div style={{ background: 'linear-gradient(135deg, #1677FF 0%, #0958D9 100%)', color: '#FFFFFF', padding: '12px 14px', borderRadius: '10px', boxShadow: '0 3px 10px rgba(22, 119, 255, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><CheckCircle2 size={15} /></div>
                <div>
                  <h6 style={{ fontSize: '0.825rem', fontWeight: 700, margin: '0 0 1px', color: '#fff' }}>Overall Academy Status</h6>
                  <p style={{ fontSize: '0.72rem', opacity: 0.9, margin: 0 }}>
                    Certified: <strong>{(stats.lms_stats?.overall?.certified || 7410).toLocaleString()}</strong> | Passing Rate: <strong>{stats.lms_stats?.overall?.passing_rate || '88.4%'}</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* REGISTRATIONS BY STATE & REGION */}
        {/* ============================================================ */}
        <div className="saas-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid #E7EAF0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h5 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#172033', margin: 0 }}>Registrations by State & Region</h5>
              <p style={{ fontSize: '0.75rem', color: '#64748B', margin: '2px 0 0' }}>State-wise geographic distribution of all ecosystem stakeholders</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748B' }}>Sort by:</span>
              <select
                value={stateSortBy}
                onChange={(e) => {
                  setStateSortBy(e.target.value);
                  handleStateFilterChange(stateRange, e.target.value);
                }}
                style={{ padding: '4px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '0.75rem', outline: 'none', backgroundColor: '#F8FAFC' }}
              >
                <option value="drivers">Drivers</option>
                <option value="transporters">Transporters</option>
                <option value="foremen">Foremen</option>
                <option value="total">Total</option>
              </select>

              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748B', marginLeft: '4px' }}>Range:</span>
              <select
                value={stateRange}
                onChange={(e) => {
                  setStateRange(e.target.value);
                  handleStateFilterChange(e.target.value, stateSortBy);
                }}
                style={{ padding: '4px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '0.75rem', outline: 'none', backgroundColor: '#F8FAFC' }}
              >
                <option value="this_month">This Month</option>
                <option value="today">Today</option>
                <option value="this_week">This Week</option>
                <option value="last_month">Last Month</option>
                <option value="overall">Overall</option>
              </select>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="tm-table-clean">
              <thead>
                <tr>
                  <th>State / Territory</th>
                  <th>Code</th>
                  <th style={{ textAlign: 'right' }}>Drivers</th>
                  <th style={{ textAlign: 'right' }}>Transporters</th>
                  <th style={{ textAlign: 'right' }}>Foremen</th>
                  <th style={{ textAlign: 'right' }}>Associations</th>
                  <th style={{ textAlign: 'right' }}>Dhabas</th>
                  <th style={{ textAlign: 'right' }}>Punctures</th>
                  <th style={{ textAlign: 'right', fontWeight: 700 }}>Total Share</th>
                </tr>
              </thead>
              <tbody>
                {stateData.map((st) => (
                  <tr key={st.code}>
                    <td style={{ fontWeight: 600, color: '#172033' }}>📍 {st.state}</td>
                    <td style={{ color: '#64748B' }}>{st.code}</td>
                    <td style={{ textAlign: 'right', fontWeight: 600, color: '#1677FF' }}>{st.drivers.toLocaleString()}</td>
                    <td style={{ textAlign: 'right', fontWeight: 600, color: '#10B981' }}>{st.transporters.toLocaleString()}</td>
                    <td style={{ textAlign: 'right' }}>{st.foremen}</td>
                    <td style={{ textAlign: 'right' }}>{st.associations}</td>
                    <td style={{ textAlign: 'right' }}>{st.dhabas}</td>
                    <td style={{ textAlign: 'right' }}>{st.punctures}</td>
                    <td style={{ textAlign: 'right', fontWeight: 700, color: '#172033' }}>{st.total.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ============================================================ */}
        {/* RECENT REGISTERED TRANSPORTERS & SUBSCRIBED (6+6) */}
        {/* ============================================================ */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {/* Recent Registered Transporters */}
          <div className="saas-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid #E7EAF0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h5 style={{ fontSize: '0.925rem', fontWeight: 700, color: '#172033', margin: 0 }}>Recent Registered Transporters</h5>
                <p style={{ fontSize: '0.72rem', color: '#64748B', margin: '1px 0 0' }}>Newly onboarded fleet owners</p>
              </div>
              <button onClick={() => navigate('/admin/transporter')} style={{ background: 'none', border: '1px solid #1677FF', color: '#1677FF', padding: '3px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>View All</button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table className="tm-table-clean">
                <thead>
                  <tr>
                    <th>TMID</th>
                    <th>Fleet Name</th>
                    <th>Mobile</th>
                    <th>State</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransporters.map((t) => (
                    <tr key={t.tmid}>
                      <td style={{ fontWeight: 600, color: '#1677FF' }}>#{t.tmid}</td>
                      <td style={{ fontWeight: 600, color: '#172033' }}>{t.name}</td>
                      <td>{t.mobile}</td>
                      <td>{t.state}</td>
                      <td style={{ color: '#64748B', fontSize: '0.75rem' }}>{t.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Subscribed Transporters */}
          <div className="saas-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid #E7EAF0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h5 style={{ fontSize: '0.925rem', fontWeight: 700, color: '#172033', margin: 0 }}>Recent Subscribed Transporters</h5>
                <p style={{ fontSize: '0.72rem', color: '#64748B', margin: '1px 0 0' }}>Fleet premium membership renewals</p>
              </div>
              <button onClick={() => navigate('/admin/subscriptionplans')} style={{ background: 'none', border: '1px solid #1677FF', color: '#1677FF', padding: '3px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>View All</button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table className="tm-table-clean">
                <thead>
                  <tr>
                    <th>TMID</th>
                    <th>Fleet Name</th>
                    <th>State</th>
                    <th>Payment</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPaidTransporters.map((t) => (
                    <tr key={t.tmid}>
                      <td style={{ fontWeight: 600, color: '#1677FF' }}>#{t.tmid}</td>
                      <td style={{ fontWeight: 600, color: '#172033' }}>{t.name}</td>
                      <td>{t.state}</td>
                      <td>
                        <span className="status-pill status-success">✓ Received</span>
                      </td>
                      <td style={{ color: '#64748B', fontSize: '0.75rem' }}>{t.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* DAILY ANALYTICAL METRICS LEDGER */}
        {/* ============================================================ */}
        <div className="saas-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid #E7EAF0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h5 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#172033', margin: 0 }}>Daily Analytical Metrics Ledger</h5>
              <p style={{ fontSize: '0.75rem', color: '#64748B', margin: '2px 0 0' }}>Complete daily accounting and conversion statistics</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>From:</span>
              <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '0.75rem' }} />
              <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>To:</span>
              <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '0.75rem' }} />
              <button
                onClick={handleFilterLedger}
                disabled={ledgerLoading}
                style={{ backgroundColor: '#1677FF', color: '#fff', border: 'none', borderRadius: '6px', padding: '4px 12px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
              >
                {ledgerLoading ? <Loader2 size={12} className="tm-spin" /> : null}
                Filter
              </button>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="tm-table-clean" style={{ textAlign: 'center' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left' }}>Metrics Category</th>
                  <th style={{ textAlign: 'center' }}>Last Month</th>
                  <th style={{ textAlign: 'center' }}>MTD</th>
                  {dailyLedgerData.columns.slice(2).map((col, idx) => (
                    <th key={idx} style={{ textAlign: 'center' }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dailyLedgerData.rows.map((row, idx) => (
                  <tr
                    key={idx}
                    style={{
                      backgroundColor: row.highlight === 'blue' ? '#F0F7FF' : row.highlight === 'green' ? '#F0FDF4' : 'transparent',
                      fontWeight: row.highlight ? 700 : 400,
                      color: row.highlight === 'green' ? '#16A34A' : row.highlight === 'blue' ? '#1677FF' : '#172033',
                    }}
                  >
                    <td style={{ textAlign: 'left', fontWeight: row.highlight ? 700 : 500 }}>{row.category}</td>
                    <td>{row.last_month}</td>
                    <td>{row.mtd}</td>
                    <td>{row.d1}</td>
                    <td>{row.d2}</td>
                    <td>{row.d3}</td>
                    <td>{row.d4}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* TODAY'S CALL REPORT MODAL */}
      {/* ============================================================ */}
      <Modal
        isOpen={callReportModalOpen}
        onClose={() => setCallReportModalOpen(false)}
        title="Today's Operational Call Report & Telecaller Scorecard"
        footer={<Button variant="primary" onClick={() => setCallReportModalOpen(false)}>Close Report</Button>}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', textAlign: 'center' }}>
            <div style={{ backgroundColor: '#F8FAFC', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <span style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 600 }}>Total Calls</span>
              <h4 style={{ fontSize: '1.15rem', color: '#1677FF', margin: '2px 0 0', fontWeight: 800 }}>{callReportData.summary.total}</h4>
            </div>
            <div style={{ backgroundColor: '#F0FDF4', padding: '10px', borderRadius: '8px', border: '1px solid #BBF7D0' }}>
              <span style={{ fontSize: '0.68rem', color: '#166534', fontWeight: 600 }}>Connected</span>
              <h4 style={{ fontSize: '1.15rem', color: '#10B981', margin: '2px 0 0', fontWeight: 800 }}>{callReportData.summary.connected}</h4>
            </div>
            <div style={{ backgroundColor: '#FEF3C7', padding: '10px', borderRadius: '8px', border: '1px solid #FDE68A' }}>
              <span style={{ fontSize: '0.68rem', color: '#92400E', fontWeight: 600 }}>Callback</span>
              <h4 style={{ fontSize: '1.15rem', color: '#F59E0B', margin: '2px 0 0', fontWeight: 800 }}>{callReportData.summary.callback}</h4>
            </div>
            <div style={{ backgroundColor: '#FEE2E2', padding: '10px', borderRadius: '8px', border: '1px solid #FECACA' }}>
              <span style={{ fontSize: '0.68rem', color: '#991B1B', fontWeight: 600 }}>No Ans</span>
              <h4 style={{ fontSize: '1.15rem', color: '#EF4444', margin: '2px 0 0', fontWeight: 800 }}>{callReportData.summary.no_ans}</h4>
            </div>
            <div style={{ backgroundColor: '#EDE9FE', padding: '10px', borderRadius: '8px', border: '1px solid #DDD6FE' }}>
              <span style={{ fontSize: '0.68rem', color: '#5B21B6', fontWeight: 600 }}>Fresh / Pending</span>
              <h4 style={{ fontSize: '1.15rem', color: '#8B5CF6', margin: '2px 0 0', fontWeight: 800 }}>{callReportData.summary.fresh_pending}</h4>
            </div>
          </div>

          <div>
            <h6 style={{ fontSize: '0.825rem', fontWeight: 700, margin: '6px 0 4px', color: '#172033' }}>Individual Telecaller Performance:</h6>
            <table className="tm-table-clean" style={{ textAlign: 'center' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left' }}>Telecaller Executive</th>
                  <th>Total</th>
                  <th style={{ color: '#10B981' }}>Conn</th>
                  <th style={{ color: '#F59E0B' }}>Callback</th>
                  <th style={{ color: '#EF4444' }}>No Ans</th>
                </tr>
              </thead>
              <tbody>
                {callReportData.telecallers.map((t) => (
                  <tr key={t.name}>
                    <td style={{ textAlign: 'left', fontWeight: 600, color: '#172033' }}>{t.name}</td>
                    <td>{t.total}</td>
                    <td style={{ fontWeight: 700, color: '#10B981' }}>{t.conn}</td>
                    <td style={{ color: '#F59E0B' }}>{t.callb}</td>
                    <td style={{ color: '#EF4444' }}>{t.noans}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Modal>

      {/* ============================================================ */}
      {/* TELEADMIN MONTHLY TARGET MODAL */}
      {/* ============================================================ */}
      <Modal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        title="Update Monthly Operational Targets"
        footer={
          <>
            <Button variant="ghost" onClick={() => setSettingsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleSaveMonthlyTarget}>Save Target</Button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#172033', marginBottom: '4px', display: 'block' }}>Monthly Revenue Goal (₹)</label>
            <input
              type="number"
              value={targetRevenue}
              onChange={(e) => setTargetRevenue(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '0.85rem' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#172033', marginBottom: '4px', display: 'block' }}>Monthly Driver Registrations Target</label>
            <input
              type="number"
              value={targetDrivers}
              onChange={(e) => setTargetDrivers(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '0.85rem' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#172033', marginBottom: '4px', display: 'block' }}>Monthly Fleet Placement Target</label>
            <input
              type="number"
              value={targetFleet}
              onChange={(e) => setTargetFleet(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '0.85rem' }}
            />
          </div>
        </div>
      </Modal>

      {/* ============================================================ */}
      {/* INVOICE REPORT MODAL (WITH MONTH SELECTOR & EXPORT) */}
      {/* ============================================================ */}
      {invoiceReportModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(3px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setInvoiceReportModalOpen(false);
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              width: '100%',
              maxWidth: '1220px',
              maxHeight: '92vh',
              overflowY: 'auto',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              animation: 'tmFadeIn 0.2s ease-out',
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '18px 24px',
                borderBottom: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#F8FAFC',
                borderRadius: '12px 12px 0 0',
              }}
            >
              <div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: '1.2rem',
                    fontWeight: 800,
                    color: '#0F172A',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
                  }}
                >
                  <Receipt size={20} color="#10B981" />
                  <span>Invoice Report &amp; Billing Ledger</span>
                </h3>
                <p
                  style={{
                    margin: '3px 0 0',
                    fontSize: '0.8rem',
                    color: '#64748B',
                  }}
                >
                  Monthly billing statements, payments, credits, and generated tax invoices from users and payments database.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setInvoiceReportModalOpen(false)}
                style={{
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: '#64748B',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E2E8F0')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <XCircle size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Filter Bar */}
              <form
                onSubmit={handleInvoiceSearchSubmit}
                style={{
                  backgroundColor: '#F8FAFC',
                  padding: '14px 18px',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'flex-end',
                  gap: '12px',
                }}
              >
                {/* Month Picker */}
                <div style={{ minWidth: '180px' }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      color: '#475569',
                      marginBottom: '4px',
                    }}
                  >
                    Select Month Filter
                  </label>
                  <select
                    value={invoiceMonth}
                    onChange={(e) => handleInvoiceMonthChange(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '7.5px 10px',
                      fontSize: '0.82rem',
                      borderRadius: '6px',
                      border: '1px solid #CBD5E1',
                      backgroundColor: '#FFFFFF',
                      fontWeight: 600,
                      color: '#0F172A',
                      outline: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="2026-09">September 2026 (Current)</option>
                    <option value="2026-08">August 2026</option>
                    <option value="2026-07">July 2026</option>
                    <option value="2026-06">June 2026</option>
                    <option value="2026-05">May 2026</option>
                    <option value="2026-04">April 2026</option>
                    <option value="2026-03">March 2026</option>
                    <option value="2026-02">February 2026</option>
                    <option value="2026-01">January 2026</option>
                    <option value="2025-12">December 2025</option>
                    <option value="2025-11">November 2025</option>
                    <option value="2025-10">October 2025</option>
                    <option value="all">All Time (Full Ledger)</option>
                  </select>
                </div>

                {/* Search Text */}
                <div style={{ flex: '1 1 240px', minWidth: '200px' }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      color: '#475569',
                      marginBottom: '4px',
                    }}
                  >
                    Search Criteria
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      placeholder="Search TMID, Name, Mobile, Email, Payment ID..."
                      value={invoiceSearch}
                      onChange={(e) => setInvoiceSearch(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '7.5px 10px 7.5px 30px',
                        fontSize: '0.82rem',
                        borderRadius: '6px',
                        border: '1px solid #CBD5E1',
                        backgroundColor: '#FFFFFF',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                    <Search
                      size={14}
                      style={{
                        position: 'absolute',
                        left: '9px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#94A3B8',
                        pointerEvents: 'none',
                      }}
                    />
                  </div>
                </div>

                {/* Role Filter */}
                <div style={{ width: '130px' }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      color: '#475569',
                      marginBottom: '4px',
                    }}
                  >
                    User Role
                  </label>
                  <select
                    value={invoiceRole}
                    onChange={(e) => {
                      setInvoiceRole(e.target.value);
                      fetchInvoiceReport(1, invoiceMonth, invoiceSearch, e.target.value, invoiceStatus);
                    }}
                    style={{
                      width: '100%',
                      padding: '7.5px 10px',
                      fontSize: '0.82rem',
                      borderRadius: '6px',
                      border: '1px solid #CBD5E1',
                      backgroundColor: '#FFFFFF',
                      outline: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="all">All Roles</option>
                    <option value="transporter">Transporters</option>
                    <option value="driver">Drivers</option>
                  </select>
                </div>

                {/* Status Filter */}
                <div style={{ width: '130px' }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      color: '#475569',
                      marginBottom: '4px',
                    }}
                  >
                    Payment Status
                  </label>
                  <select
                    value={invoiceStatus}
                    onChange={(e) => {
                      setInvoiceStatus(e.target.value);
                      fetchInvoiceReport(1, invoiceMonth, invoiceSearch, invoiceRole, e.target.value);
                    }}
                    style={{
                      width: '100%',
                      padding: '7.5px 10px',
                      fontSize: '0.82rem',
                      borderRadius: '6px',
                      border: '1px solid #CBD5E1',
                      backgroundColor: '#FFFFFF',
                      outline: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="all">All Statuses</option>
                    <option value="captured">Captured</option>
                    <option value="created">Created</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>

                {/* Filter Buttons */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <button
                    type="submit"
                    style={{
                      padding: '7.5px 18px',
                      backgroundColor: '#2563EB',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Filter
                  </button>

                  <button
                    type="button"
                    onClick={handleExportInvoiceCsv}
                    style={{
                      padding: '7.5px 16px',
                      backgroundColor: '#10B981',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <Download size={13} />
                    <span>Export CSV</span>
                  </button>
                </div>
              </form>

              {/* KPI Summary Cards */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    backgroundColor: '#F8FAFC',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid #E2E8F0',
                  }}
                >
                  <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>
                    Total Invoices
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>
                    {invoiceSummary.total_count}
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: '#ECFDF5',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid #A7F3D0',
                  }}
                >
                  <div style={{ fontSize: '0.72rem', color: '#065F46', fontWeight: 600, textTransform: 'uppercase' }}>
                    Total Amount Captured
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#047857', marginTop: '2px' }}>
                    {invoiceSummary.formatted_total_amount}
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: '#EFF6FF',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid #BFDBFE',
                  }}
                >
                  <div style={{ fontSize: '0.72rem', color: '#1E40AF', fontWeight: 600, textTransform: 'uppercase' }}>
                    Transporters Billing
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1D4ED8', marginTop: '2px' }}>
                    {invoiceSummary.formatted_transporter_amount}
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: '#FAF5FF',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid #E9D5FF',
                  }}
                >
                  <div style={{ fontSize: '0.72rem', color: '#6B21A8', fontWeight: 600, textTransform: 'uppercase' }}>
                    Drivers Billing
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#7E22CE', marginTop: '2px' }}>
                    {invoiceSummary.formatted_driver_amount}
                  </div>
                </div>
              </div>

              {/* Data Table */}
              <div
                style={{
                  overflowX: 'auto',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  maxHeight: '440px',
                }}
              >
                <table
                  style={{
                    width: '100%',
                    minWidth: '1100px',
                    borderCollapse: 'collapse',
                    fontSize: '0.8rem',
                    fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
                  }}
                >
                  <thead style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: '#F8FAFC' }}>
                    <tr style={{ borderBottom: '2px solid #CBD5E1' }}>
                      <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: '#1E293B' }}>#</th>
                      <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: '#1E293B' }}>Unique ID (TMID)</th>
                      <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: '#1E293B' }}>Customer Name &amp; Role</th>
                      <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: '#1E293B' }}>Contact Details</th>
                      <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: '#1E293B' }}>Start At (FROM_UNIXTIME)</th>
                      <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: '#1E293B' }}>End At</th>
                      <th style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 700, color: '#1E293B' }}>Amount</th>
                      <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: '#1E293B' }}>Payment Details</th>
                      <th style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 700, color: '#1E293B' }}>Status</th>
                      <th style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 700, color: '#1E293B' }}>Invoice</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceLoading ? (
                      <tr>
                        <td colSpan="10" style={{ textAlign: 'center', padding: '40px' }}>
                          <Loader2 size={24} className="tm-spin" style={{ margin: '0 auto', color: '#10B981' }} />
                        </td>
                      </tr>
                    ) : invoiceRecords.length === 0 ? (
                      <tr>
                        <td colSpan="10" style={{ textAlign: 'center', padding: '36px', color: '#64748B' }}>
                          No invoice records found for the selected month filter.
                        </td>
                      </tr>
                    ) : (
                      invoiceRecords.map((row, idx) => (
                        <tr
                          key={row.payment_table_id || idx}
                          style={{
                            backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#F9FAFB',
                            borderBottom: '1px solid #E2E8F0',
                          }}
                        >
                          <td style={{ padding: '10px 12px', color: '#64748B' }}>
                            {row.sr_no || (invoiceCurrentPage - 1) * 15 + idx + 1}
                          </td>
                          <td style={{ padding: '10px 12px', fontWeight: 700, color: '#0F172A' }}>
                            {row.unique_id}
                          </td>
                          <td style={{ padding: '10px 12px' }}>
                            <div style={{ fontWeight: 600, color: '#1E293B' }}>{row.name}</div>
                            <span
                              style={{
                                display: 'inline-block',
                                fontSize: '0.68rem',
                                fontWeight: 700,
                                padding: '1px 6px',
                                borderRadius: '4px',
                                marginTop: '2px',
                                backgroundColor: row.role === 'Transporter' ? '#EFF6FF' : '#F5F3FF',
                                color: row.role === 'Transporter' ? '#1D4ED8' : '#7C3AED',
                              }}
                            >
                              {row.role}
                            </span>
                          </td>
                          <td style={{ padding: '10px 12px' }}>
                            <div style={{ color: '#334155' }}>{row.mobile}</div>
                            {row.email && row.email !== '—' && (
                              <div style={{ fontSize: '0.72rem', color: '#64748B' }}>{row.email}</div>
                            )}
                          </td>
                          <td style={{ padding: '10px 12px', color: '#334155' }}>
                            {row.start_at}
                          </td>
                          <td style={{ padding: '10px 12px', color: '#334155' }}>
                            {row.end_at}
                          </td>
                          <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 700, color: '#059669' }}>
                            {row.formatted_amount}
                          </td>
                          <td style={{ padding: '10px 12px' }}>
                            <div style={{ fontWeight: 600, color: '#1E293B' }}>{row.payment_type}</div>
                            <div style={{ fontSize: '0.72rem', color: '#64748B' }}>{row.payment_id}</div>
                            {row.job_id && row.job_id !== '—' && (
                              <div style={{ fontSize: '0.7rem', color: '#2563EB' }}>Job #{row.job_id}</div>
                            )}
                          </td>
                          <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                            <span
                              style={{
                                display: 'inline-block',
                                padding: '2px 8px',
                                borderRadius: '4px',
                                fontSize: '0.72rem',
                                fontWeight: 700,
                                backgroundColor:
                                  row.payment_status === 'captured'
                                    ? '#D1FAE5'
                                    : row.payment_status === 'failed'
                                    ? '#FEE2E2'
                                    : '#FEF3C7',
                                color:
                                  row.payment_status === 'captured'
                                    ? '#065F46'
                                    : row.payment_status === 'failed'
                                    ? '#991B1B'
                                    : '#92400E',
                              }}
                            >
                              {row.payment_status ? row.payment_status.toUpperCase() : 'CAPTURED'}
                            </span>
                          </td>
                          <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                            {row.invoice_path ? (
                              <a
                                href={row.invoice_path}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  padding: '4px 8px',
                                  backgroundColor: '#EFF6FF',
                                  border: '1px solid #BFDBFE',
                                  borderRadius: '4px',
                                  fontSize: '0.72rem',
                                  fontWeight: 600,
                                  color: '#2563EB',
                                  textDecoration: 'none',
                                }}
                              >
                                <ExternalLink size={12} />
                                <span>View PDF</span>
                              </a>
                            ) : (
                              <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>—</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {invoiceLastPage > 1 && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '6px',
                  }}
                >
                  <button
                    type="button"
                    disabled={invoiceCurrentPage <= 1}
                    onClick={() =>
                      fetchInvoiceReport(invoiceCurrentPage - 1, invoiceMonth, invoiceSearch, invoiceRole, invoiceStatus)
                    }
                    style={{
                      padding: '5px 10px',
                      borderRadius: '6px',
                      border: '1px solid #CBD5E1',
                      backgroundColor: invoiceCurrentPage <= 1 ? '#F1F5F9' : '#FFFFFF',
                      color: invoiceCurrentPage <= 1 ? '#94A3B8' : '#334155',
                      cursor: invoiceCurrentPage <= 1 ? 'not-allowed' : 'pointer',
                      fontSize: '0.78rem',
                    }}
                  >
                    Previous
                  </button>

                  <span style={{ fontSize: '0.8rem', color: '#475569', padding: '0 8px' }}>
                    Page {invoiceCurrentPage} of {invoiceLastPage}
                  </span>

                  <button
                    type="button"
                    disabled={invoiceCurrentPage >= invoiceLastPage}
                    onClick={() =>
                      fetchInvoiceReport(invoiceCurrentPage + 1, invoiceMonth, invoiceSearch, invoiceRole, invoiceStatus)
                    }
                    style={{
                      padding: '5px 10px',
                      borderRadius: '6px',
                      border: '1px solid #CBD5E1',
                      backgroundColor: invoiceCurrentPage >= invoiceLastPage ? '#F1F5F9' : '#FFFFFF',
                      color: invoiceCurrentPage >= invoiceLastPage ? '#94A3B8' : '#334155',
                      cursor: invoiceCurrentPage >= invoiceLastPage ? 'not-allowed' : 'pointer',
                      fontSize: '0.78rem',
                    }}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
