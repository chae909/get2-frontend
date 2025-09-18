// 파일 경로: src/types/index.ts
// 역할: 프로젝트 전반에서 사용되는 TypeScript 타입들을 정의하고 관리하는 파일입니다.
// 이렇게 타입을 한 곳에서 관리하면 재사용성이 높아지고 코드 안정성이 향상됩니다.

/**
 * 사용자 정보 객체의 타입
 */
export interface User {
  id: string;
  email: string;
  nickname: string;
}

/**
 * 로그인 폼에서 사용하는 데이터의 타입
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * 회원가입 폼에서 사용하는 데이터의 타입
 * LoginCredentials를 상속받아 이메일과 비밀번호 필드를 포함합니다.
 */
export interface RegisterUserData extends LoginCredentials {
    nickname: string;
    password_confirm: string;
}
