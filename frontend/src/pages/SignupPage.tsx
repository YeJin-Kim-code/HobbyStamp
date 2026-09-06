import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { signup } from "../api/auth";

function SignupPage() {
  const navigate = useNavigate();

  // ===============================
  // 회원가입 입력값
  // ===============================

  const [nickname, setNickname] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [passwordConfirm, setPasswordConfirm] =
    useState("");

  // API 요청 중인지 확인
  const [loading, setLoading] = useState(false);

  // 서버 에러 메시지
  const [errorMessage, setErrorMessage] =
    useState("");

  // ===============================
  // 회원가입 Form 제출
  // ===============================

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    // form 기본 새로고침 방지
    e.preventDefault();

    // 이전 에러 메시지 초기화
    setErrorMessage("");

    // 비밀번호 확인
    if (password !== passwordConfirm) {
      setErrorMessage(
        "비밀번호가 일치하지 않습니다.",
      );

      return;
    }

    try {
      // 중복 클릭 방지
      setLoading(true);

      // 백엔드 POST /auth/signup 요청
      const response = await signup({
        email,
        password,
        nickname,
      });

      console.log(
        "회원가입 성공:",
        response,
      );

      alert("회원가입이 완료되었습니다.");

      // 회원가입 성공 → 로그인 페이지 이동
      navigate("/login");
    } catch (error) {
      console.error(
        "회원가입 실패:",
        error,
      );

      // Axios에서 발생한 에러인지 확인
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message;

        setErrorMessage(
          message ??
            "회원가입에 실패했습니다.",
        );
      } else {
        setErrorMessage(
          "알 수 없는 오류가 발생했습니다.",
        );
      }
    } finally {
      // 성공 / 실패 여부와 관계없이 실행
      setLoading(false);
    }
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

          {/* 닉네임 */}

          <div>

            <label
              htmlFor="nickname"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              닉네임
            </label>

            <input
              id="nickname"
              type="text"
              value={nickname}
              onChange={(e) =>
                setNickname(e.target.value)
              }
              placeholder="닉네임을 입력하세요"
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
              onChange={(e) =>
                setEmail(e.target.value)
              }
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
              onChange={(e) =>
                setPassword(e.target.value)
              }
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
              onChange={(e) =>
                setPasswordConfirm(
                  e.target.value,
                )
              }
              placeholder="비밀번호를 다시 입력하세요"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />

          </div>

          {/* 에러 메시지 */}

          {errorMessage && (
            <p className="text-sm font-medium text-red-500">
              {errorMessage}
            </p>
          )}

          {/* 회원가입 버튼 */}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-orange-400 py-3 font-semibold text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "회원가입 중..."
              : "회원가입"}
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