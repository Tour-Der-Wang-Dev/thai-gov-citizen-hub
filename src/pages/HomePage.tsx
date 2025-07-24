import { useState } from "react";
import { 
  CreditCard, 
  FileText, 
  MessageSquare, 
  Building, 
  Car, 
  Heart,
  Newspaper,
  Calendar,
  TrendingUp
} from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const HomePage = () => {
  const [language] = useState<"th" | "en">("th");

  const quickServices = [
    {
      title: "ชำระภาษี",
      titleEn: "Tax Payment",
      description: "ชำระภาษีท้องถิ่น ภาษีป้าย ค่าธรรมเนียมต่างๆ",
      descriptionEn: "Pay local taxes, signage tax, and various fees",
      icon: CreditCard,
      status: "active" as const
    },
    {
      title: "ขออนุญาต",
      titleEn: "Permit Request",
      description: "ขออนุญาตก่อสร้าง ดัดแปลง รื้อถอนอาคาร",
      descriptionEn: "Request building, renovation, demolition permits",
      icon: Building,
      status: "active" as const
    },
    {
      title: "แจ้งปัญหา",
      titleEn: "Report Issue",
      description: "แจ้งปัญหาในพื้นที่ ไฟฟ้า น้ำประปา ถนน",
      descriptionEn: "Report local issues: electricity, water, roads",
      icon: MessageSquare,
      status: "active" as const
    },
    {
      title: "ใบรับรอง",
      titleEn: "Certificates",
      description: "ขอใบรับรองการพำนัก หนังสือรับรองต่างๆ",
      descriptionEn: "Request residence certificates and documents",
      icon: FileText,
      status: "new" as const
    }
  ];

  const recentNews = [
    {
      title: "ประชาสัมพันธ์โครงการปรับปรุงถนน",
      titleEn: "Road Improvement Project Announcement",
      date: "2024-01-15",
      category: "infrastructure"
    },
    {
      title: "กิจกรรมวันสิ่งแวดล้อมโลก",
      titleEn: "World Environment Day Activities",
      date: "2024-01-14",
      category: "environment"
    },
    {
      title: "การจัดเก็บขยะในช่วงเทศกาล",
      titleEn: "Festival Period Waste Collection",
      date: "2024-01-13",
      category: "services"
    }
  ];

  const stats = [
    {
      label: "บริการออนไลน์",
      labelEn: "Online Services",
      value: "12",
      icon: FileText,
      change: "+2"
    },
    {
      label: "คำขอที่ดำเนินการ",
      labelEn: "Processed Requests",
      value: "1,247",
      icon: TrendingUp,
      change: "+156"
    },
    {
      label: "ประชาชนที่ใช้บริการ",
      labelEn: "Citizens Served",
      value: "8,932",
      icon: Heart,
      change: "+324"
    }
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Welcome Section */}
      <Card className="bg-gradient-to-r from-government-green-light to-white border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-government-green mb-2">
                {language === "th" ? "ยินดีต้อนรับ" : "Welcome"}
              </h2>
              <p className="text-muted-foreground">
                {language === "th" 
                  ? "เข้าสู่ระบบบริการดิจิทัลของท้องถิ่น" 
                  : "Access your local digital services"}
              </p>
            </div>
            <div className="hidden sm:block">
              <img 
                src="/lovable-uploads/56a59753-b2d2-493e-b60d-22e094138497.png" 
                alt="Government Logo" 
                className="w-16 h-16 opacity-70"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="text-center border-0 shadow-md">
              <CardContent className="p-4">
                <Icon className="h-6 w-6 text-government-green mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">
                  {language === "th" ? stat.label : stat.labelEn}
                </div>
                <Badge variant="secondary" className="mt-1 text-xs">
                  {stat.change}
                </Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Services */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-foreground">
          {language === "th" ? "บริการด่วน" : "Quick Services"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickServices.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              titleEn={service.titleEn}
              description={service.description}
              descriptionEn={service.descriptionEn}
              icon={service.icon}
              status={service.status}
              language={language}
              onClick={() => {
                console.log(`Service clicked: ${service.title}`);
              }}
            />
          ))}
        </div>
      </div>

      {/* Recent News */}
      <Card className="border-0 shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg">
            <Newspaper className="h-5 w-5 text-government-green mr-2" />
            {language === "th" ? "ข่าวสารล่าสุด" : "Latest News"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentNews.map((news, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
              <Calendar className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-medium text-sm text-foreground">
                  {language === "th" ? news.title : news.titleEn}
                </h4>
                <p className="text-xs text-muted-foreground">{news.date}</p>
              </div>
              <Badge variant="outline" className="text-xs">
                {news.category}
              </Badge>
            </div>
          ))}
          
          <Button 
            variant="government-outline" 
            size="sm" 
            className="w-full mt-4"
          >
            {language === "th" ? "ดูข่าวสารทั้งหมด" : "View All News"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;