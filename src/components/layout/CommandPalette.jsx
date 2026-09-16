import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Layers, UserCheck, Truck, Users, IndianRupee, FileText, PhoneCall } from 'lucide-react';
import { useKeyboardShortcut } from '../../hooks/useKeyboardShortcut';
import { SEARCHABLE_ENTITIES } from '../../services/dashboardMockData';
import { SYSTEM_MODULES } from '../../utils/rbacConstants';
import { usePermissions } from '../../context/PermissionContext';

export const CommandPalette = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { can } = usePermissions();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Keyboard shortcut Ctrl+K / Meta+K
  useKeyboardShortcut('k', (e) => {
    e.preventDefault();
    if (isOpen) onClose();
  }, { ctrlKey: true });

  if (!isOpen) return null;

  // Filter modules accessible to current user
  const matchedModules = SYSTEM_MODULES.filter(
    (m) =>
      can(m.slug, 'view') &&
      (m.name.toLowerCase().includes(query.toLowerCase()) ||
        m.slug.toLowerCase().includes(query.toLowerCase()) ||
        m.section.toLowerCase().includes(query.toLowerCase()))
  ).map((m) => ({
    id: m.id,
    title: m.name,
    subtitle: `${m.section} • ${m.description}`,
    type: 'Module',
    category: 'System Pages',
    route: m.route
  }));

  // Filter entities
  const matchedEntities = SEARCHABLE_ENTITIES.filter(
    (e) =>
      e.title.toLowerCase().includes(query.toLowerCase()) ||
      e.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      e.id.toLowerCase().includes(query.toLowerCase())
  );

  const combinedResults = [...matchedModules, ...matchedEntities];

  const handleSelect = (item) => {
    if (item && item.route) {
      navigate(item.route);
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(combinedResults.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + combinedResults.length) % Math.max(combinedResults.length, 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (combinedResults[selectedIndex]) {
        handleSelect(combinedResults[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'System Pages':
        return <Layers size={15} color="#1467FF" />;
      case 'Drivers':
        return <UserCheck size={15} color="#10B981" />;
      case 'Transporters':
        return <Truck size={15} color="#F59E0B" />;
      case 'Employees':
        return <Users size={15} color="#8B5CF6" />;
      case 'Revenue':
        return <IndianRupee size={15} color="#059669" />;
      default:
        return <FileText size={15} color="#64748B" />;
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(7, 25, 43, 0.7)',
        backdropFilter: 'blur(6px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '12vh'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '640px',
          backgroundColor: '#FFFFFF',
          borderRadius: '18px',
          boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.35)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid #CBD5E1'
        }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search input bar */}
        <div
          style={{
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            borderBottom: '1px solid #E2E8F0',
            backgroundColor: '#F8FAFC'
          }}
        >
          <Search size={18} color="#1467FF" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search anything... (Driver TMID, Job ID, Transporter, Employee, Module)"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              fontSize: '14px',
              fontWeight: 500,
              color: '#0F172A'
            }}
          />
          <div
            style={{
              padding: '2px 8px',
              borderRadius: '6px',
              backgroundColor: '#E2E8F0',
              fontSize: '11px',
              fontWeight: 700,
              color: '#475569'
            }}
          >
            ESC
          </div>
        </div>

        {/* Results List */}
        <div style={{ maxHeight: '380px', overflowY: 'auto', padding: '8px 0' }}>
          {combinedResults.length === 0 ? (
            <div style={{ padding: '32px 20px', textAlign: 'center', color: '#94A3B8', fontSize: '13px' }}>
              No matches found for "{query}". Try searching by Driver TMID, Transporter, or Module name.
            </div>
          ) : (
            combinedResults.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={`${item.id}-${index}`}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  style={{
                    padding: '10px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    backgroundColor: isSelected ? '#EFF6FF' : 'transparent',
                    borderLeft: isSelected ? '3px solid #1467FF' : '3px solid transparent',
                    transition: 'background 0.1s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                    <div
                      style={{
                        padding: '6px',
                        borderRadius: '8px',
                        backgroundColor: isSelected ? '#DBEAFE' : '#F1F5F9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {getCategoryIcon(item.category)}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: '13px',
                          fontWeight: 700,
                          color: '#0F172A',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {item.title}
                      </div>
                      <div
                        style={{
                          fontSize: '11px',
                          color: '#64748B',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        padding: '2px 6px',
                        borderRadius: '4px',
                        backgroundColor: '#F1F5F9',
                        color: '#475569'
                      }}
                    >
                      {item.category}
                    </span>
                    <ArrowRight size={14} color={isSelected ? '#1467FF' : '#94A3B8'} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div
          style={{
            padding: '10px 18px',
            backgroundColor: '#F8FAFC',
            borderTop: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '11px',
            color: '#64748B'
          }}
        >
          <div style={{ display: 'flex', gap: '12px' }}>
            <span><strong style={{ color: '#0F172A' }}>↑ ↓</strong> Navigate</span>
            <span><strong style={{ color: '#0F172A' }}>↵</strong> Select</span>
            <span><strong style={{ color: '#0F172A' }}>ESC</strong> Close</span>
          </div>
          <span>TruckMitr One Search Engine</span>
        </div>
      </div>
    </div>
  );
};
