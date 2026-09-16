import React, { useState } from 'react';
import { usePermissions } from '../../../context/PermissionContext';
import { useAuth } from '../../../context/AuthContext';
import { StatusBadge } from '../../../components/common/StatusBadge';
import {
  ShieldCheck,
  Shield,
  Users,
  CheckCircle2,
  XCircle,
  Eye,
  Plus,
  Edit,
  Trash,
  CheckSquare,
  Download,
  RotateCcw,
  Layers,
  Search,
  Lock,
  ArrowRight
} from 'lucide-react';
import { SYSTEM_ROLES, SYSTEM_MODULES, ACTIONS, SCOPES, SECTIONS } from '../../../utils/rbacConstants';

export const RolesPermissionsPage = () => {
  const {
    rolePermissions,
    updateRolePermission,
    updateRoleScope,
    bulkSetModulePermissions,
    resetToDefaultPermissions
  } = usePermissions();

  const { users, activeRole, switchRole } = useAuth();

  // Selected Role in the editor (defaults to current active role or CEO)
  const [selectedRoleId, setSelectedRoleId] = useState('role-telecaller');
  const [searchModule, setSearchModule] = useState('');
  const [selectedSection, setSelectedSection] = useState('ALL');
  const [successToast, setSuccessToast] = useState('');

  const selectedRoleObj = SYSTEM_ROLES.find((r) => r.id === selectedRoleId) || SYSTEM_ROLES[0];
  const rolePerms = rolePermissions[selectedRoleId] || {};

  // Count users holding each role
  const getUserCountByRole = (roleSlug) => {
    return users.filter((u) => u.roleSlug === roleSlug).length;
  };

  // Filter modules
  const filteredModules = SYSTEM_MODULES.filter((mod) => {
    const matchesSearch =
      mod.name.toLowerCase().includes(searchModule.toLowerCase()) ||
      mod.slug.toLowerCase().includes(searchModule.toLowerCase()) ||
      mod.description.toLowerCase().includes(searchModule.toLowerCase());

    const matchesSection = selectedSection === 'ALL' || mod.section === selectedSection;

    return matchesSearch && matchesSection;
  });

  const handleToggle = (moduleSlug, action) => {
    const currentValue = rolePerms[moduleSlug] ? rolePerms[moduleSlug][action] : false;
    updateRolePermission(selectedRoleId, moduleSlug, action, !currentValue);
    showToast(`Updated ${moduleSlug}:${action} for ${selectedRoleObj.name}`);
  };

  const handleScopeChange = (moduleSlug, newScope) => {
    updateRoleScope(selectedRoleId, moduleSlug, newScope);
    showToast(`Updated scope for ${moduleSlug} to ${newScope}`);
  };

  const showToast = (msg) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(''), 3000);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1440px', margin: '0 auto', fontFamily: "'Inter', sans-serif" }}>
      {/* Toast Notification */}
      {successToast && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: '#0F172A',
            color: '#FFFFFF',
            padding: '12px 20px',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            zIndex: 99999
          }}
        >
          <CheckCircle2 size={16} color="#10B981" />
          {successToast}
        </div>
      )}

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
            <span style={{ fontSize: '12px', color: '#1467FF', fontWeight: 600 }}>Roles & Permissions</span>
          </div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#0F172A' }}>
            Roles & Dynamic Permission Matrix
          </h1>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748B' }}>
            Define roles, gate module visibility, and configure action permissions with row-level scoping.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => {
              if (window.confirm('Reset all roles and permissions to initial defaults?')) {
                resetToDefaultPermissions();
                showToast('Permissions reset to initial system defaults');
              }
            }}
            style={{
              backgroundColor: '#FFF',
              border: '1px solid #CBD5E1',
              color: '#475569',
              borderRadius: '10px',
              padding: '9px 14px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <RotateCcw size={14} />
            Reset Defaults
          </button>
        </div>
      </div>

      {/* Role Selector Cards Bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '14px',
          marginBottom: '24px'
        }}
      >
        {SYSTEM_ROLES.map((role) => {
          const isSelected = role.id === selectedRoleId;
          const userCount = getUserCountByRole(role.slug);

          return (
            <div
              key={role.id}
              onClick={() => setSelectedRoleId(role.id)}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                border: isSelected ? `2px solid ${role.color}` : '1px solid #E2E8F0',
                padding: '16px',
                cursor: 'pointer',
                transition: 'all 0.18s',
                boxShadow: isSelected ? `0 8px 20px rgba(20, 103, 255, 0.12)` : 'none',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '6px',
                    backgroundColor: role.bgColor,
                    color: role.color
                  }}
                >
                  Level {role.hierarchyLevel}
                </span>
                <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>
                  {userCount} {userCount === 1 ? 'User' : 'Users'}
                </span>
              </div>

              <div style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
                {role.name}
              </div>
              <div style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.3 }}>
                {role.description}
              </div>

              {isSelected && (
                <div
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: role.color
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Editor Main Container */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '16px',
          padding: '20px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)'
        }}
      >
        {/* Editor Toolbar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '12px',
            borderBottom: '1px solid #F1F5F9',
            paddingBottom: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                backgroundColor: selectedRoleObj.bgColor,
                color: selectedRoleObj.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800
              }}
            >
              <ShieldCheck size={20} />
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>
                Configuring: {selectedRoleObj.name}
              </div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>
                Total {SYSTEM_MODULES.length} system modules available for policy definition.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {/* Module Search */}
            <div style={{ position: 'relative', width: '220px' }}>
              <Search
                size={14}
                color="#94A3B8"
                style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                type="text"
                placeholder="Search modules..."
                value={searchModule}
                onChange={(e) => setSearchModule(e.target.value)}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '7px 10px 7px 30px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '12px'
                }}
              />
            </div>

            {/* Section Filter */}
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              style={{
                padding: '7px 10px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '12px',
                backgroundColor: '#FFF',
                fontWeight: 600,
                color: '#334155'
              }}
            >
              <option value="ALL">All Sections</option>
              {Object.keys(SECTIONS).map((secKey) => (
                <option key={secKey} value={secKey}>
                  {SECTIONS[secKey].label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Matrix Grid Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569' }}>
                <th style={{ padding: '12px 16px', fontWeight: 700, width: '28%' }}>Module & Purpose</th>
                <th style={{ padding: '12px 10px', fontWeight: 700, textAlign: 'center', width: '9%' }}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                    <Eye size={13} color="#0284C7" /> View
                  </span>
                </th>
                <th style={{ padding: '12px 10px', fontWeight: 700, textAlign: 'center', width: '9%' }}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                    <Plus size={13} color="#10B981" /> Create
                  </span>
                </th>
                <th style={{ padding: '12px 10px', fontWeight: 700, textAlign: 'center', width: '9%' }}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                    <Edit size={13} color="#F59E0B" /> Edit
                  </span>
                </th>
                <th style={{ padding: '12px 10px', fontWeight: 700, textAlign: 'center', width: '9%' }}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                    <Trash size={13} color="#EF4444" /> Delete
                  </span>
                </th>
                <th style={{ padding: '12px 10px', fontWeight: 700, textAlign: 'center', width: '10%' }}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                    <CheckSquare size={13} color="#9333EA" /> Approve
                  </span>
                </th>
                <th style={{ padding: '12px 10px', fontWeight: 700, textAlign: 'center', width: '9%' }}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                    <Download size={13} color="#475569" /> Export
                  </span>
                </th>
                <th style={{ padding: '12px 14px', fontWeight: 700, width: '17%' }}>Row Scope</th>
              </tr>
            </thead>
            <tbody>
              {filteredModules.map((mod) => {
                const currentPerms = rolePerms[mod.slug] || {
                  view: false,
                  create: false,
                  edit: false,
                  delete: false,
                  approve: false,
                  export: false,
                  scope: 'ALL'
                };

                return (
                  <tr
                    key={mod.id}
                    style={{
                      borderBottom: '1px solid #F1F5F9',
                      transition: 'background 0.15s'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    {/* Module Info */}
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <div
                          style={{
                            padding: '6px',
                            borderRadius: '8px',
                            backgroundColor: '#F1F5F9',
                            color: '#475569',
                            marginTop: '2px'
                          }}
                        >
                          <Layers size={14} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                            {mod.name}
                            <span
                              style={{
                                fontSize: '10px',
                                padding: '1px 6px',
                                borderRadius: '4px',
                                backgroundColor: '#EFF6FF',
                                color: '#1D4ED8',
                                fontWeight: 700
                              }}
                            >
                              {mod.section}
                            </span>
                            {['revenue', 'matchmaking', 'crm', 'employees', 'roles'].includes(mod.slug) && (
                              <span
                                title="Dashboards for this module enforce an additional role allowlist because they consolidate executive cross-departmental data."
                                style={{
                                  fontSize: '10px',
                                  padding: '1px 6px',
                                  borderRadius: '4px',
                                  backgroundColor: '#FEF3C7',
                                  color: '#B45309',
                                  border: '1px solid #FDE68A',
                                  fontWeight: 700,
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '3px'
                                }}
                              >
                                <Lock size={9} /> Role-Locked Dashboard
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                            {mod.description}
                          </div>
                        </div>

                      </div>
                    </td>

                    {/* Checkboxes for 6 Actions */}
                    {ACTIONS.map((act) => {
                      const isActionAllowed = mod.allowedActions.includes(act.id);
                      const isChecked = Boolean(currentPerms[act.id]);

                      return (
                        <td key={act.id} style={{ padding: '12px 10px', textAlign: 'center' }}>
                          {isActionAllowed ? (
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleToggle(mod.slug, act.id)}
                              style={{
                                width: '16px',
                                height: '16px',
                                accentColor: '#1467FF',
                                cursor: 'pointer'
                              }}
                            />
                          ) : (
                            <span style={{ color: '#CBD5E1', fontSize: '12px' }}>—</span>
                          )}
                        </td>
                      );
                    })}

                    {/* Scope Selector */}
                    <td style={{ padding: '12px 14px' }}>
                      <select
                        value={currentPerms.scope || 'ALL'}
                        onChange={(e) => handleScopeChange(mod.slug, e.target.value)}
                        style={{
                          width: '100%',
                          padding: '5px 8px',
                          borderRadius: '6px',
                          border: '1px solid #CBD5E1',
                          fontSize: '11px',
                          backgroundColor: '#FFF',
                          fontWeight: 600,
                          color: '#334155'
                        }}
                      >
                        <option value="ALL">All Records</option>
                        <option value="DEPARTMENT">Department Only</option>
                        <option value="ASSIGNED_ONLY">Assigned Only</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
