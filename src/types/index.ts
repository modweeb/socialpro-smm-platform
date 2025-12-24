// User Types
export interface User {
  id: string;
  username: string;
  email: string;
  balance: number;
  role: 'user' | 'admin';
  createdAt: string;
  isActive: boolean;
}

// Authentication Types
export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Service Types
export interface Service {
  id: string;
  name: string;
  category: string;
  platform: 'instagram' | 'youtube' | 'tiktok' | 'twitter' | 'facebook' | 'other';
  pricePer1000: number;
  minQuantity: number;
  maxQuantity: number;
  description: string;
  provider: string;
  isActive: boolean;
}

export interface ServiceCategory {
  id: string;
  name: string;
  platform: string;
  services: Service[];
}

// Order Types
export interface Order {
  id: string;
  userId: string;
  serviceId: string;
  link: string;
  quantity: number;
  charge: number;
  startCount: number;
  remains: number;
  status: 'pending' | 'processing' | 'completed' | 'partial' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  service: Service;
}

export interface NewOrder {
  serviceId: string;
  link: string;
  quantity: number;
}

// Payment Types
export interface PaymentMethod {
  id: string;
  name: string;
  type: 'credit_card' | 'paypal' | 'bank_transfer' | 'crypto';
  isActive: boolean;
  fee: number;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'order' | 'refund';
  status: 'pending' | 'completed' | 'failed';
  paymentMethod: string;
  createdAt: string;
  description: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Dashboard Stats
export interface DashboardStats {
  totalOrders: number;
  totalSpent: number;
  activeOrders: number;
  completedOrders: number;
  balance: number;
}

// Admin Types
export interface AdminStats {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  completedOrders: number;
}

export interface UserActivity {
  userId: string;
  username: string;
  lastLogin: string;
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'inactive' | 'banned';
}

// Form Types
export interface AddFundsForm {
  amount: number;
  paymentMethod: string;
}

export interface ServiceForm {
  name: string;
  category: string;
  platform: string;
  pricePer1000: number;
  minQuantity: number;
  maxQuantity: number;
  description: string;
  provider: string;
}