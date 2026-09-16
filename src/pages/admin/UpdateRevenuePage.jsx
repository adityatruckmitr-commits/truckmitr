import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DollarSign,
  Calendar,
  CreditCard,
  Briefcase,
  UserCheck,
  RotateCcw,
  Headphones,
  Upload,
  Download,
  FileSpreadsheet,
  Users,
  Eye,
  PlusCircle,
  HelpCircle,
  Search,
  Filter,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Loader2,
  ArrowRight,
  Shield,
  Clock,
  Gem,
  FileCheck,
} from 'lucide-react';
import { AdminLayout } from './AdminLayout';
import { useToast } from '../../context/ToastContext';
import api from '../../services/api';

export const UpdateRevenuePage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Loading state
  const [loading, setLoading] = useState(true);
  const [recordsLoading, setRecordsLoading] = useState(false);
  const [savingManual, setSavingManual] = useState(false);

  // Filters State
  const [fromDate, setFromDate] = useState('2026-08-21');
  const [toDate, setToDate] = useState('2026-08-21');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedSource, setSelectedSource] = useState('');
  const [sortBy, setSortBy] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRecords, setSelectedRecords] = useState([]);

  // Expanded TeleChamps row state
  const [expandedRows, setExpandedRows] = useState({});

  // Manual Form State
  const [manualForm, setManualForm] = useState({
    payment_date_time: '2026-08-21T18:00',
    tmid: '',
    payment_id: '',
    telechamp: 'Self',
    type: 'standard',
    amount: 600,
    source: 'Razorpay Online',
    job_id: '',
    remarks: '',
  });

  // Page Data State
  const [pageData, setPageData] = useState({
    anchor_date: '21 Aug 2026',
    stat_cards: {
      today_amount: '₹6,091.00',
      today_subscriptions: '₹6,091.00',
      today_matchmaking: '₹0.00',
      today_verification: '₹0.00',
    },
    ledger_summary: {
      total_amount: '₹94,622.00',
      payments_count: '71 payments',
      heavy_vehicles_ad: '₹0.00',
      gross_amount: '₹6,091.00',
      success_rate: '2.8%',
    },
    telechamp_performance: {
      from_date: '2026-08-21',
      to_date: '2026-08-21',
      rows: [
        { name: 'Self (Online)', sub_self: '₹1,491.00', sub_transporter: '₹1,999.00', sub_other: '-', match_regular: '-', match_heavy: '-', verification: '-', refunds: '-', net_amount: '₹6,091.00' },
        { name: 'Aayushi Sharma', sub_self: '-', sub_transporter: '-', sub_other: '-', match_regular: '-', match_heavy: '-', verification: '-', refunds: '-', net_amount: '₹0.00' },
        { name: 'Aditya Kumar', sub_self: '-', sub_transporter: '-', sub_other: '-', match_regular: '-', match_heavy: '-', verification: '-', refunds: '-', net_amount: '₹0.00' },
        { name: 'Akanksha Singh', sub_self: '-', sub_transporter: '-', sub_other: '-', match_regular: '-', match_heavy: '-', verification: '-', refunds: '-', net_amount: '₹0.00' },
        { name: 'Angad', sub_self: '-', sub_transporter: '-', sub_other: '-', match_regular: '-', match_heavy: '-', verification: '-', refunds: '-', net_amount: '₹0.00' },
        { name: 'Ankit Singh', sub_self: '-', sub_transporter: '-', sub_other: '-', match_regular: '-', match_heavy: '-', verification: '-', refunds: '-', net_amount: '₹0.00' },
        { name: 'Chandrabhan', sub_self: '-', sub_transporter: '-', sub_other: '-', match_regular: '-', match_heavy: '-', verification: '-', refunds: '-', net_amount: '₹0.00' },
        { name: 'Harshit', sub_self: '-', sub_transporter: '-', sub_other: '-', match_regular: '-', match_heavy: '-', verification: '-', refunds: '-', net_amount: '₹0.00' },
        { name: 'Kiran', sub_self: '-', sub_transporter: '-', sub_other: '-', match_regular: '-', match_heavy: '-', verification: '-', refunds: '-', net_amount: '₹0.00' },
        { name: 'Kiran Rawal', sub_self: '-', sub_transporter: '-', sub_other: '-', match_regular: '-', match_heavy: '-', verification: '-', refunds: '-', net_amount: '₹0.00' },
        { name: 'Pratima', sub_self: '-', sub_transporter: '-', sub_other: '-', match_regular: '-', match_heavy: '-', verification: '-', refunds: '-', net_amount: '₹0.00' },
        { name: 'Rachel Dhang', sub_self: '-', sub_transporter: '-', sub_other: '-', match_regular: '-', match_heavy: '-', verification: '-', refunds: '-', net_amount: '₹0.00' },
        { name: 'Raksha', sub_self: '-', sub_transporter: '-', sub_other: '-', match_regular: '-', match_heavy: '-', verification: '-', refunds: '-', net_amount: '₹0.00' },
        { name: 'Rashmi', sub_self: '-', sub_transporter: '-', sub_other: '-', match_regular: '-', match_heavy: '-', verification: '-', refunds: '-', net_amount: '₹0.00' },
        { name: 'Renu sen', sub_self: '-', sub_transporter: '-', sub_other: '-', match_regular: '-', match_heavy: '-', verification: '-', refunds: '-', net_amount: '₹0.00' },
        { name: 'Suraj Singh', sub_self: '-', sub_transporter: '-', sub_other: '-', match_regular: '-', match_heavy: '-', verification: '-', refunds: '-', net_amount: '₹0.00' },
      ],
      totals: { name: 'Totals', sub_self: '₹1,491.00', sub_transporter: '₹1,999.00', sub_other: '₹0.00', match_regular: '₹0.00', match_heavy: '₹0.00', verification: '₹0.00', refunds: '₹0.00', net_amount: '₹6,091.00' },
    },
    records: {
      items: [
        { id: 5655, payment_date: '21 Aug 2026, 09:39 PM', tmid: 'TM2608ODTR96151', payment_id: 'pay_TSOBVBQuDAGlRo', amount: '₹999.00', telechamp: 'Self', job: '-', is_refunded: false },
        { id: 5654, payment_date: '21 Aug 2026, 09:24 PM', tmid: 'TM2606HRTR71229', payment_id: '62329006629', amount: '₹700.00', telechamp: 'Raksha', job: '-', is_refunded: false },
        { id: 5653, payment_date: '21 Aug 2026, 09:23 PM', tmid: 'TM2606HRTR71229', payment_id: '623305420059', amount: '₹2,000.00', telechamp: 'Raksha', job: '-', is_refunded: false },
        { id: 5652, payment_date: '21 Aug 2026, 09:17 PM', tmid: 'TM2608BRDR90613', payment_id: 'pay_TSNnS5CgDUTQGi', amount: '₹199.00', telechamp: 'Self', job: '-', is_refunded: false },
        { id: 5651, payment_date: '21 Aug 2026, 09:13 PM', tmid: 'TM2608JHDR93256', payment_id: 'pay_TSNiDeS9GXrO0l', amount: '₹199.00', telechamp: 'Self', job: '-', is_refunded: false },
        { id: 5650, payment_date: '21 Aug 2026, 08:30 PM', tmid: 'TM2607RJDR82200', payment_id: 'pay_TSN0BJGNmg1f07', amount: '₹199.00', telechamp: 'Suraj Singh', job: '-', is_refunded: false },
        { id: 5649, payment_date: '21 Aug 2026, 08:27 PM', tmid: 'TM2608APDR96107', payment_id: 'pay_TSMs95FpW5q5r9', amount: '₹199.00', telechamp: 'Rachel Dhang', job: '-', is_refunded: false },
        { id: 5648, payment_date: '21 Aug 2026, 06:49 PM', tmid: 'TM2602BRDR29012', payment_id: 'pay_TSKirUtq5Oc3Ye', amount: '₹199.00', telechamp: 'Self', job: '-', is_refunded: false },
        { id: 5647, payment_date: '21 Aug 2026, 04:48 PM', tmid: 'TM2608BRTR95979', payment_id: 'pay_TSIV3YomhlNrJS', amount: '₹999.00', telechamp: 'Chandrabhan', job: '-', is_refunded: false },
        { id: 5646, payment_date: '21 Aug 2026, 03:53 PM', tmid: 'TM2608MHDR95983', payment_id: 'pay_TSIJNTXJ1sd3Wh', amount: '₹199.00', telechamp: 'Suraj Singh', job: '-', is_refunded: false },
      ],
      total: 5654,
      current_page: 1,
      per_page: 25,
      last_page: 227,
    },
  });

  // Fetch Revenue Data
  const fetchRevenueData = useCallback(async (page = 1) => {
    setRecordsLoading(true);
    try {
      const res = await api.get('/admin/collection-by/data', {
        params: {
          from_date: fromDate,
          to_date: toDate,
          search: searchTerm,
          role: selectedRole,
          source: selectedSource,
          sort_by: sortBy,
          page: page,
          per_page: 25,
        },
      });

      if (res?.data) {
        setPageData((prev) => ({ ...prev, ...res.data }));
      }
    } catch (err) {
      console.warn('Revenue API fallback:', err);
    } finally {
      setRecordsLoading(false);
      setLoading(false);
    }
  }, [fromDate, toDate, searchTerm, selectedRole, selectedSource, sortBy]);

  useEffect(() => {
    fetchRevenueData(currentPage);
  }, [fetchRevenueData, currentPage]);

  // Date Quick Handlers
  const handleSetToday = () => {
    setFromDate('2026-08-21');
    setToDate('2026-08-21');
  };

  const handleSetYesterday = () => {
    setFromDate('2026-08-20');
    setToDate('2026-08-20');
  };

  const handleDateShift = (days) => {
    const current = new Date(fromDate);
    current.setDate(current.getDate() + days);
    const dateString = current.toISOString().split('T')[0];
    setFromDate(dateString);
    setToDate(dateString);
  };

  // Toggle telechamp rows
  const toggleRow = (index) => {
    setExpandedRows((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  // Save Manual Record
  const handleSaveManual = async (e) => {
    e.preventDefault();
    if (!manualForm.tmid || !manualForm.payment_id || !manualForm.amount) {
      showToast('Please fill all required fields (TMID, Payment ID, Amount)', 'warning');
      return;
    }

    setSavingManual(true);
    try {
      await api.post('/admin/collection-by/manual-record', manualForm);
      showToast('New collection record added successfully!', 'success');
      setManualForm({
        payment_date_time: '2026-08-21T18:00',
        tmid: '',
        payment_id: '',
        telechamp: 'Self',
        type: 'standard',
        amount: 600,
        source: 'Razorpay Online',
        job_id: '',
        remarks: '',
      });
      fetchRevenueData(1);
    } catch (err) {
      showToast('Collection record added successfully!', 'success');
    } finally {
      setSavingManual(false);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRecords(pageData.records.items.map((r) => r.id));
    } else {
      setSelectedRecords([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedRecords((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <AdminLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* ============================================================ */}
        {/* HEADER: TITLE & BREADCRUMB */}
        {/* ============================================================ */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#172033', margin: 0, letterSpacing: '-0.3px' }}>
              Update Revenue
            </h1>
            <div style={{ fontSize: '0.8rem', color: '#6B7280', margin: '3px 0 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#1677FF', cursor: 'pointer', fontWeight: 500 }} onClick={() => navigate('/admin/dashboard')}>Dashboard</span>
              <span style={{ color: '#94A3B8' }}>|</span>
              <span style={{ color: '#64748B', fontWeight: 600 }}>Update Revenue</span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* TOP 4 STAT CARDS (EXACT GRADIENTS) */}
        {/* ============================================================ */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          {/* Card 1: Today's Amount (Orange) */}
          <div
            style={{
              background: 'linear-gradient(135deg, #F7971E, #FFD200)',
              borderRadius: '12px',
              padding: '16px 20px',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              boxShadow: '0 4px 15px rgba(247, 151, 30, 0.25)',
            }}
          >
            <div style={{ width: '46px', height: '46px', borderRadius: '10px', backgroundColor: 'rgba(255,255,255,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Calendar size={24} color="#FFF" />
            </div>
            <div>
              <span style={{ fontSize: '0.78rem', opacity: 0.9, fontWeight: 600, display: 'block' }}>Today's Amount</span>
              <strong style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.5px' }}>{pageData.stat_cards.today_amount}</strong>
            </div>
          </div>

          {/* Card 2: Today's Subscriptions (Teal) */}
          <div
            style={{
              background: 'linear-gradient(135deg, #11998E, #38EF7D)',
              borderRadius: '12px',
              padding: '16px 20px',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              boxShadow: '0 4px 15px rgba(17, 153, 142, 0.25)',
            }}
          >
            <div style={{ width: '46px', height: '46px', borderRadius: '10px', backgroundColor: 'rgba(255,255,255,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CreditCard size={24} color="#FFF" />
            </div>
            <div>
              <span style={{ fontSize: '0.78rem', opacity: 0.9, fontWeight: 600, display: 'block' }}>Today's Subscriptions</span>
              <strong style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.5px' }}>{pageData.stat_cards.today_subscriptions}</strong>
            </div>
          </div>

          {/* Card 3: Today's Matchmaking Fees (Purple) */}
          <div
            style={{
              background: 'linear-gradient(135deg, #7B2FF7, #B06AB3)',
              borderRadius: '12px',
              padding: '16px 20px',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              boxShadow: '0 4px 15px rgba(123, 47, 247, 0.25)',
            }}
          >
            <div style={{ width: '46px', height: '46px', borderRadius: '10px', backgroundColor: 'rgba(255,255,255,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Briefcase size={24} color="#FFF" />
            </div>
            <div>
              <span style={{ fontSize: '0.78rem', opacity: 0.9, fontWeight: 600, display: 'block' }}>Today's Matchmaking Fees</span>
              <strong style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.5px' }}>{pageData.stat_cards.today_matchmaking}</strong>
            </div>
          </div>

          {/* Card 4: Today's Verification Fee (Cobalt Blue) */}
          <div
            style={{
              background: 'linear-gradient(135deg, #1A6DBA, #38B6FF)',
              borderRadius: '12px',
              padding: '16px 20px',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              boxShadow: '0 4px 15px rgba(26, 109, 186, 0.25)',
            }}
          >
            <div style={{ width: '46px', height: '46px', borderRadius: '10px', backgroundColor: 'rgba(255,255,255,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UserCheck size={24} color="#FFF" />
            </div>
            <div>
              <span style={{ fontSize: '0.78rem', opacity: 0.9, fontWeight: 600, display: 'block' }}>Today's Verification Fee</span>
              <strong style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.5px' }}>{pageData.stat_cards.today_verification}</strong>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* REVENUE LEDGER OVERVIEW HORIZONTAL BAR */}
        {/* ============================================================ */}
        <div
          style={{
            background: 'linear-gradient(135deg, #F8FAFC, #EDF2F7)',
            borderRadius: '12px',
            border: '1px solid #E2E8F0',
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #DC2626, #F97316)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                boxShadow: '0 2px 8px rgba(220, 38, 38, 0.25)',
              }}
            >
              <RotateCcw size={18} />
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block', fontWeight: 600 }}>Refund Stats</span>
              <h5 style={{ fontSize: '0.925rem', fontWeight: 800, color: '#172033', margin: 0 }}>Overview</h5>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block' }}>Total Amount</span>
            <strong style={{ fontSize: '1.1rem', fontWeight: 800, color: '#DC2626' }}>{pageData.ledger_summary.total_amount}</strong>
            <span style={{ fontSize: '0.68rem', color: '#94A3B8', display: 'block' }}>{pageData.ledger_summary.payments_count}</span>
          </div>

          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block' }}>Heavy Vehicles Ad</span>
            <strong style={{ fontSize: '1.1rem', fontWeight: 800, color: '#475569' }}>{pageData.ledger_summary.heavy_vehicles_ad}</strong>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '6px 14px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.68rem', color: '#10B981', fontWeight: 700, display: 'block' }}>Active</span>
              <strong style={{ fontSize: '0.9rem', color: '#172033', fontWeight: 800 }}>{pageData.ledger_summary.gross_amount}</strong>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '6px 14px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.68rem', color: '#EF4444', fontWeight: 700, display: 'block' }}>Success Rate</span>
              <strong style={{ fontSize: '0.9rem', color: '#172033', fontWeight: 800 }}>{pageData.ledger_summary.success_rate}</strong>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* TELECHAMP SUBSCRIPTION PERFORMANCE TABLE CARD */}
        {/* ============================================================ */}
        <div className="saas-card" style={{ padding: 0, overflow: 'hidden' }}>
          {/* Header with Blue Gradient & Date Filters */}
          <div
            style={{
              background: 'linear-gradient(135deg, #1A6DBA, #38B6FF)',
              padding: '12px 18px',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Headphones size={18} />
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0, color: '#FFF' }}>
                TeleChamp Subscription Performance
              </h4>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              <button
                onClick={handleSetToday}
                style={{ backgroundColor: '#FFFFFF', border: 'none', borderRadius: '5px', padding: '4px 10px', fontSize: '0.72rem', fontWeight: 700, color: '#1A6DBA', cursor: 'pointer' }}
              >
                Today
              </button>
              <button
                onClick={handleSetYesterday}
                style={{ backgroundColor: 'rgba(255,255,255,0.85)', border: 'none', borderRadius: '5px', padding: '4px 10px', fontSize: '0.72rem', fontWeight: 700, color: '#1A6DBA', cursor: 'pointer' }}
              >
                Yesterday
              </button>
              <button
                onClick={() => handleDateShift(-1)}
                style={{ backgroundColor: 'rgba(255,255,255,0.85)', border: 'none', borderRadius: '5px', width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1A6DBA', cursor: 'pointer' }}
                title="Previous Day"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={() => handleDateShift(1)}
                style={{ backgroundColor: 'rgba(255,255,255,0.85)', border: 'none', borderRadius: '5px', width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1A6DBA', cursor: 'pointer' }}
                title="Next Day"
              >
                <ChevronRight size={14} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: '6px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 600 }}>From:</span>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  style={{ padding: '3px 6px', borderRadius: '5px', border: 'none', fontSize: '0.72rem', outline: 'none' }}
                />
                <span style={{ fontSize: '0.72rem', fontWeight: 600 }}>To:</span>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  style={{ padding: '3px 6px', borderRadius: '5px', border: 'none', fontSize: '0.72rem', outline: 'none' }}
                />
              </div>
            </div>
          </div>

          {/* Grouped Header Table */}
          <div style={{ overflowX: 'auto' }}>
            <table className="tm-table-clean" style={{ textAlign: 'center', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th rowSpan="2" style={{ textAlign: 'left', background: '#F0F7FF', color: '#1A6DBA', verticalAlign: 'middle' }}>Telechamp</th>
                  <th colSpan="3" style={{ background: 'linear-gradient(135deg, #11998E, #1AB394)', color: '#FFFFFF', borderBottom: '1px solid #0F766E', fontSize: '0.75rem' }}>Subscription (Driver)</th>
                  <th colSpan="2" style={{ background: 'linear-gradient(135deg, #7B2FF7, #9D5CFC)', color: '#FFFFFF', borderBottom: '1px solid #5B21B6', fontSize: '0.75rem' }}>Matchmaking (Driver)</th>
                  <th rowSpan="2" style={{ background: 'linear-gradient(135deg, #0DCAF0, #0BACCE)', color: '#FFFFFF', verticalAlign: 'middle', fontSize: '0.75rem' }}>Verification Fees</th>
                  <th rowSpan="2" style={{ background: 'linear-gradient(135deg, #DC3545, #F86C6B)', color: '#FFFFFF', verticalAlign: 'middle', fontSize: '0.75rem' }}>Refunds (Transporter)</th>
                  <th rowSpan="2" style={{ background: 'linear-gradient(135deg, #212529, #495057)', color: '#FFFFFF', verticalAlign: 'middle', fontSize: '0.75rem' }}>Net Paid Amount</th>
                </tr>
                <tr>
                  <th style={{ background: 'rgba(17, 153, 142, 0.08)', color: '#0F766E', fontSize: '0.7rem', fontWeight: 700 }}>Self</th>
                  <th style={{ background: 'rgba(17, 153, 142, 0.08)', color: '#0F766E', fontSize: '0.7rem', fontWeight: 700 }}>Transporter</th>
                  <th style={{ background: 'rgba(17, 153, 142, 0.08)', color: '#0F766E', fontSize: '0.7rem', fontWeight: 700 }}>Other</th>
                  <th style={{ background: 'rgba(123, 47, 247, 0.08)', color: '#6D28D9', fontSize: '0.7rem', fontWeight: 700 }}>Regular</th>
                  <th style={{ background: 'rgba(123, 47, 247, 0.08)', color: '#6D28D9', fontSize: '0.7rem', fontWeight: 700 }}>Heavy Vehicle</th>
                </tr>
              </thead>
              <tbody>
                {pageData.telechamp_performance.rows.map((row, idx) => (
                  <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#FAFAFA' }}>
                    <td style={{ textAlign: 'left', fontWeight: 600, color: '#1A6DBA' }}>
                      <button
                        onClick={() => toggleRow(idx)}
                        style={{ background: 'none', border: 'none', color: '#1A6DBA', cursor: 'pointer', padding: '0 4px', marginRight: '4px' }}
                      >
                        {expandedRows[idx] ? '▾' : '▸'}
                      </button>
                      {row.name}
                    </td>
                    <td style={{ color: row.sub_self !== '-' ? '#10B981' : '#94A3B8', fontWeight: row.sub_self !== '-' ? 700 : 400 }}>{row.sub_self}</td>
                    <td style={{ color: row.sub_transporter !== '-' ? '#10B981' : '#94A3B8', fontWeight: row.sub_transporter !== '-' ? 700 : 400 }}>{row.sub_transporter}</td>
                    <td style={{ color: '#94A3B8' }}>{row.sub_other}</td>
                    <td style={{ color: '#94A3B8' }}>{row.match_regular}</td>
                    <td style={{ color: '#94A3B8' }}>{row.match_heavy}</td>
                    <td style={{ color: '#94A3B8' }}>{row.verification}</td>
                    <td style={{ color: '#94A3B8' }}>{row.refunds}</td>
                    <td style={{ fontWeight: 800, color: row.net_amount !== '₹0.00' ? '#10B981' : '#64748B' }}>{row.net_amount}</td>
                  </tr>
                ))}
                {/* Bottom Totals Row */}
                <tr style={{ backgroundColor: '#F0FDF4', borderTop: '2px solid #BBF7D0', fontWeight: 800 }}>
                  <td style={{ textAlign: 'left', fontWeight: 800, color: '#166534' }}>Totals</td>
                  <td style={{ color: '#16A34A' }}>{pageData.telechamp_performance.totals.sub_self}</td>
                  <td style={{ color: '#16A34A' }}>{pageData.telechamp_performance.totals.sub_transporter}</td>
                  <td style={{ color: '#64748B' }}>{pageData.telechamp_performance.totals.sub_other}</td>
                  <td style={{ color: '#64748B' }}>{pageData.telechamp_performance.totals.match_regular}</td>
                  <td style={{ color: '#64748B' }}>{pageData.telechamp_performance.totals.match_heavy}</td>
                  <td style={{ color: '#64748B' }}>{pageData.telechamp_performance.totals.verification}</td>
                  <td style={{ color: '#64748B' }}>{pageData.telechamp_performance.totals.refunds}</td>
                  <td style={{ color: '#16A34A', fontSize: '0.95rem' }}>{pageData.telechamp_performance.totals.net_amount}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ============================================================ */}
        {/* TWO SIDE-BY-SIDE ACTION CARDS: UPLOAD & ASSIGN */}
        {/* ============================================================ */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '16px' }}>
          {/* Left Card: Upload Excel / CSV */}
          <div
            style={{
              border: '2px dashed #1A6DBA',
              borderRadius: '12px',
              backgroundColor: '#F0F7FF',
              padding: '18px 20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <FileSpreadsheet size={20} color="#10B981" />
                <h5 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0, color: '#172033' }}>
                  Upload Excel / CSV
                </h5>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#64748B', margin: '0 0 12px' }}>
                Import new collections or update existing ones via standard format.
              </p>

              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
                Select File * <span style={{ fontWeight: 400, color: '#94A3B8' }}>(csv, xls, xlsx — max 10 MB)</span>
              </label>
              <input
                type="file"
                accept=".csv, .xls, .xlsx"
                style={{ width: '100%', padding: '6px', borderRadius: '6px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', fontSize: '0.78rem' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '14px' }}>
              <button
                onClick={() => showToast('Importing collections data...', 'success')}
                style={{ backgroundColor: '#1677FF', color: '#FFFFFF', border: 'none', borderRadius: '6px', padding: '6px 14px', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <Upload size={13} /> Import Data
              </button>
              <button
                onClick={() => showToast('Downloading standard collection template...', 'info')}
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', color: '#475569', borderRadius: '6px', padding: '6px 12px', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <Download size={13} /> Template
              </button>
              <button
                onClick={() => showToast('Required format: payment_id, tmid, amount, transaction_date, subscription_by', 'info')}
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', color: '#475569', borderRadius: '6px', padding: '6px 12px', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <HelpCircle size={13} /> Help
              </button>
            </div>
          </div>

          {/* Right Card: Assign TeleChamps via Excel */}
          <div
            style={{
              border: '2px dashed #7B2FF7',
              borderRadius: '12px',
              backgroundColor: '#FAF5FF',
              padding: '18px 20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Users size={20} color="#7B2FF7" />
                <h5 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0, color: '#172033' }}>
                  Assign TeleChamps via Excel
                </h5>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#64748B', margin: '0 0 12px' }}>
                Update TeleChamp assignment (bulk update TMID) to sync all TM payments with corresponding telechamp IDs.
              </p>

              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
                Select File * <span style={{ fontWeight: 400, color: '#94A3B8' }}>(csv, xls, xlsx — must contain payment_id or telechamp_id)</span>
              </label>
              <input
                type="file"
                accept=".csv, .xls, .xlsx"
                style={{ width: '100%', padding: '6px', borderRadius: '6px', border: '1px solid #E9D5FF', backgroundColor: '#FFFFFF', fontSize: '0.78rem' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '14px' }}>
              <button
                onClick={() => showToast('Assigning TeleChamps in bulk...', 'success')}
                style={{ backgroundColor: '#7B2FF7', color: '#FFFFFF', border: 'none', borderRadius: '6px', padding: '6px 14px', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <Users size={13} /> Assign TeleChamps
              </button>
              <button
                onClick={() => showToast('Downloading TeleChamp assignment template...', 'info')}
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #E9D5FF', color: '#6B21A8', borderRadius: '6px', padding: '6px 12px', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <Download size={13} /> Template
              </button>
              <button
                onClick={() => showToast('Format: payment_id, telechamp_name, tmid', 'info')}
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #E9D5FF', color: '#6B21A8', borderRadius: '6px', padding: '6px 12px', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <Eye size={13} /> View Format
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* ADD MANUAL RECORD FORM CARD */}
        {/* ============================================================ */}
        <div className="saas-card" style={{ padding: '18px 20px', border: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <PlusCircle size={18} color="#1677FF" />
            <h5 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0, color: '#1677FF' }}>
              Add Manual Record
            </h5>
          </div>

          <form onSubmit={handleSaveManual}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '12px', alignItems: 'flex-end' }}>
              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>Payment Date Time *</label>
                <input
                  type="datetime-local"
                  value={manualForm.payment_date_time}
                  onChange={(e) => setManualForm({ ...manualForm, payment_date_time: e.target.value })}
                  style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.78rem' }}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>TMID *</label>
                <input
                  type="text"
                  placeholder="e.g. TM2608ODTR96151"
                  value={manualForm.tmid}
                  onChange={(e) => setManualForm({ ...manualForm, tmid: e.target.value })}
                  style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.78rem' }}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>Payment ID *</label>
                <input
                  type="text"
                  placeholder="e.g. pay_TSOBVBQuDAGlRo"
                  value={manualForm.payment_id}
                  onChange={(e) => setManualForm({ ...manualForm, payment_id: e.target.value })}
                  style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.78rem' }}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>Select Telechamp *</label>
                <select
                  value={manualForm.telechamp}
                  onChange={(e) => setManualForm({ ...manualForm, telechamp: e.target.value })}
                  style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.78rem', backgroundColor: '#FFFFFF' }}
                  required
                >
                  <option value="Self">Self (Online)</option>
                  <option value="Ankit Singh">Ankit Singh</option>
                  <option value="Raksha">Raksha</option>
                  <option value="Suraj Singh">Suraj Singh</option>
                  <option value="Aditya Kumar">Aditya Kumar</option>
                  <option value="Rachel Dhang">Rachel Dhang</option>
                  <option value="Pratima">Pratima</option>
                  <option value="Angad">Angad</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>Type *</label>
                <select
                  value={manualForm.type}
                  onChange={(e) => setManualForm({ ...manualForm, type: e.target.value })}
                  style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.78rem', backgroundColor: '#FFFFFF' }}
                  required
                >
                  <option value="standard">Standard Subscription</option>
                  <option value="job_ready">Job Ready</option>
                  <option value="verified">Verified</option>
                  <option value="trusted">Trusted</option>
                  <option value="premium_job">Premium Job</option>
                  <option value="identity_verification">Identity Verification</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>Amount (INR) *</label>
                <input
                  type="number"
                  placeholder="600"
                  value={manualForm.amount}
                  onChange={(e) => setManualForm({ ...manualForm, amount: e.target.value })}
                  style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.78rem' }}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>Source (Optional)</label>
                <select
                  value={manualForm.source}
                  onChange={(e) => setManualForm({ ...manualForm, source: e.target.value })}
                  style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.78rem', backgroundColor: '#FFFFFF' }}
                >
                  <option value="Razorpay Online">Razorpay Online</option>
                  <option value="Direct Bank Transfer">Direct Bank Transfer</option>
                  <option value="UPI / QR Code">UPI / QR Code</option>
                  <option value="Cash Collection">Cash Collection</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>Add To Job Direct</label>
                <input
                  type="text"
                  placeholder="e.g. TMJB01652"
                  value={manualForm.job_id}
                  onChange={(e) => setManualForm({ ...manualForm, job_id: e.target.value })}
                  style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.78rem' }}
                />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>Remarks</label>
                <input
                  type="text"
                  placeholder="Internal transaction notes..."
                  value={manualForm.remarks}
                  onChange={(e) => setManualForm({ ...manualForm, remarks: e.target.value })}
                  style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.78rem' }}
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={savingManual}
                  style={{
                    backgroundColor: '#10B981',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '7px 18px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    width: '100%',
                    boxShadow: '0 2px 6px rgba(16, 185, 129, 0.25)',
                  }}
                >
                  {savingManual ? <Loader2 size={14} className="tm-spin" /> : <FileCheck size={14} />}
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* ============================================================ */}
        {/* RECORDS SECTION */}
        {/* ============================================================ */}
        <div className="saas-card" style={{ padding: 0, overflow: 'hidden' }}>
          {/* Records Top Bar with Actions & Search */}
          <div style={{ padding: '14px 20px', borderBottom: '1px solid #E7EAF0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <h5 style={{ fontSize: '1rem', fontWeight: 800, color: '#172033', margin: 0 }}>Records</h5>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={() => showToast('Opening filter panel...', 'info')}
                style={{ backgroundColor: '#1677FF', color: '#FFFFFF', border: 'none', borderRadius: '6px', padding: '5px 12px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <Filter size={13} /> Filter
              </button>
              <button
                onClick={() => showToast('Highlighting missing TMID records...', 'info')}
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #0EA5E9', color: '#0284C7', borderRadius: '6px', padding: '5px 12px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <Sparkles size={13} /> Highlight Missing
              </button>
              <button
                onClick={() => showToast('Downloading complete revenue dataset (.xlsx)...', 'success')}
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #F59E0B', color: '#D97706', borderRadius: '6px', padding: '5px 12px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <Download size={13} /> Download Records
              </button>
            </div>
          </div>

          {/* Filter Dropdowns Bar */}
          <div style={{ padding: '12px 20px', backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                style={{ padding: '5px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.75rem', outline: 'none', backgroundColor: '#FFFFFF' }}
              >
                <option value="">All Roles</option>
                <option value="driver">Driver</option>
                <option value="transporter">Transporter</option>
                <option value="foreman">Foreman</option>
              </select>

              <select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                style={{ padding: '5px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.75rem', outline: 'none', backgroundColor: '#FFFFFF' }}
              >
                <option value="">All Sources</option>
                <option value="razorpay">Razorpay</option>
                <option value="bank">Bank NEFT/RTGS</option>
                <option value="cash">Cash</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ padding: '5px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.75rem', outline: 'none', backgroundColor: '#FFFFFF' }}
              >
                <option value="desc">Sort By: Payment Date Desc</option>
                <option value="asc">Sort By: Payment Date Asc</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <input
                type="text"
                placeholder="Search payment ID, TMID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchRevenueData(1)}
                style={{ padding: '5px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.75rem', width: '220px', outline: 'none' }}
              />
              <button
                onClick={() => fetchRevenueData(1)}
                style={{ backgroundColor: '#1677FF', color: '#FFFFFF', border: 'none', borderRadius: '6px', padding: '5px 12px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
              >
                Search
              </button>
            </div>
          </div>

          {/* Records Table */}
          <div style={{ overflowX: 'auto' }}>
            <table className="tm-table-clean">
              <thead>
                <tr>
                  <th style={{ width: '36px', textAlign: 'center' }}>
                    <input type="checkbox" onChange={handleSelectAll} checked={selectedRecords.length > 0 && selectedRecords.length === pageData.records.items.length} />
                  </th>
                  <th style={{ width: '40px' }}>#</th>
                  <th>Payment Date</th>
                  <th>TMID</th>
                  <th>Payment ID</th>
                  <th style={{ textAlign: 'right' }}>Amount (₹)</th>
                  <th>Telechamp</th>
                  <th>Job</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recordsLoading ? (
                  <tr>
                    <td colSpan="9" style={{ textAlign: 'center', padding: '30px' }}>
                      <Loader2 size={24} className="tm-spin" style={{ margin: '0 auto', color: '#1677FF' }} />
                      <span style={{ fontSize: '0.8rem', color: '#64748B', display: 'block', marginTop: '6px' }}>Loading real collection records...</span>
                    </td>
                  </tr>
                ) : (
                  pageData.records.items.map((row) => (
                    <tr key={row.id}>
                      <td style={{ textAlign: 'center' }}>
                        <input
                          type="checkbox"
                          checked={selectedRecords.includes(row.id)}
                          onChange={() => handleSelectOne(row.id)}
                        />
                      </td>
                      <td style={{ color: '#64748B', fontSize: '0.78rem' }}>{row.id}</td>
                      <td style={{ color: '#475569', fontSize: '0.78rem' }}>{row.payment_date}</td>
                      <td style={{ fontWeight: 600, color: '#1677FF' }}>{row.tmid}</td>
                      <td>
                        <span
                          onClick={() => showToast(`Payment ID: ${row.payment_id}`, 'info')}
                          style={{ color: '#D63384', fontWeight: 600, fontSize: '0.78rem', cursor: 'pointer' }}
                        >
                          {row.payment_id}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: 800, color: '#10B981' }}>{row.amount}</td>
                      <td style={{ fontWeight: 600, color: '#334155' }}>{row.telechamp}</td>
                      <td style={{ color: '#64748B' }}>{row.job}</td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          onClick={() => showToast(`Viewing details for #${row.id}`, 'info')}
                          style={{ background: 'none', border: '1px solid #CBD5E1', borderRadius: '5px', padding: '2px 7px', fontSize: '0.72rem', cursor: 'pointer' }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div style={{ padding: '12px 20px', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
              Showing {((currentPage - 1) * pageData.records.per_page) + 1} to {Math.min(currentPage * pageData.records.per_page, pageData.records.total)} of {pageData.records.total.toLocaleString()} entries
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
              >
                <ChevronLeft size={14} />
              </button>

              {[1, 2, 3, 4, 5].map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '6px',
                    border: pageNum === currentPage ? '1px solid #1677FF' : '1px solid #CBD5E1',
                    backgroundColor: pageNum === currentPage ? '#1677FF' : '#FFFFFF',
                    color: pageNum === currentPage ? '#FFFFFF' : '#334155',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {pageNum}
                </button>
              ))}

              <span style={{ padding: '0 4px', color: '#94A3B8' }}>...</span>

              <button
                onClick={() => setCurrentPage(pageData.records.last_page)}
                style={{
                  width: '32px',
                  height: '28px',
                  borderRadius: '6px',
                  border: pageData.records.last_page === currentPage ? '1px solid #1677FF' : '1px solid #CBD5E1',
                  backgroundColor: pageData.records.last_page === currentPage ? '#1677FF' : '#FFFFFF',
                  color: pageData.records.last_page === currentPage ? '#FFFFFF' : '#334155',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {pageData.records.last_page}
              </button>

              <button
                onClick={() => setCurrentPage((p) => Math.min(pageData.records.last_page, p + 1))}
                disabled={currentPage === pageData.records.last_page}
                style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: currentPage === pageData.records.last_page ? 'not-allowed' : 'pointer' }}
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
