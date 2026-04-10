import { useState, useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
import ChefsSection from "@/components/ChefsSection";
import MenuGrid from "@/components/MenuGrid";
import SiteFooter from "@/components/SiteFooter";

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <LoadingScreen isVisible={loading} />
      <SiteHeader />
      <HeroSection />
      <ChefsSection />
      <MenuGrid />
      <SiteFooter />
    </div>
  );
};

export default Index;
