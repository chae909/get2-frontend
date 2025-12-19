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
    <div className="min-h-screen bg-white relative overflow-hidden pt-20">

      <HeroSection 
        onGetStarted={onGetStarted} 
        onDemo={onDemo} 
      />
      <FeatureSection />
      <StepsSection onGetStarted={onGetStarted} />
    </div>
  );
};

export default LandingPage;
