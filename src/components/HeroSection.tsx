import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="text-center py-20 bg-gradient-to-r from-blue-100 to-blue-200">
      <h1 className="text-5xl font-bold mb-4">AI 기반 자세 교정 서비스</h1>
      <p className="text-lg text-gray-700">
        당신의 건강한 삶을 위한 맞춤형 솔루션
      </p>
      <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-2xl shadow-lg hover:bg-blue-600 transition">
        지금 시작하기
      </button>
    </section>
  );
};

export default HeroSection;
