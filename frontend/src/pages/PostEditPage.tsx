import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getHobbies,
  type Hobby,
} from "../api/hobby";

import {
  getPost,
  updatePost,
} from "../api/post";

function PostEditPage() {
  const navigate =
    useNavigate();

  const { postId } =
    useParams();

  const numericPostId =
    Number(postId);

  // ========================================
  // 취미
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
    useState(true);

  const [
    saving,
    setSaving,
  ] =
    useState(false);

  const [
    error,
    setError,
  ] =
    useState("");

  // ========================================
  // 기존 게시글 + 취미 목록 조회
  // ========================================

  useEffect(() => {
    if (
      !postId ||
      Number.isNaN(
        numericPostId,
      )
    ) {
      setError(
        "잘못된 게시글입니다.",
      );

      setLoading(false);

      return;
    }

    const fetchData =
      async () => {
        try {
          setLoading(true);

          const [
            postData,
            hobbyData,
          ] =
            await Promise.all([
              getPost(
                numericPostId,
              ),

              getHobbies(),
            ]);

          setHobbies(
            hobbyData,
          );

          /*
           * 기존 게시글 데이터를
           * 수정 폼의 초기값으로 사용
           */
          setHobbyId(
            String(
              postData.hobby.id,
            ),
          );

          setTitle(
            postData.title,
          );

          setContent(
            postData.content,
          );
        } catch (error) {
          console.error(
            "게시글 수정 데이터 조회 실패:",
            error,
          );

          setError(
            "게시글 정보를 불러오지 못했습니다.",
          );
        } finally {
          setLoading(false);
        }
      };

    fetchData();
  }, [
    postId,
    numericPostId,
  ]);

  // ========================================
  // 게시글 수정
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
        setSaving(true);

        setError("");

        await updatePost(
          numericPostId,
          {
            hobbyId:
              numericHobbyId,

            title:
              trimmedTitle,

            content:
              trimmedContent,
          },
        );

        /*
         * 수정한 게시글 상세 페이지로 이동
         */
        navigate(
          `/posts/${numericPostId}/comments`,
        );
      } catch (error) {
        console.error(
          "게시글 수정 실패:",
          error,
        );

        setError(
          "게시글 수정에 실패했습니다.",
        );
      } finally {
        setSaving(false);
      }
    };

  if (loading) {
    return (
      <main className="min-h-screen bg-orange-50 px-4 py-10">

        <p className="text-center text-gray-500">
          게시글을 불러오는 중입니다...
        </p>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-orange-50 px-4 py-10">

      <div className="mx-auto max-w-3xl">

        <section className="mb-8">

          <p className="mb-2 text-sm font-semibold text-orange-500">
            Hobby Community
          </p>

          <h1 className="text-3xl font-bold text-gray-900">
            게시글 수정
          </h1>

        </section>

        <form
          onSubmit={
            handleSubmit
          }
          className="rounded-3xl bg-white p-6 shadow-sm md:p-8"
        >

          {/* 취미 */}

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
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            >

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
              value={title}
              onChange={(
                event,
              ) =>
                setTitle(
                  event.target.value,
                )
              }
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
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
              rows={12}
              className="w-full resize-none rounded-xl border border-gray-200 p-4 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />

          </div>

          {error && (
            <div className="mb-5 rounded-xl bg-red-50 p-4 text-sm text-red-500">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={() =>
                navigate(
                  `/posts/${numericPostId}/comments`,
                )
              }
              className="rounded-xl border border-gray-200 px-5 py-3 font-semibold text-gray-500"
            >
              취소
            </button>

            <button
              type="submit"
              disabled={
                saving
              }
              className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600 disabled:bg-gray-300"
            >
              {saving
                ? "수정 중..."
                : "수정 완료"}
            </button>

          </div>

        </form>

      </div>

    </main>
  );
}

export default PostEditPage;