import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { usePermissions } from '../../context/PermissionContext';
import { StatCard } from '../../components/common/StatCard';
import { BarTrendChart } from '../../components/charts/BarTrendChart';
import { WidgetGate } from '../../components/guards/WidgetGate';
import {
  getUnifiedPendingApprovals,
  mutateUnifiedApproval,
  subscribeToApprovals
} from '../../services/approvalsRegistry';
import { INITIAL_EMPLOYEES_DATA } from '../../services/mock/mockEmployees';
import { INITIAL_ATTENDANCE_DATA } from '../../services/mock/mockAttendance';
import {
  Users,
  CalendarCheck,
  CalendarOff,
  UserPlus,
  Home,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  Building2,
  Award
} from 'lucide-react';

export const HrDashboard = () => {
  const { currentUser } = useAuth();
  const { can } = usePermissions();
  const navigate = useNavigate();

  const [approvalsList, setApprovalsList] = useState(() => getUnifiedPendingApprovals());
  const [employees] = useState(() => INITIAL_EMPLOYEES_DATA);

  useEffect(() => {
    const unsub = subscribeToApprovals(() => {
      setApprovalsList(getUnifiedPendingApprovals());
    });
    return () => unsub();
  }, []);

  // Filter leave requests from approvalsRegistry
  const pendingLeaves = useMemo(() => {
    return approvalsList.filter((item) => item.module === 'leaves');
  }, [approvalsList]);

  // Compute live attendance stats from INITIAL_ATTENDANCE_DATA
  const attendanceStats = useMemo(() => {
    const totalStaff = INITIAL_ATTENDANCE_DATA.length;
    let presentCount = 0;
    let wfhCount = 0;
    let leaveCount = 0;

    INITIAL_ATTENDANCE_DATA.forEach((emp) => {
      const todayStatus = emp.dailyStatus?.['14 Sep'] || 'P';
      if (todayStatus === 'P') presentCount++;
      else if (todayStatus === 'W') wfhCount++;
      else if (todayStatus === 'L') leaveCount++;
    });

    const rate = totalStaff > 0 ? Math.round(((presentCount + wfhCount) / totalStaff) * 100) : 100;
    return { totalStaff, presentCount, wfhCount, leaveCount, rate };
  }, []);

  // Onboarding queue: staff joined in recent months
  const onboardingQueue = useMemo(() => {
    return employees.filter((e) => e.status === 'Active').slice(0, 4);
  }, [employees]);

  // Attendance 6-month historical trend
  const attendanceTrendData = [
    { month: 'Apr', value: 92, label: '92%' },
    { month: 'May', value: 94, label: '94%' },
    { month: 'Jun', value: 91, label: '91%' },
    { month: 'Jul', value: 96, label: '96%' },
    { month: 'Aug', value: 95, label: '95%' },
    { month: 'Sep', value: attendanceStats.rate, label: `${attendanceStats.rate}%` }
  ];

  // Quick Action Handlers
  const handleApproveLeave = (item, e) => {
    if (e) e.stopPropagation();
    mutateUnifiedApproval(item, 'APPROVE', 'Authorized via HR Cockpit');
  };

  const handleRejectLeave = (item, e) => {
    if (e) e.stopPropagation();
    mutateUnifiedApproval(item, 'REJECT', 'Rejected via HR Cockpit');
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1440px', margin: '0 auto', fontFamily: "'Inter', sans-serif" }}>
      {/* 1. Header Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #065F46 0%, #059669 100%)',
          borderRadius: '20px',
          padding: '28px 32px',
          color: '#FFFFFF',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          boxShadow: '0 10px 25px rgba(5, 150, 105, 0.2)'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: '#ECFDF5',
                padding: '3px 10px',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: 700
              }}
            >
              👥 PEOPLE & HR COCKPIT
            </span>
            <span style={{ color: '#A7F3D0', fontSize: '12px' }}>• Attendance & Staff Operations</span>
          </div>
          <h1 style={{ margin: '0 0 6px 0', fontSize: '26px', fontWeight: 800 }}>
            People Operations — {currentUser?.name || 'Pratima Singh'}
          </h1>
          <p style={{ margin: 0, fontSize: '13px', color: '#ECFDF5' }}>
            Total workforce: {employees.length} employees • Attendance rate: {attendanceStats.rate}% • {pendingLeaves.length} leave requests awaiting review.
          </p>
        </div>

        <button
          onClick={() => navigate('/one/employees')}
          style={{
            backgroundColor: '#FFFFFF',
            color: '#047857',
            border: 'none',
            borderRadius: '10px',
            padding: '10px 18px',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(0,0,0,0.1)'
          }}
        >
          Staff Registry →
        </button>
      </div>

      {/* 2. Top Summary StatCards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}
      >
        <WidgetGate module="employees" title="Total Workforce Headcount">
          <StatCard
            title="Total Headcount"
            value={String(employees.length)}
            change="Across 6 Departments"
            isPositive={true}
            icon={Users}
            iconColor="#1467FF"
            iconBg="#EFF6FF"
            onClick={() => navigate('/one/employees')}
          />
        </WidgetGate>

        <WidgetGate module="attendance" title="Today's Attendance Rate">
          <StatCard
            title="Today's Attendance"
            value={`${attendanceStats.rate}%`}
            change={`${attendanceStats.presentCount} Present in Office`}
            isPositive={true}
            icon={CalendarCheck}
            iconColor="#059669"
            iconBg="#ECFDF5"
            onClick={() => navigate('/one/attendance')}
          />
        </WidgetGate>

        <WidgetGate module="leaves" title="Pending Leave Requests">
          <StatCard
            title="Pending Leaves"
            value={String(pendingLeaves.length)}
            change={`${pendingLeaves.length} Action Needed`}
            isPositive={pendingLeaves.length === 0}
            icon={CalendarOff}
            iconColor="#D97706"
            iconBg="#FEF3C7"
            onClick={() => navigate('/one/leaves')}
          />
        </WidgetGate>

        <WidgetGate module="attendance" title="Working Remotely">
          <StatCard
            title="WFH Employees"
            value={String(attendanceStats.wfhCount)}
            change="Remote Stations"
            isPositive={true}
            icon={Home}
            iconColor="#9333EA"
            iconBg="#F3E8FF"
            onClick={() => navigate('/one/attendance')}
          />
        </WidgetGate>
      </div>

      {/* 3. Grid: Pending Leave Requests Queue & Attendance Trend */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '20px', marginBottom: '24px' }}>
        {/* Pending Leave Requests */}
        <WidgetGate module="leaves" title="Pending Leave Approvals">
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>
                  Pending Leave Approvals Queue
                </h3>
                <span style={{ fontSize: '11px', color: '#64748B' }}>Live from Approvals Registry</span>
              </div>
              <button
                onClick={() => navigate('/one/leaves')}
                style={{
                  border: 'none',
                  background: '#ECFDF5',
                  color: '#059669',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Open Leave Ledger →
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {pendingLeaves.length === 0 ? (
                <div style={{ padding: '24px', textAlign: 'center', color: '#64748B', fontSize: '13px' }}>
                  <CheckCircle2 size={24} color="#10B981" style={{ margin: '0 auto 6px' }} />
                  No pending leave applications awaiting HR review.
                </div>
              ) : (
                pendingLeaves.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      padding: '14px',
                      borderRadius: '12px',
                      backgroundColor: '#F8FAFC',
                      border: '1px solid #F1F5F9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>
                        {item.requestedBy} <span style={{ color: '#64748B', fontWeight: 500 }}>({item.department})</span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#D97706', fontWeight: 600, marginTop: '2px' }}>
                        {item.title} • {item.payload.dates}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                        Reason: "{item.payload.reason}" • Balance: {item.payload.balanceRemaining} days
                      </div>
                    </div>

                    {can('leaves', 'approve') && (
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          onClick={(e) => handleApproveLeave(item, e)}
                          style={{
                            backgroundColor: '#059669',
                            color: '#FFF',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '6px 12px',
                            fontSize: '12px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <CheckCircle2 size={13} /> Approve
                        </button>
                        <button
                          onClick={(e) => handleRejectLeave(item, e)}
                          style={{
                            backgroundColor: '#FEE2E2',
                            color: '#DC2626',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '6px 12px',
                            fontSize: '12px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <XCircle size={13} /> Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </WidgetGate>

        {/* Attendance Trend Bar Chart */}
        <WidgetGate module="attendance" title="Monthly Attendance Trend">
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
                Monthly Attendance Trend
              </h3>
              <span style={{ fontSize: '11px', color: '#059669', fontWeight: 700 }}>
                Average: 94%
              </span>
            </div>
            <BarTrendChart data={attendanceTrendData} height={200} />
          </div>
        </WidgetGate>
      </div>

      {/* 4. Onboarding Queue */}
      <WidgetGate module="employees" title="Recent Onboarding Queue">
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
              Recent Onboarding & Staff Registry
            </h3>
            <button
              onClick={() => navigate('/one/employees')}
              style={{ border: 'none', background: 'transparent', color: '#1467FF', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
            >
              View Full Directory →
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
            {onboardingQueue.map((emp) => (
              <div
                key={emp.id}
                style={{
                  padding: '14px',
                  borderRadius: '12px',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <img
                  src={emp.avatarUrl}
                  alt={emp.name}
                  style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <strong style={{ fontSize: '13px', color: '#0F172A', display: 'block' }}>{emp.name}</strong>
                  <span style={{ fontSize: '11px', color: '#64748B' }}>{emp.designation}</span>
                  <div style={{ fontSize: '10px', color: '#1467FF', fontWeight: 700, marginTop: '2px' }}>
                    {emp.departmentName} • Joined {emp.doj}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </WidgetGate>
    </div>
  );
};
