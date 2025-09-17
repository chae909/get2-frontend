// src/components/Footer.tsx
import React from 'react';

const PartyPopperIcon = ({ className }: { className?: string }) => (
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
    <path d="M5.8 11.3 2 22l10.7-3.79" />
    <path d="m14.2 12.7 7.8-7.8-4-4-7.8 7.8-4 4Z" />
    <path d="M12.7 20.2 22 11l-4-4-9.3 9.3Z" />
    <path d="M8.5 2.5 7 4" />
    <path d="m14 8 3-3" />
    <path d="M9.5 17.5 8 19" />
  </svg>
);

const Footer: React.FC = () => (
  <footer className="bg-gray-900 text-white py-12 sm:py-16">
    <div className="container mx-auto px-4 sm:px-6 text-center">
      <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-full flex items-center justify-center">
          <PartyPopperIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>
        <div>
          <div className="font-bold text-xl sm:text-2xl">Get2</div>
          <div className="text-xs sm:text-sm opacity-70">PLAY YOUR DAY</div>
        </div>
      </div>
      <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base max-w-md mx-auto">
        모든 순간을 특별하게 만드는 파티 플래닝 파트너
      </p>
      <p className="text-gray-500 text-xs sm:text-sm">
        © 2025 Get2 Inc. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
