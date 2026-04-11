import { useState, useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import LoginGate from "@/components/LoginGate";
import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
import MenuGrid from "@/components/MenuGrid";
import DrinksSection from "@/components/DrinksSection";
import ChefsSection from "@/components/ChefsSection";
import ReservationSection from "@/components/ReservationSection";
import ReviewsSection from "@/components/ReviewsSection";
import DeliveryModal from "@/components/DeliveryModal";
import ContactSection from "@/components/ContactSection";
import SiteFooter from "@/components/SiteFooter";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [deliveryOpen, setDeliveryOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen isVisible={true} />;
  if (!authenticated) return <LoginGate onLogin={() => setAuthenticated(true)} />;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader onDelivery={() => setDeliveryOpen(true)} />
      <HeroSection />
      <MenuGrid />
      <DrinksSection />
      <ChefsSection />
      <ReservationSection />
      <ReviewsSection />
      <ContactSection />
      <SiteFooter />
      <DeliveryModal isOpen={deliveryOpen} onClose={() => setDeliveryOpen(false)} />
    </div>
  );
};

export default Index;
