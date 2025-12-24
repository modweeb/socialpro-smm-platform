import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { 
  FileText, 
  Shield, 
  AlertTriangle, 
  Scale, 
  Eye, 
  Lock,
  Users,
  Clock,
  CheckCircle,
  Info
} from 'lucide-react';

export const TermsPage: React.FC = () => {
  const sections = [
    {
      id: 'acceptance',
      title: 'قبول الشروط',
      icon: CheckCircle,
      content: `
        <p>باستخدام منصة SocialPro، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام خدماتنا.</p>
        <p>نحتفظ بالحق في تعديل هذه الشروط في أي وقت دون إشعار مسبق. ستكون النسخة المحدثة متاحة على موقعنا.</p>
      `
    },
    {
      id: 'services',
      title: 'وصف الخدمات',
      icon: Users,
      content: `
        <p>SocialPro هي منصة تقدم خدمات التسويق الرقمي لوسائل التواصل الاجتماعي، بما في ذلك:</p>
        <ul>
          <li>زيادة المتابعين والمشتركين</li>
          <li>زيادة المشاهدات والإعجابات</li>
          <li>تحسين الظهور على المنصات</li>
          <li>خدمات تسويقية أخرى ذات صلة</li>
        </ul>
        <p>جميع الخدمات نقدمها بجودة عالية وبأسعار تنافسية.</p>
      `
    },
    {
      id: 'account',
      title: 'الحساب والمعلومات الشخصية',
      icon: Lock,
      content: `
        <p>عند إنشاء حساب معنا، تلتزم بتقديم معلومات صحيحة ودقيقة.</p>
        <p>أنت مسؤول عن:</p>
        <ul>
          <li>الحفاظ على سرية معلومات حسابك</li>
          <li>جميع الأنشطة التي تتم من خلال حسابك</li>
          <li>إبلاغنا فوراً عن أي استخدام غير مصرح به لحسابك</li>
        </ul>
        <p>نحتفظ بالحق في تعليق أو إنهاء حسابك إذا انتهاكت هذه الشروط.</p>
      `
    },
    {
      id: 'payments',
      title: 'الدفع والفواتير',
      icon: Scale,
      content: `
        <p>جميع المدفوعات مستحقة مقدماً ولا يمكن استردادها إلا في ظروف استثنائية.</p>
        <p>سياسة الاسترداد:</p>
        <ul>
          <li>لا يمكن استرداد المدفوعات للطلبات المكتملة</li>
          <li>يمكن استرداد الطلبات الملغية قبل بدء المعالجة</li>
          <li>في حالة عدم تسليم الخدمة، سيتم استرداد المبلغ كاملاً</li>
        </ul>
        <p>نحتفظ بالحق في تعديل أسعار خدماتنا في أي وقت.</p>
      `
    },
    {
      id: 'delivery',
      title: 'تسليم الخدمات',
      icon: Clock,
      content: `
        <p>نسعى لتسليم جميع طلباتكم في الوقت المحدد، لكن قد تحدث تأخيرات بسبب ظروف خارجة عن سيطرتنا.</p>
        <p>أوقات التسليم النموذجية:</p>
        <ul>
          <li>المتابعين: 1-24 ساعة</li>
          <li>المشاهدات: 30 دقيقة - 6 ساعات</li>
          <li>الإعجابات: 1-12 ساعة</li>
        </ul>
        <p>إذا لم تستلمو طلبكم في الوقت المحدد، يرجى التواصل معنا.</p>
      `
    },
    {
      id: 'quality',
      title: 'ضمان الجودة',
      icon: Shield,
      content: `
        <p>نضمن جودة جميع خدماتنا ونقدم ضمان إعادة التعبئة لمدة 30 يوماً.</p>
        <p>في حالة انخفاض الخدمة عن 80% من الكمية المطلوبة، سنقوم بإعادة إرسال الطلب مجاناً.</p>
        <p>نحن لا نضمن:</p>
        <ul>
          <li>معدلات تفاعل محددة</li>
          <li>نمو طبيعي للحساب</li>
          <li>زيادة في المبيعات أو الأرباح</li>
        </ul>
      `
    },
    {
      id: 'prohibited',
      title: 'الاستخدام المحظور',
      icon: AlertTriangle,
      content: `
        <p>يُمنع استخدام خدماتنا لل:</p>
        <ul>
          <li>انتهاك حقوق الطبع والنشر أو الملكية الفكرية</li>
          <li>مضايقة أو إزعاج المستخدمين الآخرين</li>
          <li>نشر محتوى مسيء أو غير قانوني</li>
          <li>محاولة التلاعب في خوارزميات المنصات</li>
          <li>استخدام حسابات وهمية أو بوتات</li>
        </ul>
        <p>في حالة انتهاك هذه القواعد، سيتم تعليق حسابك فوراً.</p>
      `
    },
    {
      id: 'privacy',
      title: 'الخصوصية والأمان',
      icon: Eye,
      content: `
        <p>نحن نلتزم بحماية خصوصيتك ومعلوماتك الشخصية.</p>
        <p>نجمع فقط المعلومات الضرورية لتقديم خدماتنا ولا نشاركها مع أطراف ثالثة.</p>
        <p>تخزن بياناتك بأمان وتستخدم تشفير SSL للحماية.</p>
        <p>للمزيد من التفاصيل، يرجى مراجعة سياسة الخصوصية الخاصة بنا.</p>
      `
    },
    {
      id: 'liability',
      title: 'المسؤولية',
      icon: Info,
      content: `
        <p>SocialPro غير مسؤولة عن:</p>
        <ul>
          <li>أي أضرار مباشرة أو غير مباشرة ناتجة عن استخدام خدماتنا</li>
          <li>فقدان البيانات أو الأرباح</li>
          <li>انقطاع الخدمة لأسباب تقنية</li>
          <li>إجراءات المنصات الاجتماعية تجاه الحسابات</li>
        </ul>
        <p>حد المسؤولية الإجمالي لن يتجاوز المبلغ المدفوع للخدمة المعنية.</p>
      `
    },
    {
      id: 'contact',
      title: 'التواصل معنا',
      icon: FileText,
      content: `
        <p>إذا كان لديك أي أسئلة حول هذه الشروط والأحكام، يرجى التواصل معنا:</p>
        <ul>
          <li>البريد الإلكتروني: legal@socialpro.com</li>
          <li>الهاتف: +966 50 123 4567</li>
          <li>عنوان المكتب: الرياض، المملكة العربية السعودية</li>
        </ul>
        <p>سنقوم بالرد على استفساراتكم في أقرب وقت ممكن.</p>
      `
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">الشروط والأحكام</h1>
          <p className="text-xl text-gray-600">
            شروط وأحكام استخدام منصة SocialPro
          </p>
          <div className="mt-4 text-sm text-gray-500">
            آخر تحديث: 25 ديسمبر 2025
          </div>
        </div>

        {/* Table of Contents */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              فهرس المحتويات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {sections.map((section, index) => {
                const IconComponent = section.icon;
                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <IconComponent className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">{section.title}</span>
                  </a>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Content Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <Card key={section.id} id={section.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <IconComponent className="h-5 w-5 text-blue-600" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div 
                    className="prose prose-gray max-w-none"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Footer */}
        <Card className="mt-12">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-blue-600">
                <Shield className="h-5 w-5" />
                <span className="font-medium">SocialPro - منصة التسويق الرقمي الآمنة</span>
              </div>
              <p className="text-gray-600">
                نشكركم على اختيار SocialPro لخدمات التسويق الرقمي. نحن ملتزمون بتوفير أفضل تجربة ممكنة لكم.
              </p>
              <div className="flex gap-4 justify-center">
                <Button variant="outline">
                  تحميل PDF
                </Button>
                <Button>
                  طباعة الشروط
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};