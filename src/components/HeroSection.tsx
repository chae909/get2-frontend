import React from 'react';

// Icons
const PartyPopperIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5.8 11.3 2 22l10.7-3.79"/>
    <path d="m14.2 12.7 7.8-7.8-4-4-7.8 7.8-4 4Z"/>
    <path d="M12.7 20.2 22 11l-4-4-9.3 9.3Z"/>
    <path d="M8.5 2.5 7 4"/>
    <path d="m14 8 3-3"/>
    <path d="M9.5 17.5 8 19"/>
  </svg>
);

// Animated Background Component
const AnimatedHeroBackground = () => (
  <div className="absolute inset-0 w-full h-full overflow-hidden" aria-hidden="true">
    <svg width="100%" height="100%" preserveAspectRatio="xMidYMid slice" className="pointer-events-none">
      <defs>
        <radialGradient id="grad1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style={{stopColor: 'rgba(139, 92, 246, 0.3)', stopOpacity:1}} />
          <stop offset="100%" style={{stopColor: 'rgba(139, 92, 246, 0)', stopOpacity:0}} />
        </radialGradient>
        <radialGradient id="grad2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style={{stopColor: 'rgba(236, 72, 153, 0.2)', stopOpacity:1}} />
          <stop offset="100%" style={{stopColor: 'rgba(236, 72, 153, 0)', stopOpacity:0}} />
        </radialGradient>
      </defs>
      
      <circle cx="20%" cy="30%" r="150" fill="url(#grad1)" className="animate-pulse" style={{animationDuration: '4s'}} />
      <circle cx="80%" cy="70%" r="200" fill="url(#grad2)" className="animate-pulse" style={{animationDuration: '6s'}} />
      
      {/* Confetti-like elements */}
      <rect x="10%" y="20%" width="4" height="4" fill="rgba(255, 215, 0, 0.6)" className="animate-bounce" />
      <rect x="85%" y="15%" width="4" height="4" fill="rgba(255, 105, 180, 0.6)" className="animate-bounce" style={{animationDelay: '1s'}} />
      <rect x="70%" y="85%" width="4" height="4" fill="rgba(138, 43, 226, 0.6)" className="animate-bounce" style={{animationDelay: '2s'}} />
      
      {/* Party streamers */}
      <path d="M 0 100 Q 200 150 400 100 T 800 100" stroke="rgba(255, 215, 0, 0.3)" strokeWidth="3" fill="none" />
      <path d="M 1000 300 Q 1200 350 1400 300 T 1800 300" stroke="rgba(255, 105, 180, 0.3)" strokeWidth="3" fill="none" />
    </svg>
  </div>
);

// Hero Section Component
interface HeroSectionProps {
  onGetStarted?: () => void;
  onDemo?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted, onDemo }) => {
  return (
    <section className="relative min-h-[70vh] sm:h-[80vh] flex items-center justify-center text-white text-center bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 overflow-hidden px-4">
      <AnimatedHeroBackground />
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 via-transparent to-transparent z-0"></div>
      <div className="relative z-10 p-4 max-w-4xl mx-auto w-full">
        <div className="animate-bounce mb-4 sm:mb-6">
          <PartyPopperIcon className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-yellow-400" />
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight animate-fade-in">
          완벽한 파티를 위한 <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400"><br></br>올인원 솔루션</span>
        </h1>
        <p className="text-base sm:text-lg md:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
          생일파티부터 기업 이벤트까지, AI가 맞춤형 파티 플랜을 제안하고 모든 준비를 도와드립니다
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={onGetStarted}
            className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all transform hover:scale-105"
          >
            무료로 시작하기
          </button>
          <button 
            onClick={onDemo}
            className="w-full sm:w-auto bg-white/20 backdrop-blur-sm text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all transform hover:scale-105 border border-white/30">
            데모 보기
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;