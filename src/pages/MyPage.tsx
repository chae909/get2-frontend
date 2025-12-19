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
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden pt-20">
      {/* 배경 장식 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-[350px] h-[350px] bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-gradient-to-br from-pink-200 to-rose-200 rounded-full blur-3xl opacity-20"></div>
      </div>
      
      <div className="container mx-auto p-6 max-w-4xl relative z-10">
        <h1 className="text-2xl md:text-3xl font-extrabold text-black mb-8 leading-relaxed md:leading-relaxed">마이페이지</h1>

        {/* 프로필 정보 섹션 */}
        <div className="bg-gray-50 p-6 rounded-3xl mb-8 flex items-center space-x-6 border border-gray-100">
          <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-sm">
            {user.nickname?.charAt(0) || 'U'}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-extrabold text-black leading-relaxed">{user.nickname || '사용자'}</h2>
            <p className="text-gray-600 text-lg mt-1">{user.email}</p>
            <p className="text-sm text-gray-500 mt-2">GET2와 함께한 지 30일째</p>
          </div>
          <button className="p-3 text-gray-600 hover:text-black transition-colors hover:bg-gray-100 rounded-lg">
            <Settings className="w-6 h-6" />
          </button>
        </div>

        {/* 내 플랜 보관함 섹션 */}
        <div className="bg-gray-50 p-6 rounded-3xl mb-8 border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-black leading-relaxed">내 플랜 보관함</h2>
          <div className="space-y-4">
            <div 
              className="bg-white p-6 rounded-2xl flex justify-between items-center hover:shadow-md cursor-pointer transition-all duration-300 border border-gray-100"
              onClick={() => handlePlanClick('plan1')}
            >
              <div>
                <p className="font-bold text-black text-lg">성수동 주말 데이트</p>
                <p className="text-sm text-gray-600 mt-1">2025년 9월 12일 · 데이트</p>
                <div className="flex items-center mt-2">
                  <MapPin className="w-4 h-4 text-gray-500 mr-1" />
                  <span className="text-sm text-gray-500">성수동, 서울숲</span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${star <= 4 ? 'text-black fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 font-medium">(4/5)</span>
              </div>
            </div>
            
            <div 
              className="bg-white p-6 rounded-2xl flex justify-between items-center hover:shadow-md cursor-pointer transition-all duration-300 border border-gray-100"
              onClick={() => handlePlanClick('plan2')}
            >
              <div>
                <p className="font-bold text-black text-lg">연말 동기 파티</p>
                <p className="text-sm text-gray-600 mt-1">2025년 12월 28일 · 파티</p>
                <div className="flex items-center mt-2">
                  <MapPin className="w-4 h-4 text-gray-500 mr-1" />
                  <span className="text-sm text-gray-500">강남, 홍대</span>
                </div>
              </div>
              <div className="text-sm text-black font-semibold">
                피드백 남기기
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl flex justify-between items-center hover:shadow-md cursor-pointer transition-all duration-300 border border-gray-100">
              <div>
                <p className="font-bold text-black text-lg">가족 나들이</p>
                <p className="text-sm text-gray-600 mt-1">2025년 10월 15일 · 모임</p>
                <div className="flex items-center mt-2">
                  <MapPin className="w-4 h-4 text-gray-500 mr-1" />
                  <span className="text-sm text-gray-500">서울대공원, 과천</span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${star <= 5 ? 'text-black fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 font-medium">(5/5)</span>
              </div>
            </div>
          </div>
        </div>

        {/* 개인 설정 섹션 */}
        <div className="bg-gray-50 p-6 rounded-3xl mb-8 border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-black leading-relaxed">개인 설정</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <p className="text-black font-medium">알림 설정</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-gray-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
              </label>
            </div>
            
            <div className="flex justify-between items-center py-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-600" />
                <p className="text-black font-medium">선호 지역</p>
              </div>
              <button className="text-gray-600 font-semibold hover:text-black transition-colors">
                강남, 홍대 <span className="text-gray-400 ml-1">&gt;</span>
              </button>
            </div>
            
            <div className="flex justify-between items-center py-3">
              <div className="flex items-center space-x-3">
                <Moon className="w-5 h-5 text-gray-600" />
                <p className="text-black font-medium">테마 설정</p>
              </div>
              <button className="text-gray-600 font-semibold hover:text-black transition-colors">
                라이트 모드 <span className="text-gray-400 ml-1">&gt;</span>
              </button>
            </div>
            
            <div className="flex justify-between items-center py-3">
              <div className="flex items-center space-x-3">
                <Settings className="w-5 h-5 text-gray-600" />
                <p className="text-black font-medium">계정 관리</p>
              </div>
              <button className="text-gray-600 font-semibold hover:text-black transition-colors">
                설정 <span className="text-gray-400 ml-1">&gt;</span>
              </button>
            </div>
          </div>
        </div>

        {/* 통계 정보 섹션 */}
        <div className="bg-gray-50 p-6 rounded-3xl mb-8 border border-gray-100">
          <h2 className="text-xl font-bold mb-6 text-black leading-relaxed">나의 플랜 통계</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-6 bg-white rounded-2xl border border-gray-100">
              <p className="text-3xl font-bold text-black">12</p>
              <p className="text-sm text-gray-600 mt-2">총 플랜</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl border border-gray-100">
              <p className="text-3xl font-bold text-black">8</p>
              <p className="text-sm text-gray-600 mt-2">완료한 플랜</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl border border-gray-100">
              <p className="text-3xl font-bold text-black">4.2</p>
              <p className="text-sm text-gray-600 mt-2">평균 평점</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl border border-gray-100">
              <p className="text-3xl font-bold text-black">성수동</p>
              <p className="text-sm text-gray-600 mt-2">선호 지역</p>
            </div>
          </div>
        </div>
        
        {/* 로그아웃 버튼 */}
        <button 
          onClick={handleLogout} 
          className="w-full bg-gray-50 text-black font-semibold py-4 px-6 rounded-2xl hover:bg-gray-100 transition-all duration-300 flex items-center justify-center space-x-2 border border-gray-100"
        >
          <LogOut className="w-5 h-5" />
          <span>로그아웃</span>
        </button>
      </div>
    </div>
  );
};

export default MyPage;