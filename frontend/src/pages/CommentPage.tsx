import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getPost,
  deletePost,
  type Post,
} from "../api/post";

import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
  type Comment,
} from "../api/comment";

// ========================================
// 현재 로그인 사용자 타입
// ========================================

interface CurrentUser {
  id: number;
  email: string;
  nickname: string;
}

// ========================================
// localStorage에서 로그인 사용자 가져오기
// ========================================

const getCurrentUser =
  (): CurrentUser | null => {
    const storedUser =
      localStorage.getItem("user");

    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(
        storedUser,
      ) as CurrentUser;
    } catch (error) {
      console.error(
        "사용자 정보 파싱 실패:",
        error,
      );

      return null;
    }
  };

function CommentPage() {
  const navigate =
    useNavigate();

  // ========================================
  // URL Parameter
  // ========================================

  const { postId } =
    useParams();

  const numericPostId =
    Number(postId);

  // ========================================
  // 현재 로그인 사용자
  // ========================================

  const currentUser =
    getCurrentUser();

  // ========================================
  // State
  // ========================================

  const [
    post,
    setPost,
  ] =
    useState<Post | null>(
      null,
    );

  const [
    comments,
    setComments,
  ] =
    useState<Comment[]>([]);

  const [
    comment,
    setComment,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  // 수정 중인 댓글 ID
  const [
    editingCommentId,
    setEditingCommentId,
  ] =
    useState<number | null>(
      null,
    );

  // 수정 중인 댓글 내용
  const [
    editingContent,
    setEditingContent,
  ] = useState("");

  // ========================================
  // 게시글 + 댓글 조회
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

          setError("");

          const [
            postData,
            commentData,
          ] =
            await Promise.all([
              getPost(
                numericPostId,
              ),

              getComments(
                numericPostId,
              ),
            ]);

          setPost(postData);

          setComments(
            commentData,
          );
        } catch (error) {
          console.error(
            "커뮤니티 상세 조회 실패:",
            error,
          );

          setError(
            "게시글을 불러오지 못했습니다.",
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
  // 댓글 작성
  // ========================================

  const handleSubmit =
    async (
      event: React.FormEvent<HTMLFormElement>,
    ) => {
      event.preventDefault();

      const trimmedComment =
        comment.trim();

      if (!trimmedComment) {
        return;
      }

      if (!currentUser) {
        alert(
          "로그인이 필요합니다.",
        );

        navigate("/login");

        return;
      }

      try {
        const newComment =
          await createComment(
            numericPostId,
            trimmedComment,
          );

        setComments(
          (
            prevComments,
          ) => [
            ...prevComments,
            newComment,
          ],
        );

        setComment("");
      } catch (error) {
        console.error(
          "댓글 작성 실패:",
          error,
        );

        alert(
          "댓글 작성에 실패했습니다.",
        );
      }
    };

  // ========================================
  // 댓글 수정 시작
  // ========================================

  const handleStartEdit = (
    item: Comment,
  ) => {
    setEditingCommentId(
      item.id,
    );

    setEditingContent(
      item.content,
    );
  };

  // ========================================
  // 댓글 수정 취소
  // ========================================

  const handleCancelEdit =
    () => {
      setEditingCommentId(
        null,
      );

      setEditingContent("");
    };

  // ========================================
  // 댓글 수정 저장
  // ========================================

  const handleUpdate =
    async (
      commentId: number,
    ) => {
      const trimmedContent =
        editingContent.trim();

      if (!trimmedContent) {
        return;
      }

      try {
        const updatedComment =
          await updateComment(
            commentId,
            trimmedContent,
          );

        setComments(
          (
            prevComments,
          ) =>
            prevComments.map(
              (item) =>
                item.id ===
                commentId
                  ? updatedComment
                  : item,
            ),
        );

        setEditingCommentId(
          null,
        );

        setEditingContent("");
      } catch (error) {
        console.error(
          "댓글 수정 실패:",
          error,
        );

        alert(
          "댓글 수정에 실패했습니다.",
        );
      }
    };

  // ========================================
  // 댓글 삭제
  // ========================================

  const handleDelete =
    async (
      commentId: number,
    ) => {
      const confirmed =
        window.confirm(
          "댓글을 삭제하시겠습니까?",
        );

      if (!confirmed) {
        return;
      }

      try {
        await deleteComment(
          commentId,
        );

        setComments(
          (
            prevComments,
          ) =>
            prevComments.filter(
              (item) =>
                item.id !==
                commentId,
            ),
        );
      } catch (error) {
        console.error(
          "댓글 삭제 실패:",
          error,
        );

        alert(
          "댓글 삭제에 실패했습니다.",
        );
      }
    };

  // ========================================
  // 게시글 삭제
  // ========================================

  const handleDeletePost =
    async () => {
      if (!post) {
        return;
      }

      const confirmed =
        window.confirm(
          "게시글을 삭제하시겠습니까?",
        );

      if (!confirmed) {
        return;
      }

      try {
        await deletePost(
          post.id,
        );

        navigate("/posts");
      } catch (error) {
        console.error(
          "게시글 삭제 실패:",
          error,
        );

        alert(
          "게시글 삭제에 실패했습니다.",
        );
      }
    };

  // ========================================
  // Loading
  // ========================================

  if (loading) {
    return (
      <main className="min-h-screen bg-orange-50 px-4 py-10">

        <p className="text-center text-gray-500">
          게시글을 불러오는 중입니다...
        </p>

      </main>
    );
  }

  // ========================================
  // Error
  // ========================================

  if (
    error ||
    !post
  ) {
    return (
      <main className="min-h-screen bg-orange-50 px-4 py-10">

        <div className="text-center">

          <p className="text-red-500">
            {error ||
              "게시글을 찾을 수 없습니다."}
          </p>

          <Link
            to="/posts"
            className="mt-4 inline-block text-orange-500"
          >
            커뮤니티로 돌아가기
          </Link>

        </div>

      </main>
    );
  }

  // ========================================
  // 현재 사용자가 게시글 작성자인지 확인
  // ========================================

  const isPostOwner =
    currentUser?.id ===
    post.user.id;

  return (
    <main className="min-h-screen bg-orange-50 px-4 py-10">

      <div className="mx-auto max-w-3xl">

        {/* ========================================
            커뮤니티 목록으로 이동
        ======================================== */}

        <Link
          to="/posts"
          className="mb-6 inline-block text-sm font-semibold text-gray-500 transition hover:text-orange-500"
        >
          ← 커뮤니티로 돌아가기
        </Link>

        {/* ========================================
            게시글
        ======================================== */}

        <article className="rounded-3xl bg-white p-6 shadow-sm md:p-8">

          {/* 취미 / 제목 / 수정삭제 */}

          <div className="mb-5 flex items-start justify-between gap-4">

            <div>

              <span className="mb-2 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">
                {post.hobby.name}
              </span>

              <h1 className="text-2xl font-bold text-gray-900">
                {post.title}
              </h1>

            </div>

            {/* 내 게시글에만 수정 / 삭제 */}

            {isPostOwner && (
              <div className="flex shrink-0 gap-3">

                <Link
                  to={`/posts/${post.id}/edit`}
                  className="text-sm font-medium text-gray-400 transition hover:text-orange-500"
                >
                  수정
                </Link>

                <button
                  type="button"
                  onClick={
                    handleDeletePost
                  }
                  className="text-sm font-medium text-gray-400 transition hover:text-red-500"
                >
                  삭제
                </button>

              </div>
            )}

          </div>

          {/* ========================================
              작성자
          ======================================== */}

          <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-5">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-lg">
              🦔
            </div>

            <div>

              <div className="flex items-center gap-2">

                <p className="text-sm font-semibold text-gray-800">
                  {post.user.nickname}
                </p>

                {isPostOwner && (
                  <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-semibold text-orange-600">
                    나
                  </span>
                )}

              </div>

              <p className="text-xs text-gray-400">
                {new Date(
                  post.createdAt,
                ).toLocaleString(
                  "ko-KR",
                )}
              </p>

            </div>

          </div>

          {/* ========================================
              게시글 본문
          ======================================== */}

          <p className="whitespace-pre-line break-words leading-7 text-gray-700">
            {post.content}
          </p>

          {/* ========================================
              댓글 개수
          ======================================== */}

          <div className="mt-7 flex gap-4 border-t border-gray-100 pt-5 text-sm text-gray-500">

            <span>
              💬 {comments.length}
            </span>

          </div>

        </article>

        {/* ========================================
            댓글 영역
        ======================================== */}

        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm md:p-8">

          <h2 className="mb-6 text-xl font-bold text-gray-900">
            댓글 {comments.length}
          </h2>

          {/* ========================================
              댓글 작성
          ======================================== */}

          {currentUser ? (
            <form
              onSubmit={
                handleSubmit
              }
              className="mb-8 rounded-2xl bg-gray-50 p-4"
            >

              <label
                htmlFor="comment"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                댓글 작성
              </label>

              <textarea
                id="comment"
                value={comment}
                onChange={(
                  event,
                ) =>
                  setComment(
                    event.target
                      .value,
                  )
                }
                placeholder="댓글을 입력해주세요."
                rows={4}
                maxLength={300}
                className="w-full resize-none rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />

              <div className="mt-3 flex items-center justify-between">

                <span className="text-xs text-gray-400">
                  {comment.length} / 300
                </span>

                <button
                  type="submit"
                  disabled={
                    !comment.trim()
                  }
                  className="rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  댓글 등록
                </button>

              </div>

            </form>
          ) : (
            <div className="mb-8 rounded-2xl bg-gray-50 p-5 text-center">

              <p className="text-sm text-gray-500">
                댓글을 작성하려면 로그인이 필요합니다.
              </p>

              <Link
                to="/login"
                className="mt-3 inline-block rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                로그인
              </Link>

            </div>
          )}

          {/* ========================================
              댓글 없음
          ======================================== */}

          {comments.length ===
          0 ? (

            <div className="py-12 text-center">

              <p className="text-3xl">
                💬
              </p>

              <p className="mt-3 font-semibold text-gray-700">
                아직 댓글이 없습니다.
              </p>

              <p className="mt-1 text-sm text-gray-400">
                첫 번째 댓글을 남겨보세요!
              </p>

            </div>

          ) : (

            /* ========================================
                댓글 목록
            ======================================== */

            <div>

              {comments.map(
                (item) => {
                  const isMine =
                    currentUser?.id ===
                    item.user.id;

                  return (
                    <article
                      key={
                        item.id
                      }
                      className="border-b border-gray-100 py-5 last:border-b-0"
                    >

                      <div className="flex items-start justify-between gap-4">

                        {/* 작성자 */}

                        <div className="flex gap-3">

                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-100">
                            🦔
                          </div>

                          <div>

                            <div className="flex items-center gap-2">

                              <p className="text-sm font-semibold text-gray-800">
                                {
                                  item
                                    .user
                                    .nickname
                                }
                              </p>

                              {isMine && (
                                <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-semibold text-orange-600">
                                  나
                                </span>
                              )}

                            </div>

                            <p className="mt-1 text-xs text-gray-400">
                              {new Date(
                                item.createdAt,
                              ).toLocaleString(
                                "ko-KR",
                              )}
                            </p>

                          </div>

                        </div>

                        {/* ========================================
                            내 댓글에만 수정 / 삭제
                        ======================================== */}

                        {isMine && (
                          <div className="flex gap-2">

                            <button
                              type="button"
                              onClick={() =>
                                handleStartEdit(
                                  item,
                                )
                              }
                              className="text-xs font-medium text-gray-400 transition hover:text-orange-500"
                            >
                              수정
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleDelete(
                                  item.id,
                                )
                              }
                              className="text-xs font-medium text-gray-400 transition hover:text-red-500"
                            >
                              삭제
                            </button>

                          </div>
                        )}

                      </div>

                      {/* ========================================
                          댓글 수정 모드
                      ======================================== */}

                      {editingCommentId ===
                      item.id ? (

                        <div className="ml-12 mt-3">

                          <textarea
                            value={
                              editingContent
                            }
                            onChange={(
                              event,
                            ) =>
                              setEditingContent(
                                event
                                  .target
                                  .value,
                              )
                            }
                            rows={3}
                            maxLength={300}
                            className="w-full resize-none rounded-xl border border-gray-200 p-3 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                          />

                          <div className="mt-2 flex justify-end gap-2">

                            <button
                              type="button"
                              onClick={
                                handleCancelEdit
                              }
                              className="rounded-lg px-3 py-2 text-xs text-gray-500 transition hover:bg-gray-100"
                            >
                              취소
                            </button>

                            <button
                              type="button"
                              disabled={
                                !editingContent.trim()
                              }
                              onClick={() =>
                                handleUpdate(
                                  item.id,
                                )
                              }
                              className="rounded-lg bg-orange-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-gray-300"
                            >
                              저장
                            </button>

                          </div>

                        </div>

                      ) : (

                        <p className="ml-12 mt-3 break-words text-sm leading-6 text-gray-700">
                          {
                            item.content
                          }
                        </p>

                      )}

                    </article>
                  );
                },
              )}

            </div>
          )}

        </section>

      </div>

    </main>
  );
}

export default CommentPage;