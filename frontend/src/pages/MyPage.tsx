function MyPage() {
  return (
    <main className="min-h-screen bg-orange-50 px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <section className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            마이페이지
          </h1>

          <p className="mt-3 text-gray-600">
            내 프로필과 HobbyStamp 활동을 확인할 수 있어요.
          </p>
        </section>

        <section className="rounded-3xl bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-orange-100 text-4xl">
              👤
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">
                yejin
              </h2>

              <p className="mt-2 text-gray-600">
                취미를 기록하며 천천히 성장하고 있어요.
              </p>

              <p className="mt-1 text-sm text-gray-400">
                yejin@example.com
              </p>
            </div>

            <button
              type="button"
              className="rounded-xl border border-orange-400 px-5 py-3 font-semibold text-orange-500 transition hover:bg-orange-50"
            >
              프로필 수정
            </button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3">
            <div className="rounded-2xl bg-orange-50 p-5 text-center">
              <p className="text-2xl font-bold text-orange-500">
                5
              </p>

              <p className="mt-1 text-sm text-gray-500">
                취미
              </p>
            </div>

            <div className="rounded-2xl bg-green-50 p-5 text-center">
              <p className="text-2xl font-bold text-green-600">
                24
              </p>

              <p className="mt-1 text-sm text-gray-500">
                기록
              </p>
            </div>

            <div className="rounded-2xl bg-yellow-50 p-5 text-center">
              <p className="text-2xl font-bold text-yellow-600">
                8
              </p>

              <p className="mt-1 text-sm text-gray-500">
                스탬프
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            나의 활동
          </h2>

          <div className="mt-5 divide-y divide-gray-100">
            <button
              type="button"
              className="flex w-full items-center justify-between py-5 text-left"
            >
              <div>
                <p className="font-semibold text-gray-900">
                  📝 작성한 게시글
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  내가 작성한 커뮤니티 글을 확인합니다.
                </p>
              </div>

              <span className="text-gray-400">
                &gt;
              </span>
            </button>

            <button
              type="button"
              className="flex w-full items-center justify-between py-5 text-left"
            >
              <div>
                <p className="font-semibold text-gray-900">
                  💬 작성한 댓글
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  내가 남긴 댓글을 확인합니다.
                </p>
              </div>

              <span className="text-gray-400">
                &gt;
              </span>
            </button>

            <button
              type="button"
              className="flex w-full items-center justify-between py-5 text-left"
            >
              <div>
                <p className="font-semibold text-gray-900">
                  🏆 획득한 스탬프
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  지금까지 모은 스탬프를 확인합니다.
                </p>
              </div>

              <span className="text-gray-400">
                &gt;
              </span>
            </button>

            <button
              type="button"
              className="flex w-full items-center justify-between py-5 text-left"
            >
              <div>
                <p className="font-semibold text-gray-900">
                  ❤️ 관심 취미
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  내가 선택한 취미를 관리합니다.
                </p>
              </div>

              <span className="text-gray-400">
                &gt;
              </span>
            </button>
          </div>
        </section>

        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
          <button
            type="button"
            className="w-full rounded-2xl border border-red-200 px-5 py-4 font-semibold text-red-500 transition hover:bg-red-50"
          >
            로그아웃
          </button>
        </section>
      </div>
    </main>
  );
}

export default MyPage;