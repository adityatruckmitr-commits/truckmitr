import React, { useState, useMemo } from 'react';
import {
  Users,
  Search,
  Filter,
  ShieldCheck,
  Star,
  MapPin,
  Truck,
  Award,
  Phone,
  CheckCircle,
  Calendar,
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Modal } from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';

const INITIAL_DRIVERS = [
  {
    id: 1,
    name: 'Ramesh Singh Yadav',
    experience: '9 Years',
    location: 'Sonipat, Haryana',
    state: 'Haryana',
    licenseType: 'HCV / Heavy Trailer',
    vehicleCategory: 'Trailer',
    rating: 4.9,
    tripsCompleted: 420,
    aadhaarVerified: true,
    dlVerified: true,
    policeVerified: true,
    availability: 'Immediate (Available Now)',
    phone: '+91 98765-XXXXX',
    skills: ['22-Wheeler Trailer', 'Long Haul Route', 'GPS Navigation', 'Hill Terrain'],
  },
  {
    id: 2,
    name: 'Gurpreet Singh',
    experience: '12 Years',
    location: 'Ludhiana, Punjab',
    state: 'Punjab',
    licenseType: 'Hazardous Chemical Tanker',
    vehicleCategory: 'Tanker',
    rating: 5.0,
    tripsCompleted: 680,
    aadhaarVerified: true,
    dlVerified: true,
    policeVerified: true,
    availability: 'Available in 3 Days',
    phone: '+91 98112-XXXXX',
    skills: ['Liquid Petroleum Gas', 'Safety Certified', 'Night Driving Specialist'],
  },
  {
    id: 3,
    name: 'Santosh Kumar Pal',
    experience: '6 Years',
    location: 'Kanpur, Uttar Pradesh',
    state: 'Uttar Pradesh',
    licenseType: 'Container & Heavy Truck',
    vehicleCategory: 'Container',
    rating: 4.8,
    tripsCompleted: 310,
    aadhaarVerified: true,
    dlVerified: true,
    policeVerified: false,
    availability: 'Immediate (Available Now)',
    phone: '+91 97234-XXXXX',
    skills: ['Container Logistics', 'Basic Vehicle Maintenance', 'Eco Fuel Saving'],
  },
  {
    id: 4,
    name: 'Manish Rawat',
    experience: '4 Years',
    location: 'Jaipur, Rajasthan',
    state: 'Rajasthan',
    licenseType: 'Tipper & Dumper Heavy',
    vehicleCategory: 'Tipper',
    rating: 4.7,
    tripsCompleted: 240,
    aadhaarVerified: true,
    dlVerified: true,
    policeVerified: true,
    availability: 'Immediate (Available Now)',
    phone: '+91 94567-XXXXX',
    skills: ['Mining Operations', 'Quarry Driving', 'Off-road Heavy Loads'],
  },
  {
    id: 5,
    name: 'Vijay Deshmukh',
    experience: '8 Years',
    location: 'Pune / Mumbai, Maharashtra',
    state: 'Maharashtra',
    licenseType: 'Open Body Multi-Axle',
    vehicleCategory: 'Open Body',
    rating: 4.9,
    tripsCompleted: 510,
    aadhaarVerified: true,
    dlVerified: true,
    policeVerified: true,
    availability: 'Available Next Week',
    phone: '+91 93456-XXXXX',
    skills: ['Western Corridor', 'Expressway Expert', 'English & Hindi Fluent'],
  },
];

