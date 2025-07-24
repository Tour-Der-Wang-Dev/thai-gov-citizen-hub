import { useState } from "react";
import { 
  Megaphone, 
  Calendar, 
  AlertCircle, 
  Info, 
  Star,
  Bell,
  Clock,
  MapPin
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const AnnouncementsPage = () => {
  const [language] = useState<"th" | "en">("th");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "ทั้งหมด", labelEn: "All" },
    { id: "emergency", label: "เร่งด่วน", labelEn: "Emergency" },
    { id: "event", label: "กิจกรรม", labelEn: "Events" },
    { id: "service", label: "บริการ", labelEn: "Services" },
    { id: "infrastructure", label: "โครงสร้าง", labelEn: "Infrastructure" }
  ];

  const announcements = [
    {
      title: "แจ้งปิดการให้บริการระบบน้ำประปา",
      titleEn: "Water Service Maintenance Notice",
      content: "เนื่องจากการซ่อมแซมระบบท่อส่งน้ำหลัก จะมีการปิดน้ำประปาในพื้นที่หมู่ที่ 1-3 ในวันที่ 20 มกราคม 2567 เวลา 08:00-16:00 น.",
      contentEn: "Due to main water pipe maintenance, water service will be suspended in villages 1-3 on January 20, 2024, from 08:00-16:00.",
      date: "2024-01-16",
      category: "emergency",
      priority: "high",
      author: "กองช่าง อบต.ตัวอย่าง",
      authorEn: "Technical Department, Example SAO",
      location: "หมู่ที่ 1-3"
    },
    {
      title: "ประชาสัมพันธ์งานวันเด็กแห่งชาติ",
      titleEn: "National Children's Day Event",
      content: "ขอเชิญชาวบ้านและเด็กๆ ร่วมงานวันเด็กแห่งชาติ ประจำปี 2567 ในวันเสาร์ที่ 13 มกราคม 2567 เวลา 08:00-15:00 น. ที่ลานอเนกประสงค์",
      contentEn: "We invite villagers and children to join the National Children's Day 2024 on Saturday, January 13, 2024, 08:00-15:00 at the multipurpose area.",
      date: "2024-01-15",
      category: "event",
      priority: "medium",
      author: "ฝ่ายประชาสัมพันธ์",
      authorEn: "Public Relations Department",
      location: "ลานอเนกประสงค์"
    },
    {
      title: "เปิดรับสมัครโครงการเบี้ยยังชีพผู้สูงอายุ",
      titleEn: "Elderly Living Allowance Registration",
      content: "เปิดรับสมัครโครงการเบี้ยยังชีพผู้สูงอายุ ประจำปี 2567 สำหรับผู้ที่มีอายุ 60 ปีขึ้นไป ตั้งแต่วันที่ 15 มกราคม - 15 กุมภาพันธ์ 2567",
      contentEn: "Registration open for Elderly Living Allowance 2024 for those aged 60 and above, from January 15 - February 15, 2024.",
      date: "2024-01-14",
      category: "service",
      priority: "medium",
      author: "ฝ่ายสวัสดิการสังคม",
      authorEn: "Social Welfare Department",
      location: "สำนักงาน อบต."
    },
    {
      title: "ประกาศปิดปรับปรุงถนนสายหลัก",
      titleEn: "Main Road Improvement Notice",
      content: "แจ้งให้ทราบว่าจะมีการปิดปรับปรุงถนนสายหลัก ช่วงกิโลเมตรที่ 5-8 เป็นเวลา 30 วัน เริ่มตั้งแต่วันที่ 25 มกราคม 2567",
      contentEn: "Notice of main road improvement closure from kilometers 5-8 for 30 days starting January 25, 2024.",
      date: "2024-01-13",
      category: "infrastructure",
      priority: "high",
      author: "กองช่าง",
      authorEn: "Engineering Department",
      location: "ถนนสายหลัก กม.5-8"
    },
    {
      title: "กิจกรรมอบรมการใช้บริการออนไลน์",
      titleEn: "Online Service Training Workshop",
      content: "จัดอบรมการใช้บริการออนไลน์สำหรับประชาชน เพื่อให้สามารถเข้าถึงบริการดิจิทัลได้อย่างสะดวก วันที่ 22 มกราคม 2567",
      contentEn: "Online service training workshop for citizens to access digital services conveniently on January 22, 2024.",
      date: "2024-01-12",
      category: "event",
      priority: "low",
      author: "ฝ่ายเทคโนโลยี",
      authorEn: "Technology Department",
      location: "ห้องประชุม อบต."
    }
  ];

  const filteredAnnouncements = announcements.filter(announcement => 
    selectedCategory === "all" || announcement.category === selectedCategory
  );

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "medium":
        return <Info className="h-4 w-4 text-yellow-500" />;
      default:
        return <Bell className="h-4 w-4 text-blue-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 bg-red-50";
      case "medium":
        return "border-l-yellow-500 bg-yellow-50";
      default:
        return "border-l-blue-500 bg-blue-50";
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <Card className="bg-gradient-to-r from-government-green-light to-white border-0 shadow-lg">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-government-green mb-2">
            {language === "th" ? "ประกาศและข่าวสาร" : "Announcements & News"}
          </h2>
          <p className="text-muted-foreground">
            {language === "th" 
              ? "ข่าวสารและประกาศสำคัญจากท้องถิ่น" 
              : "Important news and announcements from local administration"}
          </p>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "government" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="text-xs"
              >
                {language === "th" ? category.label : category.labelEn}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Urgent Announcements */}
      {filteredAnnouncements.some(a => a.priority === "high") && (
        <Card className="border-red-200 bg-red-50 border-0 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg text-red-700">
              <AlertCircle className="h-5 w-5 mr-2" />
              {language === "th" ? "ประกาศเร่งด่วน" : "Urgent Announcements"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {filteredAnnouncements
              .filter(a => a.priority === "high")
              .slice(0, 2)
              .map((announcement, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border-l-4 border-red-500">
                  <h4 className="font-semibold text-red-700 mb-2">
                    {language === "th" ? announcement.title : announcement.titleEn}
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {language === "th" ? announcement.content : announcement.contentEn}
                  </p>
                  <div className="flex items-center justify-between mt-3 text-xs text-red-600">
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {announcement.date}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {announcement.location}
                    </span>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      )}

      {/* All Announcements */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-foreground">
            {language === "th" ? "ประกาศทั้งหมด" : "All Announcements"} ({filteredAnnouncements.length})
          </h3>
          <Button variant="government-outline" size="sm">
            <Star className="h-4 w-4 mr-2" />
            {language === "th" ? "ติดตาม" : "Follow"}
          </Button>
        </div>

        <div className="space-y-4">
          {filteredAnnouncements.map((announcement, index) => (
            <Card key={index} className={cn(
              "border-0 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4",
              getPriorityColor(announcement.priority)
            )}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {getPriorityIcon(announcement.priority)}
                      <Badge variant="outline" className="text-xs">
                        {categories.find(c => c.id === announcement.category)?.[language === "th" ? "label" : "labelEn"]}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight">
                      {language === "th" ? announcement.title : announcement.titleEn}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {language === "th" ? announcement.content : announcement.contentEn}
                </p>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {announcement.date}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {announcement.location}
                    </span>
                  </div>
                  
                  <span className="text-xs">
                    {language === "th" ? announcement.author : announcement.authorEn}
                  </span>
                </div>
                
                <div className="flex space-x-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    {language === "th" ? "แชร์" : "Share"}
                  </Button>
                  <Button variant="government" size="sm" className="flex-1">
                    {language === "th" ? "อ่านเพิ่มเติม" : "Read More"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Subscribe to Updates */}
      <Card className="bg-gradient-to-r from-government-green to-government-green-dark text-white border-0 shadow-lg">
        <CardContent className="p-6 text-center">
          <Bell className="h-12 w-12 mx-auto mb-4 text-white/80" />
          <h3 className="text-xl font-bold mb-2">
            {language === "th" ? "รับแจ้งข่าวสาร" : "Get Notifications"}
          </h3>
          <p className="text-white/80 mb-4">
            {language === "th" 
              ? "สมัครรับข่าวสารและประกาศสำคัญผ่านระบบแจ้งเตือน" 
              : "Subscribe to important news and announcements via notifications"}
          </p>
          <Button variant="secondary" size="lg">
            {language === "th" ? "เปิดการแจ้งเตือน" : "Enable Notifications"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnnouncementsPage;