// 파일 경로: src/App.tsx
// 역할: 애플리케이션의 전체 페이지 라우팅(경로 설정)을 담당합니다.
// 기존의 useState 기반 페이지 관리 방식에서 react-router-dom을 사용하도록 변경되었습니다.
// 이 방식이 더 표준적이고, URL에 따라 페이지가 명확하게 구분되어 관리가 용이합니다.

import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';

// 페이지 컴포넌트들을 import 합니다. (./ 대신 src/를 기준으로 하는 절대 경로로 수정)
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import MyPage from './pages/MyPage';
import ChatbotPage from './pages/ChatbotPage';
import DemoChatbotPage from './pages/DemoChatbotPage';
// 헤더, 푸터 등 공통 레이아웃 컴포넌트
import Header from './components/Header'; 
import Footer from './components/Footer';
// 로그인이 필요한 페이지를 보호하는 컴포넌트
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // 인증 상태 확인 중에는 로딩 화면을 표시합니다.
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">로딩 중...</div>;
  }
  
  // 로그인/회원가입 페이지가 아닐 때만 헤더와 푸터를 보여주기 위한 조건
  const showHeaderFooter = !['/login', '/signup'].includes(location.pathname);

  // 챗봇 페이지로 이동
  const handleStartChatbot = () => {
    navigate('/chatbot');
  };

  // 데모 챗봇 페이지로 이동
  const handleDemo = () => {
    navigate('/demo-chatbot');
  };

  // 회원가입 페이지로 이동
  const handleGetStarted = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      {showHeaderFooter && (
        <Header 
          onStartChatbot={handleStartChatbot}
          onLogin={() => navigate('/login')}
          onSignup={() => navigate('/signup')}
        />
      )}
      
      <main className="flex-grow">
        <Routes>
          {/* Public Routes - 로그인 여부와 상관없이 접근 가능한 페이지 */}
          <Route path="/" element={
            <LandingPage 
              onStartChatbot={handleStartChatbot}
              onDemo={handleDemo}
              onGetStarted={handleGetStarted}
            />
          } />
          <Route path="/chatbot" element={<ChatbotPage onBack={() => navigate('/')} />} />
          <Route path="/demo-chatbot" element={<DemoChatbotPage onBack={() => navigate('/')} />} />
          
          {/* 로그인한 상태에서 /login 또는 /signup 접근 시 대시보드로 리디렉션 */}
          <Route 
            path="/login" 
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <LoginPage
                  onBack={() => navigate(-1)}
                  onSignup={() => navigate('/signup')}
                />
              )
            } 
          />
          <Route 
            path="/signup" 
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <SignupPage
                  onBack={() => navigate(-1)}
                  onLogin={() => navigate('/login')}
                />
              )
            } 
          />
          
          {/* Protected Routes - 로그인이 반드시 필요한 페이지 */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/mypage"
            element={
              <ProtectedRoute>
                <MyPage />
              </ProtectedRoute>
            }
          />
          
          {/* 일치하는 라우트가 없을 경우 메인 페이지로 리디렉션 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {showHeaderFooter && <Footer />}
    </div>
  );
}

export default App;

