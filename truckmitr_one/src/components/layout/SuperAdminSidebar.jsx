import React, { useState } from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  UserCheck,
  GitPullRequest,
  CreditCard,
  StickyNote,
  Truck,
  ShieldCheck,
  Award,
  Filter,
  Image,
  Smartphone,
  Layers,
  FileCheck,
  Scale,
  Vote,
  MessageSquare,
  Users,
  Briefcase,
  Headphones,
  Video,
  HelpCircle,
  BookOpen,
  Utensils,
  LogOut,
  ChevronDown,
  ChevronRight,
  Search,
} from 'lucide-react';

export const SuperAdminSidebar = ({ activePath = '/admin/dashboard' }) => {
  const [openMenus, setOpenMenus] = useState({
    oemBrand: false,
    oemFilter: false,
    banners: false,
    mobilePopups: false,
    popupBanners: false,
    verifications: false,
    polls: false,
    teamMembers: false,
    whatsapp: false,
    jobs: false,
    telechamp: false,
    video: false,
    blogs: false,
  });

  const [menuSearch, setMenuSearch] = useState('');

  const toggleSubmenu = (key) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const navItems = [
    { title: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { title: 'Performance Overview', path: '/admin/performance-overview', icon: TrendingUp },
    { title: 'Partner Dashboard', path: '/admin/partner-dashboard', icon: UserCheck },
    { title: 'Matchmaking', path: '/admin/matchmaking', icon: GitPullRequest },
    { title: 'Update Revenue', path: '/admin/collection-by', icon: CreditCard },
    { title: 'User Notes', path: '/admin/user-notes', icon: StickyNote },
    { title: 'Driver Fulfillment', path: '/admin/driver-fulfillment', icon: Truck },
    {
      title: 'OEM Brand',
      key: 'oemBrand',
      icon: Award,
      submenu: [
        { title: 'Brand List', path: '/admin/brand' },
        { title: 'Budget Filter', path: '/admin/budget' },
        { title: 'Fuel Type', path: '/admin/fuel-type' },
        { title: 'Vehicle Application', path: '/admin/vehicle-application' },
      ],
    },
    {
      title: 'OEM Filter',
      key: 'oemFilter',
      icon: Filter,
      submenu: [
        { title: 'GVM', path: '/admin/gvm' },
        { title: 'Vehicle Type', path: '/admin/vehicletype' },
        { title: 'Tyres Count', path: '/admin/tyres-count' },
      ],
    },
    {
      title: 'Banners',
      key: 'banners',
      icon: Image,
      submenu: [
        { title: 'All Banners', path: '/admin/banners' },
        { title: 'Create Banner', path: '/admin/banners/create' },
      ],
    },
    {
      title: 'Mobile Popups',
      key: 'mobilePopups',
      icon: Smartphone,
      submenu: [
        { title: 'All Popups', path: '/admin/mobile-popups' },
        { title: 'Create Popup', path: '/admin/mobile-popups/create' },
      ],
    },
    {
      title: 'Popup Banners',
      key: 'popupBanners',
      icon: Layers,
      submenu: [
        { title: 'Active Popups', path: '/admin/popup-banners' },
      ],
    },
    { title: 'ID Check', path: '/admin/id-check', icon: FileCheck },
    {
      title: 'Verifications',
      key: 'verifications',
      icon: Scale,
      submenu: [
        { title: 'Court Verifications', path: '/admin/court-verifications' },
        { title: 'Court (Transporter)', path: '/admin/court-verifications-by-transporter' },
        { title: 'DAV Verification', path: '/admin/dav-verifications-by-transporter' },
        { title: 'Physical Verification', path: '/admin/physical-verifications-by-transporter' },
      ],
    },
    {
      title: 'Poll & Survey',
      key: 'polls',
      icon: Vote,
      submenu: [
        { title: 'View Surveys', path: '/admin/poll-survey' },
        { title: 'Create Survey', path: '/admin/poll-survey/create' },
      ],
    },
    { title: 'Subscription Plans', path: '/admin/subscriptionplans', icon: CreditCard },
    {
      title: 'WhatsApp Group',
      key: 'whatsapp',
      icon: MessageSquare,
      submenu: [
        { title: 'WhatsApp Links', path: '/admin/whatsapp-groups' },
      ],
    },
    {
      title: 'Team Members',
      key: 'teamMembers',
      icon: Users,
      submenu: [
        { title: 'Add Team Member', path: '/admin/add-employee' },
        { title: 'Members List', path: '/admin/employee' },
        { title: 'Departments List', path: '/admin/department/list' },
      ],
    },
    {
      title: 'Jobs',
      key: 'jobs',
      icon: Briefcase,
      submenu: [
        { title: 'All Jobs', path: '/admin/jobs' },
        { title: 'Active Jobs', path: '/admin/active-jobs' },
        { title: 'Expired Jobs', path: '/admin/expired-jobs' },
      ],
    },
    { title: 'Add Dhaba', path: '/admin/add-dhaba', icon: Utensils },
    { title: 'Logout', path: '/logout', icon: LogOut, isLogout: true },
  ];

  const filteredItems = navItems.filter((item) => {
    if (!menuSearch) return true;
    if (item.title.toLowerCase().includes(menuSearch.toLowerCase())) return true;
    if (item.submenu) {
      return item.submenu.some((sub) => sub.title.toLowerCase().includes(menuSearch.toLowerCase()));
    }
    return false;
  });

  return (
    <aside
      style={{
        width: '260px',
        backgroundColor: '#FFFFFF',
        borderRight: '1px solid #E5E7EB',
        height: 'calc(100vh - 64px)',
        position: 'sticky',
        top: '64px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        padding: '16px 12px',
        flexShrink: 0,
      }}
    >
      {/* Menu Header & Quick Filter */}
      <div style={{ marginBottom: '14px' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', paddingLeft: '8px' }}>
          Main Menu
        </div>
        <div style={{ position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
          <input
            type="text"
            placeholder="Search menu..."
            value={menuSearch}
            onChange={(e) => setMenuSearch(e.target.value)}
            style={{
              width: '100%',
              height: '32px',
              paddingLeft: '32px',
              paddingRight: '10px',
              borderRadius: '6px',
              border: '1px solid #E2E8F0',
              fontSize: '0.8rem',
              backgroundColor: '#F8FAFC',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>
      </div>

      {/* Nav List */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePath === item.path;

          if (item.submenu) {
            const isOpen = openMenus[item.key];
            const hasActiveChild = item.submenu.some((sub) => sub.path === activePath);

            return (
              <div key={item.key || item.title}>
                <button
                  onClick={() => toggleSubmenu(item.key)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    backgroundColor: hasActiveChild ? '#EFF6FF' : 'transparent',
                    color: hasActiveChild ? '#2563EB' : '#374151',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: hasActiveChild ? 600 : 500,
                    transition: 'all 0.15s ease',
                  }}
                  onMouseOver={(e) => {
                    if (!hasActiveChild) e.currentTarget.style.backgroundColor = '#F8FAFC';
                  }}
                  onMouseOut={(e) => {
                    if (!hasActiveChild) e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Icon size={18} style={{ color: hasActiveChild ? '#2563EB' : '#6B7280' }} />
                    <span>{item.title}</span>
                  </div>
                  {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>

                {isOpen && (
                  <div style={{ paddingLeft: '34px', display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '2px' }}>
                    {item.submenu.map((sub) => {
                      const isSubActive = activePath === sub.path;
                      return (
                        <a
                          key={sub.path}
                          href={sub.path}
                          style={{
                            display: 'block',
                            padding: '7px 10px',
                            borderRadius: '6px',
                            fontSize: '0.8rem',
                            fontWeight: isSubActive ? 600 : 500,
                            color: isSubActive ? '#2563EB' : '#4B5563',
                            backgroundColor: isSubActive ? '#EFF6FF' : 'transparent',
                            textDecoration: 'none',
                          }}
                        >
                          {sub.title}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          return (
            <a
              key={item.path}
              href={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '9px 12px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? '#FFFFFF' : item.isLogout ? '#EF4444' : '#374151',
                backgroundColor: isActive ? '#2563EB' : 'transparent',
                textDecoration: 'none',
                transition: 'all 0.15s ease',
              }}
              onMouseOver={(e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = item.isLogout ? '#FEE2E2' : '#F8FAFC';
              }}
              onMouseOut={(e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <Icon size={18} style={{ color: isActive ? '#FFFFFF' : item.isLogout ? '#EF4444' : '#6B7280' }} />
              <span>{item.title}</span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
};
