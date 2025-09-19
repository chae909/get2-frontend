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

// Hero Section Component
interface HeroSectionProps {
  onGetStarted?: () => void;
  onDemo?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted, onDemo }) => {
  return (
    <section className="relative min-h-[70vh] sm:h-[80vh] flex items-center justify-center text-white text-center overflow-hidden px-4">
      <div className="relative z-10 p-6 max-w-4xl mx-auto w-full bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20">
        <div className="animate-bounce mb-4 sm:mb-6">
          <PartyPopperIcon className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-yellow-400" />
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight animate-fade-in">
          완벽한 파티를 위한 <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400"><br></br>올인원 솔루션</span>
        </h1>
        <p className="text-base sm:text-lg md:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto px-4 text-white/90">
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
            className="w-full sm:w-auto bg-white/20 backdrop-blur-sm text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all transform hover:scale-105 border border-white/30 hover:bg-white/30">
            데모 보기
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;