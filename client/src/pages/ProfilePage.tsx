import { useState } from "react";
import { 
  User, 
  IdCard, 
  Phone, 
  Mail, 
  MapPin, 
  Settings,
  History,
  Star,
  Shield,
  Bell,
  LogOut,
  Edit,
  Camera
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";

const ProfilePage = () => {
  const [language] = useState<"th" | "en">("th");
  const [notifications, setNotifications] = useState(true);

  // Mock user data
  const userData = {
    name: "นางสาว สมใจ ใจดี",
    nameEn: "Ms. Somjai Jaidee",
    idCard: "1-1234-56789-01-2",
    phone: "081-234-5678",
    email: "somjai.jaidee@email.com",
    address: "123 หมู่ 5 ตำบลตัวอย่าง อำเภอตัวอย่าง จังหวัดตัวอย่าง 12345",
    addressEn: "123 Moo 5, Tambon Example, Amphoe Example, Province Example 12345",
    memberSince: "2022-03-15",
    tier: "gold",
    points: 1250
  };

  const recentServices = [
    {
      service: "ชำระภาษีท้องถิ่น",
      serviceEn: "Local Tax Payment",
      date: "2024-01-10",
      status: "completed",
      amount: "1,200 บาท"
    },
    {
      service: "ขออนุญาตก่อสร้าง",
      serviceEn: "Building Permit",
      date: "2024-01-05",
      status: "pending",
      amount: "-"
    },
    {
      service: "แจ้งปัญหาถนน",
      serviceEn: "Road Issue Report",
      date: "2023-12-28",
      status: "resolved",
      amount: "-"
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { 
        variant: "default" as const, 
        label: { th: "เสร็จสิ้น", en: "Completed" },
        color: "bg-green-100 text-green-700"
      },
      pending: { 
        variant: "secondary" as const, 
        label: { th: "รอดำเนินการ", en: "Pending" },
        color: "bg-yellow-100 text-yellow-700"
      },
      resolved: { 
        variant: "outline" as const, 
        label: { th: "แก้ไขแล้ว", en: "Resolved" },
        color: "bg-blue-100 text-blue-700"
      }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge className={config.color}>
        {config.label[language]}
      </Badge>
    );
  };

  const getTierInfo = (tier: string) => {
    const tiers = {
      bronze: { color: "text-orange-600", bg: "bg-orange-100", label: { th: "บรอนซ์", en: "Bronze" } },
      silver: { color: "text-gray-600", bg: "bg-gray-100", label: { th: "เงิน", en: "Silver" } },
      gold: { color: "text-yellow-600", bg: "bg-yellow-100", label: { th: "ทอง", en: "Gold" } }
    };
    return tiers[tier as keyof typeof tiers];
  };

  const tierInfo = getTierInfo(userData.tier);

  return (
    <div className="space-y-6 pb-20">
      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-government-green-light to-white border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="w-20 h-20">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="bg-government-green text-white text-xl">
                  {userData.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <Button 
                size="icon" 
                variant="outline" 
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-white"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground">
                {language === "th" ? userData.name : userData.nameEn}
              </h2>
              <p className="text-muted-foreground text-sm">
                {language === "th" ? "สมาชิกตั้งแต่" : "Member since"} {userData.memberSince}
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge className={`${tierInfo.bg} ${tierInfo.color}`}>
                  <Star className="h-3 w-3 mr-1" />
                  {tierInfo.label[language]}
                </Badge>
                <Badge variant="outline">
                  {userData.points} {language === "th" ? "คะแนน" : "points"}
                </Badge>
              </div>
            </div>
            
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              {language === "th" ? "แก้ไข" : "Edit"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <IdCard className="h-5 w-5 text-government-green mr-2" />
            {language === "th" ? "ข้อมูลส่วนตัว" : "Personal Information"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <IdCard className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">
                  {language === "th" ? "เลขบัตรประชาชน" : "ID Card Number"}
                </p>
                <p className="font-medium">{userData.idCard}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">
                  {language === "th" ? "เบอร์โทรศัพท์" : "Phone Number"}
                </p>
                <p className="font-medium">{userData.phone}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">
                  {language === "th" ? "อีเมล" : "Email"}
                </p>
                <p className="font-medium">{userData.email}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">
                  {language === "th" ? "สถานะการยืนยัน" : "Verification Status"}
                </p>
                <Badge variant="default" className="bg-green-100 text-green-700">
                  {language === "th" ? "ยืนยันแล้ว" : "Verified"}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 mt-4">
            <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
            <div>
              <p className="text-sm text-muted-foreground">
                {language === "th" ? "ที่อยู่" : "Address"}
              </p>
              <p className="font-medium leading-relaxed">
                {language === "th" ? userData.address : userData.addressEn}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Services */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <History className="h-5 w-5 text-government-green mr-2" />
            {language === "th" ? "บริการล่าสุด" : "Recent Services"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentServices.map((service, index) => (
            <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex-1">
                <h4 className="font-medium text-sm">
                  {language === "th" ? service.service : service.serviceEn}
                </h4>
                <p className="text-xs text-muted-foreground">{service.date}</p>
                {service.amount !== "-" && (
                  <p className="text-xs text-government-green font-medium">{service.amount}</p>
                )}
              </div>
              {getStatusBadge(service.status)}
            </div>
          ))}
          
          <Button variant="government-outline" size="sm" className="w-full mt-4">
            {language === "th" ? "ดูประวัติทั้งหมด" : "View All History"}
          </Button>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Settings className="h-5 w-5 text-government-green mr-2" />
            {language === "th" ? "การตั้งค่า" : "Settings"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">
                  {language === "th" ? "การแจ้งเตือน" : "Notifications"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {language === "th" ? "รับแจ้งเตือนข่าวสารและบริการ" : "Receive news and service notifications"}
                </p>
              </div>
            </div>
            <Switch 
              checked={notifications} 
              onCheckedChange={setNotifications}
            />
          </div>
          
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <Shield className="h-4 w-4 mr-3" />
              {language === "th" ? "ความปลอดภัย" : "Security"}
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              <User className="h-4 w-4 mr-3" />
              {language === "th" ? "แก้ไขข้อมูลส่วนตัว" : "Edit Personal Information"}
            </Button>
            
            <Button variant="destructive" className="w-full justify-start">
              <LogOut className="h-4 w-4 mr-3" />
              {language === "th" ? "ออกจากระบบ" : "Logout"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;