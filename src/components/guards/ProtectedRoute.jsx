import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, currentUser, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return null;
  }

  const isAuthed = isAuthenticated || Boolean(currentUser) || Boolean(localStorage.getItem('tm_auth_token'));

  if (!isAuthed) {
    return <Navigate to="/one/login" state={{ from: location }} replace />;
  }

  return children;
};
