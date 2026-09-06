import api from "./client";

// ===============================
// 회원가입
// ===============================

// 프론트 → 백엔드로 보내는 회원가입 데이터
export interface SignupRequest {
    email:string;
    password: string;
    nickname: string;
}

// 백엔드가 회원가입 성공 시 반환하는 User 데이터
export interface SignupUser {
  id: number;
  email: string;
  nickname: string;
  createdAt: string;
}


// 실제 백엔드 응답 구조
export interface SignupResponse {
  message: string;

  data: SignupUser;
}

export const signup = async (
    signupData: SignupRequest,
): Promise<SignupResponse> => {
    const response = await api.post<SignupResponse>(
        "/auth/signup",
        signupData,
    );
    return response.data;
};

// ===============================
// 로그인
// ===============================

// 프론트 → 백엔드 로그인 데이터
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginUser {
  id: number;
  email: string;
  nickname: string;
}

// 백엔드 AuthService.login()이 반환하는 데이터
export interface LoginData {
  accessToken: string;

  user: LoginUser;
}

// Controller 최종 응답
export interface LoginResponse {
  message: string;

  data: LoginData;
}

export const login = async (
  loginData: LoginRequest,
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(
    "/auth/login",
    loginData,
  );

  return response.data;
};