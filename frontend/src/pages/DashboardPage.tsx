import { Link } from "react-router-dom";

import StatCard from "../components/dashboard/StatCard";
import RecentRecordCard from "../components/dashboard/RecentRecordCard";

function DashboardPage() {
  const recentRecords = [
    {
      id: 1,
      hobby: "독서",
      title: "셜록 홈즈 읽기",
      date: "2026.09.03",
    },
    {
      id: 2,
      hobby: "러닝",
      title: "저녁 러닝 5km",
      date: "2026.09.02",
    },
    {
      id: 3,
      hobby: "그림",
      title: "캐릭터 스케치 연습",
      date: "2026.09.01",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* 환영 영역 */}
      <section>
        <h1 className="text-3xl font-bold text-gray-800">
          안녕하세요 👋
        </h1>

        <p className="mt-2 text-gray-500">
          오늘도 좋아하는 취미를 기록해볼까요?
        </p>
      </section>

      {/* 활동 요약 */}
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          나의 활동
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="나의 취미"
            value={3}
            unit="개"
          />

          <StatCard
            title="이번 달 기록"
            value={12}
            unit="개"
          />

          <StatCard
            title="획득 스탬프"
            value={5}
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

        <div className="space-y-3">
          {recentRecords.map((record) => (
            <RecentRecordCard
              key={record.id}
              hobby={record.hobby}
              title={record.title}
              date={record.date}
            />
          ))}
        </div>
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