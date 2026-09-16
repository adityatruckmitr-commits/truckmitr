import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  MapPin,
  Truck,
  ShieldCheck,
  Zap,
  CheckCircle,
  Clock,
  DollarSign,
  Briefcase,
  X,
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { useToast } from '../../context/ToastContext';

const INITIAL_JOBS = [
  {
    id: 1,
    title: 'HCV Container Trailer Driver (22 Wheeler)',
    company: 'All-India Freight Express',
    location: 'Delhi NCR to Mumbai',
    state: 'Delhi NCR',
    salary: 38000,
    salaryFormatted: '₹35,000 - ₹42,000 / mo',
    vehicle: 'Trailer',
    experience: '5+ Years',
    type: 'Full Time',
    posted: '2 hours ago',
    description: 'Looking for experienced heavy commercial vehicle trailer driver for regular route between Delhi NCR and JNPT Mumbai port. Fastag & diesel allowance provided upfront.',
    perks: ['Trip Allowance', 'Accident Insurance', 'PF & ESI', 'Night Rest Stops'],
    verified: true,
  },
  {
    id: 2,
    title: 'Heavy Tipper / Dumper Mining Driver',
    company: 'North-Zone Infra Logistics',
    location: 'Sonipat & Jaipur Mining Corridor',
    state: 'Haryana',
    salary: 32000,
    salaryFormatted: '₹28,000 - ₹34,000 / mo',
    vehicle: 'Tipper',
    experience: '3+ Years',
    type: 'Full Time',
    posted: '5 hours ago',
    description: 'Requires experienced 10-wheeler tipper driver for sand and gravel transport. Free company accommodation and mess provided on site.',
    perks: ['Free Accommodation', 'Overtime Bonus', 'Direct Bank Transfer'],
    verified: true,
  },
  {
    id: 3,
    title: 'Multi-Axle Chemical Tanker Captain',
    company: 'GreenLine Cold & Liquid Logistics',
    location: 'Dahej, Gujarat to Bengaluru',
    state: 'Gujarat',
    salary: 44000,
    salaryFormatted: '₹40,000 - ₹48,000 / mo',
    vehicle: 'Tanker',
    experience: '6+ Years',
    type: 'Full Time',
    posted: '1 day ago',
    description: 'Urgent requirement for certified hazardous goods tanker driver. Must hold valid endorsement and clean driving track record.',
    perks: ['High Incentive per KM', 'Safety Bonus', 'Medical Coverage'],
    verified: true,
  },
  {
    id: 4,
    title: 'Open Body Heavy Truck Driver (16 Wheeler)',
    company: 'Bhardwaj Roadways',
    location: 'Ludhiana to Kolkata Route',
    state: 'Punjab',
    salary: 34000,
    salaryFormatted: '₹32,000 - ₹36,000 / mo',
    vehicle: 'Open Body',
    experience: '4+ Years',
    type: 'Full Time',
    posted: '2 days ago',
    description: 'Carrying agricultural and steel cargo. Long haul driver needed with all-India driving experience and valid commercial license.',
    perks: ['Return Trip Incentive', 'Toll Passes', 'Driver Rest House'],
    verified: false,
  },
  {
    id: 5,
    title: 'Electric Commercial Fleet Driver (EV LCV)',
    company: 'EcoLogistics India',
    location: 'Bengaluru Intra-City',
    state: 'Karnataka',
    salary: 26000,
    salaryFormatted: '₹24,000 - ₹28,000 / mo',
    vehicle: 'LCV',
    experience: '1+ Years',
    type: 'Full Time',
    posted: '3 days ago',
    description: 'Intra-city FMCG parcel delivery using electric 4-wheeler trucks. Fixed 8-hour daytime shifts with weekly off.',
    perks: ['Fixed Daytime Hours', 'Weekly Off', 'Performance Incentives'],
    verified: true,
  },
];

