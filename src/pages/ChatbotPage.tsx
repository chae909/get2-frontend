import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Dynamic Styles
const DynamicStyles = () => (
  <style>{`
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes typing {
      0% { opacity: .4; transform: translateY(0px) }
      25% { opacity: 1; transform: translateY(-3px) }
      50% { opacity: .4; transform: translateY(0px) }
    }
    
    .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
    .animate-slide-up { animation: slideUp 0.7s ease-out forwards; }
    
    .typing-indicator span {
      height: 8px;
      width: 8px;
      float: left;
      margin: 0 1px;
      background-color: #9E9EA1;
      display: block;
      border-radius: 50%;
      opacity: 0.4;
      animation: typing 1s infinite;
    }
    .typing-indicator span:nth-of-type(2) { animation-delay: .15s; }
    .typing-indicator span:nth-of-type(3) { animation-delay: .3s; }
  `}</style>
);

// Icons
const SendIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m22 2-7 20-4-9-9-4Z"/>
    <path d="M22 2 11 13"/>
  </svg>
);

const BotIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 8V4H8"/>
    <rect width="16" height="12" x="4" y="8" rx="2"/>
    <path d="M2 14h2"/>
    <path d="M20 14h2"/>
    <path d="M15 13v2"/>
    <path d="M9 13v2"/>
  </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const PartyPopperIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5.8 11.3 2 22l10.7-3.79"/>
    <path d="m14.2 12.7 7.8-7.8-4-4-7.8 7.8-4 4Z"/>
    <path d="M12.7 20.2 22 11l-4-4-9.3 9.3Z"/>
    <path d="M8.5 2.5 7 4"/>
    <path d="m14 8 3-3"/>
    <path d="M9.5 17.5 8 19"/>
  </svg>
);

const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 19-7-7 7-7"/>
    <path d="M19 12H5"/>
  </svg>
);

// Types
interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface Question {
  id: string;
  text: string;
  type: 'text' | 'select' | 'checkbox' | 'date' | 'number';
  options?: string[];
  placeholder?: string;
}

interface ChatbotPageProps {
  onBack?: () => void;
}

// Quick Start Options Component
const QuickStartOptions: React.FC<{ onSelect: (option: string) => void }> = ({ onSelect }) => {
  const options = [
    { emoji: '🎂', text: '생일파티', description: '특별한 생일 기념' },
    { emoji: '💼', text: '회사파티', description: '팀빌딩 & 회식' },
    { emoji: '🎓', text: '졸업파티', description: '졸업 축하 모임' },
    { emoji: '🎊', text: '기념일파티', description: '특별한 날 축하' }
  ];

  return (
    <div className="space-y-3 animate-fade-in">
      <p className="text-center text-white/90 mb-4">어떤 파티를 계획하고 계신가요?</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelect(option.text)}
            className="p-4 bg-white/10 backdrop-blur-lg rounded-xl text-left hover:bg-white/20 transition-all duration-300 group border border-white/20 hover:border-white/30"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl group-hover:scale-110 transition-transform">{option.emoji}</span>
              <div>
                <p className="font-semibold text-white">{option.text}</p>
                <p className="text-sm text-white/80">{option.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// Message Component
const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
  const isBot = message.type === 'bot';
  
  return (
    <div className={`flex items-start space-x-3 mb-6 animate-slide-up ${isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
      <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white ${isBot ? 'bg-gradient-to-br from-purple-500 to-pink-500' : 'bg-gradient-to-br from-blue-500 to-blue-600'}`}>
        {isBot ? <BotIcon className="w-4 h-4 sm:w-6 sm:h-6"/> : <UserIcon className="w-4 h-4 sm:w-6 sm:h-6"/>}
      </div>
      
      <div className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-2xl px-4 py-3 ${isBot ? 'bg-gray-100 text-gray-800' : 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'}`}>
        {message.isTyping ? (
          <div className="typing-indicator">
            <span></span><span></span><span></span>
          </div>
        ) : (
          <p className="text-sm sm:text-base leading-relaxed">{message.content}</p>
        )}
      </div>
    </div>
  );
};

// Input Component
const MessageInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  placeholder?: string;
  disabled?: boolean;
}> = ({ value, onChange, onSend, placeholder = "메시지를 입력하세요...", disabled }) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4">
      <div className="flex-1 relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 text-sm sm:text-base disabled:opacity-50 text-white placeholder-white/60"
        />
      </div>
      <button
        onClick={onSend}
        disabled={!value.trim() || disabled}
        className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full hover:shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
      >
        <SendIcon className="w-4 h-4 sm:w-5 sm:h-5"/>
      </button>
    </div>
  );
};

