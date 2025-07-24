import { useState } from "react";
import { Search, Filter, Star, Clock, CheckCircle } from "lucide-react";
import { useAppStore } from "@/stores/useAppStore";
import { useDebounce } from "@/hooks/useDebounce";
import { SearchInput } from "@/components/ui/search-input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { PullToRefresh } from "@/components/ui/pull-to-refresh";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ServiceCard from "@/components/ServiceCard";
import { motion, AnimatePresence } from "framer-motion";

interface Service {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  icon: any;
  category: string;
  status: "active" | "maintenance" | "new";
  isFavorite?: boolean;
  estimatedTime?: string;
  popularity?: number;
}

export function EnhancedServicesPage() {
  const language = useAppStore((state) => state.language);
  const updateLastSync = useAppStore((state) => state.updateLastSync);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const debouncedSearch = useDebounce(searchQuery, 300);

  const services: Service[] = [
    {
      id: "tax-payment",
      title: "ชำระภาษี",
      titleEn: "Tax Payment",
      description: "ชำระภาษีที่ดินและสิ่งปลูกสร้าง",
      descriptionEn: "Pay land and building tax",
      icon: CheckCircle,
      category: "tax",
      status: "active",
      isFavorite: true,
      estimatedTime: "5 นาที",
      popularity: 4.5,
    },
    {
      id: "building-permit",
      title: "ขออนุญาตก่อสร้าง",
      titleEn: "Building Permit",
      description: "ยื่นคำขออนุญาตก่อสร้างอาคาร",
      descriptionEn: "Apply for a building construction permit",
      icon: CheckCircle,
      category: "permit",
      status: "active",
      estimatedTime: "15 วัน",
      popularity: 4.2,
    },
    {
      id: "business-license",
      title: "ขอใบอนุญาตประกอบกิจการ",
      titleEn: "Business License",
      description: "ขอใบอนุญาตประกอบกิจการที่เป็นอันตรายต่อสุขภาพ",
      descriptionEn: "Apply for a license to operate a business that is hazardous to health",
      icon: CheckCircle,
      category: "permit",
      status: "maintenance",
      estimatedTime: "10 วัน",
      popularity: 3.8,
    },
    {
      id: "certificate-request",
      title: "ขอหนังสือรับรอง",
      titleEn: "Certificate Request",
      description: "ขอหนังสือรับรองต่างๆ จากทางเทศบาล",
      descriptionEn: "Request various certificates from the municipality",
      icon: CheckCircle,
      category: "certificate",
      status: "new",
      estimatedTime: "7 วัน",
      popularity: 4.0,
    },
    {
      id: "report-issue",
      title: "แจ้งเรื่องร้องเรียน",
      titleEn: "Report a Complaint",
      description: "แจ้งเรื่องร้องเรียนต่างๆ ที่เกิดขึ้นในชุมชน",
      descriptionEn: "Report various complaints that occur in the community",
      icon: CheckCircle,
      category: "report",
      status: "active",
      estimatedTime: "ไม่ระบุ",
      popularity: 4.7,
    },
    {
      id: "water-bill",
      title: "ตรวจสอบค่าน้ำประปา",
      titleEn: "Check Water Bill",
      description: "ตรวจสอบและชำระค่าน้ำประปา",
      descriptionEn: "Check and pay water bills",
      icon: CheckCircle,
      category: "tax",
      status: "active",
      estimatedTime: "ทันที",
      popularity: 4.9,
    },
  ];

  const categories = [
    { id: "all", label: "ทั้งหมด", labelEn: "All" },
    { id: "tax", label: "ภาษี", labelEn: "Tax" },
    { id: "permit", label: "ใบอนุญาต", labelEn: "Permits" },
    { id: "certificate", label: "ใบรับรอง", labelEn: "Certificates" },
    { id: "report", label: "แจ้งปัญหา", labelEn: "Reports" },
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = 
      service.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      service.titleEn.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      service.description.toLowerCase().includes(debouncedSearch.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const favoriteServices = services.filter(service => favorites.includes(service.id));

  const toggleFavorite = (serviceId: string) => {
    setFavorites(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleRefresh = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    updateLastSync();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="space-y-6 pb-20">
        {/* Enhanced Header */}
        <Card className="bg-gradient-to-r from-government-green-light to-white border-0 shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-government-green mb-2">
              {language === "th" ? "บริการออนไลน์" : "Online Services"}
            </h2>
            <p className="text-muted-foreground">
              {language === "th" 
                ? "เข้าถึงบริการต่างๆ ของท้องถิ่นได้อย่างสะดวก" 
                : "Access local government services conveniently"}
            </p>
          </CardContent>
        </Card>

        {/* Enhanced Search and Filter */}
        <div className="space-y-4">
          <SearchInput
            placeholder={language === "th" ? "ค้นหาบริการ..." : "Search services..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery("")}
          />
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "government" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="whitespace-nowrap"
              >
                {language === "th" ? category.label : category.labelEn}
              </Button>
            ))}
          </div>
        </div>

        {/* Service Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">
              {language === "th" ? "ทั้งหมด" : "All"}
            </TabsTrigger>
            <TabsTrigger value="favorites" className="relative">
              {language === "th" ? "รายการโปรด" : "Favorites"}
              {favorites.length > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                  {favorites.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="recent">
              {language === "th" ? "ล่าสุด" : "Recent"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence mode="popLayout">
                {filteredServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    variants={itemVariants}
                    layout
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <div className="relative">
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
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 h-8 w-8 p-0"
                        onClick={() => toggleFavorite(service.id)}
                      >
                        <Star
                          className={`h-4 w-4 ${
                            favorites.includes(service.id)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </TabsContent>

          <TabsContent value="favorites" className="mt-6">
            {favoriteServices.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {favoriteServices.map((service) => (
                  <motion.div key={service.id} variants={itemVariants}>
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
            ) : (
              <div className="text-center py-12">
                <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {language === "th" 
                    ? "ยังไม่มีบริการในรายการโปรด" 
                    : "No favorite services yet"}
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="recent" className="mt-6">
            <div className="text-center py-12">
              <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {language === "th" 
                  ? "ยังไม่มีบริการที่ใช้งานล่าสุด" 
                  : "No recent services"}
              </p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Floating Action Button */}
        <FloatingActionButton>
          <Filter className="h-6 w-6" />
        </FloatingActionButton>
      </div>
    </PullToRefresh>
  );
}
