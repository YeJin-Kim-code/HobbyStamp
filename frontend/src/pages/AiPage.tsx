import { useState } from "react";

import { analyzeHobby, type HobbyAnalysisData } from "../api/ai";

function AiPage() {
  const [analysis, setAnalysis] = useState<HobbyAnalysisData | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // ========================================
  // AI 취미 분석 요청
  // ========================================

  const handleAnalyze = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await analyzeHobby();

      setAnalysis(response.data);
    } catch (error: any) {
      console.error(error);

      if (error.response?.status === 404) {
        setError("분석할 취미 기록이 없습니다.");
        return;
      }

      setError("AI 취미 분석 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // 취미 유형 아이콘
  // ========================================

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Deep Digger":
        return "🔎";

      case "Explorer":
        return "🧭";

      case "Connector":
        return "🤝";

      case "Achiever":
        return "🏆";

      case "Healing":
        return "🌿";

      default:
        return "✨";
    }
  };

  // ========================================
  // 취미 유형 설명
  // ========================================

  const getTypeTitle = (type: string) => {
    switch (type) {
      case "Deep Digger":
        return "한 가지 취미를 깊게 파고드는 몰입형";

      case "Explorer":
        return "새로운 취미를 찾아다니는 탐험형";

      case "Connector":
        return "사람들과 함께 취미를 즐기는 교류형";

      case "Achiever":
        return "목표와 성취를 중요하게 생각하는 도전형";

      case "Healing":
        return "취미를 통해 휴식과 여유를 찾는 힐링형";

      default:
        return "나만의 취미 스타일";
    }
  };

  // ========================================
  // AI 유형별 특징
  // ========================================

  const getTraits = (type: string) => {
    switch (type) {
      case "Deep Digger":
        return [
          "📚 좋아하는 취미를 꾸준히 이어가는 편이에요.",
          "🔎 하나의 분야를 깊게 탐구하는 성향이 있어요.",
          "📈 반복적인 활동을 통해 실력을 높이는 것을 좋아해요.",
        ];

      case "Explorer":
        return [
          "🧭 새로운 취미를 경험하는 것을 좋아해요.",
          "✨ 다양한 분야에 관심을 가지고 있어요.",
          "🚀 새로운 활동을 시작하는 데 적극적이에요.",
        ];

      case "Connector":
        return [
          "🤝 다른 사람과 함께하는 활동을 좋아해요.",
          "💬 취미를 통해 경험을 공유하는 편이에요.",
          "👥 모임과 커뮤니티 활동에 잘 어울리는 유형이에요.",
        ];

      case "Achiever":
        return [
          "🏆 목표를 세우고 달성하는 것을 좋아해요.",
          "📊 자신의 성장과 기록을 중요하게 생각해요.",
          "🔥 꾸준히 도전하며 성취감을 얻는 편이에요.",
        ];

      case "Healing":
        return [
          "🌿 취미를 통해 편안함을 얻는 편이에요.",
          "☕ 여유로운 활동을 즐기는 성향이 있어요.",
          "💚 취미가 스트레스 해소에 중요한 역할을 해요.",
        ];

      default:
        return [];
    }
  };

  return (
    <main className="min-h-screen bg-orange-50 px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <section className="mb-8">
          <p className="mb-2 text-sm font-semibold text-orange-500">
            HobbyStamp AI
          </p>

          <h1 className="text-3xl font-bold text-gray-900">AI 취미 분석</h1>

          <p className="mt-3 text-gray-600">
            지금까지 기록한 취미 활동을 바탕으로 나의 취미 성향을 확인해보세요.
          </p>
        </section>

        <section className="rounded-3xl bg-white p-8 shadow-sm">
          {!analysis ? (
            <div className="py-12 text-center">
              <div className="text-6xl">🤖</div>

              <h2 className="mt-5 text-2xl font-bold text-gray-900">
                아직 분석 결과가 없습니다.
              </h2>

              <p className="mt-3 text-gray-500">
                지금까지 작성한 취미 기록을 AI가 분석해드려요.
              </p>

              {error && (
                <p className="mt-4 text-sm font-semibold text-red-500">
                  {error}
                </p>
              )}

              <button
                type="button"
                onClick={handleAnalyze}
                disabled={loading}
                className="mt-8 rounded-2xl bg-orange-500 px-8 py-4 font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-orange-300"
              >
                {loading ? "AI가 분석 중..." : "내 취미 분석하기"}
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-500">
                    나의 취미 유형
                  </p>

                  <h2 className="mt-1 text-3xl font-bold text-purple-600">
                    {analysis.type}
                  </h2>
                </div>

                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 text-4xl">
                  {getTypeIcon(analysis.type)}
                </div>
              </div>

              <div className="rounded-2xl bg-purple-50 p-5">
                <h3 className="font-bold text-gray-900">
                  {getTypeTitle(analysis.type)}
                </h3>

                <p className="mt-2 leading-7 text-gray-600">
                  {analysis.description}
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-gray-200 p-5">
                  <p className="text-sm text-gray-500">총 기록</p>

                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {analysis.stats.totalRecords}
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-200 p-5">
                  <p className="text-sm text-gray-500">가장 많이 한 취미</p>

                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {analysis.stats.mostActiveHobby}
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-200 p-5">
                  <p className="text-sm text-gray-500">이번 달 활동</p>

                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {analysis.stats.thisMonthCount}회
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-900">
                  AI가 발견한 특징
                </h3>

                <div className="mt-4 space-y-3">
                  {getTraits(analysis.type).map((trait) => (
                    <div
                      key={trait}
                      className="rounded-2xl bg-gray-50 p-4 text-gray-700"
                    >
                      {trait}
                    </div>
                  ))}
                </div>
              </div>

              {error && (
                <p className="mt-5 text-center text-sm font-semibold text-red-500">
                  {error}
                </p>
              )}

              <button
                type="button"
                onClick={handleAnalyze}
                disabled={loading}
                className="mt-8 w-full rounded-2xl bg-orange-500 px-5 py-4 font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-orange-300"
              >
                {loading ? "AI가 분석 중..." : "내 취미 다시 분석하기"}
              </button>
            </>
          )}
        </section>
      </div>
    </main>
  );
}

export default AiPage;
