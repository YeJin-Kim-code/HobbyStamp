import api from "./client";

/*
 * Dashboard에서 사용하는 취미 타입
 */
export interface DashboardHobby {
  id: number;
  name: string;
}

/*
 * 최근 기록 타입
 *
 * 백엔드 HobbyRecord Entity 전체 구조에 따라
 * title/content 등의 이름은 추후 DTO로 더 깔끔하게
 * 통일할 수 있다.
 */
export interface RecentRecord {
  id: number;

  title?: string;

  content?: string;

  createdAt: string;

  hobby: DashboardHobby;
}

/*
 * 최근 스탬프
 */
export interface RecentStamp {
  id: number;
  createdAt: string;
}

/*
 * 실제 dashboard 데이터
 */
export interface DashboardData {
  stats: {
    hobbyCount: number;
    recordCount: number;
    stampCount: number;
  };

  recentRecords: RecentRecord[];

  recentStamps: RecentStamp[];
}

/*
 * 백엔드 공통 응답 구조
 *
 * {
 *   message: "...",
 *   data: ...
 * }
 */
interface DashboardResponse {
  message: string;
  data: DashboardData;
}

/*
 * GET /dashboard
 */
export const getDashboard = async (): Promise<DashboardData> => {
    const response = await api.get<DashboardResponse>(
        "./dashboard",
    );

    return response.data.data;
};