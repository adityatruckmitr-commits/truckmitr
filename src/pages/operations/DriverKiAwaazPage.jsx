import React, { useState, useEffect } from 'react';
import { usePermissions } from '../../context/PermissionContext';
import { StatCard } from '../../components/common/StatCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Drawer } from '../../components/common/Drawer';
import {
  getDkaPosts,
  saveDkaPosts,
  addDkaPost
} from '../../services/mock/mockDka';
import {
  Radio,
  Headphones,
  AlertTriangle,
  Heart,
  Play,
  Pause,
  Plus,
  Download,
  CheckCircle2,
  Filter,
  MessageSquare,
  Share2,
  Tag,
  Clock,
  UserCheck
} from 'lucide-react';

export const DriverKiAwaazPage = () => {
  const { can } = usePermissions();
  const [posts, setPosts] = useState(getDkaPosts());
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [selectedPost, setSelectedPost] = useState(null);
  const [playingId, setPlayingId] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Road Alert',
    authorName: 'Aditya Kumar (Staff)',
    authorTmid: 'STAFF',
    description: '',
    audioDuration: '2m 00s',
    tags: 'Highway, Alert'
  });

  useEffect(() => {
    const handleUpdate = () => setPosts(getDkaPosts());
    window.addEventListener('tm_dka_updated', handleUpdate);
    return () => window.removeEventListener('tm_dka_updated', handleUpdate);
  }, []);

  const filteredPosts = posts.filter((p) => {
    if (categoryFilter === 'ALL') return true;
    return p.category === categoryFilter;
  });

  const handleTogglePlay = (id) => {
    setPlayingId((prev) => (prev === id ? null : id));
  };

  const handleLike = (id, e) => {
    e.stopPropagation();
    const updated = posts.map((p) =>
      p.id === id ? { ...p, likesCount: p.likesCount + 1 } : p
    );
    setPosts(updated);
    saveDkaPosts(updated);
  };

  const handleModerateStatus = (id, status) => {
    const updated = posts.map((p) => (p.id === id ? { ...p, status } : p));
    setPosts(updated);
    saveDkaPosts(updated);
    if (selectedPost && selectedPost.id === id) {
      setSelectedPost((prev) => ({ ...prev, status }));
    }
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;

    addDkaPost({
      title: formData.title,
      category: formData.category,
      authorName: formData.authorName,
      authorTmid: formData.authorTmid,
      description: formData.description,
      audioDuration: formData.audioDuration,
      tags: formData.tags.split(',').map((t) => t.trim())
    });

    setIsCreateModalOpen(false);
    setFormData({
      title: '',
      category: 'Road Alert',
      authorName: 'Aditya Kumar (Staff)',
      authorTmid: 'STAFF',
      description: '',
      audioDuration: '2m 00s',
      tags: 'Highway, Alert'
    });
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1440px', margin: '0 auto' }}>
      {/* Header Banner */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
            Driver Ki Awaaz (Community & Road Broadcasts)
          </h1>
          <p style={{ color: '#64748B', fontSize: '14px', margin: '4px 0 0' }}>
            Voice of India’s trucking community: road condition alerts, driver stories, dhaba reviews, and safety broadcasts.
          </p>
        </div>

        {can('driver-ki-awaaz', 'create') && (
          <button
            onClick={() => setIsCreateModalOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              backgroundColor: '#1467FF',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(20, 103, 255, 0.25)'
            }}
          >
            <Plus size={16} /> Record / Post Broadcast
          </button>
        )}
      </div>

      {/* KPI StatCards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}
      >
        <StatCard
          label="Total Community Broadcasts"
          value="14 Active"
          change="+4 this week"
          trend="up"
          color="#1467FF"
          icon={Radio}
        />
        <StatCard
          label="Monthly Audio Listens"
          value="10,430"
          change="+28.5% MoM"
          trend="up"
          color="#10B981"
          icon={Headphones}
        />
        <StatCard
          label="Active Road Hazard Alerts"
          value="2 Pending"
          change="NH66 / Vadodara"
          trend="down"
          color="#EF4444"
          icon={AlertTriangle}
        />
        <StatCard
          label="Driver Upvotes & Likes"
          value="2,638"
          change="High Engagement"
          trend="up"
          color="#8B5CF6"
          icon={Heart}
        />
      </div>

      {/* Category Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '20px',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}
      >
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Category:</span>
        {['ALL', 'Road Alert', 'Driver Stories', 'Safety & Welfare', 'Amenities & Dhabas'].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              border: 'none',
              fontSize: '12px',
              fontWeight: 700,
              backgroundColor: categoryFilter === cat ? '#1467FF' : '#F1F5F9',
              color: categoryFilter === cat ? '#FFFFFF' : '#475569',
              cursor: 'pointer',
              transition: 'all 0.15s'
            }}
          >
            {cat === 'ALL' ? 'All Broadcasts' : cat}
          </button>
        ))}
      </div>

      {/* Broadcast Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '20px'
        }}
      >
        {filteredPosts.map((post) => {
          const isPlaying = playingId === post.id;
          const isRoadAlert = post.category === 'Road Alert';
          return (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              style={{
                backgroundColor: isRoadAlert ? '#FFFDFD' : '#FFFFFF',
                borderRadius: '12px',
                padding: '20px',
                border: isRoadAlert ? '1px solid #FECACA' : '1px solid #E2E8F0',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
                transition: 'all 0.15s'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '6px',
                      backgroundColor: isRoadAlert ? '#FEE2E2' : '#EFF6FF',
                      color: isRoadAlert ? '#DC2626' : '#1E40AF'
                    }}
                  >
                    {post.category}
                  </span>
                  <StatusBadge
                    status={post.status}
                    variant={post.status === 'APPROVED' ? 'success' : 'warning'}
                  />
                </div>

                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: '0 0 8px', lineHeight: '1.4' }}>
                  {post.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#64748B', lineHeight: '1.5', margin: '0 0 16px' }}>
                  {post.description}
                </p>

                {/* Audio player simulator */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTogglePlay(post.id);
                  }}
                  style={{
                    backgroundColor: '#F8FAFC',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '16px'
                  }}
                >
                  <button
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: '#1467FF',
                      border: 'none',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    {isPlaying ? <Pause size={14} /> : <Play size={14} style={{ marginLeft: '2px' }} />}
                  </button>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>
                      {isPlaying ? 'Playing Broadcast...' : 'Listen Audio Clip'}
                    </div>
                    <div style={{ height: '4px', backgroundColor: '#E2E8F0', borderRadius: '2px', marginTop: '4px', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          width: isPlaying ? '65%' : '0%',
                          backgroundColor: '#1467FF',
                          transition: 'width 2s'
                        }}
                      />
                    </div>
                  </div>
                  <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>{post.audioDuration}</span>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px solid #F1F5F9',
                  paddingTop: '12px',
                  fontSize: '12px',
                  color: '#64748B'
                }}
              >
                <div>
                  <span style={{ fontWeight: 600, color: '#334155' }}>{post.authorName}</span>
                  <span style={{ marginLeft: '4px', color: '#94A3B8' }}>({post.authorTmid})</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <button
                    onClick={(e) => handleLike(post.id, e)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      border: 'none',
                      background: 'none',
                      color: '#EF4444',
                      cursor: 'pointer',
                      fontWeight: 600
                    }}
                  >
                    <Heart size={14} fill="#EF4444" />
                    <span>{post.likesCount}</span>
                  </button>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Headphones size={14} />
                    <span>{post.listensCount}</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Post Detail Drawer */}
      <Drawer
        isOpen={Boolean(selectedPost)}
        onClose={() => setSelectedPost(null)}
        title={selectedPost ? selectedPost.title : ''}
      >
        {selectedPost && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '6px',
                  backgroundColor: '#EFF6FF',
                  color: '#1E40AF'
                }}
              >
                {selectedPost.category}
              </span>
              <StatusBadge
                status={selectedPost.status}
                variant={selectedPost.status === 'APPROVED' ? 'success' : 'warning'}
              />
            </div>

            <div style={{ padding: '16px', borderRadius: '8px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <h4 style={{ margin: '0 0 8px', fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>Broadcast Transcript</h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#334155', lineHeight: '1.6' }}>
                {selectedPost.description}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px' }}>
              <div>
                <span style={{ color: '#64748B' }}>Reported By:</span>
                <div style={{ fontWeight: 600, color: '#0F172A' }}>{selectedPost.authorName}</div>
              </div>
              <div>
                <span style={{ color: '#64748B' }}>TMID / Identifier:</span>
                <div style={{ fontWeight: 600, color: '#0F172A' }}>{selectedPost.authorTmid}</div>
              </div>
              <div>
                <span style={{ color: '#64748B' }}>Duration:</span>
                <div style={{ fontWeight: 600, color: '#0F172A' }}>{selectedPost.audioDuration}</div>
              </div>
              <div>
                <span style={{ color: '#64748B' }}>Posted Date:</span>
                <div style={{ fontWeight: 600, color: '#0F172A' }}>{selectedPost.createdAt}</div>
              </div>
            </div>

            {can('driver-ki-awaaz', 'edit') && (
              <div style={{ display: 'flex', gap: '10px', marginTop: '14px', borderTop: '1px solid #E2E8F0', paddingTop: '14px' }}>
                {selectedPost.status !== 'APPROVED' && (
                  <button
                    onClick={() => handleModerateStatus(selectedPost.id, 'APPROVED')}
                    style={{
                      flex: 1,
                      padding: '10px',
                      backgroundColor: '#10B981',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Approve & Publish Broadcast
                  </button>
                )}
                {selectedPost.status !== 'FLAGGED' && (
                  <button
                    onClick={() => handleModerateStatus(selectedPost.id, 'FLAGGED')}
                    style={{
                      flex: 1,
                      padding: '10px',
                      backgroundColor: '#EF4444',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Flag / Remove
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </Drawer>

      {/* Create Broadcast Modal */}
      {isCreateModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '24px',
              width: '100%',
              maxWidth: '520px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            }}
          >
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', marginTop: 0, marginBottom: '16px' }}>
              Publish Driver Ki Awaaz Broadcast
            </h2>

            <form onSubmit={handleCreatePost} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                  Broadcast Headline *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NH48 Highway Diversion near Surat"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13px'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: '1px solid #CBD5E1',
                      fontSize: '13px'
                    }}
                  >
                    <option value="Road Alert">Road Alert</option>
                    <option value="Driver Stories">Driver Stories</option>
                    <option value="Safety & Welfare">Safety & Welfare</option>
                    <option value="Amenities & Dhabas">Amenities & Dhabas</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                    Audio Duration
                  </label>
                  <input
                    type="text"
                    value={formData.audioDuration}
                    onChange={(e) => setFormData({ ...formData, audioDuration: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: '1px solid #CBD5E1',
                      fontSize: '13px'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                  Broadcast Message / Transcript *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Details of the road situation, advice, or driver story..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13px',
                    resize: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#F1F5F9',
                    border: '1px solid #E2E8F0',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '8px 20px',
                    backgroundColor: '#1467FF',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Submit for Moderation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
