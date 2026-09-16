import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Truck,
  Briefcase,
  Users,
  ShieldCheck,
  Search,
  MapPin,
  CheckCircle,
  ArrowRight,
  Sparkles,
  PhoneCall,
  Award,
  Zap,
  Star,
  ChevronRight,
  Compass,
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';

export const HomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [selectedState, setSelectedState] = useState('');

  const stats = [
    { label: 'Verified Commercial Drivers', value: '52,000+', icon: Users, color: 'var(--color-primary)' },
    { label: 'Fleet Owners & Transporters', value: '14,500+', icon: Truck, color: 'var(--color-accent)' },
    { label: 'Successful Placements', value: '98.4%', icon: CheckCircle, color: 'var(--color-success)' },
    { label: 'Verified Highway Dhabas', value: '850+', icon: Compass, color: '#A855F7' },
  ];

  const featuredJobs = [
    {
      id: 1,
      title: 'HCV Container Trailer Driver',
      company: 'All-India Freight Express',
      location: 'Delhi NCR to Mumbai Route',
      salary: '₹35,000 - ₹42,000 / month',
      vehicle: '22-Wheeler Trailer',
      experience: '5+ Years Required',
      perks: ['Trip Allowance', 'Medical Insurance', 'PF & ESI'],
      verified: true,
    },
    {
      id: 2,
      title: 'Heavy Tipper / Dumper Driver',
      company: 'North-Zone Infra Logistics',
      location: 'Haryana / Rajasthan Mining Zone',
      salary: '₹28,000 - ₹34,000 / month',
      vehicle: '10-Wheeler Tipper',
      experience: '3+ Years Required',
      perks: ['Food & Accommodation Provided', 'Overtime Bonus'],
      verified: true,
    },
    {
      id: 3,
      title: 'Refrigerated Tanker Driver',
      company: 'GreenLine Cold Chain Logistics',
      location: 'Gujarat to Bengaluru Highway',
      salary: '₹38,000 - ₹45,000 / month',
      vehicle: 'Multi-Axle Tanker',
      experience: '6+ Years Required',
      perks: ['FastTrack Joining', 'Direct Company Payroll'],
      verified: true,
    },
  ];

  const verifiedDrivers = [
    {
      id: 1,
      name: 'Ramesh Singh Yadav',
      experience: '9 Years',
      location: 'Sonipat, Haryana',
      license: 'Heavy Transport (HCV)',
      rating: 4.9,
      tripsCompleted: 420,
      skills: ['Multi-Axle Trailer', 'Hill Driving', 'GPS Nav'],
    },
    {
      id: 2,
      name: 'Gurpreet Singh',
      experience: '12 Years',
      location: 'Ludhiana, Punjab',
      license: 'Hazardous Goods & Tanker',
      rating: 5.0,
      tripsCompleted: 680,
      skills: ['Chemical Tanker', 'All-India Permit', 'Safe Driving'],
    },
    {
      id: 3,
      name: 'Santosh Kumar Pal',
      experience: '6 Years',
      location: 'Kanpur, Uttar Pradesh',
      license: 'Open Body / Container',
      rating: 4.8,
      tripsCompleted: 310,
      skills: ['Container Logistics', 'Night Driving', 'Maintenance'],
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/jobs?q=${encodeURIComponent(searchQuery)}&vehicle=${encodeURIComponent(vehicleType)}&state=${encodeURIComponent(selectedState)}`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
      {/* 1. HERO SECTION */}
      <section
        style={{
          position: 'relative',
          paddingTop: '60px',
          paddingBottom: '80px',
          overflow: 'hidden',
        }}
      >
        {/* Ambient Glows */}
        <div
          style={{
            position: 'absolute',
            top: '-10%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(255,107,0,0.18) 0%, rgba(11,15,25,0) 70%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <div className="tm-container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          {/* Trust Badge Pill */}
          <div style={{ display: 'inline-flex', marginBottom: '24px' }}>
            <Badge variant="primary" size="md" icon={Sparkles}>
              India's #1 Commercial Driver & Logistics Network
            </Badge>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              fontWeight: 900,
              letterSpacing: '-1px',
              maxWidth: '960px',
              margin: '0 auto 20px',
              lineHeight: 1.15,
            }}
          >
            Empowering Drivers. <br />
            <span className="gradient-text-primary">Transforming Fleet Logistics.</span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'var(--text-muted)',
              maxWidth: '740px',
              margin: '0 auto 40px',
              lineHeight: 1.6,
            }}
          >
            Connect with pre-verified commercial drivers, discover high-paying transport jobs, conduct instant background checks, and access 24/7 highway roadside support.
          </p>

          {/* Interactive Search Box */}
          <div
            className="glass-panel"
            style={{
              maxWidth: '920px',
              margin: '0 auto',
              padding: '16px',
              backgroundColor: 'rgba(19, 27, 46, 0.85)',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--border-strong)',
            }}
          >
            <form
              onSubmit={handleSearch}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr)) 160px',
                gap: '12px',
                alignItems: 'center',
              }}
            >
              <div style={{ position: 'relative' }}>
                <Search size={18} style={{ position: 'absolute', left: '14px', top: '15px', color: 'var(--text-dim)' }} />
                <input
                  type="text"
                  placeholder="Job title, route, or company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 42px',
                    backgroundColor: 'var(--bg-input)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-main)',
                    fontSize: '0.95rem',
                    outline: 'none',
                  }}
                />
              </div>

              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  backgroundColor: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-main)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                <option value="" style={{ background: '#131B2E' }}>Vehicle: All Types</option>
                <option value="Trailer" style={{ background: '#131B2E' }}>Multi-Axle Trailer</option>
                <option value="Container" style={{ background: '#131B2E' }}>Container Truck</option>
                <option value="Tipper" style={{ background: '#131B2E' }}>Tipper / Dumper</option>
                <option value="Tanker" style={{ background: '#131B2E' }}>Tanker (Chemical/Oil)</option>
                <option value="LCV" style={{ background: '#131B2E' }}>LCV / Mini Truck</option>
              </select>

              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  backgroundColor: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-main)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                <option value="" style={{ background: '#131B2E' }}>Location: All India</option>
                <option value="Delhi NCR" style={{ background: '#131B2E' }}>Delhi NCR</option>
                <option value="Haryana" style={{ background: '#131B2E' }}>Haryana</option>
                <option value="Maharashtra" style={{ background: '#131B2E' }}>Maharashtra</option>
                <option value="Gujarat" style={{ background: '#131B2E' }}>Gujarat</option>
                <option value="Punjab" style={{ background: '#131B2E' }}>Punjab</option>
                <option value="Rajasthan" style={{ background: '#131B2E' }}>Rajasthan</option>
              </select>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                icon={Search}
                fullWidth
              >
                Search
              </Button>
            </form>
          </div>

          {/* Quick Category Chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginTop: '24px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', alignSelf: 'center' }}>Popular:</span>
            {['Trailer Driver Jobs', 'Long Route Trucks', 'Fast Fastag Verification', 'Highway Dhaba Directory', 'Driver Training'].map((tag) => (
              <button
                key={tag}
                onClick={() => navigate(`/jobs?q=${encodeURIComponent(tag)}`)}
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-full)',
                  padding: '5px 14px',
                  color: 'var(--text-muted)',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="tm-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
          }}
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="glass-card"
                style={{
                  padding: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  borderBottom: `3px solid ${stat.color}`,
                }}
              >
                <div
                  style={{
                    padding: '14px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: stat.color,
                    display: 'flex',
                  }}
                >
                  <Icon size={28} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0 }}>{stat.value}</h3>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', margin: 0 }}>{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. CORE VALUE PILLARS */}
      <section className="tm-container">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <Badge variant="primary">Why TruckMitr</Badge>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginTop: '12px' }}>
            Built Specifically for the Indian Transport Ecosystem
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '8px auto 0' }}>
            Solving commercial driver shortages, streamlining recruitment, and enhancing highway safety with enterprise technology.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          <Card>
            <div style={{ padding: '12px', width: 'fit-content', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', marginBottom: '16px' }}>
              <Briefcase size={26} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '10px' }}>Fast Verified Hiring</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              Transporters can post requirements and connect with pre-screened, verified drivers in under 24 hours.
            </p>
          </Card>

          <Card>
            <div style={{ padding: '12px', width: 'fit-content', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-accent-glow)', color: 'var(--color-accent)', marginBottom: '16px' }}>
              <ShieldCheck size={26} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '10px' }}>Instant BGV & KYC Checks</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              Direct integration with government Vahan databases for real-time Driving License, RC, Court records, and Aadhaar verification.
            </p>
          </Card>

          <Card>
            <div style={{ padding: '12px', width: 'fit-content', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-success-bg)', color: 'var(--color-success)', marginBottom: '16px' }}>
              <Award size={26} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '10px' }}>Driver Welfare & Training</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              Interactive digital courses, safe driving certifications, roadside health & hygiene assistance, and referral rewards.
            </p>
          </Card>
        </div>
      </section>

      {/* 4. FEATURED JOBS SECTION */}
      <section className="tm-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
          <div>
            <Badge variant="warning">Hot Openings</Badge>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '8px' }}>Featured Driver Vacancies</h2>
          </div>
          <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right" onClick={() => navigate('/jobs')}>
            View All Open Jobs
          </Button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {featuredJobs.map((job) => (
            <Card key={job.id} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <Badge variant="primary" size="sm">{job.vehicle}</Badge>
                  {job.verified && <Badge variant="success" size="sm" icon={ShieldCheck}>Verified Transporter</Badge>}
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '6px' }}>{job.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-primary)', fontWeight: 600, marginBottom: '14px' }}>
                  {job.company}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={14} color="var(--color-accent)" />
                    <span>{job.location}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Zap size={14} color="var(--color-warning)" />
                    <strong style={{ color: 'var(--text-main)' }}>{job.salary}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                  {job.perks.map((perk) => (
                    <span
                      key={perk}
                      style={{
                        fontSize: '0.75rem',
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        padding: '3px 8px',
                        borderRadius: 'var(--radius-sm)',
                        color: 'var(--text-dim)',
                      }}
                    >
                      {perk}
                    </span>
                  ))}
                </div>
              </div>

              <Button
                variant="primary"
                size="md"
                fullWidth
                onClick={() => navigate(`/jobs`)}
              >
                Apply for Job
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* 5. VERIFIED DRIVERS DIRECTORY HIGHLIGHT */}
      <section className="tm-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
          <div>
            <Badge variant="success">Star Talent</Badge>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '8px' }}>Verified Drivers Available for Hiring</h2>
          </div>
          <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right" onClick={() => navigate('/drivers')}>
            Explore Driver Directory
          </Button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {verifiedDrivers.map((driver) => (
            <Card key={driver.id}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--color-secondary-light)',
                    color: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '1.2rem',
                    border: '2px solid var(--border-primary)',
                  }}
                >
                  {driver.name.charAt(0)}
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>{driver.name}</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: 'var(--color-warning)', fontSize: '0.8rem', fontWeight: 600 }}>
                      <Star size={13} fill="var(--color-warning)" /> {driver.rating}
                    </div>
                    <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>• {driver.tripsCompleted} Trips</span>
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
                <div><strong>Experience:</strong> {driver.experience}</div>
                <div><strong>License:</strong> {driver.license}</div>
                <div><strong>Base:</strong> {driver.location}</div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
                {driver.skills.map((skill) => (
                  <Badge key={skill} variant="neutral" size="sm">{skill}</Badge>
                ))}
              </div>

              <Button
                variant="secondary"
                size="sm"
                fullWidth
                onClick={() => navigate('/drivers')}
              >
                View Profile & Hire
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="tm-container">
        <div
          className="glass-panel"
          style={{
            padding: '60px 40px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(255, 107, 0, 0.15) 0%, rgba(15, 23, 42, 0.95) 100%)',
            border: '1px solid var(--border-primary)',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-primary)',
          }}
        >
          <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '16px' }}>
            Ready to Drive or Hire with Confidence?
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 32px', fontSize: '1.1rem' }}>
            Join over 65,000+ drivers and fleet owners scaling their transport business on India's most trusted platform.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
            <Button variant="primary" size="lg" icon={Briefcase} onClick={() => navigate('/jobs')}>
              Find Driver Jobs
            </Button>
            <Button variant="secondary" size="lg" icon={Truck} onClick={() => navigate('/register?role=transporter')}>
              Register as Fleet Owner
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
