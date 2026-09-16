import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Handshake,
  DollarSign,
  StickyNote,
  Truck,
  Tag,
  Filter,
  Image,
  Smartphone,
  MapPin,
  IdCard,
  Scale,
  Building2,
  UserCheck,
  BarChart2,
  CreditCard,
  MessageSquare,
  PhoneCall,
  Share2,
  Phone,
  Bell,
  Briefcase,
  HelpCircle,
  Shield,
  GraduationCap,
  Headphones,
  Video,
  HelpCircle as QuizIcon,
  BookOpen,
  Utensils,
  UserPlus,
  MessageCircle,
  LogOut,
  Search,
  Menu,
  ChevronDown,
  ChevronRight,
  Settings,
  Home,
  Sliders,
  Calendar,
  Download,
  Grid,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const AdminLayout = ({ children, onOpenCallReport, onOpenSettings }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [menuSearch, setMenuSearch] = useState('');
  const [openSubmenus, setOpenSubmenus] = useState({
    oemBrand: false,
    oemFilter: false,
    banners: false,
    mobilePopups: false,
    popupBanners: false,
    pollSurvey: false,
    subscriptionPlans: false,
    popupMessages: false,
    callLogs: false,
    notifications: false,
    career: false,
    inquiry: false,
    truckListings: false,
    driverManagement: false,
    transporter: false,
    dts: false,
    job: false,
    teleChamp: false,
    video: false,
    quiz: false,
    blogs: false,
    teamMembers: false,
    whatsappGroup: false,
  });

  const [searchUserQuery, setSearchUserQuery] = useState('');
  const [searchJobQuery, setSearchJobQuery] = useState('');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const toggleSubmenu = (key) => {
    setOpenSubmenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSearchUser = (e) => {
    e.preventDefault();
    if (!searchUserQuery.trim()) return;
    navigate(`/admin/users?search=${encodeURIComponent(searchUserQuery.trim())}`);
  };

  const handleSearchJob = (e) => {
    e.preventDefault();
    if (!searchJobQuery.trim()) return;
    navigate(`/admin/jobs-list?search=${encodeURIComponent(searchJobQuery.trim())}`);
  };

  // Structured Categorized Admin Navigation Groupings
  const menuSections = [
    {
      group: 'Main Menu',
      items: [
        { title: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard, badge: 'Live' },
        { title: 'Partner Dashboard', path: '/admin/partner-dashboard', icon: Users },
        { title: 'Matchmaking', path: '/admin/matchmaking', icon: Handshake },
        { title: 'Update Revenue', path: '/admin/collection-by', icon: DollarSign },
        { title: 'User Notes', path: '/admin/user-notes', icon: StickyNote },
        { title: 'Driver Fulfillment', path: '/admin/driver-fulfillment', icon: Truck },
        { title: 'ID Check', path: '/admin/id-check', icon: IdCard },
        { title: 'Court Verification', path: '/admin/court-verifications', icon: Scale },
        { title: 'Court Verification (Transporter)', path: '/admin/court-verifications-by-transporter', icon: Building2 },
        { title: 'DAV (Transporter)', path: '/admin/dav-verifications-by-transporter', icon: MapPin },
        { title: 'Physical Verification (Transporter)', path: '/admin/physical-verifications-by-transporter', icon: UserCheck },
        {
          title: 'Poll & Survey',
          key: 'pollSurvey',
          icon: BarChart2,
          submenu: [
            { title: 'View Surveys', path: '/admin/poll-survey' },
            { title: 'Create Survey', path: '/admin/poll-survey/create' },
          ],
        },
        {
          title: 'Subscription Plans',
          key: 'subscriptionPlans',
          icon: CreditCard,
          submenu: [
            { title: 'View Plans', path: '/admin/subscriptionplans' },
            { title: 'Add Plan', path: '/admin/subscriptionplans/create' },
          ],
        },
        {
          title: 'Popup Messages',
          key: 'popupMessages',
          icon: MessageSquare,
          submenu: [
            { title: 'View Messages', path: '/admin/popup-messages' },
            { title: 'Add Message', path: '/admin/popup-messages/create' },
          ],
        },
      ],
    },
    {
      group: 'User Management',
      items: [
        {
          title: 'Driver Management',
          key: 'driverManagement',
          icon: Shield,
          badge: '52.7k',
          submenu: [
            { title: 'Driver List', path: '/admin/driver-list' },
            { title: 'Driver Verifications', path: '/admin/driver_verifications' },
            { title: 'Driver Hiring', path: '/admin/driver-hiring' },
          ],
        },
        {
          title: 'Transporter',
          key: 'transporter',
          icon: Truck,
          badge: '14.2k',
          submenu: [
            { title: 'View List', path: '/admin/transporter' },
            { title: 'Driver Verification', path: '/admin/transporter-driver-verification' },
          ],
        },
        {
          title: 'DTP / DTS',
          key: 'dts',
          icon: GraduationCap,
          submenu: [{ title: 'DTS Institute List', path: '/admin/view-truck-institute' }],
        },
      ],
    },
    {
      group: 'Content & Communication',
      items: [
        {
          title: 'OEM Brand',
          key: 'oemBrand',
          icon: Tag,
          submenu: [{ title: 'Brand List', path: '/admin/brand' }],
        },
        {
          title: 'OEM Filter',
          key: 'oemFilter',
          icon: Filter,
          submenu: [
            { title: 'Budget', path: '/admin/budget' },
            { title: 'Fuel Type', path: '/admin/fuel-type' },
            { title: 'Vehicle Application', path: '/admin/vehicle-application' },
            { title: 'GVW (Tons)', path: '/admin/gvm' },
            { title: 'Vehicle Type', path: '/admin/vehicletype' },
            { title: 'Tyres Count', path: '/admin/tyres-count' },
          ],
        },
        {
          title: 'Banners',
          key: 'banners',
          icon: Image,
          submenu: [
            { title: 'View Banners', path: '/admin/banners' },
            { title: 'Add Banner', path: '/admin/banners/create' },
          ],
        },
        {
          title: 'Mobile Popups',
          key: 'mobilePopups',
          icon: Smartphone,
          submenu: [
            { title: 'View Popups', path: '/admin/mobile-popups' },
            { title: 'Add Popup', path: '/admin/mobile-popups/create' },
          ],
        },
        {
          title: 'Popup Banners',
          key: 'popupBanners',
          icon: MapPin,
          submenu: [
            { title: 'View Guides', path: '/admin/popup-banners' },
            { title: 'Add Guide', path: '/admin/popup-banners/create' },
          ],
        },
        {
          title: 'Notifications',
          key: 'notifications',
          icon: Bell,
          submenu: [
            { title: 'View Notifications', path: '/admin/notifications' },
            { title: 'Send Notification', path: '/admin/notifications/create' },
          ],
        },
        {
          title: 'Video LMS',
          key: 'video',
          icon: Video,
          submenu: [
            { title: 'Modules', path: '/admin/module' },
            { title: 'Topics', path: '/admin/module-topic' },
            { title: 'Videos', path: '/admin/video' },
            { title: 'Health & Hygiene', path: '/admin/health-hygiene' },
            { title: 'Driver Welfare', path: '/admin/driver-welfare' },
          ],
        },
        {
          title: 'Quiz',
          key: 'quiz',
          icon: QuizIcon,
          submenu: [
            { title: 'Add Quiz', path: '/admin/add-quiz' },
            { title: 'View Quiz', path: '/admin/quiz' },
          ],
        },
        {
          title: 'Blogs',
          key: 'blogs',
          icon: BookOpen,
          submenu: [
            { title: 'Categories', path: '/admin/blog-category' },
            { title: 'Add Blog', path: '/admin/add-blog' },
            { title: 'All Blogs', path: '/admin/blogs' },
          ],
        },
      ],
    },
    {
      group: 'Reports & Operations',
      items: [
        { title: 'Payment', path: '/admin/payments-reward', icon: CreditCard },
        {
          title: 'Call Logs Tracking',
          key: 'callLogs',
          icon: PhoneCall,
          submenu: [
            { title: 'Transporters Logs', path: '/admin/call-logs/transporters' },
            { title: 'Driver Call Logs', path: '/admin/call-logs/drivers' },
          ],
        },
        { title: 'Referral & Earn', path: '/admin/referral-earn', icon: Share2 },
        { title: 'Callback Requests', path: '/admin/callback-requests', icon: Phone },
        {
          title: 'Career',
          key: 'career',
          icon: Briefcase,
          submenu: [
            { title: 'View Careers', path: '/admin/career' },
            { title: 'Add Career', path: '/admin/career/create' },
          ],
        },
        {
          title: 'Inquiry',
          key: 'inquiry',
          icon: HelpCircle,
          submenu: [{ title: 'View Inquiries', path: '/admin/inquiry' }],
        },
        {
          title: 'Truck Listings',
          key: 'truckListings',
          icon: Truck,
          submenu: [
            { title: 'Vehicle Type', path: '/admin/truck-vehicletype' },
            { title: 'Add Truck', path: '/admin/add-truck' },
            { title: 'Truck List', path: '/admin/truck-list' },
          ],
        },
        {
          title: 'Job',
          key: 'job',
          icon: Briefcase,
          badge: '87',
          submenu: [
            { title: 'Job List', path: '/admin/jobs-list' },
            { title: 'Active Jobs', path: '/admin/active-jobs' },
            { title: 'GreenLine Pending', path: '/admin/greenline-pending-jobs' },
            { title: 'GreenLine Submitted', path: '/admin/greenline-submitted-jobs' },
            { title: 'Pending Approval', path: '/admin/pending-for-approval-jobs' },
            { title: 'Master Job', path: '/admin/master-jobs' },
          ],
        },
        {
          title: 'Tele Champ',
          key: 'teleChamp',
          icon: Headphones,
          submenu: [
            { title: 'Dashboard', path: '/admin/telechamp/dashboard' },
            { title: 'Department List', path: '/admin/telechamp/department' },
          ],
        },
        { title: 'Add Dhaba', path: '/admin/add-dhaba', icon: Utensils },
        {
          title: 'Team Members',
          key: 'teamMembers',
          icon: UserPlus,
          submenu: [
            { title: 'Add Team Member', path: '/admin/add-employee' },
            { title: 'Members List', path: '/admin/employee' },
            { title: 'Departments List', path: '/admin/department/list' },
          ],
        },
        {
          title: 'WhatsApp Group',
          key: 'whatsappGroup',
          icon: MessageCircle,
          submenu: [{ title: 'WhatsApp Links', path: '/admin/whatsapp-groups' }],
        },
        { title: 'Logout', path: '/login', icon: LogOut, isLogout: true },
      ],
    },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F5F7FA', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* 1. TOP HEADER (64px) */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '64px',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E7EAF0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          zIndex: 1000,
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.02)',
        }}
      >
        {/* Left: Brand / Sidebar toggle + Breadcrumbs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#475569',
              display: 'flex',
              padding: '6px',
              borderRadius: '6px',
            }}
          >
            <Menu size={18} />
          </button>

          {/* Breadcrumbs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#64748B' }}>
            <Home size={14} color="#94A3B8" />
            <span>/</span>
            <span>Overview</span>
            <span>/</span>
            <strong style={{ color: '#172033', fontWeight: 600 }}>Dashboard</strong>
          </div>
        </div>

        {/* Center: Dual Modern Search Components */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, maxWidth: '780px', margin: '0 24px' }}>
          {/* User Search */}
          <form
            onSubmit={handleSearchUser}
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#F8FAFC',
              borderRadius: '30px',
              border: '1px solid #E2E8F0',
              padding: '2px 4px 2px 12px',
              flex: 1,
              transition: 'border-color 0.2s',
            }}
          >
            <Search size={14} color="#94A3B8" style={{ marginRight: '8px' }} />
            <input
              type="text"
              placeholder="Search TMID, Name, Mobile, Email"
              value={searchUserQuery}
              onChange={(e) => setSearchUserQuery(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                width: '100%',
                fontSize: '0.8rem',
                color: '#1E293B',
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: '#1677FF',
                border: 'none',
                color: '#FFFFFF',
                borderRadius: '20px',
                padding: '5px 14px',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Search
            </button>
          </form>

          {/* Job Search */}
          <form
            onSubmit={handleSearchJob}
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#F8FAFC',
              borderRadius: '30px',
              border: '1px solid #E2E8F0',
              padding: '2px 4px 2px 12px',
              flex: 1,
            }}
          >
            <Search size={14} color="#94A3B8" style={{ marginRight: '8px' }} />
            <input
              type="text"
              placeholder="Search Job ID, TM ID, Name, Mobile..."
              value={searchJobQuery}
              onChange={(e) => setSearchJobQuery(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                width: '100%',
                fontSize: '0.8rem',
                color: '#1E293B',
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: '#1677FF',
                border: 'none',
                color: '#FFFFFF',
                borderRadius: '20px',
                padding: '5px 14px',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Search Job
            </button>
          </form>
        </div>

        {/* Right Side: Quick Action Icons & User Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Notification Bell */}
          <button
            onClick={() => showToast('No unread notifications at this time', 'info')}
            style={{
              position: 'relative',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748B',
              cursor: 'pointer',
            }}
            title="Notifications"
          >
            <Bell size={16} />
            <span
              style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#EF4444',
                border: '2px solid #FFFFFF',
              }}
            />
          </button>

          {/* User Profile Avatar with Name and Role */}
          <div style={{ position: 'relative' }}>
            <div
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                padding: '4px 8px',
                borderRadius: '8px',
                transition: 'background-color 0.15s ease',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1677FF 0%, #0958D9 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  fontSize: '0.85rem',
                  boxShadow: '0 2px 6px rgba(22, 119, 255, 0.25)',
                }}
              >
                AK
              </div>
              <div style={{ textAlign: 'left', lineHeight: 1.25 }}>
                <span style={{ fontSize: '0.825rem', fontWeight: 600, color: '#172033', display: 'block' }}>Alex Kim</span>
                <span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 500 }}>Administrator</span>
              </div>
              <ChevronDown size={14} color="#94A3B8" />
            </div>

            {profileDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  width: '190px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E7EAF0',
                  borderRadius: '10px',
                  boxShadow: '0 10px 25px -5px rgba(0,0,0,0.08)',
                  padding: '6px 0',
                  zIndex: 1100,
                }}
              >
                <Link
                  to="/"
                  style={{ display: 'block', padding: '8px 16px', fontSize: '0.825rem', color: '#374151' }}
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  Public Website
                </Link>
                <div style={{ height: '1px', backgroundColor: '#F1F5F9', margin: '4px 0' }} />
                <button
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    padding: '8px 16px',
                    fontSize: '0.825rem',
                    color: '#EF4444',
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 2. LEFT SIDEBAR (Width: 230px, Fixed) */}
      <aside
        style={{
          width: sidebarOpen ? '230px' : '0px',
          overflowX: 'hidden',
          backgroundColor: '#FFFFFF',
          borderRight: '1px solid #E7EAF0',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 1050,
          transition: 'width 0.25s ease',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Brand Header */}
        <div
          style={{
            height: '64px',
            padding: '0 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #E7EAF0',
          }}
        >
          <Link to="/admin/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #1677FF 0%, #0958D9 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: '0 2px 6px rgba(22, 119, 255, 0.3)',
              }}
            >
              <Truck size={17} />
            </div>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1677FF', letterSpacing: '-0.3px' }}>
              Truck<span style={{ color: '#FF6B00' }}>Mitr</span>
            </span>
          </Link>
        </div>

        {/* Menu Search Filter */}
        <div style={{ padding: '12px 14px 6px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={12} color="#94A3B8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search menu..."
              value={menuSearch}
              onChange={(e) => setMenuSearch(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '6px',
                padding: '6px 10px 6px 28px',
                fontSize: '0.78rem',
                outline: 'none',
                color: '#1E293B',
              }}
            />
          </div>
        </div>

        {/* Scrollable Nav Items by Category */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '6px 10px 30px' }}>
          {menuSections.map((section) => {
            const filteredItems = section.items.filter((item) => {
              if (!menuSearch) return true;
              const q = menuSearch.toLowerCase();
              if (item.title.toLowerCase().includes(q)) return true;
              if (item.submenu) {
                return item.submenu.some((sub) => sub.title.toLowerCase().includes(q));
              }
              return false;
            });

            if (filteredItems.length === 0) return null;

            return (
              <div key={section.group} style={{ marginBottom: '16px' }}>
                <div
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: '#94A3B8',
                    padding: '6px 10px 4px',
                    letterSpacing: '0.3px',
                  }}
                >
                  {section.group}
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {filteredItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    const isSubmenuOpen = openSubmenus[item.key];

                    if (item.submenu) {
                      return (
                        <li key={item.title}>
                          <button
                            onClick={() => toggleSubmenu(item.key)}
                            style={{
                              width: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '8px 10px',
                              borderRadius: '8px',
                              border: 'none',
                              background: isSubmenuOpen ? '#F0F7FF' : 'transparent',
                              color: isSubmenuOpen ? '#1677FF' : '#475569',
                              cursor: 'pointer',
                              fontSize: '0.82rem',
                              fontWeight: isSubmenuOpen ? 600 : 500,
                              transition: 'all 0.15s ease',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                              <Icon size={15} color={isSubmenuOpen ? '#1677FF' : '#64748B'} />
                              <span>{item.title}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              {item.badge && (
                                <span
                                  style={{
                                    fontSize: '0.65rem',
                                    fontWeight: 700,
                                    backgroundColor: '#E6F4FF',
                                    color: '#1677FF',
                                    padding: '1px 6px',
                                    borderRadius: '10px',
                                  }}
                                >
                                  {item.badge}
                                </span>
                              )}
                              <ChevronRight
                                size={13}
                                style={{
                                  transform: isSubmenuOpen ? 'rotate(90deg)' : 'none',
                                  transition: 'transform 0.2s ease',
                                }}
                              />
                            </div>
                          </button>

                          {isSubmenuOpen && (
                            <ul
                              style={{
                                listStyle: 'none',
                                paddingLeft: '28px',
                                margin: '2px 0',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '2px',
                              }}
                            >
                              {item.submenu.map((sub) => {
                                const isSubActive = location.pathname === sub.path;
                                return (
                                  <li key={sub.path}>
                                    <Link
                                      to={sub.path}
                                      style={{
                                        display: 'block',
                                        padding: '6px 10px',
                                        fontSize: '0.78rem',
                                        fontWeight: isSubActive ? 600 : 400,
                                        color: isSubActive ? '#1677FF' : '#64748B',
                                        borderRadius: '6px',
                                        backgroundColor: isSubActive ? '#E6F4FF' : 'transparent',
                                      }}
                                    >
                                      {sub.title}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </li>
                      );
                    }

                    if (item.isLogout) {
                      return (
                        <li key={item.title}>
                          <button
                            onClick={() => {
                              logout();
                              navigate('/login');
                            }}
                            style={{
                              width: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '9px',
                              padding: '8px 10px',
                              borderRadius: '8px',
                              border: 'none',
                              background: 'transparent',
                              color: '#EF4444',
                              cursor: 'pointer',
                              fontSize: '0.82rem',
                              fontWeight: 500,
                            }}
                          >
                            <LogOut size={15} color="#EF4444" />
                            <span>{item.title}</span>
                          </button>
                        </li>
                      );
                    }

                    return (
                      <li key={item.title}>
                        <Link
                          to={item.path}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '8px 10px',
                            borderRadius: '8px',
                            fontSize: '0.82rem',
                            fontWeight: isActive ? 600 : 500,
                            color: isActive ? '#FFFFFF' : '#475569',
                            backgroundColor: isActive ? '#1677FF' : 'transparent',
                            boxShadow: isActive ? '0 2px 6px rgba(22, 119, 255, 0.3)' : 'none',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                            <Icon size={15} color={isActive ? '#FFFFFF' : '#64748B'} />
                            <span>{item.title}</span>
                          </div>
                          {item.badge && (
                            <span
                              style={{
                                fontSize: '0.65rem',
                                fontWeight: 700,
                                backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : '#E6F4FF',
                                color: isActive ? '#FFFFFF' : '#1677FF',
                                padding: '1px 6px',
                                borderRadius: '10px',
                              }}
                            >
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </aside>

      {/* 3. MAIN CONTENT WRAPPER */}
      <div
        style={{
          flex: 1,
          marginLeft: sidebarOpen ? '230px' : '0px',
          marginTop: '64px',
          padding: '24px 28px',
          transition: 'margin-left 0.25s ease',
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        {children}
      </div>
    </div>
  );
};