export const JobsPage = () => {
  const [searchParams] = useSearchParams();
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedVehicle, setSelectedVehicle] = useState(searchParams.get('vehicle') || '');
  const [selectedState, setSelectedState] = useState(searchParams.get('state') || '');
  const [minSalary, setMinSalary] = useState('');
  const [selectedJobForApply, setSelectedJobForApply] = useState(null);

  // Application form state
  const [applyForm, setApplyForm] = useState({
    name: '',
    phone: '',
    experience: '3-5 Years',
    licenseNumber: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const filteredJobs = useMemo(() => {
    return INITIAL_JOBS.filter((job) => {
      const matchesQuery =
        !searchQuery ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesVehicle = !selectedVehicle || job.vehicle === selectedVehicle;
      const matchesState = !selectedState || job.state === selectedState;
      const matchesSalary = !minSalary || job.salary >= Number(minSalary);

      return matchesQuery && matchesVehicle && matchesState && matchesSalary;
    });
  }, [searchQuery, selectedVehicle, selectedState, minSalary]);

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!applyForm.name || !applyForm.phone) {
      showToast('Please provide your name and phone number', 'warning');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSelectedJobForApply(null);
      showToast(`Application submitted successfully for "${selectedJobForApply.title}"! The fleet manager will call you shortly.`, 'success');
      setApplyForm({ name: '', phone: '', experience: '3-5 Years', licenseNumber: '' });
    }, 1000);
  };

  return (
    <div className="tm-container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '8px' }}>
          Commercial Driver Jobs <span className="gradient-text-primary">Marketplace</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
          Explore direct verified openings from leading fleet owners and logistics companies across India.
        </p>
      </div>

      {/* Main Grid Layout: Filters + Results */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '280px 1fr',
          gap: '32px',
          alignItems: 'start',
        }}
        className="jobs-page-grid"
      >
        {/* Left Filter Sidebar */}
        <aside
          className="glass-panel"
          style={{
            padding: '24px',
            backgroundColor: 'var(--bg-surface)',
            position: 'sticky',
            top: '96px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Filter size={18} color="var(--color-primary)" /> Filter Jobs
            </h3>
            {(selectedVehicle || selectedState || minSalary || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedVehicle('');
                  setSelectedState('');
                  setMinSalary('');
                  setSearchQuery('');
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-danger)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Reset
              </button>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <Input
              label="Keywords"
              placeholder="Title, city or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={Search}
            />

            <Select
              label="Vehicle Category"
              value={selectedVehicle}
              onChange={(e) => setSelectedVehicle(e.target.value)}
              placeholder="All Vehicle Types"
              options={[
                { value: 'Trailer', label: 'Multi-Axle Trailer' },
                { value: 'Container', label: 'Container Truck' },
                { value: 'Tipper', label: 'Tipper / Dumper' },
                { value: 'Tanker', label: 'Tanker' },
                { value: 'Open Body', label: 'Open Body Truck' },
                { value: 'LCV', label: 'LCV / Mini Truck' },
              ]}
            />

            <Select
              label="State / Region"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              placeholder="All States"
              options={[
                { value: 'Delhi NCR', label: 'Delhi NCR' },
                { value: 'Haryana', label: 'Haryana' },
                { value: 'Gujarat', label: 'Gujarat' },
                { value: 'Punjab', label: 'Punjab' },
                { value: 'Maharashtra', label: 'Maharashtra' },
                { value: 'Rajasthan', label: 'Rajasthan' },
              ]}
            />

            <Select
              label="Minimum Monthly Salary"
              value={minSalary}
              onChange={(e) => setMinSalary(e.target.value)}
              placeholder="Any Salary"
              options={[
                { value: '25000', label: '₹25,000+ / month' },
                { value: '30000', label: '₹30,000+ / month' },
                { value: '35000', label: '₹35,000+ / month' },
                { value: '40000', label: '₹40,000+ / month' },
              ]}
            />
          </div>
        </aside>

        {/* Right Job Results List */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Showing <strong style={{ color: 'var(--text-main)' }}>{filteredJobs.length}</strong> matching vacancies
            </span>
          </div>

          {filteredJobs.length === 0 ? (
            <Card style={{ textAlign: 'center', padding: '60px 20px' }}>
              <Briefcase size={48} color="var(--text-dim)" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>No matching vacancies found</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
                Try adjusting your filters or search keywords.
              </p>
              <Button variant="outline" size="sm" onClick={() => { setSelectedVehicle(''); setSelectedState(''); setSearchQuery(''); setMinSalary(''); }}>
                Clear All Filters
              </Button>
            </Card>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {filteredJobs.map((job) => (
                <Card
                  key={job.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    borderLeft: `4px solid ${job.verified ? 'var(--color-primary)' : 'var(--border-subtle)'}`,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{job.title}</h3>
                        {job.verified && (
                          <Badge variant="success" size="sm" icon={ShieldCheck}>Verified Fleet</Badge>
                        )}
                      </div>
                      <p style={{ fontSize: '0.95rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                        {job.company}
                      </p>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-success)', display: 'block' }}>
                        {job.salaryFormatted}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{job.type} • {job.posted}</span>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                    {job.description}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={15} color="var(--color-accent)" />
                      <span>{job.location}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Truck size={15} color="var(--color-primary)" />
                      <span>{job.vehicle}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={15} color="var(--color-warning)" />
                      <span>{job.experience}</span>
                    </div>
                  </div>

                  {/* Perks Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {job.perks.map((perk) => (
                      <Badge key={perk} variant="neutral" size="sm">✓ {perk}</Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px', borderTop: '1px solid var(--border-subtle)', paddingTop: '14px' }}>
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => setSelectedJobForApply(job)}
                    >
                      Instant Apply
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Application Modal */}
      {selectedJobForApply && (
        <Modal
          isOpen={!!selectedJobForApply}
          onClose={() => setSelectedJobForApply(null)}
          title={`Apply for ${selectedJobForApply.title}`}
          footer={
            <>
              <Button variant="ghost" onClick={() => setSelectedJobForApply(null)}>Cancel</Button>
              <Button variant="primary" loading={submitting} onClick={handleApplySubmit}>
                Submit Application
              </Button>
            </>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '12px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', fontSize: '0.875rem' }}>
              <strong>Company:</strong> {selectedJobForApply.company} • <strong>Salary:</strong> {selectedJobForApply.salaryFormatted}
            </div>

            <Input
              label="Full Name (नाम)"
              placeholder="e.g. Ramesh Kumar"
              value={applyForm.name}
              onChange={(e) => setApplyForm({ ...applyForm, name: e.target.value })}
              required
            />

            <Input
              label="Mobile Number (मोबाइल नंबर)"
              placeholder="10-digit mobile number"
              type="tel"
              value={applyForm.phone}
              onChange={(e) => setApplyForm({ ...applyForm, phone: e.target.value })}
              required
            />

            <Select
              label="Driving Experience (ड्राइविंग अनुभव)"
              value={applyForm.experience}
              onChange={(e) => setApplyForm({ ...applyForm, experience: e.target.value })}
              options={[
                { value: '1-3 Years', label: '1 - 3 Years' },
                { value: '3-5 Years', label: '3 - 5 Years' },
                { value: '5-10 Years', label: '5 - 10 Years' },
                { value: '10+ Years', label: '10+ Years (Senior)' },
              ]}
            />

            <Input
              label="Driving License Number (DL नंबर)"
              placeholder="e.g. HR-0620180012345"
              value={applyForm.licenseNumber}
              onChange={(e) => setApplyForm({ ...applyForm, licenseNumber: e.target.value })}
            />
          </div>
        </Modal>
      )}

      <style>{`
        @media (max-width: 860px) {
          .jobs-page-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
