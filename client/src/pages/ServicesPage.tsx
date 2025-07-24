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
  Filter,
  Star
} from "lucide-react";
import { useAppStore } from "@/stores/useAppStore";
import { useDebounce } from "@/hooks/useDebounce";
import ServiceCard from "@/components/ServiceCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { Badge } from "@/components/ui/badge";
import { PullToRefresh } from "@/components/ui/pull-to-refresh";
import { motion } from "framer-motion";

const ServicesPage = () => {
  const language = useAppStore((state) => state.language);
  const updateLastSync = useAppStore((state) => state.updateLastSync);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const debouncedSearch = useDebounce(searchTerm, 300);

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
      title: "ขออนุญาตก่อสร้าง",
      titleEn: "Building Permit",
      description: "ขออนุญาตก่อสร้างอาคาร ดัดแปลง รื้อถอน",
      descriptionEn: "Request building construction, modification, demolition permit",
      icon: Building,
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
      title: "ใบรับรองการพำนัก",
      titleEn: "Residence Certificate",
      description: "ขอใบรับรองการพำนักในเขตพื้นที่",
      descriptionEn: "Request residence certificate within local area",
      icon: FileText,
      status: "new" as const,
      category: "certificates"
    }
  ];

  const filteredServices = allServices.filter(service => {
    const matchesSearch = debouncedSearch === "" || 
      service.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      service.titleEn.toLowerCase().includes(debouncedSearch.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleRefresh = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    updateLastSync();
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="space-y-6 pb-20">
        {/* Enhanced Header */}
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

        {/* Enhanced Search and Filter */}
        <div className="space-y-4">
          <SearchInput
            placeholder={language === "th" ? "ค้นหาบริการ..." : "Search services..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClear={() => setSearchTerm("")}
          />
          
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

        {/* Enhanced Services Grid with Animation */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {filteredServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ServiceCard
                title={service.title}
                titleEn={service.titleEn}
                description={service.description}
                descriptionEn={service.descriptionEn}
                icon={service.icon}
                status={service.status}
                language={language}
                onClick={() => console.log(`Service clicked: ${service.title}`)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PullToRefresh>
  );
};

export default ServicesPage;