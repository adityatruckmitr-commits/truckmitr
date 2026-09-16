import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { AuthProvider } from './context/AuthContext';
import { PermissionProvider } from './context/PermissionContext';
import { ToastProvider } from './context/ToastContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PermissionProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </PermissionProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

