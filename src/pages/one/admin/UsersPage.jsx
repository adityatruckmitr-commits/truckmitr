import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { usePermissions } from '../../../context/PermissionContext';
import { StatusBadge } from '../../../components/common/StatusBadge';
import { Modal } from '../../../components/common/Modal';
import {
  Users,
  UserPlus,
  Search,
  Filter,
  MoreVertical,
  Shield,
  Building,
  Mail,
  Phone,
  Calendar,
  Check,
  Ban,
  Trash2,
  Edit2
} from 'lucide-react';
import { DEPARTMENTS, SYSTEM_ROLES } from '../../../utils/rbacConstants';

export const UsersPage = () => {
  const { users, addUser, updateUser, toggleUserStatus, deleteUser, activeRole } = useAuth();
  const { can } = usePermissions();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [selectedRole, setSelectedRole] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    departmentId: 'dept-ops',
    roleSlug: 'telecaller',
    designation: '',
    workMode: 'Office'
  });

  // Filtered list
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.employeeId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = selectedDept === 'ALL' || u.departmentId === selectedDept;
    const matchesRole = selectedRole === 'ALL' || u.roleSlug === selectedRole;
    const matchesStatus = selectedStatus === 'ALL' || u.status === selectedStatus;

    return matchesSearch && matchesDept && matchesRole && matchesStatus;
  });

  const handleOpenAdd = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      departmentId: 'dept-ops',
      roleSlug: 'telecaller',
      designation: '',
      workMode: 'Office'
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      departmentId: user.departmentId || 'dept-ops',
      roleSlug: user.roleSlug || 'telecaller',
      designation: user.designation || '',
      workMode: user.workMode || 'Office'
    });
  };

  const handleSaveUser = (e) => {
    e.preventDefault();
    const deptObj = DEPARTMENTS.find((d) => d.id === formData.departmentId) || DEPARTMENTS[0];

    if (editingUser) {
      updateUser(editingUser.id, {
        ...formData,
        departmentCode: deptObj.code,
        departmentName: deptObj.name
      });
      setEditingUser(null);
    } else {
      addUser({
        ...formData,
        departmentCode: deptObj.code,
        departmentName: deptObj.name
      });
      setIsAddModalOpen(false);
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto', fontFamily: "'Inter', sans-serif" }}>
      {/* Header Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Administration</span>
            <span style={{ color: '#CBD5E1' }}>/</span>
            <span style={{ fontSize: '12px', color: '#1467FF', fontWeight: 600 }}>Users</span>
          </div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#0F172A' }}>
            Users & Identity Management
          </h1>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748B' }}>
            Manage staff accounts, provision roles, assign departments, and control system access.
          </p>
        </div>

        {can('users', 'create') && (
          <button
            onClick={handleOpenAdd}
            style={{
              backgroundColor: '#1467FF',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '10px',
              padding: '10px 18px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(20, 103, 255, 0.25)'
            }}
          >
            <UserPlus size={16} />
            Add New User
          </button>
        )}
      </div>

      {/* KPI Stats Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}
      >
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '14px',
            padding: '18px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px'
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              backgroundColor: '#EFF6FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Users size={22} color="#1467FF" />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Total Users</div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A' }}>{users.length}</div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '14px',
            padding: '18px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px'
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              backgroundColor: '#ECFDF5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Check size={22} color="#10B981" />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Active Accounts</div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#059669' }}>
              {users.filter((u) => u.status === 'ACTIVE').length}
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '14px',
            padding: '18px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px'
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              backgroundColor: '#FEF3C7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Shield size={22} color="#D97706" />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Roles Configured</div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#D97706' }}>{SYSTEM_ROLES.length}</div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '14px',
            padding: '18px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px'
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              backgroundColor: '#F3E8FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Building size={22} color="#9333EA" />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Departments</div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#9333EA' }}>{DEPARTMENTS.length}</div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '14px',
          padding: '16px 20px',
          marginBottom: '20px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '1', minWidth: '260px' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '360px' }}>
            <Search
              size={16}
              color="#94A3B8"
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              placeholder="Search by name, email, employee ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '9px 12px 9px 36px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '13px',
                outline: 'none'
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {/* Dept Filter */}
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              fontSize: '12px',
              backgroundColor: '#FFF',
              fontWeight: 600,
              color: '#334155'
            }}
          >
            <option value="ALL">All Departments</option>
            {DEPARTMENTS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>

          {/* Role Filter */}
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              fontSize: '12px',
              backgroundColor: '#FFF',
              fontWeight: 600,
              color: '#334155'
            }}
          >
            <option value="ALL">All Roles</option>
            {SYSTEM_ROLES.map((r) => (
              <option key={r.id} value={r.slug}>
                {r.name}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              fontSize: '12px',
              backgroundColor: '#FFF',
              fontWeight: 600,
              color: '#334155'
            }}
          >
            <option value="ALL">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>

          {(searchQuery || selectedDept !== 'ALL' || selectedRole !== 'ALL' || selectedStatus !== 'ALL') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDept('ALL');
                setSelectedRole('ALL');
                setSelectedStatus('ALL');
              }}
              style={{
                border: 'none',
                background: '#F1F5F9',
                color: '#64748B',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Users Data Table */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.02)'
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569' }}>
              <th style={{ padding: '14px 18px', fontWeight: 700 }}>Employee Details</th>
              <th style={{ padding: '14px 18px', fontWeight: 700 }}>Employee ID</th>
              <th style={{ padding: '14px 18px', fontWeight: 700 }}>Role & Authority</th>
              <th style={{ padding: '14px 18px', fontWeight: 700 }}>Department</th>
              <th style={{ padding: '14px 18px', fontWeight: 700 }}>Work Mode</th>
              <th style={{ padding: '14px 18px', fontWeight: 700 }}>Status</th>
              <th style={{ padding: '14px 18px', fontWeight: 700 }}>Last Login</th>
              <th style={{ padding: '14px 18px', fontWeight: 700, textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ padding: '40px', textAlign: 'center', color: '#94A3B8' }}>
                  No users found matching current filters.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => {
                const roleObj = SYSTEM_ROLES.find((r) => r.slug === user.roleSlug) || SYSTEM_ROLES[0];
                return (
                  <tr
                    key={user.id}
                    style={{
                      borderBottom: '1px solid #F1F5F9',
                      transition: 'background 0.15s'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    {/* User info */}
                    <td style={{ padding: '14px 18px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img
                          src={user.avatarUrl}
                          alt={user.name}
                          style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <div>
                          <div style={{ fontWeight: 700, color: '#0F172A' }}>{user.name}</div>
                          <div style={{ fontSize: '12px', color: '#64748B' }}>{user.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* Emp ID */}
                    <td style={{ padding: '14px 18px', fontFamily: 'monospace', fontWeight: 600, color: '#1E293B' }}>
                      {user.employeeId}
                    </td>

                    {/* Role */}
                    <td style={{ padding: '14px 18px' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '3px 10px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: 700,
                          backgroundColor: roleObj.bgColor,
                          color: roleObj.color
                        }}
                      >
                        {roleObj.badge}
                      </span>
                    </td>

                    {/* Dept */}
                    <td style={{ padding: '14px 18px' }}>
                      <div style={{ fontWeight: 600, color: '#334155' }}>{user.departmentName}</div>
                      <div style={{ fontSize: '11px', color: '#94A3B8' }}>{user.designation}</div>
                    </td>

                    {/* Work Mode */}
                    <td style={{ padding: '14px 18px' }}>
                      <span
                        style={{
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: 600,
                          backgroundColor: user.workMode === 'Office' ? '#E0F2FE' : '#F1F5F9',
                          color: user.workMode === 'Office' ? '#0369A1' : '#475569'
                        }}
                      >
                        {user.workMode}
                      </span>
                    </td>

                    {/* Status */}
                    <td style={{ padding: '14px 18px' }}>
                      <StatusBadge status={user.status} />
                    </td>

                    {/* Last Login */}
                    <td style={{ padding: '14px 18px' }}>
                      <div style={{ fontSize: '12px', color: '#334155' }}>{user.lastLogin}</div>
                      <div style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'monospace' }}>IP: {user.lastIp}</div>
                    </td>

                    {/* Action buttons */}
                    <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                        {can('users', 'edit') && (
                          <button
                            title="Edit User"
                            onClick={() => handleOpenEdit(user)}
                            style={{
                              border: '1px solid #E2E8F0',
                              background: '#FFF',
                              color: '#475569',
                              padding: '6px',
                              borderRadius: '6px',
                              cursor: 'pointer'
                            }}
                          >
                            <Edit2 size={14} />
                          </button>
                        )}

                        {can('users', 'edit') && (
                          <button
                            title={user.status === 'ACTIVE' ? 'Deactivate User' : 'Activate User'}
                            onClick={() => toggleUserStatus(user.id)}
                            style={{
                              border: '1px solid #E2E8F0',
                              background: '#FFF',
                              color: user.status === 'ACTIVE' ? '#D97706' : '#10B981',
                              padding: '6px',
                              borderRadius: '6px',
                              cursor: 'pointer'
                            }}
                          >
                            {user.status === 'ACTIVE' ? <Ban size={14} /> : <Check size={14} />}
                          </button>
                        )}

                        {can('users', 'delete') && (
                          <button
                            title="Delete User"
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to delete user ${user.name}?`)) {
                                deleteUser(user.id);
                              }
                            }}
                            style={{
                              border: '1px solid #FEE2E2',
                              background: '#FFF',
                              color: '#EF4444',
                              padding: '6px',
                              borderRadius: '6px',
                              cursor: 'pointer'
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Edit User Modal */}
      <Modal
        isOpen={isAddModalOpen || !!editingUser}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingUser(null);
        }}
        title={editingUser ? 'Edit User Details' : 'Provision New System User'}
        subtitle="Set user profile, corporate credentials, assigned role, and department scope."
      >
        <form onSubmit={handleSaveUser} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
              Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Ramesh Kumar"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '13px'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Corporate Email *
              </label>
              <input
                type="email"
                required
                placeholder="name@truckmitr.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '13px'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Phone Number
              </label>
              <input
                type="text"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '13px'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Assigned Role (Authority) *
              </label>
              <select
                value={formData.roleSlug}
                onChange={(e) => setFormData({ ...formData, roleSlug: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '13px',
                  backgroundColor: '#FFF'
                }}
              >
                {SYSTEM_ROLES.map((r) => (
                  <option key={r.id} value={r.slug}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Department *
              </label>
              <select
                value={formData.departmentId}
                onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '13px',
                  backgroundColor: '#FFF'
                }}
              >
                {DEPARTMENTS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Designation
              </label>
              <input
                type="text"
                placeholder="e.g. Telecaller Lead"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '13px'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Work Mode
              </label>
              <select
                value={formData.workMode}
                onChange={(e) => setFormData({ ...formData, workMode: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '13px',
                  backgroundColor: '#FFF'
                }}
              >
                <option value="Office">Office</option>
                <option value="WFH">Work From Home (WFH)</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
            <button
              type="button"
              onClick={() => {
                setIsAddModalOpen(false);
                setEditingUser(null);
              }}
              style={{
                padding: '10px 16px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                background: '#FFF',
                color: '#475569',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                border: 'none',
                background: '#1467FF',
                color: '#FFF',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(20, 103, 255, 0.25)'
              }}
            >
              {editingUser ? 'Save Changes' : 'Create User'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
