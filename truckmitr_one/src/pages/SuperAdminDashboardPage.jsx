import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Calendar, 
  Download, 
  FileText, 
  PhoneCall, 
  Settings, 
  RefreshCw, 
  Sparkles,
  ChevronDown,
  Clock,
  ArrowUpRight,
  TrendingUp,
  ShieldAlert,
  SlidersHorizontal,
  FileSpreadsheet,
  Table as TableIcon
} from 'lucide-react';

// Core Dashboard Components
import { TopKpiRow } from '../components/dashboard/TopKpiRow';
import { GradientStatCards } from '../components/dashboard/GradientStatCards';
import { 
  RegistrationChart, 
  RolePieChart, 
  UserRegistrationAnalyticsChart, 
  UserTypeCombinedBarChart 
} from '../components/dashboard/RegistrationChart';
import { JobStatsCardsAndTable } from '../components/dashboard/JobStatsCardsAndTable';
import { HourlyCallingActivityChart } from '../components/dashboard/HourlyCallingActivityChart';
import { DriversAndLmsSection } from '../components/dashboard/DriversAndLmsSection';
import { StateRegistrationsBarChart } from '../components/dashboard/StateRegistrationsBarChart';
import { TransportersRecentTables } from '../components/dashboard/TransportersRecentTables';
import { GrandDailyMatrixTable } from '../components/dashboard/GrandDailyMatrixTable';

// Modals
import { InvoiceReportModal } from '../components/modals/InvoiceReportModal';
import { DailyCallReportModal } from '../components/modals/DailyCallReportModal';
import { TeleadminSettingsModal } from '../components/modals/TeleadminSettingsModal';
import { DriverCallStatusModal } from '../components/modals/DriverCallStatusModal';
import { TransporterCallStatusModal } from '../components/modals/TransporterCallStatusModal';

// API Service
import { adminDashboardApi } from '../services/adminDashboardApi';

