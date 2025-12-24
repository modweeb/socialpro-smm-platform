import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginPage } from './components/auth/LoginPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { DashboardPage } from './pages/DashboardPage';
import { NewOrderPage } from './pages/NewOrderPage';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { SupportPage } from './pages/SupportPage';
import { TermsPage } from './pages/TermsPage';
import { AboutPage } from './pages/AboutPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { ErrorBoundary } from './components/ErrorBoundary';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Admin Route Component
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

// Placeholder components for routes not yet implemented
const OrdersPage: React.FC = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold tracking-tight">طلباتي</h1>
    <p className="text-muted-foreground">صفحة عرض الطلبات قيد التطوير...</p>
  </div>
);

const AddFundsPage: React.FC = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold tracking-tight">إضافة رصيد</h1>
    <p className="text-muted-foreground">صفحة إضافة الرصيد قيد التطوير...</p>
  </div>
);

const SettingsPage: React.FC = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold tracking-tight">الإعدادات</h1>
    <p className="text-muted-foreground">صفحة الإعدادات قيد التطوير...</p>
  </div>
);

const AdminUsersPage: React.FC = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold tracking-tight">إدارة المستخدمين</h1>
    <p className="text-muted-foreground">صفحة إدارة المستخدمين قيد التطوير...</p>
  </div>
);

const AdminServicesPage: React.FC = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold tracking-tight">إدارة الخدمات</h1>
    <p className="text-muted-foreground">صفحة إدارة الخدمات قيد التطوير...</p>
  </div>
);

const AdminOrdersPage: React.FC = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold tracking-tight">إدارة الطلبات</h1>
    <p className="text-muted-foreground">صفحة إدارة الطلبات قيد التطوير...</p>
  </div>
);

const AdminSettingsPage: React.FC = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold tracking-tight">إعدادات الإدارة</h1>
    <p className="text-muted-foreground">صفحة إعدادات الإدارة قيد التطوير...</p>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Protected User Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<DashboardPage />} />
                <Route path="new-order" element={<NewOrderPage />} />
                <Route path="orders" element={<OrdersPage />} />
                <Route path="add-funds" element={<AddFundsPage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>

              {/* Protected Admin Routes */}
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <DashboardLayout />
                  </AdminRoute>
                }
              >
                <Route index element={<AdminDashboardPage />} />
                <Route path="users" element={<AdminUsersPage />} />
                <Route path="services" element={<AdminServicesPage />} />
                <Route path="orders" element={<AdminOrdersPage />} />
                <Route path="settings" element={<AdminSettingsPage />} />
              </Route>

              {/* Default redirect */}
              <Route path="/" element={<Navigate to="/home" replace />} />
              
              {/* 404 Page */}
              <Route 
                path="*" 
                element={
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                      <p className="text-gray-600 mb-4">الصفحة غير موجودة</p>
                      <a href="/dashboard" className="text-blue-600 hover:underline">
                        العودة إلى لوحة التحكم
                      </a>
                    </div>
                  </div>
                } 
              />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;