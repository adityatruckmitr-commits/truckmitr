import React from 'react';
import { ChevronRight } from 'lucide-react';
import { MATCHMAKING_PIPELINE_DATA } from '../../services/dashboardMockData';

/**
 * FunnelPipeline: Horizontal multi-step funnel showing counts & step conversion/drop-off %
 */
export const FunnelPipeline = ({ data = MATCHMAKING_PIPELINE_DATA }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        overflowX: 'auto',
        padding: '8px 4px 12px 4px',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      {data.map((stage, index) => {
        const isLast = index === data.length - 1;
        const nextStage = !isLast ? data[index + 1] : null;
        const dropoffPercent =
          nextStage && stage.count > 0
            ? Math.round((nextStage.count / stage.count) * 100)
            : null;

        return (
          <React.Fragment key={stage.step}>
            {/* Stage Card */}
            <div
              style={{
                flex: 1,
                minWidth: '105px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                padding: '12px 10px',
                textAlign: 'center',
                transition: 'all 0.15s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#EFF6FF';
                e.currentTarget.style.borderColor = '#93C5FD';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#F8FAFC';
                e.currentTarget.style.borderColor = '#E2E8F0';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div
                style={{
                  fontSize: '20px',
                  fontWeight: 800,
                  color: stage.color || '#0F172A',
                  letterSpacing: '-0.5px'
                }}
              >
                {stage.count}
              </div>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#475569',
                  marginTop: '4px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '100px'
                }}
              >
                {stage.step}
              </div>
              <div
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  color: '#94A3B8',
                  marginTop: '2px'
                }}
              >
                {stage.percent}
              </div>
            </div>

            {/* Pipeline Step Connector with Dropoff Conversion Indicator */}
            {!isLast && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '2px',
                  color: '#CBD5E1',
                  flexShrink: 0
                }}
              >
                <ChevronRight size={16} color="#94A3B8" />
                {dropoffPercent !== null && (
                  <span
                    style={{
                      fontSize: '9px',
                      fontWeight: 700,
                      color: dropoffPercent >= 50 ? '#059669' : '#D97706'
                    }}
                  >
                    {dropoffPercent}%
                  </span>
                )}
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
