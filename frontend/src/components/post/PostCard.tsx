type Post = {
  id: number;
  title: string;
  content: string;
  hobby: string;
  author: string;
  createdAt: string;
  likes: number;
  comments: number;
};

type PostCardProps = {
  post: Post;
};

function PostCard({ post }: PostCardProps) {
  return (
    <article className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      {/* 취미 카테고리 */}
      <div className="mb-3">
        <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-600">
          {post.hobby}
        </span>
      </div>

      {/* 게시글 제목 */}
      <h2 className="mb-2 text-xl font-bold text-gray-800">
        {post.title}
      </h2>

      {/* 게시글 내용 */}
      <p className="mb-5 line-clamp-2 leading-7 text-gray-600">
        {post.content}
      </p>

      {/* 작성자 / 작성일 */}
      <div className="mb-4 flex items-center justify-between text-sm text-gray-400">
        <span>{post.author}</span>
        <span>{post.createdAt}</span>
      </div>

      {/* 좋아요 / 댓글 */}
      <div className="flex gap-5 border-t border-gray-100 pt-4 text-sm text-gray-500">
        <span>♡ 좋아요 {post.likes}</span>
        <span>💬 댓글 {post.comments}</span>
      </div>
    </article>
  );
}

export default PostCard;