export const DriversPage = () => {
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [vehicleFilter, setVehicleFilter] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [selectedDriverForHire, setSelectedDriverForHire] = useState(null);
  const [contacting, setContacting] = useState(false);

  const filteredDrivers = useMemo(() => {
    return INITIAL_DRIVERS.filter((d) => {
      const matchQuery =
        !searchQuery ||
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.licenseType.toLowerCase().includes(searchQuery.toLowerCase());

      const matchVehicle = !vehicleFilter || d.vehicleCategory === vehicleFilter;
      const matchState = !stateFilter || d.state === stateFilter;

      return matchQuery && matchVehicle && matchState;
    });
  }, [searchQuery, vehicleFilter, stateFilter]);

  const handleHireRequest = (e) => {
    e.preventDefault();
    setContacting(true);
    setTimeout(() => {
      setContacting(false);
      setSelectedDriverForHire(null);
      showToast(`Interview & contact request sent to ${selectedDriverForHire.name}! Our matchmaking coordinator will connect both of you on call.`, 'success');
    }, 1000);
  };

  return (
    <div className="tm-container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '8px' }}>
          Verified Commercial Drivers <span className="gradient-text-primary">Directory</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
          Browse government-verified truck, trailer, and tanker drivers ready for immediate hire.
        </p>
      </div>

      {/* Filter Bar */}
      <div
        className="glass-panel"
        style={{
          padding: '16px 20px',
          marginBottom: '32px',
          backgroundColor: 'var(--bg-surface)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          alignItems: 'center',
        }}
      >
        <Input
          placeholder="Search by driver name, route..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          icon={Search}
        />

        <Select
          value={vehicleFilter}
          onChange={(e) => setVehicleFilter(e.target.value)}
          placeholder="All Vehicle Types"
          options={[
            { value: 'Trailer', label: 'Multi-Axle Trailer' },
            { value: 'Tanker', label: 'Tanker (Hazardous/Liquid)' },
            { value: 'Container', label: 'Container' },
            { value: 'Tipper', label: 'Tipper / Dumper' },
            { value: 'Open Body', label: 'Open Body Truck' },
          ]}
        />

        <Select
          value={stateFilter}
          onChange={(e) => setStateFilter(e.target.value)}
          placeholder="All States"
          options={[
            { value: 'Haryana', label: 'Haryana' },
            { value: 'Punjab', label: 'Punjab' },
            { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
            { value: 'Rajasthan', label: 'Rajasthan' },
            { value: 'Maharashtra', label: 'Maharashtra' },
          ]}
        />
      </div>

      {/* Driver Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {filteredDrivers.map((driver) => (
          <Card
            key={driver.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div>
              {/* Top Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--color-primary-light)',
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
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{driver.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                      <MapPin size={13} color="var(--color-accent)" />
                      <span>{driver.location}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: 'rgba(245, 158, 11, 0.12)', padding: '4px 8px', borderRadius: 'var(--radius-sm)', color: 'var(--color-warning)', fontWeight: 700, fontSize: '0.85rem' }}>
                  <Star size={14} fill="var(--color-warning)" /> {driver.rating}
                </div>
              </div>

              {/* Verification Badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                {driver.dlVerified && <Badge variant="success" size="sm" icon={CheckCircle}>DL Verified</Badge>}
                {driver.aadhaarVerified && <Badge variant="success" size="sm" icon={CheckCircle}>Aadhaar KYC</Badge>}
                {driver.policeVerified && <Badge variant="info" size="sm" icon={ShieldCheck}>Court Cleared</Badge>}
              </div>

              {/* Details List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                <div><strong>Primary Vehicle:</strong> {driver.licenseType}</div>
                <div><strong>Experience:</strong> {driver.experience} ({driver.tripsCompleted}+ trips completed)</div>
                <div><strong>Status:</strong> <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>{driver.availability}</span></div>
              </div>

              {/* Skills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {driver.skills.map((skill) => (
                  <Badge key={skill} variant="neutral" size="sm">{skill}</Badge>
                ))}
              </div>
            </div>

            {/* Action */}
            <Button
              variant="primary"
              size="md"
              fullWidth
              icon={Phone}
              onClick={() => setSelectedDriverForHire(driver)}
            >
              Request to Connect / Hire
            </Button>
          </Card>
        ))}
      </div>

      {/* Hire Modal */}
      {selectedDriverForHire && (
        <Modal
          isOpen={!!selectedDriverForHire}
          onClose={() => setSelectedDriverForHire(null)}
          title={`Hire Request for ${selectedDriverForHire.name}`}
          footer={
            <>
              <Button variant="ghost" onClick={() => setSelectedDriverForHire(null)}>Cancel</Button>
              <Button variant="primary" loading={contacting} onClick={handleHireRequest}>
                Confirm Interview Request
              </Button>
            </>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Submit your company details to schedule an instant video / phone interview with <strong>{selectedDriverForHire.name}</strong>.
            </p>
            <Input label="Your Transporter / Company Name" placeholder="e.g. Apex Freight Logistics" required />
            <Input label="Contact Mobile Number" placeholder="10-digit mobile number" type="tel" required />
            <Select
              label="Offered Vehicle Type"
              options={[
                { value: 'Trailer', label: 'Multi-Axle Trailer' },
                { value: 'Container', label: 'Container Truck' },
                { value: 'Tanker', label: 'Tanker' },
                { value: 'Tipper', label: 'Tipper' },
              ]}
            />
            <Input label="Proposed Monthly Salary (₹)" placeholder="e.g. 35000" type="number" />
          </div>
        </Modal>
      )}
    </div>
  );
};
