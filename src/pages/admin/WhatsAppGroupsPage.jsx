import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MessageSquare,
  PlusCircle,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
  Users,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
  Layers,
  Sparkles,
  PhoneCall,
  UserCheck,
  ShieldCheck,
  Truck,
  ArrowRight,
  X,
  AlertTriangle,
} from 'lucide-react';
import { AdminLayout } from './AdminLayout';
import { useToast } from '../../context/ToastContext';

// Initial dataset matching exact database records from user's screenshot
const INITIAL_WHATSAPP_GROUPS = [
  {
    id: 1,
    name: 'TruckMitr Official Group-VI',
    group_type: 'driver',
    whatsapp_group_link: 'Https://chat.whatsapp.com/D0lFX2DqGsNGnSrZdEwead?s=cl&p=a&mlu=4&ilr=4',
    max_members: 1000,
    status: 'active',
  },
  {
    id: 2,
    name: 'TruckMitr Official Group-V',
    group_type: 'driver',
    whatsapp_group_link: 'Https://chat.whatsapp.com/EY9M3ScrOdJBgC5myroCVV',
    max_members: 1024,
    status: 'inactive',
  },
  {
    id: 3,
    name: 'TruckMitr Official Group-IV',
    group_type: 'driver',
    whatsapp_group_link: 'Https://chat.whatsapp.com/Ec2zsdhCueO1HcoIbUhKM4?s=cl&p=i&ilr=1',
    max_members: 1024,
    status: 'inactive',
  },
  {
    id: 4,
    name: 'Transporter Group - II',
    group_type: 'transporter',
    whatsapp_group_link: 'Https://chat.whatsapp.com/lypFtnydOxIHXu21Uxxy9I?mode=wwt',
    max_members: 1026,
    status: 'inactive',
  },
  {
    id: 5,
    name: 'TruckMitr Official Group-III',
    group_type: 'driver',
    whatsapp_group_link: 'Https://chat.whatsapp.com/lNUd9n5hoFG1QvwUC17OPu',
    max_members: 1026,
    status: 'inactive',
  },
  {
    id: 6,
    name: 'TruckMitr Official Group-II',
    group_type: 'driver',
    whatsapp_group_link: 'Https://chat.whatsapp.com/LL6ZuGkYoW1ldpADhuQwoV',
    max_members: 1026,
    status: 'inactive',
  },
  {
    id: 7,
    name: 'Transporter Group',
    group_type: 'transporter',
    whatsapp_group_link: 'Https://chat.whatsapp.com/DzGYiv4sLkgAQEsYQ2aerv',
    max_members: 256,
    status: 'active',
  },
  {
    id: 8,
    name: 'Driver Group',
    group_type: 'driver',
    whatsapp_group_link: 'Https://chat.whatsapp.com/KK9Cixv8cvLEe7qbslDqNB',
    max_members: 256,
    status: 'inactive',
  },
];

