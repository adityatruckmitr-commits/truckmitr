import React, { useState, useMemo } from 'react';
import { usePermissions } from '../../context/PermissionContext';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/common/StatCard';
import { Drawer } from '../../components/common/Drawer';
import { Modal } from '../../components/common/Modal';
import { DEPARTMENTS } from '../../utils/rbacConstants';
import {
  CalendarCheck,
  Building2,
  Users,
  Home,
  Clock,
  AlertTriangle,
  Download,
  Edit2,
  Search,
  CheckCircle2,
  XCircle,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';
import {
  ATTENDANCE_DATES,
  INITIAL_ATTENDANCE_DATA,
  STATUS_CODES
} from '../../services/mock/mockAttendance';

export const AttendancePage = () => {
  const { can, getScope } = usePermissions();
  const { currentUser } = useAuth();

  const [attendanceData, setAttendanceData] = useState(INITIAL_ATTENDANCE_DATA);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCorrectionModalOpen, setIsCorrectionModalOpen] = useState(false);
  const [correctionTarget, setCorrectionTarget] = useState(null);

  // Check department scope
  const attendanceScope = getScope('attendance');
  const userDeptId = currentUser?.departmentId || 'dept-ops';

  const [selectedDeptFilter, setSelectedDeptFilter] = useState(
    attendanceScope === 'DEPARTMENT' ? userDeptId : 'ALL'
  );
  const [searchQuery, setSearchQuery] = useState('');

  // Latest day in the tracking cycle
  const todayKey = ATTENDANCE_DATES[ATTENDANCE_DATES.length - 1]; // '14 Sep'

  // Dynamic Computation of Today's KPI Metrics (from grid data)
  const stats = useMemo(() => {
    const total = attendanceData.length;
    let present = 0;
    let wfh = 0;
    let leave = 0;
    let absent = 0;

    attendanceData.forEach((emp) => {
      const status = emp.dailyStatus[todayKey] || 'P';
      if (status === 'P') present++;
      else if (status === 'W') wfh++;
      else if (status === 'L') leave++;
      else if (status === 'A') absent++;
    });

    const activeWorking = present + wfh;
    const attendanceRate = total > 0 ? Math.round((activeWorking / total) * 100) : 100;

    return {
      attendanceRate: `${attendanceRate}%`,
      presentCount: present,
      wfhCount: wfh,
      leaveCount: leave,
      absentCount: absent
    };
  }, [attendanceData, todayKey]);

  // Filtered dataset
  const filteredEmployees = attendanceData.filter((emp) => {
    if (selectedDeptFilter !== 'ALL' && emp.departmentId !== selectedDeptFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        emp.name.toLowerCase().includes(q) ||
        emp.employeeId.toLowerCase().includes(q) ||
        emp.designation.toLowerCase().includes(q) ||
        emp.departmentName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleOpenDetail = (emp) => {
    setSelectedEmployee(emp);
    setIsDrawerOpen(true);
  };

  const handleOpenCorrection = (emp, date) => {
    setCorrectionTarget({
      employeeId: emp.employeeId,
      name: emp.name,
      date,
      currentStatus: emp.dailyStatus[date] || 'P'
    });
    setIsCorrectionModalOpen(true);
  };

  const handleSaveCorrection = (newStatus) => {
    if (!correctionTarget) return;

    setAttendanceData((prev) =>
      prev.map((emp) => {
        if (emp.employeeId === correctionTarget.employeeId) {
          const updatedDaily = { ...emp.dailyStatus, [correctionTarget.date]: newStatus };
          return { ...emp, dailyStatus: updatedDaily };
        }
        return emp;
      })
    );

    if (selectedEmployee?.employeeId === correctionTarget.employeeId) {
      setSelectedEmployee((prev) => ({
        ...prev,
        dailyStatus: { ...prev.dailyStatus, [correctionTarget.date]: newStatus }
      }));
    }

    setIsCorrectionModalOpen(false);
  };

  const handleExportCSV = () => {
    alert(`Exporting monthly attendance register (${attendanceData.length} staff records) to CSV...`);
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
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>People & HR</span>
            <span style={{ color: '#CBD5E1' }}>/</span>
            <span style={{ fontSize: '12px', color: '#1467FF', fontWeight: 600 }}>Attendance</span>
          </div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#0F172A' }}>
            Daily Attendance & Presence Grid
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748B' }}>
            Monitor daily presence, WFH logs, late arrivals, and team capacity for September 2026.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {can('attendance', 'export') && (
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
              <Download size={14} /> Export Register CSV
            </button>
          )}
        </div>
      </div>

      {/* 2. Top KPI Cards (Computed dynamically) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '16px',
          marginBottom: '20px'
        }}
      >
        <StatCard
          title="Today's Attendance Rate"
          value={stats.attendanceRate}
          change={`${stats.presentCount} on premise`}
          isPositive={true}
          icon={CalendarCheck}
          iconColor="#059669"
          iconBg="#ECFDF5"
        />

        <StatCard
          title="Working Remotely (WFH)"
          value={stats.wfhCount.toString()}
          change="Approved WFH"
          isPositive={true}
          icon={Home}
          iconColor="#2563EB"
          iconBg="#EFF6FF"
        />

        <StatCard
          title="On Approved Leave"
          value={stats.leaveCount.toString()}
          change="Planned Time-off"
          isPositive={false}
          icon={Clock}
          iconColor="#D97706"
          iconBg="#FEF3C7"
        />

        <StatCard
          title="Unplanned Absences"
          value={stats.absentCount.toString()}
          change="Requires Follow-up"
          isPositive={false}
          icon={AlertTriangle}
          iconColor="#DC2626"
          iconBg="#FEF2F2"
        />
      </div>

      {/* 3. Search & Filter Bar + Status Legend */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          border: '1px solid #E2E8F0',
          padding: '14px 18px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '300px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#F8FAFC',
              border: '1px solid #CBD5E1',
              borderRadius: '8px',
              padding: '7px 12px',
              gap: '8px',
              width: '100%',
              maxWidth: '320px'
            }}
          >
            <Search size={15} color="#94A3B8" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search staff by name, ID, title..."
              style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '13px', width: '100%', color: '#0F172A' }}
            />
          </div>

          <select
            value={selectedDeptFilter}
            onChange={(e) => setSelectedDeptFilter(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              fontSize: '12px',
              fontWeight: 600,
              color: '#334155',
              backgroundColor: '#FFF'
            }}
          >
            <option value="ALL">All Departments</option>
            {DEPARTMENTS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11px', fontWeight: 700 }}>
          {Object.entries(STATUS_CODES).map(([code, meta]) => (
            <div key={code} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '6px',
                  backgroundColor: meta.bg,
                  color: meta.color,
                  border: `1px solid ${meta.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px'
                }}
              >
                {code}
              </span>
              <span style={{ color: '#64748B' }}>{meta.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Main Interactive Attendance Matrix Grid */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
          overflowX: 'auto'
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '12px' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #E2E8F0', color: '#64748B' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left', minWidth: '220px', fontWeight: 800 }}>
                Employee & Department
              </th>
              {ATTENDANCE_DATES.map((date) => (
                <th
                  key={date}
                  style={{
                    padding: '10px 6px',
                    minWidth: '46px',
                    fontWeight: 700,
                    color: date === todayKey ? '#1467FF' : '#475569',
                    backgroundColor: date === todayKey ? '#EFF6FF' : 'transparent'
                  }}
                >
                  {date.split(' ')[0]}
                  <div style={{ fontSize: '10px', color: date === todayKey ? '#1467FF' : '#94A3B8' }}>
                    {date.split(' ')[1]}
                  </div>
                </th>
              ))}
              <th style={{ padding: '12px 16px', minWidth: '80px', fontWeight: 700 }}>Presence</th>
              <th style={{ padding: '12px 16px', minWidth: '60px', fontWeight: 700 }}>Late</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp) => {
              const presentDays = Object.values(emp.dailyStatus).filter((s) => s === 'P' || s === 'W').length;
              const presenceRate = Math.round((presentDays / ATTENDANCE_DATES.length) * 100);

              return (
                <tr
                  key={emp.employeeId}
                  style={{ borderBottom: '1px solid #F1F5F9', transition: 'background 0.15s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
                >
                  {/* Employee Name & Profile Clickable */}
                  <td
                    onClick={() => handleOpenDetail(emp)}
                    style={{ padding: '12px 16px', textAlign: 'left', cursor: 'pointer' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img
                        src={emp.avatarUrl}
                        alt={emp.name}
                        style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '13px' }}>{emp.name}</div>
                        <div style={{ fontSize: '11px', color: '#64748B' }}>
                          {emp.employeeId} • {emp.departmentName}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Daily Presence Cells */}
                  {ATTENDANCE_DATES.map((date) => {
                    const code = emp.dailyStatus[date] || 'P';
                    const meta = STATUS_CODES[code] || STATUS_CODES.P;
                    const isToday = date === todayKey;

                    return (
                      <td
                        key={date}
                        style={{
                          padding: '8px 4px',
                          backgroundColor: isToday ? 'rgba(239, 246, 255, 0.5)' : 'transparent'
                        }}
                      >
                        <button
                          onClick={() => {
                            if (can('attendance', 'edit')) {
                              handleOpenCorrection(emp, date);
                            } else {
                              handleOpenDetail(emp);
                            }
                          }}
                          title={`${emp.name} on ${date}: ${meta.label} (Click to ${can('attendance', 'edit') ? 'correct' : 'view'})`}
                          style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '8px',
                            border: `1px solid ${meta.border}`,
                            backgroundColor: meta.bg,
                            color: meta.color,
                            fontSize: '12px',
                            fontWeight: 800,
                            cursor: can('attendance', 'edit') ? 'pointer' : 'default',
                            transition: 'all 0.15s ease',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {code}
                        </button>
                      </td>
                    );
                  })}

                  {/* Monthly Presence Rate */}
                  <td style={{ padding: '12px 16px' }}>
                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: '6px',
                        backgroundColor: presenceRate >= 95 ? '#ECFDF5' : '#FFFBEB',
                        color: presenceRate >= 95 ? '#059669' : '#D97706',
                        fontSize: '11px',
                        fontWeight: 800
                      }}
                    >
                      {presenceRate}%
                    </span>
                  </td>

                  {/* Late Arrival Counter */}
                  <td style={{ padding: '12px 16px' }}>
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        color: emp.lateArrivals > 2 ? '#DC2626' : '#64748B'
                      }}
                    >
                      {emp.lateArrivals}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 5. Detail Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={selectedEmployee ? `Attendance: ${selectedEmployee.name}` : 'Attendance History'}
        subtitle="Individual Monthly Presence Record & Arrival Pattern Analysis"
        width="560px"
      >
        {selectedEmployee && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Header Profile Card */}
            <div
              style={{
                backgroundColor: '#F8FAFC',
                borderRadius: '14px',
                border: '1px solid #E2E8F0',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px'
              }}
            >
              <img
                src={selectedEmployee.avatarUrl}
                alt={selectedEmployee.name}
                style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #FFFFFF' }}
              />
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>
                  {selectedEmployee.name}
                </h4>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                  {selectedEmployee.employeeId} • {selectedEmployee.designation}
                </div>
                <div style={{ fontSize: '11px', color: '#1467FF', fontWeight: 600, marginTop: '2px' }}>
                  {selectedEmployee.departmentName}
                </div>
              </div>
            </div>

            {/* Pattern Analysis Banner */}
            <div
              style={{
                backgroundColor: selectedEmployee.lateArrivals > 2 ? '#FFFBEB' : '#ECFDF5',
                border: selectedEmployee.lateArrivals > 2 ? '1px solid #FDE68A' : '1px solid #A7F3D0',
                borderRadius: '12px',
                padding: '14px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                {selectedEmployee.lateArrivals > 2 ? (
                  <AlertTriangle size={18} color="#D97706" />
                ) : (
                  <CheckCircle2 size={18} color="#059669" />
                )}
                <strong style={{ fontSize: '13px', color: selectedEmployee.lateArrivals > 2 ? '#92400E' : '#065F46' }}>
                  {selectedEmployee.lateArrivals > 2
                    ? `${selectedEmployee.lateArrivals} Late Arrivals Flagged`
                    : 'Consistent Punctual Check-In'}
                </strong>
              </div>
              <div style={{ fontSize: '12px', color: selectedEmployee.lateArrivals > 2 ? '#B45309' : '#047857' }}>
                Average daily check-in: <strong>{selectedEmployee.checkInAvg}</strong> • Average check-out: <strong>{selectedEmployee.checkOutAvg}</strong>
              </div>
            </div>

            {/* Presence Summary KPIs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
              <div style={{ padding: '10px', backgroundColor: '#F8FAFC', borderRadius: '10px', border: '1px solid #F1F5F9', textAlign: 'center' }}>
                <div style={{ fontSize: '10px', color: '#64748B' }}>Present</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#059669', marginTop: '2px' }}>
                  {Object.values(selectedEmployee.dailyStatus).filter((s) => s === 'P').length}d
                </div>
              </div>
              <div style={{ padding: '10px', backgroundColor: '#F8FAFC', borderRadius: '10px', border: '1px solid #F1F5F9', textAlign: 'center' }}>
                <div style={{ fontSize: '10px', color: '#64748B' }}>WFH</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#2563EB', marginTop: '2px' }}>
                  {Object.values(selectedEmployee.dailyStatus).filter((s) => s === 'W').length}d
                </div>
              </div>
              <div style={{ padding: '10px', backgroundColor: '#F8FAFC', borderRadius: '10px', border: '1px solid #F1F5F9', textAlign: 'center' }}>
                <div style={{ fontSize: '10px', color: '#64748B' }}>Leaves</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#D97706', marginTop: '2px' }}>
                  {Object.values(selectedEmployee.dailyStatus).filter((s) => s === 'L').length}d
                </div>
              </div>
              <div style={{ padding: '10px', backgroundColor: '#F8FAFC', borderRadius: '10px', border: '1px solid #F1F5F9', textAlign: 'center' }}>
                <div style={{ fontSize: '10px', color: '#64748B' }}>Absences</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#DC2626', marginTop: '2px' }}>
                  {Object.values(selectedEmployee.dailyStatus).filter((s) => s === 'A').length}d
                </div>
              </div>
            </div>

            {/* Daily History Table */}
            <div>
              <h5 style={{ margin: '0 0 10px 0', fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>
                September 2026 Daily Timeline
              </h5>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                {ATTENDANCE_DATES.map((date) => {
                  const code = selectedEmployee.dailyStatus[date] || 'P';
                  const meta = STATUS_CODES[code] || STATUS_CODES.P;

                  return (
                    <div
                      key={date}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid #E2E8F0',
                        backgroundColor: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>{date}</span>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          backgroundColor: meta.bg,
                          color: meta.color,
                          padding: '2px 8px',
                          borderRadius: '6px',
                          border: `1px solid ${meta.border}`
                        }}
                      >
                        {meta.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </Drawer>

      {/* 6. Manual Attendance Correction Modal */}
      {correctionTarget && (
        <Modal
          isOpen={isCorrectionModalOpen}
          onClose={() => setIsCorrectionModalOpen(false)}
          title="Manual Attendance Correction"
          subtitle={`Adjust attendance status for ${correctionTarget.name} on ${correctionTarget.date}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ fontSize: '13px', color: '#334155' }}>
              Select corrected presence status for <strong>{correctionTarget.date}</strong>:
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {Object.entries(STATUS_CODES).map(([code, meta]) => (
                <button
                  key={code}
                  onClick={() => handleSaveCorrection(code)}
                  style={{
                    padding: '12px',
                    borderRadius: '10px',
                    border: `1px solid ${meta.border}`,
                    backgroundColor: meta.bg,
                    color: meta.color,
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <span>{code}</span> — {meta.label}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
              <button
                onClick={() => setIsCorrectionModalOpen(false)}
                style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', background: '#FFF', color: '#475569', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