// Main Chatbot Page Component
const ChatbotPage: React.FC<ChatbotPageProps> = ({ onBack }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showQuickStart, setShowQuickStart] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const partyQuestions: Question[] = [
    { id: 'attendees', text: '몇 명 정도 모이실 예정인가요?', type: 'number', placeholder: '예: 10명' },
    { id: 'date', text: '파티 날짜는 언제로 생각하고 계신가요?', type: 'date' },
    { id: 'budget', text: '예산은 어느 정도로 생각하세요?', type: 'select', options: ['상관없음', '인당 5만원 이하', '인당 10만원 이하', '인당 15만원 이하'] },
    { id: 'location', text: '어느 지역을 선호하시나요?', type: 'text', placeholder: '예: 강남구, 홍대 등' },
    { id: 'mood', text: '원하는 분위기를 골라주세요', type: 'select', options: ['#활기찬', '#아늑한', '#럭셔리', '#캐주얼', '#테마파티'] }
  ];

  // 사용자가 메시지를 보낼 때만 스크롤
  const scrollToBottomOnUserMessage = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  useEffect(() => {
    // Initial bot message
    const initialMessage: Message = {
      id: '1',
      type: 'bot',
      content: '안녕하세요! 저는 파티 플래닝 AI 어시스턴트예요. 완벽한 파티를 함께 계획해보아요! ✨',
      timestamp: new Date()
    };
    setMessages([initialMessage]);
  }, []);

  const addMessage = (content: string, type: 'bot' | 'user') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addTypingMessage = () => {
    const typingMessage: Message = {
      id: 'typing',
      type: 'bot',
      content: '',
      timestamp: new Date(),
      isTyping: true
    };
    setMessages(prev => [...prev, typingMessage]);
  };

  const removeTypingMessage = () => {
    setMessages(prev => prev.filter(msg => msg.id !== 'typing'));
  };

  const handleQuickStart = async (option: string) => {
    setShowQuickStart(false);
    addMessage(option, 'user');
    
    // 옵션 선택 후 스크롤
    scrollToBottomOnUserMessage();
    
    // Add typing indicator
    setTimeout(() => {
      addTypingMessage();
      setIsTyping(true);
    }, 300);

    // Bot response after delay
    setTimeout(() => {
      removeTypingMessage();
      addMessage(`${option}를 선택해주셨군요! 멋진 파티를 만들어보아요. 몇 가지 질문을 통해 완벽한 플랜을 짜드릴게요.`, 'bot');
      setIsTyping(false);
      
      // Ask first question
      setTimeout(() => {
        addMessage(partyQuestions[0].text, 'bot');
        setCurrentStep(1);
      }, 1000);
    }, 1500);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;

    addMessage(inputValue, 'user');
    const userInput = inputValue;
    setInputValue('');
    
    // 사용자 메시지 전송 후 스크롤
    scrollToBottomOnUserMessage();

    // Add typing indicator
    setTimeout(() => {
      addTypingMessage();
      setIsTyping(true);
    }, 300);

    // Generate bot response
    setTimeout(() => {
      removeTypingMessage();
      
      if (currentStep < partyQuestions.length && currentStep > 0) {
        // Continue with questions
        addMessage(`${userInput} 좋네요!`, 'bot');
        
        setTimeout(() => {
          if (currentStep < partyQuestions.length) {
            addMessage(partyQuestions[currentStep].text, 'bot');
            setCurrentStep(prev => prev + 1);
          } else {
            // All questions completed
            addMessage('모든 정보를 받았어요! 최고의 파티 플랜을 생성하고 있습니다. 잠시만 기다려주세요... ✨', 'bot');
            setTimeout(() => {
              addMessage('완성되었습니다! 맞춤형 파티 플랜을 확인해보세요. 🎉', 'bot');
            }, 3000);
          }
        }, 1000);
      } else {
        // General conversation
        const responses = [
          '네, 더 자세히 알려주세요!',
          '흥미롭네요! 어떤 도움이 필요하신가요?',
          '파티 계획에 대해 더 구체적으로 말씀해주시면 더 좋은 제안을 드릴 수 있어요.',
          '좋은 아이디어네요! 함께 계획해보아요.'
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        addMessage(randomResponse, 'bot');
      }
      
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-400 to-purple-600 flex flex-col relative overflow-hidden">
      <DynamicStyles />
      
      {/* 정적 배경 */}
      <div className="absolute inset-0 w-full h-full overflow-hidden" aria-hidden="true">
        <svg width="100%" height="100%" preserveAspectRatio="xMidYMid slice" className="pointer-events-none">
          <defs>
            <radialGradient id="chatGrad1" cx="20%" cy="30%" r="40%">
              <stop offset="0%" style={{stopColor: 'rgba(139, 92, 246, 0.2)', stopOpacity:1}} />
              <stop offset="100%" style={{stopColor: 'rgba(139, 92, 246, 0)', stopOpacity:0}} />
            </radialGradient>
            <radialGradient id="chatGrad2" cx="80%" cy="70%" r="50%">
              <stop offset="0%" style={{stopColor: 'rgba(236, 72, 153, 0.15)', stopOpacity:1}} />
              <stop offset="100%" style={{stopColor: 'rgba(236, 72, 153, 0)', stopOpacity:0}} />
            </radialGradient>
          </defs>
          
          <circle cx="20%" cy="30%" r="200" fill="url(#chatGrad1)" />
          <circle cx="80%" cy="70%" r="250" fill="url(#chatGrad2)" />
        </svg>
      </div>
      
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack || (() => navigate('/'))}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors sm:hidden"
            >
              <ArrowLeftIcon className="w-5 h-5 text-white" />
            </button>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <PartyPopperIcon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg sm:text-xl text-white">파티 플래너 AI</h1>
                <p className="text-xs sm:text-sm text-white/80">당신의 완벽한 파티를 위해</p>
              </div>
            </div>
          </div>
          
          <button
            onClick={onBack || (() => navigate('/'))}
            className="hidden sm:flex items-center space-x-2 px-4 py-2 text-white hover:text-white/80 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>돌아가기</span>
          </button>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 pb-4">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            
            {showQuickStart && (
              <div>
                <QuickStartOptions onSelect={handleQuickStart} />
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white/10 backdrop-blur-lg border-t border-white/20 flex-shrink-0">
          <div className="max-w-4xl mx-auto">
            <MessageInput
              value={inputValue}
              onChange={setInputValue}
              onSend={handleSendMessage}
              disabled={isTyping}
              placeholder={showQuickStart ? "또는 직접 입력해보세요..." : "메시지를 입력하세요..."}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;