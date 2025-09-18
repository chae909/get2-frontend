// 파일 경로: src/components/ProtectedRoute.tsx
// 역할: 로그인이 필요한 페이지를 감싸는 Wrapper 컴포넌트입니다.
// 사용자가 로그인하지 않은 상태로 이 컴포넌트가 감싸는 페이지에 접근하면 로그인 페이지로 보냅니다.

import React, { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode; // 보호할 페이지 컴포넌트
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // AuthContext에서 인증 상태와 로딩 상태를 가져옵니다.
  const { isAuthenticated, loading } = useAuth();

  // 아직 인증 상태 확인 중(새로고침 직후 등)이라면 로딩 메시지를 보여줍니다.
  if (loading) {
    return <div>로딩 중...</div>;
  }

  // 인증되지 않았다면(로그인하지 않았다면) 로그인 페이지로 리다이렉트합니다.
  // 'replace' 옵션은 브라우저 히스토리에 현재 경로를 남기지 않아,
  // 뒤로 가기를 눌렀을 때 다시 이 페이지로 돌아오는 것을 방지합니다.
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 인증되었다면 자식 컴포넌트(보호하려던 원래 페이지)를 렌더링합니다.
  return <>{children}</>;
};

export default ProtectedRoute;

