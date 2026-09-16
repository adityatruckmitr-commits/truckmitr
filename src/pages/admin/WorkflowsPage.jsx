import React, { useState, useMemo } from 'react';
import { usePermissions } from '../../context/PermissionContext';
import { useAuth } from '../../context/AuthContext';
import {
  getWorkflows,
  createWorkflow,
  toggleWorkflowStatus,
  deleteWorkflow,
  WORKFLOW_TRIGGERS,
  WORKFLOW_ACTIONS
} from '../../services/mock/mockWorkflows';
import { DataTable } from '../../components/common/DataTable';
import { StatCard } from '../../components/common/StatCard';
import { Drawer } from '../../components/common/Drawer';
import {
  Workflow,
  PlusCircle,
  Play,
  Pause,
  Trash2,
  Edit2,
  Clock,
  ArrowRight,
  Zap,
  CheckCircle2,
  Search,
  Filter,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';

export const WorkflowsPage = () => {
  const { can } = usePermissions();
  const { currentUser } = useAuth();

  const [workflowsList, setWorkflowsList] = useState(() => getWorkflows());
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // New Workflow Form
  const [newWfForm, setNewWfForm] = useState({
    name: '',
    description: '',
    trigger: WORKFLOW_TRIGGERS[0].id,
    condition: 'Amount > ₹3,000',
    action: WORKFLOW_ACTIONS[0].id
  });

  const refreshWorkflows = () => {
    setWorkflowsList(getWorkflows());
  };

  const filteredWorkflows = useMemo(() => {
    return workflowsList.filter((w) => {
      const matchStatus = statusFilter === 'ALL' || w.status === statusFilter;
      const matchSearch =
        !searchQuery ||
        w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.triggerLabel?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.actionLabel?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [workflowsList, statusFilter, searchQuery]);

  const stats = useMemo(() => {
    const total = workflowsList.length;
    const active = workflowsList.filter((w) => w.status === 'ACTIVE').length;
    const totalRuns = workflowsList.reduce((acc, w) => acc + (w.runCount || 0), 0);
    return { total, active, totalRuns };
  }, [workflowsList]);

  const handleToggleStatus = (id, e) => {
    if (e) e.stopPropagation();
    toggleWorkflowStatus(id);
    refreshWorkflows();
  };

  const handleDelete = (id, e) => {
    if (e) e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this workflow automation rule?')) {
      deleteWorkflow(id);
      refreshWorkflows();
      if (isDrawerOpen && selectedWorkflow?.id === id) {
        setIsDrawerOpen(false);
      }
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newWfForm.name) return;

    const trigObj = WORKFLOW_TRIGGERS.find((t) => t.id === newWfForm.trigger) || WORKFLOW_TRIGGERS[0];
    const actObj = WORKFLOW_ACTIONS.find((a) => a.id === newWfForm.action) || WORKFLOW_ACTIONS[0];

    createWorkflow({
      name: newWfForm.name,
      description: newWfForm.description,
      trigger: newWfForm.trigger,
      triggerLabel: trigObj.label,
      module: trigObj.module,
      condition: newWfForm.condition,
      action: newWfForm.action,
      actionLabel: actObj.label,
      author: `${currentUser?.name || 'Admin'} (${currentUser?.role || 'Admin'})`
    });

    setIsCreateModalOpen(false);
    setNewWfForm({
      name: '',
      description: '',
      trigger: WORKFLOW_TRIGGERS[0].id,
      condition: 'Amount > ₹3,000',
      action: WORKFLOW_ACTIONS[0].id
    });
    refreshWorkflows();
  };

  const columns = [
    {
      header: 'Workflow Rule & Intent',
      accessor: 'name',
      render: (val, row) => (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 800, color: '#0F172A', fontSize: '13px' }}>{val}</span>
            <span style={{ fontSize: '10px', color: '#1467FF', fontWeight: 700, backgroundColor: '#EFF6FF', padding: '1px 6px', borderRadius: '4px' }}>
              {row.code}
            </span>
          </div>
          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px', maxWidth: '380px' }}>
            {row.description}
          </div>
        </div>
      )
    },
    {
      header: 'Event Trigger',
      accessor: 'triggerLabel',
      render: (val, row) => (
        <span style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>
          ⚡ {val}
        </span>
      )
    },
    {
      header: 'Execution Logic',
      accessor: 'condition',
      render: (val, row) => (
        <div style={{ fontSize: '11px', color: '#475569' }}>
          <code>IF ({val})</code>
          <div style={{ color: '#10B981', fontWeight: 600, marginTop: '2px' }}>
            → {row.actionLabel}
          </div>
        </div>
      )
    },
    {
      header: 'Executions',
      accessor: 'runCount',
      render: (val, row) => (
        <div>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>{val} runs</span>
          <div style={{ fontSize: '10px', color: '#94A3B8' }}>Last: {row.lastRun}</div>
        </div>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (val) => {
        const isActive = val === 'ACTIVE';
        return (
          <span
            style={{
              fontSize: '10px',
              fontWeight: 800,
              padding: '3px 8px',
              borderRadius: '999px',
              backgroundColor: isActive ? '#ECFDF5' : '#F1F5F9',
              color: isActive ? '#10B981' : '#64748B',
              border: isActive ? '1px solid #A7F3D0' : '1px solid #CBD5E1'
            }}
          >
            {val}
          </span>
        );
      }
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (_, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={(e) => e.stopPropagation()}>
          {can('workflows', 'edit') && (
            <button
              onClick={(e) => handleToggleStatus(row.id, e)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 8px',
                borderRadius: '6px',
                border: '1px solid #E2E8F0',
                backgroundColor: '#FFFFFF',
                color: row.status === 'ACTIVE' ? '#D97706' : '#10B981',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {row.status === 'ACTIVE' ? <Pause size={12} /> : <Play size={12} />}
              {row.status === 'ACTIVE' ? 'Pause' : 'Activate'}
            </button>
          )}
          {can('workflows', 'delete') && (
            <button
              onClick={(e) => handleDelete(row.id, e)}
              style={{
                border: 'none',
                background: 'transparent',
                color: '#94A3B8',
                cursor: 'pointer',
                padding: '4px'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#EF4444')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
            >
              <Trash2 size={15} />
            </button>
          )}
        </div>
      )
    }
  ];

  return (
    <div style={{ padding: '24px', maxWidth: '1440px', margin: '0 auto', fontFamily: "'Inter', sans-serif" }}>
      {/* 1. Header Banner */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '20px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span
              style={{
                backgroundColor: '#EFF6FF',
                color: '#1467FF',
                padding: '3px 10px',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: 700
              }}
            >
              ADMINISTRATION & LOGIC
            </span>
            <span style={{ color: '#94A3B8', fontSize: '12px' }}>• Workflow Automation Engine</span>
          </div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.5px' }}>
            Automated Business Workflows
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748B' }}>
            Configurable trigger-condition-action automation rules connecting Operations, HR, CRM, and Approvals.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {can('workflows', 'create') && (
            <button
              onClick={() => setIsCreateModalOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 16px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#1467FF',
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(20, 103, 255, 0.25)'
              }}
            >
              <PlusCircle size={16} /> New Workflow Rule
            </button>
          )}
        </div>
      </div>

      {/* 2. Top Summary StatCards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}
      >
        <StatCard
          title="Active Workflow Rules"
          value={String(stats.active)}
          change={`${stats.total} Total Rules`}
          isPositive={true}
          icon={Workflow}
          iconColor="#1467FF"
          iconBg="#EFF6FF"
        />
        <StatCard
          title="Automated Executions"
          value={String(stats.totalRuns)}
          change="Lifetime Fires"
          isPositive={true}
          icon={Zap}
          iconColor="#10B981"
          iconBg="#ECFDF5"
        />
        <StatCard
          title="Automation Reliability"
          value="99.8%"
          change="Zero Failure Breaches"
          isPositive={true}
          icon={CheckCircle2}
          iconColor="#8B5CF6"
          iconBg="#F3E8FF"
        />
      </div>

      {/* 3. Filters Bar */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '14px',
          padding: '16px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ position: 'relative', flex: '1 1 240px' }}>
          <Search
            size={16}
            color="#94A3B8"
            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
          />
          <input
            type="text"
            placeholder="Search rules, trigger events, action types..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '9px 12px 9px 36px',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              fontSize: '13px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: '9px 12px',
            borderRadius: '8px',
            border: '1px solid #E2E8F0',
            fontSize: '13px',
            backgroundColor: '#FFFFFF',
            outline: 'none',
            color: '#334155'
          }}
        >
          <option value="ALL">All Statuses</option>
          <option value="ACTIVE">Active Only</option>
          <option value="PAUSED">Paused Only</option>
        </select>
      </div>

      {/* 4. Workflows Table */}
      <DataTable
        columns={columns}
        data={filteredWorkflows}
        onRowClick={(wf) => {
          setSelectedWorkflow(wf);
          setIsDrawerOpen(true);
        }}
        searchable={false}
        pagination={true}
        emptyMessage="No automation rules configured."
      />

      {/* 5. Detail Drawer with Execution History */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={selectedWorkflow?.name || 'Rule Details'}
        size="lg"
      >
        {selectedWorkflow && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#1467FF' }}>{selectedWorkflow.code}</span>
                <span style={{ fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '999px', backgroundColor: selectedWorkflow.status === 'ACTIVE' ? '#ECFDF5' : '#F1F5F9', color: selectedWorkflow.status === 'ACTIVE' ? '#10B981' : '#64748B' }}>
                  {selectedWorkflow.status}
                </span>
              </div>
              <h3 style={{ margin: '0 0 6px 0', fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>
                {selectedWorkflow.name}
              </h3>
              <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: 1.5 }}>
                {selectedWorkflow.description}
              </p>
            </div>

            {/* Visual Logic Flowchart Box */}
            <div style={{ border: '1px solid #BFDBFE', backgroundColor: '#EFF6FF', borderRadius: '12px', padding: '16px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#1467FF', display: 'block', marginBottom: '10px' }}>
                AUTOMATION PIPELINE SPECIFICATION
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>
                  ⚡ Trigger: {selectedWorkflow.triggerLabel}
                </div>
                <ArrowRight size={16} color="#94A3B8" />
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>
                  ⚖ Condition: {selectedWorkflow.condition}
                </div>
                <ArrowRight size={16} color="#94A3B8" />
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #10B981', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', fontWeight: 700, color: '#047857' }}>
                  🎯 Action: {selectedWorkflow.actionLabel}
                </div>
              </div>
            </div>

            {/* Recent Execution Runs Log */}
            <div style={{ border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>
                Recent Execution Runs ({selectedWorkflow.recentRuns?.length || 0})
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedWorkflow.recentRuns && selectedWorkflow.recentRuns.length > 0 ? (
                  selectedWorkflow.recentRuns.map((run) => (
                    <div
                      key={run.id}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '8px',
                        backgroundColor: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        fontSize: '12px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <strong style={{ color: '#0F172A' }}>{run.triggeredBy}</strong>
                        <div style={{ color: '#64748B', fontSize: '11px', marginTop: '2px' }}>{run.details}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '10px', fontWeight: 700, color: '#10B981', backgroundColor: '#ECFDF5', padding: '2px 6px', borderRadius: '4px' }}>
                          {run.status}
                        </span>
                        <div style={{ fontSize: '10px', color: '#94A3B8', marginTop: '2px' }}>{run.timestamp}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{ fontSize: '12px', color: '#94A3B8', margin: 0 }}>No historical runs recorded yet.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </Drawer>

      {/* 6. Create Rule Modal */}
      {isCreateModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(3px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '16px'
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              maxWidth: '520px',
              width: '100%',
              padding: '24px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}
          >
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              Create Workflow Automation Rule
            </h3>
            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  Rule Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Urgent Partner Verification Task Dispatch"
                  value={newWfForm.name}
                  onChange={(e) => setNewWfForm({ ...newWfForm, name: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  Description / Objective
                </label>
                <textarea
                  rows={2}
                  placeholder="Explain why this rule exists and who it routes to..."
                  value={newWfForm.description}
                  onChange={(e) => setNewWfForm({ ...newWfForm, description: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  1. Trigger Event (Source Module)
                </label>
                <select
                  value={newWfForm.trigger}
                  onChange={(e) => setNewWfForm({ ...newWfForm, trigger: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                >
                  {WORKFLOW_TRIGGERS.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label} (Module: {t.module})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  2. Condition Logic
                </label>
                <input
                  type="text"
                  placeholder="e.g. Amount > ₹5,000 OR Days > 2"
                  value={newWfForm.condition}
                  onChange={(e) => setNewWfForm({ ...newWfForm, condition: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  3. Automated Action
                </label>
                <select
                  value={newWfForm.action}
                  onChange={(e) => setNewWfForm({ ...newWfForm, action: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                >
                  {WORKFLOW_ACTIONS.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.label}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#475569', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', backgroundColor: '#1467FF', color: '#FFFFFF', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Save & Activate Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
