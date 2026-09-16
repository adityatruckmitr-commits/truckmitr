import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Briefcase, Truck, MapPin, DollarSign, CheckCircle2 } from 'lucide-react';
import { PortalLayout } from '../../components/layout/PortalLayout';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';

export const PostJobPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    vehicleCategory: 'Trailer',
    route: '',
    minSalary: '',
    maxSalary: '',
    experience: '3-5 Years',
    openings: '2',
    perks: ['Trip Allowance', 'PF & ESI', 'Accommodation Provided'],
    description: '',
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.route || !formData.minSalary) {
      showToast('Please fill all required job details', 'warning');
      return;
    }
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      showToast(`Job "${formData.title}" published successfully! Our matchmaking algorithms and telecallers have started driver sourcing.`, 'success');
      navigate('/transporter/manage-jobs');
    }, 900);
  };

  return (
    <PortalLayout title="Post a New Driver Requirement" subtitle="Publish your opening to 50,000+ verified commercial drivers">
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Card padding="32px">
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Input
              label="Job Position Title"
              placeholder="e.g. HCV Container Trailer Driver (22 Wheeler)"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              <Select
                label="Vehicle Category"
                value={formData.vehicleCategory}
                onChange={(e) => setFormData({ ...formData, vehicleCategory: e.target.value })}
                options={[
                  { value: 'Trailer', label: 'Multi-Axle Trailer (22 / 18 Wheeler)' },
                  { value: 'Container', label: 'Container Truck (32 Feet)' },
                  { value: 'Tanker', label: 'Hazardous Chemical / Oil Tanker' },
                  { value: 'Tipper', label: 'Tipper / Dumper (Mining)' },
                  { value: 'Open Body', label: 'Open Body Heavy Truck' },
                ]}
              />

              <Input
                label="Designated Route / Corridor"
                placeholder="e.g. Delhi NCR to Mumbai JNPT"
                value={formData.route}
                onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                icon={MapPin}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
              <Input
                label="Min Monthly Salary (₹)"
                placeholder="e.g. 35000"
                type="number"
                value={formData.minSalary}
                onChange={(e) => setFormData({ ...formData, minSalary: e.target.value })}
                required
              />

              <Input
                label="Max Monthly Salary (₹)"
                placeholder="e.g. 42000"
                type="number"
                value={formData.maxSalary}
                onChange={(e) => setFormData({ ...formData, maxSalary: e.target.value })}
              />

              <Input
                label="Number of Vacancies"
                type="number"
                value={formData.openings}
                onChange={(e) => setFormData({ ...formData, openings: e.target.value })}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-main)', marginBottom: '6px', display: 'block' }}>
                Job Description & Route Instructions
              </label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe loading/unloading rules, FASTag allowances, and rest stop arrangements..."
                style={{
                  width: '100%',
                  backgroundColor: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px 14px',
                  color: 'var(--text-main)',
                  fontSize: '0.95rem',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
              <Button variant="ghost" onClick={() => navigate('/transporter/dashboard')}>
                Cancel
              </Button>
              <Button variant="primary" size="lg" type="submit" loading={loading} icon={PlusCircle}>
                Publish Driver Vacancy
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </PortalLayout>
  );
};
