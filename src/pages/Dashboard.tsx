// 파일 경로: src/pages/Dashboard.tsx
// 역할: 로그인을 성공한 사용자에게 보여줄 대시보드 페이지입니다. (예시)

import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  // useAuth 훅을 사용해 현재 로그인된 사용자 정보와 로그아웃 함수를 가져옵니다.
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // 로그아웃 후 로그인 페이지로 이동
  }

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>환영합니다, {user?.nickname}님!</h1>
      <p>로그인이 성공적으로 완료되었습니다.</p>
      <p>이메일: {user?.email}</p>
      <button 
        onClick={handleLogout} 
        style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
      >
        로그아웃
      </button>
    </div>
  );
};

export default Dashboard;

