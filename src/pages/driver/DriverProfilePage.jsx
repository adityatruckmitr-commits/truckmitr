import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertCircle, FileText, User, Phone, MapPin, Upload } from 'lucide-react';
import { PortalLayout } from '../../components/layout/PortalLayout';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const DriverProfilePage = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [profile, setProfile] = useState({
    name: user?.name || 'Rajesh Kumar Verma',
    phone: user?.phone || '9876543210',
    experience: '8 Years',
    licenseNumber: 'HR-0620180098421',
    licenseExpiry: '15-Nov-2028',
    aadhaarNumber: 'XXXX-XXXX-4589',
    preferredRoute: 'Delhi NCR - Mumbai JNPT',
  });

  const [saving, setSaving] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      showToast('Profile and route preferences updated successfully!', 'success');
    }, 800);
  };

  const kycStatus = [
    { title: 'Driving License (DL) Verification', status: 'Verified via Vahan', verified: true },
    { title: 'Aadhaar Masking OCR Check', status: 'Identity Confirmed', verified: true },
    { title: 'Face Match Biometrics', status: '98.5% Match', verified: true },
    { title: 'District Court Litigation Check', status: 'Clean Record (No Pending FIR)', verified: true },
  ];

  return (
    <PortalLayout title="Driver KYC & Profile" subtitle="Manage your government verified documents and profile details">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
        {/* Left: Profile Form */}
        <Card>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px' }}>Personal & License Information</h3>
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Input
              label="Full Name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              required
            />
            <Input
              label="Contact Number"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              required
            />
            <Input
              label="Driving License Number"
              value={profile.licenseNumber}
              onChange={(e) => setProfile({ ...profile, licenseNumber: e.target.value })}
              required
            />
            <Input
              label="License Valid Till"
              value={profile.licenseExpiry}
              onChange={(e) => setProfile({ ...profile, licenseExpiry: e.target.value })}
            />
            <Input
              label="Preferred Long Haul Route"
              value={profile.preferredRoute}
              onChange={(e) => setProfile({ ...profile, preferredRoute: e.target.value })}
            />

            <Button variant="primary" size="md" type="submit" loading={saving}>
              Save Profile Changes
            </Button>
          </form>
        </Card>

        {/* Right: KYC Status Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Card>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={22} color="var(--color-success)" /> Government BGV Compliance
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Your verified trust score is 100/100. Fleet managers can hire you with 1-click confirmation.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {kycStatus.map((item) => (
                <div
                  key={item.title}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <div>
                    <h5 style={{ fontSize: '0.875rem', fontWeight: 600, margin: 0 }}>{item.title}</h5>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-success)' }}>{item.status}</span>
                  </div>
                  <Badge variant="success" size="sm" icon={CheckCircle2}>Passed</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '12px' }}>Update Document Uploads</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Upload refreshed copies of your Driving License or Medical Fitness Certificate.
            </p>
            <Button
              variant="secondary"
              size="sm"
              icon={Upload}
              fullWidth
              onClick={() => showToast('Choose file from your device to upload DL photo', 'info')}
            >
              Upload New DL Photo
            </Button>
          </Card>
        </div>
      </div>
    </PortalLayout>
  );
};
