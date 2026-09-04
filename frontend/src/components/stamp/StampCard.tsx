interface StampCardProps {
  icon: string;
  title: string;
  description: string;
  current: number;
  goal: number;
  earned: boolean;
}

function StampCard({
  icon,
  title,
  description,
  current,
  goal,
  earned,
}: StampCardProps) {
  // 현재 진행률 계산
  // 예: current = 3, goal = 5 → 60
  // 100%를 넘지 않도록 Math.min 사용
  const progress = Math.min((current / goal) * 100, 100);

  return (
    <div
      className={`rounded-2xl border p-5 shadow-sm transition ${
        earned
          ? "border-amber-300 bg-amber-50"
          : "border-gray-200 bg-white"
      }`}
    >
      {/* 상단 영역 */}
      <div className="mb-4 flex items-start justify-between">
        {/* 스탬프 아이콘 */}
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-full text-3xl ${
            earned ? "bg-amber-200" : "bg-gray-100 grayscale"
          }`}
        >
          {icon}
        </div>

        {/* 스탬프 상태 */}
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            earned
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {earned ? "획득 완료" : "진행 중"}
        </span>
      </div>

      {/* 스탬프 제목 */}
      <h3 className="text-lg font-bold text-gray-900">
        {title}
      </h3>

      {/* 스탬프 설명 */}
      <p className="mt-1 text-sm text-gray-500">
        {description}
      </p>

      {/* 진행도 영역 */}
      <div className="mt-5">
        <div className="mb-2 flex justify-between text-sm">
          <span className="font-medium text-gray-600">
            진행도
          </span>

          <span className="font-semibold text-gray-700">
            {current} / {goal}
          </span>
        </div>

        {/* 진행률 바 배경 */}
        <div className="h-2 overflow-hidden rounded-full bg-gray-200">
          {/* 실제 진행률 */}
          <div
            className={`h-full rounded-full transition-all ${
              earned
                ? "bg-amber-400"
                : "bg-orange-400"
            }`}
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default StampCard;