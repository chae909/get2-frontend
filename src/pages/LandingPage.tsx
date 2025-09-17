import React from "react";
import HeroSection from "../components/HeroSection";
import FeatureSection from "../components/FeaturesSection";
import StepsSection from "../components/StepsSection";

interface LandingPageProps {
  onStartChatbot?: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartChatbot }) => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection onGetStarted={onStartChatbot} onDemo={onStartChatbot} />
      <FeatureSection />
      <StepsSection />
    </div>
  );
};

export default LandingPage;
