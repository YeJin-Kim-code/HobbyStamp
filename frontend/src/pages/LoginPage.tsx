import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import axios from "axios";

import { login } from "../api/auth";

function LoginPage() {
  const navigate = useNavigate();

  // ===============================
  // 로그인 입력값
  // ===============================

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  // API 요청 상태
  const [loading, setLoading] =
    useState(false);

  // 에러 메시지
  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  // ===============================
  // 로그인 Form 제출
  // ===============================

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    // form 새로고침 방지
    e.preventDefault();

    // 기존 에러 초기화
    setErrorMessage("");

    try {
      setLoading(true);

      // 백엔드
      // POST /auth/login
      const response = await login({
        email,
        password,
      });

      console.log(
        "로그인 성공:",
        response,
      );

      // 백엔드 응답 구조:
      //
      // {
      //   message: "로그인 성공",
      //   data: {
      //     accessToken: "...",
      //     user: {...}
      //   }
      // }

      const accessToken =
        response.data.accessToken;

      // JWT 저장
      localStorage.setItem(
        "token",
        accessToken,
      );

      // 사용자 정보도 저장
      localStorage.setItem(
        "user",
        JSON.stringify(
          response.data.user,
        ),
      );

      // 로그인 완료 후 Dashboard 이동
      navigate("/dashboard");
    } catch (error) {
      console.error(
        "로그인 실패:",
        error,
      );

      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message;

        setErrorMessage(
          message ??
            "로그인에 실패했습니다.",
        );
      } else {
        setErrorMessage(
          "알 수 없는 오류가 발생했습니다.",
        );
      }
    } finally {
      setLoading(false);
    }
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
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              비밀번호
            </label>

            <input
              id="password"
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

          {/* 서버 에러 */}

          {errorMessage && (
            <p className="text-sm font-medium text-red-500">
              {errorMessage}
            </p>
          )}

          {/* 로그인 버튼 */}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-orange-400 py-3 font-semibold text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "로그인 중..."
              : "로그인"}
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