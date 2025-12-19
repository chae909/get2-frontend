import React from "react";
import HeroSection from "../components/HeroSection";
import FeatureSection from "../components/FeaturesSection";
import StepsSection from "../components/StepsSection";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden pt-20">

      <HeroSection />
      <FeatureSection />
      <StepsSection />
    </div>
  );
};

export default LandingPage;
