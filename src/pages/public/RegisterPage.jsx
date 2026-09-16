import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Truck,
  Users,
  ShieldCheck,
  Compass,
  ArrowRight,
  Phone,
  User,
  Building,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const RegisterPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { switchDemoRole } = useAuth();
  const { showToast } = useToast();

  const [role, setRole] = useState(searchParams.get('role') || 'driver');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    companyName: '',
    state: 'Haryana',
    licenseType: 'Heavy Commercial Vehicle (HCV)',
  });
  const [loading, setLoading] = useState(false);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      showToast('Please fill in your name and phone number', 'warning');
      return;
    }
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      switchDemoRole(role);
      showToast(`Account created successfully! Welcome to TruckMitr.`, 'success');

      if (role === 'driver') navigate('/driver/dashboard');
      else if (role === 'transporter') navigate('/transporter/dashboard');
      else navigate('/');
    }, 800);
  };

  const personaOptions = [
    { id: 'driver', title: 'Commercial Driver (चालक)', desc: 'Find high-paying truck jobs, accident insurance & training', icon: Users },
    { id: 'transporter', title: 'Transporter / Fleet Owner', desc: 'Hire pre-verified drivers, verify DL/RC, manage fleet', icon: Truck },
    { id: 'amenity', title: 'Highway Dhaba / Repair', desc: 'Join our verified roadside amenities directory', icon: Compass },
  ];

  return (
    <div
      className="tm-container"
      style={{
        paddingTop: '50px',
        paddingBottom: '80px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ width: '100%', maxWidth: '580px' }}>
        <Card padding="36px">
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: '6px' }}>Create Your TruckMitr Account</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem' }}>
              Choose your profile type to get customized features
            </p>
          </div>

          {/* Persona Selection Pills */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
            {personaOptions.map((item) => {
              const Icon = item.icon;
              const isSelected = role === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setRole(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '14px 18px',
                    borderRadius: 'var(--radius-md)',
                    border: `1.5px solid ${isSelected ? 'var(--color-primary)' : 'var(--border-subtle)'}`,
                    backgroundColor: isSelected ? 'var(--color-primary-light)' : 'var(--bg-surface)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ color: isSelected ? 'var(--color-primary)' : 'var(--text-muted)' }}>
                    <Icon size={24} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: isSelected ? 'var(--color-primary)' : 'var(--text-main)', margin: 0 }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', margin: 0 }}>{item.desc}</p>
                  </div>
                  {isSelected && <CheckCircle2 size={20} color="var(--color-primary)" />}
                </div>
              );
            })}
          </div>

          {/* Registration Fields */}
          <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Input
              label={role === 'transporter' ? 'Contact Person Name' : 'Full Name (पूरा नाम)'}
              placeholder="e.g. Rajesh Sharma"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              icon={User}
              required
            />

            {role === 'transporter' && (
              <Input
                label="Company / Fleet Name"
                placeholder="e.g. Sharma Freight Lines Pvt Ltd"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                icon={Building}
                required
              />
            )}

            <Input
              label="Mobile Number (मोबाइल नंबर)"
              placeholder="10-digit mobile number"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              icon={Phone}
              required
            />

            <Select
              label="State / Location (राज्य)"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              options={[
                { value: 'Haryana', label: 'Haryana' },
                { value: 'Delhi NCR', label: 'Delhi NCR' },
                { value: 'Punjab', label: 'Punjab' },
                { value: 'Gujarat', label: 'Gujarat' },
                { value: 'Maharashtra', label: 'Maharashtra' },
                { value: 'Rajasthan', label: 'Rajasthan' },
                { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
              ]}
            />

            {role === 'driver' && (
              <Select
                label="Primary Commercial Vehicle License"
                value={formData.licenseType}
                onChange={(e) => setFormData({ ...formData, licenseType: e.target.value })}
                options={[
                  { value: 'Heavy Commercial Vehicle (HCV)', label: 'Multi-Axle Trailer (HCV)' },
                  { value: 'Hazardous Chemical Tanker', label: 'Chemical / Liquid Tanker' },
                  { value: 'Tipper & Dumper Heavy', label: 'Tipper / Dumper' },
                  { value: 'Light Commercial Vehicle (LCV)', label: 'LCV / 4-Wheeler Delivery' },
                ]}
              />
            )}

            <Button
              variant="primary"
              size="lg"
              type="submit"
              loading={loading}
              icon={ArrowRight}
              iconPosition="right"
              fullWidth
            >
              Complete Registration
            </Button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
              Sign In Here
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
