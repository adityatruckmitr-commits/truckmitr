import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Phone,
  Lock,
  ArrowRight,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, switchDemoRole } = useAuth();
  const { showToast } = useToast();

  const [loginMethod, setLoginMethod] = useState('otp'); // 'otp' | 'password'
  const [role, setRole] = useState('driver');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      showToast('Please enter a valid 10-digit mobile number', 'warning');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      showToast(`OTP 123456 sent successfully to ${phone}! (Demo code: 123456)`, 'success');
    }, 800);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      switchDemoRole(role);
      showToast(`Welcome back! Logged in as ${role.toUpperCase()}`, 'success');

      if (role === 'driver') navigate('/driver/dashboard');
      else if (role === 'transporter') navigate('/transporter/dashboard');
      else if (role === 'crm') navigate('/crm/dashboard');
      else if (role === 'admin') navigate('/admin/dashboard');
      else navigate('/jobs');
    }, 600);
  };

  return (
    <div
      className="tm-container"
      style={{
        paddingTop: '60px',
        paddingBottom: '80px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 200px)',
      }}
    >
      <div style={{ width: '100%', maxWidth: '480px' }}>
        <Card padding="36px">
          {/* Logo & Title */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, #FF6B00 0%, #FF9E00 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                boxShadow: '0 4px 20px var(--color-primary-glow)',
              }}
            >
              <Truck color="#FFFFFF" size={28} />
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '6px' }}>Sign in to TruckMitr</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Access your driver jobs, fleet postings, or operations console
            </p>
          </div>

          {/* Role Selection Dropdown */}
          <div style={{ marginBottom: '20px' }}>
            <Select
              label="Select Your Role / Portal"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              options={[
                { value: 'driver', label: '🚚 Commercial Driver (चालक)' },
                { value: 'transporter', label: '🏢 Fleet Owner / Transporter' },
                { value: 'crm', label: '📞 Telecaller & Matchmaking CRM' },
                { value: 'admin', label: '🛡️ Super Administrator' },
              ]}
            />
          </div>

          {/* Method Tabs (OTP vs Password) */}
          <div
            style={{
              display: 'flex',
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-md)',
              padding: '4px',
              marginBottom: '24px',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <button
              onClick={() => { setLoginMethod('otp'); setOtpSent(false); }}
              style={{
                flex: 1,
                padding: '8px',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: loginMethod === 'otp' ? 'var(--color-primary)' : 'transparent',
                color: loginMethod === 'otp' ? '#FFFFFF' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              Phone OTP
            </button>
            <button
              onClick={() => setLoginMethod('password')}
              style={{
                flex: 1,
                padding: '8px',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: loginMethod === 'password' ? 'var(--color-primary)' : 'transparent',
                color: loginMethod === 'password' ? '#FFFFFF' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              Password Login
            </button>
          </div>

          {/* Form */}
          {loginMethod === 'otp' ? (
            <form onSubmit={otpSent ? handleLoginSubmit : handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Input
                label="Registered Mobile Number"
                placeholder="10-digit mobile number"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                icon={Phone}
                disabled={otpSent}
                required
              />

              {otpSent && (
                <div className="animate-fade-in">
                  <Input
                    label="Enter 6-Digit Verification Code"
                    placeholder="e.g. 123456"
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    helperText="Demo test code: 123456"
                    required
                  />
                </div>
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
                {otpSent ? 'Verify OTP & Enter' : 'Get OTP on Phone'}
              </Button>

              {otpSent && (
                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-dim)', fontSize: '0.85rem', cursor: 'pointer' }}
                >
                  Change Mobile Number
                </button>
              )}
            </form>
          ) : (
            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Input
                label="Mobile Number / Email"
                placeholder="Enter mobile or email"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                icon={Phone}
                required
              />
              <Input
                label="Password"
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={Lock}
                required
              />
              <Button
                variant="primary"
                size="lg"
                type="submit"
                loading={loading}
                icon={ArrowRight}
                iconPosition="right"
                fullWidth
              >
                Sign In
              </Button>
            </form>
          )}

          {/* Bottom Switch to Register */}
          <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            New to TruckMitr?{' '}
            <Link to="/register" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
              Create an Account
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
