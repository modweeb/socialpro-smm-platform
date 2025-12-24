import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { servicesApi, ordersApi, formatCurrency } from '../utils/api';
import { Service } from '../types';
import { ShoppingCart, Calculator, AlertCircle, Instagram, Users, Zap } from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert';

interface ServiceWithCategory extends Service {
  categoryName: string;
}

export const NewOrderPage: React.FC = () => {
  const [services, setServices] = useState<ServiceWithCategory[]>([]);
  const [selectedService, setSelectedService] = useState<ServiceWithCategory | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [link, setLink] = useState('');
  const [instagramUsername, setInstagramUsername] = useState('');
  const [quantity, setQuantity] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [orderType, setOrderType] = useState<'instagram' | 'other'>('instagram');

  const categories = [...new Set(services.map(service => service.categoryName))];
  
  // تصفية الخدمات للخدمات الأخرى فقط
  const filteredServices = selectedCategory 
    ? services.filter(service => service.categoryName === selectedCategory)
    : services;

  // أرقام المتابعين السريعة
  const quickFollowerCounts = [100, 500, 1000, 2500, 5000, 10000, 25000, 50000];

  // أسعار إنستغرام المتابعة
  const instagramPricing = {
    followers: { pricePerFollower: 0.003, min: 100, max: 100000 },
    likes: { pricePerLike: 0.002, min: 50, max: 10000 },
    views: { pricePerView: 0.001, min: 100, max: 100000 }
  };

  // التحقق من صحة معرف إنستغرام
  const validateInstagramUsername = (username: string): boolean => {
    const cleanUsername = username.replace('@', '').trim();
    const regex = /^[a-zA-Z0-9._]{1,30}$/;
    return regex.test(cleanUsername) && cleanUsername.length >= 2;
  };

  // إنشاء رابط إنستغرام من المعرف
  const createInstagramUrl = (username: string): string => {
    const cleanUsername = username.replace('@', '').trim();
    return `https://instagram.com/${cleanUsername}`;
  };

  // حساب تكلفة متابعين إنستغرام
  const calculateInstagramCost = (count: number, type: 'followers' | 'likes' | 'views' = 'followers'): number => {
    switch (type) {
      case 'followers':
        return count * instagramPricing.followers.pricePerFollower;
      case 'likes':
        return count * instagramPricing.likes.pricePerLike;
      case 'views':
        return count * instagramPricing.views.pricePerView;
      default:
        return count * instagramPricing.followers.pricePerFollower;
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    if (orderType === 'instagram' && quantity > 0) {
      const cost = calculateInstagramCost(quantity, 'followers');
      setTotalCost(cost);
    } else if (selectedService && quantity > 0) {
      const cost = (selectedService.pricePer1000 * quantity) / 1000;
      setTotalCost(cost);
    } else {
      setTotalCost(0);
    }
  }, [selectedService, quantity, orderType]);

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      const response = await servicesApi.getAll();
      if (response.data.success) {
        const servicesWithCategory = response.data.data.map((service: Service) => ({
          ...service,
          categoryName: service.category || 'عام'
        }));
        setServices(servicesWithCategory);
      }
    } catch (error) {
      setError('فشل في تحميل الخدمات');
    } finally {
      setIsLoading(false);
    }
  };

  const handleServiceSelect = (service: ServiceWithCategory) => {
    setSelectedService(service);
    setQuantity(service.minQuantity);
    setError('');
    setSuccess('');
  };

  const handleQuickFollowerSelect = (count: number) => {
    setQuantity(count);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      let finalLink = link.trim();
      let serviceId = '';
      let orderData: any = {};

      if (orderType === 'instagram') {
        if (!validateInstagramUsername(instagramUsername)) {
          setError('يرجى إدخال معرف إنستغرام صحيح');
          setIsSubmitting(false);
          return;
        }
        finalLink = createInstagramUrl(instagramUsername);
        serviceId = 'instagram-followers-fast';
        orderData = {
          serviceId,
          link: finalLink,
          quantity,
          type: 'instagram',
          username: instagramUsername.replace('@', '').trim()
        };
      } else {
        if (!selectedService || !finalLink || quantity < selectedService.minQuantity) {
          setError('يرجى التحقق من جميع البيانات');
          setIsSubmitting(false);
          return;
        }
        serviceId = selectedService.id;
        orderData = {
          serviceId,
          link: finalLink,
          quantity
        };
      }

      const response = await ordersApi.create(orderData);

      if (response.data.success) {
        setSuccess('تم إنشاء الطلب بنجاح! سيتم معالجة طلبك خلال دقائق.');
        // Reset form
        setLink('');
        setInstagramUsername('');
        setQuantity(0);
        setSelectedService(null);
        setSelectedCategory('');
        setOrderType('instagram');
      } else {
        setError(response.data.message || 'فشل في إنشاء الطلب');
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'حدث خطأ أثناء إنشاء الطلب');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded w-32"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-10 bg-gray-200 rounded"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded w-24"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">طلب جديد</h1>
        <p className="text-muted-foreground">
          اختر نوع الخدمة وأدخل بيانات الطلب
        </p>
      </div>

      {/* نوع الطلب */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setOrderType('instagram')}
              className={`p-4 rounded-lg border-2 transition-all ${
                orderType === 'instagram'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <Instagram className="h-8 w-8 text-pink-600" />
                <span className="font-medium">إنستغرام</span>
                <span className="text-sm text-gray-500">متابعين ومشاهدات</span>
              </div>
            </button>
            
            <button
              type="button"
              onClick={() => setOrderType('other')}
              className={`p-4 rounded-lg border-2 transition-all ${
                orderType === 'other'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <Zap className="h-8 w-8 text-blue-600" />
                <span className="font-medium">خدمات أخرى</span>
                <span className="text-sm text-gray-500">يوتيوب وتيك توك</span>
              </div>
            </button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Order Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              تفاصيل الطلب
            </CardTitle>
            <CardDescription>
              {orderType === 'instagram' ? 'أدخل معرف إنستغرام وعدد المتابعين' : 'اختر الخدمة وأدخل الرابط والكمية'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              {orderType === 'instagram' ? (
                <>
                  {/* Instagram Username */}
                  <div className="space-y-2">
                    <Label htmlFor="instagramUsername">معرف إنستغرام</Label>
                    <Input
                      id="instagramUsername"
                      type="text"
                      value={instagramUsername}
                      onChange={(e) => setInstagramUsername(e.target.value)}
                      placeholder="@username"
                      dir="ltr"
                      className="text-right"
                    />
                    <p className="text-sm text-gray-500">
                      أدخل معرف الحساب بدون @ (مثال: username)
                    </p>
                  </div>

                  {/* Quick Follower Selection */}
                  <div className="space-y-2">
                    <Label>عدد المتابعين السريع</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {quickFollowerCounts.map(count => (
                        <button
                          key={count}
                          type="button"
                          onClick={() => handleQuickFollowerSelect(count)}
                          className={`p-2 text-sm rounded-md border transition-colors ${
                            quantity === count
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {count.toLocaleString()}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Quantity */}
                  <div className="space-y-2">
                    <Label htmlFor="quantity">عدد مخصص</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="100"
                      max="100000"
                      value={quantity || ''}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      placeholder="أدخل العدد المطلوب"
                      dir="ltr"
                    />
                    <p className="text-sm text-gray-500">
                      الحد الأدنى: 100 | الحد الأقصى: 100,000
                    </p>
                  </div>
                </>
              ) : (
                <>
                  {/* Category Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="category">فئة الخدمة</Label>
                    <select
                      id="category"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      dir="rtl"
                    >
                      <option value="">جميع الفئات</option>
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Service Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="service">الخدمة</Label>
                    <select
                      id="service"
                      value={selectedService?.id || ''}
                      onChange={(e) => {
                        const service = services.find(s => s.id === e.target.value);
                        if (service) {
                          handleServiceSelect(service as ServiceWithCategory);
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      dir="rtl"
                    >
                      <option value="">اختر الخدمة</option>
                      {filteredServices.map(service => (
                        <option key={service.id} value={service.id}>
                          {service.name} - {formatCurrency(service.pricePer1000)} / 1000
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Link Input */}
                  <div className="space-y-2">
                    <Label htmlFor="link">الرابط</Label>
                    <Input
                      id="link"
                      type="url"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      placeholder="https://platform.com/username"
                      dir="ltr"
                      required
                    />
                  </div>

                  {/* Quantity Input */}
                  <div className="space-y-2">
                    <Label htmlFor="quantity">الكمية</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min={selectedService?.minQuantity || 1}
                      max={selectedService?.maxQuantity || 100000}
                      value={quantity || ''}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      placeholder={`الحد الأدنى: ${selectedService?.minQuantity || 1}`}
                      required
                      dir="ltr"
                    />
                    {selectedService && (
                      <p className="text-sm text-gray-500">
                        الحد الأدنى: {selectedService.minQuantity} | الحد الأقصى: {selectedService.maxQuantity}
                      </p>
                    )}
                  </div>
                </>
              )}

              {/* Cost Calculation */}
              {totalCost > 0 && (
                <div className="p-4 bg-blue-50 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <Calculator className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-900">تكلفة الطلب</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-900">
                    {formatCurrency(totalCost)}
                  </p>
                  <p className="text-sm text-blue-700">
                    {quantity.toLocaleString()} × {formatCurrency(orderType === 'instagram' ? instagramPricing.followers.pricePerFollower : (selectedService?.pricePer1000 || 0) / 1000)}
                  </p>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={
                  (orderType === 'instagram' && (!instagramUsername.trim() || quantity < 100)) ||
                  (orderType === 'other' && (!selectedService || !link.trim() || quantity < (selectedService?.minQuantity || 1))) ||
                  isSubmitting
                }
              >
                {isSubmitting ? 'جاري الإرسال...' : 'إنشاء الطلب'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Service Details */}
        <Card>
          <CardHeader>
            <CardTitle>معلومات الخدمة</CardTitle>
            <CardDescription>
              تفاصيل الخدمة المختارة
            </CardDescription>
          </CardHeader>
          <CardContent>
            {orderType === 'instagram' ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <Instagram className="h-8 w-8 text-pink-600" />
                  <div>
                    <h3 className="font-semibold text-lg">متابعين إنستغرام</h3>
                    <p className="text-sm text-gray-600">متابعين عرب حقيقيين</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">السعر</p>
                    <p className="text-lg font-semibold">
                      {formatCurrency(instagramPricing.followers.pricePerFollower)} / متابع
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">السرعة</p>
                    <p className="text-lg font-semibold">100-500/يوم</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">مميزات الخدمة</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• متابعين حقيقيين وعرب</li>
                    <li>• لا توجد انقطاعات</li>
                    <li>• ضمان إعادة التعبئة</li>
                    <li>• دعم فني 24/7</li>
                  </ul>
                </div>

                {instagramUsername && (
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>الحساب المختار:</strong> @{instagramUsername.replace('@', '')}
                    </p>
                  </div>
                )}
              </div>
            ) : selectedService ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{selectedService.name}</h3>
                  <p className="text-sm text-gray-600">{selectedService.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">السعر</p>
                    <p className="text-lg font-semibold">
                      {formatCurrency(selectedService.pricePer1000)} / 1000
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">المنصة</p>
                    <p className="text-lg font-semibold capitalize">{selectedService.platform}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">المتطلبات</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• الحد الأدنى للكمية: {selectedService.minQuantity.toLocaleString()}</li>
                    <li>• الحد الأقصى للكمية: {selectedService.maxQuantity.toLocaleString()}</li>
                    <li>• يجب أن يكون الحساب عام</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">اختر خدمة لعرض التفاصيل</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Available Services */}
      <Card>
        <CardHeader>
          <CardTitle>الخدمات المتاحة</CardTitle>
          <CardDescription>
            جميع الخدمات المتوفرة في المنصة
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredServices.slice(0, 6).map(service => (
              <div 
                key={service.id}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleServiceSelect(service)}
              >
                <h4 className="font-medium mb-2">{service.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{service.categoryName}</p>
                <p className="text-sm font-semibold text-blue-600">
                  {formatCurrency(service.pricePer1000)} / 1000
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};