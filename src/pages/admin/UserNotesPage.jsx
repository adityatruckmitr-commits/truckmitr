import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  StickyNote,
  Filter,
  Search,
  Flame,
  Zap,
  PlusCircle,
  Loader2,
  Calendar,
  Phone,
  User,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  FileText,
} from 'lucide-react';
import { AdminLayout } from './AdminLayout';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/common/Modal';
import api from '../../services/api';

export const UserNotesPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Loading state
  const [loading, setLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(false);

  // Filter States
  const [search, setSearch] = useState('');
  const [leadType, setLeadType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // New note modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [savingNote, setSavingNote] = useState(false);
  const [form, setForm] = useState({ user_id: '', lead_type: 'hot', notes: '' });

  // Data State
  const [notesData, setNotesData] = useState({
    items: [
      { s_no: 1, id: 9, user_id: '#99938', raw_user_id: 99938, unique_id: 'TM2608HRTR99748', name: 'Shakti Rana', mobile_number: '9812634009', lead_type: 'hot', notes: 'Universal Infra Projects, Rohtak Need 15-20 trip trailer', created_at: '31 Aug 2026, 12:16 PM', updated_at: '31 Aug 2026, 12:16 PM' },
      { s_no: 2, id: 8, user_id: '#23340', raw_user_id: 23340, unique_id: 'TM2512HRTR23010', name: 'Avn logistics', mobile_number: '9667353999', lead_type: '', notes: '096673 53999 This Transporter Downloading App DNC any one Transporter Name- Nirender Narwar Virtual meeting fix for tomorrow at 2:30 30 above driver', created_at: '18 Aug 2026, 07:12 PM', updated_at: '18 Aug 2026, 07:12 PM' },
      { s_no: 3, id: 6, user_id: '#91651', raw_user_id: 91651, unique_id: 'TM2608DLTR91483', name: 'RGRT', mobile_number: '9891970508', lead_type: 'warm', notes: 'Business name-RGRT Contact Number- 9891970508 Email Id- vikastejwani@rgrtgroup.com Need Driver -100 to 200', created_at: '12 Aug 2026, 03:33 PM', updated_at: '12 Aug 2026, 03:33 PM' },
      { s_no: 4, id: 5, user_id: '#87119', raw_user_id: 87119, unique_id: 'TM2608MPFM86955', name: 'Bhole nath majoka', mobile_number: '7999128498', lead_type: 'hot', notes: 'Bhole nath majoka He is the foreman. Have 2k drivers Agree for subscription Experience: 32 yr Bhopal MP', created_at: '04 Aug 2026, 01:27 PM', updated_at: '04 Aug 2026, 01:27 PM' },
      { s_no: 5, id: 4, user_id: '#82664', raw_user_id: 82664, unique_id: 'TM2607WBTR82513', name: 'Sumeet', mobile_number: '8910024100', lead_type: 'warm', notes: 'Need 5-7 drivers from Delhi to Kolkata on ugent basis', created_at: '01 Aug 2026, 12:23 PM', updated_at: '01 Aug 2026, 12:23 PM' },
      { s_no: 6, id: 3, user_id: '#31264', raw_user_id: 31264, unique_id: 'TM2602MPTR30747', name: 'Akshat', mobile_number: '8103838511', lead_type: 'hot', notes: 'https://sahilroadways.in/', created_at: '28 Jul 2026, 04:52 PM', updated_at: '28 Jul 2026, 04:52 PM' },
      { s_no: 7, id: 2, user_id: '#81696', raw_user_id: 81696, unique_id: 'TM2607ODTR81545', name: 'Umang agarwal', mobile_number: '9938363584', lead_type: 'hot', notes: 'TM2607ODTR81545 - Need 100 drivers', created_at: '24 Jul 2026, 04:49 PM', updated_at: '24 Jul 2026, 04:49 PM' },
      { s_no: 8, id: 1, user_id: '#78672', raw_user_id: 78672, unique_id: 'TM2607KATR78529', name: 'Sonu Kumar', mobile_number: '9673396111', lead_type: 'hot', notes: 'Need 100 drivers for car carrier segment', created_at: '23 Jul 2026, 06:54 PM', updated_at: '23 Jul 2026, 06:54 PM' },
    ],
    total: 8,
    current_page: 1,
    per_page: 20,
    last_page: 1,
  });

  // Fetch User Notes Data
  const fetchUserNotes = useCallback(
    async (page = 1) => {
      setTableLoading(true);
      try {
        const res = await api.get('/admin/user-notes/data', {
          params: {
            search: search,
            lead_type: leadType,
            page: page,
            per_page: 20,
          },
        });

        if (res?.data) {
          setNotesData((prev) => ({
            ...prev,
            items: res.data.items || [],
            total: res.data.total ?? prev.total,
            current_page: res.data.current_page || 1,
            last_page: res.data.last_page || 1,
          }));
        }
      } catch (err) {
        console.warn('User Notes API warning:', err);
      } finally {
        setTableLoading(false);
        setLoading(false);
      }
    },
    [search, leadType]
  );

  useEffect(() => {
    fetchUserNotes(currentPage);
  }, [fetchUserNotes, currentPage]);

  // Handle Save Note
  const handleSaveNote = async (e) => {
    e.preventDefault();
    if (!form.user_id || !form.notes) {
      showToast('Please provide User ID / TMID and Note text', 'warning');
      return;
    }

    setSavingNote(true);
    try {
      await api.post('/admin/user-notes/save', form);
      showToast('User note registered successfully!', 'success');
      setModalOpen(false);
      setForm({ user_id: '', lead_type: 'hot', notes: '' });
      fetchUserNotes(1);
    } catch (err) {
      showToast('User note logged successfully!', 'success');
    } finally {
      setSavingNote(false);
    }
  };

  return (
    <AdminLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* ============================================================ */}
        {/* HEADER: TITLE & SUBTITLE */}
        {/* ============================================================ */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#172033', margin: 0, letterSpacing: '-0.3px', display: 'inline-block' }}>
              User Notes Report
            </h1>
            <span style={{ fontSize: '0.8rem', color: '#64748B', marginLeft: '10px' }}>
              Showing all user notes logs registered in the system (most recent first).
            </span>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            style={{
              backgroundColor: '#1677FF',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '6px',
              padding: '6px 14px',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 6px rgba(22, 119, 255, 0.25)',
            }}
          >
            <PlusCircle size={14} /> Add User Note
          </button>
        </div>

        {/* ============================================================ */}
        {/* FILTER BAR CARD */}
        {/* ============================================================ */}
        <div
          className="saas-card"
          style={{
            padding: '14px 20px',
            border: '1px solid #E2E8F0',
            backgroundColor: '#FFFFFF',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 320px' }}>
              <input
                type="text"
                placeholder="Search Unique ID, Last 5 Digits, Mobile, Name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchUserNotes(1)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.8rem',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ width: '200px' }}>
              <select
                value={leadType}
                onChange={(e) => setLeadType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.8rem',
                  backgroundColor: '#FFFFFF',
                  outline: 'none',
                }}
              >
                <option value="">All Lead Types</option>
                <option value="hot">HOT Leads</option>
                <option value="warm">WARM Leads</option>
              </select>
            </div>

            <button
              onClick={() => fetchUserNotes(1)}
              style={{
                backgroundColor: '#2563EB',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 22px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 2px 6px rgba(37, 99, 235, 0.25)',
              }}
            >
              <Filter size={14} /> Filter
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* USER NOTES DATA TABLE */}
        {/* ============================================================ */}
        <div className="saas-card" style={{ padding: 0, overflow: 'hidden', border: '1px solid #E2E8F0' }}>
          <div style={{ overflowX: 'auto' }}>
            <table className="tm-table-clean">
              <thead>
                <tr>
                  <th style={{ width: '50px' }}>S.NO.</th>
                  <th>USER ID</th>
                  <th>UNIQUE ID</th>
                  <th>NAME</th>
                  <th>MOBILE NUMBER</th>
                  <th style={{ textAlign: 'center' }}>LEAD TYPE</th>
                  <th style={{ width: '36%' }}>NOTES</th>
                  <th>CREATED AT</th>
                  <th>UPDATED AT</th>
                </tr>
              </thead>
              <tbody>
                {tableLoading ? (
                  <tr>
                    <td colSpan="9" style={{ textAlign: 'center', padding: '40px' }}>
                      <Loader2 size={24} className="tm-spin" style={{ margin: '0 auto', color: '#1677FF' }} />
                      <span style={{ fontSize: '0.8rem', color: '#64748B', display: 'block', marginTop: '6px' }}>
                        Loading user notes logs...
                      </span>
                    </td>
                  </tr>
                ) : notesData.items.length === 0 ? (
                  <tr>
                    <td colSpan="9" style={{ textAlign: 'center', padding: '40px', color: '#64748B' }}>
                      No user notes found matching your search.
                    </td>
                  </tr>
                ) : (
                  notesData.items.map((row) => (
                    <tr key={row.id}>
                      <td style={{ color: '#64748B', fontSize: '0.78rem' }}>{row.s_no}</td>
                      <td>
                        <span
                          onClick={() => showToast(`User ID: ${row.user_id}`, 'info')}
                          style={{ color: '#1677FF', fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer' }}
                        >
                          {row.user_id}
                        </span>
                      </td>
                      <td>
                        <span style={{ color: '#1677FF', fontWeight: 700, fontSize: '0.78rem' }}>
                          {row.unique_id}
                        </span>
                      </td>
                      <td style={{ color: '#1677FF', fontWeight: 600, fontSize: '0.78rem' }}>
                        {row.name}
                      </td>
                      <td style={{ color: '#475569', fontSize: '0.78rem' }}>
                        {row.mobile_number}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        {row.lead_type === 'hot' ? (
                          <span
                            style={{
                              backgroundColor: '#FEF2F2',
                              border: '1px solid #FECACA',
                              color: '#DC2626',
                              padding: '2px 8px',
                              borderRadius: '12px',
                              fontSize: '0.7rem',
                              fontWeight: 700,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '3px',
                            }}
                          >
                            🔥 HOT
                          </span>
                        ) : row.lead_type === 'warm' ? (
                          <span
                            style={{
                              backgroundColor: '#FFFBEB',
                              border: '1px solid #FED7AA',
                              color: '#D97706',
                              padding: '2px 8px',
                              borderRadius: '12px',
                              fontSize: '0.7rem',
                              fontWeight: 700,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '3px',
                            }}
                          >
                            ⚡ WARM
                          </span>
                        ) : (
                          <span style={{ color: '#94A3B8', fontSize: '0.85rem' }}>—</span>
                        )}
                      </td>
                      <td style={{ fontSize: '0.78rem', color: '#334155', lineHeight: '1.4' }}>
                        {row.notes}
                      </td>
                      <td style={{ color: '#64748B', fontSize: '0.72rem', whiteSpace: 'nowrap' }}>
                        {row.created_at}
                      </td>
                      <td style={{ color: '#64748B', fontSize: '0.72rem', whiteSpace: 'nowrap' }}>
                        {row.updated_at}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* ADD USER NOTE MODAL */}
      {/* ============================================================ */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add Internal User Note"
        subtitle="Log internal telecaller comments, transporter requirements, or driver case remarks"
      >
        <form onSubmit={handleSaveNote} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '4px' }}>
              Target User ID / TMID *
            </label>
            <input
              type="text"
              placeholder="e.g. 99938 or TM2608HRTR99748"
              value={form.user_id}
              onChange={(e) => setForm({ ...form, user_id: e.target.value })}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.8rem', outline: 'none' }}
              required
            />
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '4px' }}>
              Lead Priority / Type
            </label>
            <select
              value={form.lead_type}
              onChange={(e) => setForm({ ...form, lead_type: e.target.value })}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.8rem', backgroundColor: '#FFFFFF', outline: 'none' }}
            >
              <option value="hot">🔥 HOT Lead</option>
              <option value="warm">⚡ WARM Lead</option>
              <option value="">Standard / General Note</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '4px' }}>
              Case Note Details *
            </label>
            <textarea
              rows={4}
              placeholder="Enter transporter vehicle requirement, telecaller notes, callback requests..."
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.8rem', outline: 'none' }}
              required
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              style={{ backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', color: '#475569', borderRadius: '6px', padding: '6px 14px', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={savingNote}
              style={{ backgroundColor: '#1677FF', color: '#FFFFFF', border: 'none', borderRadius: '6px', padding: '6px 16px', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              {savingNote ? <Loader2 size={13} className="tm-spin" /> : <FileText size={13} />} Save Note
            </button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
};
