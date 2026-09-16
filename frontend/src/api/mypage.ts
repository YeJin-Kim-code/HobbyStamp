import api from "./client";

// ========================================
// 사용자 정보
// ========================================

export interface MyPageUser {
  id: number;
  email: string;
  nickname: string;
  createdAt: string;
}

// ========================================
// 마이페이지 통계
// ========================================

export interface MyPageStats {
  hobbyCount: number;
  recordCount: number;
  stampCount: number;
  postCount: number;
  commentCount: number;
}

// ========================================
// 서버 data 구조
// ========================================

export interface MyPageData {
  user: MyPageUser;
  stats: MyPageStats;
}

// ========================================
// 전체 API 응답
// ========================================

export interface MyPageResponse {
  message: string;
  data: MyPageData;
}

// ========================================
// 마이페이지 조회
// GET /api/mypage
// ========================================

export const getMyPage = async (): Promise<MyPageResponse> => {
  const response = await api.get<MyPageResponse>("/mypage");

  return response.data;
};
