import { useState, useEffect, useRef } from "react";
import { LanguageProvider } from "@/i18n/LanguageContext";
import LoadingScreen from "@/components/LoadingScreen";
import LoginGate from "@/components/LoginGate";
import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
import MenuGrid from "@/components/MenuGrid";
import DrinksSection from "@/components/DrinksSection";
import ChefsSection from "@/components/ChefsSection";
import ExperiencesSection from "@/components/ExperiencesSection";
import ReservationSection from "@/components/ReservationSection";
import ReviewsSection from "@/components/ReviewsSection";
import DeliveryModal from "@/components/DeliveryModal";
import ContactSection from "@/components/ContactSection";
import SiteFooter from "@/components/SiteFooter";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [deliveryOpen, setDeliveryOpen] = useState(false);
  const [preselectedUnit, setPreselectedUnit] = useState("");
  const reservaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  const handleReserveUnit = (unitId: string) => {
    setPreselectedUnit(unitId);
    setTimeout(() => {
      document.getElementById("reserva")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  if (loading) return <LanguageProvider><LoadingScreen isVisible={true} /></LanguageProvider>;
  if (!authenticated) return <LanguageProvider><LoginGate onLogin={() => setAuthenticated(true)} /></LanguageProvider>;

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <SiteHeader onDelivery={() => setDeliveryOpen(true)} />
        <HeroSection />
        <MenuGrid />
        <DrinksSection />
        <ChefsSection />
        <ExperiencesSection onReserveUnit={handleReserveUnit} />
        <ReservationSection preselectedUnit={preselectedUnit} />
        <ReviewsSection />
        <ContactSection />
        <SiteFooter />
        <DeliveryModal isOpen={deliveryOpen} onClose={() => setDeliveryOpen(false)} />
      </div>
    </LanguageProvider>
  );
};

export default Index;
