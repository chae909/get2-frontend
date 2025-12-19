// src/components/Footer.tsx
import React from 'react';

const SparklesIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .963L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
  </svg>
);

const Footer: React.FC = () => (
  <footer className="bg-gray-900 text-white py-12 sm:py-16">
    <div className="container mx-auto px-4 sm:px-6 text-center">
      <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-100 to-gray-300 rounded-2xl flex items-center justify-center shadow-sm">
          <SparklesIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" />
        </div>
        <div>
          <div className="font-extrabold text-lg sm:text-xl leading-relaxed">Get2</div>
          <div className="text-xs sm:text-sm opacity-70">PLAY YOUR DAY</div>
        </div>
      </div>
      <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
        모든 순간을 특별하게 만드는 파티 플래닝 파트너
      </p>
      <p className="text-gray-500 text-xs sm:text-sm">
        © 2025 Get2 Inc. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
