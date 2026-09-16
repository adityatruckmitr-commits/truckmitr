import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, Download, Filter, RotateCcw } from 'lucide-react';

/**
 * DataTable: Universal data table with search, filters, pagination, multi-select, and export
 */
export const DataTable = ({
  columns = [],
  data = [],
  searchPlaceholder = 'Search records...',
  searchKeys = [],
  filters = [], // [{ key, label, options: [{ value, label }] }]
  filtersState = {},
  onFilterChange,
  selectable = false,
  selectedRows = [],
  onSelectRow,
  onSelectAll,
  onRowClick,
  actionsSlot,
  pageSize = 10,
  emptyMessage = 'No records found matching your filters.'
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // 1. Filter & Search Data
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // Search matching
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matches = searchKeys.length > 0
          ? searchKeys.some((k) => String(item[k] || '').toLowerCase().includes(query))
          : Object.values(item).some((val) => String(val || '').toLowerCase().includes(query));

        if (!matches) return false;
      }

      // External filters matching
      for (const [key, value] of Object.entries(filtersState)) {
        if (value && value !== 'ALL') {
          if (String(item[key]) !== String(value)) {
            return false;
          }
        }
      }

      return true;
    });
  }, [data, searchQuery, searchKeys, filtersState]);

  // 2. Sort Data
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  // 3. Paginate Data
  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  const isAllSelected =
    paginatedData.length > 0 &&
    paginatedData.every((item) => selectedRows.includes(item.id));

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {/* Top Controls Toolbar */}
      <div
        style={{
          padding: '16px 20px',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          backgroundColor: '#FCFDFF'
        }}
      >
        {/* Left: Search Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '240px', maxWidth: '400px' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <Search
              size={15}
              color="#94A3B8"
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '8px 12px 8px 34px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '13px',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Right: Filters & Action Buttons Slot */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {filters.map((filter) => (
            <select
              key={filter.key}
              value={filtersState[filter.key] || 'ALL'}
              onChange={(e) => {
                onFilterChange && onFilterChange(filter.key, e.target.value);
                setCurrentPage(1);
              }}
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '12px',
                backgroundColor: '#FFFFFF',
                fontWeight: 600,
                color: '#334155',
                cursor: 'pointer'
              }}
            >
              <option value="ALL">{filter.label}</option>
              {filter.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ))}

          {actionsSlot}
        </div>
      </div>

      {/* Table Container */}
      <div style={{ overflowX: 'auto', width: '100%' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569' }}>
              {selectable && (
                <th style={{ padding: '12px 16px', width: '40px' }}>
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={(e) => onSelectAll && onSelectAll(e.target.checked, paginatedData)}
                    style={{ width: '15px', height: '15px', accentColor: '#1467FF', cursor: 'pointer' }}
                  />
                </th>
              )}
              {columns.map((col, idx) => {
                const colKey = col.key || col.accessor || `col_${idx}`;
                const colTitle = col.title !== undefined ? col.title : (col.header !== undefined ? col.header : '');
                return (
                  <th
                    key={colKey}
                    onClick={() => col.sortable && handleSort(colKey)}
                    style={{
                      padding: '12px 16px',
                      fontWeight: 700,
                      cursor: col.sortable ? 'pointer' : 'default',
                      whiteSpace: 'nowrap',
                      ...col.headerStyle
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>{colTitle}</span>
                      {col.sortable && sortConfig.key === colKey && (
                        <span style={{ fontSize: '10px', color: '#1467FF' }}>
                          {sortConfig.direction === 'asc' ? '▲' : '▼'}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  style={{ padding: '48px 20px', textAlign: 'center', color: '#94A3B8', fontSize: '13px' }}
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((item, index) => {
                const isSelected = selectedRows.includes(item.id);
                return (
                  <tr
                    key={item.id || index}
                    onClick={() => onRowClick && onRowClick(item)}
                    style={{
                      borderBottom: '1px solid #F1F5F9',
                      backgroundColor: isSelected ? '#EFF6FF' : 'transparent',
                      cursor: onRowClick ? 'pointer' : 'default',
                      transition: 'background-color 0.12s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) e.currentTarget.style.backgroundColor = '#F8FAFC';
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    {selectable && (
                      <td
                        style={{ padding: '12px 16px' }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => onSelectRow && onSelectRow(item.id, e.target.checked)}
                          style={{ width: '15px', height: '15px', accentColor: '#1467FF', cursor: 'pointer' }}
                        />
                      </td>
                    )}
                    {columns.map((col, cIdx) => {
                      const colKey = col.key || col.accessor || `col_${cIdx}`;
                      const cellVal = col.accessor && item[col.accessor] !== undefined
                        ? item[col.accessor]
                        : (col.key && item[col.key] !== undefined ? item[col.key] : item[colKey]);
                      return (
                        <td
                          key={colKey}
                          style={{
                            padding: '12px 16px',
                            color: '#334155',
                            verticalAlign: 'middle',
                            ...col.cellStyle
                          }}
                        >
                          {col.render ? col.render(cellVal, item, index) : (cellVal !== undefined ? cellVal : null)}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div
        style={{
          padding: '14px 20px',
          borderTop: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '12px',
          color: '#64748B',
          backgroundColor: '#FCFDFF',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div>
          Showing <strong>{sortedData.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}</strong> to{' '}
          <strong>{Math.min(currentPage * pageSize, sortedData.length)}</strong> of{' '}
          <strong>{sortedData.length}</strong> records
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid #CBD5E1',
              backgroundColor: currentPage === 1 ? '#F1F5F9' : '#FFFFFF',
              color: currentPage === 1 ? '#94A3B8' : '#334155',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              fontWeight: 600
            }}
          >
            <ChevronLeft size={14} /> Previous
          </button>

          <span style={{ padding: '0 8px', fontWeight: 700, color: '#0F172A' }}>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid #CBD5E1',
              backgroundColor: currentPage === totalPages || totalPages === 0 ? '#F1F5F9' : '#FFFFFF',
              color: currentPage === totalPages || totalPages === 0 ? '#94A3B8' : '#334155',
              cursor: currentPage === totalPages || totalPages === 0 ? 'not-allowed' : 'pointer',
              fontWeight: 600
            }}
          >
            Next <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
