import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePermissions } from '../../context/PermissionContext';
import { useAuth } from '../../context/AuthContext';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  subscribeToTasks,
  TASK_STATUSES,
  TASK_PRIORITIES
} from '../../services/mock/mockTasks';
import { DataTable } from '../../components/common/DataTable';
import { StatCard } from '../../components/common/StatCard';
import { Drawer } from '../../components/common/Drawer';
import {
  CheckSquare,
  PlusCircle,
  Download,
  Search,
  Filter,
  Kanban,
  List,
  Calendar,
  Clock,
  User,
  ExternalLink,
  Trash2,
  Edit2,
  AlertCircle,
  Tag
} from 'lucide-react';

export const TasksPage = () => {
  const { can } = usePermissions();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [tasksList, setTasksList] = useState(() => getTasks());
  const [viewMode, setViewMode] = useState('LIST'); // 'LIST' or 'BOARD'
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // New task form state
  const [newTaskForm, setNewTaskForm] = useState({
    title: '',
    description: '',
    department: 'Operations',
    dueDate: new Date().toISOString().substring(0, 10),
    priority: 'MEDIUM',
    entityType: 'General',
    entityId: '',
    entityTitle: ''
  });

  const refreshTasks = () => {
    setTasksList(getTasks());
  };

  useEffect(() => {
    refreshTasks();
    const unsubscribe = subscribeToTasks(() => {
      refreshTasks();
    });
    return () => unsubscribe();
  }, []);

  const filteredTasks = useMemo(() => {
    return tasksList.filter((t) => {
      const matchStatus = statusFilter === 'ALL' || t.status === statusFilter;
      const matchPriority = priorityFilter === 'ALL' || t.priority === priorityFilter;
      const matchSearch =
        !searchQuery ||
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.assignee?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.linkedEntity?.title?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchStatus && matchPriority && matchSearch;
    });
  }, [tasksList, statusFilter, priorityFilter, searchQuery]);

  const stats = useMemo(() => {
    const total = tasksList.length;
    const todo = tasksList.filter((t) => t.status === 'TODO').length;
    const inProgress = tasksList.filter((t) => t.status === 'IN_PROGRESS').length;
    const overdue = tasksList.filter((t) => t.status === 'OVERDUE').length;
    const done = tasksList.filter((t) => t.status === 'DONE').length;
    return { total, todo, inProgress, overdue, done };
  }, [tasksList]);

  const handleStatusChange = (id, newStatus, e) => {
    if (e) e.stopPropagation();
    updateTask(id, { status: newStatus });
    refreshTasks();
  };

  const handleDelete = (id, e) => {
    if (e) e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
      refreshTasks();
      if (isDrawerOpen && selectedTask?.id === id) {
        setIsDrawerOpen(false);
      }
    }
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTaskForm.title) return;

    let linkedEntity = null;
    if (newTaskForm.entityId && newTaskForm.entityTitle) {
      linkedEntity = {
        type: newTaskForm.entityType,
        id: newTaskForm.entityId,
        title: newTaskForm.entityTitle,
        route: `/one/${newTaskForm.entityType.toLowerCase()}s`
      };
    }

    createTask({
      title: newTaskForm.title,
      description: newTaskForm.description,
      department: newTaskForm.department,
      dueDate: newTaskForm.dueDate,
      priority: newTaskForm.priority,
      assignee: {
        id: currentUser?.id || 'usr-admin-1',
        name: currentUser?.name || 'Staff Member',
        avatarUrl: currentUser?.avatarUrl,
        role: currentUser?.role || 'Operations'
      },
      linkedEntity
    });

    setIsCreateModalOpen(false);
    setNewTaskForm({
      title: '',
      description: '',
      department: 'Operations',
      dueDate: new Date().toISOString().substring(0, 10),
      priority: 'MEDIUM',
      entityType: 'General',
      entityId: '',
      entityTitle: ''
    });
    refreshTasks();
  };

  const handleExport = () => {
    const headers = ['TaskCode,Title,Status,Priority,DueDate,Assignee,Department,LinkedEntity'];
    const rows = filteredTasks.map(
      (t) =>
        `"${t.taskCode}","${t.title}","${t.status}","${t.priority}","${t.dueDate}","${t.assignee?.name}","${t.department}","${t.linkedEntity?.title || 'None'}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `truckmitr_tasks_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = [
    {
      header: 'Task Title & Summary',
      accessor: 'title',
      render: (val, row) => (
        <div>
          <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '13px' }}>{val}</div>
          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px', maxWidth: '380px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {row.description}
          </div>
          {row.linkedEntity && (
            <div style={{ marginTop: '6px' }} onClick={(e) => e.stopPropagation()}>
              <span
                onClick={() => navigate(row.linkedEntity.route)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  backgroundColor: '#EFF6FF',
                  color: '#1467FF',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <Tag size={11} />
                {row.linkedEntity.type}: {row.linkedEntity.title}
                <ExternalLink size={10} />
              </span>
            </div>
          )}
        </div>
      )
    },
    {
      header: 'Assignee',
      accessor: 'assignee',
      render: (val) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {val?.avatarUrl ? (
            <img src={val.avatarUrl} alt={val.name} style={{ width: '26px', height: '26px', borderRadius: '50%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: '#EFF6FF', color: '#1467FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700 }}>
              {val?.name?.charAt(0) || 'U'}
            </div>
          )}
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#0F172A' }}>{val?.name}</span>
        </div>
      )
    },
    {
      header: 'Due Date',
      accessor: 'dueDate',
      render: (val, row) => {
        const isOverdue = row.status === 'OVERDUE';
        return (
          <span style={{ fontSize: '12px', fontWeight: isOverdue ? 700 : 500, color: isOverdue ? '#DC2626' : '#64748B' }}>
            {val}
          </span>
        );
      }
    },
    {
      header: 'Priority',
      accessor: 'priority',
      render: (val) => {
        const pObj = TASK_PRIORITIES.find((p) => p.id === val) || TASK_PRIORITIES[2];
        return (
          <span
            style={{
              fontSize: '10px',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '999px',
              backgroundColor: pObj.bg,
              color: pObj.color
            }}
          >
            {pObj.label}
          </span>
        );
      }
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (val, row) => {
        const sObj = TASK_STATUSES.find((s) => s.id === val) || TASK_STATUSES[0];
        return (
          <select
            value={val}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => handleStatusChange(row.id, e.target.value, e)}
            disabled={!can('tasks', 'edit')}
            style={{
              padding: '4px 8px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: 700,
              backgroundColor: sObj.bg,
              color: sObj.color,
              border: `1px solid ${sObj.border}`,
              cursor: can('tasks', 'edit') ? 'pointer' : 'default',
              outline: 'none'
            }}
          >
            {TASK_STATUSES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        );
      }
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (_, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={(e) => e.stopPropagation()}>
          {can('tasks', 'delete') && (
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
              MY WORK
            </span>
            <span style={{ color: '#94A3B8', fontSize: '12px' }}>• Operational Tasks</span>
          </div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.5px' }}>
            Tasks & Work Items
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748B' }}>
            Track assigned SLAs, fleet compliance checks, transporter partner agreements, and team deliverables.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* View Toggle */}
          <div style={{ display: 'flex', backgroundColor: '#F1F5F9', borderRadius: '8px', padding: '2px' }}>
            <button
              onClick={() => setViewMode('LIST')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 12px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: viewMode === 'LIST' ? '#FFFFFF' : 'transparent',
                color: viewMode === 'LIST' ? '#0F172A' : '#64748B',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: viewMode === 'LIST' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              <List size={14} /> List
            </button>
            <button
              onClick={() => setViewMode('BOARD')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 12px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: viewMode === 'BOARD' ? '#FFFFFF' : 'transparent',
                color: viewMode === 'BOARD' ? '#0F172A' : '#64748B',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: viewMode === 'BOARD' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              <Kanban size={14} /> Board
            </button>
          </div>

          {can('tasks', 'export') && (
            <button
              onClick={handleExport}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 14px',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                backgroundColor: '#FFFFFF',
                color: '#334155',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <Download size={15} /> Export
            </button>
          )}

          {can('tasks', 'create') && (
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
              <PlusCircle size={16} /> Add Task
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
          title="Total Assigned Tasks"
          value={String(stats.total)}
          change="All Workspaces"
          isPositive={true}
          icon={CheckSquare}
          iconColor="#1467FF"
          iconBg="#EFF6FF"
        />
        <StatCard
          title="In Progress"
          value={String(stats.inProgress)}
          change="Active Execution"
          isPositive={true}
          icon={Clock}
          iconColor="#3B82F6"
          iconBg="#EFF6FF"
        />
        <StatCard
          title="Overdue SLAs"
          value={String(stats.overdue)}
          change="Requires Attention"
          isPositive={false}
          icon={AlertCircle}
          iconColor="#EF4444"
          iconBg="#FEF2F2"
        />
        <StatCard
          title="Completed Tasks"
          value={String(stats.done)}
          change="Resolved"
          isPositive={true}
          icon={CheckSquare}
          iconColor="#10B981"
          iconBg="#ECFDF5"
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
            placeholder="Search tasks, descriptions, assignees, linked records..."
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
          {TASK_STATUSES.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
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
          <option value="ALL">All Priorities</option>
          {TASK_PRIORITIES.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      {/* 4. List View vs Kanban Board */}
      {viewMode === 'LIST' ? (
        <DataTable
          columns={columns}
          data={filteredTasks}
          onRowClick={(task) => {
            setSelectedTask(task);
            setIsDrawerOpen(true);
          }}
          searchable={false}
          pagination={true}
          emptyMessage="No tasks found."
        />
      ) : (
        /* Kanban Board View */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          {TASK_STATUSES.map((status) => {
            const columnTasks = filteredTasks.filter((t) => t.status === status.id);
            return (
              <div
                key={status.id}
                style={{
                  backgroundColor: '#F8FAFC',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  minHeight: '400px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: status.color
                      }}
                    />
                    <span style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>
                      {status.label}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      backgroundColor: '#FFFFFF',
                      padding: '2px 8px',
                      borderRadius: '999px',
                      border: '1px solid #E2E8F0',
                      color: '#475569'
                    }}
                  >
                    {columnTasks.length}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto' }}>
                  {columnTasks.map((t) => {
                    const pObj = TASK_PRIORITIES.find((p) => p.id === t.priority) || TASK_PRIORITIES[2];
                    return (
                      <div
                        key={t.id}
                        onClick={() => {
                          setSelectedTask(t);
                          setIsDrawerOpen(true);
                        }}
                        style={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #E2E8F0',
                          borderRadius: '10px',
                          padding: '12px',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span
                            style={{
                              fontSize: '9px',
                              fontWeight: 800,
                              padding: '2px 6px',
                              borderRadius: '4px',
                              backgroundColor: pObj.bg,
                              color: pObj.color
                            }}
                          >
                            {pObj.label}
                          </span>
                          <span style={{ fontSize: '11px', color: '#94A3B8' }}>{t.dueDate}</span>
                        </div>

                        <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#0F172A', lineHeight: 1.3 }}>
                          {t.title}
                        </h4>

                        {t.linkedEntity && (
                          <span
                            style={{
                              fontSize: '10px',
                              color: '#1467FF',
                              backgroundColor: '#EFF6FF',
                              padding: '2px 6px',
                              borderRadius: '4px',
                              display: 'inline-block',
                              maxWidth: 'fit-content'
                            }}
                          >
                            {t.linkedEntity.type}: {t.linkedEntity.title}
                          </span>
                        )}

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '6px', borderTop: '1px solid #F1F5F9' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            {t.assignee?.avatarUrl ? (
                              <img src={t.assignee.avatarUrl} alt="" style={{ width: '20px', height: '20px', borderRadius: '50%' }} />
                            ) : (
                              <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#EFF6FF', color: '#1467FF', fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {t.assignee?.name?.charAt(0)}
                              </div>
                            )}
                            <span style={{ fontSize: '11px', color: '#64748B' }}>{t.assignee?.name}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. Detail Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={selectedTask?.title || 'Task Details'}
        size="md"
      >
        {selectedTask && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#1467FF' }}>{selectedTask.taskCode}</span>
                <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '999px', backgroundColor: '#F1F5F9', color: '#334155' }}>
                  {selectedTask.status}
                </span>
              </div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>
                {selectedTask.title}
              </h3>
              <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: 1.5 }}>
                {selectedTask.description}
              </p>
            </div>

            <div style={{ border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Assignee:</span>
                <strong style={{ color: '#0F172A' }}>{selectedTask.assignee?.name}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Department:</span>
                <strong style={{ color: '#0F172A' }}>{selectedTask.department}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Due Date:</span>
                <strong style={{ color: '#0F172A' }}>{selectedTask.dueDate}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Priority:</span>
                <strong style={{ color: '#0F172A' }}>{selectedTask.priority}</strong>
              </div>
            </div>

            {selectedTask.linkedEntity && (
              <div style={{ border: '1px solid #BFDBFE', backgroundColor: '#EFF6FF', borderRadius: '12px', padding: '16px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#1467FF' }}>LINKED WORKSPACE RECORD</span>
                <h4 style={{ margin: '4px 0', fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>
                  {selectedTask.linkedEntity.type}: {selectedTask.linkedEntity.title}
                </h4>
                <button
                  onClick={() => navigate(selectedTask.linkedEntity.route)}
                  style={{
                    marginTop: '8px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: '#1467FF',
                    color: '#FFFFFF',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Navigate to {selectedTask.linkedEntity.type} <ExternalLink size={12} />
                </button>
              </div>
            )}
          </div>
        )}
      </Drawer>

      {/* 6. Create Task Modal */}
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
              Create New Task
            </h3>
            <form onSubmit={handleCreateTask} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  Task Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Audit monthly fuel challans"
                  value={newTaskForm.title}
                  onChange={(e) => setNewTaskForm({ ...newTaskForm, title: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  Description / Deliverables
                </label>
                <textarea
                  rows={2}
                  placeholder="Actionable notes or criteria..."
                  value={newTaskForm.description}
                  onChange={(e) => setNewTaskForm({ ...newTaskForm, description: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={newTaskForm.dueDate}
                    onChange={(e) => setNewTaskForm({ ...newTaskForm, dueDate: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                    Priority
                  </label>
                  <select
                    value={newTaskForm.priority}
                    onChange={(e) => setNewTaskForm({ ...newTaskForm, priority: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                  >
                    {TASK_PRIORITIES.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>
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
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
