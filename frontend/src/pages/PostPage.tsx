import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import PostCard from "../components/post/PostCard";

import {
  getPosts,
  type Post,
} from "../api/post";

function PostPage() {
  // ========================================
  // State
  // ========================================

  const [
    posts,
    setPosts,
  ] =
    useState<Post[]>([]);

  const [
    loading,
    setLoading,
  ] =
    useState(true);

  const [
    error,
    setError,
  ] =
    useState("");

  // ========================================
  // 게시글 목록 조회
  // ========================================

  useEffect(() => {
    const fetchPosts =
      async () => {
        try {
          setLoading(true);

          setError("");

          const data =
            await getPosts();

          setPosts(data);
        } catch (error) {
          console.error(
            "게시글 조회 실패:",
            error,
          );

          setError(
            "게시글을 불러오지 못했습니다.",
          );
        } finally {
          setLoading(false);
        }
      };

    fetchPosts();
  }, []);

  return (
    <main className="min-h-screen bg-orange-50 px-6 py-10">

      <div className="mx-auto max-w-5xl">

        {/* ========================================
            페이지 상단
        ======================================== */}

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

          {/* 글쓰기 페이지 이동 */}

          <Link
            to="/posts/write"
            className="rounded-xl bg-orange-500 px-5 py-3 text-center font-semibold text-white transition hover:bg-orange-600"
          >
            글쓰기
          </Link>

        </section>

        {/* Loading */}

        {loading && (
          <div className="py-20 text-center text-gray-500">
            게시글을 불러오는 중입니다...
          </div>
        )}

        {/* Error */}

        {!loading &&
          error && (
            <div className="py-20 text-center text-red-500">
              {error}
            </div>
          )}

        {/* 게시글 없음 */}

        {!loading &&
          !error &&
          posts.length ===
            0 && (
            <div className="rounded-3xl bg-white py-20 text-center shadow-sm">

              <p className="text-4xl">
                📝
              </p>

              <p className="mt-4 font-semibold text-gray-700">
                아직 게시글이 없습니다.
              </p>

              <p className="mt-1 text-sm text-gray-400">
                첫 번째 취미 이야기를 남겨보세요!
              </p>

            </div>
          )}

        {/* 게시글 목록 */}

        {!loading &&
          !error &&
          posts.length >
            0 && (
            <section className="grid gap-5">

              {posts.map(
                (post) => (
                  <PostCard
                    key={
                      post.id
                    }
                    post={
                      post
                    }
                  />
                ),
              )}

            </section>
          )}

      </div>

    </main>
  );
}

export default PostPage;