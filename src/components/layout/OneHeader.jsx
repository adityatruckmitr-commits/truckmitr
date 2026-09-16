import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { usePermissions } from '../../context/PermissionContext';
import {
  Search,
  Bell,
  ChevronDown,
  LogOut,
  User,
  Shield,
  CheckCircle2,
  AlertCircle,
  Menu
} from 'lucide-react';
import { SYSTEM_ROLES } from '../../utils/rbacConstants';
import {
  getNotifications,
  subscribeToNotifications,
  getUnreadNotificationsCount
} from '../../services/mock/mockNotifications';

export const OneHeader = ({ onOpenCommandPalette, onToggleMobileSidebar }) => {
  const navigate = useNavigate();
  const { currentUser, activeRole, switchRole, logout } = useAuth();
  const { accessibleModules } = usePermissions();

  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notificationsList, setNotificationsList] = useState(() => getNotifications());

  const unreadNotifCount = notificationsList.filter((n) => !n.isRead).length;

  useEffect(() => {
    const unsub = subscribeToNotifications(() => {
      setNotificationsList(getNotifications());
    });
    return () => unsub();
  }, []);

  const roleDropdownRef = useRef(null);
  const userMenuRef = useRef(null);
  const notifRef = useRef(null);

  // Close popovers on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (roleDropdownRef.current && !roleDropdownRef.current.contains(e.target)) {
        setIsRoleDropdownOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentRoleObj = SYSTEM_ROLES.find((r) => r.slug === activeRole) || SYSTEM_ROLES[0];

  const handleRoleSwitch = (roleSlug) => {
    switchRole(roleSlug);
    setIsRoleDropdownOpen(false);
    navigate(`/one/dashboard/${roleSlug}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/one/login');
  };

  return (
    <header
      style={{
        height: '64px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
      }}
    >
      {/* Left: Mobile Toggle & Global Search Trigger */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, maxWidth: '650px' }}>
        {onToggleMobileSidebar && (
          <button
            onClick={onToggleMobileSidebar}
            style={{
              border: 'none',
              background: 'transparent',
              padding: '6px',
              cursor: 'pointer',
              color: '#475569',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Menu size={20} />
          </button>
        )}

        {/* Global Search Button */}
        <div
          onClick={onOpenCommandPalette}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '8px 14px',
            width: '100%',
            maxWidth: '520px',
            cursor: 'pointer',
            transition: 'all 0.15s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#93C5FD';
            e.currentTarget.style.backgroundColor = '#EFF6FF';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#E2E8F0';
            e.currentTarget.style.backgroundColor = '#F8FAFC';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#64748B', fontSize: '13px' }}>
            <Search size={16} color="#64748B" />
            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Search anything... (Driver TMID, Job ID, Transporter, Employee, Call, Payment etc.)
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #CBD5E1',
              borderRadius: '6px',
              padding: '2px 7px',
              fontSize: '11px',
              fontWeight: 700,
              color: '#475569',
              flexShrink: 0
            }}
          >
            Ctrl + K
          </div>
        </div>
      </div>

      {/* Right Controls: Dev Badge, Role Switcher, Notification Bell, User Menu */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Dev Mode Indicator */}
        {Boolean(import.meta.env?.DEV || process.env.NODE_ENV === 'development') && (
          <div
            title="Development Testing Environment: Live role switcher and quick test logins active"
            style={{
              padding: '3px 8px',
              borderRadius: '6px',
              backgroundColor: '#FEF3C7',
              border: '1px solid #FDE68A',
              color: '#B45309',
              fontSize: '10px',
              fontWeight: 800,
              letterSpacing: '0.5px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
            DEV MODE
          </div>
        )}

        {/* Role Switcher Dropdown */}
        <div ref={roleDropdownRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: currentRoleObj.bgColor,
              border: `1px solid ${currentRoleObj.color}33`,
              color: currentRoleObj.color,
              padding: '6px 12px',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s'
            }}
          >
            <span>{currentRoleObj.badge}</span>
            <ChevronDown size={14} />
          </button>


          {isRoleDropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: '110%',
                right: 0,
                width: '260px',
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.12)',
                padding: '8px',
                zIndex: 50
              }}
            >
              <div style={{ padding: '8px 10px', fontSize: '11px', fontWeight: 700, color: '#64748B', borderBottom: '1px solid #F1F5F9' }}>
                SWITCH ACTIVE ROLE (DEMO & TEST)
              </div>
              {SYSTEM_ROLES.map((role) => {
                const isActive = role.slug === activeRole;
                return (
                  <button
                    key={role.id}
                    onClick={() => handleRoleSwitch(role.slug)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: isActive ? '#EFF6FF' : 'transparent',
                      color: isActive ? '#1467FF' : '#334155',
                      fontSize: '13px',
                      fontWeight: isActive ? 700 : 500,
                      cursor: 'pointer',
                      margin: '2px 0'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = '#F8FAFC';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>{role.badge.split(' ')[0]}</span>
                      <span>{role.name}</span>
                    </span>
                    {isActive && <CheckCircle2 size={15} color="#1467FF" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Notifications Bell */}
        <div ref={notifRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            style={{
              position: 'relative',
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              border: '1px solid #E2E8F0',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#475569'
            }}
          >
            <Bell size={18} />
            {unreadNotifCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  backgroundColor: '#EF4444',
                  color: '#FFFFFF',
                  fontSize: '10px',
                  fontWeight: 800,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #FFFFFF'
                }}
              >
                {unreadNotifCount}
              </span>
            )}
          </button>

          {isNotifOpen && (
            <div
              style={{
                position: 'absolute',
                top: '110%',
                right: 0,
                width: '340px',
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.12)',
                padding: '14px',
                zIndex: 50
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>
                  Notifications ({unreadNotifCount} unread)
                </span>
                <span
                  style={{ fontSize: '11px', color: '#1467FF', fontWeight: 600, cursor: 'pointer' }}
                  onClick={() => {
                    setIsNotifOpen(false);
                    navigate('/one/notifications');
                  }}
                >
                  View All →
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '280px', overflowY: 'auto' }}>
                {notificationsList.slice(0, 4).map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => {
                      setIsNotifOpen(false);
                      if (notif.link) navigate(notif.link);
                    }}
                    style={{
                      padding: '10px',
                      borderRadius: '8px',
                      backgroundColor: notif.isRead ? '#F8FAFC' : '#EFF6FF',
                      fontSize: '12px',
                      cursor: notif.link ? 'pointer' : 'default',
                      border: notif.isRead ? '1px solid #F1F5F9' : '1px solid #BFDBFE'
                    }}
                  >
                    <strong style={{ color: notif.category === 'ACTION_REQUIRED' ? '#DC2626' : '#1E293B', display: 'block' }}>
                      {notif.title}
                    </strong>
                    <p style={{ margin: '2px 0 0', color: '#64748B', fontSize: '11px', lineHeight: 1.3 }}>
                      {notif.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar Menu */}
        <div ref={userMenuRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <img
              src={currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80'}
              alt={currentUser?.name || 'User'}
              style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #E2E8F0' }}
            />
            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', lineHeight: 1.2 }}>
                {currentUser?.name || 'Anil Kumar'}
              </span>
              <span style={{ fontSize: '11px', color: '#64748B' }}>
                {currentRoleObj.shortName}
              </span>
            </div>
            <ChevronDown size={14} color="#64748B" />
          </button>

          {isUserMenuOpen && (
            <div
              style={{
                position: 'absolute',
                top: '110%',
                right: 0,
                width: '220px',
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.12)',
                padding: '8px',
                zIndex: 50
              }}
            >
              <div style={{ padding: '8px 10px', borderBottom: '1px solid #F1F5F9' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>{currentUser?.name}</div>
                <div style={{ fontSize: '11px', color: '#64748B' }}>{currentUser?.email}</div>
              </div>
              <button
                onClick={() => {
                  setIsUserMenuOpen(false);
                  navigate('/one/users');
                }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '9px 10px',
                  borderRadius: '6px',
                  border: 'none',
                  background: 'transparent',
                  color: '#334155',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                <User size={14} /> Profile & Settings
              </button>
              <button
                onClick={handleLogout}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '9px 10px',
                  borderRadius: '6px',
                  border: 'none',
                  background: 'transparent',
                  color: '#EF4444',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
