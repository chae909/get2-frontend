// 파일 경로: src/main.tsx
// 역할: React 애플리케이션의 진입점(entry point)입니다.
// 전체 앱을 감싸는 최상위 Provider들을 설정합니다.

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './contexts/AuthContext'; // 👈 AuthProvider import
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/*
      <BrowserRouter>
      - react-router-dom을 사용하기 위해 App 전체를 감싸줍니다.
      - 이를 통해 App 및 하위 컴포넌트에서 라우팅 관련 기능(useNavigate, Routes 등)을 사용할 수 있습니다.
    */}
    <BrowserRouter>
      {/*
        <AuthProvider>
        - 우리가 만든 AuthContext의 Provider입니다.
        - App 전체를 감싸주어, 모든 컴포넌트가 useAuth() 훅을 통해
          사용자 정보, 로그인 상태, 로그인/로그아웃 함수 등에 접근할 수 있게 해줍니다.
      */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

