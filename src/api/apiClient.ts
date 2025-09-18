// Axios 인스턴스 및 인터셉터 설정

// 파일 경로: src/api/apiClient.ts
// 역할: 백엔드 서버와 통신하는 axios 인스턴스를 설정하고,
// 모든 API 요청/응답에 대한 전역 설정을 담당합니다.

import axios from 'axios';

// 백엔드 API의 기본 주소를 설정합니다.
// 이렇게 해두면 나중에 API 주소가 변경되었을 때 이 파일만 수정하면 됩니다.
const API_BASE_URL = 'http://localhost:8000/api/v1';

// axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 요청 인터셉터 (Request Interceptor)
 * - 모든 API 요청이 서버로 전송되기 전에 가로채서 특정 작업을 수행합니다.
 * - 여기서는 로컬 스토리지에서 access 토큰을 가져와 'Authorization' 헤더에 담아 보냅니다.
 * - 덕분에 매번 API를 호출할 때마다 헤더를 설정해 줄 필요가 없습니다.
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      // 헤더에 'Bearer' 스키마와 함께 토큰을 추가합니다.
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 요청 설정 중 에러가 발생하면 여기서 처리합니다.
    return Promise.reject(error);
  }
);

/**
 * 응답 인터셉터 (Response Interceptor)
 * - 서버로부터 응답을 받은 후, .then() 이나 .catch()로 처리되기 전에 가로채서 특정 작업을 수행합니다.
 * - 여기서는 access 토큰이 만료되어 401 (Unauthorized) 에러가 발생했을 때,
 * refresh 토큰으로 새로운 access 토큰을 발급받는 로직을 처리합니다.
 */
apiClient.interceptors.response.use(
  (response) => response, // 성공적인 응답은 그대로 반환합니다.
  async (error) => {
    const originalRequest = error.config;

    // 401 에러이고, 이 요청이 재시도된 요청이 아닐 경우에만 토큰 갱신을 시도합니다.
    // _retry 플래그는 무한 재시도를 방지하기 위함입니다.
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 재시도 플래그를 true로 설정

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
            // refresh 토큰이 없으면 로그아웃 처리
            // AuthContext의 logout 함수를 직접 호출할 수 없으므로, 로그인 페이지로 리디렉션합니다.
            localStorage.clear();
            window.location.href = '/login';
            return Promise.reject(error);
        }

        // authAPI에 토큰 갱신 함수를 만들고 사용할 수도 있습니다.
        const response = await axios.post(`${API_BASE_URL}/users/token/refresh/`, {
          refresh: refreshToken,
        });

        const { access } = response.data;
        localStorage.setItem('access_token', access); // 새로운 access 토큰 저장
        
        // 원래 요청의 헤더에 새로운 access 토큰을 설정
        originalRequest.headers.Authorization = `Bearer ${access}`;
        
        // 원래 실패했던 요청을 새로운 토큰으로 다시 보냅니다.
        return apiClient(originalRequest);
      } catch (refreshError) {
        // 리프레시 토큰마저 만료/무효하다면, 모든 인증 정보를 지우고 로그인 페이지로 보냅니다.
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;

