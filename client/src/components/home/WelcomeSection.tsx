import { useAppStore } from "@/stores/useAppStore";
import { Card, CardContent } from "@/components/ui/card";

export function WelcomeSection() {
  const language = useAppStore((state) => state.language);
  const user = useAppStore((state) => state.user);

  return (
    <Card className="bg-gradient-to-r from-government-green-light to-white border-0 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-government-green mb-2">
              {language === "th" 
                ? user ? `สวัสดี, ${user.name}` : "ยินดีต้อนรับ"
                : user ? `Welcome, ${user.name}` : "Welcome"}
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
  );
}