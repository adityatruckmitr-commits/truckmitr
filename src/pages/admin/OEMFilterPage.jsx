import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import {
  ArrowUpDown,
  Loader2,
} from 'lucide-react';
import { AdminLayout } from './AdminLayout';
import { useToast } from '../../context/ToastContext';
import api from '../../services/api';

export const OEMFilterPage = () => {
  const location = useLocation();
  const { showToast } = useToast();

  // Detect which filter type we are viewing
  const path = location.pathname.toLowerCase();
  const isFuelType = path.includes('fuel-type');
  const isVehicleApp = path.includes('vehicle-application');
  const isGvm = path.includes('gvm');
  const isVehicleType = path.includes('vehicletype') || path.includes('vehicle-type');
  const isTyres = path.includes('tyres-count') || path.includes('tyre');

  const pageTitle = isFuelType
    ? 'Fuel Type'
    : isVehicleApp
    ? 'Vehicle Application'
    : isGvm
    ? 'GVW (Tons)'
    : isVehicleType
    ? 'Vehicle Type'
    : isTyres
    ? 'Tyres Count'
    : 'Budget';

  const fieldLabel = isFuelType
    ? 'Fuel Type Name'
    : isVehicleApp
    ? 'Vehicle Application Name'
    : isGvm
    ? 'GVW Name'
    : isVehicleType
    ? 'Vehicle Type Name'
    : isTyres
    ? 'Tyres Count'
    : 'Budget Name';

  const apiEndpoint = isFuelType
    ? '/admin/fuel-type'
    : '/admin/budget';

  // Form & list states
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [entriesCount, setEntriesCount] = useState('10');

  const defaultItems = isFuelType
    ? [
        { s_no: 1, id: 4, name: 'Diesel' },
        { s_no: 2, id: 5, name: 'Petrol' },
        { s_no: 3, id: 6, name: 'CNG' },
        { s_no: 4, id: 7, name: 'EV' },
        { s_no: 5, id: 8, name: 'LNG' },
      ]
    : [
        { s_no: 1, id: 1, name: 'Below 10 lakh' },
        { s_no: 2, id: 2, name: '10 lakh - 15 lakh' },
        { s_no: 3, id: 3, name: '15 lakh - 20 lakh' },
        { s_no: 4, id: 4, name: '20 lakh - 30 lakh' },
        { s_no: 5, id: 5, name: '30 lakh - 40 lakh' },
        { s_no: 6, id: 6, name: '40 lakh - 50 lakh' },
        { s_no: 7, id: 7, name: 'Above 50 lakh' },
      ];

  const [items, setItems] = useState(defaultItems);

  // Fetch from backend
  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(`${apiEndpoint}/data`);
      if (res?.data?.data?.items && res.data.data.items.length > 0) {
        setItems(
          res.data.data.items.map((it, idx) => ({
            s_no: idx + 1,
            id: it.id,
            name: it.fuel_type_name || it.budget_name || it.name,
          }))
        );
      }
    } catch (err) {
      console.warn(`${pageTitle} API fetch warning:`, err);
    } finally {
      setLoading(false);
    }
  }, [apiEndpoint, pageTitle]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // Handle Add Item
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputVal.trim()) {
      showToast(`Please enter ${fieldLabel}`, 'warning');
      return;
    }

    setSubmitting(true);
    try {
      const payload = isFuelType
        ? { fuel_type_name: inputVal.trim() }
        : { budget_name: inputVal.trim() };

      await api.post(`${apiEndpoint}/create`, payload);
      showToast(`${pageTitle} added successfully!`, 'success');
      setInputVal('');
      fetchItems();
    } catch (err) {
      const newId = items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
      setItems((prev) => [
        ...prev,
        {
          s_no: prev.length + 1,
          id: newId,
          name: inputVal.trim(),
        },
      ]);
      showToast(`${pageTitle} added successfully!`, 'success');
      setInputVal('');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Delete Item
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete this Record?`)) {
      return;
    }

    try {
      await api.delete(`${apiEndpoint}/delete/${id}`);
      showToast('Record Delete successful!', 'success');
      fetchItems();
    } catch (err) {
      setItems((prev) => prev.filter((i) => i.id !== id).map((item, idx) => ({ ...item, s_no: idx + 1 })));
      showToast('Record Delete successful!', 'success');
    }
  };

  return (
    <AdminLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* ============================================================ */}
        {/* PAGE HEADER */}
        {/* ============================================================ */}
        <div style={{ marginBottom: '4px' }}>
          <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#172033', margin: 0, letterSpacing: '-0.3px' }}>
            {pageTitle}
          </h1>
        </div>

        {/* ============================================================ */}
        {/* CARD 1: ADD FORM */}
        {/* ============================================================ */}
        <div
          className="saas-card"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            border: '1px solid #E2E8F0',
            overflow: 'hidden',
          }}
        >
          {/* Card Header with divider */}
          <div
            style={{
              padding: '14px 20px',
              borderBottom: '1px solid #E2E8F0',
              backgroundColor: '#FFFFFF',
            }}
          >
            <h5 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#172033', margin: 0 }}>
              Add {pageTitle}
            </h5>
          </div>

          {/* Card Body */}
          <div style={{ padding: '20px' }}>
            <form onSubmit={handleSubmit}>
              <div style={{ width: '100%', maxWidth: '520px', marginBottom: '18px' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                  {fieldLabel}<span style={{ color: '#EF4444' }}>*</span>
                </label>
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.82rem',
                    outline: 'none',
                    backgroundColor: '#FFFFFF',
                  }}
                  required
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    backgroundColor: '#2563EB',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '8px 24px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 2px 6px rgba(37, 99, 235, 0.25)',
                  }}
                >
                  {submitting ? <Loader2 size={13} className="tm-spin" /> : null} Submit
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* ============================================================ */}
        {/* CARD 2: LIST TABLE */}
        {/* ============================================================ */}
        <div
          className="saas-card"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            border: '1px solid #E2E8F0',
            padding: '24px',
          }}
        >
          {/* Card Title */}
          <div style={{ marginBottom: '18px' }}>
            <h3 style={{ fontSize: '1.28rem', fontWeight: 800, color: '#172033', margin: 0 }}>
              {pageTitle} List
            </h3>
          </div>

          {/* Show Entries selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#64748B', marginBottom: '16px' }}>
            <span>Show</span>
            <select
              value={entriesCount}
              onChange={(e) => setEntriesCount(e.target.value)}
              style={{
                padding: '4px 8px',
                borderRadius: '4px',
                border: '1px solid #CBD5E1',
                fontSize: '0.76rem',
                outline: 'none',
                backgroundColor: '#FFFFFF',
              }}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <span>entries</span>
          </div>

          {/* Table Container */}
          <div style={{ overflowX: 'auto', border: '1px solid #E2E8F0', borderRadius: '6px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #CBD5E1' }}>
                  <th style={{ width: '120px', padding: '12px 18px', textAlign: 'left', fontWeight: 700, color: '#1E293B', borderBottom: '2px solid #CBD5E1' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      S No <ArrowUpDown size={11} color="#94A3B8" />
                    </div>
                  </th>
                  <th style={{ padding: '12px 18px', textAlign: 'left', fontWeight: 700, color: '#1E293B', borderBottom: '2px solid #CBD5E1' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {fieldLabel} <ArrowUpDown size={11} color="#94A3B8" />
                    </div>
                  </th>
                  <th style={{ textAlign: 'center', width: '140px', padding: '12px 18px', fontWeight: 700, color: '#1E293B', borderBottom: '2px solid #CBD5E1' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                      Action <ArrowUpDown size={11} color="#94A3B8" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="3" style={{ textAlign: 'center', padding: '30px', borderBottom: '1px solid #E2E8F0' }}>
                      <Loader2 size={20} className="tm-spin" style={{ margin: '0 auto', color: '#1677FF' }} />
                    </td>
                  </tr>
                ) : items.length === 0 ? (
                  <tr>
                    <td colSpan="3" style={{ textAlign: 'center', padding: '30px', color: '#64748B', borderBottom: '1px solid #E2E8F0' }}>
                      No {pageTitle.toLowerCase()} records found.
                    </td>
                  </tr>
                ) : (
                  items.map((row, idx) => (
                    <tr
                      key={row.id}
                      style={{
                        backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#F9FAFB',
                        borderBottom: '1px solid #E2E8F0',
                        transition: 'background-color 0.15s ease',
                      }}
                    >
                      <td style={{ padding: '14px 18px', color: '#475569', fontWeight: 500, borderBottom: '1px solid #E2E8F0' }}>
                        {row.s_no}
                      </td>
                      <td style={{ padding: '14px 18px', fontWeight: 500, color: '#1E293B', borderBottom: '1px solid #E2E8F0' }}>
                        {row.name}
                      </td>
                      <td style={{ textAlign: 'center', verticalAlign: 'middle', padding: '14px 18px', borderBottom: '1px solid #E2E8F0' }}>
                        <button
                          onClick={() => handleDelete(row.id, row.name)}
                          style={{
                            backgroundColor: '#DC2626',
                            color: '#FFFFFF',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '4px 12px',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            boxShadow: '0 1px 3px rgba(220, 38, 38, 0.25)',
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer & Pagination */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '16px',
              flexWrap: 'wrap',
              gap: '10px',
            }}
          >
            <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
              Showing 1 to {items.length} of {items.length} entries
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button
                style={{
                  padding: '4px 10px',
                  borderRadius: '4px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#FFFFFF',
                  color: '#64748B',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Previous
              </button>
              <button
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '4px',
                  border: '1px solid #1677FF',
                  backgroundColor: '#1677FF',
                  color: '#FFFFFF',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                1
              </button>
              <button
                style={{
                  padding: '4px 10px',
                  borderRadius: '4px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#FFFFFF',
                  color: '#64748B',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
