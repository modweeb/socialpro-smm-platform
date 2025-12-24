import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { 
  Instagram, 
  Users, 
  TrendingUp, 
  Shield, 
  Clock, 
  Star,
  CheckCircle,
  Zap,
  Globe,
  DollarSign,
  Award,
  ArrowRight,
  PlayCircle
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const stats = [
    { label: 'عميل راضٍ', value: '50,000+', icon: Users },
    { label: 'طلب مكتمل', value: '1.2M+', icon: CheckCircle },
    { label: 'خدمة متنوعة', value: '500+', icon: Zap },
    { label: 'معدل نجاح', value: '99.8%', icon: TrendingUp },
  ];

  const features = [
    {
      icon: Instagram,
      title: 'متابعين إنستغرام',
      description: 'متابعين حقيقيين وعرب بجودة عالية وضمان إعادة التعبئة',
      price: 'من $0.003 لكل متابع',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    },
    {
      icon: Globe,
      title: 'مشاهدات يوتيوب',
      description: 'مشاهدات حقيقية لمقاطع الفيديو الخاصة بك',
      price: 'من $0.001 لكل مشاهدة',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      icon: TrendingUp,
      title: 'متابعين تيك توك',
      description: 'متابعين نشيطين لتعزيز المحتوى الخاص بك',
      price: 'من $0.002 لكل متابع',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Star,
      title: 'إعجابات وسائل التواصل',
      description: 'إعجابات حقيقية لجميع منصات التواصل الاجتماعي',
      price: 'من $0.001 لكل إعجاب',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Shield,
      title: 'ضمان الجودة',
      description: 'ضمان إعادة التعبئة والتسليم في الوقت المحدد',
      price: 'ضمان شامل',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Clock,
      title: 'تسليم سريع',
      description: 'تسليم سريع ومنتظم لجميع الطلبات',
      price: 'بدء من 24 ساعة',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const testimonials = [
    {
      name: 'أحمد محمد',
      role: 'مؤثر على إنستغرام',
      content: 'خدمة ممتازة ومتابعيها حقيقيين. زاد متابعيني من 10K إلى 50K في شهرين فقط!',
      rating: 5,
      avatar: '👨‍💼'
    },
    {
      name: 'فاطمة العلي',
      role: 'صاحبة قناة يوتيوب',
      content: 'مشاهدات حقيقية وأداء ممتاز. أوصي بها بشدة لكل من يريد نمو حقيقي.',
      rating: 5,
      avatar: '👩‍💼'
    },
    {
      name: 'محمد الخالدي',
      role: 'مدير تسويق',
      content: 'أسعار تنافسية وخدمة عملاء ممتازة. استخدمها لجميع عملائي.',
      rating: 5,
      avatar: '👨‍💻'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">SocialPro</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
              <Link to="#services" className="text-gray-600 hover:text-blue-600 transition-colors">الخدمات</Link>
              <Link to="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">الأسعار</Link>
              <Link to="#about" className="text-gray-600 hover:text-blue-600 transition-colors">من نحن</Link>
              <Link to="/login" className="text-gray-600 hover:text-blue-600 transition-colors">تسجيل الدخول</Link>
            </nav>

            <div className="flex items-center space-x-4 space-x-reverse">
              <Link to="/login">
                <Button variant="outline">تسجيل الدخول</Button>
              </Link>
              <Link to="/register">
                <Button>إنشاء حساب مجاني</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              احصل على <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">متابعين حقيقيين</span> 
              <br />لحسابك على وسائل التواصل
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              منصة احترافية لزيادة متابعين ومشاهدات وإنجازات وسائل التواصل الاجتماعي 
              <br />
              بأسعار تنافسية وضمان الجودة والسرعة
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link to="/register">
                <Button size="lg" className="text-lg px-8 py-4">
                  ابدأ الآن مجاناً
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                <PlayCircle className="ml-2 h-5 w-5" />
                شاهد العرض التوضيحي
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md mb-3">
                    <stat.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">خدماتنا المتميزة</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              نقدم مجموعة شاملة من خدمات التسويق الرقمي لجميع منصات التواصل الاجتماعي
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                <CardHeader>
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${feature.bgColor} mb-4`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{feature.price}</span>
                    <Button size="sm">اطلب الآن</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">أسعار شفافة ومتنافسة</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              أسعارنا مصممة لتناسب جميع الميزانيات مع ضمان أعلى جودة خدمة
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="relative">
              <CardHeader>
                <CardTitle className="text-center">الأساسي</CardTitle>
                <div className="text-center">
                  <span className="text-4xl font-bold">$10</span>
                  <span className="text-gray-600">/شهرياً</span>
                </div>
                <CardDescription className="text-center">للمستخدمين الجدد</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                    <span>حتى 1,000 متابع</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                    <span>دعم فني أساسي</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                    <span>تتبع الطلبات</span>
                  </div>
                </div>
                <Button className="w-full">اختر الخطة</Button>
              </CardContent>
            </Card>

            <Card className="relative border-2 border-blue-500">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  الأكثر شعبية
                </span>
              </div>
              <CardHeader>
                <CardTitle className="text-center">المتقدم</CardTitle>
                <div className="text-center">
                  <span className="text-4xl font-bold">$25</span>
                  <span className="text-gray-600">/شهرياً</span>
                </div>
                <CardDescription className="text-center">للمستخدمين المتقدمين</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                    <span>حتى 10,000 متابع</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                    <span>دعم فني متقدم</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                    <span>إحصائيات مفصلة</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                    <span>ضمان إعادة التعبئة</span>
                  </div>
                </div>
                <Button className="w-full">اختر الخطة</Button>
              </CardContent>
            </Card>

            <Card className="relative">
              <CardHeader>
                <CardTitle className="text-center">المحترف</CardTitle>
                <div className="text-center">
                  <span className="text-4xl font-bold">$50</span>
                  <span className="text-gray-600">/شهرياً</span>
                </div>
                <CardDescription className="text-center">للمحترفين والوكالات</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                    <span>متابعين غير محدود</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                    <span>دعم فني 24/7</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                    <span>حساب مخصص</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                    <span>API للمطورين</span>
                  </div>
                </div>
                <Button className="w-full">اتصل بنا</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">ماذا يقول عملاؤنا</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              آراء حقيقية من عملائنا الكرام حول تجربتهم معنا
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-4">{testimonial.avatar}</div>
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            ابدأ رحلتك مع SocialPro اليوم
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            انضم إلى آلاف العملاء الراضين واحصل على نمو حقيقي لحساباتك
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                إنشاء حساب مجاني
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-blue-600">
                تسجيل الدخول
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 space-x-reverse mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold">SocialPro</span>
              </div>
              <p className="text-gray-400">
                منصة احترافية لخدمات التسويق الرقمي ووسائل التواصل الاجتماعي
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">الخدمات</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="#" className="hover:text-white">متابعين إنستغرام</Link></li>
                <li><Link to="#" className="hover:text-white">مشاهدات يوتيوب</Link></li>
                <li><Link to="#" className="hover:text-white">متابعين تيك توك</Link></li>
                <li><Link to="#" className="hover:text-white">إعجابات</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">الشركة</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="#" className="hover:text-white">من نحن</Link></li>
                <li><Link to="#" className="hover:text-white">شروط الاستخدام</Link></li>
                <li><Link to="#" className="hover:text-white">سياسة الخصوصية</Link></li>
                <li><Link to="#" className="hover:text-white">اتصل بنا</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">الدعم</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="#" className="hover:text-white">مركز المساعدة</Link></li>
                <li><Link to="#" className="hover:text-white">التذاكر</Link></li>
                <li><Link to="#" className="hover:text-white">الدردشة المباشرة</Link></li>
                <li><Link to="#" className="hover:text-white">الأسئلة الشائعة</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SocialPro. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};