import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 60000,
});

// Attach bearer token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('tm_admin_token') || localStorage.getItem('tm_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const adminDashboardApi = {
  // 1. Core executive KPI stats
  getDashboardStats: async (params = {}) => {
    try {
      const response = await api.get('/admin/dashboard-stats', { params });
      return response.data?.data !== undefined ? response.data.data : response.data;
    } catch (error) {
      console.warn('Backend API /admin/dashboard-stats unreachable, utilizing resilient live fallback data.', error);
      return null;
    }
  },

  // 2. Recent Jobs
  getRecentJobs: async () => {
    try {
      const response = await api.get('/admin/recent-jobs');
      return response.data?.data !== undefined ? response.data.data : response.data;
    } catch (error) {
      console.warn('Backend API /admin/recent-jobs unreachable', error);
      return null;
    }
  },

  // 3. Recent Drivers
  getRecentDrivers: async () => {
    try {
      const response = await api.get('/admin/recent-drivers');
      return response.data?.data !== undefined ? response.data.data : response.data;
    } catch (error) {
      console.warn('Backend API /admin/recent-drivers unreachable', error);
      return null;
    }
  },

  // 4. Recent Transporters
  getRecentTransporters: async () => {
    try {
      const response = await api.get('/admin/recent-transporters');
      return response.data?.data !== undefined ? response.data.data : response.data;
    } catch (error) {
      console.warn('Backend API /admin/recent-transporters unreachable', error);
      return null;
    }
  },

  // 5. State-wise registrations
  getStateRegistrations: async (params = {}) => {
    try {
      const response = await api.get('/admin/state-registrations', { params });
      return response.data?.data !== undefined ? response.data.data : response.data;
    } catch (error) {
      console.warn('Backend API /admin/state-registrations unreachable', error);
      return null;
    }
  },

  // 6. Grand Daily Operations Ledger
  getDailyLedger: async (params = {}) => {
    try {
      const response = await api.get('/admin/daily-ledger', { params });
      return response.data?.data !== undefined ? response.data.data : response.data;
    } catch (error) {
      console.warn('Backend API /admin/daily-ledger unreachable', error);
      return null;
    }
  },

  // 7. Today Call Report
  getTodayCallReport: async () => {
    try {
      const response = await api.get('/admin/today-call-report');
      return response.data?.data !== undefined ? response.data.data : response.data;
    } catch (error) {
      console.warn('Backend API /admin/today-call-report unreachable', error);
      return null;
    }
  },

  // 8. Update Target Settings
  updateMonthlyTarget: async (targetData) => {
    try {
      const response = await api.post('/admin/update-monthly-target', targetData);
      return response.data;
    } catch (error) {
      console.error('Failed to update monthly target', error);
      throw error;
    }
  },
};
