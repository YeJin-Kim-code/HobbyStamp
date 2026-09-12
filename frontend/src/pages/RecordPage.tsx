import {
  useEffect,
  useState,
} from "react";

import RecordCard from "../components/record/RecordCard";
import RecordForm from "../components/record/RecordForm";

import {
  createRecord,
  getRecords,
} from "../api/recordApi";

import type {
  CreateRecordRequest,
  HobbyRecord,
} from "../api/recordApi";

import {
  getHobbies,
} from "../api/hobby";

import type {
  Hobby,
} from "../api/hobby";

function RecordPage() {
  /*
   * 서버에서 받아온 실제 기록
   */
  const [records, setRecords] =
    useState<HobbyRecord[]>([]);

  /*
   * 서버에서 받아온 취미 목록
   */
  const [hobbies, setHobbies] =
    useState<Hobby[]>([]);

  /*
   * API 로딩 상태
   */
  const [isLoading, setIsLoading] =
    useState(true);

  /*
   * API 오류 메시지
   */
  const [error, setError] =
    useState("");

  /*
   * 페이지 최초 진입 시
   *
   * GET /api/records
   * GET /api/hobbies
   *
   * 두 API를 호출한다.
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError("");

        /*
         * 서로 의존하지 않는 API이므로
         * Promise.all로 동시에 호출한다.
         */
        const [
          recordData,
          hobbyData,
        ] = await Promise.all([
          getRecords(),
          getHobbies(),
        ]);

        setRecords(recordData);

        setHobbies(hobbyData);
      } catch (error) {
        console.error(
          "기록 페이지 조회 실패:",
          error,
        );

        setError(
          "기록을 불러오지 못했습니다.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  /*
   * 기록 생성
   *
   * RecordForm
   *      ↓
   * createRecord()
   *      ↓
   * POST /api/records
   *      ↓
   * DB 저장
   */
  const handleAddRecord = async (
    newRecord: CreateRecordRequest,
  ) => {
    try {
      setError("");

      const createdRecord =
        await createRecord(newRecord);

      /*
       * 새로 생성된 기록을
       * 목록 가장 위에 추가한다.
       *
       * 서버에서 다시 전체 목록을
       * 조회하지 않아도 된다.
       */
      setRecords((prevRecords) => [
        createdRecord,
        ...prevRecords,
      ]);
    } catch (error) {
      console.error(
        "기록 작성 실패:",
        error,
      );

      setError(
        "기록을 저장하지 못했습니다.",
      );

      /*
       * RecordForm이 실패 사실을
       * 알 수 있도록 다시 throw 한다.
       */
      throw error;
    }
  };

  return (
    <main className="min-h-screen bg-orange-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        {/* 페이지 제목 */}
        <section className="mb-8">
          <p className="mb-2 text-sm font-bold text-orange-500">
            MY RECORD
          </p>

          <h1 className="text-3xl font-bold text-gray-900">
            취미 기록
          </h1>

          <p className="mt-2 text-gray-500">
            오늘의 취미 활동을 기록하고
            작은 성장을 모아보세요.
          </p>
        </section>

        {/* 오류 메시지 */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
          {/* 기록 입력 폼 */}
          <section>
            <RecordForm
              hobbies={hobbies}
              onAddRecord={
                handleAddRecord
              }
            />
          </section>

          {/* 기록 목록 */}
          <section>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                최근 기록
              </h2>

              <span className="text-sm text-gray-500">
                총 {records.length}개
              </span>
            </div>

            {isLoading ? (
              <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
                <p className="text-gray-500">
                  기록을 불러오는 중...
                </p>
              </div>
            ) : records.length === 0 ? (
              <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
                <p className="text-gray-500">
                  아직 작성한 기록이
                  없습니다.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {records.map(
                  (record) => (
                    <RecordCard
                      key={record.id}
                      hobby={
                        record.hobby.name
                      }
                      title={
                        record.title
                      }
                      content={
                        record.content
                      }
                      activityDate={
                        record.activityDate
                      }
                      goalAchieved={
                        record.goalAchieved
                      }
                    />
                  ),
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

export default RecordPage;