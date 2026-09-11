import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import StatCard from "../components/dashboard/StatCard";

import RecentRecordCard from "../components/dashboard/RecentRecordCard";

import {
  getDashboard,
  type DashboardData,
} from "../api/dashboard";

function DashboardPage() {
  /*
   * 서버에서 받은 Dashboard 데이터
   *
   * API 호출 전에는 데이터가 없으므로 null로 시작한다.
   */
  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);

  /*
   * 로딩 상태
   */
  const [loading, setLoading] =
    useState(true);

  /*
   * 에러 메시지
   */
  const [error, setError] =
    useState("");

  /*
   * DashboardPage가 처음 화면에 나타났을 때
   * GET /dashboard 요청을 실행한다.
   */
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);

        setError("");

        const data =
          await getDashboard();

        setDashboard(data);
      } catch (error) {
        console.error(
          "Dashboard API 오류:",
          error,
        );

        setError(
          "대시보드 정보를 불러오지 못했습니다.",
        );
      } finally {
        /*
         * 성공하든 실패하든 로딩 종료
         */
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  /*
   * 서버 응답을 기다리는 동안 보여줄 화면
   */
  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <p className="text-gray-500">
          대시보드를 불러오는 중입니다...
        </p>
      </div>
    );
  }

  /*
   * API 호출 실패
   */
  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <p className="text-red-500">
          {error}
        </p>
      </div>
    );
  }

  /*
   * 로딩은 끝났지만 데이터가 없는 예외 상황
   */
  if (!dashboard) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <p className="text-gray-500">
          대시보드 데이터가 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* 환영 영역 */}
      <section>
        <h1 className="text-3xl font-bold text-gray-800">
          안녕하세요 👋
        </h1>

        <p className="mt-2 text-gray-500">
          오늘도 좋아하는 취미를
          기록해볼까요?
        </p>
      </section>

      {/* 실제 DB 활동 요약 */}
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          나의 활동
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="나의 취미"
            value={
              dashboard.stats.hobbyCount
            }
            unit="개"
          />

          <StatCard
            title="전체 기록"
            value={
              dashboard.stats.recordCount
            }
            unit="개"
          />

          <StatCard
            title="획득 스탬프"
            value={
              dashboard.stats.stampCount
            }
            unit="개"
          />
        </div>
      </section>

      {/* 최근 기록 */}
      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">
            최근 기록
          </h2>

          <Link
            to="/records"
            className="text-sm font-semibold text-orange-500 hover:text-orange-600"
          >
            전체 보기
          </Link>
        </div>

        {dashboard.recentRecords.length ===
        0 ? (
          <div className="rounded-2xl bg-white p-6 text-center text-gray-500 shadow-sm">
            아직 작성한 기록이 없습니다.
          </div>
        ) : (
          <div className="space-y-3">
            {dashboard.recentRecords.map(
              (record) => {
                /*
                 * 현재 HobbyRecord Entity의 제목 필드가
                 * title인지 content인지 확정하지 않았기 때문에
                 * 둘 다 대응하도록 작성했다.
                 *
                 * Entity를 확인한 뒤 하나로 정리하면 된다.
                 */
                const recordTitle =
                  record.title ??
                  record.content ??
                  "취미 기록";

                const formattedDate =
                  new Date(
                    record.createdAt,
                  ).toLocaleDateString(
                    "ko-KR",
                  );

                return (
                  <RecentRecordCard
                    key={record.id}
                    hobby={
                      record.hobby?.name ??
                      "취미"
                    }
                    title={recordTitle}
                    date={formattedDate}
                  />
                );
              },
            )}
          </div>
        )}
      </section>

      {/* 빠른 메뉴 */}
      <section className="mt-10">
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          빠른 메뉴
        </h2>

        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            to="/records"
            className="rounded-2xl bg-orange-500 p-5 font-semibold text-white transition hover:bg-orange-600"
          >
            기록 작성하기
          </Link>

          <Link
            to="/hobbies"
            className="rounded-2xl bg-white p-5 font-semibold text-gray-700 shadow-sm transition hover:-translate-y-1"
          >
            취미 둘러보기
          </Link>

          <Link
            to="/stamps"
            className="rounded-2xl bg-white p-5 font-semibold text-gray-700 shadow-sm transition hover:-translate-y-1"
          >
            스탬프 확인하기
          </Link>
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;