import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  Save, 
  Target, 
  PhoneCall, 
  Sliders, 
  ShieldCheck, 
  Users,
  CheckCircle2
} from 'lucide-react';

export const TeleadminSettingsModal = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState({
    dailyQuota: 85,
    minConnectRate: 65,
    callbackGracePeriodHours: 4,
    maxPendingPerCaller: 25,
    autoAssignDrivers: true,
    enableWeekendRouting: false,
    leadExpiryDays: 30,
    priorityWeightMatch: 'high',
  });
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '640px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
          animation: 'modalSlideUp 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            backgroundColor: '#0F172A',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: 'rgba(249, 115, 22, 0.18)',
                color: '#F97316',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Settings size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '800', margin: 0 }}>
                Telecalling & Target Administration Settings
              </h2>
              <p style={{ fontSize: '12px', color: '#94A3B8', margin: '2px 0 0 0' }}>
                Configure caller quotas, auto-assignment rules, and connection targets
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: '#94A3B8',
              borderRadius: '8px',
              padding: '6px',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <div style={{ padding: '24px', maxHeight: 'calc(85vh - 140px)', overflowY: 'auto' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                Daily Calling Quota (Per Executive)
              </label>
              <input
                type="number"
                value={settings.dailyQuota}
                onChange={(e) => setSettings({ ...settings, dailyQuota: Number(e.target.value) })}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '14px',
                  fontWeight: '700',
                  color: '#0F172A',
                }}
              />
              <span style={{ fontSize: '11px', color: '#64748B' }}>Calls assigned per telecaller daily</span>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                Min Target Connected %
              </label>
              <input
                type="number"
                value={settings.minConnectRate}
                onChange={(e) => setSettings({ ...settings, minConnectRate: Number(e.target.value) })}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '14px',
                  fontWeight: '700',
                  color: '#0F172A',
                }}
              />
              <span style={{ fontSize: '11px', color: '#64748B' }}>Benchmark for green KPI indicator</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                Callback Grace Period (Hours)
              </label>
              <input
                type="number"
                value={settings.callbackGracePeriodHours}
                onChange={(e) => setSettings({ ...settings, callbackGracePeriodHours: Number(e.target.value) })}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '14px',
                  fontWeight: '700',
                  color: '#0F172A',
                }}
              />
              <span style={{ fontSize: '11px', color: '#64748B' }}>Hours before marked as overdue</span>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                Matchmaking Priority
              </label>
              <select
                value={settings.priorityWeightMatch}
                onChange={(e) => setSettings({ ...settings, priorityWeightMatch: e.target.value })}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '13px',
                  fontWeight: '700',
                  color: '#0F172A',
                  backgroundColor: '#FFFFFF',
                }}
              >
                <option value="high">High (Give preference to Verified Drivers)</option>
                <option value="standard">Standard (FIFO queue)</option>
                <option value="proximity">Proximity (State & City Distance)</option>
              </select>
              <span style={{ fontSize: '11px', color: '#64748B' }}>Algorithm matchmaking logic</span>
            </div>
          </div>

          {/* Toggle Switches */}
          <div style={{ backgroundColor: '#F8FAFC', borderRadius: '10px', padding: '14px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#0F172A' }}>Auto-Assign New Driver Leads</div>
                <div style={{ fontSize: '11px', color: '#64748B' }}>Distribute incoming registrations round-robin to logged-in executives</div>
              </div>
              <input
                type="checkbox"
                checked={settings.autoAssignDrivers}
                onChange={(e) => setSettings({ ...settings, autoAssignDrivers: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: '#E05A1B' }}
              />
            </label>

            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#0F172A' }}>Enable Weekend Outbound Calling</div>
                <div style={{ fontSize: '11px', color: '#64748B' }}>Allow automated IVR queues to execute on Saturdays and Sundays</div>
              </div>
              <input
                type="checkbox"
                checked={settings.enableWeekendRouting}
                onChange={(e) => setSettings({ ...settings, enableWeekendRouting: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: '#E05A1B' }}
              />
            </label>
          </div>

        </div>

        {/* Footer */}
        <div
          style={{
            padding: '16px 24px',
            backgroundColor: '#F8FAFC',
            borderTop: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: '9px 16px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              backgroundColor: '#FFFFFF',
              color: '#475569',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            style={{
              padding: '9px 24px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#E05A1B',
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {isSaved ? (
              <>
                <CheckCircle2 size={16} />
                Settings Saved!
              </>
            ) : (
              <>
                <Save size={16} />
                Save Target Settings
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
