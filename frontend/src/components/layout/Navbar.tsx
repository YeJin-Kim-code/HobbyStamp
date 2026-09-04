import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <NavLink
          to="/"
          className="text-xl font-bold text-orange-500"
        >
          HobbyStamp
        </NavLink>

        <div className="flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-orange-500"
                : "text-gray-600 hover:text-orange-500"
            }
          >
            홈
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-orange-500"
                : "text-gray-600 hover:text-orange-500"
            }
          >
            대시보드
          </NavLink>

          <NavLink
            to="/hobbies"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-orange-500"
                : "text-gray-600 hover:text-orange-500"
            }
          >
            취미
          </NavLink>

          <NavLink
            to="/records"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-orange-500"
                : "text-gray-600 hover:text-orange-500"
            }
          >
            기록
          </NavLink>

          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-orange-500"
                : "text-gray-600 hover:text-orange-500"
            }
          >
            로그인
          </NavLink>

          <NavLink
          to="/stamps"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-orange-500"
              : "text-gray-600 hover:text-orange-500"
            }       
          >
            스탬프
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;