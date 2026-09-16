import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CeoDashboard } from './CeoDashboard';
import { ManagerDashboard } from './ManagerDashboard';
import { TelecallerDashboard } from './TelecallerDashboard';
import { HrDashboard } from './HrDashboard';
import { AdminDashboard } from './AdminDashboard';

/**
 * RoleDashboardRouter: Dynamically renders the correct dashboard component matching route param or active role
 */
export const RoleDashboardRouter = () => {
  const { role } = useParams();
  const { activeRole } = useAuth();

  const targetRole = role || activeRole || 'ceo';

  switch (targetRole) {
    case 'ceo':
      return <CeoDashboard />;
    case 'manager':
      return <ManagerDashboard />;
    case 'telecaller':
      return <TelecallerDashboard />;
    case 'hr':
      return <HrDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <Navigate to={`/one/dashboard/${activeRole}`} replace />;
  }
};
