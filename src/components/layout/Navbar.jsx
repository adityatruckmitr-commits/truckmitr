import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Truck,
  Briefcase,
  Users,
  ShieldCheck,
  Compass,
  Menu,
  X,
  LogIn,
  UserPlus,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  Globe,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [lang, setLang] = useState('en');
  const { user, isAuthenticated, role, logout, switchDemoRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { label: lang === 'en' ? 'Find Jobs' : 'नौकरी खोजें', path: '/jobs', icon: Briefcase },
    { label: lang === 'en' ? 'Drivers' : 'ड्राइवर डायरेक्टरी', path: '/drivers', icon: Users },
    { label: lang === 'en' ? 'For Fleets' : 'ट्रांसपोर्टर सुविधाएं', path: '/fleet', icon: Truck },
    { label: lang === 'en' ? 'Highway Amenities' : 'ढाबा व पंक्चर', path: '/amenities', icon: Compass },
    { label: lang === 'en' ? 'About' : 'हमारे बारे में', path: '/about' },
    { label: lang === 'en' ? 'Contact' : 'संपर्क', path: '/contact' },
  ];

  const getDashboardPath = () => {
    switch (role) {
      case 'driver': return '/driver/dashboard';
      case 'transporter': return '/transporter/dashboard';
      case 'crm': return '/crm/dashboard';
      case 'admin': return '/admin/dashboard';
      default: return '/jobs';
    }
  };

  return (
    <header
      className="glass-panel"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        borderRadius: 0,
        backgroundColor: 'rgba(11, 15, 25, 0.85)',
      }}
    >
      <div
        className="tm-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 'var(--navbar-height)',
        }}
      >
        {/* Brand Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, #FF6B00 0%, #FF9E00 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px var(--color-primary-glow)',
            }}
          >
            <Truck color="#FFFFFF" size={24} />
          </div>
          <div>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
              Truck<span className="gradient-text-primary">Mitr</span>
            </span>
            <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--color-accent)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginTop: '-4px' }}>
              Logistics Ecosystem
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav style={{ display: 'none', gap: '28px', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  fontSize: '0.925rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--color-primary)' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'color 0.2s ease',
                }}
              >
                {Icon && <Icon size={16} />}
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-full)',
              padding: '6px 12px',
              color: 'var(--text-muted)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
            title="Toggle Language"
          >
            <Globe size={14} color="var(--color-accent)" />
            <span>{lang === 'en' ? 'EN | हिंदी' : 'हिंदी | EN'}</span>
          </button>

          {/* Direct TruckMitr One OS Button */}
          <Link
            to="/one/dashboard"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#1467FF',
              color: '#FFFFFF',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.82rem',
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(20, 103, 255, 0.3)',
              transition: 'transform 0.15s ease'
            }}
          >
            <LayoutDashboard size={14} />
            <span>TruckMitr One OS</span>
          </Link>

          {/* Quick Demo Role Switcher */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255, 107, 0, 0.1)',
                border: '1px solid var(--border-primary)',
                borderRadius: 'var(--radius-full)',
                padding: '6px 12px',
                color: 'var(--color-primary)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <Sparkles size={14} />
              <span>Preview Portal: {String(role || 'Portal').toUpperCase()}</span>
              <ChevronDown size={14} />
            </button>

            {roleDropdownOpen && (
              <div
                className="glass-card animate-fade-in"
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  width: '210px',
                  zIndex: 200,
                  padding: '8px',
                  backgroundColor: 'var(--bg-surface)',
                  boxShadow: 'var(--shadow-lg)',
                }}
              >
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-dim)', padding: '6px 8px', textTransform: 'uppercase' }}>
                  Select Persona
                </div>
                {[
                  { role: 'driver', label: '🚚 Driver Portal' },
                  { role: 'transporter', label: '🏢 Transporter Portal' },
                  { role: 'crm', label: '📞 Telecaller CRM' },
                  { role: 'admin', label: '🛡️ Super Admin' },
                  { role: 'guest', label: '🌐 Public Guest' },
                ].map((item) => (
                  <button
                    key={item.role}
                    onClick={() => {
                      switchDemoRole(item.role);
                      setRoleDropdownOpen(false);
                      if (item.role === 'driver') navigate('/driver/dashboard');
                      else if (item.role === 'transporter') navigate('/transporter/dashboard');
                      else if (item.role === 'crm') navigate('/crm/dashboard');
                      else if (item.role === 'admin') navigate('/admin/dashboard');
                      else navigate('/');
                    }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '8px 10px',
                      background: role === item.role ? 'var(--color-primary-light)' : 'none',
                      color: role === item.role ? 'var(--color-primary)' : 'var(--text-main)',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      display: 'block',
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Auth State Buttons */}
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Button
                variant="primary"
                size="sm"
                icon={LayoutDashboard}
                onClick={() => navigate(getDashboardPath())}
              >
                Dashboard
              </Button>
              <button
                onClick={logout}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-dim)',
                  cursor: 'pointer',
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                }}
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Button
                variant="ghost"
                size="sm"
                icon={LogIn}
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon={UserPlus}
                onClick={() => navigate('/register')}
              >
                Register
              </Button>
            </div>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'flex',
              background: 'none',
              border: 'none',
              color: 'var(--text-main)',
              cursor: 'pointer',
              padding: '6px',
            }}
            className="mobile-hamburger"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="glass-panel animate-fade-in"
          style={{
            padding: '20px',
            borderTop: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-surface)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: location.pathname === link.path ? 'var(--color-primary)' : 'var(--text-main)',
                    padding: '8px 0',
                  }}
                >
                  {Icon && <Icon size={18} />}
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav { display: flex !important; }
          .mobile-hamburger { display: none !important; }
        }
      `}</style>
    </header>
  );
};
