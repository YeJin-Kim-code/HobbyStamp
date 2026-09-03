import { useState } from "react";
import { Link } from "react-router-dom";

function SignupPage() {
  // 회원가입 입력값 state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // 회원가입 Form 제출
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 비밀번호 확인
    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // Day 18에서는 API 호출 대신 console 확인
    console.log("회원가입 정보:", {
      name,
      email,
      password,
    });
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-orange-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md">
        {/* 제목 */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            회원가입
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            HobbyStamp와 함께 취미를 기록해보세요.
          </p>
        </div>

        {/* 회원가입 Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* 이름 */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              이름
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력하세요"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          {/* 이메일 */}
          <div>
            <label
              htmlFor="signup-email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              이메일
            </label>

            <input
              id="signup-email"
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
              htmlFor="signup-password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              비밀번호
            </label>

            <input
              id="signup-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <label
              htmlFor="password-confirm"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              비밀번호 확인
            </label>

            <input
              id="password-confirm"
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="비밀번호를 다시 입력하세요"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          {/* 회원가입 버튼 */}
          <button
            type="submit"
            className="w-full rounded-lg bg-orange-400 py-3 font-semibold text-white transition hover:bg-orange-500"
          >
            회원가입
          </button>
        </form>

        {/* 로그인 이동 */}
        <div className="mt-6 text-center text-sm text-gray-500">
          이미 계정이 있으신가요?{" "}
          <Link
            to="/login"
            className="font-semibold text-orange-500 hover:text-orange-600"
          >
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;