import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { Shield, ArrowRight, CheckCircle2, Lock, Mail, Truck } from 'lucide-react';
import { SYSTEM_ROLES } from '../../../utils/rbacConstants';

export const LoginPage = () => {
  const { login, loginByRole, switchRole, users } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('anil.kumar@truckmitr.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await login(email, password);
      if (res && res.success) {
        navigate('/one/dashboard');
      } else {
        setError(res?.error || 'Invalid email or password');
      }
    } catch (err) {
      setError(err?.message || 'Failed to authenticate with server');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (roleSlug) => {
    setError('');
    setLoading(true);
    try {
      const res = await loginByRole(roleSlug);
      if (res && res.success) {
        navigate('/one/dashboard');
      } else {
        await switchRole(roleSlug);
        navigate('/one/dashboard');
      }
    } catch (err) {
      navigate('/one/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#07192B',
        backgroundImage: 'radial-gradient(at 100% 0%, rgba(20, 103, 255, 0.18) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(245, 158, 11, 0.12) 0px, transparent 50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1020px',
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)'
        }}
      >
        {/* Left Side: Brand & Quick Role Switcher for Phase 1 Demo */}
        <div
          style={{
            background: 'linear-gradient(145deg, #0B1E36, #071526)',
            color: '#FFFFFF',
            padding: '48px 40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  backgroundColor: '#1467FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 20px rgba(20, 103, 255, 0.4)'
                }}
              >
                <Truck size={24} color="#FFF" />
              </div>
              <div>
                <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, letterSpacing: '-0.5px' }}>
                  TruckMitr <span style={{ color: '#2B83FF' }}>One</span>
                </h1>
                <p style={{ margin: 0, fontSize: '11px', color: '#94A3B8', letterSpacing: '0.5px' }}>
                  PEOPLE • VEHICLES • OPPORTUNITIES
                </p>
              </div>
            </div>

            <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 12px 0', lineHeight: 1.3 }}>
              Internal Enterprise Business Operating System
            </h2>
            <p style={{ fontSize: '13px', color: '#94A3B8', margin: '0 0 32px 0', lineHeight: 1.6 }}>
              Role-based control center powering operations, matchmaking pipelines, telecalling CRM, people management, and executive approvals.
            </p>

            {/* Quick 1-Click Role Login Box */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '20px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <Shield size={16} color="#F59E0B" />
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#F8FAFC' }}>
                  Instant Role Login (Demo & Testing)
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {SYSTEM_ROLES.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => handleQuickLogin(role.slug)}
                    style={{
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      color: '#E2E8F0',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(20, 103, 255, 0.2)';
                      e.currentTarget.style.borderColor = '#1467FF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>{role.badge.split(' ')[0]}</span>
                      <span>{role.name}</span>
                    </span>
                    <ArrowRight size={14} color="#94A3B8" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '24px' }}>
            TruckMitr Enterprise v2.4 • Confidential & Proprietary
          </div>
        </div>

        {/* Right Side: Standard Login Form */}
        <div style={{ padding: '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '22px', fontWeight: 800, color: '#0F172A' }}>
              Sign in to your account
            </h3>
            <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>
              Enter your corporate credentials or use quick-role switcher on left.
            </p>
          </div>

          {error && (
            <div
              style={{
                backgroundColor: '#FEE2E2',
                color: '#DC2626',
                border: '1px solid #FECACA',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '13px',
                marginBottom: '20px'
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Corporate Email
              </label>
              <div style={{ position: 'relative' }}>
                <Mail
                  size={16}
                  color="#94A3B8"
                  style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@truckmitr.com"
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: '11px 12px 11px 38px',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock
                  size={16}
                  color="#94A3B8"
                  style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: '11px 12px 11px 38px',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked /> Remember session (30 days)
              </label>
              <a href="#forgot" onClick={(e) => e.preventDefault()} style={{ color: '#1467FF', textDecoration: 'none', fontWeight: 600 }}>
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: '10px',
                backgroundColor: loading ? '#60A5FA' : '#1467FF',
                color: '#FFFFFF',
                border: 'none',
                padding: '13px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 8px 20px rgba(20, 103, 255, 0.25)',
                opacity: loading ? 0.8 : 1
              }}
            >
              {loading ? 'Signing in...' : 'Sign In to TruckMitr One'}
              <ArrowRight size={16} />
            </button>
          </form>

          <div
            style={{
              marginTop: '32px',
              padding: '14px',
              backgroundColor: '#F8FAFC',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px'
            }}
          >
            <CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '12px', color: '#475569', lineHeight: 1.4 }}>
              <strong>Protected Environment</strong>: All access and actions are captured into the central immutable audit log.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
