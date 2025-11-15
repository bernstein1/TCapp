import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { MemberLayout } from "@/components/MemberLayout";
import { OnboardingTutorialOverlay } from "@/components/OnboardingTutorialOverlay";
import Dashboard from "@/pages/Dashboard";
import CasesPage from "@/pages/CasesPage";
import DocumentsPage from "@/pages/DocumentsPage";
import WalletPage from "@/pages/WalletPage";
import SchedulePage from "@/pages/SchedulePage";
import ServicesPage from "@/pages/ServicesPage";
import ResourcesPage from "@/pages/ResourcesPage";
import SettingsPage from "@/pages/SettingsPage";

export default function TutorialPage() {
  const [, setLocation] = useLocation();
  const [currentRoute, setCurrentRoute] = useState("/");

  const handleTutorialComplete = () => {
    // Mark tutorial as completed in localStorage
    localStorage.setItem("touchcare_tutorial_completed", "true");
    setLocation("/");
  };

  useEffect(() => {
    console.log("TutorialPage mounted");

    // Prevent scrolling on the body during tutorial
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';

    return () => {
      // Re-enable scrolling when tutorial ends
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, []);

  // Render the appropriate page based on current route
  const renderPage = () => {
    switch (currentRoute) {
      case "/cases":
        return <CasesPage />;
      case "/documents":
        return <DocumentsPage />;
      case "/wallet":
        return <WalletPage />;
      case "/schedule":
        return <SchedulePage />;
      case "/services":
        return <ServicesPage />;
      case "/resources":
        return <ResourcesPage />;
      case "/settings":
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Static, non-interactive background showing the current page */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none select-none">
        <MemberLayout>
          {renderPage()}
        </MemberLayout>
      </div>

      {/* Tutorial overlay on top */}
      <OnboardingTutorialOverlay
        onComplete={handleTutorialComplete}
        onRouteChange={setCurrentRoute}
      />
    </div>
  );
}
