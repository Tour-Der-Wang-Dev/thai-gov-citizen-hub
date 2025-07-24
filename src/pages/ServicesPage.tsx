import { useState } from "react";
import { 
  CreditCard, 
  FileText, 
  MessageSquare, 
  Building, 
  Car, 
  Heart,
  Users,
  Shield,
  Truck,
  Search,
  Filter
} from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const ServicesPage = () => {
  const [language] = useState<"th" | "en">("th");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "ทั้งหมด", labelEn: "All" },
    { id: "tax", label: "ภาษี", labelEn: "Tax" },
    { id: "permits", label: "อนุญาต", labelEn: "Permits" },
    { id: "complaints", label: "แจ้งปัญหา", labelEn: "Complaints" },
    { id: "certificates", label: "ใบรับรอง", labelEn: "Certificates" },
    { id: "social", label: "สวัสดิการ", labelEn: "Welfare" }
  ];

  const allServices = [
    {
      title: "ชำระภาษีท้องถิ่น",
      titleEn: "Local Tax Payment",
      description: "ชำระภาษีบำรุงท้องที่ ภาษีโรงเรือนและที่ดิน",
      descriptionEn: "Pay local development tax, property and land tax",
      icon: CreditCard,
      status: "active" as const,
      category: "tax"
    },
    {
      title: "ชำระภาษีป้าย",
      titleEn: "Signage Tax Payment",
      description: "ชำระภาษีป้ายโฆษณา ป้ายประกาศ",
      descriptionEn: "Pay advertising signage and announcement board tax",
      icon: CreditCard,
      status: "active" as const,
      category: "tax"
    },
    {
      title: "ขออนุญาตก่อสร้าง",
      titleEn: "Building Permit",
      description: "ขออนุญาตก่อสร้างอาคาร ดัดแปลง รื้อถอน",
      descriptionEn: "Request building construction, modification, demolition permit",
      icon: Building,
      status: "active" as const,
      category: "permits"
    },
    {
      title: "ขออนุญาตประกอบกิจการ",
      titleEn: "Business License",
      description: "ขออนุญาตเปิดร้านค้า ประกอบธุรกิจ",
      descriptionEn: "Request shop opening and business operation license",
      icon: Users,
      status: "active" as const,
      category: "permits"
    },
    {
      title: "แจ้งปัญหาถนน",
      titleEn: "Road Issues",
      description: "แจ้งปัญหาถนนชำรุด หลุมบ่อ ไฟฟ้าส่องสว่าง",
      descriptionEn: "Report road damage, potholes, street lighting issues",
      icon: Car,
      status: "active" as const,
      category: "complaints"
    },
    {
      title: "แจ้งปัญหาน้ำประปา",
      titleEn: "Water Issues",
      description: "แจ้งปัญหาน้ำประปา ท่อแตก น้ำไม่ไหล",
      descriptionEn: "Report water supply issues, pipe breaks, no water flow",
      icon: Truck,
      status: "active" as const,
      category: "complaints"
    },
    {
      title: "ใบรับรองการพำนัก",
      titleEn: "Residence Certificate",
      description: "ขอใบรับรองการพำนักในเขตพื้นที่",
      descriptionEn: "Request residence certificate within local area",
      icon: FileText,
      status: "active" as const,
      category: "certificates"
    },
    {
      title: "ใบรับรองรายได้",
      titleEn: "Income Certificate",
      description: "ขอใบรับรองรายได้สำหรับราชการ",
      descriptionEn: "Request income certificate for government purposes",
      icon: FileText,
      status: "new" as const,
      category: "certificates"
    },
    {
      title: "สวัสดิการผู้สูงอายุ",
      titleEn: "Elderly Welfare",
      description: "สมัครรับเบี้ยยังชีพผู้สูงอายุ",
      descriptionEn: "Apply for elderly living allowance",
      icon: Heart,
      status: "active" as const,
      category: "social"
    },
    {
      title: "สวัสดิการผู้พิการ",
      titleEn: "Disability Welfare",
      description: "สมัครรับเบี้ยความพิการ บัตรคนพิการ",
      descriptionEn: "Apply for disability allowance and disability card",
      icon: Shield,
      status: "active" as const,
      category: "social"
    },
    {
      title: "แจ้งปัญหาขยะ",
      titleEn: "Waste Issues",
      description: "แจ้งปัญหาการจัดเก็บขยะ ขยะล้น",
      descriptionEn: "Report waste collection issues, overflowing trash",
      icon: MessageSquare,
      status: "maintenance" as const,
      category: "complaints"
    }
  ];

  const filteredServices = allServices.filter(service => {
    const matchesSearch = searchTerm === "" || 
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.descriptionEn.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <Card className="bg-gradient-to-r from-government-green-light to-white border-0 shadow-lg">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-government-green mb-2">
            {language === "th" ? "บริการทั้งหมด" : "All Services"}
          </h2>
          <p className="text-muted-foreground">
            {language === "th" 
              ? "เลือกใช้บริการดิจิทัลของท้องถิ่น" 
              : "Choose from our digital local services"}
          </p>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-4">
          <div className="flex flex-col space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder={language === "th" ? "ค้นหาบริการ..." : "Search services..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
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
          </div>
        </CardContent>
      </Card>

      {/* Services Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            {language === "th" ? "บริการที่พบ" : "Found Services"} ({filteredServices.length})
          </h3>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            {language === "th" ? "เรียง" : "Sort"}
          </Button>
        </div>

        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredServices.map((service, index) => (
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
        ) : (
          <Card className="border-0 shadow-md">
            <CardContent className="p-8 text-center">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                {language === "th" ? "ไม่พบบริการ" : "No Services Found"}
              </h3>
              <p className="text-muted-foreground">
                {language === "th" 
                  ? "ลองเปลี่ยนคำค้นหาหรือหมวดหมู่" 
                  : "Try changing your search terms or category"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Popular Services */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">
            {language === "th" ? "บริการยอดนิยม" : "Popular Services"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {allServices.slice(0, 3).map((service, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
              <service.icon className="h-5 w-5 text-government-green flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-medium text-sm text-foreground">
                  {language === "th" ? service.title : service.titleEn}
                </h4>
                <p className="text-xs text-muted-foreground truncate">
                  {language === "th" ? service.description : service.descriptionEn}
                </p>
              </div>
              <Badge variant="secondary" className="text-xs">
                #{index + 1}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ServicesPage;