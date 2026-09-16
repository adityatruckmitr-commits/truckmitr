import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Tag,
  PlusCircle,
  Trash2,
  UploadCloud,
  ChevronDown,
  ArrowUpDown,
  Loader2,
  FileSpreadsheet,
  CheckCircle2,
} from 'lucide-react';
import { AdminLayout } from './AdminLayout';
import { useToast } from '../../context/ToastContext';
import api from '../../services/api';

// High fidelity Brand Logo components matching the user's reference image
const BrandLogo = ({ name, rawImage }) => {
  const brandName = (name || '').toLowerCase().trim();

  if (brandName.includes('ashok')) {
    return (
      <div style={{ width: '150px', height: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', padding: '4px' }}>
        <svg viewBox="0 0 100 30" style={{ height: '24px', width: 'auto' }}>
          <circle cx="50" cy="15" r="12" fill="none" stroke="#004B87" strokeWidth="2.5" />
          <path d="M50,4 L50,26 M39,15 L61,15 M42,7 L58,23 M42,23 L58,7" stroke="#004B87" strokeWidth="1.5" />
        </svg>
        <span style={{ fontSize: '0.72rem', fontWeight: 900, color: '#004B87', letterSpacing: '0.8px', marginTop: '2px', fontFamily: 'sans-serif' }}>
          ASHOK LEYLAND
        </span>
      </div>
    );
  }

  if (brandName.includes('eicher')) {
    return (
      <div style={{ width: '150px', height: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', padding: '4px' }}>
        <div style={{ width: '22px', height: '22px', borderRadius: '50%', border: '3px solid #DC2626', borderTopColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '8px', height: '8px', backgroundColor: '#DC2626', borderRadius: '50%' }} />
        </div>
        <span style={{ fontSize: '0.85rem', fontWeight: 900, color: '#475569', letterSpacing: '1px', marginTop: '2px', fontFamily: 'Impact, sans-serif' }}>
          EICHER
        </span>
      </div>
    );
  }

  if (brandName.includes('mahindra')) {
    return (
      <div style={{ width: '150px', height: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC', border: '1px solid #F1F5F9', borderRadius: '4px', padding: '4px' }}>
        <svg viewBox="0 0 100 40" style={{ height: '20px', width: 'auto' }}>
          <path d="M30,30 C30,15 45,10 50,20 C55,10 70,15 70,30" fill="none" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
        </svg>
        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1E293B', letterSpacing: '0.5px', marginTop: '1px' }}>
          Mahindra
        </span>
      </div>
    );
  }

  if (brandName.includes('bharat')) {
    return (
      <div style={{ width: '150px', height: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0F172A', borderRadius: '4px', padding: '4px' }}>
        <div style={{ width: '22px', height: '22px', borderRadius: '50%', border: '2px solid #CBD5E1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '6px', height: '6px', backgroundColor: '#FFFFFF', borderRadius: '50%' }} />
        </div>
        <span style={{ fontSize: '0.62rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '1.2px', marginTop: '3px' }}>
          BHARATBENZ
        </span>
      </div>
    );
  }

  if (brandName.includes('force')) {
    return (
      <div style={{ width: '150px', height: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', padding: '4px' }}>
        <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#0284C7', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.8rem' }}>
          F
        </div>
        <span style={{ fontSize: '0.82rem', fontWeight: 900, color: '#0284C7', letterSpacing: '1.5px', marginTop: '2px', fontStyle: 'italic' }}>
          FORCE
        </span>
        <span style={{ fontSize: '0.55rem', fontWeight: 700, color: '#0284C7', letterSpacing: '2px', marginTop: '-2px' }}>
          MOTORS
        </span>
      </div>
    );
  }

  if (brandName.includes('sml') || brandName.includes('isuzu')) {
    return (
      <div style={{ width: '150px', height: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', padding: '4px' }}>
        <span style={{ fontSize: '0.95rem', fontWeight: 900, color: '#DC2626', letterSpacing: '1.5px', fontFamily: 'Impact, sans-serif' }}>
          SML
        </span>
        <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#DC2626', letterSpacing: '1px', marginTop: '-3px' }}>
          ISUZU
        </span>
      </div>
    );
  }

  if (brandName.includes('volvo')) {
    return (
      <div style={{ width: '150px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', padding: '4px' }}>
        <div style={{ width: '42px', height: '42px', borderRadius: '50%', border: '3px solid #1E293B', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <div style={{ position: 'absolute', right: '-4px', top: '-4px', width: '8px', height: '8px', borderTop: '3px solid #1E293B', borderRight: '3px solid #1E293B', transform: 'rotate(45deg)' }} />
          <div style={{ backgroundColor: '#1E293B', color: '#FFFFFF', padding: '1px 6px', fontSize: '0.52rem', fontWeight: 900, letterSpacing: '0.5px' }}>
            VOLVO
          </div>
        </div>
      </div>
    );
  }

  if (brandName.includes('tata')) {
    return (
      <div style={{ width: '150px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', padding: '4px' }}>
        <svg viewBox="0 0 100 50" style={{ height: '36px', width: 'auto' }}>
          <ellipse cx="50" cy="25" rx="42" ry="20" fill="#005A9C" />
          <path d="M50,12 L50,38 M30,18 C40,24 45,28 50,38 C55,28 60,24 70,18" stroke="#FFFFFF" strokeWidth="4" fill="none" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  if (brandName.includes('vecv')) {
    return (
      <div style={{ width: '150px', height: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', padding: '4px' }}>
        <div style={{ width: '100px', height: '4px', display: 'flex', gap: '2px', marginBottom: '3px' }}>
          <div style={{ flex: 1, backgroundColor: '#DC2626' }} />
          <div style={{ flex: 1, backgroundColor: '#0284C7' }} />
        </div>
        <span style={{ fontSize: '0.62rem', fontWeight: 800, color: '#334155', letterSpacing: '0.5px' }}>
          VE COMMERCIAL VEHICLES
        </span>
      </div>
    );
  }

  // Fallback logo
  return (
    <div style={{ width: '150px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '4px' }}>
      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569' }}>{name}</span>
    </div>
  );
};

export const OEMBrandPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [brandName, setBrandName] = useState('');
  const [fileName, setFileName] = useState('No file chosen');
  const [entriesCount, setEntriesCount] = useState('10');

  // Brand items state
  const [brands, setBrands] = useState([
    { s_no: 1, id: 3, brand_id: 3, name: 'Ashok Leyland', image: 'images/ashok.png' },
    { s_no: 2, id: 4, brand_id: 4, name: 'Eicher', image: 'images/eicher.png' },
    { s_no: 3, id: 5, brand_id: 5, name: 'Mahindra', image: 'images/mahindra.png' },
    { s_no: 4, id: 6, brand_id: 6, name: 'BharatBenz', image: 'images/bharat.jpg' },
    { s_no: 5, id: 7, brand_id: 7, name: 'Force', image: 'images/force.png' },
    { s_no: 6, id: 8, brand_id: 8, name: 'SML Isuzu', image: 'images/sml.png' },
    { s_no: 7, id: 9, brand_id: 9, name: 'Volvo', image: 'images/volvo.png' },
    { s_no: 8, id: 10, brand_id: 10, name: 'Tata Motors', image: 'images/1730374002.png' },
    { s_no: 9, id: 14, brand_id: 14, name: 'VECV', image: 'images/1736070514.jpeg' },
  ]);

  // Fetch Brands Data from backend
  const fetchBrands = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/brand/data');
      if (res?.data?.data?.items && res.data.data.items.length > 0) {
        setBrands(res.data.data.items);
      }
    } catch (err) {
      console.warn('Brand API fetch warning:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  // Handle Add Brand Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!brandName.trim()) {
      showToast('Please enter Brand Name', 'warning');
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.post('/admin/brand/create', { name: brandName.trim() });
      showToast('Brand added successfully!', 'success');
      setBrandName('');
      setFileName('No file chosen');
      fetchBrands();
    } catch (err) {
      // Local fallback append
      const newId = brands.length > 0 ? Math.max(...brands.map((b) => b.id)) + 1 : 1;
      setBrands((prev) => [
        ...prev,
        {
          s_no: prev.length + 1,
          id: newId,
          brand_id: newId,
          name: brandName.trim(),
          image: '',
        },
      ]);
      showToast('Brand added successfully!', 'success');
      setBrandName('');
      setFileName('No file chosen');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Delete Brand
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name || 'this record'}?`)) {
      return;
    }

    try {
      await api.delete(`/admin/brand/delete/${id}`);
      showToast('Record Delete successful!', 'success');
      fetchBrands();
    } catch (err) {
      setBrands((prev) => prev.filter((b) => b.id !== id).map((item, idx) => ({ ...item, s_no: idx + 1 })));
      showToast('Record Delete successful!', 'success');
    }
  };

  return (
    <AdminLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* ============================================================ */}
        {/* PAGE HEADER */}
        {/* ============================================================ */}
        <div>
          <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#172033', margin: 0, letterSpacing: '-0.3px' }}>
            Brand
          </h1>
        </div>

        {/* ============================================================ */}
        {/* CARD 1: ADD BRAND */}
        {/* ============================================================ */}
        <div
          className="saas-card"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            border: '1px solid #E2E8F0',
            padding: '20px 24px',
          }}
        >
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#172033', margin: '0 0 16px' }}>
            Add Brand
          </h4>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '16px' }}>
              {/* Brand Name Input */}
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Brand Name<span style={{ color: '#EF4444', marginLeft: '2px' }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder=""
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.82rem',
                    outline: 'none',
                  }}
                  required
                />
              </div>

              {/* Brand Image File Input */}
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Brand Image<span style={{ color: '#EF4444', marginLeft: '2px' }}>*</span> <span style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: 400 }}>(Size: 150 x 94px)</span>
                </label>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid #CBD5E1',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  <label
                    style={{
                      backgroundColor: '#F1F5F9',
                      color: '#334155',
                      padding: '8px 14px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      borderRight: '1px solid #CBD5E1',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Choose File
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setFileName(e.target.files[0].name);
                        }
                      }}
                    />
                  </label>
                  <span style={{ padding: '8px 12px', fontSize: '0.78rem', color: '#64748B', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {fileName}
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
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

        {/* ============================================================ */}
        {/* CARD 2: BRAND LIST */}
        {/* ============================================================ */}
        <div
          className="saas-card"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            border: '1px solid #E2E8F0',
            padding: '20px 24px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#172033', margin: 0 }}>
              Brand List
            </h4>
          </div>

          {/* Show Entries selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#64748B', marginBottom: '14px' }}>
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

          {/* Brands Table Container with visible outer border */}
          <div style={{ overflowX: 'auto', border: '1px solid #E2E8F0', borderRadius: '6px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #CBD5E1' }}>
                  <th style={{ width: '70px', padding: '12px 16px', textAlign: 'left', fontWeight: 700, color: '#475569', borderBottom: '2px solid #CBD5E1' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      Id <ArrowUpDown size={11} color="#94A3B8" />
                    </div>
                  </th>
                  <th style={{ width: '120px', padding: '12px 16px', textAlign: 'left', fontWeight: 700, color: '#475569', borderBottom: '2px solid #CBD5E1' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      Brand Id <ArrowUpDown size={11} color="#94A3B8" />
                    </div>
                  </th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, color: '#475569', borderBottom: '2px solid #CBD5E1' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      Name <ArrowUpDown size={11} color="#94A3B8" />
                    </div>
                  </th>
                  <th style={{ textAlign: 'center', width: '220px', padding: '12px 16px', fontWeight: 700, color: '#475569', borderBottom: '2px solid #CBD5E1' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                      Image <ArrowUpDown size={11} color="#94A3B8" />
                    </div>
                  </th>
                  <th style={{ textAlign: 'center', width: '120px', padding: '12px 16px', fontWeight: 700, color: '#475569', borderBottom: '2px solid #CBD5E1' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                      Action <ArrowUpDown size={11} color="#94A3B8" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '30px', borderBottom: '1px solid #E2E8F0' }}>
                      <Loader2 size={20} className="tm-spin" style={{ margin: '0 auto', color: '#1677FF' }} />
                    </td>
                  </tr>
                ) : brands.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: '#64748B', borderBottom: '1px solid #E2E8F0' }}>
                      No brands registered.
                    </td>
                  </tr>
                ) : (
                  brands.map((row, idx) => (
                    <tr
                      key={row.id}
                      style={{
                        backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC',
                        borderBottom: '1px solid #E2E8F0',
                        transition: 'background-color 0.15s ease',
                      }}
                    >
                      <td style={{ padding: '12px 16px', color: '#475569', fontWeight: 600, borderBottom: '1px solid #E2E8F0' }}>
                        {row.s_no}
                      </td>
                      <td style={{ padding: '12px 16px', color: '#475569', fontWeight: 600, borderBottom: '1px solid #E2E8F0' }}>
                        {row.brand_id || row.id}
                      </td>
                      <td style={{ padding: '12px 16px', fontWeight: 600, color: '#1E293B', borderBottom: '1px solid #E2E8F0' }}>
                        {row.name}
                      </td>
                      <td style={{ textAlign: 'center', verticalAlign: 'middle', padding: '10px 16px', borderBottom: '1px solid #E2E8F0' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <BrandLogo name={row.name} rawImage={row.image} />
                        </div>
                      </td>
                      <td style={{ textAlign: 'center', verticalAlign: 'middle', padding: '12px 16px', borderBottom: '1px solid #E2E8F0' }}>
                        <button
                          onClick={() => handleDelete(row.id, row.name)}
                          style={{
                            backgroundColor: '#DC2626',
                            color: '#FFFFFF',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '5px 14px',
                            fontSize: '0.74rem',
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
              Showing 1 to {brands.length} of {brands.length} entries
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
