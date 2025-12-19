// 파일 경로: src/pages/Dashboard.tsx
// 역할: 로그인을 성공한 사용자에게 보여줄 대시보드 페이지입니다.

import React from 'react';
import { useAuth } from '../contexts/AuthContext';
// import { useNavigate } from 'react-router-dom';
import { Heart, Users, Calendar, ArrowRight } from 'lucide-react';

const Dashboard: React.FC = () => {
  // useAuth 훅을 사용해 현재 로그인된 사용자 정보와 로그아웃 함수를 가져옵니다.
  const { user } = useAuth();
  // const navigate = useNavigate();

  const handlePlanRequest = (type: string) => {
    // 추후 플랜 요청 페이지로 이동 로직 구현
    console.log(`${type} 플랜 생성 요청`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden pt-20">
      {/* 배경 장식 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-[400px] h-[400px] bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 left-10 w-[450px] h-[450px] bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>
      </div>
      
      <div className="container mx-auto p-6 max-w-6xl relative z-10">
        <div className="bg-gray-50 rounded-3xl p-8 mb-10 border border-gray-100">
          <h1 className="text-2xl md:text-3xl font-extrabold text-black mb-4 leading-relaxed md:leading-relaxed">
            {user?.nickname}님, 오늘은 어떤 즐거운 계획을 세워볼까요?
          </h1>
          <p className="text-base text-gray-600 leading-relaxed">
            아래에서 만들고 싶은 플랜의 종류를 선택해주세요.
          </p>

          {/* 플랜 생성 카드 섹션 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <button 
              onClick={() => handlePlanRequest('데이트')} 
              className="p-8 bg-white rounded-3xl text-left hover:shadow-lg transition-all duration-300 group transform hover:-translate-y-1 border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <Heart className="w-7 h-7 text-black mr-3" />
                <h2 className="text-2xl font-bold text-black leading-relaxed">새 데이트 플랜 만들기</h2>
              </div>
              <p className="text-gray-600 text-base leading-relaxed">연인과의 특별한 날을 위한 로맨틱한 코스를 계획해보세요.</p>
              <ArrowRight className="w-6 h-6 text-black mt-6 group-hover:translate-x-2 transition-transform" />
            </button>
            
            <button 
              onClick={() => handlePlanRequest('파티')} 
              className="p-10 bg-white rounded-3xl text-left hover:shadow-lg transition-all duration-300 group transform hover:-translate-y-1 border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <Calendar className="w-7 h-7 text-black mr-3" />
                <h2 className="text-xl font-bold text-black">새 파티 플랜 만들기</h2>
              </div>
              <p className="text-gray-600 text-base leading-relaxed">친구들과의 생일, 기념일 파티를 멋지게 준비할 수 있어요.</p>
              <ArrowRight className="w-6 h-6 text-black mt-6 group-hover:translate-x-2 transition-transform" />
            </button>
            
            <button 
              onClick={() => handlePlanRequest('모임')} 
              className="p-10 bg-white rounded-3xl text-left hover:shadow-lg transition-all duration-300 group transform hover:-translate-y-1 border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <Users className="w-7 h-7 text-black mr-3" />
                <h2 className="text-xl font-bold text-black">새 모임 플랜 만들기</h2>
              </div>
              <p className="text-gray-600 text-base leading-relaxed">가족, 동료, 친구들과의 모임을 간편하게 계획하세요.</p>
              <ArrowRight className="w-6 h-6 text-black mt-6 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>

        {/* 최근 플랜 섹션 */}
        <div className="bg-gray-50 rounded-3xl p-10 sm:p-12 mb-12 border border-gray-100">
          <h2 className="text-3xl font-bold text-black mb-8">최근 플랜</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden transform hover:scale-105 transition-transform duration-300 border border-gray-100">
              <img 
                src="https://placehold.co/400x250/e0e0e0/333?text=성수동+카페거리" 
                alt="플랜 이미지" 
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-black">성수동 주말 데이트</h3>
                <p className="text-sm text-gray-600">2025년 9월 12일</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden transform hover:scale-105 transition-transform duration-300 border border-gray-100">
              <img 
                src="https://placehold.co/400x250/d1d5db/333?text=강남+연말+파티" 
                alt="플랜 이미지" 
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-black">연말 동기 파티</h3>
                <p className="text-sm text-gray-600">2025년 12월 28일</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400 h-48">
              플랜 없음
            </div>
            
            <div className="flex items-center justify-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400 h-48">
              플랜 없음
            </div>
          </div>
        </div>

        {/* 추천 테마 섹션 */}
        <div className="bg-gray-50 rounded-3xl p-10 sm:p-12 border border-gray-100">
          <h2 className="text-3xl font-bold text-black mb-8">추천 테마</h2>
          <div className="flex space-x-6 overflow-x-auto pb-4">
            <div className="flex-shrink-0 w-72 bg-white rounded-2xl shadow-sm p-6 transform hover:-translate-y-1 transition-transform cursor-pointer border border-gray-100">
              <h3 className="font-bold text-black text-lg">☔ 비 오는 날 실내 데이트</h3>
              <p className="text-sm text-gray-600 mt-2">#감성 #파전 #막걸리</p>
            </div>
            
            <div className="flex-shrink-0 w-72 bg-white rounded-2xl shadow-sm p-6 transform hover:-translate-y-1 transition-transform cursor-pointer border border-gray-100">
              <h3 className="font-bold text-black text-lg">🔥 불금 제대로 즐기기</h3>
              <p className="text-sm text-gray-600 mt-2">#홍대 #클럽 #가성비</p>
            </div>
            
            <div className="flex-shrink-0 w-72 bg-white rounded-2xl shadow-sm p-6 transform hover:-translate-y-1 transition-transform cursor-pointer border border-gray-100">
              <h3 className="font-bold text-black text-lg">👨‍👩‍👧‍👦 가족과 함께하는 주말 나들이</h3>
              <p className="text-sm text-gray-600 mt-2">#공원 #자연 #키즈존</p>
            </div>
            
            <div className="flex-shrink-0 w-72 bg-white rounded-2xl shadow-sm p-6 transform hover:-translate-y-1 transition-transform cursor-pointer border border-gray-100">
              <h3 className="font-bold text-black text-lg">🌙 야경이 아름다운 저녁 데이트</h3>
              <p className="text-sm text-gray-600 mt-2">#반포대교 #한강 #야경</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

