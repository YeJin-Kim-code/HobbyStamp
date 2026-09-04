import StampCard from "../components/stamp/StampCard";

interface Stamp {
  id: number;
  icon: string;
  title: string;
  description: string;
  current: number;
  goal: number;
  earned: boolean;
}

function StampPage() {
  // 지금은 UI 구현 단계라 더미 데이터를 사용한다.
  // 나중에 API 연결 단계에서 백엔드 응답으로 교체할 예정
  const stamps: Stamp[] = [
    {
      id: 1,
      icon: "🌱",
      title: "첫 기록",
      description: "첫 번째 취미 기록을 작성해보세요.",
      current: 1,
      goal: 1,
      earned: true,
    },
    {
      id: 2,
      icon: "🔥",
      title: "꾸준한 취미인",
      description: "취미 기록을 5개 작성해보세요.",
      current: 5,
      goal: 5,
      earned: true,
    },
    {
      id: 3,
      icon: "🧭",
      title: "취미 탐험가",
      description: "3가지 취미를 경험해보세요.",
      current: 2,
      goal: 3,
      earned: false,
    },
    {
      id: 4,
      icon: "📚",
      title: "기록 수집가",
      description: "취미 기록을 10개 작성해보세요.",
      current: 7,
      goal: 10,
      earned: false,
    },
    {
      id: 5,
      icon: "⭐",
      title: "취미 마스터",
      description: "취미 기록을 20개 작성해보세요.",
      current: 7,
      goal: 20,
      earned: false,
    },
    {
      id: 6,
      icon: "🏆",
      title: "스탬프 컬렉터",
      description: "스탬프를 5개 획득해보세요.",
      current: 2,
      goal: 5,
      earned: false,
    },
  ];

  // 획득한 스탬프만 골라서 개수를 구한다.
  const earnedCount = stamps.filter(
    (stamp) => stamp.earned
  ).length;

  // 전체 스탬프 개수
  const totalCount = stamps.length;

  // 전체 달성률 계산
  const achievementRate =
    totalCount === 0
      ? 0
      : Math.round(
          (earnedCount / totalCount) * 100
        );

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
            취미 활동을 기록하고 다양한 스탬프를 모아보세요.
          </p>
        </section>

        {/* 전체 스탬프 현황 */}
        <section className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                획득한 스탬프
              </p>

              <p className="mt-1 text-3xl font-bold text-gray-900">
                {earnedCount}

                <span className="ml-1 text-lg font-medium text-gray-400">
                  / {totalCount}
                </span>
              </p>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-sm text-gray-500">
                전체 달성률
              </p>

              <p className="mt-1 text-2xl font-bold text-orange-500">
                {achievementRate}%
              </p>
            </div>
          </div>

          {/* 전체 진행률 바 */}
          <div className="mt-6">
            <div className="h-3 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-orange-400 transition-all"
                style={{
                  width: `${achievementRate}%`,
                }}
              />
            </div>
          </div>
        </section>

        {/* 목록 제목 */}
        <section className="mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            스탬프 목록
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            아직 획득하지 못한 스탬프의 진행 상황도 확인할 수 있어요.
          </p>
        </section>

        {/* 스탬프 카드 목록 */}
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stamps.map((stamp) => (
            <StampCard
              key={stamp.id}
              icon={stamp.icon}
              title={stamp.title}
              description={stamp.description}
              current={stamp.current}
              goal={stamp.goal}
              earned={stamp.earned}
            />
          ))}
        </section>
      </div>
    </main>
  );
}

export default StampPage;