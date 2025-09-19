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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 relative overflow-hidden pt-16 sm:pt-20">
      {/* 정적 배경 장식 */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <svg width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="landingGrad1" cx="10%" cy="20%" r="40%">
              <stop offset="0%" style={{stopColor: 'rgba(139, 92, 246, 0.3)', stopOpacity:1}} />
              <stop offset="100%" style={{stopColor: 'rgba(139, 92, 246, 0)', stopOpacity:0}} />
            </radialGradient>
            <radialGradient id="landingGrad2" cx="90%" cy="80%" r="50%">
              <stop offset="0%" style={{stopColor: 'rgba(236, 72, 153, 0.2)', stopOpacity:1}} />
              <stop offset="100%" style={{stopColor: 'rgba(236, 72, 153, 0)', stopOpacity:0}} />
            </radialGradient>
            <radialGradient id="landingGrad3" cx="70%" cy="30%" r="35%">
              <stop offset="0%" style={{stopColor: 'rgba(168, 85, 247, 0.2)', stopOpacity:1}} />
              <stop offset="100%" style={{stopColor: 'rgba(168, 85, 247, 0)', stopOpacity:0}} />
            </radialGradient>
          </defs>
          
          <circle cx="10%" cy="20%" r="250" fill="url(#landingGrad1)" />
          <circle cx="90%" cy="80%" r="350" fill="url(#landingGrad2)" />
          <circle cx="70%" cy="30%" r="200" fill="url(#landingGrad3)" />
        </svg>
      </div>

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
