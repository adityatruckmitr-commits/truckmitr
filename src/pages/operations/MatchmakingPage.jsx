import React, { useState } from 'react';
import { usePermissions } from '../../context/PermissionContext';
import { FunnelPipeline } from '../../components/charts/FunnelPipeline';
import { Drawer } from '../../components/common/Drawer';
import { Modal } from '../../components/common/Modal';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  GitFork,
  Kanban,
  BarChart2,
  Plus,
  Download,
  Search,
  Filter,
  ArrowRight,
  UserCheck,
  Phone,
  Truck,
  Briefcase,
  MapPin,
  Clock,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  ChevronRight,
  Trash2
} from 'lucide-react';
import {
  MATCHMAKING_STAGES,
  MATCHMAKING_FUNNEL_DATA,
  INITIAL_MATCHES_DATA,
  DRILLDOWN_JOBS
} from '../../services/mock/mockMatchmaking';

export const MatchmakingPage = () => {
  const { can } = usePermissions();

  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'funnel'
  const [matches, setMatches] = useState(INITIAL_MATCHES_DATA);
  const [drilldownJobs, setDrilldownJobs] = useState(DRILLDOWN_JOBS);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStageFilter, setSelectedStageFilter] = useState('ALL');
  const [selectedRouteFilter, setSelectedRouteFilter] = useState('ALL');

  const routesList = Array.from(new Set(matches.map((m) => m.route)));

  const filteredMatches = matches.filter((m) => {
    if (selectedStageFilter !== 'ALL' && m.stage !== selectedStageFilter) return false;
    if (selectedRouteFilter !== 'ALL' && m.route !== selectedRouteFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        m.driverName.toLowerCase().includes(q) ||
        m.driverTmid.toLowerCase().includes(q) ||
        m.transporterName.toLowerCase().includes(q) ||
        m.route.toLowerCase().includes(q) ||
        m.jobTitle.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleOpenDetail = (match) => {
    setSelectedMatch(match);
    setIsDrawerOpen(true);
  };

  const handleMoveStage = (targetStageId) => {
    if (!selectedMatch) return;
    const targetStageObj = MATCHMAKING_STAGES.find((s) => s.id === targetStageId);
    if (!targetStageObj) return;

    const newHistoryEntry = {
      stage: targetStageObj.label,
      timestamp: new Date().toLocaleString(),
      updatedBy: 'Current User',
      notes: `Stage manually updated to ${targetStageObj.label}`
    };

    const updatedMatch = {
      ...selectedMatch,
      stage: targetStageId,
      daysInStage: 0,
      stageHistory: [...selectedMatch.stageHistory, newHistoryEntry]
    };

    setSelectedMatch(updatedMatch);
    setMatches((prev) => prev.map((m) => (m.id === updatedMatch.id ? updatedMatch : m)));
  };

  const handleDeleteMatch = (matchId) => {
    if (window.confirm('Are you sure you want to drop this candidate from the matchmaking pipeline?')) {
      setMatches((prev) => prev.filter((m) => m.id !== matchId));
      if (selectedMatch?.id === matchId) {
        setIsDrawerOpen(false);
      }
    }
  };

  const handleExportCSV = () => {
    alert(`Exporting ${matches.length} active matchmaking pipeline records to CSV...`);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1440px', margin: '0 auto', fontFamily: "'Inter', sans-serif" }}>
      {/* 1. Header Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Operations</span>
            <span style={{ color: '#CBD5E1' }}>/</span>
            <span style={{ fontSize: '12px', color: '#1467FF', fontWeight: 600 }}>Matchmaking</span>
          </div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#0F172A' }}>
            Matchmaking Pipeline & Funnel
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748B' }}>
            Track driver-to-job matching lifecycle from initial candidate applications to physical joining.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* View Mode Toggle */}
          <div
            style={{
              display: 'flex',
              backgroundColor: '#F1F5F9',
              borderRadius: '10px',
              padding: '3px',
              border: '1px solid #E2E8F0'
            }}
          >
            <button
              onClick={() => setViewMode('kanban')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 14px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: viewMode === 'kanban' ? '#FFFFFF' : 'transparent',
                color: viewMode === 'kanban' ? '#1467FF' : '#64748B',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: viewMode === 'kanban' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'
              }}
            >
              <Kanban size={14} /> Pipeline Kanban
            </button>
            <button
              onClick={() => setViewMode('funnel')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 14px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: viewMode === 'funnel' ? '#FFFFFF' : 'transparent',
                color: viewMode === 'funnel' ? '#1467FF' : '#64748B',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: viewMode === 'funnel' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'
              }}
            >
              <BarChart2 size={14} /> Funnel Analytics
            </button>
          </div>

          {can('matchmaking', 'export') && (
            <button
              onClick={handleExportCSV}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #CBD5E1',
                color: '#334155',
                borderRadius: '10px',
                padding: '9px 14px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Download size={14} /> Export CSV
            </button>
          )}

          {can('matchmaking', 'create') && (
            <button
              onClick={() => setIsCreateModalOpen(true)}
              style={{
                backgroundColor: '#1467FF',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '10px',
                padding: '9px 16px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 14px rgba(20, 103, 255, 0.25)'
              }}
            >
              <Plus size={16} /> Create New Match
            </button>
          )}
        </div>
      </div>

      {/* 2. Top Funnel Summary Banner */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '16px',
          padding: '16px 20px',
          marginBottom: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
              Aggregate Candidate Conversion Pipeline
            </h3>
            <span style={{ fontSize: '12px', color: '#64748B' }}>
              Real-time progression across all active transporter job openings
            </span>
          </div>
          <span
            style={{
              fontSize: '12px',
              fontWeight: 700,
              backgroundColor: '#EFF6FF',
              color: '#1467FF',
              padding: '4px 10px',
              borderRadius: '8px'
            }}
          >
            {matches.length} Candidates In Pipeline
          </span>
        </div>
        <FunnelPipeline data={MATCHMAKING_FUNNEL_DATA} />
      </div>

      {/* 3. Search and Filters Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          marginBottom: '20px',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '280px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              border: '1px solid #CBD5E1',
              borderRadius: '10px',
              padding: '8px 12px',
              gap: '8px',
              width: '100%',
              maxWidth: '360px'
            }}
          >
            <Search size={16} color="#94A3B8" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search driver, TMID, job, route, transporter..."
              style={{ border: 'none', outline: 'none', fontSize: '13px', width: '100%', color: '#0F172A' }}
            />
          </div>

          <select
            value={selectedStageFilter}
            onChange={(e) => setSelectedStageFilter(e.target.value)}
            style={{
              padding: '9px 12px',
              borderRadius: '10px',
              border: '1px solid #CBD5E1',
              fontSize: '12px',
              fontWeight: 600,
              color: '#334155',
              backgroundColor: '#FFF'
            }}
          >
            <option value="ALL">All Pipeline Stages</option>
            {MATCHMAKING_STAGES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>

          <select
            value={selectedRouteFilter}
            onChange={(e) => setSelectedRouteFilter(e.target.value)}
            style={{
              padding: '9px 12px',
              borderRadius: '10px',
              border: '1px solid #CBD5E1',
              fontSize: '12px',
              fontWeight: 600,
              color: '#334155',
              backgroundColor: '#FFF'
            }}
          >
            <option value="ALL">All Routes</option>
            {routesList.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 4. Main Body: Kanban View vs Funnel Drilldown View */}
      {viewMode === 'kanban' ? (
        /* KANBAN BOARD */
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, minmax(240px, 1fr))',
            gap: '14px',
            overflowX: 'auto',
            paddingBottom: '16px'
          }}
        >
          {MATCHMAKING_STAGES.map((stage) => {
            const stageMatches = filteredMatches.filter((m) => m.stage === stage.id);

            return (
              <div
                key={stage.id}
                style={{
                  backgroundColor: '#F8FAFC',
                  borderRadius: '14px',
                  border: `1px solid ${stage.borderColor}`,
                  display: 'flex',
                  flexDirection: 'column',
                  maxHeight: '750px'
                }}
              >
                {/* Column Header */}
                <div
                  style={{
                    padding: '12px 14px',
                    borderBottom: '1px solid #E2E8F0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: stage.bgColor,
                    borderTopLeftRadius: '14px',
                    borderTopRightRadius: '14px'
                  }}
                >
                  <div style={{ fontSize: '13px', fontWeight: 800, color: stage.color }}>{stage.label}</div>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      backgroundColor: '#FFFFFF',
                      color: stage.color,
                      padding: '2px 8px',
                      borderRadius: '999px',
                      border: `1px solid ${stage.borderColor}`
                    }}
                  >
                    {stageMatches.length}
                  </span>
                </div>

                {/* Cards Container */}
                <div
                  style={{
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    overflowY: 'auto',
                    flex: 1
                  }}
                >
                  {stageMatches.length === 0 ? (
                    <div
                      style={{
                        padding: '24px 12px',
                        textAlign: 'center',
                        color: '#94A3B8',
                        fontSize: '12px',
                        border: '1px dashed #CBD5E1',
                        borderRadius: '10px'
                      }}
                    >
                      No candidates in this stage
                    </div>
                  ) : (
                    stageMatches.map((m) => (
                      <div
                        key={m.id}
                        onClick={() => handleOpenDetail(m)}
                        style={{
                          backgroundColor: '#FFFFFF',
                          borderRadius: '12px',
                          border: '1px solid #E2E8F0',
                          padding: '14px',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = '#93C5FD';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 6px 14px rgba(20,103,255,0.08)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#E2E8F0';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.03)';
                        }}
                      >
                        {/* Driver Info Header */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                          <img
                            src={m.driverAvatar}
                            alt={m.driverName}
                            style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover' }}
                          />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {m.driverName}
                            </div>
                            <div style={{ fontSize: '11px', color: '#64748B', fontFamily: 'monospace' }}>
                              {m.driverTmid}
                            </div>
                          </div>
                        </div>

                        {/* Match Job & Transporter */}
                        <div style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', marginBottom: '2px' }}>
                          {m.jobTitle}
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Truck size={11} color="#94A3B8" /> {m.transporterName}
                        </div>

                        {/* Route & Vehicle Tag */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px', flexWrap: 'wrap' }}>
                          <span
                            style={{
                              fontSize: '10px',
                              fontWeight: 700,
                              backgroundColor: '#EFF6FF',
                              color: '#1D4ED8',
                              padding: '2px 6px',
                              borderRadius: '4px'
                            }}
                          >
                            {m.route}
                          </span>
                          <span
                            style={{
                              fontSize: '10px',
                              fontWeight: 600,
                              backgroundColor: '#F1F5F9',
                              color: '#475569',
                              padding: '2px 6px',
                              borderRadius: '4px'
                            }}
                          >
                            {m.vehicleType}
                          </span>
                        </div>

                        {/* Footer: Salary & SLA Days In Stage */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F1F5F9', paddingTop: '8px', fontSize: '11px' }}>
                          <span style={{ fontWeight: 700, color: '#059669' }}>{m.salaryOffer}</span>
                          <span
                            style={{
                              fontWeight: 700,
                              color: m.daysInStage > 2 ? '#D97706' : '#64748B',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '3px'
                            }}
                          >
                            <Clock size={11} /> {m.daysInStage}d in stage
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* DRILLDOWN FUNNEL VIEW */
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
          }}
        >
          <div style={{ marginBottom: '14px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>
              Active Job Postings Breakdown
            </h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748B' }}>
              Candidate pipeline counts per active job requirement
            </p>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #E2E8F0', color: '#64748B' }}>
                  <th style={{ padding: '10px 12px', fontWeight: 700 }}>Job & Transporter</th>
                  <th style={{ padding: '10px 12px', fontWeight: 700 }}>Route</th>
                  <th style={{ padding: '10px 12px', fontWeight: 700 }}>Required / Placed</th>
                  <th style={{ padding: '10px 12px', fontWeight: 700, color: '#3B82F6' }}>Applications</th>
                  <th style={{ padding: '10px 12px', fontWeight: 700, color: '#8B5CF6' }}>Screened</th>
                  <th style={{ padding: '10px 12px', fontWeight: 700, color: '#F59E0B' }}>Interviews</th>
                  <th style={{ padding: '10px 12px', fontWeight: 700, color: '#EC4899' }}>Selected</th>
                  <th style={{ padding: '10px 12px', fontWeight: 700, color: '#10B981' }}>Joined</th>
                  <th style={{ padding: '10px 12px', fontWeight: 700 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {drilldownJobs.map((job) => (
                  <tr key={job.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '12px' }}>
                      <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '13px' }}>{job.title}</div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>{job.transporter} • {job.id}</div>
                    </td>
                    <td style={{ padding: '12px', color: '#334155', fontWeight: 600 }}>{job.route}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ fontWeight: 800, color: '#0F172A' }}>{job.driversPlaced}</span> / {job.driversNeeded}
                    </td>
                    <td style={{ padding: '12px', fontWeight: 700, color: '#3B82F6' }}>{job.stageCounts.APPLICATIONS}</td>
                    <td style={{ padding: '12px', fontWeight: 700, color: '#8B5CF6' }}>{job.stageCounts.SCREENED}</td>
                    <td style={{ padding: '12px', fontWeight: 700, color: '#F59E0B' }}>{job.stageCounts.INTERVIEWS}</td>
                    <td style={{ padding: '12px', fontWeight: 700, color: '#EC4899' }}>{job.stageCounts.SELECTED}</td>
                    <td style={{ padding: '12px', fontWeight: 700, color: '#10B981' }}>{job.stageCounts.JOINED}</td>
                    <td style={{ padding: '12px' }}>
                      <StatusBadge status={job.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. Detail Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={selectedMatch ? `${selectedMatch.driverName} ➔ ${selectedMatch.jobTitle}` : 'Match Details'}
        subtitle="Driver-to-Job Matching Console & Stage Progression"
        width="600px"
      >
        {selectedMatch && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Header Match Overview */}
            <div
              style={{
                backgroundColor: '#F8FAFC',
                borderRadius: '14px',
                border: '1px solid #E2E8F0',
                padding: '18px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}
            >
              <img
                src={selectedMatch.driverAvatar}
                alt={selectedMatch.driverName}
                style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #FFFFFF' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>
                    {selectedMatch.driverName}
                  </h4>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      backgroundColor: '#EFF6FF',
                      color: '#1467FF',
                      padding: '2px 8px',
                      borderRadius: '999px'
                    }}
                  >
                    {selectedMatch.matchCode}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                  TMID: <strong>{selectedMatch.driverTmid}</strong> • {selectedMatch.driverLicense} ({selectedMatch.driverExperience})
                </div>
                <div style={{ fontSize: '12px', color: '#1E40AF', marginTop: '4px', fontWeight: 600 }}>
                  Target Job: {selectedMatch.jobTitle} at {selectedMatch.transporterName}
                </div>
              </div>
            </div>

            {/* Stage Transition Control Gated by can('matchmaking', 'edit') */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h5 style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#334155' }}>
                  Current Stage Progression
                </h5>
                <span style={{ fontSize: '11px', color: '#64748B' }}>
                  {selectedMatch.daysInStage} days in current stage
                </span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gap: '6px',
                  backgroundColor: '#F8FAFC',
                  padding: '8px',
                  borderRadius: '10px',
                  border: '1px solid #E2E8F0'
                }}
              >
                {MATCHMAKING_STAGES.map((s, idx) => {
                  const isCurrent = selectedMatch.stage === s.id;
                  const isPast =
                    MATCHMAKING_STAGES.findIndex((st) => st.id === selectedMatch.stage) >= idx;

                  return (
                    <button
                      key={s.id}
                      disabled={!can('matchmaking', 'edit')}
                      onClick={() => handleMoveStage(s.id)}
                      title={`Move to ${s.label}`}
                      style={{
                        padding: '8px 4px',
                        borderRadius: '6px',
                        border: isCurrent ? `2px solid ${s.color}` : '1px solid #E2E8F0',
                        backgroundColor: isCurrent ? s.bgColor : isPast ? '#F1F5F9' : '#FFFFFF',
                        color: isCurrent ? s.color : isPast ? '#334155' : '#94A3B8',
                        fontSize: '11px',
                        fontWeight: isCurrent ? 800 : 600,
                        cursor: can('matchmaking', 'edit') ? 'pointer' : 'default',
                        textAlign: 'center'
                      }}
                    >
                      {s.label.split(' ')[0]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Match Specification Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #F1F5F9' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>TRANSPORTER / FLEET</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>{selectedMatch.transporterName}</div>
                <div style={{ fontSize: '12px', color: '#475569', marginTop: '2px' }}>{selectedMatch.transporterPhone}</div>
              </div>
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #F1F5F9' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>OFFERED COMPENSATION</div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#059669', marginTop: '2px' }}>
                  {selectedMatch.salaryOffer}
                </div>
                <div style={{ fontSize: '11px', color: '#64748B' }}>Route: {selectedMatch.route}</div>
              </div>
            </div>

            {/* Stage History Timeline */}
            <div>
              <h5 style={{ margin: '0 0 10px 0', fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>
                Match Stage Audit & Progression Trail
              </h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {selectedMatch.stageHistory.map((hist, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '8px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#1E293B' }}>{hist.stage}</span>
                      <span style={{ fontSize: '11px', color: '#94A3B8' }}>{hist.timestamp}</span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#475569' }}>{hist.notes}</div>
                    <div style={{ fontSize: '11px', color: '#1467FF', fontWeight: 600 }}>By: {hist.updatedBy}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Drawer Action Buttons */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px', borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
              <button
                onClick={() => alert(`Calling driver ${selectedMatch.driverName} at ${selectedMatch.driverPhone}...`)}
                style={{
                  flex: 1,
                  backgroundColor: '#10B981',
                  color: '#FFF',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <Phone size={14} /> Call Driver
              </button>

              <button
                onClick={() => alert(`Calling transporter ${selectedMatch.transporterName} at ${selectedMatch.transporterPhone}...`)}
                style={{
                  flex: 1,
                  backgroundColor: '#3B82F6',
                  color: '#FFF',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <Truck size={14} /> Call Transporter
              </button>

              {can('matchmaking', 'delete') && (
                <button
                  onClick={() => handleDeleteMatch(selectedMatch.id)}
                  style={{
                    backgroundColor: '#FEE2E2',
                    color: '#EF4444',
                    border: '1px solid #FECACA',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  title="Drop Candidate from Match"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          </div>
        )}
      </Drawer>

      {/* 6. Create New Match Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Match Assignment"
        subtitle="Pair a verified driver with an active transporter job opening."
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target;
            const newMatch = {
              id: `mm-${Date.now()}`,
              matchCode: `MM-9${Math.floor(10 + Math.random() * 90)}`,
              stage: 'APPLICATIONS',
              driverName: form.driverName.value,
              driverTmid: form.driverTmid.value,
              driverAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
              driverPhone: form.driverPhone.value,
              driverLicense: form.driverLicense.value,
              driverExperience: '5 Years',
              jobId: 'JB9823',
              jobTitle: form.jobTitle.value,
              transporterName: form.transporterName.value,
              transporterId: 'TR-1001',
              transporterPhone: '+91 98234 56789',
              route: form.route.value,
              vehicleType: form.vehicleType.value,
              salaryOffer: form.salary.value,
              daysInStage: 0,
              createdDate: new Date().toISOString().split('T')[0],
              stageHistory: [
                {
                  stage: 'Applications',
                  timestamp: new Date().toLocaleString(),
                  updatedBy: 'Current User',
                  notes: 'Direct match created manually'
                }
              ]
            };

            setMatches([newMatch, ...matches]);
            setIsCreateModalOpen(false);
          }}
          style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Driver Name *
              </label>
              <input
                name="driverName"
                required
                placeholder="e.g. Ramesh Yadav"
                style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Driver TMID *
              </label>
              <input
                name="driverTmid"
                required
                placeholder="e.g. TM2609245"
                style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Driver Phone *
              </label>
              <input
                name="driverPhone"
                required
                placeholder="+91 98765 43210"
                style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                License Classification
              </label>
              <input
                name="driverLicense"
                defaultValue="HMV Commercial"
                style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Job Title *
              </label>
              <input
                name="jobTitle"
                required
                placeholder="e.g. 18 Ton Container Driver"
                style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Transporter Name *
              </label>
              <input
                name="transporterName"
                required
                placeholder="e.g. Sharma Logistics"
                style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Operating Route *
              </label>
              <input
                name="route"
                required
                placeholder="e.g. Delhi → Jaipur"
                style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Offered Salary *
              </label>
              <input
                name="salary"
                required
                placeholder="e.g. ₹26,000 / month"
                style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
              Vehicle Type
            </label>
            <input
              name="vehicleType"
              defaultValue="24 Ton Trailer"
              style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              style={{ padding: '9px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', background: '#FFF', color: '#475569', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ padding: '9px 18px', borderRadius: '8px', border: 'none', background: '#1467FF', color: '#FFF', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
            >
              Create Match Entry
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
