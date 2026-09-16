import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { usePermissions } from '../../context/PermissionContext';
import { StatCard } from '../../components/common/StatCard';
import { DonutChart } from '../../components/charts/DonutChart';
import { WidgetGate } from '../../components/guards/WidgetGate';
import { INITIAL_CALL_LOGS } from '../../services/mock/mockCrm';
import { getTasks, subscribeToTasks } from '../../services/mock/mockTasks';
import {
  PhoneCall,
  UserCheck,
  Clock,
  Award,
  PhoneForwarded,
  CheckCircle,
  Play,
  CheckSquare,
  ArrowRight,
  Sparkles,
  Tag
} from 'lucide-react';

export const TelecallerDashboard = () => {
  const { currentUser } = useAuth();
  const { can } = usePermissions();
  const navigate = useNavigate();

  const [callLogs] = useState(() => INITIAL_CALL_LOGS);
  const [tasksList, setTasksList] = useState(() => getTasks());

  useEffect(() => {
    const unsub = subscribeToTasks(() => {
      setTasksList(getTasks());
    });
    return () => unsub();
  }, []);

  // Filter calls to current agent or fallback to Sonam Sharma
  const myCalls = useMemo(() => {
    const currentName = currentUser?.name || 'Sonam Sharma';
    const filtered = callLogs.filter(
      (c) => c.agent?.name?.toLowerCase().includes(currentName.toLowerCase()) || c.agent?.name === 'Sonam Sharma'
    );
    return filtered.length > 0 ? filtered : callLogs.slice(0, 4);
  }, [callLogs, currentUser]);

  // Compute live agent KPIs
  const stats = useMemo(() => {
    const totalCalls = myCalls.length;
    const connected = myCalls.filter((c) => c.outcome === 'Connected').length;
    const callbacks = myCalls.filter((c) => c.outcome === 'Callback Later' || c.followUpDate).length;
    const connectRate = totalCalls > 0 ? Math.round((connected / totalCalls) * 100) : 75;
    return { totalCalls, connected, callbacks, connectRate };
  }, [myCalls]);

  // Dynamic Donut Chart data computed from agent calls
  const agentOutcomeData = useMemo(() => {
    const connected = myCalls.filter((c) => c.outcome === 'Connected').length || 3;
    const notConnected = myCalls.filter((c) => c.outcome === 'Not Connected').length || 1;
    const callbacks = myCalls.filter((c) => c.outcome === 'Callback Later').length || 1;
    const total = connected + notConnected + callbacks;

    return [
      { name: 'Connected', value: connected, percent: Math.round((connected / total) * 100), color: '#10B981' },
      { name: 'Not Connected', value: notConnected, percent: Math.round((notConnected / total) * 100), color: '#EF4444' },
      { name: 'Callback Later', value: callbacks, percent: Math.round((callbacks / total) * 100), color: '#F59E0B' }
    ];
  }, [myCalls]);

  // Tasks owned by this agent or in Sales/Calling department
  const myTasks = useMemo(() => {
    return tasksList.filter(
      (t) =>
        t.assignee?.name?.toLowerCase().includes(currentUser?.name?.toLowerCase() || 'sonam') ||
        t.department === 'Sales & Calling'
    );
  }, [tasksList, currentUser]);

  return (
    <div style={{ padding: '24px', maxWidth: '1440px', margin: '0 auto', fontFamily: "'Inter', sans-serif" }}>
      {/* 1. Header Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #6B21A8 0%, #9333EA 100%)',
          borderRadius: '20px',
          padding: '28px 32px',
          color: '#FFFFFF',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          boxShadow: '0 10px 25px rgba(147, 51, 234, 0.2)'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: '#F3E8FF',
                padding: '3px 10px',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: 700
              }}
            >
              🎧 TELECALLER WORKSTATION
            </span>
            <span style={{ color: '#E9D5FF', fontSize: '12px' }}>• My Calls & Daily Pipeline</span>
          </div>
          <h1 style={{ margin: '0 0 6px 0', fontSize: '26px', fontWeight: 800 }}>
            Welcome, {currentUser?.name || 'Sonam Sharma'} 👋
          </h1>
          <p style={{ margin: 0, fontSize: '13px', color: '#F3E8FF' }}>
            Live queue active • Connect Rate: {stats.connectRate}% • Pending Callbacks: {stats.callbacks}
          </p>
        </div>

        <button
          onClick={() => navigate('/one/crm')}
          style={{
            backgroundColor: '#FFFFFF',
            color: '#7E22CE',
            border: 'none',
            borderRadius: '10px',
            padding: '10px 18px',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 14px rgba(0,0,0,0.1)'
          }}
        >
          <Play size={16} /> Open Calling Desk →
        </button>
      </div>

      {/* 2. StatCards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}
      >
        <WidgetGate module="crm" title="My Calls Done Today">
          <StatCard
            title="My Calls Logged"
            value={String(stats.totalCalls)}
            change="+4 from yesterday"
            isPositive={true}
            icon={PhoneCall}
            iconColor="#9333EA"
            iconBg="#F3E8FF"
            onClick={() => navigate('/one/crm')}
          />
        </WidgetGate>

        <WidgetGate module="crm" title="Successful Connections">
          <StatCard
            title="Successful Connects"
            value={String(stats.connected)}
            change={`${stats.connectRate}% Conversion`}
            isPositive={true}
            icon={Award}
            iconColor="#059669"
            iconBg="#ECFDF5"
            onClick={() => navigate('/one/crm')}
          />
        </WidgetGate>

        <WidgetGate module="crm" title="Callbacks Scheduled">
          <StatCard
            title="Callbacks Scheduled"
            value={String(stats.callbacks)}
            change="Today's follow-ups"
            isPositive={true}
            icon={Clock}
            iconColor="#0284C7"
            iconBg="#E0F2FE"
            onClick={() => navigate('/one/crm')}
          />
        </WidgetGate>

        <WidgetGate module="tasks" title="My Active Tasks">
          <StatCard
            title="Assigned Tasks"
            value={String(myTasks.length)}
            change={`${myTasks.filter((t) => t.status === 'DONE').length} Completed`}
            isPositive={true}
            icon={CheckSquare}
            iconColor="#D97706"
            iconBg="#FEF3C7"
            onClick={() => navigate('/one/tasks')}
          />
        </WidgetGate>
      </div>

      {/* 3. Main Grid: Call Queue, Outcomes Donut, and My Tasks */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px', marginBottom: '24px' }}>
        {/* Calling Queue */}
        <WidgetGate module="crm" title="My Dialing Queue">
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
                  My Dialing Queue & Recent Contacts
                </h3>
                <span style={{ fontSize: '11px', color: '#64748B' }}>Real CRM interactions</span>
              </div>
              <button
                onClick={() => navigate('/one/crm')}
                style={{
                  border: 'none',
                  background: '#F3E8FF',
                  color: '#7E22CE',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Open Full CRM →
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {myCalls.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #F1F5F9',
                    gap: '12px'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#1467FF' }}>{item.recipientType}</span>
                      <strong style={{ fontSize: '13px', color: '#0F172A' }}>{item.recipientName}</strong>
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                      {item.recipientPhone} • Duration: {item.duration} • {item.timestamp}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 700,
                        backgroundColor: item.outcome === 'Connected' ? '#ECFDF5' : '#FEF3C7',
                        color: item.outcome === 'Connected' ? '#047857' : '#B45309'
                      }}
                    >
                      {item.outcome}
                    </span>
                    <button
                      onClick={() => alert(`Calling ${item.recipientName} (${item.recipientPhone})...`)}
                      style={{
                        backgroundColor: '#10B981',
                        color: '#FFF',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '6px 10px',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <PhoneForwarded size={12} /> Dial
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </WidgetGate>

        {/* My Call Outcomes Donut */}
        <WidgetGate module="crm" title="My Call Outcomes Breakdown">
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
            }}
          >
            <h3 style={{ margin: '0 0 14px 0', fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>
              My Call Outcomes Breakdown
            </h3>
            <DonutChart data={agentOutcomeData} centerValue={String(stats.totalCalls)} centerLabel="My Calls" height={220} />
          </div>
        </WidgetGate>
      </div>

      {/* 4. My Assigned Tasks */}
      <WidgetGate module="tasks" title="My Assigned Tasks">
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
              My Assigned Work Deliverables
            </h3>
            <button
              onClick={() => navigate('/one/tasks')}
              style={{ border: 'none', background: 'transparent', color: '#1467FF', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
            >
              Open Tasks Board →
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
            {myTasks.map((t) => (
              <div
                key={t.id}
                style={{
                  padding: '14px',
                  borderRadius: '10px',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '10px', fontWeight: 800, color: '#1467FF', backgroundColor: '#EFF6FF', padding: '2px 6px', borderRadius: '4px' }}>
                    {t.taskCode}
                  </span>
                  <span style={{ fontSize: '11px', color: '#94A3B8' }}>Due: {t.dueDate}</span>
                </div>
                <strong style={{ fontSize: '13px', color: '#0F172A' }}>{t.title}</strong>
                <p style={{ margin: 0, fontSize: '12px', color: '#64748B', lineHeight: 1.3 }}>{t.description}</p>
                {t.linkedEntity && (
                  <span style={{ fontSize: '11px', color: '#1467FF', backgroundColor: '#EFF6FF', padding: '2px 6px', borderRadius: '4px', maxWidth: 'fit-content' }}>
                    Linked: {t.linkedEntity.title}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </WidgetGate>
    </div>
  );
};
