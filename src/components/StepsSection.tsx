import React, { useEffect, useRef, useState } from 'react';

// Steps Section Component
interface Step {
  step: string;
  title: string;
  description: string;
}

const StepsSection: React.FC = () => {
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
    <section ref={sectionRef} className="py-24 md:py-32 bg-gradient-to-b from-white to-pink-50 relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-[450px] h-[450px] bg-gradient-to-br from-rose-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gradient-to-br from-violet-200 to-purple-200 rounded-full blur-3xl opacity-25"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-br from-fuchsia-200 to-pink-200 rounded-full blur-2xl opacity-15"></div>
      </div>
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-6 px-4 leading-relaxed md:leading-relaxed">
            단 4단계로 완성되는 완벽한 파티
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4 leading-relaxed">
            복잡했던 파티 준비가 이렇게 간단해질 줄 몰랐을 거예요
          </p>
        </div>

        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`text-center p-8 bg-white rounded-3xl hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-gray-900 to-gray-700 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg mx-auto">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-black leading-relaxed">
                  {step.title}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 추가 정보 섹션 */}
        <div className={`mt-20 transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* 왜 Get2를 선택해야 하나요? */}
            <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold text-black mb-6 leading-relaxed">
                왜 Get2를 선택해야 하나요?
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-2xl mr-3">⚡</span>
                  <div>
                    <p className="font-semibold text-black">빠른 플래닝</p>
                    <p className="text-gray-600 text-sm">AI가 5분 안에 완벽한 파티 플랜을 제안합니다</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">💰</span>
                  <div>
                    <p className="font-semibold text-black">예산 최적화</p>
                    <p className="text-gray-600 text-sm">한정된 예산으로 최고의 퀄리티를 만들어냅니다</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">🎯</span>
                  <div>
                    <p className="font-semibold text-black">맞춤형 추천</p>
                    <p className="text-gray-600 text-sm">파티 유형과 취향에 딱 맞는 장소와 컨텐츠를 추천합니다</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">📱</span>
                  <div>
                    <p className="font-semibold text-black">실시간 관리</p>
                    <p className="text-gray-600 text-sm">준비 과정부터 당일까지 모든 것을 한눈에 관리하세요</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* 이런 파티에 완벽해요 */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-10 text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-6 leading-relaxed">
                이런 파티에 완벽해요
              </h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <span className="text-xl">🎂</span>
                  </div>
                  <div>
                    <p className="font-semibold">생일 파티</p>
                    <p className="text-gray-300 text-sm">특별한 날을 더욱 특별하게</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <span className="text-xl">💼</span>
                  </div>
                  <div>
                    <p className="font-semibold">회사 행사</p>
                    <p className="text-gray-300 text-sm">팀빌딩부터 송년회까지</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <span className="text-xl">👨‍👩‍👧‍👦</span>
                  </div>
                  <div>
                    <p className="font-semibold">가족 모임</p>
                    <p className="text-gray-300 text-sm">온 가족이 함께 즐기는 시간</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <span className="text-xl">🎉</span>
                  </div>
                  <div>
                    <p className="font-semibold">축하 행사</p>
                    <p className="text-gray-300 text-sm">졸업, 승진, 결혼 등 모든 기념일</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 고객 후기 */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-10">
            <h3 className="text-2xl font-bold text-black mb-8 text-center leading-relaxed">
              고객들의 생생한 후기
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {"★★★★★"}
                  </div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  "처음 파티를 준비하는데 어디서부터 시작해야 할지 막막했어요. Get2 덕분에 정말 쉽게 완벽한 생일파티를 만들 수 있었습니다!"
                </p>
                <p className="text-sm text-gray-500">- 김지우, 생일파티</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {"★★★★★"}
                  </div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  "예산이 빠듯했는데 AI가 최적의 장소와 서비스를 추천해줘서 비용도 절약하고 만족도는 최고였어요. 강추합니다!"
                </p>
                <p className="text-sm text-gray-500">- 박민수, 회사 송년회</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {"★★★★★"}
                  </div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  "체크리스트 기능이 너무 유용했어요. 놓칠 뻔한 것들도 다 챙길 수 있었고, 당일날도 스트레스 없이 즐길 수 있었습니다."
                </p>
                <p className="text-sm text-gray-500">- 이서연, 가족 모임</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepsSection;