import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { servicesApi, formatCurrency } from '../utils/api';
import { Service } from '../types';
import { 
  Instagram, 
  Youtube, 
  Twitter, 
  Facebook, 
  Search, 
  Filter,
  Star,
  TrendingUp,
  Clock,
  Users,
  Eye,
  Heart,
  Repeat2,
  MessageCircle
} from 'lucide-react';

interface ServiceWithCategory extends Service {
  categoryName: string;
}

export const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<ServiceWithCategory[]>([]);
  const [filteredServices, setFilteredServices] = useState<ServiceWithCategory[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  // منصة سريعة للتطوير
  const mockServices: ServiceWithCategory[] = [
    {
      id: '1',
      name: 'متابعين إنستغرام عرب',
      category: 'متابعين',
      categoryName: 'متابعين',
      platform: 'instagram',
      pricePer1000: 3.00,
      minQuantity: 100,
      maxQuantity: 50000,
      description: 'متابعين حقيقيين وعرب بجودة عالية وضمان إعادة التعبئة',
      provider: 'FastProvider',
      isActive: true
    },
    {
      id: '2',
      name: 'متابعين إنستغرام أجانب',
      category: 'متابعين',
      categoryName: 'متابعين',
      platform: 'instagram',
      pricePer1000: 2.50,
      minQuantity: 100,
      maxQuantity: 100000,
      description: 'متابعين أجانب حقيقيين لضمان النمو الطبيعي',
      provider: 'GlobalProvider',
      isActive: true
    },
    {
      id: '3',
      name: 'إعجابات منشورات إنستغرام',
      category: 'تفاعل',
      categoryName: 'تفاعل',
      platform: 'instagram',
      pricePer1000: 1.50,
      minQuantity: 50,
      maxQuantity: 20000,
      description: 'إعجابات حقيقية لمنشورات إنستغرام',
      provider: 'EngageProvider',
      isActive: true
    },
    {
      id: '4',
      name: 'مشاهدات مقاطع يوتيوب',
      category: 'مشاهدات',
      categoryName: 'مشاهدات',
      platform: 'youtube',
      pricePer1000: 1.00,
      minQuantity: 100,
      maxQuantity: 500000,
      description: 'مشاهدات حقيقية لمقاطع يوتيوب لتحسين الترتيب',
      provider: 'YTProvider',
      isActive: true
    },
    {
      id: '5',
      name: 'اشتراكات يوتيوب',
      category: 'اشتراكات',
      categoryName: 'اشتراكات',
      platform: 'youtube',
      pricePer1000: 5.00,
      minQuantity: 50,
      maxQuantity: 10000,
      description: 'مشتركين حقيقيين ومتفاعلين لقناتك',
      provider: 'YTProvider',
      isActive: true
    },
    {
      id: '6',
      name: 'متابعين تيك توك',
      category: 'متابعين',
      categoryName: 'متابعين',
      platform: 'tiktok',
      pricePer1000: 2.00,
      minQuantity: 100,
      maxQuantity: 50000,
      description: 'متابعين نشطين على تيك توك',
      provider: 'TTProvider',
      isActive: true
    },
    {
      id: '7',
      name: 'متابعين تويتر',
      category: 'متابعين',
      categoryName: 'متابعين',
      platform: 'twitter',
      pricePer1000: 4.00,
      minQuantity: 50,
      maxQuantity: 25000,
      description: 'متابعين حقيقيين ومؤثرين على تويتر',
      provider: 'TwitterProvider',
      isActive: true
    },
    {
      id: '8',
      name: 'إعجابات فيسبوك',
      category: 'تفاعل',
      categoryName: 'تفاعل',
      platform: 'facebook',
      pricePer1000: 2.50,
      minQuantity: 100,
      maxQuantity: 15000,
      description: 'إعجابات حقيقية لصفحات ومنشورات فيسبوك',
      provider: 'FBProvider',
      isActive: true
    }
  ];

  useEffect(() => {
    // محاكاة تحميل الخدمات
    setTimeout(() => {
      setServices(mockServices);
      setFilteredServices(mockServices);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = services;

    // البحث
    if (searchTerm) {
      filtered = filtered.filter(service => 
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // تصفية المنصة
    if (selectedPlatform !== 'all') {
      filtered = filtered.filter(service => service.platform === selectedPlatform);
    }

    // تصفية الفئة
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(service => service.categoryName === selectedCategory);
    }

    setFilteredServices(filtered);
  }, [searchTerm, selectedPlatform, selectedCategory, services]);

  const platforms = [
    { id: 'all', name: 'جميع المنصات', icon: Filter },
    { id: 'instagram', name: 'إنستغرام', icon: Instagram, color: 'text-pink-600' },
    { id: 'youtube', name: 'يوتيوب', icon: Youtube, color: 'text-red-600' },
    { id: 'tiktok', name: 'تيك توك', icon: TrendingUp, color: 'text-black' },
    { id: 'twitter', name: 'تويتر', icon: Twitter, color: 'text-blue-500' },
    { id: 'facebook', name: 'فيسبوك', icon: Facebook, color: 'text-blue-700' }
  ];

  const categories = [...new Set(services.map(service => service.categoryName))];

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return Instagram;
      case 'youtube':
        return Youtube;
      case 'tiktok':
        return TrendingUp;
      case 'twitter':
        return Twitter;
      case 'facebook':
        return Facebook;
      default:
        return Users;
    }
  };

  const getServiceIcon = (serviceName: string) => {
    if (serviceName.includes('متابعين')) {
      return Users;
    } else if (serviceName.includes('مشاهدات')) {
      return Eye;
    } else if (serviceName.includes('إعجابات')) {
      return Heart;
    } else if (serviceName.includes('اشتراكات')) {
      return TrendingUp;
    } else {
      return Star;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto"></div>
            <div className="grid md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">خدماتنا المتميزة</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            اختر من مجموعة واسعة من خدمات التسويق الرقمي لجميع منصات التواصل الاجتماعي
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="ابحث عن خدمة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Platform Filter */}
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">جميع المنصات</option>
              <option value="instagram">إنستغرام</option>
              <option value="youtube">يوتيوب</option>
              <option value="tiktok">تيك توك</option>
              <option value="twitter">تويتر</option>
              <option value="facebook">فيسبوك</option>
            </select>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">جميع الفئات</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Platform Quick Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {platforms.map((platform) => {
            const IconComponent = platform.icon;
            return (
              <button
                key={platform.id}
                onClick={() => setSelectedPlatform(platform.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                  selectedPlatform === platform.id
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                }`}
              >
                <IconComponent className={`h-4 w-4 ${platform.color || ''}`} />
                <span className="text-sm">{platform.name}</span>
              </button>
            );
          })}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            عرض {filteredServices.length} من {services.length} خدمة
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const PlatformIcon = getPlatformIcon(service.platform);
            const ServiceIcon = getServiceIcon(service.name);
            
            return (
              <Card key={service.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <PlatformIcon className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{service.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary">{service.categoryName}</Badge>
                          <Badge variant="outline">{service.platform}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">
                        {formatCurrency(service.pricePer1000)}
                      </div>
                      <div className="text-sm text-gray-500">لكل 1000</div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <CardDescription className="mb-4 text-gray-600">
                    {service.description}
                  </CardDescription>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">الحد الأدنى:</span>
                      <span className="font-medium">{service.minQuantity.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">الحد الأقصى:</span>
                      <span className="font-medium">{service.maxQuantity.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">مزود الخدمة:</span>
                      <span className="font-medium">{service.provider}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">(4.9) - 1,200+ طلب</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button className="flex-1">
                      <ServiceIcon className="h-4 w-4 ml-2" />
                      طلب الخدمة
                    </Button>
                    <Button variant="outline" size="sm">
                      تفاصيل
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* No Results */}
        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">لا توجد نتائج</h3>
            <p className="text-gray-600 mb-4">
              لم نجد أي خدمات تطابق معايير البحث المحددة
            </p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setSelectedPlatform('all');
                setSelectedCategory('all');
              }}
            >
              إعادة تعيين البحث
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">لا تجد ما تبحث عنه؟</h2>
          <p className="text-blue-100 mb-6">
            تواصل معنا وسنقوم بتخصيص خدمة خاصة لاحتياجاتك
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              تواصل معنا
            </Button>
            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-blue-600">
              اطلب خدمة مخصصة
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};