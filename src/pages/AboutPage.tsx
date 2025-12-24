import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { 
  Users, 
  Target, 
  Award, 
  Globe, 
  Shield, 
  Zap,
  TrendingUp,
  Heart,
  Star,
  CheckCircle,
  ArrowRight,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const stats = [
    { label: 'عميل راضٍ', value: '50,000+', icon: Users },
    { label: 'طلب مكتمل', value: '1.2M+', icon: CheckCircle },
    { label: 'خدمة متنوعة', value: '500+', icon: Zap },
    { label: 'سنة خبرة', value: '5+', icon: Award }
  ];

  const values = [
    {
      icon: Shield,
      title: 'الجودة والأمان',
      description: 'نضمن أعلى معايير الجودة والأمان في جميع خدماتنا',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Heart,
      title: 'خدمة العملاء',
      description: 'فريق دعم متخصص متاح 24/7 لمساعدتكم',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      icon: TrendingUp,
      title: 'النمو المستمر',
      description: 'نسعى دائماً لتطوير خدماتنا وتحسين تجربة العملاء',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Globe,
      title: 'الشمولية',
      description: 'نخدم عملاء من جميع أنحاء العالم بخدمات متنوعة',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const team = [
    {
      name: 'أحمد محمد',
      role: 'المؤسس والرئيس التنفيذي',
      description: 'خبرة 10 سنوات في التسويق الرقمي وإدارة المشاريع',
      avatar: '👨‍💼',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'ahmed@socialpro.com'
      }
    },
    {
      name: 'فاطمة العلي',
      role: 'مديرة التقنية',
      description: 'خبيرة في تطوير الأنظمة والأمان السيبراني',
      avatar: '👩‍💻',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'fatima@socialpro.com'
      }
    },
    {
      name: 'محمد الخالدي',
      role: 'مدير خدمة العملاء',
      description: 'متخصص في تجربة العملاء وخدمة الدعم الفني',
      avatar: '👨‍💼',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'mohammed@socialpro.com'
      }
    }
  ];

  const milestones = [
    {
      year: '2020',
      title: 'تأسيس الشركة',
      description: 'بدأت SocialPro برؤية واضحة لتقديم أفضل خدمات التسويق الرقمي'
    },
    {
      year: '2021',
      title: '100,000 عميل',
      description: 'وصلنا إلى 100,000 عميل راضٍ خلال السنة الأولى'
    },
    {
      year: '2022',
      title: 'التوسع الإقليمي',
      description: 'افتتحنا مكاتب في الإمارات والكويت وقطر'
    },
    {
      year: '2023',
      title: 'المليون الأول',
      description: 'أكملنا أول مليون طلب ناجح'
    },
    {
      year: '2024',
      title: 'الابتكار والتقنية',
      description: 'أطلقنا منصتنا الجديدة بتقنيات متطورة'
    },
    {
      year: '2025',
      title: 'الريادة الإقليمية',
      description: 'أصبحنا المنصة الرائدة في منطقة الشرق الأوسط'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">من نحن</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            SocialPro هي منصة رائدة في مجال التسويق الرقمي وخدمات وسائل التواصل الاجتماعي، 
            نساعد الشركات والأفراد على بناء حضور قوي على الإنترنت
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Target className="h-6 w-6 text-blue-600" />
                  رسالتنا
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  نسعى لتمكين الشركات والأفراد من تحقيق أهدافهم في التسويق الرقمي من خلال 
                  تقديم خدمات عالية الجودة وأسعار تنافسية. نؤمن بأن النمو الحقيقي يأتي من 
                  بناء علاقات قوية مع الجمهور وليس فقط من الأرقام.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Star className="h-6 w-6 text-yellow-500" />
                  رؤيتنا
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  أن نكون المنصة الرائدة في منطقة الشرق الأوسط في مجال التسويق الرقمي، 
                  ونساهم في نجاح عملائنا من خلال الابتكار المستمر وتقديم الحلول المتطورة 
                  التي تساعدهم على التفوق في عالم وسائل التواصل الاجتماعي.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">قيمنا الأساسية</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              هذه هي المبادئ التي توجه عملنا وتحدد هويتنا كشركة
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${value.bgColor} mb-4 mx-auto`}>
                      <IconComponent className={`h-6 w-6 ${value.color}`} />
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">فريق العمل</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              تعرف على الفريق المبدع الذي يقف وراء نجاح SocialPro
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="text-6xl mb-4">{member.avatar}</div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-blue-600 font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{member.description}</p>
                  <div className="flex justify-center gap-3">
                    <Button size="sm" variant="outline">
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">رحلتنا</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              رحلة SocialPro من البداية حتى اليوم
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {milestone.year}
                    </div>
                  </div>
                  <Card className="flex-1">
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            انضم إلى مجتمعنا اليوم
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            كن جزءاً من رحلة النجاح وابدأ رحلتك مع SocialPro
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
              ابدأ الآن
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-blue-600">
              تواصل معنا
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">تواصل معنا</h2>
            <p className="text-xl text-gray-300">
              نحن هنا للإجابة على جميع استفساراتكم
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full mb-4">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">العنوان</h3>
              <p className="text-gray-300">الرياض، المملكة العربية السعودية</p>
            </div>
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full mb-4">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">الهاتف</h3>
              <p className="text-gray-300">+966 50 123 4567</p>
            </div>
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full mb-4">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">البريد الإلكتروني</h3>
              <p className="text-gray-300">info@socialpro.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};