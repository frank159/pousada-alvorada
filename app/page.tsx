import HeroSection from "./pages/HeroSection";
import SpacesSection from "./pages/SpacesSection";
import SurpriseSection from "./pages/SurpriseSection";
import TrailsAndBookingSection from "./pages/TrailsAndBookingSection";

export default function Home() {
  return (
    <div style={{ backgroundColor: "#1F0905" }}>
      <HeroSection />
      <SpacesSection />
      <SurpriseSection />
      <TrailsAndBookingSection />
    </div>
  );
}
