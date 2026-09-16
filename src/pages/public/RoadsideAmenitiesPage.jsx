import React, { useState, useMemo } from 'react';
import {
  Compass,
  Search,
  MapPin,
  Utensils,
  Wrench,
  ShieldCheck,
  Star,
  Phone,
  CheckCircle,
  Truck,
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';

const INITIAL_AMENITIES = [
  {
    id: 1,
    type: 'dhaba',
    name: 'Sukhdev Dhaba & Driver Rest Hub',
    highway: 'NH-44 (GT Road)',
    location: 'Murthal, Sonipat, Haryana',
    rating: 4.9,
    facilities: ['Safe Heavy Truck Parking (100+)', 'Clean Showers & Restrooms', '24/7 Hot Veg Food', 'CCTV Security'],
    phone: '+91 98760-11223',
    verified: true,
  },
  {
    id: 2,
    type: 'puncture',
    name: 'National 24/7 Heavy Tyre & Puncture Care',
    highway: 'NH-48 (Delhi-Jaipur Expressway)',
    location: 'Kotputli, Rajasthan',
    rating: 4.8,
    facilities: ['Multi-Axle Radial Tyre Retreading', 'Hydraulic Jack Assistance', 'Air Pressure & Nitrogen', '24/7 Mobile Breakdown Van'],
    phone: '+91 98110-33445',
    verified: true,
  },
  {
    id: 3,
    type: 'dhaba',
    name: 'Karnal Grand Royal Highway Plaza',
    highway: 'NH-44 (Delhi-Chandigarh)',
    location: 'Karnal, Haryana',
    rating: 4.7,
    facilities: ['Secured Trailer Parking', 'Drivers Dormitory', 'Pure Vegetarian Food', 'Mechanic on Call'],
    phone: '+91 99920-55667',
    verified: true,
  },
  {
    id: 4,
    type: 'puncture',
    name: 'Gujarat Corridor Commercial Tyre Works',
    highway: 'NH-48 (Ahmedabad-Surat Route)',
    location: 'Bharuch, Gujarat',
    rating: 4.9,
    facilities: ['Tubeless Tyre Vulcanizing', 'Wheel Alignment for 16-22 Wheelers', 'Emergency Highway Rescue'],
    phone: '+91 98250-77889',
    verified: true,
  },
];

export const RoadsideAmenitiesPage = () => {
  const [activeType, setActiveType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHighway, setSelectedHighway] = useState('');

  const filteredItems = useMemo(() => {
    return INITIAL_AMENITIES.filter((item) => {
      const matchType = activeType === 'all' || item.type === activeType;
      const matchHighway = !selectedHighway || item.highway.includes(selectedHighway);
      const matchQuery =
        !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.highway.toLowerCase().includes(searchQuery.toLowerCase());

      return matchType && matchHighway && matchQuery;
    });
  }, [activeType, selectedHighway, searchQuery]);

  return (
    <div className="tm-container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '8px' }}>
          Highway Roadside <span className="gradient-text-primary">Amenities Directory</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
          Verified highway dhabas, safe truck rest hubs, and 24/7 heavy puncture repair centers across Indian National Highways.
        </p>
      </div>

      {/* Type Tabs + Search Filter */}
      <div
        className="glass-panel"
        style={{
          padding: '20px',
          marginBottom: '32px',
          backgroundColor: 'var(--bg-surface)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {[
            { id: 'all', label: 'All Highway Services' },
            { id: 'dhaba', label: '🍲 Verified Dhabas & Rest Stops' },
            { id: 'puncture', label: '🔧 24/7 Tyre & Puncture Repair' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveType(tab.id)}
              style={{
                padding: '8px 18px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid',
                borderColor: activeType === tab.id ? 'var(--color-primary)' : 'var(--border-subtle)',
                backgroundColor: activeType === tab.id ? 'var(--color-primary)' : 'rgba(255,255,255,0.03)',
                color: activeType === tab.id ? '#FFFFFF' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.875rem',
                cursor: 'pointer',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          <Input
            placeholder="Search by dhaba/shop name, city, or route..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={Search}
          />
          <Select
            value={selectedHighway}
            onChange={(e) => setSelectedHighway(e.target.value)}
            placeholder="Filter by National Highway"
            options={[
              { value: 'NH-44', label: 'NH-44 (North-South Corridor)' },
              { value: 'NH-48', label: 'NH-48 (Delhi-Mumbai-Chennai)' },
              { value: 'NH-19', label: 'NH-19 (Delhi-Kolkata)' },
              { value: 'NH-52', label: 'NH-52 (Punjab to Karnataka)' },
            ]}
          />
        </div>
      </div>

      {/* Grid of Amenities */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {filteredItems.map((item) => (
          <Card key={item.id} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <Badge variant={item.type === 'dhaba' ? 'warning' : 'info'} size="sm">
                  {item.type === 'dhaba' ? '🍲 Highway Dhaba' : '🔧 Tyre & Repair'}
                </Badge>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-warning)', fontWeight: 700, fontSize: '0.85rem' }}>
                  <Star size={14} fill="var(--color-warning)" /> {item.rating}
                </div>
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '6px' }}>{item.name}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 600, marginBottom: '8px' }}>
                {item.highway}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                <MapPin size={14} color="var(--color-accent)" />
                <span>{item.location}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {item.facilities.map((fac) => (
                  <div key={fac} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                    <CheckCircle size={13} color="var(--color-success)" />
                    <span>{fac}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant="secondary"
              size="sm"
              fullWidth
              icon={Phone}
              onClick={() => alert(`Calling ${item.name} at ${item.phone}`)}
            >
              Call Helpline: {item.phone}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
