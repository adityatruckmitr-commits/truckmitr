import React from 'react';
import {
  Menu,
  Search,
  Bell,
  MessageSquare,
  Shield,
  User,
  ChevronDown,
  LogOut,
  ExternalLink,
} from 'lucide-react';

export const SuperAdminNavbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <header
      style={{
        height: '64px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E5E7EB',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.02)',
      }}
    >
      {/* Left: Brand Logo & Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '6px',
            borderRadius: '6px',
            color: '#4B5563',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          title="Toggle Navigation Menu"
        >
          <Menu size={22} />
        </button>

        <a href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', gap: '8px' }}>
          <img
            src="https://truckmitr.com/public/assets/img/logo.png"
            alt="TruckMitr"
            style={{ height: '36px', objectFit: 'contain' }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling.style.display = 'flex';
            }}
          />
          <div
            style={{
              display: 'none',
              fontWeight: 800,
              fontSize: '1.2rem',
              color: '#0284C7',
              letterSpacing: '-0.02em',
            }}
          >
            Truck<span style={{ color: '#2563EB' }}>Mitr</span>
          </div>
        </a>
      </div>

      {/* Center: Search Bar matching original */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          width: '100%',
          maxWidth: '440px',
        }}
      >
        <Search
          size={16}
          style={{
            position: 'absolute',
            left: '14px',
            color: '#9CA3AF',
          }}
        />
        <input
          type="text"
          placeholder="Search TMID, Name, Mobile, Email..."
          style={{
            width: '100%',
            height: '38px',
            paddingLeft: '38px',
            paddingRight: '80px',
            borderRadius: '20px',
            border: '1px solid #E2E8F0',
            backgroundColor: '#F8FAFC',
            fontSize: '0.85rem',
            outline: 'none',
            transition: 'all 0.2s ease',
          }}
        />
        <button
          style={{
            position: 'absolute',
            right: '4px',
            backgroundColor: '#2563EB',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '16px',
            padding: '5px 14px',
            fontSize: '0.75rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Search
        </button>
      </div>

      {/* Right: Notifications & Profile Pill */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          style={{
            background: 'none',
            border: 'none',
            color: '#6B7280',
            cursor: 'pointer',
            position: 'relative',
            padding: '6px',
          }}
          title="Notifications"
        >
          <Bell size={20} />
          <span
            style={{
              position: 'absolute',
              top: '4px',
              right: '4px',
              width: '8px',
              height: '8px',
              backgroundColor: '#EF4444',
              borderRadius: '50%',
            }}
          />
        </button>

        {/* User Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '4px 10px 4px 6px',
            backgroundColor: '#F8FAFC',
            borderRadius: '24px',
            border: '1px solid #E2E8F0',
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#2563EB',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.85rem',
            }}
          >
            DA
          </div>
          <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#111827' }}>
              Deepak Arora
            </div>
            <div style={{ fontSize: '0.7rem', color: '#2563EB', fontWeight: 600 }}>
              Super Admin
            </div>
          </div>
          <ChevronDown size={14} style={{ color: '#9CA3AF' }} />
        </div>
      </div>
    </header>
  );
};
