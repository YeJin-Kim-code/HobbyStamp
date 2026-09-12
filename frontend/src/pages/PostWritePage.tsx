import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  getHobbies,
  type Hobby,
} from "../api/hobby";

import {
  createPost,
} from "../api/post";

function PostWritePage() {
  const navigate =
    useNavigate();

  // ========================================
  // 취미 목록
  // ========================================

  const [
    hobbies,
    setHobbies,
  ] =
    useState<Hobby[]>([]);

  // ========================================
  // 입력값
  // ========================================

  const [
    hobbyId,
    setHobbyId,
  ] =
    useState("");

  const [
    title,
    setTitle,
  ] =
    useState("");

  const [
    content,
    setContent,
  ] =
    useState("");

  // ========================================
  // 상태
  // ========================================

  const [
    loading,
    setLoading,
  ] =
    useState(false);

  const [
    error,
    setError,
  ] =
    useState("");

  // ========================================
  // 취미 목록 조회
  // ========================================

  useEffect(() => {
    const fetchHobbies =
      async () => {
        try {
          const data =
            await getHobbies();

          setHobbies(data);
        } catch (error) {
          console.error(
            "취미 목록 조회 실패:",
            error,
          );

          setError(
            "취미 목록을 불러오지 못했습니다.",
          );
        }
      };

    fetchHobbies();
  }, []);

  // ========================================
  // 게시글 작성
  // ========================================

  const handleSubmit =
    async (
      event: React.FormEvent<HTMLFormElement>,
    ) => {
      event.preventDefault();

      const numericHobbyId =
        Number(hobbyId);

      const trimmedTitle =
        title.trim();

      const trimmedContent =
        content.trim();

      if (
        !numericHobbyId ||
        !trimmedTitle ||
        !trimmedContent
      ) {
        setError(
          "취미, 제목, 내용을 모두 입력해주세요.",
        );

        return;
      }

      try {
        setLoading(true);

        setError("");

        await createPost({
          hobbyId:
            numericHobbyId,

          title:
            trimmedTitle,

          content:
            trimmedContent,
        });

        /*
         * 작성 성공 후
         * 커뮤니티 목록으로 이동
         */
        navigate("/posts");
      } catch (error) {
        console.error(
          "게시글 작성 실패:",
          error,
        );

        setError(
          "게시글 작성에 실패했습니다.",
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <main className="min-h-screen bg-orange-50 px-4 py-10">

      <div className="mx-auto max-w-3xl">

        {/* 페이지 제목 */}

        <section className="mb-8">

          <p className="mb-2 text-sm font-semibold text-orange-500">
            Hobby Community
          </p>

          <h1 className="text-3xl font-bold text-gray-900">
            게시글 작성
          </h1>

          <p className="mt-2 text-gray-500">
            취미 경험을 다른 사람들과 공유해보세요.
          </p>

        </section>

        {/* 작성 폼 */}

        <form
          onSubmit={
            handleSubmit
          }
          className="rounded-3xl bg-white p-6 shadow-sm md:p-8"
        >

          {/* 취미 선택 */}

          <div className="mb-6">

            <label
              htmlFor="hobby"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              취미
            </label>

            <select
              id="hobby"
              value={hobbyId}
              onChange={(
                event,
              ) =>
                setHobbyId(
                  event.target.value,
                )
              }
              required
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-700 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            >

              <option value="">
                취미를 선택해주세요.
              </option>

              {hobbies.map(
                (hobby) => (
                  <option
                    key={
                      hobby.id
                    }
                    value={
                      hobby.id
                    }
                  >
                    {hobby.name}
                  </option>
                ),
              )}

            </select>

          </div>

          {/* 제목 */}

          <div className="mb-6">

            <label
              htmlFor="title"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              제목
            </label>

            <input
              id="title"
              type="text"
              value={title}
              onChange={(
                event,
              ) =>
                setTitle(
                  event.target.value,
                )
              }
              placeholder="게시글 제목을 입력해주세요."
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-700 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />

          </div>

          {/* 내용 */}

          <div className="mb-6">

            <label
              htmlFor="content"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              내용
            </label>

            <textarea
              id="content"
              value={content}
              onChange={(
                event,
              ) =>
                setContent(
                  event.target.value,
                )
              }
              placeholder="취미 이야기를 작성해주세요."
              rows={12}
              required
              className="w-full resize-none rounded-xl border border-gray-200 p-4 text-gray-700 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />

          </div>

          {/* 에러 */}

          {error && (
            <div className="mb-5 rounded-xl bg-red-50 p-4 text-sm text-red-500">
              {error}
            </div>
          )}

          {/* 버튼 */}

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/posts",
                )
              }
              className="rounded-xl border border-gray-200 px-5 py-3 font-semibold text-gray-500 transition hover:bg-gray-50"
            >
              취소
            </button>

            <button
              type="submit"
              disabled={
                loading
              }
              className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {loading
                ? "작성 중..."
                : "작성 완료"}
            </button>

          </div>

        </form>

      </div>

    </main>
  );
}

export default PostWritePage;