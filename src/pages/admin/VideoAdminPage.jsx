import React, { useState } from 'react';
import { Video, HelpCircle, BookOpen, PlusCircle, Trash2, Download } from 'lucide-react';
import { AdminLayout } from './AdminLayout';
import { Table } from '../../components/common/Table';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';

export const VideoAdminPage = () => {
  const { showToast } = useToast();
  const videos = [
    { id: 1, title: 'Safe Highway Night Driving Protocol', module: 'Highway Safety 101', duration: '18 mins', views: '14,200', status: 'Active' },
    { id: 2, title: 'Advanced Diesel Fuel Efficiency (Eco-Drive)', module: 'Cost Optimization', duration: '24 mins', views: '9,850', status: 'Active' },
    { id: 3, title: 'Highway Emergency Trauma Care', module: 'Health & Hygiene', duration: '15 mins', views: '7,410', status: 'Active' },
  ];

  const columns = [
    { title: 'Video Lesson Title', key: 'title', render: (val) => <strong style={{ color: '#0D6EFD' }}>🎥 {val}</strong> },
    { title: 'Training Module', key: 'module' },
    { title: 'Video Length', key: 'duration' },
    { title: 'Driver Watch Count', key: 'views', render: (val) => <strong style={{ color: '#10B981' }}>{val}</strong> },
    { title: 'Status', key: 'status', render: (val) => <span style={{ backgroundColor: '#D1FAE5', color: '#065F46', padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>{val}</span> },
  ];

  return (
    <AdminLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: 0 }}>Driver Welfare Video LMS Academy</h1>
            <p style={{ fontSize: '0.85rem', color: '#6B7280', margin: '4px 0 0' }}>Upload video lessons, manage modules, health & hygiene topics</p>
          </div>
          <Button variant="primary" size="md" icon={PlusCircle} onClick={() => showToast('Open Add Video modal', 'info')}>
            + Upload New Video
          </Button>
        </div>
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB' }}>
          <Table columns={columns} data={videos} />
        </div>
      </div>
    </AdminLayout>
  );
};

export const QuizAdminPage = () => {
  const { showToast } = useToast();
  const quizzes = [
    { id: 1, title: 'Commercial Highway Safe Driving Quiz', questions: 10, attempts: 18450, passRate: '88.4%', status: 'Active' },
    { id: 2, title: 'Chemical Tanker Hazardous Safety Test', questions: 15, attempts: 2410, passRate: '92.1%', status: 'Active' },
  ];

  const columns = [
    { title: 'Quiz Assessment Title', key: 'title', render: (val) => <strong style={{ color: '#111827' }}>❓ {val}</strong> },
    { title: 'Total Questions', key: 'questions' },
    { title: 'Total Attempts', key: 'attempts', render: (val) => <strong>{val} Drivers</strong> },
    { title: 'Pass Rate', key: 'passRate', render: (val) => <strong style={{ color: '#10B981' }}>{val}</strong> },
    { title: 'Status', key: 'status', render: (val) => <span style={{ backgroundColor: '#D1FAE5', color: '#065F46', padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>{val}</span> },
  ];

  return (
    <AdminLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: 0 }}>Driver Knowledge Quizzes & Certification Tests</h1>
            <p style={{ fontSize: '0.85rem', color: '#6B7280', margin: '4px 0 0' }}>Manage digital quiz questions and certificate criteria</p>
          </div>
          <Button variant="primary" size="md" icon={PlusCircle} onClick={() => showToast('Open Add Quiz modal', 'info')}>
            + Create New Quiz
          </Button>
        </div>
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB' }}>
          <Table columns={columns} data={quizzes} />
        </div>
      </div>
    </AdminLayout>
  );
};

export const BlogsAdminPage = () => {
  const { showToast } = useToast();
  const blogs = [
    { id: 1, title: 'How National Logistics Policy is Empowering Commercial Drivers in 2026', category: 'Logistics Industry', views: '18,400', date: '28 Aug 2026', status: 'Published' },
    { id: 2, title: 'Top 5 Fuel Saving Techniques for HCV Multi-Axle Trailers', category: 'Driver Tips', views: '24,190', date: '15 Aug 2026', status: 'Published' },
  ];

  const columns = [
    { title: 'Blog Post Title', key: 'title', render: (val) => <strong style={{ color: '#0D6EFD' }}>📰 {val}</strong> },
    { title: 'Category', key: 'category' },
    { title: 'Total Readers', key: 'views' },
    { title: 'Date Published', key: 'date' },
    { title: 'Status', key: 'status', render: (val) => <span style={{ backgroundColor: '#D1FAE5', color: '#065F46', padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>{val}</span> },
  ];

  return (
    <AdminLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: 0 }}>Logistics & Welfare Blogs CMS</h1>
            <p style={{ fontSize: '0.85rem', color: '#6B7280', margin: '4px 0 0' }}>Publish articles, logistics policy updates, and driver tips</p>
          </div>
          <Button variant="primary" size="md" icon={PlusCircle} onClick={() => showToast('Open Add Blog post editor', 'info')}>
            + Write New Article
          </Button>
        </div>
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB' }}>
          <Table columns={columns} data={blogs} />
        </div>
      </div>
    </AdminLayout>
  );
};
