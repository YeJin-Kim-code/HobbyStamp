function AiPage() {
  return (
    <main className="min-h-screen bg-orange-50 px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <section className="mb-8">
          <p className="mb-2 text-sm font-semibold text-orange-500">
            HobbyStamp AI
          </p>

          <h1 className="text-3xl font-bold text-gray-900">
            AI 취미 분석
          </h1>

          <p className="mt-3 text-gray-600">
            지금까지 기록한 취미 활동을 바탕으로
            나의 취미 성향을 확인해보세요.
          </p>
        </section>

        <section className="rounded-3xl bg-white p-8 shadow-sm">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-500">
                나의 취미 유형
              </p>

              <h2 className="mt-1 text-3xl font-bold text-purple-600">
                Deep Digger
              </h2>
            </div>

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 text-4xl">
              🔎
            </div>
          </div>

          <div className="rounded-2xl bg-purple-50 p-5">
            <h3 className="font-bold text-gray-900">
              한 가지 취미를 깊게 파고드는 몰입형
            </h3>

            <p className="mt-2 leading-7 text-gray-600">
              관심 있는 취미를 꾸준히 기록하고 깊게 탐구하는 성향이에요.
              새로운 취미를 많이 시작하기보다는 좋아하는 분야를 오래
              지속하면서 성장하는 타입입니다.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500">
                총 기록
              </p>

              <p className="mt-2 text-2xl font-bold text-gray-900">
                24
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500">
                가장 많이 한 취미
              </p>

              <p className="mt-2 text-2xl font-bold text-gray-900">
                독서
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500">
                이번 달 활동
              </p>

              <p className="mt-2 text-2xl font-bold text-gray-900">
                8회
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-900">
              AI가 발견한 특징
            </h3>

            <div className="mt-4 space-y-3">
              <div className="rounded-2xl bg-gray-50 p-4 text-gray-700">
                📚 한 가지 취미를 꾸준히 이어가는 편이에요.
              </div>

              <div className="rounded-2xl bg-gray-50 p-4 text-gray-700">
                🔥 최근 취미 활동 빈도가 점점 증가하고 있어요.
              </div>

              <div className="rounded-2xl bg-gray-50 p-4 text-gray-700">
                📝 기록을 남기면서 성취감을 얻는 성향이 보여요.
              </div>
            </div>
          </div>

          <button
            type="button"
            className="mt-8 w-full rounded-2xl bg-orange-500 px-5 py-4 font-bold text-white transition hover:bg-orange-600"
          >
            내 취미 다시 분석하기
          </button>

          <p className="mt-3 text-center text-xs text-gray-400">
            현재는 UI 구현 단계로 실제 AI API는 아직 연결되지 않았습니다.
          </p>
        </section>
      </div>
    </main>
  );
}

export default AiPage;