import React from 'react';

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
    <section className="py-16 sm:py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 px-4">
            단 4단계로 완성되는 완벽한 파티
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 px-4">
            복잡했던 파티 준비가 이렇게 간단해질 줄 몰랐을 거예요
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 lg:gap-8">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="text-center px-4"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg mx-auto animate-bounce">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-800">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12 sm:mt-16 px-4">
          <button 
            onClick={onGetStarted}
            className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all transform hover:scale-105"
          >
            지금 바로 시작해보기
          </button>
        </div>
      </div>
    </section>
  );
};

export default StepsSection;