import axios from 'axios';

// Create Central Axios Instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 60000,
});

// Request Interceptor: Attach JWT/Sanctum Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('tm_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Unauthenticated or Global Errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token and broadcast logout if unauthorized
      localStorage.removeItem('tm_token');
      localStorage.removeItem('tm_user');
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error.response?.data || error.message || 'Something went wrong');
  }
);

// Modular API Services
export const authApi = {
  sendOtp: (phone) => api.post('/send-otp', { phone }),
  verifyOtp: (phone, otp, role) => api.post('/verify-otp-signup', { phone, otp, role }),
  login: (credentials) => api.post('/signin_login', credentials),
  register: (userData) => api.post('/signup_create', userData),
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data) => api.post('/user/update-profile', data),
};

export const jobsApi = {
  getJobs: (params) => api.get('/get-all-jobs', { params }),
  getJobDetails: (id) => api.get(`/job-detail/${id}`),
  applyJob: (jobId, driverData) => api.post('/apply-job', { job_id: jobId, ...driverData }),
  getAppliedJobs: () => api.get('/driver/applied-jobs'),
  postJob: (jobData) => api.post('/transporter/post-job', jobData),
  getTransporterJobs: () => api.get('/transporter/my-jobs'),
  getApplicants: (jobId) => api.get(`/transporter/job/${jobId}/applicants`),
};

export const driverApi = {
  getDrivers: (params) => api.get('/public/drivers', { params }),
  getDriverDetails: (id) => api.get(`/driver/${id}`),
  getWelfareCourses: () => api.get('/driver-welfare/courses'),
  submitQuiz: (quizId, answers) => api.post(`/driver-welfare/quiz/${quizId}/submit`, { answers }),
};

export const verificationApi = {
  verifyDL: (dlNumber, dob) => api.post('/befisc/verify-dl', { dl_number: dlNumber, dob }),
  verifyRC: (rcNumber) => api.post('/befisc/verify-rc', { rc_number: rcNumber }),
  verifyPan: (panNumber) => api.post('/befisc/verify-pan', { pan_number: panNumber }),
  verifyCourtRecord: (name, fatherName, address) => api.post('/befisc/court-check', { name, fatherName, address }),
  getWalletBalance: () => api.get('/verification/wallet/balance'),
  rechargeWallet: (amount) => api.post('/verification/wallet/recharge', { amount }),
};

export const crmApi = {
  getDashboardStats: () => api.get('/telecaller/dashboard-stats'),
  getCallQueue: (params) => api.get('/telecaller/queue', { params }),
  logCallOutcome: (callData) => api.post('/telecaller/log-call', callData),
  getMatchmakingPool: (params) => api.get('/telecaller/matchmaking-pool', { params }),
  scheduleInterview: (data) => api.post('/telecaller/schedule-interview', data),
};

export const adminApi = {
  getOverviewMetrics: () => api.get('/admin/overview-metrics'),
  getUsersList: (params) => api.get('/admin/users', { params }),
  toggleUserStatus: (userId, status) => api.post(`/admin/user/${userId}/toggle-status`, { status }),
  getRevenueSummary: () => api.get('/admin/revenue-summary'),
};

export default api;
