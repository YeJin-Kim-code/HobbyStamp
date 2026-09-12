import api from "./client";

/*
 * 기록에 포함되는 취미 정보
 */
export interface RecordHobby {
  id: number;
  name: string;
}

/*
 * 서버에서 받아오는 기록 타입
 */
export interface HobbyRecord {
  id: number;
  title: string;
  content: string;
  activityDate: string;
  goalAchieved: boolean;
  hobby: RecordHobby;
  createdAt: string;
  updatedAt: string;
}

/*
 * 기록 생성 요청 타입
 */
export interface CreateRecordRequest {
  hobbyId: number;
  title: string;
  content: string;
  activityDate: string;
  goalAchieved: boolean;
}

/*
 * 기록 수정 요청 타입
 */
export interface UpdateRecordRequest {
  title?: string;
  content?: string;
  activityDate?: string;
  goalAchieved?: boolean;
}

/*
 * 기록 목록 응답
 */
interface RecordListResponse {
  message: string;
  data: HobbyRecord[];
}

/*
 * 기록 단일 응답
 */
interface RecordResponse {
  message: string;
  data: HobbyRecord;
}

/*
 * 기록 삭제 응답
 */
interface DeleteRecordResponse {
  message: string;

  data: {
    id: number;
  };
}

/*
 * 전체 기록 조회
 *
 * GET /api/records
 */
export const getRecords = async (): Promise<
  HobbyRecord[]
> => {
  const response =
    await api.get<RecordListResponse>(
      "/api/hobby-records",
    );

  return response.data.data;
};

/*
 * 특정 취미의 기록 조회
 *
 * GET /api/records/hobby/:hobbyId
 */
export const getRecordsByHobby = async (
  hobbyId: number,
): Promise<HobbyRecord[]> => {
  const response =
    await api.get<RecordListResponse>(
      `/api/hobby-records/hobby/${hobbyId}`,
    );

  return response.data.data;
};

/*
 * 기록 상세 조회
 *
 * GET /api/records/:id
 */
export const getRecordById = async (
  recordId: number,
): Promise<HobbyRecord> => {
  const response =
    await api.get<RecordResponse>(
      `/api/hobby-records/${recordId}`,
    );

  return response.data.data;
};

/*
 * 기록 작성
 *
 * POST /api/records
 */
export const createRecord = async (
  data: CreateRecordRequest,
): Promise<HobbyRecord> => {
  const response =
    await api.post<RecordResponse>(
      "/api/hobby-records",
      data,
    );

  return response.data.data;
};

/*
 * 기록 수정
 *
 * PATCH /api/records/:id
 */
export const updateRecord = async (
  recordId: number,
  data: UpdateRecordRequest,
): Promise<HobbyRecord> => {
  const response =
    await api.patch<RecordResponse>(
      `/api/hobby-records/${recordId}`,
      data,
    );

  return response.data.data;
};

/*
 * 기록 삭제
 *
 * DELETE /api/records/:id
 */
export const deleteRecord = async (
  recordId: number,
): Promise<number> => {
  const response =
    await api.delete<DeleteRecordResponse>(
      `/api/hobby-records/${recordId}`,
    );

  return response.data.data.id;
};