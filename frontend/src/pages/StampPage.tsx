import {
  useEffect,
  useState,
} from "react";

import StampCard from "../components/stamp/StampCard";

import {
  getStamps,
  getStampSummary,
  type Stamp,
  type StampSummary,
  type StampType,
} from "../api/stamp";

/*
 * StampType에 따라
 * 화면에 보여줄 정보를 결정한다.
 *
 * 백엔드는 RECORD_CREATED 같은
 * 프로그램용 값을 보내기 때문에
 *
 * 프론트에서는 사용자가 이해하기 좋은
 * 텍스트와 아이콘으로 변환한다.
 */
function getStampDisplayInfo(
  stampType: StampType,
) {
  switch (stampType) {
    case "GOAL_ACHIEVED":
      return {
        icon: "⭐",
        title: "목표 달성",
        description:
          "설정한 취미 목표를 달성했어요!",
      };

    case "RECORD_CREATED":
    default:
      return {
        icon: "🌱",
        title: "취미 기록",
        description:
          "새로운 취미 기록을 남겼어요.",
      };
  }
}

function StampPage() {
  /*
   * 서버에서 받아온 스탬프 목록
   */
  const [stamps, setStamps] = useState<
    Stamp[]
  >([]);

  /*
   * 취미별 스탬프 개수
   *
   * 예:
   *
   * {
   *   코딩: 5,
   *   독서: 2
   * }
   */
  const [summary, setSummary] =
    useState<StampSummary>({});

  /*
   * API 요청 진행 상태
   */
  const [loading, setLoading] =
    useState(true);

  /*
   * API 요청 실패 메시지
   */
  const [error, setError] =
    useState("");

  /*
   * 페이지가 처음 렌더링되면
   * Stamp API를 호출한다.
   */
  useEffect(() => {
    const fetchStampData = async () => {
      try {
        setLoading(true);
        setError("");

        /*
         * 두 API는 서로 의존하지 않는다.
         *
         * 따라서 순서대로 기다리지 않고
         * Promise.all로 동시에 요청한다.
         */
        const [
          stampData,
          summaryData,
        ] = await Promise.all([
          getStamps(),
          getStampSummary(),
        ]);

        setStamps(stampData);
        setSummary(summaryData);
      } catch (error) {
        console.error(
          "스탬프 조회 실패:",
          error,
        );

        setError(
          "스탬프 정보를 불러오지 못했습니다.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStampData();
  }, []);

  /*
   * 현재 백엔드에서는
   * DB에 저장된 Stamp 자체가
   * 이미 획득한 Stamp를 의미한다.
   */
  const earnedCount = stamps.length;

  /*
   * summary의 key가 취미 이름이다.
   *
   * {
   *   코딩: 3,
   *   독서: 2
   * }
   *
   * Object.keys() 결과:
   *
   * ["코딩", "독서"]
   */
  const hobbyCount =
    Object.keys(summary).length;

  /*
   * 로딩 화면
   */
  if (loading) {
    return (
      <main className="min-h-screen bg-orange-50 px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-gray-500">
            스탬프를 불러오는 중입니다...
          </p>
        </div>
      </main>
    );
  }

  /*
   * 에러 화면
   */
  if (error) {
    return (
      <main className="min-h-screen bg-orange-50 px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-red-500">
            {error}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-orange-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* 페이지 헤더 */}
        <section className="mb-8">
          <p className="text-sm font-semibold text-orange-500">
            My Achievement
          </p>

          <h1 className="mt-1 text-3xl font-bold text-gray-900">
            나의 스탬프
          </h1>

          <p className="mt-2 text-gray-500">
            취미 활동을 기록하고
            스탬프를 모아보세요.
          </p>
        </section>

        {/* 전체 스탬프 현황 */}
        <section className="mb-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              획득한 스탬프
            </p>

            <p className="mt-2 text-3xl font-bold text-orange-500">
              {earnedCount}
              <span className="ml-1 text-lg font-medium text-gray-400">
                개
              </span>
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              활동한 취미
            </p>

            <p className="mt-2 text-3xl font-bold text-orange-500">
              {hobbyCount}
              <span className="ml-1 text-lg font-medium text-gray-400">
                개
              </span>
            </p>
          </div>
        </section>

        {/* 취미별 스탬프 요약 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900">
            취미별 스탬프
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            취미별로 획득한 스탬프를
            확인할 수 있어요.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            {Object.entries(summary).length ===
            0 ? (
              <p className="text-sm text-gray-400">
                아직 획득한 스탬프가
                없습니다.
              </p>
            ) : (
              Object.entries(summary).map(
                ([hobbyName, count]) => (
                  <div
                    key={hobbyName}
                    className="rounded-xl bg-white px-5 py-3 shadow-sm"
                  >
                    <span className="font-semibold text-gray-700">
                      {hobbyName}
                    </span>

                    <span className="ml-2 text-orange-500">
                      {count}개
                    </span>
                  </div>
                ),
              )
            )}
          </div>
        </section>

        {/* 목록 제목 */}
        <section className="mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            획득한 스탬프
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            최근 획득한 스탬프부터
            확인할 수 있어요.
          </p>
        </section>

        {/* 스탬프가 하나도 없는 경우 */}
        {stamps.length === 0 ? (
          <section className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <p className="text-4xl">
              🌱
            </p>

            <p className="mt-4 font-semibold text-gray-700">
              아직 획득한 스탬프가
              없습니다.
            </p>

            <p className="mt-1 text-sm text-gray-400">
              취미 기록을 작성해
              첫 스탬프를 획득해보세요!
            </p>
          </section>
        ) : (
          /*
           * 실제 API 데이터 렌더링
           */
          <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {stamps.map((stamp) => {
              /*
               * 서버 StampType을
               * UI용 데이터로 변환
               */
              const display =
                getStampDisplayInfo(
                  stamp.stampType,
                );

              return (
                <StampCard
                  key={stamp.id}
                  icon={display.icon}
                  title={display.title}
                  description={
                    display.description
                  }
                  hobbyName={
                    stamp.hobby.name
                  }
                  createdAt={
                    stamp.createdAt
                  }
                />
              );
            })}
          </section>
        )}
      </div>
    </main>
  );
}

export default StampPage;