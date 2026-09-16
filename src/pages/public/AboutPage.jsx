import React from 'react';
import { Truck, ShieldCheck, Heart, Award, Users, CheckCircle } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';

export const AboutPage = () => {
  return (
    <div className="tm-container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px' }}>
        <Badge variant="primary">Our Mission</Badge>
        <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', fontWeight: 800, margin: '16px 0' }}>
          Digitizing & Dignifying the <br />
          <span className="gradient-text-primary">Indian Commercial Trucking Workforce</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.7' }}>
          TruckMitr is on a mission to build a transparent, safety-first ecosystem where commercial drivers earn respect, fair wages, and highway welfare, while fleet transporters gain instant access to verified driving talent.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '60px' }}>
        <Card>
          <div style={{ padding: '12px', width: 'fit-content', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', marginBottom: '16px' }}>
            <Users size={28} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '10px' }}>For Commercial Drivers</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
            Zero recruitment brokerage fees, direct company payroll jobs, accident insurance, digital welfare courses, and verified rest facilities.
          </p>
        </Card>

        <Card>
          <div style={{ padding: '12px', width: 'fit-content', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-accent-glow)', color: 'var(--color-accent)', marginBottom: '16px' }}>
            <Truck size={28} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '10px' }}>For Fleet Operators</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
            End-to-end recruitment automation, 24-hour candidate turnaround, pre-verified Vahan and court records, and reduced truck idle time.
          </p>
        </Card>

        <Card>
          <div style={{ padding: '12px', width: 'fit-content', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-success-bg)', color: 'var(--color-success)', marginBottom: '16px' }}>
            <Heart size={28} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '10px' }}>Highway Welfare Network</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
            Partnering with over 800+ highway dhabas, mechanics, and medical emergency points along all major national highways.
          </p>
        </Card>
      </div>
    </div>
  );
};
