import { useState } from "react";
import { Link, useParams } from "react-router-dom";

type Comment = {
  id: number;
  author: string;
  content: string;
  createdAt: string;
  isMine: boolean;
};

const initialComments: Comment[] = [
  {
    id: 1,
    author: "취미탐험가",
    content: "저도 요즘 러닝 시작했는데 생각보다 재미있더라고요!",
    createdAt: "2026.09.04 21:10",
    isMine: false,
  },
  {
    id: 2,
    author: "HobbyStamp",
    content: "꾸준히 기록하면 나중에 보는 재미도 있을 것 같아요 :)",
    createdAt: "2026.09.04 21:25",
    isMine: true,
  },
  {
    id: 3,
    author: "책읽는개발자",
    content: "5km 완주 축하드립니다 👏",
    createdAt: "2026.09.04 22:03",
    isMine: false,
  },
];

function CommentPage() {
  // URL의 /posts/:postId/comments 에서 postId를 가져온다.
  const { postId } = useParams();

  // 댓글 목록 상태
  const [comments, setComments] = useState<Comment[]>(initialComments);

  // 댓글 입력창 상태
  const [comment, setComment] = useState("");

  // 댓글 작성
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedComment = comment.trim();

    // 공백만 입력한 경우 댓글을 추가하지 않는다.
    if (!trimmedComment) {
      return;
    }

    const newComment: Comment = {
      id: Date.now(),
      author: "HobbyStamp",
      content: trimmedComment,
      createdAt: "방금 전",
      isMine: true,
    };

    setComments((prevComments) => [...prevComments, newComment]);

    // 댓글 작성 후 입력창 비우기
    setComment("");
  };

  // 댓글 삭제
  const handleDelete = (commentId: number) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId),
    );
  };

  return (
    <main className="min-h-screen bg-orange-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        {/* 이전 페이지 */}
        <Link
          to="/posts"
          className="mb-6 inline-block text-sm font-semibold text-gray-500 transition hover:text-orange-500"
        >
          ← 커뮤니티로 돌아가기
        </Link>

        {/* 게시글 */}
        <article className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <span className="mb-2 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">
                🏃 러닝
              </span>

              <h1 className="text-2xl font-bold text-gray-900">
                오늘 처음으로 5km 완주했어요!
              </h1>
            </div>
          </div>

          <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-lg">
              🦔
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-800">HobbyStamp</p>
              <p className="text-xs text-gray-400">2026.09.04 20:30</p>
            </div>
          </div>

          <p className="whitespace-pre-line leading-7 text-gray-700">
            처음에는 1km도 힘들었는데 조금씩 달리다 보니 드디어 5km를
            완주했습니다.
            {"\n\n"}
            앞으로도 HobbyStamp에 꾸준히 기록하면서 10km까지 도전해보려고
            합니다!
          </p>

          <div className="mt-7 flex gap-4 border-t border-gray-100 pt-5 text-sm text-gray-500">
            <span>❤️ 12</span>
            <span>💬 {comments.length}</span>
          </div>
        </article>

        {/* 댓글 영역 */}
        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-6 text-xl font-bold text-gray-900">
            댓글 {comments.length}
          </h2>

          {/* 댓글 작성 */}
          <form
            onSubmit={handleSubmit}
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
              onChange={(event) => setComment(event.target.value)}
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
                disabled={!comment.trim()}
                className="rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                댓글 등록
              </button>
            </div>
          </form>

          {/* 댓글이 없는 경우 */}
          {comments.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-3xl">💬</p>

              <p className="mt-3 font-semibold text-gray-700">
                아직 댓글이 없습니다.
              </p>

              <p className="mt-1 text-sm text-gray-400">
                첫 번째 댓글을 남겨보세요!
              </p>
            </div>
          ) : (
            /* 댓글 목록 */
            <div>
              {comments.map((item) => (
                <article
                  key={item.id}
                  className="border-b border-gray-100 py-5 last:border-b-0"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-100">
                        🦔
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-gray-800">
                            {item.author}
                          </p>

                          {item.isMine && (
                            <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-semibold text-orange-600">
                              나
                            </span>
                          )}
                        </div>

                        <p className="mt-1 text-xs text-gray-400">
                          {item.createdAt}
                        </p>
                      </div>
                    </div>

                    {/* 내 댓글일 경우에만 버튼 노출 */}
                    {item.isMine && (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="text-xs font-medium text-gray-400 transition hover:text-orange-500"
                        >
                          수정
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="text-xs font-medium text-gray-400 transition hover:text-red-500"
                        >
                          삭제
                        </button>
                      </div>
                    )}
                  </div>

                  <p className="ml-12 mt-3 break-words text-sm leading-6 text-gray-700">
                    {item.content}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* 개발 중 postId 확인용 */}
        <p className="mt-4 text-center text-xs text-gray-400">
          Post ID: {postId ?? "없음"}
        </p>
      </div>
    </main>
  );
}

export default CommentPage;