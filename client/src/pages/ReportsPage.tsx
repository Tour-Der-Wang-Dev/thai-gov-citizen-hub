import { useState } from "react";
import { 
  TrendingUp, 
  PieChart, 
  DollarSign, 
  Users, 
  Calendar,
  Download,
  Eye,
  BarChart3
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ReportsPage = () => {
  const [language] = useState<"th" | "en">("th");

  const reports = [
    {
      title: "รายงานการเงิน",
      titleEn: "Financial Report",
      description: "งบประมาณ รายได้ รายจ่าย ประจำเดือน",
      descriptionEn: "Monthly budget, income, and expenditure",
      icon: DollarSign,
      type: "financial",
      lastUpdated: "2024-01-15",
      status: "updated"
    },
    {
      title: "รายงานประชากร",
      titleEn: "Population Report",
      description: "จำนวนประชากร การเปลี่ยนแปลงทางสถิติ",
      descriptionEn: "Population count and statistical changes",
      icon: Users,
      type: "demographic",
      lastUpdated: "2024-01-10",
      status: "updated"
    },
    {
      title: "รายงานการให้บริการ",
      titleEn: "Service Report",
      description: "สถิติการใช้บริการออนไลน์และออฟไลน์",
      descriptionEn: "Online and offline service usage statistics",
      icon: BarChart3,
      type: "service",
      lastUpdated: "2024-01-14",
      status: "new"
    },
    {
      title: "รายงานจัดการขยะ",
      titleEn: "Waste Management",
      description: "ปริมาณขยะ การจัดเก็บ การนำกลับมาใช้",
      descriptionEn: "Waste volume, collection, and recycling data",
      icon: TrendingUp,
      type: "environment",
      lastUpdated: "2024-01-12",
      status: "updated"
    },
    {
      title: "รายงานโครงการพัฒนา",
      titleEn: "Development Projects",
      description: "ความคืบหน้าโครงการพัฒนาท้องถิ่น",
      descriptionEn: "Local development project progress",
      icon: PieChart,
      type: "development",
      lastUpdated: "2024-01-08",
      status: "updated"
    }
  ];

  const quickStats = [
    {
      label: "งบประมาณปี 2567",
      labelEn: "2024 Budget",
      value: "125.5M",
      unit: "บาท",
      unitEn: "THB",
      change: "+8.5%",
      icon: DollarSign
    },
    {
      label: "ประชากรทั้งหมด",
      labelEn: "Total Population",
      value: "45,678",
      unit: "คน",
      unitEn: "people",
      change: "+2.1%",
      icon: Users
    },
    {
      label: "บริการออนไลน์",
      labelEn: "Online Services",
      value: "1,247",
      unit: "คำขอ",
      unitEn: "requests",
      change: "+15.3%",
      icon: BarChart3
    }
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <Card className="bg-gradient-to-r from-government-green-light to-white border-0 shadow-lg">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-government-green mb-2">
            {language === "th" ? "รายงานและสถิติ" : "Reports & Statistics"}
          </h2>
          <p className="text-muted-foreground">
            {language === "th" 
              ? "ข้อมูลสถิติและรายงานการดำเนินงาน" 
              : "Statistical data and operational reports"}
          </p>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {language === "th" ? stat.label : stat.labelEn}
                    </p>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                      <span className="text-sm text-muted-foreground">
                        {language === "th" ? stat.unit : stat.unitEn}
                      </span>
                    </div>
                    <Badge variant="secondary" className="mt-2 text-xs">
                      {stat.change}
                    </Badge>
                  </div>
                  <div className="p-3 bg-government-green-light rounded-lg">
                    <Icon className="h-6 w-6 text-government-green" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Reports List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-foreground">
            {language === "th" ? "รายงานทั้งหมด" : "All Reports"}
          </h3>
          <Button variant="government-outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            {language === "th" ? "กรองตามวันที่" : "Filter by Date"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reports.map((report, index) => {
            const Icon = report.icon;
            return (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-government-green-light rounded-lg group-hover:bg-government-green group-hover:text-white transition-colors">
                        <Icon className="h-5 w-5 text-government-green group-hover:text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {language === "th" ? report.title : report.titleEn}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {language === "th" ? report.description : report.descriptionEn}
                        </p>
                      </div>
                    </div>
                    {report.status === "new" && (
                      <Badge variant="secondary" className="text-xs">
                        {language === "th" ? "ใหม่" : "New"}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 inline mr-1" />
                      {language === "th" ? "อัพเดท:" : "Updated:"} {report.lastUpdated}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        {language === "th" ? "ดู" : "View"}
                      </Button>
                      <Button variant="government" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        {language === "th" ? "ดาวน์โหลด" : "Download"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Chart Preview */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <TrendingUp className="h-5 w-5 text-government-green mr-2" />
            {language === "th" ? "แนวโน้มการใช้บริการ" : "Service Usage Trends"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 bg-gradient-to-r from-government-green-light to-white rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-government-green mx-auto mb-4" />
              <p className="text-muted-foreground">
                {language === "th" ? "แผนภูมิแสดงแนวโน้มการใช้บริการ" : "Chart showing service usage trends"}
              </p>
              <Button variant="government-outline" size="sm" className="mt-4">
                {language === "th" ? "ดูรายละเอียด" : "View Details"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPage;