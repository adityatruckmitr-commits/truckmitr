import React from 'react';

export const Table = ({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = 'No records found',
  onRowClick,
}) => {
  return (
    <div style={{ width: '100%', overflowX: 'auto', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
        <thead>
          <tr style={{ backgroundColor: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)' }}>
            {columns.map((col, idx) => (
              <th
                key={col.key || idx}
                style={{
                  padding: '14px 16px',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.3px',
                  ...col.headerStyle,
                }}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: 'center', padding: '36px', color: 'var(--text-dim)' }}>
                <div style={{ display: 'inline-block', width: '24px', height: '24px', border: '3px solid rgba(255,107,0,0.2)', borderTopColor: 'var(--color-primary)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                <div style={{ marginTop: '8px' }}>Loading data...</div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: 'center', padding: '36px', color: 'var(--text-dim)' }}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIdx) => (
              <tr
                key={row.id || rowIdx}
                onClick={() => onRowClick && onRowClick(row)}
                style={{
                  borderBottom: '1px solid var(--border-subtle)',
                  backgroundColor: rowIdx % 2 === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.01)',
                  cursor: onRowClick ? 'pointer' : 'default',
                  transition: 'background-color 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  if (onRowClick) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                }}
                onMouseLeave={(e) => {
                  if (onRowClick) e.currentTarget.style.backgroundColor = rowIdx % 2 === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.01)';
                }}
              >
                {columns.map((col, colIdx) => (
                  <td
                    key={col.key || colIdx}
                    style={{
                      padding: '14px 16px',
                      color: 'var(--text-main)',
                      ...col.cellStyle,
                    }}
                  >
                    {col.render ? col.render(row[col.key], row, rowIdx) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