export const SuperAdminDashboardPage = () => {
  // Live API data state
  const [dashboardStats, setDashboardStats] = useState(null);
  const [isLoadingApi, setIsLoadingApi] = useState(false);

  // Modal states
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isDailyCallModalOpen, setIsDailyCallModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isDriverCallModalOpen, setIsDriverCallModalOpen] = useState(false);
  const [isTransporterCallModalOpen, setIsTransporterCallModalOpen] = useState(false);
  const [callStatusInitialTab, setCallStatusInitialTab] = useState('connected');

  // Filter state
  const [dateFilter, setDateFilter] = useState('mtd');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Load live backend data from Laravel API
  const loadDashboardData = async () => {
    setIsRefreshing(true);
    setIsLoadingApi(true);
    try {
      const data = await adminDashboardApi.getDashboardStats({ filter: dateFilter });
      if (data) {
        setDashboardStats(data);
      }
    } catch (err) {
      console.warn('Using resilient fallback state:', err);
    } finally {
      setIsRefreshing(false);
      setIsLoadingApi(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [dateFilter]);

  const handleRefresh = () => {
    loadDashboardData();
  };

  const handleOpenDriverCalls = (status = 'connected') => {
    setCallStatusInitialTab(status);
    setIsDriverCallModalOpen(true);
  };

  const handleOpenTransporterCalls = (status = 'connected') => {
    setCallStatusInitialTab(status);
    setIsTransporterCallModalOpen(true);
  };

  const handleDownloadDashboardReport = () => {
    alert('Preparing & Downloading High-Resolution Full Super Admin Dashboard PDF Report...');
  };

  return (
    <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* 1. TOP HEADER & GREETING TOOLBAR */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          padding: '18px 24px',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.04)',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '3px 8px',
                borderRadius: '6px',
                backgroundColor: '#FEF3EB',
                color: '#E05A1B',
                fontSize: '11px',
                fontWeight: '800',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              <Sparkles size={12} />
              Enterprise v2.4
            </span>
            <span style={{ fontSize: '12px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={12} /> Live Sync: Today, {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          <h1
            style={{
              fontSize: '22px',
              fontWeight: '800',
              color: '#0F172A',
              letterSpacing: '-0.02em',
              margin: '6px 0 2px 0',
            }}
          >
            Welcome to TruckMitr Corporate Services Pvt. Ltd.
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
            Unified Super Admin operations hub, driver matchmaking, telemetry, revenue & pan-India matrix
          </p>
        </div>

        {/* Action Controls & Modal Triggers */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          
          {/* Quick Date Range Dropdown */}
          <div style={{ position: 'relative' }}>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              style={{
                padding: '8px 30px 8px 12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                backgroundColor: '#F8FAFC',
                color: '#0F172A',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer',
                appearance: 'none',
                WebkitAppearance: 'none',
              }}
            >
              <option value="today">Today (Live)</option>
              <option value="mtd">This Month (MTD)</option>
              <option value="last_month">Last Month</option>
              <option value="q3">Q3 FY 2025-26</option>
              <option value="yearly">Financial Year 25-26</option>
            </select>
            <ChevronDown size={14} color="#64748B" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          </div>

          {/* Sync Button */}
          <button
            onClick={handleRefresh}
            title="Refresh All Real-time Data"
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              backgroundColor: '#FFFFFF',
              color: '#475569',
              fontSize: '12px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
            }}
          >
            <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
            <span>Sync</span>
          </button>

          {/* Modal Trigger 1: Invoice Report */}
          <button
            onClick={() => setIsInvoiceModalOpen(true)}
            style={{
              padding: '8px 14px',
              borderRadius: '24px',
              border: '1px solid #059669',
              backgroundColor: '#FFFFFF',
              color: '#059669',
              fontSize: '12px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <FileText size={14} />
            <span>Invoice Report</span>
          </button>

          {/* Modal Trigger 2: Today's Call Report */}
          <button
            onClick={() => setIsDailyCallModalOpen(true)}
            style={{
              padding: '8px 14px',
              borderRadius: '24px',
              border: '1px solid #0284C7',
              backgroundColor: '#FFFFFF',
              color: '#0284C7',
              fontSize: '12px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <PhoneCall size={14} />
            <span>Today's Call Report</span>
          </button>

          {/* Modal Trigger 3: Download Report */}
          <button
            onClick={handleDownloadDashboardReport}
            style={{
              padding: '8px 14px',
              borderRadius: '24px',
              border: '1px solid #2563EB',
              backgroundColor: '#FFFFFF',
              color: '#2563EB',
              fontSize: '12px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <Download size={14} />
            <span>Download Report</span>
          </button>

          {/* Modal Trigger 4: Target Settings */}
          <button
            onClick={() => setIsSettingsModalOpen(true)}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              border: '1px solid #CBD5E1',
              backgroundColor: '#FFFFFF',
              color: '#475569',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            title="Update Monthly Target Settings"
          >
            <Settings size={16} />
          </button>

        </div>
      </div>

      {/* 2. TOP WHITE KPI METRIC CARDS ROW (12 CARDS) */}
      <TopKpiRow 
        stats={dashboardStats}
        onOpenDriverCallModal={handleOpenDriverCalls}
        onOpenTransporterCallModal={handleOpenTransporterCalls}
        onOpenCallModal={handleOpenDriverCalls}
      />

      {/* 3. SAAS GRADIENT CARDS ROW (6 KEY VERTICALS WITH SPARKLINE BARS) */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={18} color="#E05A1B" />
              Core Ecosystem Verticals & Operational Trends
            </h2>
            <p style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
              30-day activity trends, active volume, verification rates, and MoM performance metrics
            </p>
          </div>
          <span style={{ fontSize: '11px', fontWeight: '700', color: '#0D9488', backgroundColor: '#E6FFFA', padding: '4px 10px', borderRadius: '6px' }}>
            ● All Services Operational
          </span>
        </div>

        <GradientStatCards stats={dashboardStats} />
      </div>

      {/* 4. GROWTH ANALYTICS & REGISTRATION CHARTS ROW 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '20px' }}>
        <RegistrationChart stats={dashboardStats} />
        <RolePieChart stats={dashboardStats} />
      </div>

      {/* 5. USER REGISTRATION ANALYTICS CHART WITH COMPARISON */}
      <UserRegistrationAnalyticsChart stats={dashboardStats} />

      {/* 6. TOTAL DRIVERS / TRANSPORTERS / FOREMANS COMBINED BAR CHART */}
      <UserTypeCombinedBarChart stats={dashboardStats} />

      {/* 7. JOB STATS 6 CARDS + RECENT JOBS FULL-WIDTH TABLE */}
      <JobStatsCardsAndTable stats={dashboardStats} />

      {/* 8. HOURLY CALLING & IVR ACTIVITY DISTRIBUTION */}
      <HourlyCallingActivityChart stats={dashboardStats} />

      {/* 9. RECENT DRIVERS TABLE + LMS TRAINING PROGRESS CARDS */}
      <DriversAndLmsSection stats={dashboardStats} />

      {/* 10. REGISTRATIONS BY STATE BAR CHART */}
      <StateRegistrationsBarChart stats={dashboardStats} />

      {/* 11. RECENT REGISTERED & SUBSCRIBED TRANSPORTERS TABLES */}
      <TransportersRecentTables stats={dashboardStats} />

      {/* 12. THE GRAND DAILY OPERATIONS MATRIX TABLE (BOTTOM OF BLADE) */}
      <GrandDailyMatrixTable stats={dashboardStats} />

      {/* ALL MODALS */}
      <InvoiceReportModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
      />

      <DailyCallReportModal
        isOpen={isDailyCallModalOpen}
        onClose={() => setIsDailyCallModalOpen(false)}
      />

      <TeleadminSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />

      <DriverCallStatusModal
        isOpen={isDriverCallModalOpen}
        onClose={() => setIsDriverCallModalOpen(false)}
        initialStatus={callStatusInitialTab}
      />

      <TransporterCallStatusModal
        isOpen={isTransporterCallModalOpen}
        onClose={() => setIsTransporterCallModalOpen(false)}
        initialStatus={callStatusInitialTab}
      />

    </div>
  );
};
