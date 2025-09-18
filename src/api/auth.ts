// 파일 경로: src/api/auth.ts
// 역할: 인증(회원가입, 로그인, 로그아웃 등)과 관련된 API 함수들을 모아놓은 파일입니다.

import apiClient from './apiClient';
import type { LoginCredentials, RegisterUserData } from '../types/index';

export const authAPI = {
  /**
   * 회원가입 API를 호출합니다.
   * @param {RegisterUserData} userData - 회원가입에 필요한 정보 (email, password, password_confirm, nickname)
   * @returns {Promise<any>} 서버의 응답 데이터
   */
  register: async (userData: RegisterUserData) => {
    const response = await apiClient.post('/users/register/', userData);
    return response.data;
  },

  /**
   * 로그인 API를 호출합니다.
   * @param {LoginCredentials} credentials - 로그인에 필요한 정보 (email, password)
   * @returns {Promise<any>} 서버의 응답 데이터 (user 정보, tokens 포함)
   */
  login: async (credentials: LoginCredentials) => {
    const response = await apiClient.post('/users/login/', credentials);
    return response.data;
  },

  /**
   * 로그아웃 API를 호출합니다.
   * @param {string} refreshToken - 서버에서 무효화할 리프레시 토큰
   * @returns {Promise<any>} 서버의 응답 데이터
   */
  logout: async (refreshToken: string) => {
    // 백엔드에서 로그아웃 시 refresh 토큰을 받아 처리하도록 구현되어 있어야 합니다.
    const response = await apiClient.post('/users/logout/', {
      refresh: refreshToken,
    });
    return response.data;
  },

  /**
   * 현재 로그인된 사용자의 프로필 정보를 가져오는 API를 호출합니다.
   * (요청 시 apiClient의 인터셉터가 자동으로 Authorization 헤더를 추가해줍니다.)
   * @returns {Promise<any>} 사용자 프로필 데이터
   */
  getProfile: async () => {
    const response = await apiClient.get('/users/profile/');
    return response.data;
  },
};

