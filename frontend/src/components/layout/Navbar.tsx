import { NavLink } from "react-router-dom";

function Navbar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "font-bold text-orange-500"
      : "text-gray-600 transition hover:text-orange-500";

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <NavLink
          to="/"
          className="text-xl font-bold text-orange-500"
        >
          HobbyStamp
        </NavLink>

        <nav className="flex flex-wrap items-center gap-5 text-sm">
          <NavLink
            to="/dashboard"
            className={linkClass}
          >
            대시보드
          </NavLink>

          <NavLink
            to="/hobbies"
            className={linkClass}
          >
            취미
          </NavLink>

          <NavLink
            to="/records"
            className={linkClass}
          >
            기록
          </NavLink>

          <NavLink
            to="/stamps"
            className={linkClass}
          >
            스탬프
          </NavLink>

          <NavLink
            to="/posts"
            className={linkClass}
          >
            커뮤니티
          </NavLink>

          <NavLink
            to="/ai"
            className={linkClass}
          >
            AI 분석
          </NavLink>

          <NavLink
            to="/mypage"
            className={linkClass}
          >
            마이페이지
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;