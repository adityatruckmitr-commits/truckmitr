import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  ShieldCheck,
  PlusCircle,
  FileText,
  Video,
  Award,
  CreditCard,
  PhoneCall,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Wallet,
  Sparkles,
  ChevronRight,
  Truck,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../common/Badge';

export const PortalLayout = ({ children, title, subtitle }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, role, logout, switchDemoRole } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Role Navigation Map
  const getNavLinks = () => {
    switch (role) {
      case 'driver':
        return [
          { label: 'Overview', path: '/driver/dashboard', icon: LayoutDashboard },
          { label: 'Applied Jobs', path: '/driver/applied-jobs', icon: Briefcase },
          { label: 'Welfare & Training', path: '/driver/welfare', icon: Video },
          { label: 'My KYC Profile', path: '/driver/profile', icon: ShieldCheck },
          { label: 'Refer & Earn', path: '/driver/referrals', icon: Award },
        ];
      case 'transporter':
        return [
          { label: 'Fleet Overview', path: '/transporter/dashboard', icon: LayoutDashboard },
          { label: 'Post a New Job', path: '/transporter/post-job', icon: PlusCircle },
          { label: 'Manage Jobs', path: '/transporter/manage-jobs', icon: Briefcase },
          { label: 'Applicant Pipeline', path: '/transporter/candidates', icon: Users },
          { label: 'BGV Verification', path: '/transporter/verification-suite', icon: ShieldCheck },
        ];
      case 'crm':
        return [
          { label: 'CRM Dashboard', path: '/crm/dashboard', icon: LayoutDashboard },
          { label: 'Daily Call Queue', path: '/crm/calls', icon: PhoneCall },
          { label: 'Matchmaking Console', path: '/crm/matchmaking', icon: Users },
        ];
      case 'admin':
        return [
          { label: 'Admin Metrics', path: '/admin/dashboard', icon: LayoutDashboard },
          { label: 'User Operations', path: '/admin/users', icon: Users },
          { label: 'Job Moderation', path: '/admin/jobs', icon: Briefcase },
        ];
      default:
        return [
          { label: 'Public Home', path: '/', icon: LayoutDashboard },
          { label: 'Jobs', path: '/jobs', icon: Briefcase },
        ];
    }
  };

  const navLinks = getNavLinks();

  const getRoleLabel = () => {
    switch (role) {
      case 'driver': return { label: 'Verified Commercial Driver', variant: 'success' };
      case 'transporter': return { label: 'Fleet Transporter', variant: 'primary' };
      case 'crm': return { label: 'Operations & CRM', variant: 'warning' };
      case 'admin': return { label: 'Super Admin', variant: 'danger' };
      default: return { label: 'Guest User', variant: 'neutral' };
    }
  };

  const roleInfo = getRoleLabel();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-main)' }}>
      {/* Sidebar */}
      <aside
        className={`portal-sidebar ${sidebarOpen ? 'open' : ''}`}
        style={{
          width: 'var(--sidebar-width)',
          backgroundColor: 'var(--bg-surface)',
          borderRight: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 200,
          transition: 'transform 0.3s ease',
        }}
      >
        {/* Sidebar Brand Header */}
        <div
          style={{
            padding: '24px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, #FF6B00 0%, #FF9E00 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Truck color="#FFFFFF" size={20} />
            </div>
            <div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                Truck<span className="gradient-text-primary">Mitr</span>
              </span>
            </div>
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'none',
            }}
            className="mobile-sidebar-close"
          >
            <X size={20} />
          </button>
        </div>

        {/* User Card in Sidebar */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'rgba(255, 255, 255, 0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '1rem',
                border: '1px solid var(--border-primary)',
              }}
            >
              {user?.name ? user.name.charAt(0) : 'U'}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 600, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {user?.name || 'Welcome User'}
              </h4>
              <Badge variant={roleInfo.variant} size="sm">
                {roleInfo.label}
              </Badge>
            </div>
          </div>

          {user?.walletBalance !== undefined && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                borderRadius: 'var(--radius-sm)',
                marginTop: '10px',
                fontSize: '0.825rem',
              }}
            >
              <span style={{ color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Wallet size={14} color="var(--color-accent)" /> Wallet Balance
              </span>
              <strong style={{ color: 'var(--color-success)' }}>₹{user.walletBalance}</strong>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <nav style={{ flex: 1, padding: '16px 12px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {navLinks.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  color: isActive ? '#FFFFFF' : 'var(--text-muted)',
                  backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.9rem',
                  boxShadow: isActive ? '0 4px 15px var(--color-primary-glow)' : 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                {Icon && <Icon size={18} />}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Sidebar Action */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border-subtle)' }}>
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 14px',
              background: 'none',
              border: 'none',
              color: 'var(--color-danger)',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
              borderRadius: 'var(--radius-md)',
              transition: 'background 0.2s ease',
            }}
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="portal-content-wrapper" style={{ flex: 1, marginLeft: 'var(--sidebar-width)', display: 'flex', flexDirection: 'column' }}>
        {/* Top App Header */}
        <header
          className="glass-panel"
          style={{
            height: '70px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 28px',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            borderRadius: 0,
            borderTop: 'none',
            borderRight: 'none',
            backgroundColor: 'rgba(19, 27, 46, 0.75)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => setSidebarOpen(true)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-main)',
                cursor: 'pointer',
                display: 'none',
              }}
              className="mobile-sidebar-toggle"
            >
              <Menu size={22} />
            </button>

            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>{title}</h2>
              {subtitle && <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', margin: 0 }}>{subtitle}</p>}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link
              to="/"
              style={{
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              Public Site <ChevronRight size={14} />
            </Link>

            <button
              style={{
                position: 'relative',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-full)',
                padding: '8px',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
              }}
            >
              <Bell size={18} />
              <span
                style={{
                  position: 'absolute',
                  top: '4px',
                  right: '4px',
                  width: '8px',
                  height: '8px',
                  backgroundColor: 'var(--color-primary)',
                  borderRadius: '50%',
                }}
              />
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main style={{ flex: 1, padding: '28px', maxWidth: '1400px', width: '100%', boxSizing: 'border-box' }}>
          {children}
        </main>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .portal-sidebar {
            transform: translateX(-100%);
          }
          .portal-sidebar.open {
            transform: translateX(0);
          }
          .portal-content-wrapper {
            margin-left: 0 !important;
          }
          .mobile-sidebar-toggle {
            display: flex !important;
          }
          .mobile-sidebar-close {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
};
