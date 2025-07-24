import { Home, FileText, ClipboardList, Megaphone, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const tabs = [
    { id: "home", label: "หน้าหลัก", labelEn: "Home", icon: Home },
    { id: "services", label: "บริการ", labelEn: "Services", icon: ClipboardList },
    { id: "reports", label: "รายงาน", labelEn: "Reports", icon: FileText },
    { id: "announcements", label: "ประกาศ", labelEn: "News", icon: Megaphone },
    { id: "profile", label: "โปรไฟล์", labelEn: "Profile", icon: User },
  ];

  return (
    <nav className="bg-white border-t border-border shadow-lg">
      <div className="flex justify-around items-center py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-300 min-w-0 flex-1",
                isActive
                  ? "text-government-green bg-government-green-light"
                  : "text-muted-foreground hover:text-government-green hover:bg-government-green-light/50"
              )}
            >
              <Icon className={cn("h-5 w-5 mb-1", isActive && "scale-110")} />
              <span className="text-xs font-medium">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;