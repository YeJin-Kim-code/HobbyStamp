import api from "./client";

// ========================================
// AI 취미 분석 응답 타입
// ========================================

export interface HobbyAnalysisStats {
  totalRecords: number;
  mostActiveHobby: string;
  thisMonthCount: number;
}

export interface HobbyAnalysisData {
  type: string;
  description: string;
  stats: HobbyAnalysisStats;
}

export interface HobbyAnalysisResponse {
  message: string;
  data: HobbyAnalysisData;
}

// ========================================
// AI 취미 유형 분석
// POST /api/ai/me/hobby-analysis
// ========================================

export const analyzeHobby = async (): Promise<HobbyAnalysisResponse> => {
  const response = await api.post<HobbyAnalysisResponse>(
    "/ai/me/hobby-analysis",
  );

  return response.data;
};
