import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertCircle, FileText, Search, Zap, Wallet } from 'lucide-react';
import { PortalLayout } from '../../components/layout/PortalLayout';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { useToast } from '../../context/ToastContext';

export const VerificationSuitePage = () => {
  const { showToast } = useToast();
  const [activeCheckType, setActiveCheckType] = useState('dl'); // 'dl' | 'rc' | 'court' | 'pan'
  const [inputValue, setInputValue] = useState('HR0620180098421');
  const [dob, setDob] = useState('1988-06-15');
  const [loading, setLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);

  const handleVerify = (e) => {
    e.preventDefault();
    if (!inputValue) {
      showToast('Please enter document number', 'warning');
      return;
    }

    setLoading(true);
    setVerificationResult(null);

    setTimeout(() => {
      setLoading(false);
      if (activeCheckType === 'dl') {
        setVerificationResult({
          status: 'VALID',
          holderName: 'RAJESH KUMAR VERMA',
          licenseNumber: inputValue.toUpperCase(),
          issueDate: '14-JUN-2018',
          validTill: '13-JUN-2028',
          vehicleClasses: ['TRANS (Transport)', 'MCWG (Motor Cycle with Gear)', 'LMV (Light Motor Vehicle)'],
          rtoLocation: 'SONIPAT, HARYANA (HR-06)',
          bloodGroup: 'B+ve',
        });
      } else if (activeCheckType === 'rc') {
        setVerificationResult({
          status: 'ACTIVE',
          rcNumber: inputValue.toUpperCase(),
          ownerName: 'SHARMA FREIGHT LINES PVT LTD',
          makerModel: 'TATA MOTORS PRIMA 5530.S TRAILER',
          fuelType: 'DIESEL BS-VI',
          insuranceValidTill: '24-OCT-2027',
          fitnessValidTill: '18-NOV-2027',
          pucValidTill: '10-MAY-2027',
          nationalPermit: 'VALID ALL-INDIA (AIP)',
        });
      } else if (activeCheckType === 'court') {
        setVerificationResult({
          status: 'NO_RECORD_FOUND',
          verdict: 'CLEAN (NO ACTIVE CRIMINAL/CIVIL LITIGATION FOUND)',
          matchedCourts: 'District & Sessions Court Sonipat, Delhi High Court e-Courts Portal',
          checkDate: new Date().toLocaleDateString('en-GB'),
        });
      }
      showToast('BEFISC Government API Check completed successfully! Deducted ₹25 from Wallet.', 'success');
    }, 1100);
  };

  return (
    <PortalLayout title="BEFISC Verification & KYC Suite" subtitle="Instant automated Driving License, RC, Court and PAN government checks">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {/* Top Wallet Bar */}
        <div
          className="glass-panel"
          style={{
            padding: '16px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Wallet size={20} color="var(--color-primary)" />
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              BGV API Credit Balance: <strong style={{ color: 'var(--color-success)', fontSize: '1.1rem' }}>₹2,400</strong> (Approx. 96 checks remaining)
            </span>
          </div>
          <Button variant="outline" size="sm" onClick={() => showToast('Redirecting to Razorpay checkout...', 'info')}>
            + Recharge Credits
          </Button>
        </div>

        {/* Check Type Tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {[
            { id: 'dl', label: '🪪 Driving License (DL)' },
            { id: 'rc', label: '🚚 Vehicle Registration (RC)' },
            { id: 'court', label: '⚖️ District Court Background Check' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveCheckType(tab.id);
                setVerificationResult(null);
                if (tab.id === 'dl') setInputValue('HR0620180098421');
                else if (tab.id === 'rc') setInputValue('HR55AN1024');
                else if (tab.id === 'court') setInputValue('Rajesh Kumar Verma');
              }}
              style={{
                padding: '10px 20px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid',
                borderColor: activeCheckType === tab.id ? 'var(--color-primary)' : 'var(--border-subtle)',
                backgroundColor: activeCheckType === tab.id ? 'var(--color-primary)' : 'var(--bg-surface)',
                color: activeCheckType === tab.id ? '#FFFFFF' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Input & Action Form */}
        <Card>
          <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: activeCheckType === 'dl' ? '1fr 220px 180px' : '1fr 180px', gap: '16px', alignItems: 'flex-end' }}>
              <Input
                label={
                  activeCheckType === 'dl' ? 'Driving License Number' :
                  activeCheckType === 'rc' ? 'Vehicle RC Number' : 'Full Legal Name & Father Name'
                }
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                required
              />

              {activeCheckType === 'dl' && (
                <Input
                  label="Date of Birth"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                />
              )}

              <Button
                type="submit"
                variant="primary"
                size="md"
                loading={loading}
                icon={Search}
                fullWidth
              >
                Verify Now
              </Button>
            </div>
          </form>
        </Card>

        {/* Verification Result Output */}
        {verificationResult && (
          <Card className="animate-fade-in" style={{ border: '1.5px solid var(--color-success)', backgroundColor: 'rgba(16, 185, 129, 0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={24} color="var(--color-success)" />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Official Verification Report</h3>
              </div>
              <Badge variant="success" size="md">
                Status: {verificationResult.status}
              </Badge>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', fontSize: '0.9rem' }}>
              {Object.entries(verificationResult).map(([k, v]) => (
                <div key={k} style={{ padding: '10px 14px', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)' }}>
                  <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                    {k.replace(/([A-Z])/g, ' $1')}
                  </span>
                  <strong style={{ color: 'var(--text-main)' }}>
                    {Array.isArray(v) ? v.join(', ') : String(v)}
                  </strong>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <Button variant="secondary" size="sm" onClick={() => showToast('Generated & Downloaded Verification Certificate PDF', 'success')}>
                Download Verification PDF Report
              </Button>
            </div>
          </Card>
        )}
      </div>
    </PortalLayout>
  );
};
