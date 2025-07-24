import { Bell, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Header = () => {
  const [language, setLanguage] = useState<"th" | "en">("th");

  const toggleLanguage = () => {
    setLanguage(prev => prev === "th" ? "en" : "th");
  };

  return (
    <header className="bg-gradient-to-r from-government-green to-government-green-dark text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
              <img 
                src="/lovable-uploads/56a59753-b2d2-493e-b60d-22e094138497.png" 
                alt="Thai Government Logo" 
                className="w-8 h-8"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold">
                {language === "th" ? "LocalGov Thailand" : "LocalGov Thailand"}
              </h1>
              <p className="text-sm text-white/80">
                {language === "th" ? "บริการดิจิทัลสำหรับประชาชน" : "Digital Services for Citizens"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="text-white hover:bg-white/20 h-10 w-10"
            >
              <Globe className="h-5 w-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 h-10 w-10 relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Button>
          </div>
        </div>
        
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-white/90">
              {language === "th" ? "บริการพร้อมใช้งาน" : "Services Active"}
            </span>
          </div>
          
          <div className="text-sm text-white/80">
            {language === "th" ? "เชื่อมต่อกับ DGA" : "Connected to DGA"}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;