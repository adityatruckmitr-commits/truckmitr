import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { useToast } from '../../context/ToastContext';

export const ContactPage = () => {
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: 'Driver Hiring Inquiry', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      showToast('Please enter your name and phone number', 'warning');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast('Thank you! Your message has been sent to our customer care team.', 'success');
      setForm({ name: '', phone: '', email: '', subject: 'Driver Hiring Inquiry', message: '' });
    }, 1000);
  };

  return (
    <div className="tm-container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 48px' }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '8px' }}>
          Contact & <span className="gradient-text-primary">Support</span>
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Have questions about driver verification, posting a job, or joining the roadside network? Our team is here 24/7.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
        {/* Contact Information */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '8px' }}>
              <div style={{ padding: '10px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
                <Phone size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>Toll-Free Helpline</h4>
                <p style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '1.1rem' }}>1800-TRUCK-MITR</p>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Available 24 hours / 7 days for roadside assistance & driver support.</p>
          </Card>

          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '8px' }}>
              <div style={{ padding: '10px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-accent-glow)', color: 'var(--color-accent)' }}>
                <Mail size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>Email Inquiries</h4>
                <p style={{ color: 'var(--text-main)', fontWeight: 600 }}>support@truckmitr.com</p>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>We reply within 4 business hours.</p>
          </Card>

          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '8px' }}>
              <div style={{ padding: '10px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-success-bg)', color: 'var(--color-success)' }}>
                <MapPin size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>Head Office</h4>
                <p style={{ color: 'var(--text-main)', fontWeight: 600 }}>Sonipat, Haryana - 131001, India</p>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Regional offices in Delhi, Mumbai, Ahmedabad, Ludhiana.</p>
          </Card>
        </div>

        {/* Message Form */}
        <Card>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '20px' }}>Send Us a Message</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Input
              label="Your Full Name"
              placeholder="e.g. Vikram Sharma"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <Input
              label="Contact Mobile Number"
              placeholder="10-digit mobile number"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
            <Input
              label="Email Address (Optional)"
              placeholder="name@example.com"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <Select
              label="Inquiry Type"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              options={[
                { value: 'Driver Hiring Inquiry', label: 'Hire Verified Drivers (Transporter)' },
                { value: 'Driver Job Search', label: 'Job Application Help (Driver)' },
                { value: 'BGV Verification API', label: 'Background Verification API Inquiry' },
                { value: 'Highway Dhaba Partnership', label: 'Register as Dhaba / Puncture Partner' },
              ]}
            />
            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-main)', marginBottom: '6px', display: 'block' }}>
                Your Message / Details
              </label>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="How can our team help you?"
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
            <Button variant="primary" size="lg" icon={Send} type="submit" loading={loading}>
              Submit Message
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};
