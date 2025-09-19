// 파일 경로: src/pages/MyPage.tsx
// 역할: 사용자의 마이페이지 - 프로필 정보, 플랜 보관함, 개인 설정 등을 관리하는 페이지

import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Star, Settings, Bell, MapPin, Moon, LogOut } from 'lucide-react';

const MyPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handlePlanClick = (planId: string) => {
    // 추후 플랜 상세 페이지로 이동 로직
    console.log(`플랜 ${planId} 클릭`);
  };

  // 사용자 정보가 없을 경우 처리
  if (!user) {
    return (
      <div className="container mx-auto p-6 md:p-8 text-center">
        <p>로그인이 필요합니다.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 relative overflow-hidden pt-16 sm:pt-20">
      {/* 배경 장식 */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <svg width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="mypageGrad1" cx="80%" cy="20%" r="40%">
              <stop offset="0%" style={{stopColor: 'rgba(139, 92, 246, 0.3)', stopOpacity:1}} />
              <stop offset="100%" style={{stopColor: 'rgba(139, 92, 246, 0)', stopOpacity:0}} />
            </radialGradient>
            <radialGradient id="mypageGrad2" cx="20%" cy="80%" r="50%">
              <stop offset="0%" style={{stopColor: 'rgba(236, 72, 153, 0.2)', stopOpacity:1}} />
              <stop offset="100%" style={{stopColor: 'rgba(236, 72, 153, 0)', stopOpacity:0}} />
            </radialGradient>
          </defs>
          <circle cx="80%" cy="20%" r="250" fill="url(#mypageGrad1)" className="animate-pulse" style={{animationDuration: '7s'}} />
          <circle cx="20%" cy="80%" r="300" fill="url(#mypageGrad2)" className="animate-pulse" style={{animationDuration: '5s'}} />
        </svg>
      </div>

      <div className="container mx-auto p-6 md:p-8 max-w-4xl relative z-10">
        <h1 className="text-3xl font-bold text-white mb-8">마이페이지</h1>

        {/* 프로필 정보 섹션 */}
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-2xl mb-8 flex items-center space-x-6 opacity-0 animate-slide-up border border-white/20">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {user.nickname?.charAt(0) || 'U'}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white">{user.nickname || '사용자'}</h2>
            <p className="text-white/70">{user.email}</p>
            <p className="text-sm text-white/50 mt-1">GET2와 함께한 지 30일째</p>
          </div>
          <button className="p-2 text-white/60 hover:text-white transition-colors hover:bg-white/10 rounded-lg">
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* 내 플랜 보관함 섹션 */}
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-2xl mb-8 opacity-0 animate-slide-up delay-200 border border-white/20">
          <h2 className="text-xl font-bold mb-4 text-white">내 플랜 보관함</h2>
          <div className="space-y-4">
            <div 
              className="bg-white/10 backdrop-blur-sm p-4 rounded-xl flex justify-between items-center hover:bg-white/20 cursor-pointer transition-all duration-300 border border-white/30"
              onClick={() => handlePlanClick('plan1')}
            >
              <div>
                <p className="font-bold text-white">성수동 주말 데이트</p>
                <p className="text-sm text-white/70">2025년 9월 12일 · 데이트</p>
                <div className="flex items-center mt-1">
                  <MapPin className="w-3 h-3 text-white/50 mr-1" />
                  <span className="text-xs text-white/50">성수동, 서울숲</span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${star <= 4 ? 'text-yellow-400 fill-current' : 'text-white/30'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-white/50">(4/5)</span>
              </div>
            </div>
            
            <div 
              className="bg-white/10 backdrop-blur-sm p-4 rounded-xl flex justify-between items-center hover:bg-white/20 cursor-pointer transition-all duration-300 border border-white/30"
              onClick={() => handlePlanClick('plan2')}
            >
              <div>
                <p className="font-bold text-white">연말 동기 파티</p>
                <p className="text-sm text-white/70">2025년 12월 28일 · 파티</p>
                <div className="flex items-center mt-1">
                  <MapPin className="w-3 h-3 text-white/50 mr-1" />
                  <span className="text-xs text-white/50">강남, 홍대</span>
                </div>
              </div>
              <div className="text-sm text-pink-300 font-medium">
                피드백 남기기
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl flex justify-between items-center hover:bg-white/20 cursor-pointer transition-all duration-300 border border-white/30">
              <div>
                <p className="font-bold text-white">가족 나들이</p>
                <p className="text-sm text-white/70">2025년 10월 15일 · 모임</p>
                <div className="flex items-center mt-1">
                  <MapPin className="w-3 h-3 text-white/50 mr-1" />
                  <span className="text-xs text-white/50">서울대공원, 과천</span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${star <= 5 ? 'text-yellow-400 fill-current' : 'text-white/30'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-white/50">(5/5)</span>
              </div>
            </div>
          </div>
        </div>

        {/* 개인 설정 섹션 */}
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-2xl mb-8 opacity-0 animate-slide-up delay-400 border border-white/20">
          <h2 className="text-xl font-bold mb-4 text-white">개인 설정</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-white/70" />
                <p className="text-white">알림 설정</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-white/20 rounded-full peer peer-focus:ring-4 peer-focus:ring-pink-300/50 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
              </label>
            </div>
            
            <div className="flex justify-between items-center py-2">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-white/70" />
                <p className="text-white">선호 지역</p>
              </div>
              <button className="text-white/70 font-semibold hover:text-white transition-colors">
                강남, 홍대 <span className="text-white/50 ml-1">&gt;</span>
              </button>
            </div>
            
            <div className="flex justify-between items-center py-2">
              <div className="flex items-center space-x-3">
                <Moon className="w-5 h-5 text-white/70" />
                <p className="text-white">테마 설정</p>
              </div>
              <button className="text-white/70 font-semibold hover:text-white transition-colors">
                라이트 모드 <span className="text-white/50 ml-1">&gt;</span>
              </button>
            </div>
            
            <div className="flex justify-between items-center py-2">
              <div className="flex items-center space-x-3">
                <Settings className="w-5 h-5 text-white/70" />
                <p className="text-white">계정 관리</p>
              </div>
              <button className="text-white/70 font-semibold hover:text-white transition-colors">
                설정 <span className="text-white/50 ml-1">&gt;</span>
              </button>
            </div>
          </div>
        </div>

        {/* 통계 정보 섹션 */}
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-2xl mb-8 opacity-0 animate-slide-up delay-600 border border-white/20">
          <h2 className="text-xl font-bold mb-4 text-white">나의 플랜 통계</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-pink-500/20 backdrop-blur-sm rounded-xl border border-pink-400/30">
              <p className="text-2xl font-bold text-pink-300">12</p>
              <p className="text-sm text-white/70">총 플랜</p>
            </div>
            <div className="text-center p-4 bg-blue-500/20 backdrop-blur-sm rounded-xl border border-blue-400/30">
              <p className="text-2xl font-bold text-blue-300">8</p>
              <p className="text-sm text-white/70">완료한 플랜</p>
            </div>
            <div className="text-center p-4 bg-green-500/20 backdrop-blur-sm rounded-xl border border-green-400/30">
              <p className="text-2xl font-bold text-green-300">4.2</p>
              <p className="text-sm text-white/70">평균 평점</p>
            </div>
            <div className="text-center p-4 bg-purple-500/20 backdrop-blur-sm rounded-xl border border-purple-400/30">
              <p className="text-2xl font-bold text-purple-300">성수동</p>
              <p className="text-sm text-white/70">선호 지역</p>
            </div>
          </div>
        </div>
        
        {/* 로그아웃 버튼 */}
        <button 
          onClick={handleLogout} 
          className="w-full bg-white/10 backdrop-blur-sm text-white font-semibold py-3 px-4 rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-2 border border-white/30"
        >
          <LogOut className="w-5 h-5" />
          <span>로그아웃</span>
        </button>
      </div>
    </div>
  );
};

export default MyPage;