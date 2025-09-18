// src/components/Header.tsx
import React, { useState } from 'react';

// Icons
const PartyPopperIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5.8 11.3 2 22l10.7-3.79" />
    <path d="m14.2 12.7 7.8-7.8-4-4-7.8 7.8-4 4Z" />
    <path d="M12.7 20.2 22 11l-4-4-9.3 9.3Z" />
    <path d="M8.5 2.5 7 4" />
    <path d="m14 8 3-3" />
    <path d="M9.5 17.5 8 19" />
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
const Logo: React.FC = () => (
  <div className="flex items-center space-x-2 sm:space-x-3">
    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-full flex items-center justify-center">
      <PartyPopperIcon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
    </div>
    <div className="text-white">
      <div className="font-bold text-lg sm:text-xl">Get2</div>
      <div className="text-xs opacity-80 hidden sm:block">PLAY YOUR DAY</div>
    </div>
  </div>
);

// Header Component
interface HeaderProps {
  onStartChatbot: () => void;
  onLogin?: () => void;
  onSignup?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onStartChatbot, onLogin, onSignup }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-sm border-b border-white/20">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          <a href="#features" className="text-white/90 hover:text-white transition-colors text-sm xl:text-base">기능</a>
          <a href="#how-it-works" className="text-white/90 hover:text-white transition-colors text-sm xl:text-base">이용방법</a>
          <a href="#pricing" className="text-white/90 hover:text-white transition-colors text-sm xl:text-base">요금제</a>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={onStartChatbot}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold py-2 px-4 xl:px-6 rounded-full transition-all transform hover:scale-105 text-sm xl:text-base"
            >
              AI 상담 시작
            </button>
            
            {onLogin && (
              <button 
                onClick={onLogin}
                className="text-white/90 hover:text-white font-medium transition-colors text-sm xl:text-base"
              >
                로그인
              </button>
            )}
            
            {onSignup && (
              <button 
                onClick={onSignup}
                className="bg-white/20 backdrop-blur-sm text-white font-semibold py-2 px-4 xl:px-6 rounded-full border border-white/30 hover:bg-white/30 transition-all text-sm xl:text-base"
              >
                회원가입
              </button>
            )}
          </div>
        </nav>

        {/* Tablet Navigation */}
        <nav className="hidden md:flex lg:hidden items-center space-x-4">
          <button
            onClick={onStartChatbot}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold py-2 px-4 rounded-full transition-all transform hover:scale-105 text-sm"
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

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          onClick={handleMobileMenuToggle}
        >
          {isMobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/20 backdrop-blur-lg border-t border-white/20">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            <a 
              href="#features" 
              className="text-white/90 hover:text-white transition-colors py-2 px-2 rounded-lg hover:bg-white/10"
              onClick={closeMobileMenu}
            >
              기능
            </a>
            <a 
              href="#how-it-works" 
              className="text-white/90 hover:text-white transition-colors py-2 px-2 rounded-lg hover:bg-white/10"
              onClick={closeMobileMenu}
            >
              이용방법
            </a>
            <a 
              href="#pricing" 
              className="text-white/90 hover:text-white transition-colors py-2 px-2 rounded-lg hover:bg-white/10"
              onClick={closeMobileMenu}
            >
              요금제
            </a>
            
            <div className="pt-2 border-t border-white/20 space-y-3">
              <button
                onClick={() => {
                  onStartChatbot();
                  closeMobileMenu();
                }}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-full transition-all"
              >
                AI 상담 시작
              </button>
              
              {onLogin && (
                <button 
                  onClick={() => {
                    onLogin();
                    closeMobileMenu();
                  }}
                  className="w-full text-white/90 hover:text-white font-medium py-3 px-6 rounded-full hover:bg-white/10 transition-all"
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
                  className="w-full bg-white/20 backdrop-blur-sm text-white font-semibold py-3 px-6 rounded-full border border-white/30 hover:bg-white/30 transition-all"
                >
                  회원가입
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;