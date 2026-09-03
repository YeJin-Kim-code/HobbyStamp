interface HobbyCardProps {
  name: string;
  description: string | null;
  isPinned: boolean;
  onTogglePin: () => void;
}

function HobbyCard({
  name,
  description,
  isPinned,
  onTogglePin,
}: HobbyCardProps) {
  return (
    <article className="flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      {/* 취미 정보 */}
      <div>
        <h2 className="text-xl font-bold text-gray-800">
          {name}
        </h2>

        <p className="mt-3 leading-6 text-gray-500">
          {description ?? "아직 등록된 취미 설명이 없습니다."}
        </p>
      </div>

      {/* 취미 선택 버튼 */}
      <button
        type="button"
        onClick={onTogglePin}
        className={`mt-6 rounded-xl px-4 py-3 font-semibold transition ${
          isPinned
            ? "bg-orange-100 text-orange-600 hover:bg-orange-200"
            : "bg-orange-500 text-white hover:bg-orange-600"
        }`}
      >
        {isPinned ? "✓ 선택됨" : "+ 선택하기"}
      </button>
    </article>
  );
}

export default HobbyCard;