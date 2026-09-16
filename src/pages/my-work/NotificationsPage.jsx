import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePermissions } from '../../context/PermissionContext';
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  subscribeToNotifications,
  NOTIFICATION_CATEGORIES
} from '../../services/mock/mockNotifications';
import { StatCard } from '../../components/common/StatCard';
import {
  Bell,
  CheckCheck,
  Filter,
  ArrowRight,
  Clock,
  AlertTriangle,
  Info,
  CalendarOff,
  Receipt,
  Truck,
  GitFork,
  ShieldAlert,
  Search
} from 'lucide-react';

const CATEGORY_ICONS = {
  ACTION_REQUIRED: AlertTriangle,
  REMINDER: Clock,
  INFO: Info
};

export const NotificationsPage = () => {
  const { can } = usePermissions();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(() => getNotifications());
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const refreshNotifs = () => {
    setNotifications(getNotifications());
  };

  useEffect(() => {
    refreshNotifs();
    const unsubscribe = subscribeToNotifications(() => {
      refreshNotifs();
    });
    return () => unsubscribe();
  }, []);

  const handleMarkAsRead = (id, e) => {
    if (e) e.stopPropagation();
    markAsRead(id);
    refreshNotifs();
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
    refreshNotifs();
  };

  const handleNotificationClick = (notif) => {
    if (!notif.isRead) {
      markAsRead(notif.id);
    }
    if (notif.link) {
      navigate(notif.link);
    }
  };

  const filteredNotifications = useMemo(() => {
    return notifications.filter((n) => {
      const matchCat = selectedCategory === 'ALL' || n.category === selectedCategory;
      const matchUnread = !showUnreadOnly || !n.isRead;
      const matchSearch =
        !searchQuery ||
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.message.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchUnread && matchSearch;
    });
  }, [notifications, selectedCategory, showUnreadOnly, searchQuery]);

  const stats = useMemo(() => {
    const total = notifications.length;
    const unread = notifications.filter((n) => !n.isRead).length;
    const actionRequired = notifications.filter((n) => n.category === 'ACTION_REQUIRED' && !n.isRead).length;
    const reminders = notifications.filter((n) => n.category === 'REMINDER' && !n.isRead).length;
    return { total, unread, actionRequired, reminders };
  }, [notifications]);

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
            <span style={{ color: '#94A3B8', fontSize: '12px' }}>• Notification Center</span>
          </div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.5px' }}>
            Notification Stream & Alerts
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748B' }}>
            Live enterprise feed across pending approvals, matchmaking SLA warnings, compliance reviews, and system notices.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {stats.unread > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 14px',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                backgroundColor: '#FFFFFF',
                color: '#1467FF',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <CheckCheck size={16} />
              Mark All as Read ({stats.unread})
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
          title="Unread Alerts"
          value={String(stats.unread)}
          change={`${stats.total} Total Feed`}
          isPositive={stats.unread === 0}
          icon={Bell}
          iconColor="#EF4444"
          iconBg="#FEF2F2"
        />
        <StatCard
          title="Action Required"
          value={String(stats.actionRequired)}
          change="Pending Approvals"
          isPositive={false}
          icon={AlertTriangle}
          iconColor="#EA580C"
          iconBg="#FFEDD5"
        />
        <StatCard
          title="SLA Reminders"
          value={String(stats.reminders)}
          change="Operations & CRM"
          isPositive={true}
          icon={Clock}
          iconColor="#F59E0B"
          iconBg="#FEF3C7"
        />
        <StatCard
          title="Read Status"
          value={`${Math.round(((stats.total - stats.unread) / stats.total) * 100)}%`}
          change="Acknowledged"
          isPositive={true}
          icon={CheckCheck}
          iconColor="#10B981"
          iconBg="#ECFDF5"
        />
      </div>

      {/* 3. Filter Bar & Categories */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '14px',
          padding: '16px',
          marginBottom: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {NOTIFICATION_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    padding: '7px 14px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: isActive ? '#0B223A' : '#F1F5F9',
                    color: isActive ? '#FFFFFF' : '#475569',
                    fontSize: '12px',
                    fontWeight: isActive ? 700 : 500,
                    cursor: 'pointer'
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#334155', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={showUnreadOnly}
              onChange={(e) => setShowUnreadOnly(e.target.checked)}
              style={{ cursor: 'pointer' }}
            />
            Show unread only
          </label>
        </div>

        <div style={{ position: 'relative' }}>
          <Search
            size={16}
            color="#94A3B8"
            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
          />
          <input
            type="text"
            placeholder="Search notification messages, entity IDs..."
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
      </div>

      {/* 4. Notifications List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredNotifications.length === 0 ? (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '40px 20px',
              textAlign: 'center',
              color: '#64748B'
            }}
          >
            <CheckCheck size={32} color="#10B981" style={{ margin: '0 auto 8px' }} />
            <p style={{ margin: 0, fontWeight: 600 }}>All caught up! No notifications to display.</p>
          </div>
        ) : (
          filteredNotifications.map((notif) => {
            const Icon = CATEGORY_ICONS[notif.category] || Info;
            const isAction = notif.category === 'ACTION_REQUIRED';
            return (
              <div
                key={notif.id}
                onClick={() => handleNotificationClick(notif)}
                style={{
                  backgroundColor: notif.isRead ? '#FFFFFF' : '#F0F7FF',
                  border: notif.isRead ? '1px solid #E2E8F0' : '1px solid #BFDBFE',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '16px',
                  cursor: notif.link ? 'pointer' : 'default',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                  boxShadow: notif.isRead ? 'none' : '0 2px 8px rgba(20, 103, 255, 0.06)'
                }}
                onMouseEnter={(e) => {
                  if (notif.link) e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  if (notif.link) e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flex: 1 }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      backgroundColor: isAction ? '#FEF2F2' : notif.category === 'REMINDER' ? '#FEF3C7' : '#EFF6FF',
                      color: isAction ? '#DC2626' : notif.category === 'REMINDER' ? '#D97706' : '#1467FF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Icon size={18} />
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 800,
                          padding: '2px 8px',
                          borderRadius: '999px',
                          backgroundColor: isAction ? '#FEF2F2' : '#F1F5F9',
                          color: isAction ? '#DC2626' : '#475569'
                        }}
                      >
                        {notif.category.replace('_', ' ')}
                      </span>
                      <span style={{ fontSize: '11px', color: '#94A3B8' }}>• {notif.timestamp}</span>
                      {!notif.isRead && (
                        <span
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: '#1467FF',
                            display: 'inline-block'
                          }}
                        />
                      )}
                    </div>

                    <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>
                      {notif.title}
                    </h4>
                    <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: 1.4 }}>
                      {notif.message}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                  {!notif.isRead && (
                    <button
                      onClick={(e) => handleMarkAsRead(notif.id, e)}
                      style={{
                        padding: '6px 10px',
                        borderRadius: '6px',
                        border: '1px solid #E2E8F0',
                        backgroundColor: '#FFFFFF',
                        color: '#64748B',
                        fontSize: '11px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Mark read
                    </button>
                  )}
                  {notif.link && (
                    <div style={{ color: '#1467FF', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 700 }}>
                      View Record <ArrowRight size={14} />
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
