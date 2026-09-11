import api from "./client";

/*
 * 취미 타입
 */
export interface Hobby {
  id: number;

  name: string;

  description: string | null;

  isPinned: boolean;
}

/*
 * 취미 목록 조회 응답
 */
interface HobbyListResponse {
  message: string;

  data: Hobby[];
}

/*
 * 취미 선택/해제 응답
 */
interface HobbyActionResponse {
  message: string;

  data: unknown;
}

/*
 * 전체 취미 목록 조회
 *
 * GET /hobbies
 */
export const getHobbies =
  async (): Promise<Hobby[]> => {
    const response =
      await api.get<HobbyListResponse>(
        "/api/hobbies",
      );

    return response.data.data;
  };

/*
 * 취미 선택
 *
 * POST /hobbies/:id/pin
 */
export const pinHobby = async (
  hobbyId: number,
) => {
  const response =
    await api.post<HobbyActionResponse>(
      `/api/hobbies/${hobbyId}/pin`,
    );

  return response.data.data;
};

/*
 * 취미 선택 해제
 *
 * DELETE /hobbies/:id/pin
 */
export const unpinHobby = async (
  hobbyId: number,
) => {
  const response =
    await api.delete<HobbyActionResponse>(
      `/api/hobbies/${hobbyId}/pin`,
    );

  return response.data.data;
};