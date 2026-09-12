import api from "./client";

/*
 * 스탬프 타입
 *
 * 백엔드의 StampType enum과 동일하게 맞춘다.
 */
export type StampType =
  | "RECORD_CREATED"
  | "GOAL_ACHIEVED";

/*
 * 스탬프와 함께 전달되는 취미 정보
 *
 * 현재 화면에서 필요한 값만 정의한다.
 */
export interface StampHobby {
  id: number;
  name: string;
}

/*
 * 스탬프와 연결된 기록 정보
 *
 * 현재 화면에서는 id와 title 정도만 필요하다.
 */
export interface StampRecord {
  id: number;
  title?: string;
}

/*
 * 서버에서 받아오는 실제 Stamp 데이터
 */
export interface Stamp {
  id: number;
  stampType: StampType;
  createdAt: string;

  hobby: StampHobby;
  record: StampRecord;
}

/*
 * 스탬프 목록 API 응답
 *
 * 백엔드:
 *
 * {
 *   message: "스탬프 목록 조회 성공",
 *   data: [...]
 * }
 */
interface StampListResponse {
  message: string;
  data: Stamp[];
}

/*
 * 스탬프 요약
 *
 * 백엔드에서는 이런 형태를 반환한다.
 *
 * {
 *   "코딩": 5,
 *   "독서": 2
 * }
 */
export type StampSummary =
  Record<string, number>;

/*
 * 스탬프 요약 API 응답
 */
interface StampSummaryResponse {
  message: string;
  data: StampSummary;
}

/*
 * 내 스탬프 목록 조회
 *
 * GET /api/stamps
 */
export const getStamps = async (): Promise<
  Stamp[]
> => {
  const response =
    await api.get<StampListResponse>(
      "/api/stamps",
    );

  return response.data.data;
};

/*
 * 내 스탬프 요약 조회
 *
 * GET /api/stamps/summary
 */
export const getStampSummary =
  async (): Promise<StampSummary> => {
    const response =
      await api.get<StampSummaryResponse>(
        "/api/stamps/summary",
      );

    return response.data.data;
  };