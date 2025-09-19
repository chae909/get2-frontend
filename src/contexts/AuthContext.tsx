// 파일 경로: src/contexts/AuthContext.tsx
// 역할: React의 Context API를 사용하여 앱 전반에 걸쳐 사용자 인증 상태를 공유하고 관리합니다.
// 이 파일을 통해 어떤 컴포넌트에서든 로그인한 유저 정보나 로그인/로그아웃 함수에 접근할 수 있습니다.

import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { authAPI } from '../api/auth'; // 👈 [수정] 절대 경로에서 상대 경로로 변경
import type { User, LoginCredentials, RegisterUserData } from '../types'; // 👈 [수정] 절대 경로에서 상대 경로로 변경

// Context에 담길 값들의 타입을 정의합니다.
interface AuthContextType {
  user: User | null;         // 로그인된 사용자 정보, 비로그인 시 null
  loading: boolean;          // 인증 상태를 확인하는 중인지 여부
  isAuthenticated: boolean;  // 현재 로그인 되어 있는지 여부
  login: (credentials: LoginCredentials) => Promise<any>;
  register: (userData: RegisterUserData) => Promise<any>;
  logout: () => void;
}

// Context 객체 생성. 초기값은 undefined.
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 다른 컴포넌트에서 쉽게 AuthContext를 사용할 수 있도록 도와주는 커스텀 훅(hook)
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    // AuthProvider 외부에서 useAuth를 호출하면 에러를 발생시켜 실수를 방지합니다.
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider 컴포넌트의 props 타입을 정의합니다. children을 받아야 합니다.
interface AuthProviderProps {
    children: ReactNode;
}

// 앱 전체에 인증 관련 상태와 함수들을 제공하는 Provider 컴포넌트
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 컴포넌트가 처음 렌더링될 때 한 번만 실행됩니다.
  // 페이지 새로고침 시 로컬 스토리지에 토큰이 있는지 확인하여 로그인 상태를 복원합니다.
  useEffect(() => {
    const initAuth = () => {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      const userData = localStorage.getItem('user');

      if (token && userData) {
        try {
          // 저장된 사용자 정보가 유효한 JSON인지 확인하고 상태를 업데이트합니다.
          setUser(JSON.parse(userData));
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Auth initialization failed: Invalid user data', error);
          logout(); // 파싱 실패 시 모든 정보 삭제
        }
      }
      setLoading(false); // 상태 확인이 끝났으므로 로딩 상태를 해제
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    // try-catch를 사용해 API 호출 시 발생할 수 있는 에러를 처리합니다.
    try {
      console.log('Attempting login with credentials:', { email: credentials.email, password: '[HIDDEN]' });
      const response = await authAPI.login(credentials);
      console.log('Login API response:', response);
      
      // 서버로부터 받은 토큰과 사용자 정보를 로컬 스토리지에 저장합니다.
      localStorage.setItem('access_token', response.tokens.access);
      localStorage.setItem('refresh_token', response.tokens.refresh);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      // 앱의 상태(state)를 업데이트하여 UI를 변경합니다.
      setUser(response.user);
      setIsAuthenticated(true);
      
      // 로그인 성공 시 환영 메시지 표시
      alert(`${response.user.nickname || response.user.email}님, 환영합니다! 🎉`);
      
      return response;
    } catch (error: any) {
      console.error('Login failed:', error);
      console.error('Login error details:', {
        response: error.response,
        data: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });
      throw error; // 에러를 다시 던져서 컴포넌트에서 추가적인 처리를 할 수 있게 합니다.
    }
  };

  const register = async (userData: RegisterUserData) => {
    try {
      console.log('Sending registration request with data:', userData);
      const response = await authAPI.register(userData);
      console.log('Registration successful:', response);
      return response;
    } catch (error: any) {
      console.error('Registration failed:', error);
      console.error('Error details:', {
        response: error.response,
        data: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });
      throw error;
    }
  };

  const logout = async () => {
    // 로그아웃 시 서버에 알리기 위해 API를 호출할 수 있습니다. (선택사항)
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        await authAPI.logout(refreshToken);
      }
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      // API 호출 성공 여부와 관계없이 로컬 스토리지의 모든 인증 정보를 삭제합니다.
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      
      // 앱의 상태를 초기화합니다.
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  // Context를 통해 하위 컴포넌트에 전달할 값들을 객체로 묶습니다.
  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

