import React from "react";
import HeroSection from "../components/HeroSection";
import FeatureSection from "../components/FeaturesSection";
import StepsSection from "../components/StepsSection";

interface LandingPageProps {
  onStartChatbot: () => void;
  onDemo?: () => void;
  onGetStarted?: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onDemo, onGetStarted }) => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection 
        onGetStarted={onGetStarted} 
        onDemo={onDemo} 
      />
      <FeatureSection />
      <StepsSection />
    </div>
  );
};

export default LandingPage;
