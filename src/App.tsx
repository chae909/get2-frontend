import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import ChatbotPage from './pages/ChatbotPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Header from './components/Header';
import Footer from './components/Footer';

type PageType = 'landing' | 'chatbot' | 'login' | 'signup';

// Main App Component
const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('landing');
  const [pageHistory, setPageHistory] = useState<PageType[]>(['landing']);

  const navigateToPage = (page: PageType) => {
    setCurrentPage(page);
    setPageHistory(prev => [...prev, page]);
  };

  const goBack = () => {
    if (pageHistory.length > 1) {
      const newHistory = [...pageHistory];
      newHistory.pop(); // Remove current page
      const previousPage = newHistory[newHistory.length - 1];
      setCurrentPage(previousPage);
      setPageHistory(newHistory);
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'chatbot':
        return <ChatbotPage onBack={goBack} />;
      case 'login':
        return <LoginPage onBack={goBack} onSignup={() => navigateToPage('signup')} />;
      case 'signup':
        return <SignupPage onBack={goBack} onLogin={() => navigateToPage('login')} />;
      default:
        return (
          <div className="min-h-screen bg-white font-sans">
            <Header 
              onStartChatbot={() => navigateToPage('chatbot')}
              onLogin={() => navigateToPage('login')}
              onSignup={() => navigateToPage('signup')}
            />
            
            <main>
              <LandingPage onStartChatbot={() => navigateToPage('chatbot')} />
            </main>

            <Footer />
          </div>
        );
    }
  };

  return renderCurrentPage();
};

export default App;
