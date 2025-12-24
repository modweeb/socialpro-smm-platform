import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  HelpCircle,
  Send,
  Search,
  Book,
  Video,
  Headphones,
  FileText,
  Users,
  Zap,
  Truck,
  ShoppingCart,
  Star
} from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface Ticket {
  id: string;
  subject: string;
  status: 'open' | 'pending' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  lastReply: string;
}

export const SupportPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showTicketForm, setShowTicketForm] = useState(false);

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'كم من الوقت يستغرق تسليم المتابعين؟',
      answer: 'عادة ما يبدأ التسليم خلال 1-24 ساعة من تقديم الطلب، حسب عدد المتابعين المطلوب ونوع الخدمة.',
      category: 'delivery'
    },
    {
      id: '2',
      question: 'هل يمكنني إلغاء الطلب بعد إرساله؟',
      answer: 'يمكنك إلغاء الطلب فقط إذا كان لا يزال في حالة "في الانتظار". بمجرد البدء في المعالجة، لا يمكن الإلغاء.',
      category: 'orders'
    },
    {
      id: '3',
      question: 'هل المتابعين حقيقيون أم وهميون؟',
      answer: 'نحن نقدم متابعين حقيقيين ونشطين لضمان أفضل النتائج. جميع متابعينا يخضعون لفحص جودة صارم.',
      category: 'quality'
    },
    {
      id: '4',
      question: 'ماذا لو لم أستلم المتابعين في الوقت المحدد؟',
      answer: 'إذا لم تستلم المتابعين في الوقت المحدد، يرجى التواصل معنا وسنقوم بإعادة إرسال الطلب أو استرداد المبلغ.',
      category: 'delivery'
    },
    {
      id: '5',
      question: 'هل هناك حد أدنى أو أقصى للطلب؟',
      answer: 'نعم، لكل خدمة حد أدنى وحد أقصى مختلف. يمكنكم رؤية هذه الحدود في صفحة الخدمات.',
      category: 'orders'
    },
    {
      id: '6',
      question: 'كيف يمكنني تتبع طلبي؟',
      answer: 'يمكنك تتبع طلبك من لوحة تحكمك > الطلبات، حيث ستجد حالة الطلب في الوقت الفعلي.',
      category: 'tracking'
    }
  ];

  const tickets: Ticket[] = [
    {
      id: 'TK001',
      subject: 'تأخير في تسليم المتابعين',
      status: 'open',
      priority: 'high',
      createdAt: '2025-12-25',
      updatedAt: '2025-12-25',
      lastReply: 'فريق الدعم'
    },
    {
      id: 'TK002',
      subject: 'مشكلة في شحن الرصيد',
      status: 'pending',
      priority: 'medium',
      createdAt: '2025-12-24',
      updatedAt: '2025-12-24',
      lastReply: 'أحمد'
    }
  ];

  const contactMethods = [
    {
      icon: MessageCircle,
      title: 'الدردشة المباشرة',
      description: 'متاح 24/7',
      action: 'ابدأ المحادثة',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Mail,
      title: 'البريد الإلكتروني',
      description: 'support@socialpro.com',
      action: 'أرسل رسالة',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Phone,
      title: 'الهاتف',
      description: '+966 50 123 4567',
      action: 'اتصل الآن',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const categories = [
    { id: 'all', name: 'جميع الأسئلة', icon: HelpCircle },
    { id: 'delivery', name: 'التسليم', icon: Truck },
    { id: 'orders', name: 'الطلبات', icon: ShoppingCart },
    { id: 'quality', name: 'الجودة', icon: Star },
    { id: 'tracking', name: 'التتبع', icon: Search }
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      open: { variant: 'destructive' as const, text: 'مفتوح' },
      pending: { variant: 'outline' as const, text: 'معلق' },
      resolved: { variant: 'secondary' as const, text: 'محلول' },
      closed: { variant: 'secondary' as const, text: 'مغلق' }
    };
    
    const config = variants[status] || variants.open;
    return (
      <Badge variant={config.variant}>
        {config.text}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const colors: Record<string, string> = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };
    
    const texts: Record<string, string> = {
      low: 'منخفض',
      medium: 'متوسط',
      high: 'عالي'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[priority]}`}>
        {texts[priority]}
      </span>
    );
  };

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">مركز الدعم</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            نحن هنا لمساعدتك في أي وقت. ابحث في الأسئلة الشائعة أو تواصل معنا مباشرة
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <CardHeader>
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${method.bgColor} mb-4`}>
                    <IconComponent className={`h-6 w-6 ${method.color}`} />
                  </div>
                  <CardTitle className="text-lg">{method.title}</CardTitle>
                  <CardDescription>{method.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Send className="h-4 w-4 ml-2" />
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book className="h-5 w-5" />
                  الأسئلة الشائعة
                </CardTitle>
                <CardDescription>
                  ابحث في أسئلتنا الشائعة للحصول على إجابات سريعة
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Search */}
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="ابحث في الأسئلة..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {categories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-full border transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-blue-500 text-white border-blue-500'
                            : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <IconComponent className="h-4 w-4" />
                        <span className="text-sm">{category.name}</span>
                      </button>
                    );
                  })}
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                  {filteredFAQs.map((faq) => (
                    <div key={faq.id} className="border rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>

                {filteredFAQs.length === 0 && (
                  <div className="text-center py-8">
                    <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">لم نجد أي أسئلة تطابق بحثك</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Tickets and Quick Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  إجراءات سريعة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start"
                  onClick={() => setShowTicketForm(true)}
                >
                  <FileText className="h-4 w-4 ml-2" />
                  إنشاء تذكرة جديدة
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Video className="h-4 w-4 ml-2" />
                  عرض الدروس التعليمية
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 ml-2" />
                  مجتمع المستخدمين
                </Button>
              </CardContent>
            </Card>

            {/* Recent Tickets */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  تذاكر الدعم
                </CardTitle>
                <CardDescription>
                  تذاكر الدعم الحديثة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tickets.map((ticket) => (
                    <div key={ticket.id} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h5 className="font-medium text-sm">{ticket.subject}</h5>
                        <div className="flex gap-2">
                          {getStatusBadge(ticket.status)}
                          {getPriorityBadge(ticket.priority)}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">
                        #{ticket.id} • آخر رد: {ticket.lastReply}
                      </p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  عرض جميع التذاكر
                </Button>
              </CardContent>
            </Card>

            {/* Support Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  ساعات الدعم
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>الدردشة المباشرة:</span>
                    <span className="font-medium text-green-600">24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span>البريد الإلكتروني:</span>
                    <span className="font-medium">24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span>الهاتف:</span>
                    <span className="font-medium">9 ص - 6 م</span>
                  </div>
                  <div className="flex justify-between">
                    <span>الجمعة:</span>
                    <span className="font-medium">مغلق</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Ticket Form Modal */}
        {showTicketForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl mx-4">
              <CardHeader>
                <CardTitle>إنشاء تذكرة دعم جديدة</CardTitle>
                <CardDescription>
                  أوصف مشكلتك وسنقوم بالرد عليك في أقرب وقت ممكن
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">الاسم</Label>
                    <Input id="name" placeholder="اسمك الكامل" />
                  </div>
                  <div>
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input id="email" type="email" placeholder="example@email.com" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="subject">موضوع التذكرة</Label>
                  <Input id="subject" placeholder="موضوع المشكلة" />
                </div>
                <div>
                  <Label htmlFor="category">فئة المشكلة</Label>
                  <select 
                    id="category"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">اختر الفئة</option>
                    <option value="delivery">مشكلة في التسليم</option>
                    <option value="payment">مشكلة في الدفع</option>
                    <option value="account">مشكلة في الحساب</option>
                    <option value="technical">مشكلة تقنية</option>
                    <option value="other">أخرى</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="priority">أولوية التذكرة</Label>
                  <select 
                    id="priority"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">منخفضة</option>
                    <option value="medium">متوسطة</option>
                    <option value="high">عالية</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="message">تفاصيل المشكلة</Label>
                  <textarea 
                    id="message"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="اكتب تفاصيل مشكلتك هنا..."
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => setShowTicketForm(false)}
                    className="flex-1"
                  >
                    إرسال التذكرة
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowTicketForm(false)}
                    className="flex-1"
                  >
                    إلغاء
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};