import React, { useEffect, useRef, useState } from 'react';

// Steps Section Component
interface Step {
  step: string;
  title: string;
  description: string;
}

interface StepsSectionProps {
  onGetStarted?: () => void;
}

const StepsSection: React.FC<StepsSectionProps> = ({ onGetStarted }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const steps: Step[] = [
    {
      step: "1",
      title: "파티 정보 입력",
      description: "파티 종류, 예산, 인원, 날짜 등 기본 정보를 알려주세요"
    },
    {
      step: "2", 
      title: "AI 플랜 생성",
      description: "AI가 수많은 데이터를 분석해 최적의 파티 플랜을 생성합니다"
    },
    {
      step: "3",
      title: "플랜 확인 및 수정", 
      description: "제안된 플랜을 확인하고 원하는 대로 커스터마이징하세요"
    },
    {
      step: "4",
      title: "실행 및 관리",
      description: "체크리스트를 따라 준비하고 당일 실시간 지원을 받으세요"
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 bg-gradient-to-b from-white to-pink-50 relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-[450px] h-[450px] bg-gradient-to-br from-rose-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gradient-to-br from-violet-200 to-purple-200 rounded-full blur-3xl opacity-25"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-br from-fuchsia-200 to-pink-200 rounded-full blur-2xl opacity-15"></div>
      </div>
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className={`text-center mb-12 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-2xl md:text-3xl font-extrabold text-black mb-4 px-4 leading-relaxed md:leading-relaxed">
            단 4단계로 완성되는 완벽한 파티
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto px-4 leading-relaxed">
            복잡했던 파티 준비가 이렇게 간단해질 줄 몰랐을 거예요
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`text-center p-6 bg-gray-50 rounded-3xl hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1 border border-gray-200 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-900 to-gray-700 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md mx-auto">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-3 text-black leading-relaxed">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16 px-4">
          <button 
            onClick={onGetStarted}
            className="w-full sm:w-auto bg-black hover:bg-gray-800 text-white font-semibold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-sm"
          >
            지금 바로 시작해보기
          </button>
        </div>
      </div>
    </section>
  );
};

export default StepsSection;