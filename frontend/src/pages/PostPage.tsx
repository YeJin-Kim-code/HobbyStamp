import PostCard from "../components/post/PostCard";

const posts = [
  {
    id: 1,
    title: "오늘 러닝 5km 완료!",
    content:
      "처음에는 조금 힘들었지만 끝까지 달리고 나니 정말 뿌듯했다. 다음에는 기록도 조금 더 단축해보고 싶다.",
    hobby: "러닝",
    author: "HobbyRunner",
    createdAt: "2026.09.05",
    likes: 12,
    comments: 3,
  },
  {
    id: 2,
    title: "오랜만에 책 한 권 완독",
    content:
      "미뤄두었던 책을 드디어 다 읽었다. 하루에 조금씩 읽는 습관을 들이니까 생각보다 금방 읽을 수 있었다.",
    hobby: "독서",
    author: "BookLover",
    createdAt: "2026.09.04",
    likes: 8,
    comments: 2,
  },
  {
    id: 3,
    title: "새로운 쿠키 레시피 도전",
    content:
      "초콜릿 쿠키를 처음 만들어봤다. 모양은 조금 아쉬웠지만 맛은 꽤 괜찮아서 다음에도 다시 만들어볼 생각이다.",
    hobby: "베이킹",
    author: "CookieMaker",
    createdAt: "2026.09.03",
    likes: 21,
    comments: 7,
  },
];

function PostPage() {
  return (
    <main className="min-h-screen bg-orange-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        {/* 페이지 상단 */}
        <section className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold text-orange-500">
              Hobby Community
            </p>

            <h1 className="text-3xl font-bold text-gray-800">
              취미 커뮤니티
            </h1>

            <p className="mt-2 text-gray-500">
              취미 활동을 기록하고 다른 사람들과 경험을 공유해보세요.
            </p>
          </div>

          <button
            type="button"
            className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            글쓰기
          </button>
        </section>

        {/* 게시글 목록 */}
        <section className="grid gap-5">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </section>
      </div>
    </main>
  );
}

export default PostPage;