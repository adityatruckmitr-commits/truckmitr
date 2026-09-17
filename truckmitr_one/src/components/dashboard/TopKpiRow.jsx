import React, { useState } from 'react';
import {
  Users,
  Wallet,
  History,
  FileText,
  PhoneCall,
  UserCheck,
  Gem,
  Briefcase,
  Truck,
  IdCard,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  FileSpreadsheet,
  ChevronDown,
  PhoneForwarded,
  Share2
} from 'lucide-react';

export const TopKpiRow = ({ onOpenDriverCallModal, onOpenTransporterCallModal, onOpenCallModal, stats }) => {
  const [openExportDropdown, setOpenExportDropdown] = useState(null);

  const periodLabel = stats?.period_label ?? 'This Month';
  const prevPeriodLabel = stats?.prev_period_label ?? 'Last Month';

  // 1. Total & Period Regs
  const totalUsers = stats?.total_users ?? stats?.totalUsers ?? 99909;
  const periodRegs = stats?.period_total_regs ?? stats?.this_month_total_regs ?? 4318;
  const thisMonthRegs = stats?.this_month_total_regs ?? stats?.thisMonthTotalRegs ?? 4318;
  const todayRegs = stats?.today_total_regs ?? stats?.todayTotalRegs ?? 285;
  const periodRegGrowthLabel = stats?.period_reg_growth_label ?? '+18.4%';

  // 2. Revenue
  const periodRevenue = stats?.period_revenue ?? stats?.monthly_revenue ?? 91970;
  const prevPeriodRevenue = stats?.prev_period_revenue ?? stats?.last_month_mtd_revenue ?? 90239;
  const monthlyRevenue = stats?.monthly_revenue ?? stats?.monthlyRevenue ?? 91970;
  const todayRevenue = stats?.today_revenue ?? stats?.todayRevenue ?? 3891;
  const lastMonthMtdRevenue = stats?.last_month_mtd_revenue ?? stats?.lastMonthMtdRevenue ?? 90239;
  const lastMonthFullRevenue = stats?.last_month_revenue ?? 295128;
  const periodRevGrowthLabel = stats?.period_revenue_growth_label ?? stats?.revenue_growth_label ?? '+1.9%';
  const todayRevGrowthLabel = stats?.today_revenue_growth_label ?? '-58.1%';

  // 3. Job Applications
  const periodApplications = stats?.period_applications ?? stats?.applications_mtd ?? 1045;
  const applicationsMtd = stats?.applications_mtd ?? stats?.applicationsMtd ?? 1045;
  const applicationsToday = stats?.applications_today ?? stats?.applicationsToday ?? 96;
  const periodAppGrowthLabel = stats?.period_app_growth_label ?? stats?.application_growth_label ?? '+28%';

  // 4. Driver Call Status
  const driverSince6pm = stats?.driver_call_status?.since_6pm ?? { total: 326, connected: 326, callback: 0, no_ans: 198, pending: 0, fresh: 0 };
  const driverPeriodCalls = stats?.driver_call_status?.period ?? stats?.driver_call_status?.mtd ?? { total: 14256, connected: 14256, callback: 11, no_ans: 9692, pending: 0, fresh: 0 };
  const driverMtdCalls = stats?.driver_call_status?.mtd ?? { total: 14256, connected: 14256, callback: 11, no_ans: 9692, pending: 0, fresh: 0 };

  // 5. Driver Matchmaking
  const mmToday = stats?.driver_matchmaking?.today ?? { total: 0, connected: 0, callback: 0, no_ans: 0 };
  const mmPeriod = stats?.driver_matchmaking?.period ?? stats?.driver_matchmaking?.mtd ?? { total: 0, connected: 0, callback: 0, no_ans: 0 };
  const mmMtd = stats?.driver_matchmaking?.mtd ?? { total: 0, connected: 0, callback: 0, no_ans: 0 };

  // 6. Active Subs & Jobs
  const totalActiveSubs = stats?.total_active_subs ?? 5826;
  const totalActiveJobs = stats?.total_active_jobs ?? 1129;

  // 7. Transporter vs Driver Calls
  const transpToDriverToday = stats?.transporter_to_driver_calls?.today ?? 28;
  const transpToDriverPeriod = stats?.transporter_to_driver_calls?.period ?? stats?.transporter_to_driver_calls?.mtd ?? 291;
  const transpToDriverMtd = stats?.transporter_to_driver_calls?.mtd ?? 291;
  const driverToTranspToday = stats?.driver_to_transporter_calls?.today ?? 0;
  const driverToTranspPeriod = stats?.driver_to_transporter_calls?.period ?? stats?.driver_to_transporter_calls?.mtd ?? 0;
  const driverToTranspMtd = stats?.driver_to_transporter_calls?.mtd ?? 0;

  const toggleDropdown = (key) => {
    setOpenExportDropdown(openExportDropdown === key ? null : key);
  };

  const handleOpenModal = (type = 'driver', status = 'connected') => {
    if (type === 'transporter') {
      if (onOpenTransporterCallModal) onOpenTransporterCallModal(status);
    } else {
      if (onOpenCallModal) onOpenCallModal(status);
      else if (onOpenDriverCallModal) onOpenDriverCallModal(status);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '12px', marginBottom: '16px' }}>
      
      {/* 1. Total / Period / Today Regs (col-4) */}
      <div style={{ gridColumn: 'span 4' }} className="kpi-card-white">
        <div className="kpi-icon-box" style={{ backgroundColor: '#8854D0' }}>
          <Users size={16} />
        </div>
        <div style={{ paddingRight: '32px' }}>
          <h6 style={{ fontSize: '10px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.8px', margin: 0 }}>
            {periodLabel} Registrations
          </h6>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', margin: '4px 0 0', letterSpacing: '-0.02em' }}>
            {Number(periodRegs).toLocaleString('en-IN')}{' '}
            <span style={{ fontSize: '12px', color: '#6B7280', fontWeight: 500 }}>
              (Total: {Number(totalUsers).toLocaleString('en-IN')})
            </span>
          </h2>
        </div>

        {/* Breakdown badge */}
        <div style={{ marginTop: '8px', paddingTop: '6px', borderTop: '1px dashed rgba(0,0,0,0.12)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '9px', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase' }}>Today: {Number(todayRegs).toLocaleString('en-IN')}</span>
            <div style={{ fontSize: '11px', fontWeight: 600, color: '#4B5563' }}>MTD: {Number(thisMonthRegs).toLocaleString('en-IN')}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ color: String(periodRegGrowthLabel).startsWith('-') ? '#EF4444' : '#10B981', fontWeight: 700, fontSize: '11px' }}>
              {periodRegGrowthLabel}
            </span>
            <div style={{ color: '#6B7280', fontSize: '9px' }}>vs {prevPeriodLabel}</div>
          </div>
        </div>

        <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => toggleDropdown('regs')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '3px 10px',
                borderRadius: '16px',
                border: '1px solid #E5E7EB',
                backgroundColor: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 600,
                color: '#374151',
                cursor: 'pointer',
              }}
            >
              <FileSpreadsheet size={12} style={{ color: '#10B981' }} />
              Export Data
              <ChevronDown size={11} />
            </button>

            {openExportDropdown === 'regs' && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  marginTop: '4px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                  zIndex: 20,
                  minWidth: '150px',
                  overflow: 'hidden',
                }}
              >
                <div style={{ padding: '6px 12px', fontSize: '11px', cursor: 'pointer', borderBottom: '1px solid #F1F5F9' }}>
                  Total Regs Excel
                </div>
                <div style={{ padding: '6px 12px', fontSize: '11px', cursor: 'pointer', borderBottom: '1px solid #F1F5F9' }}>
                  This Month Regs
                </div>
                <div style={{ padding: '6px 12px', fontSize: '11px', cursor: 'pointer' }}>
                  Today Regs
                </div>
              </div>
            )}
          </div>
          <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 600 }}>
            {stats?.period_driver_growth_label ? `${stats.period_driver_growth_label} Drivers` : '+18.4% MoM'}
          </span>
        </div>
      </div>

      {/* 2. Selected Period Revenue (col-4) */}
      <div style={{ gridColumn: 'span 4' }} className="kpi-card-white">
        <div className="kpi-icon-box" style={{ backgroundColor: '#20BF6B' }}>
          <Wallet size={16} />
        </div>
        <div style={{ paddingRight: '32px' }}>
          <h6 style={{ fontSize: '10px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.8px', margin: 0 }}>
            {periodLabel} Revenue
          </h6>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', margin: '4px 0 0', display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            ₹{Number(periodRevenue).toLocaleString('en-IN')}
          </h2>
        </div>

        {/* Today's Revenue Split */}
        <div style={{ marginTop: '8px', paddingTop: '6px', borderTop: '1px dashed rgba(0,0,0,0.12)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '9px', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Today's Revenue</span>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>₹{Number(todayRevenue).toLocaleString('en-IN')}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ color: String(todayRevGrowthLabel).startsWith('-') ? '#EF4444' : '#10B981', fontWeight: 700, fontSize: '11px' }}>
              {todayRevGrowthLabel}
            </span>
            <div style={{ color: '#6B7280', fontSize: '9px' }}>vs Yesterday</div>
          </div>
        </div>

        <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={() => alert(`Exporting ${periodLabel} Revenue Excel...`)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '3px 10px',
              borderRadius: '16px',
              border: '1px solid #E5E7EB',
              backgroundColor: '#FFFFFF',
              fontSize: '11px',
              fontWeight: 600,
              color: '#374151',
              cursor: 'pointer',
            }}
          >
            <FileSpreadsheet size={12} style={{ color: '#10B981' }} />
            Export Data
          </button>
          <span style={{ fontSize: '10px', color: String(periodRevGrowthLabel).startsWith('-') ? '#EF4444' : '#10B981', fontWeight: 700 }}>
            {periodRevGrowthLabel} vs {prevPeriodLabel}
          </span>
        </div>
      </div>

      {/* 3. Comparison Revenue (col-4) */}
      <div style={{ gridColumn: 'span 4' }} className="kpi-card-white">
        <div className="kpi-icon-box" style={{ backgroundColor: '#10AC84' }}>
          <History size={16} />
        </div>
        <div style={{ paddingRight: '32px' }}>
          <h6 style={{ fontSize: '10px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.8px', margin: 0 }}>
            {prevPeriodLabel} Revenue
          </h6>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', margin: '4px 0 0', display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            ₹{Number(prevPeriodRevenue).toLocaleString('en-IN')}
          </h2>
        </div>

        <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={() => alert(`Exporting ${prevPeriodLabel} Revenue...`)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '3px 10px',
              borderRadius: '16px',
              border: '1px solid #E5E7EB',
              backgroundColor: '#FFFFFF',
              fontSize: '11px',
              fontWeight: 600,
              color: '#374151',
              cursor: 'pointer',
            }}
          >
            <FileSpreadsheet size={12} style={{ color: '#10B981' }} />
            Export Data
          </button>
          <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>
            Full Month: ₹{Number(lastMonthFullRevenue).toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* 4. Job Applications (col-3) */}
      <div style={{ gridColumn: 'span 3' }} className="kpi-card-white">
        <div className="kpi-icon-box" style={{ backgroundColor: '#8E44AD' }}>
          <FileText size={16} />
        </div>
        <div>
          <h6 style={{ fontSize: '10px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.8px', margin: 0 }}>
            {periodLabel} Applications
          </h6>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', margin: '4px 0 0', display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            {Number(periodApplications).toLocaleString('en-IN')}{' '}
            <span style={{ fontSize: '11px', fontWeight: 500, color: '#6B7280', opacity: 0.8 }}>Apps</span>
          </h2>
        </div>

        <div style={{ marginTop: '8px', paddingTop: '6px', borderTop: '1px dashed rgba(0,0,0,0.12)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '9px', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase' }}>Today: {applicationsToday}</span>
            <div style={{ fontSize: '11px', fontWeight: 600, color: '#4B5563' }}>MTD: {Number(applicationsMtd).toLocaleString('en-IN')}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ color: String(periodAppGrowthLabel).startsWith('-') ? '#EF4444' : '#10B981', fontWeight: 700, fontSize: '11px' }}>
              {periodAppGrowthLabel}
            </span>
            <div style={{ fontSize: '9px', color: '#9CA3AF' }}>vs {prevPeriodLabel}</div>
          </div>
        </div>

        <div style={{ marginTop: '10px' }}>
          <button
            onClick={() => alert(`Exporting ${periodLabel} Job Applications...`)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '3px 10px',
              borderRadius: '16px',
              border: '1px solid #E5E7EB',
              backgroundColor: '#FFFFFF',
              fontSize: '11px',
              fontWeight: 600,
              color: '#374151',
              cursor: 'pointer',
            }}
          >
            <FileSpreadsheet size={12} style={{ color: '#10B981' }} />
            Export Data
          </button>
        </div>
      </div>

      {/* 5. Driver Call Status (col-6 wide) */}
      <div style={{ gridColumn: 'span 6' }} className="kpi-card-white">
        <div className="kpi-icon-box" style={{ backgroundColor: '#0EA5E9' }}>
          <PhoneCall size={16} />
        </div>
        <div>
          <h6 style={{ fontSize: '10px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.8px', margin: 0 }}>
            Driver Call Status
          </h6>
        </div>

        {/* 2-column breakdown: Since 6 PM Yesterday & Selected Period */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
          
          {/* Box 1: Since 6 PM Yesterday */}
          <div style={{ backgroundColor: '#F0F9FF', border: '1.5px solid #BAE6FD', borderRadius: '8px', padding: '8px 10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#0369A1', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
              <span>Since 6 PM Yesterday</span>
              <span style={{ color: '#0EA5E9', fontWeight: 800 }}>{driverSince6pm.total}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', textAlign: 'center', gap: '2px' }}>
              <div><div style={{ fontSize: '12px', fontWeight: 700, color: '#10B981' }}>{driverSince6pm.connected}</div><div style={{ fontSize: '8px', color: '#6B7280' }}>Conn</div></div>
              <div><div style={{ fontSize: '12px', fontWeight: 700, color: '#F59E0B' }}>{driverSince6pm.callback}</div><div style={{ fontSize: '8px', color: '#6B7280' }}>Callbk</div></div>
              <div><div style={{ fontSize: '12px', fontWeight: 700, color: '#EF4444' }}>{driverSince6pm.no_ans}</div><div style={{ fontSize: '8px', color: '#6B7280' }}>No Ans</div></div>
              <div><div style={{ fontSize: '12px', fontWeight: 700, color: '#8B5CF6' }}>{driverSince6pm.pending}</div><div style={{ fontSize: '8px', color: '#6B7280' }}>Pending</div></div>
              <div><div style={{ fontSize: '12px', fontWeight: 700, color: '#64748B' }}>{driverSince6pm.fresh}</div><div style={{ fontSize: '8px', color: '#6B7280' }}>Fresh</div></div>
            </div>
          </div>

          {/* Box 2: Selected Period */}
          <div style={{ backgroundColor: '#F0FDF4', border: '1.5px solid #BBF7D0', borderRadius: '8px', padding: '8px 10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#166534', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
              <span>{periodLabel}</span>
              <span style={{ color: '#16A34A', fontWeight: 800 }}>{Number(driverPeriodCalls.total).toLocaleString('en-IN')}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', textAlign: 'center', gap: '2px' }}>
              <div><div style={{ fontSize: '12px', fontWeight: 700, color: '#10B981' }}>{driverPeriodCalls.connected > 1000 ? `${(driverPeriodCalls.connected / 1000).toFixed(1)}k` : driverPeriodCalls.connected}</div><div style={{ fontSize: '8px', color: '#6B7280' }}>Conn</div></div>
              <div><div style={{ fontSize: '12px', fontWeight: 700, color: '#F59E0B' }}>{driverPeriodCalls.callback}</div><div style={{ fontSize: '8px', color: '#6B7280' }}>Callbk</div></div>
              <div><div style={{ fontSize: '12px', fontWeight: 700, color: '#EF4444' }}>{driverPeriodCalls.no_ans > 1000 ? `${(driverPeriodCalls.no_ans / 1000).toFixed(1)}k` : driverPeriodCalls.no_ans}</div><div style={{ fontSize: '8px', color: '#6B7280' }}>No Ans</div></div>
              <div><div style={{ fontSize: '12px', fontWeight: 700, color: '#8B5CF6' }}>{driverPeriodCalls.pending}</div><div style={{ fontSize: '8px', color: '#6B7280' }}>Pending</div></div>
              <div><div style={{ fontSize: '12px', fontWeight: 700, color: '#64748B' }}>{driverPeriodCalls.fresh}</div><div style={{ fontSize: '8px', color: '#6B7280' }}>Fresh</div></div>
            </div>
          </div>

        </div>

        <div style={{ marginTop: '8px', textAlign: 'center' }}>
          <button
            onClick={() => handleOpenModal('driver', 'connected')}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '11px',
              fontWeight: 600,
              color: '#0284C7',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            👁 Check Today's All Drivers Onboarding calls
          </button>
        </div>
      </div>

      {/* 6. Driver Matchmaking (col-3) */}
      <div style={{ gridColumn: 'span 3' }} className="kpi-card-white">
        <div className="kpi-icon-box" style={{ backgroundColor: '#14B8A6' }}>
          <UserCheck size={16} />
        </div>
        <div>
          <h6 style={{ fontSize: '10px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.8px', margin: 0 }}>
            Driver Matchmaking
          </h6>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginTop: '10px' }}>
          <div style={{ backgroundColor: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '6px', padding: '6px 8px' }}>
            <div style={{ fontSize: '9px', color: '#0369A1', fontWeight: 700 }}>Today</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', textAlign: 'center', gap: '2px', marginTop: '2px' }}>
              <div><div style={{ fontSize: '11px', fontWeight: 700, color: '#10B981' }}>{mmToday.connected}</div><div style={{ fontSize: '8px', color: '#6B7280' }}>Conn</div></div>
              <div><div style={{ fontSize: '11px', fontWeight: 700, color: '#F59E0B' }}>{mmToday.callback}</div><div style={{ fontSize: '8px', color: '#6B7280' }}>Callbk</div></div>
              <div><div style={{ fontSize: '11px', fontWeight: 700, color: '#EF4444' }}>{mmToday.no_ans}</div><div style={{ fontSize: '8px', color: '#6B7280' }}>No Ans</div></div>
            </div>
          </div>

          <div style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '6px', padding: '6px 8px' }}>
            <div style={{ fontSize: '9px', color: '#166534', fontWeight: 700 }}>{periodLabel}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', textAlign: 'center', gap: '2px', marginTop: '2px' }}>
              <div><div style={{ fontSize: '11px', fontWeight: 700, color: '#10B981' }}>{mmPeriod.connected}</div><div style={{ fontSize: '8px', color: '#6B7280' }}>Conn</div></div>
              <div><div style={{ fontSize: '11px', fontWeight: 700, color: '#F59E0B' }}>{mmPeriod.callback}</div><div style={{ fontSize: '8px', color: '#6B7280' }}>Callbk</div></div>
              <div><div style={{ fontSize: '11px', fontWeight: 700, color: '#EF4444' }}>{mmPeriod.no_ans}</div><div style={{ fontSize: '8px', color: '#6B7280' }}>No Ans</div></div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '10px' }}>
          <button
            onClick={() => alert(`Exporting ${periodLabel} Driver Matchmaking Data...`)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '3px 10px',
              borderRadius: '16px',
              border: '1px solid #E5E7EB',
              backgroundColor: '#FFFFFF',
              fontSize: '11px',
              fontWeight: 600,
              color: '#374151',
              cursor: 'pointer',
            }}
          >
            <FileSpreadsheet size={12} style={{ color: '#10B981' }} />
            Export Data
          </button>
        </div>
      </div>

      {/* 7. Total Active Subs (col-3) */}
      <div style={{ gridColumn: 'span 3' }} className="kpi-card-white">
        <div className="kpi-icon-box" style={{ backgroundColor: '#FF8E53' }}>
          <Gem size={16} />
        </div>
        <div>
          <h6 style={{ fontSize: '10px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.8px', margin: 0 }}>
            Total Active Subs
          </h6>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', margin: '4px 0 0' }}>
            {Number(totalActiveSubs).toLocaleString('en-IN')}
          </h2>
        </div>
        <div style={{ marginTop: '28px', fontSize: '11px', color: '#10B981', fontWeight: 600 }}>
          {stats?.subscribed_drivers?.total ?? 4453} Drivers + {stats?.subscribed_transporters?.total ?? 1373} Fleets
        </div>
      </div>

      {/* 8. Active Jobs (col-3) */}
      <div style={{ gridColumn: 'span 3' }} className="kpi-card-white">
        <div className="kpi-icon-box" style={{ backgroundColor: '#2D98DA' }}>
          <Briefcase size={16} />
        </div>
        <div>
          <h6 style={{ fontSize: '10px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.8px', margin: 0 }}>
            Active Jobs
          </h6>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', margin: '4px 0 0' }}>
            {Number(totalActiveJobs).toLocaleString('en-IN')}
          </h2>
        </div>
        <div style={{ marginTop: '24px' }}>
          <button
            onClick={() => alert('Exporting Active Jobs...')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '3px 10px',
              borderRadius: '16px',
              border: '1px solid #E5E7EB',
              backgroundColor: '#FFFFFF',
              fontSize: '11px',
              fontWeight: 600,
              color: '#374151',
              cursor: 'pointer',
            }}
          >
            <FileSpreadsheet size={12} style={{ color: '#10B981' }} />
            Export Data
          </button>
        </div>
      </div>

      {/* 9. Transporter To Driver Calls (col-3) */}
      <div style={{ gridColumn: 'span 3' }} className="kpi-card-white">
        <div className="kpi-icon-box" style={{ backgroundColor: '#2563EB' }}>
          <Truck size={16} />
        </div>
        <div>
          <h6 style={{ fontSize: '10px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.8px', margin: 0 }}>
            Transporter To Driver Calls
          </h6>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', margin: '4px 0 0', display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            {transpToDriverToday} <span style={{ fontSize: '11px', fontWeight: 500, color: '#6B7280', opacity: 0.8 }}>Today</span>
          </h2>
        </div>
        <div style={{ marginTop: '10px', paddingTop: '6px', borderTop: '1px dashed rgba(0,0,0,0.12)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '10px', color: '#6B7280', fontWeight: 600 }}>{periodLabel} Calls</span>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>{transpToDriverPeriod}</span>
        </div>
      </div>

      {/* 10. Driver To Transporter Calls (col-3) */}
      <div style={{ gridColumn: 'span 3' }} className="kpi-card-white">
        <div className="kpi-icon-box" style={{ backgroundColor: '#7C3AED' }}>
          <IdCard size={16} />
        </div>
        <div>
          <h6 style={{ fontSize: '10px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.8px', margin: 0 }}>
            Driver To Transporter Calls
          </h6>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', margin: '4px 0 0', display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            {driverToTranspToday} <span style={{ fontSize: '11px', fontWeight: 500, color: '#6B7280', opacity: 0.8 }}>Today</span>
          </h2>
        </div>
        <div style={{ marginTop: '10px', paddingTop: '6px', borderTop: '1px dashed rgba(0,0,0,0.12)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '10px', color: '#6B7280', fontWeight: 600 }}>{periodLabel} Calls</span>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>{driverToTranspPeriod}</span>
        </div>
      </div>

      {/* 11. Transporter Call Status (col-6 wide) */}
      <div style={{ gridColumn: 'span 6' }} className="kpi-card-white">
        <div className="kpi-icon-box" style={{ backgroundColor: '#EAB308' }}>
          <PhoneCall size={16} />
        </div>
        <div>
          <h6 style={{ fontSize: '10px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.8px', margin: 0 }}>
            Transporter Call Status
          </h6>
        </div>

        {/* 2-column breakdown: Since 6 PM Yesterday & MTD */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
          
          <div style={{ backgroundColor: '#FEFCE8', border: '1.5px solid #FEF08A', borderRadius: '8px', padding: '8px 10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#854D0E', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
              <span>Since 6 PM Yesterday</span>
              <span style={{ color: '#EAB308', fontWeight: 800 }}>380</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', textAlign: 'center', gap: '2px' }}>
              <div><div style={{ fontSize: '12px', fontWeight: 700, color: '#10B981' }}>180</div><div style={{ fontSize: '8px', color: '#6B7280' }}>Conn</div></div>
              <div><div style={{ fontSize: '12px', fontWeight: 700, color: '#F59E0B' }}>62</div><div style={{ fontSize: '8px', color: '#6B7280' }}>Callbk</div></div>
              <div><div style={{ fontSize: '12px', fontWeight: 700, color: '#EF4444' }}>84</div><div style={{ fontSize: '8px', color: '#6B7280' }}>No Ans</div></div>
              <div><div style={{ fontSize: '12px', fontWeight: 700, color: '#8B5CF6' }}>32</div><div style={{ fontSize: '8px', color: '#6B7280' }}>Pending</div></div>
              <div><div style={{ fontSize: '12px', fontWeight: 700, color: '#64748B' }}>22</div><div style={{ fontSize: '8px', color: '#6B7280' }}>Fresh</div></div>
            </div>
          </div>

          <div style={{ backgroundColor: '#F0FDF4', border: '1.5px solid #BBF7D0', borderRadius: '8px', padding: '8px 10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#166534', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
              <span>MTD</span>
              <span style={{ color: '#16A34A', fontWeight: 800 }}>6,890</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', textAlign: 'center', gap: '2px' }}>
              <div><div style={{ fontSize: '12px', fontWeight: 700, color: '#10B981' }}>3.8k</div><div style={{ fontSize: '8px', color: '#6B7280' }}>Conn</div></div>
              <div><div style={{ fontSize: '12px', fontWeight: 700, color: '#F59E0B' }}>1.1k</div><div style={{ fontSize: '8px', color: '#6B7280' }}>Callbk</div></div>
              <div><div style={{ fontSize: '12px', fontWeight: 700, color: '#EF4444' }}>1.2k</div><div style={{ fontSize: '8px', color: '#6B7280' }}>No Ans</div></div>
              <div><div style={{ fontSize: '12px', fontWeight: 700, color: '#8B5CF6' }}>480</div><div style={{ fontSize: '8px', color: '#6B7280' }}>Pending</div></div>
              <div><div style={{ fontSize: '12px', fontWeight: 700, color: '#64748B' }}>310</div><div style={{ fontSize: '8px', color: '#6B7280' }}>Fresh</div></div>
            </div>
          </div>

        </div>

        <div style={{ marginTop: '8px', textAlign: 'center' }}>
          <button
            onClick={() => handleOpenModal('transporter', 'connected')}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '11px',
              fontWeight: 600,
              color: '#EAB308',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            👁 Check Todays All Transporters Onboarding calls
          </button>
        </div>
      </div>

      {/* 12. Social Leads Call Status (col-6 wide) */}
      <div style={{ gridColumn: 'span 6' }} className="kpi-card-white">
        <div className="kpi-icon-box" style={{ backgroundColor: '#8B5CF6' }}>
          <Share2 size={16} />
        </div>
        <div>
          <h6 style={{ fontSize: '10px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.8px', margin: 0 }}>
            Social Leads Call Status
          </h6>
        </div>

        {/* 2-column breakdown: Since 6 PM Yesterday & MTD */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
          
          <div style={{ backgroundColor: '#F5F3FF', border: '1.5px solid #DDD6FE', borderRadius: '8px', padding: '8px 10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#5B21B6', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
              <span>Since 6 PM Yesterday</span>
              <span style={{ color: '#8B5CF6', fontWeight: 800 }}>820</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', textAlign: 'center', gap: '2px' }}>
              <div><div style={{ fontSize: '12px', fontWeight: 700, color: '#10B981' }}>390</div><div style={{ fontSize: '8px', color: '#6B7280' }}>Conn</div></div>
              <div><div style={{ fontSize: '12px', fontWeight: 700, color: '#F59E0B' }}>140</div><div style={{ fontSize: '8px', color: '#6B7280' }}>Callbk</div></div>
              <div><div style={{ fontSize: '12px', fontWeight: 700, color: '#EF4444' }}>180</div><div style={{ fontSize: '8px', color: '#6B7280' }}>No Ans</div></div>
              <div><div style={{ fontSize: '12px', fontWeight: 700, color: '#8B5CF6' }}>65</div><div style={{ fontSize: '8px', color: '#6B7280' }}>Pending</div></div>
              <div><div style={{ fontSize: '12px', fontWeight: 700, color: '#64748B' }}>45</div><div style={{ fontSize: '8px', color: '#6B7280' }}>Fresh</div></div>
            </div>
          </div>

          <div style={{ backgroundColor: '#F0FDF4', border: '1.5px solid #BBF7D0', borderRadius: '8px', padding: '8px 10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#166534', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
              <span>MTD</span>
              <span style={{ color: '#16A34A', fontWeight: 800 }}>14,210</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', textAlign: 'center', gap: '2px' }}>
              <div><div style={{ fontSize: '12px', fontWeight: 700, color: '#10B981' }}>7.4k</div><div style={{ fontSize: '8px', color: '#6B7280' }}>Conn</div></div>
              <div><div style={{ fontSize: '12px', fontWeight: 700, color: '#F59E0B' }}>2.3k</div><div style={{ fontSize: '8px', color: '#6B7280' }}>Callbk</div></div>
              <div><div style={{ fontSize: '12px', fontWeight: 700, color: '#EF4444' }}>2.9k</div><div style={{ fontSize: '8px', color: '#6B7280' }}>No Ans</div></div>
              <div><div style={{ fontSize: '12px', fontWeight: 700, color: '#8B5CF6' }}>980</div><div style={{ fontSize: '8px', color: '#6B7280' }}>Pending</div></div>
              <div><div style={{ fontSize: '12px', fontWeight: 700, color: '#64748B' }}>630</div><div style={{ fontSize: '8px', color: '#6B7280' }}>Fresh</div></div>
            </div>
          </div>

        </div>

        <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={() => alert('Exporting Social Leads Call Status...')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '3px 10px',
              borderRadius: '16px',
              border: '1px solid #E5E7EB',
              backgroundColor: '#FFFFFF',
              fontSize: '11px',
              fontWeight: 600,
              color: '#374151',
              cursor: 'pointer',
            }}
          >
            <FileSpreadsheet size={12} style={{ color: '#10B981' }} />
            Export Data
          </button>
          <span style={{ fontSize: '10px', color: '#8B5CF6', fontWeight: 600 }}>Meta & Social Ads Pipeline</span>
        </div>
      </div>

    </div>
  );
};
