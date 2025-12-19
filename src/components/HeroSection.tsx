import React, { useEffect, useState } from 'react';

// Hero Section Component
interface HeroSectionProps {
  onGetStarted?: () => void;
  onDemo?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted, onDemo }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center text-center overflow-hidden px-6 bg-gradient-to-b from-blue-50 to-purple-50">
      {/* 배경 장식 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-25"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-br from-indigo-200 to-violet-200 rounded-full blur-2xl opacity-15"></div>
      </div>
      
      {/* 애니메이션 배경 도형들 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 떠다니는 원형들 - 테두리만 */}
        <div className="absolute top-[15%] left-[8%] w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 border-2 border-gray-300 rounded-full animate-float"></div>
        <div className="absolute top-[20%] right-[12%] w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 border-2 border-gray-300 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-[15%] left-[15%] w-36 h-36 sm:w-56 sm:h-56 md:w-72 md:h-72 border-2 border-gray-300 rounded-full animate-float-slow"></div>
        <div className="absolute bottom-[20%] right-[20%] w-32 h-32 sm:w-48 sm:h-48 md:w-60 md:h-60 border-2 border-gray-300 rounded-full animate-float"></div>
        
        {/* 사각형들 - 테두리만 */}
        <div className="absolute top-[30%] right-[8%] w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 border-2 border-gray-300 rounded-3xl animate-rotate-slow"></div>
        <div className="absolute bottom-[35%] left-[12%] w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 border-2 border-gray-300 rounded-2xl animate-rotate-reverse"></div>
      </div>
      
      <div className={`relative z-10 max-w-4xl mx-auto w-full transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-relaxed md:leading-relaxed lg:leading-relaxed text-black">
          완벽한 파티를 위한
          <br />
          <span className="text-gray-600">올인원 솔루션</span>
        </h1>
        <p className="text-base md:text-lg mb-10 max-w-2xl mx-auto text-gray-600 leading-relaxed md:leading-relaxed">
          AI 기반 맞춤 추천부터 예산 관리까지,
          <br className="hidden md:block" />
          완벽한 파티를 위한 모든 것
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={onGetStarted}
            className="w-full sm:w-auto bg-gray-800 hover:bg-gray-900 text-white font-semibold py-4 px-12 rounded-full transition-all transform hover:scale-105 shadow-md"
          >
            무료로 시작하기
          </button>
          <button 
            onClick={onDemo}
            className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-800 font-semibold py-4 px-12 rounded-full transition-all transform hover:scale-105 border-2 border-gray-800 hover:border-gray-900">
            데모 보기
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;