import React, { useState } from 'react';
import { SuperAdminNavbar } from './SuperAdminNavbar';
import { SuperAdminSidebar } from './SuperAdminSidebar';

export const SuperAdminLayout = ({ children, activePath = '/admin/dashboard' }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F4F6F9' }}>
      <SuperAdminNavbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div style={{ display: 'flex', flex: 1 }}>
        {isSidebarOpen && <SuperAdminSidebar activePath={activePath} />}
        <main
          style={{
            flex: 1,
            padding: '24px',
            overflowX: 'hidden',
            maxWidth: '100%',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};
