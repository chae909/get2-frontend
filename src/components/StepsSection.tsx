import React from "react";

const StepsSection: React.FC = () => {
  const steps = [
    { step: "1", title: "자세 측정", description: "AI 카메라를 통한 분석" },
    { step: "2", title: "결과 확인", description: "개인 맞춤형 리포트 제공" },
    { step: "3", title: "운동 시작", description: "교정 운동 플랜 실행" },
  ];

  return (
    <section className="py-20">
      <h2 className="text-3xl font-bold text-center mb-12">이용 방법</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto px-6">
        {steps.map((s, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center bg-white p-6 rounded-2xl shadow-md"
          >
            <div className="text-2xl font-bold text-blue-500">{s.step}</div>
            <h3 className="text-xl font-semibold mt-2">{s.title}</h3>
            <p className="text-gray-600 mt-2">{s.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StepsSection;
