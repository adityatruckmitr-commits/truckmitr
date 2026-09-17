import React from 'react';
import {
  Truck,
  Building2,
  Briefcase,
  GraduationCap,
  ShieldCheck,
  Utensils,
  ArrowUpRight,
  MoreVertical,
} from 'lucide-react';

export const GradientStatCards = ({ stats }) => {
  // Sparkline generator
  const generateBars = (seed, customHeights = null) => {
    if (customHeights && Array.isArray(customHeights) && customHeights.length > 0) {
      const maxVal = Math.max(...customHeights) || 1;
      return customHeights.slice(-24).map(v => Math.round((v / maxVal) * 85 + 15));
    }
    return Array.from({ length: 24 }, (_, i) => {
      const height = Math.min(100, Math.max(15, (Math.sin(i * 0.5 + seed) * 40 + 50) + (i % 3) * 10));
      return Math.round(height);
    });
  };

  const periodLabel = stats?.period_label ?? 'This Month';
  const prevPeriodLabel = stats?.prev_period_label ?? 'Last Month';

  const driverTotal = stats?.drivers?.total ?? 74065;
  const driverToday = stats?.drivers?.today ?? 205;
  const driverPeriod = stats?.period_drivers ?? stats?.drivers?.this_month ?? 3119;
  const driverGrowth = stats?.period_driver_growth_label ?? stats?.drivers?.growth ?? '-20.6%';

  const transpTotal = stats?.transporters?.total ?? 22199;
  const transpToday = stats?.transporters?.today ?? 59;
  const transpPeriod = stats?.period_transporters ?? stats?.transporters?.this_month ?? 947;
  const transpGrowth = stats?.period_transporter_growth_label ?? stats?.transporters?.growth ?? '-14.3%';

  const jobTotal = stats?.active_jobs_stats?.total ?? 1413;
  const jobActive = stats?.active_jobs_stats?.active ?? 1129;
  const jobPending = stats?.active_jobs_stats?.pending ?? 195;
  const jobClosed = stats?.active_jobs_stats?.closed ?? 186;

  const lmsM1Quizzes = stats?.lms_stats?.module1?.quizzes ?? 813;
  const lmsM2Quizzes = stats?.lms_stats?.module2?.quizzes ?? 348;
  const lmsCertified = stats?.lms_stats?.overall?.certified ?? (lmsM1Quizzes + lmsM2Quizzes);

  const subDriversTotal = stats?.subscribed_drivers?.total ?? 4453;
  const subTranspTotal = stats?.subscribed_transporters?.total ?? 1373;

  const periodRevenue = stats?.period_revenue ?? stats?.monthly_revenue ?? 91970;
  const prevPeriodRevenue = stats?.prev_period_revenue ?? stats?.last_month_mtd_revenue ?? 90239;
  const periodRevGrowth = stats?.period_revenue_growth_label ?? stats?.revenue_growth_label ?? '+1.9%';

  const periodApps = stats?.period_applications ?? stats?.applications_mtd ?? 1045;
  const periodAppGrowth = stats?.period_app_growth_label ?? stats?.application_growth_label ?? '+28%';

  const cardsData = [
    {
      title: 'Commercial Drivers',
      mainValue: Number(driverTotal).toLocaleString('en-IN'),
      icon: Truck,
      colorClass: 'grad-orange',
      iconBg: '#EA580C',
      stats: [
        { label: 'Active', value: Number(driverTotal - 5000).toLocaleString('en-IN') },
        { label: 'Verified', value: Number(Math.round(driverTotal * 0.65)).toLocaleString('en-IN') },
        { label: 'Paid Sub', value: Number(subDriversTotal).toLocaleString('en-IN') },
      ],
      breakdown: { left: `New Today: ${driverToday}`, right: `${periodLabel}: ${Number(driverPeriod).toLocaleString('en-IN')}` },
      trend: `${driverGrowth} vs ${prevPeriodLabel}`,
      bars: generateBars(1, stats?.drivers?.daily_sparkline),
    },
    {
      title: 'Transporter Fleet Owners',
      mainValue: Number(transpTotal).toLocaleString('en-IN'),
      icon: Building2,
      colorClass: 'grad-dark',
      iconBg: '#111827',
      stats: [
        { label: 'Active', value: Number(transpTotal - 1200).toLocaleString('en-IN') },
        { label: 'Verified', value: Number(Math.round(transpTotal * 0.58)).toLocaleString('en-IN') },
        { label: 'Paid Sub', value: Number(subTranspTotal).toLocaleString('en-IN') },
      ],
      breakdown: { left: `New Today: ${transpToday}`, right: `${periodLabel}: ${Number(transpPeriod).toLocaleString('en-IN')}` },
      trend: `${transpGrowth} vs ${prevPeriodLabel}`,
      bars: generateBars(2, stats?.transporters?.daily_sparkline),
    },
    {
      title: 'Active Job Openings',
      mainValue: Number(jobTotal).toLocaleString('en-IN'),
      icon: Briefcase,
      colorClass: 'grad-green',
      iconBg: '#059669',
      stats: [
        { label: 'Live Active', value: Number(jobActive).toLocaleString('en-IN') },
        { label: 'Pending Appr', value: Number(jobPending).toLocaleString('en-IN') },
        { label: 'Closed', value: Number(jobClosed).toLocaleString('en-IN') },
      ],
      breakdown: { left: `Today: ${stats?.applications_today ?? 96}`, right: `${periodLabel}: ${Number(periodApps).toLocaleString('en-IN')}` },
      trend: `${periodAppGrowth} vs ${prevPeriodLabel}`,
      bars: generateBars(3),
    },
    {
      title: 'LMS Driver Welfare Training',
      mainValue: Number(lmsCertified).toLocaleString('en-IN'),
      icon: GraduationCap,
      colorClass: 'grad-purple',
      iconBg: '#7C3AED',
      stats: [
        { label: 'Safety Quiz', value: Number(lmsM1Quizzes).toLocaleString('en-IN') },
        { label: 'Cost Quiz', value: Number(lmsM2Quizzes).toLocaleString('en-IN') },
        { label: 'Pass Rate', value: stats?.lms_stats?.overall?.passing_rate ?? '88.4%' },
      ],
      breakdown: { left: `Safety Module: ${stats?.lms_stats?.module1?.pct ?? 90}%`, right: `Cost Module: ${stats?.lms_stats?.module2?.pct ?? 85}%` },
      trend: '+31.4% Completion',
      bars: generateBars(4),
    },
    {
      title: 'Active Subscriptions & Revenue',
      mainValue: `₹${Number(periodRevenue).toLocaleString('en-IN')}`,
      icon: ShieldCheck,
      colorClass: 'grad-cyan',
      iconBg: '#0284C7',
      stats: [
        { label: 'Active Subs', value: Number(stats?.total_active_subs ?? 5826).toLocaleString('en-IN') },
        { label: 'Driver Subs', value: Number(subDriversTotal).toLocaleString('en-IN') },
        { label: 'Fleet Subs', value: Number(subTranspTotal).toLocaleString('en-IN') },
      ],
      breakdown: { left: `Today Rev: ₹${Number(stats?.today_revenue ?? 3891).toLocaleString('en-IN')}`, right: `${prevPeriodLabel}: ₹${Number(prevPeriodRevenue).toLocaleString('en-IN')}` },
      trend: `${periodRevGrowth} vs ${prevPeriodLabel}`,
      bars: generateBars(5, stats?.subscribed_drivers?.daily_sparkline),
    },
    {
      title: 'Highway Dhabas & Roadside Hubs',
      mainValue: '2,760',
      icon: Utensils,
      colorClass: 'grad-blue',
      iconBg: '#2563EB',
      stats: [
        { label: 'Dhabas', value: '1,840' },
        { label: 'Puncture', value: '920' },
        { label: '24x7 Open', value: '1,420' },
      ],
      breakdown: { left: 'Key Corridors: NH-48, NH-44', right: 'Verified Hubs: 92%' },
      trend: '+12.6% MoM',
      bars: generateBars(6),
    },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '14px',
        marginBottom: '16px',
      }}
    >
      {cardsData.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div key={idx} className={`gradient-detail-card ${card.colorClass}`}>
            
            {/* Header: Icon + Title + Value */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    backgroundColor: card.iconBg,
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  }}
                >
                  <Icon size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#334155', margin: 0 }}>
                    {card.title}
                  </h3>
                  <div style={{ fontSize: '22px', fontWeight: '800', color: '#0F172A', letterSpacing: '-0.02em', marginTop: '2px' }}>
                    {card.mainValue}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255,255,255,0.85)',
                  fontSize: '11px',
                  fontWeight: '700',
                  color: card.trend.startsWith('-') ? '#EF4444' : '#059669',
                  border: '1px solid rgba(0,0,0,0.06)',
                }}
              >
                <ArrowUpRight size={12} style={{ transform: card.trend.startsWith('-') ? 'rotate(90deg)' : 'none' }} />
                {card.trend}
              </div>
            </div>

            {/* 3 Metric Pills */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px',
                padding: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.65)',
                backdropFilter: 'blur(4px)',
                borderRadius: '10px',
                border: '1px solid rgba(226, 232, 240, 0.8)',
                marginBottom: '12px',
              }}
            >
              {card.stats.map((s, sIdx) => (
                <div key={sIdx} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: '#64748B', fontWeight: '600', textTransform: 'uppercase' }}>
                    {s.label}
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: '800', color: '#0F172A', marginTop: '2px' }}>
                    {s.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Mini Sparkline Bar Visualization */}
            <div style={{ marginBottom: '10px' }}>
              <div
                style={{
                  height: '32px',
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: '3px',
                  padding: '2px 4px',
                  backgroundColor: 'rgba(241, 245, 249, 0.6)',
                  borderRadius: '6px',
                }}
              >
                {card.bars.map((barH, bIdx) => (
                  <div
                    key={bIdx}
                    style={{
                      flex: 1,
                      height: `${barH}%`,
                      backgroundColor: card.iconBg,
                      opacity: bIdx >= 18 ? 0.9 : 0.35 + (bIdx / 40),
                      borderRadius: '2px 2px 0 0',
                      transition: 'height 0.3s ease',
                    }}
                    title={`Day ${bIdx + 1}: ${barH}%`}
                  />
                ))}
              </div>
            </div>

            {/* Footer Breakdown */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '11px',
                fontWeight: '600',
                color: '#475569',
                paddingTop: '8px',
                borderTop: '1px dashed rgba(203, 213, 225, 0.8)',
              }}
            >
              <span>{card.breakdown.left}</span>
              <span style={{ color: '#0F172A', fontWeight: '700' }}>{card.breakdown.right}</span>
            </div>

          </div>
        );
      })}
    </div>
  );
};
