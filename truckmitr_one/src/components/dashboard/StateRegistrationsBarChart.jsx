import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  Layers, 
  TrendingUp,
  BarChart3,
  Sparkles,
  Info
} from 'lucide-react';
import { adminDashboardApi } from '../../services/adminDashboardApi';

export const StateRegistrationsBarChart = ({ stats }) => {
  const [sortBy, setSortBy] = useState('total');
  const [range, setRange] = useState('overall');
  const [liveStates, setLiveStates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const pageSize = 10;
  const [hoveredState, setHoveredState] = useState(null);

  useEffect(() => {
    const fetchStates = async () => {
      setLoading(true);
      try {
        const data = await adminDashboardApi.getStateRegistrations({ range, sort_by: sortBy });
        if (data && Array.isArray(data) && data.length > 0) {
          setLiveStates(data);
        }
      } catch (err) {
        console.warn('Failed to load state registrations:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStates();
  }, [range, sortBy]);

  const fallbackStates = [
    { state: 'Uttar Pradesh', code: 'UP', drivers: 17744, transporters: 3072, foremen: 488, associations: 200, dhabas: 42, punctures: 36, total: 21582 },
    { state: 'Rajasthan', code: 'RJ', drivers: 10899, transporters: 1861, foremen: 298, associations: 117, dhabas: 29, punctures: 42, total: 13246 },
    { state: 'Maharashtra', code: 'MH', drivers: 5299, transporters: 3383, foremen: 153, associations: 87, dhabas: 19, punctures: 14, total: 8955 },
    { state: 'Madhya Pradesh', code: 'MP', drivers: 6223, transporters: 1435, foremen: 198, associations: 79, dhabas: 18, punctures: 20, total: 7973 },
    { state: 'Bihar', code: 'BR', drivers: 5458, transporters: 1019, foremen: 161, associations: 121, dhabas: 18, punctures: 23, total: 6800 },
    { state: 'Haryana', code: 'HR', drivers: 4339, transporters: 1573, foremen: 145, associations: 36, dhabas: 6, punctures: 18, total: 6118 },
    { state: 'Gujarat', code: 'GJ', drivers: 3113, transporters: 2060, foremen: 82, associations: 52, dhabas: 17, punctures: 11, total: 5335 },
    { state: 'Delhi', code: 'DL', drivers: 2386, transporters: 1446, foremen: 55, associations: 51, dhabas: 4, punctures: 5, total: 3947 },
    { state: 'Punjab', code: 'PB', drivers: 2955, transporters: 626, foremen: 55, associations: 33, dhabas: 8, punctures: 12, total: 3689 },
    { state: 'West Bengal', code: 'WB', drivers: 2230, transporters: 789, foremen: 55, associations: 49, dhabas: 12, punctures: 11, total: 3146 },
  ];

  const statesData = liveStates.length > 0 ? liveStates : fallbackStates;

  // Sort logic
  const sortedStates = [...statesData].sort((a, b) => {
    if (sortBy === 'drivers') return b.drivers - a.drivers;
    if (sortBy === 'transporters') return b.transporters - a.transporters;
    if (sortBy === 'foremen') return b.foremen - a.foremen;
    if (sortBy === 'associations') return b.associations - a.associations;
    if (sortBy === 'dhabas') return b.dhabas - a.dhabas;
    if (sortBy === 'punctures') return b.punctures - a.punctures;
    return b.total - a.total;
  });

  const totalPages = Math.ceil(sortedStates.length / pageSize) || 1;
  const currentStates = sortedStates.slice(page * pageSize, (page + 1) * pageSize);

  // Determine top value for Y-axis scaling
  const currentMax = Math.max(...currentStates.map(s => s.total || 1), 100);
  const yMax = Math.ceil((currentMax * 1.15) / 1000) * 1000 || 25000;

  const yTicks = [
    yMax,
    Math.round(yMax * 0.75),
    Math.round(yMax * 0.5),
    Math.round(yMax * 0.25),
    0
  ];

  const legendItems = [
    { label: 'Drivers', color: '#E05A1B' },
    { label: 'Transporters', color: '#0D9488' },
    { label: 'Foremen', color: '#7C3AED' },
    { label: 'Associations', color: '#2563EB' },
    { label: 'Dhabas', color: '#D97706' },
    { label: 'Punctures', color: '#059669' },
  ];

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid #E2E8F0',
        padding: '20px 24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
        marginBottom: '20px',
      }}
    >
      {/* 1. Header & Controls */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '16px',
        }}
      >
        <div>
          <h4
            style={{
              margin: 0,
              fontSize: '16px',
              fontWeight: '800',
              color: '#0F172A',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <BarChart3 size={18} color="#2563EB" />
            Registrations by State (Pan-India Penetration)
          </h4>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748B' }}>
            Compact vertical distribution across Drivers, Transporters, Foremen & Logistics Nodes
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          
          {/* Sort By Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setPage(0);
              }}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '12px',
                fontWeight: '600',
                color: '#0F172A',
                backgroundColor: '#F8FAFC',
                cursor: 'pointer',
              }}
            >
              <option value="total">Total Ecosystem</option>
              <option value="drivers">Drivers</option>
              <option value="transporters">Transporters</option>
              <option value="foremen">Foremen</option>
              <option value="associations">Associations</option>
              <option value="dhabas">Dhabas</option>
              <option value="punctures">Punctures</option>
            </select>
          </div>

          {/* Range Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>Range:</span>
            <select
              value={range}
              onChange={(e) => {
                setRange(e.target.value);
                setPage(0);
              }}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '12px',
                fontWeight: '600',
                color: '#0F172A',
                backgroundColor: '#F8FAFC',
                cursor: 'pointer',
              }}
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="this_week">This Week</option>
              <option value="this_month">This Month (MTD)</option>
              <option value="last_month">Last Month</option>
              <option value="this_year">This Year</option>
              <option value="overall">Overall All-Time</option>
            </select>
          </div>

          {/* Pagination Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#F1F5F9', padding: '3px 6px', borderRadius: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#475569', padding: '0 4px' }}>
              {page * pageSize + 1}-{Math.min((page + 1) * pageSize, sortedStates.length)} of {sortedStates.length}
            </span>
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              style={{
                padding: '4px 6px',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                backgroundColor: page === 0 ? '#F8FAFC' : '#FFFFFF',
                color: page === 0 ? '#94A3B8' : '#0F172A',
                cursor: page === 0 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
              title="Previous 10 States"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              style={{
                padding: '4px 6px',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                backgroundColor: page >= totalPages - 1 ? '#F8FAFC' : '#FFFFFF',
                color: page >= totalPages - 1 ? '#94A3B8' : '#0F172A',
                cursor: page >= totalPages - 1 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
              title="Next 10 States"
            >
              <ChevronRight size={14} />
            </button>
          </div>

        </div>
      </div>

      {/* 2. Legend Row */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {legendItems.map((leg, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#475569', fontWeight: '700' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: leg.color }} />
            <span>{leg.label}</span>
          </div>
        ))}
      </div>

      {/* 3. VERTICAL STACKED COLUMN CANVAS */}
      <div style={{ position: 'relative', height: '260px', width: '100%', marginTop: '10px' }}>
        
        {/* Y-Axis Grid Lines & Tick Labels */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', pointerEvents: 'none' }}>
          {yTicks.map((val, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <span style={{ fontSize: '10px', color: '#94A3B8', fontWeight: '700', width: '42px', textAlign: 'right', paddingRight: '8px' }}>
                {val >= 1000 ? `${(val / 1000).toFixed(val % 1000 === 0 ? 0 : 1)}k` : val}
              </span>
              <div style={{ flex: 1, borderTop: '1px dashed #E2E8F0', height: '1px' }} />
            </div>
          ))}
        </div>

        {/* Vertical Columns Grid */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '46px',
            right: '12px',
            bottom: 0,
            display: 'grid',
            gridTemplateColumns: `repeat(${currentStates.length}, 1fr)`,
            gap: '8px',
            alignItems: 'flex-end',
          }}
        >
          {currentStates.map((st, idx) => {
            const barHeightPct = Math.min(100, Math.max(4, (st.total / yMax) * 100));
            const isHovered = hoveredState?.state === st.state;

            // Proportions of segments within the total bar height
            const dPct = (st.drivers / (st.total || 1)) * 100;
            const tPct = (st.transporters / (st.total || 1)) * 100;
            const fPct = (st.foremen / (st.total || 1)) * 100;
            const aPct = (st.associations / (st.total || 1)) * 100;
            const dhPct = (st.dhabas / (st.total || 1)) * 100;
            const pPct = (st.punctures / (st.total || 1)) * 100;

            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredState(st)}
                onMouseLeave={() => setHoveredState(null)}
                style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                }}
              >
                {/* Total Value on Top of Column */}
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: '800',
                    color: isHovered ? '#2563EB' : '#1E293B',
                    marginBottom: '4px',
                    letterSpacing: '-0.02em',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {st.total >= 1000 ? `${(st.total / 1000).toFixed(1)}k` : st.total}
                </span>

                {/* Vertical Stacked Bar Container */}
                <div
                  style={{
                    width: '100%',
                    maxWidth: '42px',
                    height: `${barHeightPct * 1.55}px`,
                    maxHeight: '160px',
                    backgroundColor: '#F1F5F9',
                    borderRadius: '6px 6px 2px 2px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    boxShadow: isHovered ? '0 0 0 2px #2563EB, 0 8px 16px rgba(37,99,235,0.15)' : 'none',
                    transform: isHovered ? 'scaleY(1.02)' : 'scaleY(1)',
                    transformOrigin: 'bottom',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {/* 1. Drivers (Bottom Segment) */}
                  <div
                    style={{
                      height: `${dPct}%`,
                      backgroundColor: '#E05A1B',
                      width: '100%',
                    }}
                  />
                  {/* 2. Transporters */}
                  <div
                    style={{
                      height: `${tPct}%`,
                      backgroundColor: '#0D9488',
                      width: '100%',
                    }}
                  />
                  {/* 3. Foremen */}
                  <div
                    style={{
                      height: `${fPct}%`,
                      backgroundColor: '#7C3AED',
                      width: '100%',
                    }}
                  />
                  {/* 4. Associations */}
                  <div
                    style={{
                      height: `${aPct}%`,
                      backgroundColor: '#2563EB',
                      width: '100%',
                    }}
                  />
                  {/* 5. Dhabas */}
                  <div
                    style={{
                      height: `${dhPct}%`,
                      backgroundColor: '#D97706',
                      width: '100%',
                    }}
                  />
                  {/* 6. Punctures (Top Segment) */}
                  <div
                    style={{
                      height: `${pPct}%`,
                      backgroundColor: '#059669',
                      width: '100%',
                    }}
                  />
                </div>

                {/* State Label & Code below X-Axis */}
                <div style={{ marginTop: '8px', textAlign: 'center', width: '100%' }}>
                  <div
                    style={{
                      display: 'inline-block',
                      padding: '1px 5px',
                      borderRadius: '4px',
                      backgroundColor: isHovered ? '#EFF6FF' : '#F1F5F9',
                      color: isHovered ? '#2563EB' : '#0F172A',
                      fontSize: '10px',
                      fontWeight: '800',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {st.code || st.state.slice(0, 2).toUpperCase()}
                  </div>
                  <div
                    title={st.state}
                    style={{
                      fontSize: '10px',
                      fontWeight: '600',
                      color: isHovered ? '#0F172A' : '#64748B',
                      marginTop: '2px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '65px',
                    }}
                  >
                    {st.state}
                  </div>
                </div>

                {/* Interactive Tooltip Popover on Hover */}
                {isHovered && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '100%',
                      marginBottom: '8px',
                      zIndex: 30,
                      backgroundColor: '#0F172A',
                      color: '#FFFFFF',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      fontSize: '11px',
                      boxShadow: '0 10px 25px -5px rgba(0,0,0,0.4)',
                      minWidth: '160px',
                      pointerEvents: 'none',
                    }}
                  >
                    <div style={{ fontWeight: '800', fontSize: '12px', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '4px', marginBottom: '6px' }}>
                      {st.state} ({st.code}) — {st.total.toLocaleString('en-IN')}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 8px', fontSize: '10px' }}>
                      <div><span style={{ color: '#FB923C' }}>● Drivers:</span> {st.drivers.toLocaleString('en-IN')}</div>
                      <div><span style={{ color: '#2DD4BF' }}>● Fleet:</span> {st.transporters.toLocaleString('en-IN')}</div>
                      <div><span style={{ color: '#A78BFA' }}>● Foremen:</span> {st.foremen.toLocaleString('en-IN')}</div>
                      <div><span style={{ color: '#60A5FA' }}>● Assoc:</span> {st.associations.toLocaleString('en-IN')}</div>
                      <div><span style={{ color: '#FBBF24' }}>● Dhabas:</span> {st.dhabas.toLocaleString('en-IN')}</div>
                      <div><span style={{ color: '#34D399' }}>● Punctures:</span> {st.punctures.toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* 4. Bottom Footer Strip */}
      <div
        style={{
          marginTop: '12px',
          paddingTop: '10px',
          borderTop: '1px solid #F1F5F9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px',
          fontSize: '11px',
          color: '#64748B',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={13} color="#E05A1B" />
          <span>Showing <strong>Page {page + 1} of {totalPages}</strong> ({currentStates.length} states in view)</span>
        </span>

        <span style={{ fontWeight: '600' }}>
          Top Penetration: <strong style={{ color: '#0F172A' }}>{sortedStates[0]?.state || 'Uttar Pradesh'}</strong> ({Number(sortedStates[0]?.total || 21582).toLocaleString('en-IN')} total registrations)
        </span>
      </div>

    </div>
  );
};
