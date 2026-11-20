import Header from "./components/header";
import Footer from "./components/Footer";
import HeroSection from "./pages/HeroSection";
import SpacesSection from "./pages/SpacesSection";
import SurpriseSection from "./pages/SurpriseSection";
import TrailsAndBookingSection from "./pages/TrailsAndBookingSection";
import ContactSection from "./pages/ContactSection";

export default function Home() {
  return (
    <div style={{ backgroundColor: "#1F0905" }}>
      <Header />
      <HeroSection />
      <SpacesSection />

      <div className="flex flex-col">
        <div className="order-2 lg:order-1">
          <SurpriseSection />
        </div>
        <div className="order-1 lg:order-2">
          <TrailsAndBookingSection />
        </div>
      </div>

      <ContactSection />
      <Footer />
    </div>
  );
}