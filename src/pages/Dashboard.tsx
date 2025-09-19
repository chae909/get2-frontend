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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 relative overflow-hidden pt-16 sm:pt-20">
      {/* 배경 장식 */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <svg width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="dashboardGrad1" cx="20%" cy="20%" r="40%">
              <stop offset="0%" style={{stopColor: 'rgba(139, 92, 246, 0.4)', stopOpacity:1}} />
              <stop offset="100%" style={{stopColor: 'rgba(139, 92, 246, 0)', stopOpacity:0}} />
            </radialGradient>
            <radialGradient id="dashboardGrad2" cx="80%" cy="80%" r="50%">
              <stop offset="0%" style={{stopColor: 'rgba(236, 72, 153, 0.3)', stopOpacity:1}} />
              <stop offset="100%" style={{stopColor: 'rgba(236, 72, 153, 0)', stopOpacity:0}} />
            </radialGradient>
          </defs>
          <circle cx="20%" cy="20%" r="300" fill="url(#dashboardGrad1)" className="animate-pulse" style={{animationDuration: '6s'}} />
          <circle cx="80%" cy="80%" r="200" fill="url(#dashboardGrad2)" className="animate-pulse" style={{animationDuration: '8s'}} />
        </svg>
      </div>

      <div className="container mx-auto p-6 md:p-8 relative z-10">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 mb-8">
          <h1 className="text-3xl font-bold text-white mb-4 opacity-0 animate-fade-in">
            {user?.nickname}님, 오늘은 어떤 즐거운 계획을 세워볼까요?
          </h1>
          <p className="text-white/80 mb-10 opacity-0 animate-fade-in delay-200">
            아래에서 만들고 싶은 플랜의 종류를 선택해주세요.
          </p>

          {/* 플랜 생성 카드 섹션 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <button 
              onClick={() => handlePlanRequest('데이트')} 
              className="p-8 bg-gradient-to-br from-pink-400/30 to-red-400/30 backdrop-blur-lg rounded-2xl text-left hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-2 opacity-0 animate-slide-up border border-white/20 hover:border-pink-400/50"
            >
              <div className="flex items-center mb-2">
                <Heart className="w-6 h-6 text-pink-300 mr-2" />
                <h2 className="text-2xl font-bold text-white">새 데이트 플랜 만들기</h2>
              </div>
              <p className="text-white/80">연인과의 특별한 날을 위한 로맨틱한 코스를 계획해보세요.</p>
              <ArrowRight className="w-5 h-5 text-pink-300 mt-4 group-hover:translate-x-2 transition-transform" />
            </button>
            
            <button 
              onClick={() => handlePlanRequest('파티')} 
              className="p-8 bg-gradient-to-br from-indigo-400/30 to-purple-400/30 backdrop-blur-lg rounded-2xl text-left hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-2 opacity-0 animate-slide-up delay-200 border border-white/20 hover:border-purple-400/50"
            >
              <div className="flex items-center mb-2">
                <Calendar className="w-6 h-6 text-purple-300 mr-2" />
                <h2 className="text-2xl font-bold text-white">새 파티 플랜 만들기</h2>
              </div>
              <p className="text-white/80">친구들과의 생일, 기념일 파티를 멋지게 준비할 수 있어요.</p>
              <ArrowRight className="w-5 h-5 text-purple-300 mt-4 group-hover:translate-x-2 transition-transform" />
            </button>
            
            <button 
              onClick={() => handlePlanRequest('모임')} 
              className="p-8 bg-gradient-to-br from-green-400/30 to-blue-400/30 backdrop-blur-lg rounded-2xl text-left hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-2 opacity-0 animate-slide-up delay-400 border border-white/20 hover:border-blue-400/50"
            >
              <div className="flex items-center mb-2">
                <Users className="w-6 h-6 text-blue-300 mr-2" />
                <h2 className="text-2xl font-bold text-white">새 모임 플랜 만들기</h2>
              </div>
              <p className="text-white/80">가족, 동료, 친구들과의 모임을 간편하게 계획하세요.</p>
              <ArrowRight className="w-5 h-5 text-blue-300 mt-4 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>

        {/* 최근 플랜 섹션 */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">최근 플랜</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 border border-white/30">
              <img 
                src="https://placehold.co/400x250/e0e0e0/333?text=성수동+카페거리" 
                alt="플랜 이미지" 
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-white">성수동 주말 데이트</h3>
                <p className="text-sm text-white/70">2025년 9월 12일</p>
              </div>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 border border-white/30">
              <img 
                src="https://placehold.co/400x250/d1d5db/333?text=강남+연말+파티" 
                alt="플랜 이미지" 
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-white">연말 동기 파티</h3>
                <p className="text-sm text-white/70">2025년 12월 28일</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-xl border-2 border-dashed border-white/30 text-white/50 h-48">
              플랜 없음
            </div>
            
            <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-xl border-2 border-dashed border-white/30 text-white/50 h-48">
              플랜 없음
            </div>
          </div>
        </div>

        {/* 추천 테마 섹션 */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6">추천 테마</h2>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            <div className="flex-shrink-0 w-64 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg p-4 transform hover:-translate-y-1 transition-transform cursor-pointer border border-white/30">
              <h3 className="font-bold text-white">☔ 비 오는 날 실내 데이트</h3>
              <p className="text-sm text-white/70 mt-1">#감성 #파전 #막걸리</p>
            </div>
            
            <div className="flex-shrink-0 w-64 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg p-4 transform hover:-translate-y-1 transition-transform cursor-pointer border border-white/30">
              <h3 className="font-bold text-white">🔥 불금 제대로 즐기기</h3>
              <p className="text-sm text-white/70 mt-1">#홍대 #클럽 #가성비</p>
            </div>
            
            <div className="flex-shrink-0 w-64 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg p-4 transform hover:-translate-y-1 transition-transform cursor-pointer border border-white/30">
              <h3 className="font-bold text-white">👨‍👩‍👧‍👦 가족과 함께하는 주말 나들이</h3>
              <p className="text-sm text-white/70 mt-1">#공원 #자연 #키즈존</p>
            </div>
            
            <div className="flex-shrink-0 w-64 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg p-4 transform hover:-translate-y-1 transition-transform cursor-pointer border border-white/30">
              <h3 className="font-bold text-white">🌙 야경이 아름다운 저녁 데이트</h3>
              <p className="text-sm text-white/70 mt-1">#반포대교 #한강 #야경</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

