import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import SimpleChatbot from './pages/SimpleChatbot'
import Header from './components/Header';
import Footer from './components/Footer';

// Main App Component
const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'landing' | 'chatbot'>('landing');

  const handleStartChatbot = () => {
    setCurrentPage('chatbot');
  };

  if (currentPage === 'chatbot') {
    return <SimpleChatbot/>;
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header onStartChatbot={handleStartChatbot} />
      
      <main>
        <LandingPage />
      </main>

      <Footer />
    </div>
  );
};

export default App;
