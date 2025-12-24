import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { 
  Users, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  Settings,
  UserPlus,
  Package,
  FileText,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload,
  Search,
  Filter,
  Plus,
  Save,
  RefreshCw
} from 'lucide-react';

interface AdminStats {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  completedOrders: number;
  activeServices: number;
  todayRevenue: number;
  weeklyGrowth: number;
  monthlyGrowth: number;
}

interface User {
  id: string;
  username: string;
  email: string;
  balance: number;
  totalSpent: number;
  ordersCount: number;
  status: 'active' | 'inactive' | 'banned';
  lastLogin: string;
  joinDate: string;
}

interface Order {
  id: string;
  userId: string;
  username: string;
  serviceName: string;
  platform: string;
  quantity: number;
  cost: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

interface Service {
  id: string;
  name: string;
  platform: string;
  category: string;
  pricePer1000: number;
  minQuantity: number;
  maxQuantity: number;
  isActive: boolean;
  ordersCount: number;
  revenue: number;
}

export const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 12547,
    totalOrders: 89234,
    totalRevenue: 245678.50,
    pendingOrders: 1234,
    completedOrders: 86543,
    activeServices: 156,
    todayRevenue: 5420.75,
    weeklyGrowth: 12.5,
    monthlyGrowth: 8.3
  });

  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'orders' | 'services' | 'settings'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // بيانات تجريبية
  useEffect(() => {
    setUsers([
      {
        id: '1',
        username: 'ahmed_mohammed',
        email: 'ahmed@example.com',
        balance: 150.75,
        totalSpent: 1250.50,
        ordersCount: 23,
        status: 'active',
        lastLogin: '2025-12-25',
        joinDate: '2025-10-15'
      },
      {
        id: '2',
        username: 'fatima_ali',
        email: 'fatima@example.com',
        balance: 89.25,
        totalSpent: 567.00,
        ordersCount: 12,
        status: 'active',
        lastLogin: '2025-12-24',
        joinDate: '2025-11-20'
      },
      {
        id: '3',
        username: 'mohammed_xyz',
        email: 'mohammed@example.com',
        balance: 0,
        totalSpent: 0,
        ordersCount: 0,
        status: 'inactive',
        lastLogin: '2025-12-20',
        joinDate: '2025-12-01'
      }
    ]);

    setOrders([
      {
        id: '1',
        userId: '1',
        username: 'ahmed_mohammed',
        serviceName: 'متابعين إنستغرام عرب',
        platform: 'instagram',
        quantity: 1000,
        cost: 3.00,
        status: 'processing',
        createdAt: '2025-12-25 14:30:00',
        updatedAt: '2025-12-25 15:45:00'
      },
      {
        id: '2',
        userId: '2',
        username: 'fatima_ali',
        serviceName: 'مشاهدات يوتيوب',
        platform: 'youtube',
        quantity: 5000,
        cost: 5.00,
        status: 'completed',
        createdAt: '2025-12-25 10:15:00',
        updatedAt: '2025-12-25 11:30:00'
      },
      {
        id: '3',
        userId: '1',
        username: 'ahmed_mohammed',
        serviceName: 'إعجابات منشورات',
        platform: 'instagram',
        quantity: 500,
        cost: 0.75,
        status: 'pending',
        createdAt: '2025-12-25 16:00:00',
        updatedAt: '2025-12-25 16:00:00'
      }
    ]);

    setServices([
      {
        id: '1',
        name: 'متابعين إنستغرام عرب',
        platform: 'instagram',
        category: 'متابعين',
        pricePer1000: 3.00,
        minQuantity: 100,
        maxQuantity: 50000,
        isActive: true,
        ordersCount: 1234,
        revenue: 3702.00
      },
      {
        id: '2',
        name: 'مشاهدات يوتيوب',
        platform: 'youtube',
        category: 'مشاهدات',
        pricePer1000: 1.00,
        minQuantity: 100,
        maxQuantity: 500000,
        isActive: true,
        ordersCount: 2156,
        revenue: 2156.00
      }
    ]);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      pending: { variant: 'outline' as const, color: 'text-yellow-600' },
      processing: { variant: 'outline' as const, color: 'text-blue-600' },
      completed: { variant: 'secondary' as const, color: 'text-green-600' },
      cancelled: { variant: 'destructive' as const, color: 'text-red-600' },
      active: { variant: 'secondary' as const, color: 'text-green-600' },
      inactive: { variant: 'outline' as const, color: 'text-gray-600' },
      banned: { variant: 'destructive' as const, color: 'text-red-600' }
    };
    
    const config = variants[status] || variants.pending;
    return (
      <Badge variant={config.variant} className={config.color}>
        {status === 'pending' && 'في الانتظار'}
        {status === 'processing' && 'قيد المعالجة'}
        {status === 'completed' && 'مكتمل'}
        {status === 'cancelled' && 'ملغي'}
        {status === 'active' && 'نشط'}
        {status === 'inactive' && 'غير نشط'}
        {status === 'banned' && 'محظور'}
      </Badge>
    );
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المستخدمين</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.weeklyGrowth}% من الأسبوع الماضي
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الإيرادات</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.monthlyGrowth}% من الشهر الماضي
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الطلبات</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {stats.pendingOrders} طلب معلق
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إيرادات اليوم</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.todayRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              اليوم
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            إجراءات سريعة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <UserPlus className="h-6 w-6 mb-2" />
              إضافة مستخدم
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Package className="h-6 w-6 mb-2" />
              إضافة خدمة
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <FileText className="h-6 w-6 mb-2" />
              تقرير جديد
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Settings className="h-6 w-6 mb-2" />
              إعدادات النظام
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>آخر الطلبات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <ShoppingCart className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{order.serviceName}</p>
                      <p className="text-xs text-gray-500">{order.username}</p>
                    </div>
                  </div>
                  <div className="text-left">
                    {getStatusBadge(order.status)}
                    <p className="text-xs text-gray-500 mt-1">{formatCurrency(order.cost)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>مستخدمو الجدد</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users.slice(0, 5).map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{user.username}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-left">
                    {getStatusBadge(user.status)}
                    <p className="text-xs text-gray-500 mt-1">{formatCurrency(user.balance)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="البحث عن مستخدم..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">جميع الحالات</option>
            <option value="active">نشط</option>
            <option value="inactive">غير نشط</option>
            <option value="banned">محظور</option>
          </select>
          <Button>
            <Plus className="h-4 w-4 ml-2" />
            إضافة مستخدم
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>إدارة المستخدمين</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-right p-2">المستخدم</th>
                  <th className="text-right p-2">البريد الإلكتروني</th>
                  <th className="text-right p-2">الرصيد</th>
                  <th className="text-right p-2">إجمالي الإنفاق</th>
                  <th className="text-right p-2">الطلبات</th>
                  <th className="text-right p-2">الحالة</th>
                  <th className="text-right p-2">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">
                      <div className="font-medium">{user.username}</div>
                      <div className="text-sm text-gray-500">انضم في {user.joinDate}</div>
                    </td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">{formatCurrency(user.balance)}</td>
                    <td className="p-2">{formatCurrency(user.totalSpent)}</td>
                    <td className="p-2">{user.ordersCount}</td>
                    <td className="p-2">{getStatusBadge(user.status)}</td>
                    <td className="p-2">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>إدارة الطلبات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-right p-2">رقم الطلب</th>
                  <th className="text-right p-2">المستخدم</th>
                  <th className="text-right p-2">الخدمة</th>
                  <th className="text-right p-2">المنصة</th>
                  <th className="text-right p-2">الكمية</th>
                  <th className="text-right p-2">التكلفة</th>
                  <th className="text-right p-2">الحالة</th>
                  <th className="text-right p-2">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-mono text-sm">#{order.id}</td>
                    <td className="p-2">{order.username}</td>
                    <td className="p-2">{order.serviceName}</td>
                    <td className="p-2">{order.platform}</td>
                    <td className="p-2">{order.quantity.toLocaleString()}</td>
                    <td className="p-2">{formatCurrency(order.cost)}</td>
                    <td className="p-2">{getStatusBadge(order.status)}</td>
                    <td className="p-2">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderServices = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">إدارة الخدمات</h2>
        <Button>
          <Plus className="h-4 w-4 ml-2" />
          إضافة خدمة جديدة
        </Button>
      </div>

      <div className="grid gap-6">
        {services.map((service) => (
          <Card key={service.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{service.name}</CardTitle>
                  <CardDescription>
                    {service.platform} • {service.category}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge variant={service.isActive ? 'secondary' : 'destructive'}>
                    {service.isActive ? 'نشط' : 'غير نشط'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-500">السعر لكل 1000</p>
                  <p className="font-semibold">{formatCurrency(service.pricePer1000)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">الكمية (من - إلى)</p>
                  <p className="font-semibold">{service.minQuantity} - {service.maxQuantity.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">عدد الطلبات</p>
                  <p className="font-semibold">{service.ordersCount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">إجمالي الإيرادات</p>
                  <p className="font-semibold text-green-600">{formatCurrency(service.revenue)}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="outline">
                  <Edit className="h-4 w-4 ml-2" />
                  تعديل
                </Button>
                <Button size="sm" variant="outline">
                  <RefreshCw className="h-4 w-4 ml-2" />
                  تحديث الحالة
                </Button>
                <Button size="sm" variant="destructive">
                  <Trash2 className="h-4 w-4 ml-2" />
                  حذف
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>إعدادات النظام العامة</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="siteName">اسم الموقع</Label>
              <Input id="siteName" defaultValue="SocialPro" />
            </div>
            <div>
              <Label htmlFor="contactEmail">بريد التواصل</Label>
              <Input id="contactEmail" type="email" defaultValue="info@socialpro.com" />
            </div>
            <div>
              <Label htmlFor="minOrder">أقل مبلغ طلب</Label>
              <Input id="minOrder" type="number" defaultValue="1" />
            </div>
            <div>
              <Label htmlFor="currency">العملة</Label>
              <select id="currency" className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="USD">دولار أمريكي (USD)</option>
                <option value="SAR">ريال سعودي (SAR)</option>
                <option value="EUR">يورو (EUR)</option>
              </select>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button>
              <Save className="h-4 w-4 ml-2" />
              حفظ الإعدادات
            </Button>
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 ml-2" />
              إعادة تعيين
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>إعدادات الدفع</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-medium">PayPal</h4>
                <p className="text-sm text-gray-500">تفعيل الدفع عبر PayPal</p>
              </div>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-medium">Stripe</h4>
                <p className="text-sm text-gray-500">تفعيل الدفع عبر البطاقات</p>
              </div>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-medium">التحويل البنكي</h4>
                <p className="text-sm text-gray-500">تفعيل الدفع بالتحويل</p>
              </div>
              <input type="checkbox" className="rounded" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const tabs = [
    { id: 'overview', name: 'نظرة عامة', icon: BarChart3 },
    { id: 'users', name: 'المستخدمون', icon: Users },
    { id: 'orders', name: 'الطلبات', icon: ShoppingCart },
    { id: 'services', name: 'الخدمات', icon: Package },
    { id: 'settings', name: 'الإعدادات', icon: Settings },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">لوحة تحكم المطور</h1>
        <p className="text-muted-foreground">
          إدارة شاملة لمنصة SocialPro
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <nav className="flex space-x-8 space-x-reverse">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <IconComponent className="h-4 w-4" />
                {tab.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'users' && renderUsers()}
        {activeTab === 'orders' && renderOrders()}
        {activeTab === 'services' && renderServices()}
        {activeTab === 'settings' && renderSettings()}
      </div>
    </div>
  );
};