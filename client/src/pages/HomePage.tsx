import { 
  Newspaper,
  Calendar
} from "lucide-react";
import { useAppStore } from "@/stores/useAppStore";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PullToRefresh } from "@/components/ui/pull-to-refresh";
import { WelcomeSection } from "@/components/home/WelcomeSection";
import { QuickStats } from "@/components/home/QuickStats";
import { QuickServices } from "@/components/home/QuickServices";

const HomePage = () => {
  const language = useAppStore((state) => state.language);
  const updateLastSync = useAppStore((state) => state.updateLastSync);
  const isOnline = useOnlineStatus();

  const recentNews = [
    {
      title: "ประชาสัมพันธ์โครงการปรับปรุงถนน",
      titleEn: "Road Improvement Project Announcement",
      date: "2024-01-15",
      category: "infrastructure"
    },
    {
      title: "กิจกรรมวันสิ่งแวดล้อมโลก",
      titleEn: "World Environment Day Activities",
      date: "2024-01-14",
      category: "environment"
    },
    {
      title: "การจัดเก็บขยะในช่วงเทศกาล",
      titleEn: "Festival Period Waste Collection",
      date: "2024-01-13",
      category: "services"
    }
  ];

  const handleRefresh = async () => {
    // Simulate API refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    updateLastSync();
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="space-y-6 pb-20">
        {/* Offline Indicator */}
        {!isOnline && (
          <div className="bg-warning/10 border border-warning text-warning-foreground px-4 py-2 rounded-lg text-sm text-center">
            {language === "th" ? "ไม่มีการเชื่อมต่ออินเทอร์เน็ต" : "No internet connection"}
          </div>
        )}

        {/* Welcome Section */}
        <WelcomeSection />

        {/* Quick Stats */}
        <QuickStats />

        {/* Quick Services */}
        <QuickServices />

        {/* Recent News */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Newspaper className="h-5 w-5 text-government-green mr-2" />
              {language === "th" ? "ข่าวสารล่าสุด" : "Latest News"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentNews.map((news, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                <Calendar className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-foreground">
                    {language === "th" ? news.title : news.titleEn}
                  </h4>
                  <p className="text-xs text-muted-foreground">{news.date}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {news.category}
                </Badge>
              </div>
            ))}
            
            <Button 
              variant="government-outline" 
              size="sm" 
              className="w-full mt-4"
            >
              {language === "th" ? "ดูข่าวสารทั้งหมด" : "View All News"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </PullToRefresh>
  );
};

export default HomePage;