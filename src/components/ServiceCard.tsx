import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  icon: LucideIcon;
  onClick: () => void;
  status?: "active" | "maintenance" | "new";
  language?: "th" | "en";
}

const ServiceCard = ({ 
  title, 
  titleEn, 
  description, 
  descriptionEn, 
  icon: Icon, 
  onClick, 
  status = "active",
  language = "th" 
}: ServiceCardProps) => {
  const statusColors = {
    active: "bg-success text-success-foreground",
    maintenance: "bg-warning text-warning-foreground",
    new: "bg-accent text-accent-foreground"
  };

  const statusLabels = {
    active: { th: "พร้อมใช้งาน", en: "Active" },
    maintenance: { th: "ปรับปรุง", en: "Maintenance" },
    new: { th: "ใหม่", en: "New" }
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-gray-50 border-0 shadow-md"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-government-green-light rounded-lg">
            <Icon className="h-6 w-6 text-government-green" />
          </div>
          {status !== "active" && (
            <span className={cn(
              "px-2 py-1 rounded-full text-xs font-medium",
              statusColors[status]
            )}>
              {statusLabels[status][language]}
            </span>
          )}
        </div>
        
        <h3 className="font-semibold text-lg text-foreground mb-2">
          {language === "th" ? title : titleEn}
        </h3>
        
        <p className="text-muted-foreground text-sm leading-relaxed">
          {language === "th" ? description : descriptionEn}
        </p>
        
        <div className="mt-4 flex items-center text-government-green text-sm font-medium">
          <span>{language === "th" ? "เข้าใช้บริการ" : "Access Service"}</span>
          <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;