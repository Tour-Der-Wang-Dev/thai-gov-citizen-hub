import { useState } from "react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import HomePage from "@/pages/HomePage";
import ServicesPage from "@/pages/ServicesPage";
import ReportsPage from "@/pages/ReportsPage";
import AnnouncementsPage from "@/pages/AnnouncementsPage";
import ProfilePage from "@/pages/ProfilePage";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomePage />;
      case "services":
        return <ServicesPage />;
      case "reports":
        return <ReportsPage />;
      case "announcements":
        return <AnnouncementsPage />;
      case "profile":
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        {renderContent()}
      </main>
      
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
};

export default Index;
