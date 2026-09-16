import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { usePermissions } from '../../context/PermissionContext';
import { SIDEBAR_BADGES } from '../../services/dashboardMockData';
import { SECTIONS, SYSTEM_MODULES } from '../../utils/rbacConstants';
import { getUnifiedPendingApprovals, subscribeToApprovals } from '../../services/approvalsRegistry';
import { getNotifications, subscribeToNotifications } from '../../services/mock/mockNotifications';
import { getTasks, subscribeToTasks } from '../../services/mock/mockTasks';
import {
  Truck,
  LayoutDashboard,
  UserCheck,
  GitFork,
  PhoneCall,
  Radio,
  Handshake,
  IndianRupee,
  BarChart2,
  FileText,
  Users,
  CalendarCheck,
  CalendarOff,
  CreditCard,
  Receipt,
  Monitor,
  CheckSquare,
  CheckCircle2,
  Bell,
  UserCog,
  ShieldCheck,
  Workflow,
  History,
  Settings,
  ChevronRight
} from 'lucide-react';

// Icon Map
const ICON_MAP = {
  UserCheck,
  Truck,
  GitFork,
  PhoneCall,
  Radio,
  Handshake,
  IndianRupee,
  BarChart2,
  FileText,
  Users,
  CalendarCheck,
  CalendarOff,
  CreditCard,
  Receipt,
  Monitor,
  CheckSquare,
  CheckCircle2,
  Bell,
  UserCog,
  ShieldCheck,
  Workflow,
  History,
  Settings
};

export const OneSidebar = ({ isOpen, onClose }) => {
  const { can, activeRole } = usePermissions();
  const location = useLocation();

  // Section order
  const sectionKeys = ['OPERATIONS', 'BUSINESS', 'PEOPLE', 'MY_WORK', 'ADMINISTRATION'];

  const [dynamicBadges, setDynamicBadges] = useState(() => ({
    approvals: getUnifiedPendingApprovals().length,
    notifications: getNotifications().filter((n) => !n.isRead).length,
    tasks: getTasks().filter((t) => t.status !== 'DONE').length
  }));

  useEffect(() => {
    const unsubAppr = subscribeToApprovals(() => {
      setDynamicBadges((prev) => ({ ...prev, approvals: getUnifiedPendingApprovals().length }));
    });
    const unsubNotif = subscribeToNotifications(() => {
      setDynamicBadges((prev) => ({ ...prev, notifications: getNotifications().filter((n) => !n.isRead).length }));
    });
    const unsubTasks = subscribeToTasks(() => {
      setDynamicBadges((prev) => ({ ...prev, tasks: getTasks().filter((t) => t.status !== 'DONE').length }));
    });
    return () => {
      unsubAppr();
      unsubNotif();
      unsubTasks();
    };
  }, []);

  return (
    <aside
      style={{
        width: '260px',
        backgroundColor: '#07192B',
        backgroundImage: 'linear-gradient(180deg, #07192B 0%, #061321 100%)',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        flexShrink: 0,
        overflow: 'hidden'
      }}
    >
      {/* Brand Header */}
      <div
        style={{
          padding: '20px 22px 18px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            backgroundColor: '#1467FF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 16px rgba(20, 103, 255, 0.35)'
          }}
        >
          <Truck size={20} color="#FFFFFF" />
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 800, letterSpacing: '-0.5px' }}>
            TruckMitr <span style={{ color: '#2B83FF' }}>One</span>
          </h1>
          <small style={{ color: '#9FB7D2', fontSize: '10px', letterSpacing: '0.4px', fontWeight: 600 }}>
            PEOPLE • VEHICLES • OPPORTUNITIES
          </small>
        </div>
      </div>

      {/* Navigation Groups (Scrollable) */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
      >
        {/* Active Role Dashboard Link */}
        <div>
          <NavLink
            to={`/one/dashboard/${activeRole}`}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 14px',
              borderRadius: '10px',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 700,
              backgroundColor: isActive ? '#1467FF' : 'rgba(255, 255, 255, 0.04)',
              color: '#FFFFFF',
              boxShadow: isActive ? '0 6px 18px rgba(20, 103, 255, 0.28)' : 'none',
              transition: 'all 0.15s'
            })}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard Home</span>
          </NavLink>
        </div>

        {/* Dynamic Sections by RBAC Order */}
        {sectionKeys.map((secKey) => {
          const sectionConfig = SECTIONS[secKey];
          if (!sectionConfig) return null;

          // Filter modules in this section that current active role can view
          const sectionModules = SYSTEM_MODULES.filter(
            (m) => m.section === secKey && can(m.slug, 'view')
          );

          if (sectionModules.length === 0) return null;

          return (
            <div key={secKey}>
              {/* Section Header Label */}
              <div
                style={{
                  fontSize: '10px',
                  fontWeight: 800,
                  letterSpacing: '0.8px',
                  color: '#6D8FAD',
                  textTransform: 'uppercase',
                  padding: '4px 12px 6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>{sectionConfig.label}</span>
              </div>

              {/* Module Nav Links */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {sectionModules.map((mod) => {
                  const IconComponent = ICON_MAP[mod.icon] || LayoutDashboard;
                  
                  // Compute dynamic badge or fallback to static
                  let badgeCount = null;
                  let badgeVariant = 'danger';

                  if (mod.slug === 'approvals') {
                    badgeCount = dynamicBadges.approvals;
                    badgeVariant = 'danger';
                  } else if (mod.slug === 'notifications') {
                    badgeCount = dynamicBadges.notifications;
                    badgeVariant = 'danger';
                  } else if (mod.slug === 'tasks') {
                    badgeCount = dynamicBadges.tasks;
                    badgeVariant = 'warning';
                  } else if (SIDEBAR_BADGES[mod.slug]) {
                    badgeCount = SIDEBAR_BADGES[mod.slug].count;
                    badgeVariant = SIDEBAR_BADGES[mod.slug].variant;
                  }

                  return (
                    <NavLink
                      key={mod.id}
                      to={mod.route}
                      style={({ isActive }) => ({
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '9px 14px',
                        borderRadius: '10px',
                        textDecoration: 'none',
                        fontSize: '13px',
                        fontWeight: isActive ? 700 : 500,
                        backgroundColor: isActive ? '#1467FF' : 'transparent',
                        color: isActive ? '#FFFFFF' : '#D8E7F6',
                        boxShadow: isActive ? '0 6px 18px rgba(20, 103, 255, 0.28)' : 'none',
                        transition: 'all 0.15s'
                      })}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <IconComponent size={16} style={{ opacity: 0.9 }} />
                        <span>{mod.name}</span>
                      </div>

                      {/* Badge if pending count > 0 */}
                      {Boolean(badgeCount && badgeCount > 0) && (
                        <span
                          style={{
                            fontSize: '10px',
                            fontWeight: 800,
                            padding: '1px 6px',
                            borderRadius: '999px',
                            backgroundColor: badgeVariant === 'danger' ? '#EF4444' : '#F59E0B',
                            color: '#FFFFFF'
                          }}
                        >
                          {badgeCount}
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Banner */}
      <div
        style={{
          padding: '14px 16px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          fontSize: '11px',
          color: '#9FB7D2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <span>TruckMitr One v2.4</span>
        <span style={{ color: '#2B83FF', fontWeight: 700 }}>Internal OS</span>
      </div>
    </aside>
  );
};
