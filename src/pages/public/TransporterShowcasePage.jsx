import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Truck,
  ShieldCheck,
  Zap,
  Users,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  FileCheck,
  CreditCard,
  MapPin,
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';

export const TransporterShowcasePage = () => {
  const navigate = useNavigate();

  const pricingPlans = [
    {
      name: 'Starter Fleet',
      price: '₹2,499',
      period: '/ month',
      description: 'Ideal for small fleet owners managing up to 5 commercial vehicles.',
      features: [
        'Post up to 5 Active Jobs',
        'Direct Access to 50 Verified Driver Profiles',
        '5 Free DL & RC Instant Checks',
        'Basic Telecalling Support',
        'Standard Email & WhatsApp Alerts',
      ],
      highlight: false,
    },
    {
      name: 'Enterprise Logistics Pro',
      price: '₹5,999',
      period: '/ month',
      description: 'For mid to large scale logistics companies seeking automated hiring and BGV.',
      features: [
        'Unlimited Active Job Postings',
        'Unlimited Driver Profile Views',
        '25 Instant BEFISC DL / RC / Court Checks',
        'Dedicated Matchmaking Coordinator',
        'Integrated Agora Video Interview Portal',
        'Priority 24/7 Phone Helpline',
      ],
      highlight: true,
    },
    {
      name: 'Corporate Fleet Custom',
      price: '₹14,999',
      period: '/ month',
      description: 'Comprehensive solution with dedicated account manager and custom API access.',
      features: [
        'Dedicated Placement Specialist',
        'Custom Bulk BGV Verification API Key',
        '100+ Free Government Document Checks',
        'On-site Physical Address Verification',
        'Traqo SIM Tracking Integration',
        'Custom Invoicing & GST Support',
      ],
      highlight: false,
    },
  ];

  return (
    <div className="tm-container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      {/* Hero Section */}
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px' }}>
        <Badge variant="primary" size="md">Enterprise Fleet Solutions</Badge>
        <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 800, margin: '16px 0' }}>
          Stop Losing Revenue to <br />
          <span className="gradient-text-primary">Idle Trucks & Driver Shortages</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.7' }}>
          TruckMitr gives fleet operators instant access to India's largest verified driver talent pool and automated background verification tools.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '28px' }}>
          <Button variant="primary" size="lg" icon={Truck} onClick={() => navigate('/register?role=transporter')}>
            Start Free Trial
          </Button>
          <Button variant="secondary" size="lg" icon={ShieldCheck} onClick={() => navigate('/transporter/verification-suite')}>
            Test BGV Verification API
          </Button>
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '80px',
        }}
      >
        <Card>
          <div style={{ padding: '12px', width: 'fit-content', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', marginBottom: '16px' }}>
            <Users size={26} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '10px' }}>Matchmaking in 24 Hours</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
            Our algorithm matches your truck type, route, and budget with available pre-screened drivers, backed by our internal telecalling team.
          </p>
        </Card>

        <Card>
          <div style={{ padding: '12px', width: 'fit-content', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-success-bg)', color: 'var(--color-success)', marginBottom: '16px' }}>
            <FileCheck size={26} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '10px' }}>Zero Risk Verification</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
            Verify Driving Licenses, Aadhaar OCR, Vehicle RC, and Court Litigation records instantly via BEFISC government API integration.
          </p>
        </Card>

        <Card>
          <div style={{ padding: '12px', width: 'fit-content', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-accent-glow)', color: 'var(--color-accent)', marginBottom: '16px' }}>
            <TrendingUp size={26} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '10px' }}>Maximized Fleet Uptime</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
            Reduce driver turnover rate by over 40% with verified candidate reviews, skill-matched placements, and welfare incentives.
          </p>
        </Card>
      </div>

      {/* Subscription Pricing Tiers */}
      <div style={{ marginBottom: '60px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Badge variant="warning">Transparent Pricing</Badge>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginTop: '10px' }}>Flexible Subscription Plans</h2>
          <p style={{ color: 'var(--text-muted)' }}>Choose the right plan to accelerate your logistics operation.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
          {pricingPlans.map((plan) => (
            <Card
              key={plan.name}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: plan.highlight ? '2px solid var(--color-primary)' : '1px solid var(--border-subtle)',
                backgroundColor: plan.highlight ? 'rgba(255, 107, 0, 0.04)' : 'var(--bg-card)',
                transform: plan.highlight ? 'scale(1.02)' : 'none',
              }}
            >
              <div>
                {plan.highlight && (
                  <div style={{ display: 'inline-block', marginBottom: '12px' }}>
                    <Badge variant="primary" size="sm">Most Popular</Badge>
                  </div>
                )}
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '6px' }}>{plan.name}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '20px' }}>{plan.description}</p>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '24px' }}>
                  <span style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-main)' }}>{plan.price}</span>
                  <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>{plan.period}</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
                  {plan.features.map((feat) => (
                    <div key={feat} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                      <CheckCircle2 size={16} color="var(--color-success)" style={{ flexShrink: 0 }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                variant={plan.highlight ? 'primary' : 'secondary'}
                size="md"
                fullWidth
                onClick={() => navigate('/register?role=transporter')}
              >
                Choose {plan.name}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
