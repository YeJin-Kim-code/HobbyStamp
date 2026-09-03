import { useState } from "react";
import { Link } from "react-router-dom";

function LoginPage() {
  // 사용자가 입력한 이메일을 저장하는 state
  const [email, setEmail] = useState("");

  // 사용자가 입력한 비밀번호를 저장하는 state
  const [password, setPassword] = useState("");

  // 로그인 폼 제출 시 실행
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // form의 기본 동작인 페이지 새로고침 방지
    e.preventDefault();

    // Day 18에서는 API 연결을 하지 않으므로
    // 입력값이 정상적으로 들어오는지만 확인
    console.log("로그인 정보:", {
      email,
      password,
    });
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-orange-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md">
        {/* 제목 */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            로그인
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            HobbyStamp에서 취미 기록을 이어가세요.
          </p>
        </div>

        {/* 로그인 Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* 이메일 */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              이메일
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          {/* 비밀번호 */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              비밀번호
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            className="w-full rounded-lg bg-orange-400 py-3 font-semibold text-white transition hover:bg-orange-500"
          >
            로그인
          </button>
        </form>

        {/* 회원가입 이동 */}
        <div className="mt-6 text-center text-sm text-gray-500">
          아직 계정이 없으신가요?{" "}
          <Link
            to="/signup"
            className="font-semibold text-orange-500 hover:text-orange-600"
          >
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;