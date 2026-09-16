import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Building2,
  UtensilsCrossed,
  Wrench,
  Search,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Loader2,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';
import { AdminLayout } from './AdminLayout';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/common/Modal';
import api from '../../services/api';

export const PartnerDashboardPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Loading state
  const [loading, setLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(false);

  // Active tab state
  const [activeTab, setActiveTab] = useState('foreman');

  // Filters State
  const [search, setSearch] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);

  // Referred drivers modal state
  const [referralModalOpen, setReferralModalOpen] = useState(false);
  const [activePartner, setActivePartner] = useState(null);

  // Page Data State
  const [data, setData] = useState({
    counts: {
      foreman: { total: 1944, today: 4 },
      association: { total: 1028, today: 3 },
      dhaba: { total: 210, today: 2 },
      puncture: { total: 274, today: 0 },
    },
    states: [],
    partners: [
      { s_no: 1, id: 1, unique_id: 'TM2609DLFM396498', name: 'Kuldeep', mobile: '9457858782', email: 'kkulkuldeepasolya7@gmail.com', state: 'Delhi', referred_drivers: 0, subscription_status: 'Not Subscribed' },
      { s_no: 2, id: 2, unique_id: 'TM2609UPFM396481', name: 'Satyapal Rajput', mobile: '9720652064', email: 'satypalrajput12@gmail.com', state: 'Uttar Pradesh', referred_drivers: 0, subscription_status: 'Not Subscribed' },
      { s_no: 3, id: 3, unique_id: 'TM2609RJFM396468', name: 'Aasir', mobile: '7878371500', email: 'aasirbalot63@gmail.com', state: 'Rajasthan', referred_drivers: 0, subscription_status: 'Not Subscribed' },
      { s_no: 4, id: 4, unique_id: 'TM2609HPFM396401', name: 'Sachin', mobile: '7807770980', email: 'akshansuparstar@gmail.com', state: 'Himachal Pradesh', referred_drivers: 0, subscription_status: 'Not Subscribed' },
      { s_no: 5, id: 5, unique_id: 'TM2609DLFM396366', name: 'Harvesh', mobile: '8826844735', email: 'harveshrajput50@gmail.com', state: 'Delhi', referred_drivers: 0, subscription_status: 'Not Subscribed' },
      { s_no: 6, id: 6, unique_id: 'TM2609DLFM396350', name: 'Avadhvihari', mobile: '6352478190', email: 'mmnmnamanasa9026@gmail.com', state: 'Delhi', referred_drivers: 0, subscription_status: 'Not Subscribed' },
      { s_no: 7, id: 7, unique_id: 'TM2609ASFM396347', name: 'Raju Roy', mobile: '7002982875', email: 'rajuroyghy86@gmail.com', state: 'Assam', referred_drivers: 0, subscription_status: 'Not Subscribed' },
      { s_no: 8, id: 8, unique_id: 'TM2609ODFM396327', name: 'Satyananda tarai', mobile: '7854875488', email: 'babunat繽arai147@gmail.com', state: 'Odisha', referred_drivers: 0, subscription_status: 'Not Subscribed' },
      { s_no: 9, id: 9, unique_id: 'TM2609WBFM396273', name: 'Sekh kursed', mobile: '7362991020', email: 'skjdhdge@gmail.com', state: 'West Bengal', referred_drivers: 0, subscription_status: 'Not Subscribed' },
      { s_no: 10, id: 10, unique_id: 'TM2609MPFM396160', name: 'K', mobile: '9099967781', email: 'krutibasa.s@gmail.com', state: 'Madhya Pradesh', referred_drivers: 0, subscription_status: 'Not Subscribed' },
    ],
    total: 1944,
    current_page: 1,
    per_page: 10,
    last_page: 195,
  });

  // Fetch Partner Dashboard Data
  const fetchPartnerData = useCallback(
    async (page = 1, tab = activeTab) => {
      setTableLoading(true);
      try {
        const res = await api.get('/admin/partner-dashboard/data', {
          params: {
            tab: tab,
            search: search,
            state_id: selectedState,
            from_date: fromDate,
            to_date: toDate,
            sort_by: sortBy,
            page: page,
            per_page: 10,
          },
        });

        if (res?.data) {
          setData((prev) => ({
            ...prev,
            counts: res.data.counts || prev.counts,
            states: res.data.states || prev.states,
            partners: res.data.partners || [],
            total: res.data.total || 0,
            current_page: res.data.current_page || 1,
            last_page: res.data.last_page || 1,
          }));
        }
      } catch (err) {
        console.warn('Partner Dashboard API warning:', err);
      } finally {
        setTableLoading(false);
        setLoading(false);
      }
    },
    [activeTab, search, selectedState, fromDate, toDate, sortBy]
  );

  useEffect(() => {
    fetchPartnerData(currentPage, activeTab);
  }, [fetchPartnerData, currentPage, activeTab]);

  // Tab switch handler
  const handleTabSwitch = (newTab) => {
    setActiveTab(newTab);
    setCurrentPage(1);
    fetchPartnerData(1, newTab);
  };

  // Reset filter handler
  const handleReset = () => {
    setSearch('');
    setSelectedState('');
    setFromDate('');
    setToDate('');
    setSortBy('newest');
    setCurrentPage(1);
  };

  // View referred drivers modal
  const handleViewReferrals = (partner) => {
    setActivePartner(partner);
    setReferralModalOpen(true);
  };

  return (
    <AdminLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {/* ============================================================ */}
        {/* HEADER: TITLE & SUBTITLE */}
        {/* ============================================================ */}
        <div>
          <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#172033', margin: 0, letterSpacing: '-0.3px' }}>
            Partner Dashboard
          </h1>
          <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '4px 0 0' }}>
            Overview of Foremen, Associations, Dhabas, and Puncture partners details
          </p>
        </div>

        {/* ============================================================ */}
        {/* TOP 4 VIBRANT STAT CARDS (EXACT SCREENSHOT COLORS & ICONS) */}
        {/* ============================================================ */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          {/* Card 1: Driver Foremen (Blue) */}
          <div
            onClick={() => handleTabSwitch('foreman')}
            style={{
              background: 'linear-gradient(135deg, #0099FF, #0077EE)',
              borderRadius: '12px',
              padding: '18px 22px',
              color: '#FFFFFF',
              boxShadow: '0 4px 15px rgba(0, 153, 255, 0.25)',
              position: 'relative',
              cursor: 'pointer',
              transform: activeTab === 'foreman' ? 'scale(1.01)' : 'scale(1)',
              transition: 'all 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, opacity: 0.95, display: 'block' }}>Driver Foremen</span>
                <h2 style={{ fontSize: '2.1rem', fontWeight: 800, margin: '6px 0 4px', letterSpacing: '-0.5px' }}>
                  {data.counts.foreman?.total || 1944}
                </h2>
                <div style={{ fontSize: '0.74rem', opacity: 0.9, fontWeight: 500 }}>
                  Today's Registration - {data.counts.foreman?.today ?? 4}
                </div>
              </div>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={22} color="#FFFFFF" />
              </div>
            </div>
          </div>

          {/* Card 2: Driver Association (Green) */}
          <div
            onClick={() => handleTabSwitch('association')}
            style={{
              background: 'linear-gradient(135deg, #48BB78, #38A169)',
              borderRadius: '12px',
              padding: '18px 22px',
              color: '#FFFFFF',
              boxShadow: '0 4px 15px rgba(72, 187, 120, 0.25)',
              position: 'relative',
              cursor: 'pointer',
              transform: activeTab === 'association' ? 'scale(1.01)' : 'scale(1)',
              transition: 'all 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, opacity: 0.95, display: 'block' }}>Driver Association</span>
                <h2 style={{ fontSize: '2.1rem', fontWeight: 800, margin: '6px 0 4px', letterSpacing: '-0.5px' }}>
                  {data.counts.association?.total || 1028}
                </h2>
                <div style={{ fontSize: '0.74rem', opacity: 0.9, fontWeight: 500 }}>
                  Today's Registration - {data.counts.association?.today ?? 3}
                </div>
              </div>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Building2 size={22} color="#FFFFFF" />
              </div>
            </div>
          </div>

          {/* Card 3: Dhaba Sathi (Amber/Orange) */}
          <div
            onClick={() => handleTabSwitch('dhaba')}
            style={{
              background: 'linear-gradient(135deg, #F59E0B, #D97706)',
              borderRadius: '12px',
              padding: '18px 22px',
              color: '#FFFFFF',
              boxShadow: '0 4px 15px rgba(245, 158, 11, 0.25)',
              position: 'relative',
              cursor: 'pointer',
              transform: activeTab === 'dhaba' ? 'scale(1.01)' : 'scale(1)',
              transition: 'all 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, opacity: 0.95, display: 'block' }}>Dhaba Sathi</span>
                <h2 style={{ fontSize: '2.1rem', fontWeight: 800, margin: '6px 0 4px', letterSpacing: '-0.5px' }}>
                  {data.counts.dhaba?.total || 210}
                </h2>
                <div style={{ fontSize: '0.74rem', opacity: 0.9, fontWeight: 500 }}>
                  Today's Registration - {data.counts.dhaba?.today ?? 2}
                </div>
              </div>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <UtensilsCrossed size={22} color="#FFFFFF" />
              </div>
            </div>
          </div>

          {/* Card 4: Puncture Point (Red) */}
          <div
            onClick={() => handleTabSwitch('puncture')}
            style={{
              background: 'linear-gradient(135deg, #EF4444, #DC2626)',
              borderRadius: '12px',
              padding: '18px 22px',
              color: '#FFFFFF',
              boxShadow: '0 4px 15px rgba(239, 68, 68, 0.25)',
              position: 'relative',
              cursor: 'pointer',
              transform: activeTab === 'puncture' ? 'scale(1.01)' : 'scale(1)',
              transition: 'all 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, opacity: 0.95, display: 'block' }}>Puncture Point</span>
                <h2 style={{ fontSize: '2.1rem', fontWeight: 800, margin: '6px 0 4px', letterSpacing: '-0.5px' }}>
                  {data.counts.puncture?.total || 274}
                </h2>
                <div style={{ fontSize: '0.74rem', opacity: 0.9, fontWeight: 500 }}>
                  Today's Registration - {data.counts.puncture?.today ?? 0}
                </div>
              </div>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Wrench size={22} color="#FFFFFF" />
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 4 SEGMENTED TABS (DRIVER FOREMAN, ASSOCIATION, DHABA, PUNCTURE) */}
        {/* ============================================================ */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { key: 'foreman', label: 'Driver Foreman' },
            { key: 'association', label: 'Driver Association' },
            { key: 'dhaba', label: 'Dhaba Sathi' },
            { key: 'puncture', label: 'Puncture Point' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTabSwitch(tab.key)}
              style={{
                backgroundColor: activeTab === tab.key ? '#17A2B8' : '#FFFFFF',
                color: activeTab === tab.key ? '#FFFFFF' : '#475569',
                border: activeTab === tab.key ? '1px solid #17A2B8' : '1px solid #CBD5E1',
                borderRadius: '6px',
                padding: '7px 16px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ============================================================ */}
        {/* WHITE FILTER BAR CARD */}
        {/* ============================================================ */}
        <div className="saas-card" style={{ padding: '16px 20px', border: '1px solid #E2E8F0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '14px', alignItems: 'flex-end' }}>
            {/* Search */}
            <div>
              <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
                Search
              </label>
              <input
                type="text"
                placeholder="Name, Mobile, Unique ID (last 5 digits)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchPartnerData(1)}
                style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.78rem', outline: 'none' }}
              />
            </div>

            {/* State */}
            <div>
              <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
                State
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.78rem', backgroundColor: '#FFFFFF', outline: 'none' }}
              >
                <option value="">All States</option>
                {data.states.map((st) => (
                  <option key={st.id} value={st.id}>{st.name}</option>
                ))}
              </select>
            </div>

            {/* From Date */}
            <div>
              <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
                From Date
              </label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                style={{ width: '100%', padding: '5px 8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.78rem', outline: 'none' }}
              />
            </div>

            {/* To Date */}
            <div>
              <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
                To Date
              </label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                style={{ width: '100%', padding: '5px 8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.78rem', outline: 'none' }}
              />
            </div>

            {/* Sort By */}
            <div>
              <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.78rem', backgroundColor: '#FFFFFF', outline: 'none' }}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>

          {/* Action Buttons: Search & Reset */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '14px' }}>
            <button
              onClick={() => fetchPartnerData(1)}
              style={{
                backgroundColor: '#1677FF',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '6px',
                padding: '6px 16px',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              Search
            </button>
            <button
              onClick={handleReset}
              style={{
                backgroundColor: '#595959',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '6px',
                padding: '6px 16px',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              Reset
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* PARTNER DATA TABLE CARD */}
        {/* ============================================================ */}
        <div className="saas-card" style={{ padding: 0, overflow: 'hidden', border: '1px solid #E2E8F0' }}>
          <div style={{ overflowX: 'auto' }}>
            <table className="tm-table-clean">
              <thead>
                <tr>
                  <th style={{ width: '50px' }}>S.No.</th>
                  <th>Unique ID</th>
                  <th>Name</th>
                  <th>Mobile No.</th>
                  <th>Email</th>
                  <th>State</th>
                  <th style={{ textAlign: 'center' }}>Referred Drivers</th>
                  <th style={{ textAlign: 'center' }}>Subscription Status</th>
                </tr>
              </thead>
              <tbody>
                {tableLoading ? (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: '40px' }}>
                      <Loader2 size={24} className="tm-spin" style={{ margin: '0 auto', color: '#1677FF' }} />
                      <span style={{ fontSize: '0.8rem', color: '#64748B', display: 'block', marginTop: '6px' }}>Loading partner records...</span>
                    </td>
                  </tr>
                ) : data.partners.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: '#64748B' }}>
                      No partner records found matching criteria.
                    </td>
                  </tr>
                ) : (
                  data.partners.map((partner) => (
                    <tr key={partner.id}>
                      <td style={{ color: '#64748B', fontSize: '0.78rem' }}>{partner.s_no}</td>
                      <td style={{ fontWeight: 600, color: '#172033', fontSize: '0.78rem' }}>{partner.unique_id}</td>
                      <td style={{ fontWeight: 600, color: '#334155' }}>{partner.name}</td>
                      <td style={{ color: '#475569', fontSize: '0.78rem' }}>{partner.mobile}</td>
                      <td style={{ color: '#475569', fontSize: '0.78rem' }}>{partner.email}</td>
                      <td style={{ color: '#334155' }}>{partner.state}</td>
                      <td style={{ textAlign: 'center' }}>
                        <span style={{ fontWeight: 700, marginRight: '8px' }}>{partner.referred_drivers}</span>
                        <button
                          onClick={() => handleViewReferrals(partner)}
                          style={{
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #1677FF',
                            color: '#1677FF',
                            borderRadius: '4px',
                            padding: '2px 8px',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          View List
                        </button>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span
                          style={{
                            backgroundColor: partner.subscription_status === 'Subscribed' ? '#10B981' : '#4B5563',
                            color: '#FFFFFF',
                            padding: '3px 10px',
                            borderRadius: '12px',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            display: 'inline-block',
                          }}
                        >
                          {partner.subscription_status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div style={{ padding: '12px 20px', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
            >
              <ChevronLeft size={14} />
            </button>

            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((pageNum) => (
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
              onClick={() => setCurrentPage(194)}
              style={{
                width: '32px',
                height: '28px',
                borderRadius: '6px',
                border: currentPage === 194 ? '1px solid #1677FF' : '1px solid #CBD5E1',
                backgroundColor: currentPage === 194 ? '#1677FF' : '#FFFFFF',
                color: currentPage === 194 ? '#FFFFFF' : '#334155',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              194
            </button>

            <button
              onClick={() => setCurrentPage(data.last_page || 195)}
              style={{
                width: '32px',
                height: '28px',
                borderRadius: '6px',
                border: currentPage === data.last_page ? '1px solid #1677FF' : '1px solid #CBD5E1',
                backgroundColor: currentPage === data.last_page ? '#1677FF' : '#FFFFFF',
                color: currentPage === data.last_page ? '#FFFFFF' : '#334155',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {data.last_page || 195}
            </button>

            <button
              onClick={() => setCurrentPage((p) => Math.min(data.last_page, p + 1))}
              disabled={currentPage === data.last_page}
              style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: currentPage === data.last_page ? 'not-allowed' : 'pointer' }}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* REFERRED DRIVERS MODAL */}
      {/* ============================================================ */}
      <Modal
        isOpen={referralModalOpen}
        onClose={() => setReferralModalOpen(false)}
        title={`Referred Drivers — ${activePartner?.name || 'Partner'}`}
        subtitle={`Partner Unique ID: ${activePartner?.unique_id} • Phone: ${activePartner?.mobile}`}
        size="lg"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ backgroundColor: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '8px', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#0369A1', fontWeight: 600 }}>Total Referred Drivers</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0284C7', margin: 0 }}>
                {activePartner?.referred_drivers || 0} Drivers
              </h3>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.72rem', color: '#64748B' }}>State</span>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#172033' }}>{activePartner?.state}</div>
            </div>
          </div>

          <div style={{ padding: '20px', textAlign: 'center', color: '#64748B', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px dashed #CBD5E1' }}>
            <Users size={32} style={{ margin: '0 auto 8px', opacity: 0.5 }} />
            <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>No driver referral transactions recorded for this partner yet.</div>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '4px' }}>When drivers register using this partner's referral code, they will be listed here automatically.</div>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
};
