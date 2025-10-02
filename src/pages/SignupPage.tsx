import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Card, CardHeader, CardContent, CardTitle } from '../components/ui';
import { useAuth } from '../contexts/AuthContext';
import type { RegisterUserData } from '../types';

// Icons
const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 19-7-7 7-7"/>
    <path d="M19 12H5"/>
  </svg>
);

const EyeIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeOffIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
    <path d="m10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
    <line x1="2" x2="22" y1="2" y2="22"/>
  </svg>
);

const MailIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
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

interface SignupPageProps {
  onBack: () => void;
  onLogin: () => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ onBack, onLogin }) => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = '이름은 최소 2자 이상이어야 합니다';
    }

    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요';
    }

    if (!formData.password.trim()) {
      newErrors.password = '비밀번호를 입력해주세요';
    } else if (formData.password.length < 8) {
      newErrors.password = '비밀번호는 최소 8자 이상이어야 합니다';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = '비밀번호는 대소문자와 숫자를 포함해야 합니다';
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = '비밀번호 확인을 입력해주세요';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다';
    }

    if (!agreeToTerms) {
      newErrors.terms = '이용약관에 동의해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // 백엔드 API 형식에 맞게 데이터 변환
    // 백엔드 User 모델: username=None, USERNAME_FIELD='email', REQUIRED_FIELDS=['nickname']
    const registerData: RegisterUserData = {
      email: formData.email,
      password: formData.password,
      password_confirm: formData.confirmPassword,
      nickname: formData.name  // 사용자 이름을 nickname으로 사용
    };

    console.log('Sending registration data:', registerData);
    
    try {
      // 회원가입 API 호출
      await register(registerData);
      
      // 회원가입 성공 메시지
      alert('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
      
      // 로그인 페이지로 이동
      navigate('/login');
      
      // 자동 로그인은 일시적으로 비활성화 (로그인 API 문제 해결 후 활성화)
      // await login({ 
      //   email: formData.email, 
      //   password: formData.password 
      // });
      
    } catch (error: any) {
      console.error('Signup error:', error);
      console.error('Error response:', error.response);
      console.error('Error response data:', error.response?.data);
      console.error('Error response status:', error.response?.status);
      console.error('Sent data:', registerData);
      
      // 에러 메시지 처리
      if (error.response?.data) {
        const errorData = error.response.data;
        console.log('Detailed error data:', errorData);
        const newErrors: { [key: string]: string } = {};
        
        // 서버에서 반환된 에러 메시지를 폼 에러로 설정
        if (errorData.email) {
          newErrors.email = Array.isArray(errorData.email) ? errorData.email[0] : errorData.email;
        }
        if (errorData.password) {
          newErrors.password = Array.isArray(errorData.password) ? errorData.password[0] : errorData.password;
        }
        if (errorData.nickname) {
          newErrors.name = Array.isArray(errorData.nickname) ? errorData.nickname[0] : errorData.nickname;
        }
        if (errorData.password_confirm) {
          newErrors.confirmPassword = Array.isArray(errorData.password_confirm) ? errorData.password_confirm[0] : errorData.password_confirm;
        }
        if (errorData.non_field_errors) {
          newErrors.general = Array.isArray(errorData.non_field_errors) ? errorData.non_field_errors[0] : errorData.non_field_errors;
        }
        
        // 구체적인 에러 메시지 매핑
        if (errorData.non_field_errors) {
          const errorMsg = Array.isArray(errorData.non_field_errors) ? errorData.non_field_errors[0] : errorData.non_field_errors;
          
          // 이메일 관련 에러 처리
          if (errorMsg.includes('이메일')) {
            if (errorMsg.includes('이미 존재') || errorMsg.includes('중복')) {
              newErrors.email = '이미 사용 중인 이메일입니다.';
            } else if (errorMsg.includes('형식') || errorMsg.includes('올바르지 않습니다')) {
              newErrors.email = '올바른 이메일 형식을 입력해주세요.';
            } else {
              newErrors.email = errorMsg;
            }
          }
          
          // 비밀번호 관련 에러 처리
          if (errorMsg.includes('비밀번호')) {
            if (errorMsg.includes('너무 짧습니다') || errorMsg.includes('최소')) {
              newErrors.password = '비밀번호는 최소 8자 이상이어야 합니다.';
            } else if (errorMsg.includes('일반적') || errorMsg.includes('약합니다')) {
              newErrors.password = '더 강력한 비밀번호를 사용해주세요.';
            } else if (errorMsg.includes('개인정보') || errorMsg.includes('유사')) {
              newErrors.password = '개인정보와 유사한 비밀번호는 사용할 수 없습니다.';
            } else {
              newErrors.password = errorMsg;
            }
          }
          
          // 닉네임 관련 에러 처리
          if (errorMsg.includes('닉네임')) {
            if (errorMsg.includes('이미 존재') || errorMsg.includes('중복')) {
              newErrors.name = '이미 사용 중인 닉네임입니다.';
            } else {
              newErrors.name = errorMsg;
            }
          }
          
          // 일반적인 에러인 경우
          if (!errorMsg.includes('이메일') && !errorMsg.includes('비밀번호') && !errorMsg.includes('닉네임')) {
            newErrors.general = errorMsg;
          }
        }
        
        // 전체 에러 메시지 표시 (디버깅용)
        if (Object.keys(newErrors).length === 0) {
          newErrors.general = `서버 오류: ${JSON.stringify(errorData)}`;
        }
        
        setErrors(newErrors);
      } else {
        const newErrors: { [key: string]: string } = {};
        newErrors.general = '네트워크 오류가 발생했습니다. 다시 시도해주세요.';
        setErrors(newErrors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    if (password.length === 0) return { strength: 0, text: '', color: '' };
    if (password.length < 6) return { strength: 1, text: '약함', color: 'text-red-500' };
    if (password.length < 8) return { strength: 2, text: '보통', color: 'text-yellow-500' };
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) return { strength: 2, text: '보통', color: 'text-yellow-500' };
    return { strength: 3, text: '강함', color: 'text-green-500' };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="mr-4"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            뒤로가기
          </Button>
          <h1 className="text-lg font-semibold text-gray-800">회원가입</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <PartyPopperIcon className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800 mb-2">
                파티 플래너에 오신 것을 환영해요!
              </CardTitle>
              <p className="text-gray-600">
                계정을 만들고 완벽한 파티를 계획해보세요
              </p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="이름"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="이름을 입력하세요"
                  error={errors.name}
                  leftIcon={<UserIcon className="w-5 h-5" />}
                />

                <Input
                  label="이메일"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="이메일을 입력하세요"
                  error={errors.email}
                  leftIcon={<MailIcon className="w-5 h-5" />}
                />

                <div>
                  <Input
                    label="비밀번호"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="비밀번호를 입력하세요"
                    error={errors.password}
                    rightIcon={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOffIcon className="w-5 h-5" />
                        ) : (
                          <EyeIcon className="w-5 h-5" />
                        )}
                      </button>
                    }
                  />
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              passwordStrength.strength === 1 ? 'bg-red-500 w-1/3' :
                              passwordStrength.strength === 2 ? 'bg-yellow-500 w-2/3' :
                              passwordStrength.strength === 3 ? 'bg-green-500 w-full' : 'w-0'
                            }`}
                          />
                        </div>
                        <span className={`text-sm font-medium ${passwordStrength.color}`}>
                          {passwordStrength.text}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <Input
                  label="비밀번호 확인"
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="비밀번호를 다시 입력하세요"
                  error={errors.confirmPassword}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOffIcon className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </button>
                  }
                />

                <div className="space-y-4">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                      className="w-4 h-4 mt-1 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                    />
                    <span className="ml-3 text-sm text-gray-600">
                      <span className="text-purple-600 hover:text-purple-800 cursor-pointer">이용약관</span>
                      {' '}및{' '}
                      <span className="text-purple-600 hover:text-purple-800 cursor-pointer">개인정보처리방침</span>
                      에 동의합니다
                    </span>
                  </label>
                  {errors.terms && (
                    <p className="text-sm text-red-600">{errors.terms}</p>
                  )}
                </div>

                {errors.general && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{errors.general}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  loading={isLoading}
                  className="mt-6"
                >
                  회원가입
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  이미 계정이 있으신가요?{' '}
                  <button
                    onClick={onLogin}
                    className="text-purple-600 hover:text-purple-800 font-medium transition-colors"
                  >
                    로그인하기
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
