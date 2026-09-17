import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SuperAdminLayout } from './components/layout/SuperAdminLayout';
import { SuperAdminDashboardPage } from './pages/SuperAdminDashboardPage';

function App() {
  return (
    <BrowserRouter>
      <SuperAdminLayout activePath="/admin/dashboard">
        <Routes>
          <Route path="/" element={<SuperAdminDashboardPage />} />
          <Route path="/admin/dashboard" element={<SuperAdminDashboardPage />} />
          <Route path="*" element={<SuperAdminDashboardPage />} />
        </Routes>
      </SuperAdminLayout>
    </BrowserRouter>
  );
}

export default App;
