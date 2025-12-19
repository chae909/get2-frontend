// src/components/Header.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User } from 'lucide-react';

// Icons
const SparklesIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .963L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
  </svg>
);

const MenuIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m18 6-12 12" />
    <path d="m6 6 12 12" />
  </svg>
);

// Logo Component
const Logo: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleLogoClick = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="flex items-center space-x-3 sm:space-x-4 cursor-pointer" onClick={handleLogoClick}>
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center shadow-sm">
        <SparklesIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </div>
      <div className="text-black">
        <div className="font-extrabold text-lg sm:text-xl leading-relaxed">Get2</div>
        <div className="text-xs opacity-60 hidden sm:block">PLAY YOUR DAY</div>
      </div>
    </div>
  );
};

// Header Component
interface HeaderProps {
  onStartChatbot: () => void;
  onLogin?: () => void;
  onSignup?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onStartChatbot, onLogin, onSignup }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    closeMobileMenu();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="container mx-auto px-6 sm:px-8 py-4 sm:py-5 flex justify-between items-center">
        <Logo />

        {/* Authenticated User Navigation */}
        {isAuthenticated ? (
          <>
            {/* Desktop Navigation - Authenticated */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-gray-700 hover:text-black transition-colors text-sm xl:text-base font-medium"
              >
                대시보드
              </button>
              <button
                onClick={onStartChatbot}
                className="text-gray-700 hover:text-black transition-colors text-sm xl:text-base font-medium"
              >
                AI 상담
              </button>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => navigate('/mypage')}
                  className="flex items-center space-x-2 bg-gray-50 text-black font-semibold py-2 px-4 xl:px-6 rounded-full border border-gray-200 hover:bg-gray-100 transition-all text-sm xl:text-base"
                >
                  <User className="w-4 h-4" />
                  <span>{user?.nickname || '마이페이지'}</span>
                </button>
                
                <button 
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-black font-medium transition-colors text-sm xl:text-base"
                >
                  로그아웃
                </button>
              </div>
            </nav>

            {/* Tablet Navigation - Authenticated */}
            <nav className="hidden md:flex lg:hidden items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-white/90 hover:text-white transition-colors text-sm"
              >
                대시보드
              </button>
              <button
                onClick={() => navigate('/mypage')}
                className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm text-white font-semibold py-2 px-4 rounded-full border border-white/30 hover:bg-white/30 transition-all text-sm"
              >
                <User className="w-4 h-4" />
                <span>{user?.nickname || '마이페이지'}</span>
              </button>
            </nav>
          </>
        ) : (
          <>
            {/* Desktop Navigation - Unauthenticated */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <a href="#features" className="text-gray-700 hover:text-black transition-colors text-sm xl:text-base font-medium">기능</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-black transition-colors text-sm xl:text-base font-medium">이용방법</a>
              <a href="#pricing" className="text-gray-700 hover:text-black transition-colors text-sm xl:text-base font-medium">요금제</a>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={onStartChatbot}
                  className="bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 xl:px-8 rounded-full transition-all transform hover:scale-105 text-sm xl:text-base"
                >
                  AI 상담 시작
                </button>
                
                {onLogin && (
                  <button 
                    onClick={onLogin}
                    className="text-gray-700 hover:text-black font-medium transition-colors text-sm xl:text-base"
                  >
                    로그인
                  </button>
                )}
                
                {onSignup && (
                  <button 
                    onClick={onSignup}
                    className="bg-gray-50 text-black font-semibold py-3 px-6 xl:px-8 rounded-full border border-gray-200 hover:bg-gray-100 transition-all text-sm xl:text-base"
                  >
                    회원가입
                  </button>
                )}
              </div>
            </nav>

            {/* Tablet Navigation - Unauthenticated */}
            <nav className="hidden md:flex lg:hidden items-center space-x-4">
              <button
                onClick={onStartChatbot}
                className="bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-full transition-all transform hover:scale-105 text-sm"
              >
                AI 상담
              </button>
              
              {onLogin && (
                <button 
                  onClick={onLogin}
                  className="text-white/90 hover:text-white font-medium transition-colors text-sm"
                >
                  로그인
                </button>
              )}
              
              {onSignup && (
                <button 
                  onClick={onSignup}
                  className="bg-white/20 backdrop-blur-sm text-white font-semibold py-2 px-4 rounded-full border border-white/30 hover:bg-white/30 transition-all text-sm"
                >
                  회원가입
                </button>
              )}
            </nav>
          </>
        )}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-black hover:bg-gray-100 rounded-lg transition-colors"
          onClick={handleMobileMenuToggle}
        >
          {isMobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            {isAuthenticated ? (
              <>
                <button 
                  onClick={() => {
                    navigate('/dashboard');
                    closeMobileMenu();
                  }}
                  className="text-gray-700 hover:text-black transition-colors py-2 px-2 rounded-lg hover:bg-gray-50 text-left"
                >
                  대시보드
                </button>
                <button 
                  onClick={() => {
                    onStartChatbot();
                    closeMobileMenu();
                  }}
                  className="text-gray-700 hover:text-black transition-colors py-2 px-2 rounded-lg hover:bg-gray-50 text-left"
                >
                  AI 상담
                </button>
                <button 
                  onClick={() => {
                    navigate('/mypage');
                    closeMobileMenu();
                  }}
                  className="text-gray-700 hover:text-black transition-colors py-2 px-2 rounded-lg hover:bg-gray-50 text-left"
                >
                  마이페이지 ({user?.nickname})
                </button>
                
                <div className="pt-2 border-t border-gray-100">
                  <button
                    onClick={handleLogout}
                    className="w-full text-gray-700 hover:text-black font-medium py-3 px-6 rounded-full hover:bg-gray-50 transition-all text-left"
                  >
                    로그아웃
                  </button>
                </div>
              </>
            ) : (
              <>
                <a 
                  href="#features" 
                  className="text-gray-700 hover:text-black transition-colors py-2 px-2 rounded-lg hover:bg-gray-50"
                  onClick={closeMobileMenu}
                >
                  기능
                </a>
                <a 
                  href="#how-it-works" 
                  className="text-gray-700 hover:text-black transition-colors py-2 px-2 rounded-lg hover:bg-gray-50"
                  onClick={closeMobileMenu}
                >
                  이용방법
                </a>
                <a 
                  href="#pricing" 
                  className="text-gray-700 hover:text-black transition-colors py-2 px-2 rounded-lg hover:bg-gray-50"
                  onClick={closeMobileMenu}
                >
                  요금제
                </a>
                
                <div className="pt-2 border-t border-gray-100 space-y-3">
                  <button
                    onClick={() => {
                      onStartChatbot();
                      closeMobileMenu();
                    }}
                    className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-full transition-all"
                  >
                    AI 상담 시작
                  </button>
                  
                  {onLogin && (
                    <button 
                      onClick={() => {
                        onLogin();
                        closeMobileMenu();
                      }}
                      className="w-full text-gray-700 hover:text-black font-medium py-3 px-6 rounded-full hover:bg-gray-50 transition-all"
                    >
                      로그인
                    </button>
                  )}
                  
                  {onSignup && (
                    <button 
                      onClick={() => {
                        onSignup();
                        closeMobileMenu();
                      }}
                      className="w-full bg-gray-50 text-black font-semibold py-3 px-6 rounded-full border border-gray-200 hover:bg-gray-100 transition-all"
                    >
                      회원가입
                    </button>
                  )}
                </div>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;