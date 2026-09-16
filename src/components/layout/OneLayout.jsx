import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { OneSidebar } from './OneSidebar';
import { OneHeader } from './OneHeader';
import { CommandPalette } from './CommandPalette';
import { usePermissions } from '../../context/PermissionContext';
import { useAuth } from '../../context/AuthContext';
import { getRouteConfig } from '../../routes/oneRouteConfig';
import { ShieldAlert, ArrowLeft, RotateCcw, Lock } from 'lucide-react';
import { SYSTEM_ROLES } from '../../utils/rbacConstants';

export const OneLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { can, hasRole, activeRole } = usePermissions();
  const { currentRoleObj, switchRole } = useAuth();

  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Lookup route requirements
  const routeMeta = getRouteConfig(location.pathname);

  // Evaluate authorization
  let isAuthorized = true;
  let rejectionReason = '';

  if (routeMeta) {
    // 1. Check role restriction if explicitly defined (e.g. CEO only)
    if (routeMeta.roles && routeMeta.roles.length > 0) {
      if (!routeMeta.roles.some((r) => hasRole(r))) {
        isAuthorized = false;
        rejectionReason = `This screen is restricted to [${routeMeta.roles.join(', ')}] roles only.`;
      }
    }

    // 2. Check module action permission (e.g. can('drivers', 'view'))
    if (isAuthorized && routeMeta.module) {
      if (!can(routeMeta.module, routeMeta.action || 'view')) {
        isAuthorized = false;
        rejectionReason = `Your active role (${currentRoleObj.name}) does not have '${routeMeta.action || 'view'}' permission on the '${routeMeta.module}' module.`;
      }
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F0F6FF', fontFamily: "'Inter', sans-serif" }}>
      {/* Fixed Left Sidebar */}
      <OneSidebar isOpen={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} />

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflowX: 'hidden' }}>
        {/* Sticky Top Bar */}
        <OneHeader
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        />

        {/* Dynamic Main Body */}
        <main style={{ flex: 1, padding: '0', minHeight: 'calc(100vh - 64px)' }}>
          {!isAuthorized ? (
            /* Standardized 403 Forbidden State */
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '70vh',
                padding: '24px'
              }}
            >
              <div
                style={{
                  maxWidth: '520px',
                  width: '100%',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '36px',
                  textAlign: 'center',
                  boxShadow: '0 20px 40px rgba(15, 35, 65, 0.08)',
                  border: '1px solid #E2E8F0'
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '16px',
                    backgroundColor: '#FEF2F2',
                    color: '#DC2626',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px auto'
                  }}
                >
                  <ShieldAlert size={32} />
                </div>

                <div
                  style={{
                    display: 'inline-block',
                    padding: '3px 10px',
                    borderRadius: '999px',
                    backgroundColor: '#FEE2E2',
                    color: '#DC2626',
                    fontSize: '11px',
                    fontWeight: 700,
                    marginBottom: '12px'
                  }}
                >
                  403 RESTRICTED ACCESS
                </div>

                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', margin: '0 0 8px 0' }}>
                  Access Denied for {currentRoleObj.badge}
                </h2>

                <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5, margin: '0 0 24px 0' }}>
                  {rejectionReason}
                </p>

                <div
                  style={{
                    backgroundColor: '#F8FAFC',
                    borderRadius: '12px',
                    padding: '14px',
                    border: '1px solid #E2E8F0',
                    fontSize: '12px',
                    color: '#475569',
                    marginBottom: '24px',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, marginBottom: '4px' }}>
                    <Lock size={14} color="#64748B" />
                    <span>RBAC Policy Enforcement</span>
                  </div>
                  <div>To view this screen, switch your simulated role in the top header or contact an administrator to update the permission matrix.</div>
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                  <button
                    onClick={() => navigate(`/one/dashboard/${activeRole}`)}
                    style={{
                      padding: '10px 18px',
                      borderRadius: '10px',
                      border: '1px solid #CBD5E1',
                      background: '#FFF',
                      color: '#334155',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <ArrowLeft size={14} /> My Dashboard
                  </button>

                  {Boolean(import.meta.env?.DEV || process.env.NODE_ENV === 'development') && (
                    <button
                      onClick={() => {
                        switchRole('admin');
                      }}
                      style={{
                        padding: '10px 18px',
                        borderRadius: '10px',
                        border: 'none',
                        background: '#1467FF',
                        color: '#FFF',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: '0 4px 14px rgba(20, 103, 255, 0.25)'
                      }}
                    >
                      <RotateCcw size={14} /> Switch to Admin (Dev Only)
                    </button>
                  )}
                </div>
              </div>
            </div>

          ) : (
            /* Authorized Outlet View */
            <Outlet />
          )}
        </main>
      </div>

      {/* Global Command Palette (Ctrl+K) */}
      <CommandPalette isOpen={isCommandPaletteOpen} onClose={() => setIsCommandPaletteOpen(false)} />
    </div>
  );
};
