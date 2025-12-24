import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  login: (credentials: { username: string; password: string }) =>
    api.post('/auth/login', credentials),
  
  register: (data: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => api.post('/auth/register', data),
  
  verify: () => api.get('/auth/verify'),
  
  logout: () => api.post('/auth/logout'),
};

// Services API
export const servicesApi = {
  getAll: () => api.get('/services'),
  
  getByCategory: (category: string) => api.get(`/services/category/${category}`),
  
  getByPlatform: (platform: string) => api.get(`/services/platform/${platform}`),
  
  create: (service: any) => api.post('/services', service),
  
  update: (id: string, service: any) => api.put(`/services/${id}`, service),
  
  delete: (id: string) => api.delete(`/services/${id}`),
  
  toggleStatus: (id: string) => api.patch(`/services/${id}/toggle`),
};

// Orders API
export const ordersApi = {
  getAll: () => api.get('/orders'),
  
  getByUser: (userId: string) => api.get(`/orders/user/${userId}`),
  
  create: (order: { serviceId: string; link: string; quantity: number }) =>
    api.post('/orders', order),
  
  getById: (id: string) => api.get(`/orders/${id}`),
  
  cancel: (id: string) => api.patch(`/orders/${id}/cancel`),
  
  getStats: () => api.get('/orders/stats'),
};

// Users API
export const usersApi = {
  getAll: () => api.get('/users'),
  
  getById: (id: string) => api.get(`/users/${id}`),
  
  update: (id: string, userData: any) => api.put(`/users/${id}`, userData),
  
  updateBalance: (id: string, balance: number) =>
    api.patch(`/users/${id}/balance`, { balance }),
  
  toggleStatus: (id: string) => api.patch(`/users/${id}/toggle`),
  
  delete: (id: string) => api.delete(`/users/${id}`),
  
  getStats: () => api.get('/users/stats'),
};

// Payments API
export const paymentsApi = {
  getMethods: () => api.get('/payments/methods'),
  
  createTransaction: (data: {
    amount: number;
    paymentMethod: string;
  }) => api.post('/payments/transaction', data),
  
  getTransactions: (userId: string) => api.get(`/payments/transactions/${userId}`),
  
  confirmPayment: (transactionId: string) =>
    api.post(`/payments/confirm/${transactionId}`),
};

// Dashboard API
export const dashboardApi = {
  getStats: () => api.get('/dashboard/stats'),
  
  getUserStats: (userId: string) => api.get(`/dashboard/user/${userId}/stats`),
  
  getActivity: () => api.get('/dashboard/activity'),
};

// Admin API
export const adminApi = {
  getStats: () => api.get('/admin/stats'),
  
  getUsers: (page?: number, limit?: number) =>
    api.get('/admin/users', { params: { page, limit } }),
  
  getOrders: (page?: number, limit?: number) =>
    api.get('/admin/orders', { params: { page, limit } }),
  
  getServices: () => api.get('/admin/services'),
  
  updateSettings: (settings: any) => api.put('/admin/settings', settings),
  
  getSettings: () => api.get('/admin/settings'),
};

// Utility functions
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateTime = (date: string): string => {
  return new Date(date).toLocaleString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'pending':
      return 'text-yellow-600 bg-yellow-100';
    case 'processing':
      return 'text-blue-600 bg-blue-100';
    case 'completed':
      return 'text-green-600 bg-green-100';
    case 'partial':
      return 'text-orange-600 bg-orange-100';
    case 'cancelled':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

export const getStatusText = (status: string): string => {
  switch (status) {
    case 'pending':
      return 'في الانتظار';
    case 'processing':
      return 'قيد المعالجة';
    case 'completed':
      return 'مكتمل';
    case 'partial':
      return 'جزئي';
    case 'cancelled':
      return 'ملغي';
    default:
      return status;
  }
};