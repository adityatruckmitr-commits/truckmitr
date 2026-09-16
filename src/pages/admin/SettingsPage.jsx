import React, { useState, useEffect } from 'react';
import { usePermissions } from '../../context/PermissionContext';
import { StatCard } from '../../components/common/StatCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  getSystemSettings,
  saveSystemSettings
} from '../../services/mock/mockSettings';
import {
  Settings,
  Building,
  Bell,
  Link,
  ShieldCheck,
  Save,
  CheckCircle2,
  RefreshCw,
  AlertTriangle,
  Lock,
  Globe,
  Sliders,
  Database,
  Trash2
} from 'lucide-react';

export const SettingsPage = () => {
  const { can } = usePermissions();
  const [settings, setSettings] = useState(getSystemSettings());
  const [activeTab, setActiveTab] = useState('company'); // 'company' | 'notifications' | 'integrations' | 'security'
  const [isSavedToast, setIsSavedToast] = useState(false);
  const [cachePurgedToast, setCachePurgedToast] = useState(false);

  useEffect(() => {
    const handleUpdate = () => setSettings(getSystemSettings());
    window.addEventListener('tm_settings_updated', handleUpdate);
    return () => window.removeEventListener('tm_settings_updated', handleUpdate);
  }, []);

  if (!can('settings', 'view')) {
    return (
      <div style={{ padding: '40px 24px', textAlign: 'center' }}>
        <div
          style={{
            maxWidth: '480px',
            margin: '0 auto',
            backgroundColor: '#FFFFFF',
            padding: '32px',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#FEE2E2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}
          >
            <Lock size={28} color="#EF4444" />
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', margin: '0 0 8px' }}>
            403 — Unauthorized Access
          </h2>
          <p style={{ fontSize: '13px', color: '#64748B', lineHeight: '1.5', margin: 0 }}>
            System Settings is an organization-wide administrative console restricted to Super Administrators and Executive Management.
          </p>
        </div>
      </div>
    );
  }

  const handleSaveCompany = (e) => {
    e.preventDefault();
    saveSystemSettings(settings);
    setIsSavedToast(true);
    setTimeout(() => setIsSavedToast(false), 3000);
  };

  const handleToggleNotification = (id) => {
    const updated = {
      ...settings,
      notifications: settings.notifications.map((n) =>
        n.id === id ? { ...n, enabled: !n.enabled } : n
      )
    };
    setSettings(updated);
    saveSystemSettings(updated);
  };

  const handleToggleIntegration = (id) => {
    const updated = {
      ...settings,
      integrations: settings.integrations.map((item) => {
        if (item.id === id) {
          const newStatus = item.status === 'CONNECTED' ? 'DISCONNECTED' : 'CONNECTED';
          return {
            ...item,
            status: newStatus,
            lastSync: newStatus === 'CONNECTED' ? new Date().toISOString().replace('T', ' ').substring(0, 19) : item.lastSync
          };
        }
        return item;
      })
    };
    setSettings(updated);
    saveSystemSettings(updated);
  };

  const handlePurgeCache = () => {
    setCachePurgedToast(true);
    setTimeout(() => setCachePurgedToast(false), 3000);
  };

  const connectedCount = settings.integrations.filter((i) => i.status === 'CONNECTED').length;

  return (
    <div style={{ padding: '24px', maxWidth: '1440px', margin: '0 auto' }}>
      {/* Toast */}
      {isSavedToast && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: '#0F172A',
            color: '#FFFFFF',
            padding: '14px 20px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            zIndex: 1000,
            borderLeft: '4px solid #10B981',
            fontSize: '13px',
            fontWeight: 600
          }}
        >
          <CheckCircle2 size={18} color="#10B981" />
          <span>System Settings successfully saved & synchronized!</span>
        </div>
      )}

      {cachePurgedToast && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: '#0F172A',
            color: '#FFFFFF',
            padding: '14px 20px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            zIndex: 1000,
            borderLeft: '4px solid #F59E0B',
            fontSize: '13px',
            fontWeight: 600
          }}
        >
          <RefreshCw size={18} color="#F59E0B" className="animate-spin" />
          <span>Application cache purged and RBAC session tables re-indexed!</span>
        </div>
      )}

      {/* Header Banner */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
            System Settings & Governance
          </h1>
          <p style={{ color: '#64748B', fontSize: '14px', margin: '4px 0 0' }}>
            Organization identity profile, automated notification preferences, third-party API gateways, and security policies.
          </p>
        </div>
      </div>

      {/* StatCards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}
      >
        <StatCard
          title="Connected API Gateways"
          value={`${connectedCount} of ${settings.integrations.length}`}
          change="Razorpay, Gupshup, Surepass"
          isPositive={true}
          iconColor="#1467FF"
          iconBg="#EFF6FF"
          icon={Link}
        />
        <StatCard
          title="2FA Security Policy"
          value="Enforced (Active)"
          change="All Admin & CEO logins"
          isPositive={true}
          iconColor="#10B981"
          iconBg="#ECFDF5"
          icon={ShieldCheck}
        />
        <StatCard
          title="Session Idle Timeout"
          value={`${settings.security.sessionTimeoutMinutes} Minutes`}
          change="Standard Enterprise Policy"
          isPositive={true}
          iconColor="#059669"
          iconBg="#ECFDF5"
          icon={Lock}
        />
        <StatCard
          title="Audit Log Retention"
          value={`${settings.security.auditRetentionDays} Days`}
          change="Compliance Standard"
          isPositive={true}
          iconColor="#8B5CF6"
          iconBg="#F3E8FF"
          icon={Database}
        />
      </div>

      {/* View Tabs */}
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid #E2E8F0',
          marginBottom: '24px',
          gap: '24px'
        }}
      >
        {[
          { id: 'company', label: 'Company Profile & Legal', icon: Building },
          { id: 'notifications', label: 'Notification Preferences', icon: Bell },
          { id: 'integrations', label: 'API & Gateway Integrations', icon: Link },
          { id: 'security', label: 'Security & Access Policy', icon: ShieldCheck }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 4px',
                border: 'none',
                background: 'none',
                fontSize: '14px',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? '#1467FF' : '#64748B',
                borderBottom: isActive ? '2px solid #1467FF' : '2px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Company Profile */}
      {activeTab === 'company' && (
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '24px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', marginTop: 0, marginBottom: '20px' }}>
            Corporate Identity & Registered Headquarters
          </h3>

          <form onSubmit={handleSaveCompany} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '720px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                Legal Corporate Name
              </label>
              <input
                type="text"
                value={settings.company.companyName}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    company: { ...settings.company, companyName: e.target.value }
                  })
                }
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  fontSize: '13px'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                Brand Tagline
              </label>
              <input
                type="text"
                value={settings.company.brandTagline}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    company: { ...settings.company, brandTagline: e.target.value }
                  })
                }
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  fontSize: '13px'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                  CIN Number
                </label>
                <input
                  type="text"
                  value={settings.company.cin}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      company: { ...settings.company, cin: e.target.value }
                    })
                  }
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                  GSTIN
                </label>
                <input
                  type="text"
                  value={settings.company.gstin}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      company: { ...settings.company, gstin: e.target.value }
                    })
                  }
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13px'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                Headquarters Address
              </label>
              <textarea
                rows={2}
                value={settings.company.headquarters}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    company: { ...settings.company, headquarters: e.target.value }
                  })
                }
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  fontSize: '13px',
                  resize: 'none'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                  Primary Email
                </label>
                <input
                  type="email"
                  value={settings.company.primaryEmail}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      company: { ...settings.company, primaryEmail: e.target.value }
                    })
                  }
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                  Toll-Free Helpline
                </label>
                <input
                  type="text"
                  value={settings.company.supportPhone}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      company: { ...settings.company, supportPhone: e.target.value }
                    })
                  }
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13px'
                  }}
                />
              </div>
            </div>

            {can('settings', 'edit') && (
              <div style={{ marginTop: '12px' }}>
                <button
                  type="submit"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 24px',
                    backgroundColor: '#1467FF',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  <Save size={16} /> Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      )}

      {/* TAB 2: Notification Preferences */}
      {activeTab === 'notifications' && (
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '24px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', marginTop: 0, marginBottom: '6px' }}>
            Organization-wide Automated Trigger Rules
          </h3>
          <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '20px' }}>
            Configure which events trigger real-time SMS, Email, and Push alerts to executive stakeholders.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {settings.notifications.map((n) => (
              <div
                key={n.id}
                style={{
                  padding: '18px',
                  borderRadius: '10px',
                  border: '1px solid #E2E8F0',
                  backgroundColor: n.enabled ? '#F8FAFC' : '#FFFFFF',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '16px'
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '14px' }}>{n.title}</div>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        padding: '2px 8px',
                        borderRadius: '4px',
                        backgroundColor: '#EFF6FF',
                        color: '#1E40AF'
                      }}
                    >
                      {n.channel}
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', color: '#64748B' }}>{n.description}</div>
                </div>

                {can('settings', 'edit') && (
                  <button
                    onClick={() => handleToggleNotification(n.id)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '20px',
                      border: 'none',
                      fontSize: '12px',
                      fontWeight: 700,
                      backgroundColor: n.enabled ? '#10B981' : '#E2E8F0',
                      color: n.enabled ? '#FFFFFF' : '#475569',
                      cursor: 'pointer',
                      minWidth: '90px'
                    }}
                  >
                    {n.enabled ? 'Enabled' : 'Disabled'}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Integrations */}
      {activeTab === 'integrations' && (
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '24px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', marginTop: 0, marginBottom: '6px' }}>
            External API Connectors & Microservices
          </h3>
          <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '20px' }}>
            Manage real-time communication, identity verification, payment gateways, and accounting synchronization.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {settings.integrations.map((item) => {
              const isConnected = item.status === 'CONNECTED';
              return (
                <div
                  key={item.id}
                  style={{
                    padding: '20px',
                    borderRadius: '10px',
                    border: '1px solid #E2E8F0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '16px'
                  }}
                >
                  <div style={{ flex: 1, minWidth: '280px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                      <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '15px' }}>{item.name}</div>
                      <StatusBadge status={item.status} variant={isConnected ? 'success' : 'neutral'} />
                    </div>
                    <div style={{ fontSize: '13px', color: '#64748B', marginBottom: '6px' }}>{item.description}</div>
                    <div style={{ fontSize: '11px', color: '#94A3B8' }}>
                      Key: <code>{item.apiKeyMasked}</code> • Last Sync: {item.lastSync}
                    </div>
                  </div>

                  {can('settings', 'edit') && (
                    <button
                      onClick={() => handleToggleIntegration(item.id)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '6px',
                        border: isConnected ? '1px solid #EF4444' : '1px solid #1467FF',
                        backgroundColor: '#FFFFFF',
                        color: isConnected ? '#EF4444' : '#1467FF',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {isConnected ? 'Disconnect' : 'Connect Gateway'}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: Security Policy */}
      {activeTab === 'security' && (
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '24px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', marginTop: 0, marginBottom: '20px' }}>
            Session Security & RBAC Maintenance
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '640px' }}>
            <div
              style={{
                padding: '16px',
                borderRadius: '8px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '14px' }}>Session Idle Inactivity Timeout</div>
                <div style={{ fontSize: '12px', color: '#64748B' }}>Automatically terminate user session after inactivity</div>
              </div>
              <select
                value={settings.security.sessionTimeoutMinutes}
                onChange={(e) => {
                  const updated = {
                    ...settings,
                    security: { ...settings.security, sessionTimeoutMinutes: e.target.value }
                  };
                  setSettings(updated);
                  saveSystemSettings(updated);
                }}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  fontSize: '13px',
                  backgroundColor: '#FFFFFF'
                }}
              >
                <option value="15">15 Minutes</option>
                <option value="30">30 Minutes</option>
                <option value="60">1 Hour</option>
                <option value="240">4 Hours</option>
              </select>
            </div>

            <div
              style={{
                padding: '16px',
                borderRadius: '8px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '14px' }}>Two-Factor Authentication (2FA)</div>
                <div style={{ fontSize: '12px', color: '#64748B' }}>Mandate SMS / Authenticator OTP on high-privilege roles</div>
              </div>
              <button
                onClick={() => {
                  const updated = {
                    ...settings,
                    security: { ...settings.security, require2FA: !settings.security.require2FA }
                  };
                  setSettings(updated);
                  saveSystemSettings(updated);
                }}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: 700,
                  backgroundColor: settings.security.require2FA ? '#10B981' : '#CBD5E1',
                  color: '#FFFFFF',
                  cursor: 'pointer'
                }}
              >
                {settings.security.require2FA ? 'Enforced' : 'Optional'}
              </button>
            </div>

            <div
              style={{
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid #FEE2E2',
                backgroundColor: '#FFF5F5',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ fontWeight: 700, color: '#B91C1C', fontSize: '14px' }}>Purge Application Cache & Re-index</div>
                <div style={{ fontSize: '12px', color: '#EF4444' }}>
                  Forces a hard clear of cached permission maps, lookup trees, and temporary tokens.
                </div>
              </div>
              <button
                onClick={handlePurgeCache}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: '#EF4444',
                  color: '#FFFFFF',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <Trash2 size={14} /> Purge Cache
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
