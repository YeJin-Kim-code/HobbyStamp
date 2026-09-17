import {
  Link,
  useNavigate,
} from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  // ========================================
  // 로그인 여부 확인
  // ========================================

  const token =
    localStorage.getItem("token");

  const isLoggedIn = !!token;

  // ========================================
  // 로그인 필요 페이지 이동
  // ========================================

  const handleProtectedNavigation = (
    path: string,
  ) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    navigate(path);
  };

  // ========================================
  // 로그아웃
  // ========================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.reload();
  };

  return (
    <main className="min-h-screen bg-orange-50">

      {/* ========================================
          Header
      ======================================== */}

      <header className="border-b border-orange-100 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

          <Link
            to="/"
            className="text-xl font-bold text-orange-500"
          >
            광기의 취미열차
          </Link>

          {/* 로그인 상태별 메뉴 */}

          <div className="flex items-center gap-4 text-sm">

            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="font-medium text-gray-600 transition hover:text-orange-500"
                >
                  로그인
                </Link>

                <Link
                  to="/signup"
                  className="rounded-lg bg-orange-400 px-4 py-2 font-semibold text-white transition hover:bg-orange-500"
                >
                  회원가입
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="font-medium text-gray-600 transition hover:text-orange-500"
                >
                  대시보드
                </Link>

                <Link
                  to="/mypage"
                  className="font-medium text-gray-600 transition hover:text-orange-500"
                >
                  마이페이지
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-lg border border-red-200 px-4 py-2 font-semibold text-red-500 transition hover:bg-red-50"
                >
                  로그아웃
                </button>
              </>
            )}

          </div>

        </div>
      </header>

      {/* ========================================
          Main
      ======================================== */}

      <div className="mx-auto max-w-5xl px-6 py-16">

        {/* Hero */}

        <section className="text-center">

          <p className="mb-3 text-sm font-semibold text-orange-500">
            My Hobby Archive
          </p>

          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            광기의 취미열차
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-gray-600">
            좋아하는 취미를 기록하고,
            스탬프를 모으며 나만의 취미 생활을
            만들어보세요.
          </p>

        </section>

        {/* ========================================
            Main Navigation
        ======================================== */}

        <section className="mt-14">

          <div className="grid gap-5 sm:grid-cols-2">

            {/* 취미 기록 */}

            <button
              type="button"
              onClick={() =>
                handleProtectedNavigation(
                  "/records",
                )
              }
              className="group rounded-2xl bg-white p-7 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >

              <div className="text-3xl">
                📝
              </div>

              <h2 className="mt-4 text-xl font-bold text-gray-800 transition group-hover:text-orange-500">
                취미 기록
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                오늘 즐긴 취미와 경험을
                기록해보세요.
              </p>

              <p className="mt-5 text-sm font-semibold text-orange-500">
                기록하러 가기 →
              </p>

            </button>

            {/* 커뮤니티 */}

            <Link
              to="/posts"
              className="group rounded-2xl bg-white p-7 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >

              <div className="text-3xl">
                💬
              </div>

              <h2 className="mt-4 text-xl font-bold text-gray-800 transition group-hover:text-orange-500">
                커뮤니티
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                다른 사람들의 취미 기록을
                구경하고 이야기를 나눠보세요.
              </p>

              <p className="mt-5 text-sm font-semibold text-orange-500">
                커뮤니티 둘러보기 →
              </p>

            </Link>

            {/* AI 분석 */}

            <button
              type="button"
              onClick={() =>
                handleProtectedNavigation(
                  "/ai",
                )
              }
              className="group rounded-2xl bg-white p-7 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >

              <div className="text-3xl">
                ✨
              </div>

              <h2 className="mt-4 text-xl font-bold text-gray-800 transition group-hover:text-orange-500">
                AI 취미 분석
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                내가 남긴 기록을 바탕으로
                나의 취미 유형을 분석해보세요.
              </p>

              <p className="mt-5 text-sm font-semibold text-orange-500">
                AI 분석하기 →
              </p>

            </button>

            {/* 마이페이지 */}

            <button
              type="button"
              onClick={() =>
                handleProtectedNavigation(
                  "/mypage",
                )
              }
              className="group rounded-2xl bg-white p-7 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >

              <div className="text-3xl">
                👤
              </div>

              <h2 className="mt-4 text-xl font-bold text-gray-800 transition group-hover:text-orange-500">
                마이페이지
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                나의 취미 활동과 기록을
                한곳에서 확인해보세요.
              </p>

              <p className="mt-5 text-sm font-semibold text-orange-500">
                내 활동 확인하기 →
              </p>

            </button>

          </div>

        </section>

        {/* 취미 둘러보기 */}

        <section className="mt-10 text-center">

          <p className="text-sm text-gray-500">
            아직 취미를 선택하지 않았다면?
          </p>

          <Link
            to="/hobbies"
            className="mt-2 inline-block font-semibold text-orange-500 transition hover:text-orange-600"
          >
            취미 둘러보기 →
          </Link>

        </section>

      </div>

    </main>
  );
}

export default HomePage;