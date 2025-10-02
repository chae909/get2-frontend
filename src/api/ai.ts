// AI 서비스 API 함수들
// 파일 경로: src/api/ai.ts
// 역할: 백엔드의 AI 서비스와 통신하는 API 함수들을 정의합니다.

import apiClient from './apiClient';

/**
 * 채팅 메시지 타입
 */
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

/**
 * 채팅 요청 데이터 타입
 */
export interface ChatRequest {
  message: string;
  // 백엔드에서 필요한 추가 필드들
  conversation_history?: ChatMessage[];
  user_context?: {
    party_type?: string;
    preferences?: Record<string, any>;
  };
}

/**
 * 파티 플래닝 요청 데이터 타입
 */
export interface PartyPlanRequest {
  party_type: string;
  attendees?: number;
  budget?: string;
  location?: string;
  date?: string;
  mood?: string;
  special_requirements?: string;
  [key: string]: any;
}

/**
 * 채팅 응답 데이터 타입
 */
export interface ChatResponse {
  response: string;
  conversation_id?: string;
  suggestions?: string[];
  metadata?: {
    intent?: string;
    confidence?: number;
    party_recommendations?: any[];
  };
}

/**
 * AI 챗봇과 대화하는 API 함수
 * @param chatData 사용자 메시지와 컨텍스트 정보
 * @returns AI의 응답 메시지
 */
export const sendChatMessage = async (chatData: ChatRequest): Promise<ChatResponse> => {
  try {
    const response = await apiClient.post('/ai/ask/', chatData);
    return response.data;
  } catch (error) {
    console.error('Chat API error:', error);
    throw error;
  }
};

/**
 * 대화 세션을 시작하는 함수 (로컬에서 세션 ID 생성)
 * @returns 새로운 대화 세션 정보
 */
export const startConversation = async () => {
  // 대화 세션을 로컬에서 관리하고, 실제 API 호출은 필요시에만
  const conversationId = `conversation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  return {
    conversation_id: conversationId,
    status: 'started'
  };
};

/**
 * 파티 플래닝 전용 API 함수
 * @param planData 파티 플래닝 정보
 * @returns 파티 플랜 추천 결과
 */
export const planParty = async (planData: PartyPlanRequest) => {
  try {
    const response = await apiClient.post('/ai/party/plan/', planData);
    return response.data;
  } catch (error) {
    console.error('Party planning API error:', error);
    throw error;
  }
};

/**
 * AI 서비스 상태 확인 API 함수
 * @returns 서비스 상태 정보
 */
export const checkAIHealth = async () => {
  try {
    const response = await apiClient.get('/ai/health/');
    return response.data;
  } catch (error) {
    console.error('AI health check error:', error);
    throw error;
  }
};