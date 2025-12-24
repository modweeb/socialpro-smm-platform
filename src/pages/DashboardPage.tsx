import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { dashboardApi, formatCurrency } from '../utils/api';
import { DashboardStats } from '../types';
import { 
  ShoppingCart, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  TrendingUp,
  Users
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await dashboardApi.getStats();
        if (response.data.success) {
          setStats(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
                <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded animate-pulse w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const cards = [
    {
      title: 'إجمالي الطلبات',
      value: stats?.totalOrders || 0,
      icon: ShoppingCart,
      description: 'جميع الطلبات المرسلة',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'إجمالي الإنفاق',
      value: formatCurrency(stats?.totalSpent || 0),
      icon: DollarSign,
      description: 'إجمالي المبلغ المنفق',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'الطلبات النشطة',
      value: stats?.activeOrders || 0,
      icon: Clock,
      description: 'طلبات قيد المعالجة',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'الطلبات المكتملة',
      value: stats?.completedOrders || 0,
      icon: CheckCircle,
      description: 'طلبات مكتملة بنجاح',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">لوحة التحكم</h1>
        <p className="text-muted-foreground">
          مرحباً بك في لوحة تحكم منصة SMM
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${card.bgColor}`}>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              إجراءات سريعة
            </CardTitle>
            <CardDescription>
              أكثر العمليات استخداماً
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full text-right p-3 rounded-lg border hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <ShoppingCart className="h-5 w-5 text-blue-600" />
                <span>طلب جديد</span>
              </div>
            </button>
            <button className="w-full text-right p-3 rounded-lg border hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-green-600" />
                <span>إضافة رصيد</span>
              </div>
            </button>
            <button className="w-full text-right p-3 rounded-lg border hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-purple-600" />
                <span>عرض الطلبات</span>
              </div>
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>آخر النشاطات</CardTitle>
            <CardDescription>
              آخر العمليات التي قمت بها
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">طلب جديد تم إنشاؤه</p>
                  <p className="text-xs text-gray-500">منذ ساعتين</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">تم إضافة رصيد</p>
                  <p className="text-xs text-gray-500">أمس</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">طلب قيد المعالجة</p>
                  <p className="text-xs text-gray-500">منذ 3 أيام</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};