import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendChatMessage, startConversation, planParty } from '../api/ai';
import type { ChatRequest, PartyPlanRequest } from '../api/ai';
import type { ChatMessage, ConversationContext } from '../types';

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
      <p className="text-center text-gray-600 mb-6 text-lg">어떤 파티를 계획하고 계신가요?</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelect(option.text)}
            className="p-6 bg-white rounded-2xl text-left hover:shadow-md transition-all duration-300 group border border-gray-100 hover:border-gray-200"
          >
            <div className="flex items-center space-x-3">
              <span className="text-3xl group-hover:scale-110 transition-transform">{option.emoji}</span>
              <div>
                <p className="font-bold text-lg leading-relaxed text-black">{option.text}</p>
                <p className="text-sm text-gray-600">{option.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// Message Component
const MessageBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const isBot = message.type === 'bot';
  
  return (
    <div className={`flex items-start space-x-3 mb-6 animate-slide-up ${isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
      <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${isBot ? 'bg-black' : 'bg-gray-100'}`}>
        {isBot ? <BotIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white"/> : <UserIcon className="w-5 h-5 sm:w-6 sm:h-6 text-black"/>}
      </div>
      
      <div className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-2xl px-5 py-4 ${isBot ? 'bg-gray-50 text-black border border-gray-100' : 'bg-black text-white'}`}>
        {message.isTyping ? (
          <div className="typing-indicator">
            <span></span><span></span><span></span>
          </div>
        ) : (
          <p className="text-sm sm:text-base leading-relaxed sm:leading-relaxed">{message.content}</p>
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
    <div className="flex items-center space-x-3 p-4">
      <div className="flex-1 relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full px-5 py-4 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-base disabled:opacity-50 text-black placeholder-gray-500"
        />
      </div>
      <button
        onClick={onSend}
        disabled={!value.trim() || disabled}
        className="p-4 bg-black text-white rounded-2xl hover:shadow-md transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
      >
        <SendIcon className="w-4 h-4 sm:w-5 sm:h-5"/>
      </button>
    </div>
  );
};

// Main Chatbot Page Component
const ChatbotPage: React.FC<ChatbotPageProps> = ({ onBack }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationContext, setConversationContext] = useState<ConversationContext>({});
  const [showQuickStart, setShowQuickStart] = useState(true);
  const [partyPlanStep, setPartyPlanStep] = useState(0); // 파티 플래닝 진행 단계
  const [collectedPartyInfo, setCollectedPartyInfo] = useState<Record<string, any>>({}); // 수집된 파티 정보
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 파티 플래닝 질문들
  const partyQuestions = [
    { key: 'attendees', question: '몇 명 정도 모이실 예정인가요?', type: 'number' },
    { key: 'budget', question: '예산은 어느 정도로 생각하세요?', type: 'text' },
    { key: 'location', question: '어느 지역을 선호하시나요?', type: 'text' },
    { key: 'date', question: '파티 날짜는 언제로 생각하고 계신가요?', type: 'text' },
    { key: 'mood', question: '원하는 분위기나 특별한 요구사항이 있다면 알려주세요!', type: 'text' }
  ];

  // 사용자가 메시지를 보낼 때만 스크롤
  const scrollToBottomOnUserMessage = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  useEffect(() => {
    // Initialize conversation
    const initializeConversation = async () => {
      try {
        const conversation = await startConversation();
        setConversationContext(prev => ({
          ...prev,
          conversation_id: conversation.conversation_id
        }));
        
        // Initial bot message
        const initialMessage: ChatMessage = {
          id: '1',
          type: 'bot',
          content: '안녕하세요! 저는 파티 플래닝 AI 어시스턴트예요. 완벽한 파티를 함께 계획해보아요! ✨',
          timestamp: new Date()
        };
        setMessages([initialMessage]);
      } catch (error) {
        console.error('Failed to initialize conversation:', error);
        
        // Fallback to local message if API fails
        const initialMessage: ChatMessage = {
          id: '1',
          type: 'bot',
          content: '안녕하세요! 저는 파티 플래닝 AI 어시스턴트예요. 완벽한 파티를 함께 계획해보아요! ✨',
          timestamp: new Date()
        };
        setMessages([initialMessage]);
      }
    };
    
    initializeConversation();
  }, []);

  const addMessage = (content: string, type: 'bot' | 'user', metadata?: any) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      metadata
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  };

  const addTypingMessage = () => {
    const typingMessage: ChatMessage = {
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

  // 백엔드 AI 서비스와 통신하는 함수
  const sendMessageToAI = async (userMessage: string, userContext?: any) => {
    try {
      setIsLoading(true);
      
      const chatRequest: ChatRequest = {
        message: userMessage,
        conversation_history: messages.map(msg => ({
          role: msg.type === 'user' ? 'user' : 'assistant',
          content: msg.content,
          timestamp: msg.timestamp.toISOString()
        })),
        user_context: {
          ...conversationContext.preferences,
          ...userContext
        }
      };
      
      const response = await sendChatMessage(chatRequest);
      
      // Update conversation context
      if (response.conversation_id) {
        setConversationContext(prev => ({
          ...prev,
          conversation_id: response.conversation_id
        }));
      }
      
      return response;
    } catch (error: any) {
      console.error('AI API error:', error);
      
      // 백엔드 API가 아직 준비되지 않은 경우를 위한 상세한 폴백 응답
      const fallbackResponses = {
        '생일파티': '생일파티를 계획해주셔서 기쁩니다! 특별한 날을 위해 몇 가지 질문을 드려볼게요. 먼저 몇 명 정도 모이실 예정인가요?',
        '회사파티': '회사 파티 계획이시군요! 팀원들과 즐거운 시간을 보내실 수 있도록 도와드리겠습니다. 참석 예정 인원이 몇 명 정도인가요?',
        '졸업파티': '졸업을 축하드립니다! 🎓 의미있는 졸업 파티를 만들어보아요. 어떤 분위기의 파티를 원하시나요?',
        '기념일파티': '특별한 기념일이시군요! ✨ 어떤 기념일인지 알려주시면 더 맞춤형 제안을 드릴 수 있어요.',
        default: '현재 서버 연결에 문제가 있어 임시로 로컬 모드로 동작합니다. 기본적인 파티 계획 도움을 드릴 수 있어요. 어떤 파티를 계획하고 계신가요?'
      };
      
      const fallbackResponse = fallbackResponses[userMessage as keyof typeof fallbackResponses] || fallbackResponses.default;
      
      return {
        response: fallbackResponse,
        suggestions: ['예산 문의', '장소 추천', '음식 메뉴', '일정 계획']
      };
    } finally {
      setIsLoading(false);
    }
  };

  // 파티 플래닝 전용 API 호출 함수
  const callPartyPlanAPI = async (partyData: Record<string, any>) => {
    try {
      setIsLoading(true);
      
      const planRequest: PartyPlanRequest = {
        party_type: partyData.party_type || '일반파티',
        attendees: partyData.attendees ? parseInt(partyData.attendees) : undefined,
        budget: partyData.budget,
        location: partyData.location,
        date: partyData.date,
        mood: partyData.mood,
        special_requirements: partyData.special_requirements
      };
      
      const response = await planParty(planRequest);
      return response;
    } catch (error: any) {
      console.error('Party planning API error:', error);
      
      // 폴백 응답
      return {
        party_plan: {
          title: `${partyData.party_type || '맞춤형'} 파티 플랜`,
          description: '수집된 정보를 바탕으로 기본 파티 플랜을 제안드립니다.',
          recommendations: [
            `참석 인원: ${partyData.attendees}명에 적합한 장소 추천`,
            `예산: ${partyData.budget}에 맞는 메뉴 구성`,
            `위치: ${partyData.location} 지역의 인기 장소들`,
            `분위기: ${partyData.mood} 컨셉에 어울리는 데코레이션`
          ]
        },
        message: '파티 플랜이 완성되었습니다! 위의 추천사항을 참고해보세요. 🎉'
      };
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickStart = async (option: string) => {
    setShowQuickStart(false);
    addMessage(option, 'user');
    
    // Update preferences
    setConversationContext(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        party_type: option
      }
    }));
    
    // 파티 정보 수집 시작
    setCollectedPartyInfo({ party_type: option });
    setPartyPlanStep(1);
    
    // 옵션 선택 후 스크롤
    scrollToBottomOnUserMessage();
    
    // Add typing indicator
    setTimeout(() => {
      addTypingMessage();
      setIsTyping(true);
    }, 300);

    // Bot response with first question
    setTimeout(() => {
      removeTypingMessage();
      
      addMessage(`${option}를 선택해주셨군요! 멋진 파티를 만들어보아요. 🎉`, 'bot');
      
      // 첫 번째 질문 시작
      setTimeout(() => {
        if (partyQuestions.length > 0) {
          addMessage(partyQuestions[0].question, 'bot');
        }
      }, 1000);
      
      setIsTyping(false);
    }, 1000);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping || isLoading) return;

    const userInput = inputValue;
    addMessage(userInput, 'user');
    setInputValue('');
    
    // 사용자 메시지 전송 후 스크롤
    scrollToBottomOnUserMessage();

    // Add typing indicator
    setTimeout(() => {
      addTypingMessage();
      setIsTyping(true);
    }, 300);

    // 파티 플래닝 단계에 따른 처리
    setTimeout(async () => {
      removeTypingMessage();
      
      if (partyPlanStep > 0 && partyPlanStep <= partyQuestions.length) {
        // 파티 정보 수집 중
        const currentQuestion = partyQuestions[partyPlanStep - 1];
        const updatedInfo = {
          ...collectedPartyInfo,
          [currentQuestion.key]: userInput
        };
        setCollectedPartyInfo(updatedInfo);
        
        if (partyPlanStep < partyQuestions.length) {
          // 다음 질문
          addMessage('좋네요! 👍', 'bot');
          setTimeout(() => {
            const nextQuestion = partyQuestions[partyPlanStep];
            addMessage(nextQuestion.question, 'bot');
            setPartyPlanStep(prev => prev + 1);
          }, 1000);
        } else {
          // 모든 질문 완료 - 파티 플래닝 API 호출
          addMessage('모든 정보를 받았어요! 최고의 파티 플랜을 생성하고 있습니다... ✨', 'bot');
          
          try {
            const partyPlan = await callPartyPlanAPI(updatedInfo);
            
            setTimeout(() => {
              if (partyPlan.party_plan) {
                addMessage(`🎉 ${partyPlan.party_plan.title}\n\n${partyPlan.party_plan.description}\n\n추천사항:\n${partyPlan.party_plan.recommendations.join('\n')}`, 'bot');
              } else {
                addMessage(partyPlan.message || '완성되었습니다! 맞춤형 파티 플랜을 확인해보세요. 🎉', 'bot');
              }
              setPartyPlanStep(0); // 플래닝 완료
            }, 2000);
          } catch (error) {
            setTimeout(() => {
              addMessage('파티 플랜 생성 중 오류가 발생했습니다. 다시 시도해주세요.', 'bot');
              setPartyPlanStep(0);
            }, 1000);
          }
        }
      } else {
        // 일반 대화 - 기본 AI API 사용
        try {
          const response = await sendMessageToAI(userInput);
          addMessage(response.response, 'bot', {
            suggestions: response.suggestions,
            intent: response.metadata?.intent,
            party_recommendations: response.metadata?.party_recommendations
          });
        } catch (error) {
          console.error('Failed to send message:', error);
          addMessage('죄송합니다. 메시지 처리 중 오류가 발생했습니다. 다시 시도해주세요.', 'bot');
        }
      }
      
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 flex flex-col relative overflow-hidden">
      <DynamicStyles />
      
      {/* 배경 장식 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full blur-3xl opacity-15"></div>
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-15"></div>
      </div>
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack || (() => navigate('/'))}
              className="p-2 hover:bg-gray-50 rounded-full transition-colors sm:hidden"
            >
              <ArrowLeftIcon className="w-5 h-5 text-black" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                <PartyPopperIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-extrabold text-lg sm:text-xl text-black leading-relaxed sm:leading-relaxed">파티 플래너 AI</h1>
                <p className="text-xs text-gray-600 leading-relaxed">당신의 완벽한 파티를 위해</p>
              </div>
            </div>
          </div>
          
          <button
            onClick={onBack || (() => navigate('/'))}
            className="hidden sm:flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>돌아가기</span>
          </button>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="max-w-4xl mx-auto space-y-4 pb-4">
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
        <div className="bg-white border-t border-gray-100 flex-shrink-0">
          <div className="max-w-4xl mx-auto">
            <MessageInput
              value={inputValue}
              onChange={setInputValue}
              onSend={handleSendMessage}
              disabled={isTyping || isLoading}
              placeholder={showQuickStart ? "또는 직접 입력해보세요..." : "메시지를 입력하세요..."}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;