import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Phone, Mail, MapPin, Heart, Shield, CheckCircle2 } from 'lucide-react';

export const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: 'var(--color-secondary)',
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: '64px',
        paddingBottom: '32px',
        marginTop: '80px',
      }}
    >
      <div className="tm-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px',
            marginBottom: '48px',
          }}
        >
          {/* Col 1: Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-md)',
                  background: 'linear-gradient(135deg, #FF6B00 0%, #FF9E00 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Truck color="#FFFFFF" size={20} />
              </div>
              <span style={{ fontSize: '1.3rem', fontWeight: 800 }}>
                Truck<span className="gradient-text-primary">Mitr</span>
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '20px' }}>
              India's premier technology-driven logistics ecosystem empowering commercial drivers, fleet owners, and highway service providers.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: 'var(--text-dim)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={15} color="var(--color-primary)" />
                <span>Helpline: 1800-TRUCK-MITR (Toll Free)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={15} color="var(--color-primary)" />
                <span>support@truckmitr.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={15} color="var(--color-primary)" />
                <span>Sonipat, Haryana - 131001, India</span>
              </div>
            </div>
          </div>

          {/* Col 2: For Commercial Drivers */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '20px', color: 'var(--text-main)' }}>
              For Drivers (चालक)
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <li><Link to="/jobs" style={{ hover: { color: 'var(--color-primary)' } }}>Search Truck Jobs</Link></li>
              <li><Link to="/driver/dashboard">Driver Dashboard</Link></li>
              <li><Link to="/driver/welfare">Driver Welfare & Training</Link></li>
              <li><Link to="/driver/profile">Aadhaar & DL Verification</Link></li>
              <li><Link to="/driver/referrals">Refer & Earn Rewards</Link></li>
            </ul>
          </div>

          {/* Col 3: For Transporters & Fleets */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '20px', color: 'var(--text-main)' }}>
              For Fleets & Transporters
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <li><Link to="/transporter/post-job">Post Driver Job</Link></li>
              <li><Link to="/drivers">Hire Verified Drivers</Link></li>
              <li><Link to="/transporter/verification-suite">DL & RC Verification API</Link></li>
              <li><Link to="/fleet">Transporter Subscription Plans</Link></li>
              <li><Link to="/transporter/dashboard">Fleet Management Hub</Link></li>
            </ul>
          </div>

          {/* Col 4: Roadside & Trust */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '20px', color: 'var(--text-main)' }}>
              Highway & Support
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <li><Link to="/amenities">Highway Dhabas Network</Link></li>
              <li><Link to="/amenities">Puncture & Repair Centers</Link></li>
              <li><Link to="/about">About TruckMitr Mission</Link></li>
              <li><Link to="/contact">24/7 Roadside Assistance</Link></li>
            </ul>

            <div
              style={{
                marginTop: '20px',
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Shield size={24} color="var(--color-success)" />
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <strong style={{ color: 'var(--text-main)', display: 'block' }}>100% Government Verified</strong>
                BEFISC & Vahan Integrated
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.825rem',
            color: 'var(--text-dim)',
            gap: '12px',
          }}
        >
          <div>
            © {new Date().getFullYear()} TruckMitr Pvt Ltd. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/term-of-use">Terms of Service</Link>
            <Link to="/contact">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
