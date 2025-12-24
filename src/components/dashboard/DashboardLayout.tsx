import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  History, 
  CreditCard, 
  Settings, 
  Users, 
  Package, 
  BarChart3,
  Menu,
  X,
  LogOut,
  User
} from 'lucide-react';
import { cn } from '../../lib/utils';

const navigation = [
  { name: 'لوحة التحكم', href: '/dashboard', icon: LayoutDashboard },
  { name: 'طلب جديد', href: '/dashboard/new-order', icon: ShoppingCart },
  { name: 'الطلبات', href: '/dashboard/orders', icon: History },
  { name: 'إضافة رصيد', href: '/dashboard/add-funds', icon: CreditCard },
  { name: 'الإعدادات', href: '/dashboard/settings', icon: Settings },
];

const adminNavigation = [
  { name: 'لوحة الإدارة', href: '/admin', icon: BarChart3 },
  { name: 'المستخدمون', href: '/admin/users', icon: Users },
  { name: 'الخدمات', href: '/admin/services', icon: Package },
  { name: 'الطلبات', href: '/admin/orders', icon: History },
  { name: 'الإعدادات', href: '/admin/settings', icon: Settings },
];

export const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const currentNavigation = user?.role === 'admin' ? adminNavigation : navigation;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </div>
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        sidebarOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <h1 className="text-xl font-bold text-gray-900">SMM Platform</h1>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* User info */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.username}
              </p>
              <p className="text-xs text-gray-500 truncate">
                الرصيد: ${user?.balance?.toFixed(2) || '0.00'}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-5 px-2 space-y-1">
          {currentNavigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
                  isActive
                    ? 'bg-blue-100 text-blue-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon
                  className={cn(
                    'ml-3 h-5 w-5 flex-shrink-0',
                    isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                  )}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Logout button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="ml-3 h-5 w-5" />
            تسجيل الخروج
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pr-64">
        {/* Top header */}
        <div className="sticky top-0 z-10 bg-white shadow-sm border-b">
          <div className="flex items-center justify-between h-16 px-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="hidden md:block text-sm text-gray-600">
                مرحباً، {user?.username}
              </div>
              <div className="text-sm font-medium text-gray-900">
                ${user?.balance?.toFixed(2) || '0.00'}
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};