export const WhatsAppGroupsPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [groups, setGroups] = useState(INITIAL_WHATSAPP_GROUPS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Active item for Edit / Delete
  const [activeGroup, setActiveGroup] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    group_type: 'driver',
    whatsapp_group_link: '',
    max_members: '1024',
    status: 'active',
  });

  // KPI Calculations
  const totalGroups = groups.length;
  const activeCount = groups.filter((g) => g.status.toLowerCase() === 'active').length;
  const driverGroupsCount = groups.filter((g) => g.group_type.toLowerCase() === 'driver').length;
  const transporterGroupsCount = groups.filter((g) => g.group_type.toLowerCase() === 'transporter').length;
  const totalCapacity = groups.reduce((sum, g) => sum + (Number(g.max_members) || 0), 0);

  // Copy Link Handler
  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link);
    showToast('WhatsApp invite link copied to clipboard!', 'success');
  };

  // Open Create Modal
  const handleOpenCreate = () => {
    setFormData({
      name: '',
      group_type: 'driver',
      whatsapp_group_link: '',
      max_members: '1024',
      status: 'active',
    });
    setIsCreateModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (group) => {
    setActiveGroup(group);
    setFormData({
      name: group.name,
      group_type: group.group_type,
      whatsapp_group_link: group.whatsapp_group_link,
      max_members: group.max_members.toString(),
      status: group.status,
    });
    setIsEditModalOpen(true);
  };

  // Open Delete Modal
  const handleOpenDelete = (group) => {
    setActiveGroup(group);
    setIsDeleteModalOpen(true);
  };

  // Save Create
  const handleSaveCreate = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('Please enter a group name', 'error');
      return;
    }
    if (!formData.whatsapp_group_link.trim()) {
      showToast('Please enter a WhatsApp invite link', 'error');
      return;
    }

    const newGroup = {
      id: Date.now(),
      name: formData.name.trim(),
      group_type: formData.group_type,
      whatsapp_group_link: formData.whatsapp_group_link.trim(),
      max_members: Number(formData.max_members) || 1024,
      status: formData.status,
    };

    setGroups([newGroup, ...groups]);
    showToast(`WhatsApp Group "${newGroup.name}" created successfully!`, 'success');
    setIsCreateModalOpen(false);
  };

  // Save Edit
  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!activeGroup) return;

    if (!formData.name.trim()) {
      showToast('Please enter a group name', 'error');
      return;
    }
    if (!formData.whatsapp_group_link.trim()) {
      showToast('Please enter a WhatsApp invite link', 'error');
      return;
    }

    const updatedGroups = groups.map((g) =>
      g.id === activeGroup.id
        ? {
            ...g,
            name: formData.name.trim(),
            group_type: formData.group_type,
            whatsapp_group_link: formData.whatsapp_group_link.trim(),
            max_members: Number(formData.max_members) || 1024,
            status: formData.status,
          }
        : g
    );

    setGroups(updatedGroups);
    showToast(`WhatsApp Group "${formData.name}" updated successfully!`, 'success');
    setIsEditModalOpen(false);
    setActiveGroup(null);
  };

  // Confirm Delete
  const handleConfirmDelete = () => {
    if (!activeGroup) return;
    setGroups(groups.filter((g) => g.id !== activeGroup.id));
    showToast(`WhatsApp Group "${activeGroup.name}" deleted successfully!`, 'success');
    setIsDeleteModalOpen(false);
    setActiveGroup(null);
  };

  // Filtered List
  const filteredGroups = groups.filter((group) => {
    const matchesSearch =
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.whatsapp_group_link.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || group.group_type.toLowerCase() === filterType.toLowerCase();
    const matchesStatus = filterStatus === 'all' || group.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <AdminLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', fontFamily: 'inherit' }}>
        
        {/* ========================================================================= */}
        {/* Page Header (Matching Dashboard & Reference Screenshot)                  */}
        {/* ========================================================================= */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div>
            <h1
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#111827',
                margin: 0,
                letterSpacing: '-0.02em',
              }}
            >
              WhatsApp Groups Management
            </h1>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.85rem',
                color: '#6B7280',
                marginTop: '4px',
              }}
            >
              <a href="/admin/dashboard" style={{ color: '#6B7280', textDecoration: 'none', fontWeight: 500 }}>
                Dashboard
              </a>
              <span>/</span>
              <span style={{ color: '#111827', fontWeight: 600 }}>WhatsApp Groups</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              onClick={handleOpenCreate}
              style={{
                backgroundColor: '#2563EB',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 18px',
                fontSize: '0.875rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)',
                transition: 'background-color 0.15s ease',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1D4ED8')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2563EB')}
            >
              <PlusCircle size={17} />
              + Create Group
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* Top KPI Metric Cards (Dashboard Modern Style)                             */}
        {/* ========================================================================= */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
          }}
        >
          {/* Card 1: Total Groups */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '18px 20px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <p style={{ fontSize: '0.8rem', color: '#6B7280', margin: 0, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Total WhatsApp Groups
              </p>
              <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#111827', margin: '4px 0 0' }}>
                {totalGroups} Groups
              </h3>
              <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 600 }}>
                ● {activeCount} Active Channels
              </span>
            </div>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '10px',
                backgroundColor: '#ECFDF5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#10B981',
              }}
            >
              <MessageSquare size={22} />
            </div>
          </div>

          {/* Card 2: Driver Communities */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '18px 20px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <p style={{ fontSize: '0.8rem', color: '#6B7280', margin: 0, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Driver Groups
              </p>
              <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0284C7', margin: '4px 0 0' }}>
                {driverGroupsCount} Groups
              </h3>
              <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                Commercial & Heavy Fleet
              </span>
            </div>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '10px',
                backgroundColor: '#E0F2FE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0284C7',
              }}
            >
              <Truck size={22} />
            </div>
          </div>

          {/* Card 3: Transporter Groups */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '18px 20px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <p style={{ fontSize: '0.8rem', color: '#6B7280', margin: 0, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Transporter Groups
              </p>
              <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#7C3AED', margin: '4px 0 0' }}>
                {transporterGroupsCount} Groups
              </h3>
              <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                Fleet Owners & Booking
              </span>
            </div>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '10px',
                backgroundColor: '#F5F3FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#7C3AED',
              }}
            >
              <Users size={22} />
            </div>
          </div>

          {/* Card 4: Total Capacity */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '18px 20px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <p style={{ fontSize: '0.8rem', color: '#6B7280', margin: 0, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Combined Member Capacity
              </p>
              <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#D97706', margin: '4px 0 0' }}>
                {totalCapacity.toLocaleString()} Seats
              </h3>
              <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                Max Community Reach
              </span>
            </div>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '10px',
                backgroundColor: '#FEF3C7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#D97706',
              }}
            >
              <Sparkles size={22} />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* Search & Filter Toolbar                                                   */}
        {/* ========================================================================= */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
          }}
        >
          {/* Search Box */}
          <div
            style={{
              position: 'relative',
              flex: '1 1 280px',
              maxWidth: '420px',
            }}
          >
            <Search
              size={17}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9CA3AF',
              }}
            />
            <input
              type="text"
              placeholder="Search by group name or invite link..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                height: '38px',
                paddingLeft: '38px',
                paddingRight: '12px',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                fontSize: '0.85rem',
                backgroundColor: '#F8FAFC',
                boxSizing: 'border-box',
                outline: 'none',
              }}
            />
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Filter size={15} style={{ color: '#6B7280' }} />
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569' }}>Type:</span>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                style={{
                  height: '36px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#FFFFFF',
                  padding: '0 10px',
                  fontSize: '0.85rem',
                  color: '#334155',
                }}
              >
                <option value="all">All Types</option>
                <option value="driver">Driver</option>
                <option value="transporter">Transporter</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569' }}>Status:</span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{
                  height: '36px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#FFFFFF',
                  padding: '0 10px',
                  fontSize: '0.85rem',
                  color: '#334155',
                }}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* Main WhatsApp Groups Directory Table                                     */}
        {/* ========================================================================= */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            overflow: 'hidden',
          }}
        >
          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                textAlign: 'left',
                fontSize: '0.875rem',
              }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: '#F8FAFC',
                    borderBottom: '2px solid #E2E8F0',
                    color: '#334155',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                  }}
                >
                  <th style={{ padding: '14px 18px', minWidth: '220px' }}>Name</th>
                  <th style={{ padding: '14px 18px', minWidth: '110px' }}>Type</th>
                  <th style={{ padding: '14px 18px', minWidth: '340px' }}>Group Link</th>
                  <th style={{ padding: '14px 18px', minWidth: '110px' }}>Max Count</th>
                  <th style={{ padding: '14px 18px', minWidth: '100px' }}>Status</th>
                  <th style={{ padding: '14px 18px', minWidth: '140px', textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredGroups.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: '36px', textAlign: 'center', color: '#64748B' }}>
                      <MessageSquare size={36} style={{ margin: '0 auto 8px', opacity: 0.4 }} />
                      <p style={{ margin: 0, fontWeight: 600 }}>No WhatsApp groups match the filter.</p>
                    </td>
                  </tr>
                ) : (
                  filteredGroups.map((group, index) => (
                    <tr
                      key={group.id}
                      style={{
                        borderBottom: '1px solid #F1F5F9',
                        backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#FAFAFA',
                        transition: 'background-color 0.15s ease',
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#FFFFFF' : '#FAFAFA')
                      }
                    >
                      {/* Name */}
                      <td style={{ padding: '14px 18px', color: '#111827', fontWeight: 600 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span
                            style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '50%',
                              backgroundColor: '#DCFCE7',
                              color: '#16A34A',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.85rem',
                              flexShrink: 0,
                            }}
                          >
                            💬
                          </span>
                          <span>{group.name}</span>
                        </div>
                      </td>

                      {/* Type */}
                      <td style={{ padding: '14px 18px', color: '#334155', fontWeight: 500 }}>
                        <span
                          style={{
                            color: group.group_type.toLowerCase() === 'driver' ? '#0284C7' : '#7C3AED',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                          }}
                        >
                          {group.group_type.charAt(0).toUpperCase() + group.group_type.slice(1)}
                        </span>
                      </td>

                      {/* Group Link */}
                      <td style={{ padding: '14px 18px' }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            maxWidth: '460px',
                          }}
                        >
                          <a
                            href={group.whatsapp_group_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: '#2563EB',
                              textDecoration: 'none',
                              fontSize: '0.825rem',
                              wordBreak: 'break-all',
                              fontFamily: 'monospace',
                            }}
                          >
                            {group.whatsapp_group_link}
                          </a>
                          <button
                            title="Copy link"
                            onClick={() => handleCopyLink(group.whatsapp_group_link)}
                            style={{
                              backgroundColor: '#F1F5F9',
                              border: 'none',
                              borderRadius: '4px',
                              padding: '4px 6px',
                              cursor: 'pointer',
                              color: '#475569',
                              display: 'inline-flex',
                              alignItems: 'center',
                              flexShrink: 0,
                            }}
                          >
                            <Copy size={13} />
                          </button>
                        </div>
                      </td>

                      {/* Max Count */}
                      <td style={{ padding: '14px 18px', color: '#334155', fontWeight: 600 }}>
                        {group.max_members}
                      </td>

                      {/* Status */}
                      <td style={{ padding: '14px 18px' }}>
                        <span
                          style={{
                            color: group.status.toLowerCase() === 'active' ? '#16A34A' : '#9CA3AF',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                          }}
                        >
                          <span
                            style={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              backgroundColor: group.status.toLowerCase() === 'active' ? '#16A34A' : '#9CA3AF',
                            }}
                          />
                          {group.status.charAt(0).toUpperCase() + group.status.slice(1)}
                        </span>
                      </td>

                      {/* Action */}
                      <td style={{ padding: '14px 18px', textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', gap: '6px', alignItems: 'center' }}>
                          <button
                            onClick={() => handleOpenEdit(group)}
                            style={{
                              backgroundColor: '#F59E0B',
                              color: '#FFFFFF',
                              border: 'none',
                              borderRadius: '4px',
                              padding: '5px 12px',
                              fontSize: '0.8rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              transition: 'background-color 0.15s',
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#D97706')}
                            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#F59E0B')}
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleOpenDelete(group)}
                            style={{
                              backgroundColor: '#EF4444',
                              color: '#FFFFFF',
                              border: 'none',
                              borderRadius: '4px',
                              padding: '5px 12px',
                              fontSize: '0.8rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              transition: 'background-color 0.15s',
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#DC2626')}
                            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#EF4444')}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CREATE GROUP MODAL                                                        */}
        {/* ========================================================================= */}
        {isCreateModalOpen && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(15, 23, 42, 0.65)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              padding: '20px',
            }}
          >
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                width: '100%',
                maxWidth: '560px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                overflow: 'hidden',
              }}
            >
              {/* Header */}
              <div
                style={{
                  padding: '18px 24px',
                  borderBottom: '1px solid #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#F8FAFC',
                }}
              >
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: '#0F172A' }}>
                    + Create New WhatsApp Group
                  </h3>
                  <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: '#64748B' }}>
                    Add official community link for drivers or transporters
                  </p>
                </div>
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#64748B',
                    cursor: 'pointer',
                    padding: '6px',
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSaveCreate} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* Group Type */}
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                    Group Type <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <select
                    required
                    value={formData.group_type}
                    onChange={(e) => setFormData({ ...formData, group_type: e.target.value })}
                    style={{
                      width: '100%',
                      height: '42px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      padding: '0 12px',
                      fontSize: '0.875rem',
                      backgroundColor: '#FFFFFF',
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="driver">Driver</option>
                    <option value="transporter">Transporter</option>
                  </select>
                </div>

                {/* Group Name */}
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                    Group Name <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. TruckMitr Official Group-VII"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      height: '42px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      padding: '0 12px',
                      fontSize: '0.875rem',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                {/* WhatsApp Group Link */}
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                    WhatsApp Group Link <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://chat.whatsapp.com/..."
                    value={formData.whatsapp_group_link}
                    onChange={(e) => setFormData({ ...formData, whatsapp_group_link: e.target.value })}
                    style={{
                      width: '100%',
                      height: '42px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      padding: '0 12px',
                      fontSize: '0.875rem',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                {/* Max Members & Status */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                      Max Members Count
                    </label>
                    <input
                      type="number"
                      placeholder="1024"
                      value={formData.max_members}
                      onChange={(e) => setFormData({ ...formData, max_members: e.target.value })}
                      style={{
                        width: '100%',
                        height: '42px',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        padding: '0 12px',
                        fontSize: '0.875rem',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      style={{
                        width: '100%',
                        height: '42px',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        padding: '0 12px',
                        fontSize: '0.875rem',
                        backgroundColor: '#FFFFFF',
                        boxSizing: 'border-box',
                      }}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    style={{
                      backgroundColor: '#F1F5F9',
                      color: '#475569',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '10px 18px',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    style={{
                      backgroundColor: '#2563EB',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '10px 22px',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)',
                    }}
                  >
                    Create Group
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* EDIT GROUP MODAL                                                          */}
        {/* ========================================================================= */}
        {isEditModalOpen && activeGroup && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(15, 23, 42, 0.65)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              padding: '20px',
            }}
          >
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                width: '100%',
                maxWidth: '560px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                overflow: 'hidden',
              }}
            >
              {/* Header */}
              <div
                style={{
                  padding: '18px 24px',
                  borderBottom: '1px solid #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#F8FAFC',
                }}
              >
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: '#0F172A' }}>
                    Edit WhatsApp Group
                  </h3>
                  <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: '#64748B' }}>
                    Update details for {activeGroup.name}
                  </p>
                </div>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#64748B',
                    cursor: 'pointer',
                    padding: '6px',
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSaveEdit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* Group Type */}
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                    Group Type <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <select
                    required
                    value={formData.group_type}
                    onChange={(e) => setFormData({ ...formData, group_type: e.target.value })}
                    style={{
                      width: '100%',
                      height: '42px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      padding: '0 12px',
                      fontSize: '0.875rem',
                      backgroundColor: '#FFFFFF',
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="driver">Driver</option>
                    <option value="transporter">Transporter</option>
                  </select>
                </div>

                {/* Group Name */}
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                    Group Name <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      height: '42px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      padding: '0 12px',
                      fontSize: '0.875rem',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                {/* WhatsApp Group Link */}
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                    WhatsApp Group Link <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.whatsapp_group_link}
                    onChange={(e) => setFormData({ ...formData, whatsapp_group_link: e.target.value })}
                    style={{
                      width: '100%',
                      height: '42px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      padding: '0 12px',
                      fontSize: '0.875rem',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                {/* Max Members & Status */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                      Max Members Count
                    </label>
                    <input
                      type="number"
                      value={formData.max_members}
                      onChange={(e) => setFormData({ ...formData, max_members: e.target.value })}
                      style={{
                        width: '100%',
                        height: '42px',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        padding: '0 12px',
                        fontSize: '0.875rem',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      style={{
                        width: '100%',
                        height: '42px',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        padding: '0 12px',
                        fontSize: '0.875rem',
                        backgroundColor: '#FFFFFF',
                        boxSizing: 'border-box',
                      }}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    style={{
                      backgroundColor: '#F1F5F9',
                      color: '#475569',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '10px 18px',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    style={{
                      backgroundColor: '#2563EB',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '10px 22px',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)',
                    }}
                  >
                    Update Group
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* DELETE CONFIRMATION MODAL                                                 */}
        {/* ========================================================================= */}
        {isDeleteModalOpen && activeGroup && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(15, 23, 42, 0.65)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              padding: '20px',
            }}
          >
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                width: '100%',
                maxWidth: '440px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                padding: '24px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: '#FEE2E2',
                  color: '#EF4444',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}
              >
                <AlertTriangle size={28} />
              </div>

              <h3 style={{ margin: '0 0 8px', fontSize: '1.2rem', fontWeight: 700, color: '#111827' }}>
                Delete WhatsApp Group?
              </h3>
              <p style={{ margin: '0 0 20px', fontSize: '0.875rem', color: '#64748B', lineHeight: 1.5 }}>
                Are you sure you want to delete <strong>{activeGroup.name}</strong>? This link will no longer be available in the admin directory.
              </p>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                  style={{
                    backgroundColor: '#F1F5F9',
                    color: '#475569',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 20px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  style={{
                    backgroundColor: '#EF4444',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 22px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(239, 68, 68, 0.25)',
                  }}
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export const CreateWhatsAppGroupPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    group_type: 'driver',
    name: '',
    whatsapp_group_link: '',
    max_members: '1024',
    status: 'active',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('Please enter a group name', 'error');
      return;
    }
    if (!formData.whatsapp_group_link.trim()) {
      showToast('Please enter a WhatsApp invite link', 'error');
      return;
    }

    showToast(`WhatsApp Group "${formData.name}" created successfully!`, 'success');
    navigate('/admin/whatsapp-groups');
  };

  return (
    <AdminLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: 'inherit' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: 0 }}>
              WhatsApp Groups Management
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#6B7280', marginTop: '4px' }}>
              <a href="/admin/dashboard" style={{ color: '#6B7280', textDecoration: 'none' }}>Dashboard</a>
              <span>/</span>
              <a href="/admin/whatsapp-groups" style={{ color: '#6B7280', textDecoration: 'none' }}>WhatsApp Groups</a>
              <span>/</span>
              <span style={{ color: '#111827', fontWeight: 600 }}>Create</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/admin/whatsapp-groups')}
            style={{
              backgroundColor: '#2563EB',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 18px',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            View Group
          </button>
        </div>

        {/* Card Form */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '28px 32px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>
                  Group Type <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <select
                  required
                  value={formData.group_type}
                  onChange={(e) => setFormData({ ...formData, group_type: e.target.value })}
                  style={{ width: '100%', height: '42px', borderRadius: '8px', border: '1px solid #CBD5E1', padding: '0 12px', backgroundColor: '#FFFFFF', boxSizing: 'border-box' }}
                >
                  <option value="driver">Driver</option>
                  <option value="transporter">Transporter</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>
                  Group Name <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. TruckMitr Official Group-VII"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', height: '42px', borderRadius: '8px', border: '1px solid #CBD5E1', padding: '0 12px', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>
                  WhatsApp Group Link <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="https://chat.whatsapp.com/..."
                  value={formData.whatsapp_group_link}
                  onChange={(e) => setFormData({ ...formData, whatsapp_group_link: e.target.value })}
                  style={{ width: '100%', height: '42px', borderRadius: '8px', border: '1px solid #CBD5E1', padding: '0 12px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>
                  Maximum Count
                </label>
                <input
                  type="number"
                  placeholder="1024"
                  value={formData.max_members}
                  onChange={(e) => setFormData({ ...formData, max_members: e.target.value })}
                  style={{ width: '100%', height: '42px', borderRadius: '8px', border: '1px solid #CBD5E1', padding: '0 12px', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button
                type="submit"
                style={{
                  backgroundColor: '#16A34A',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 24px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(22, 163, 74, 0.2)',
                }}
              >
                Create
              </button>

              <button
                type="button"
                onClick={() => navigate('/admin/whatsapp-groups')}
                style={{
                  backgroundColor: '#6B7280',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 18px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </div>

          </form>
        </div>

      </div>
    </AdminLayout>
  );
};
