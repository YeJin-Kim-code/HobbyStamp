import { AppDataSource } from "../config/data-source";
import { Post } from "../entities/post.entity";
import { User } from "../entities/user.entity";
import { Hobby } from "../entities/hobby.entity";
import { Comment } from "../entities/comment.entity";

const postRepository = AppDataSource.getRepository(Post);
const userRepository = AppDataSource.getRepository(User);
const hobbyRepository = AppDataSource.getRepository(Hobby);
const commentRepository = AppDataSource.getRepository(Comment);

// ========================================
// 게시글 목록 조회
// ========================================
export const getPosts = async () => {
  const posts = await postRepository.find({
    relations: {
      user: true,
      hobby: true,
    },

    order: {
      createdAt: "DESC",
    },
  });

  /*
   * 현재 Post Entity에 comments 관계가 없기 때문에
   * 댓글 개수를 따로 계산한다.
   *
   * 나중에는 QueryBuilder나 relationCount로
   * 최적화할 수 있다.
   */
  const postsWithCommentCount = await Promise.all(
    posts.map(async (post) => {
      const commentCount = await commentRepository.count({
        where: {
          post: {
            id: post.id,
          },
        },
      });

      return {
        ...post,
        commentCount,
      };
    }),
  );

  return postsWithCommentCount;
};

// ========================================
// 게시글 상세 조회
// ========================================
export const getPost = async (postId: number) => {
  const post = await postRepository.findOne({
    where: {
      id: postId,
    },

    relations: {
      user: true,
      hobby: true,
    },
  });

  if (!post) {
    throw new Error("POST_NOT_FOUND");
  }

  const commentCount = await commentRepository.count({
    where: {
      post: {
        id: postId,
      },
    },
  });

  return {
    ...post,
    commentCount,
  };
};

// ========================================
// 게시글 작성
// ========================================
export const createPost = async (
  userId: number,
  hobbyId: number,
  title: string,
  content: string,
) => {
  const user = await userRepository.findOne({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  const hobby = await hobbyRepository.findOne({
    where: { id: hobbyId },
  });

  if (!hobby) {
    throw new Error("HOBBY_NOT_FOUND");
  }

  const post = postRepository.create({
    user,
    hobby,
    title,
    content,
    aiSummary: null,
  });

  return await postRepository.save(post);
};

// ========================================
// 게시글 수정
// ========================================
export const updatePost = async (
  userId: number,
  postId: number,
  title: string,
  content: string,
  hobbyId: number,
) => {
  const post = await postRepository.findOne({
    where: { id: postId },

    relations: {
      user: true,
      hobby: true,
    },
  });

  if (!post) {
    throw new Error("POST_NOT_FOUND");
  }

  if (post.user.id !== userId) {
    throw new Error("FORBIDDEN");
  }

  const hobby = await hobbyRepository.findOne({
    where: { id: hobbyId },
  });

  if (!hobby) {
    throw new Error("HOBBY_NOT_FOUND");
  }

  post.title = title;
  post.content = content;
  post.hobby = hobby;

  // 게시글 내용이 수정되면 기존 AI 요약은 무효화
  post.aiSummary = null;

  return await postRepository.save(post);
};

// ========================================
// 게시글 삭제
// ========================================
export const deletePost = async (
  userId: number,
  postId: number,
) => {
  const post = await postRepository.findOne({
    where: { id: postId },

    relations: {
      user: true,
    },
  });

  if (!post) {
    throw new Error("POST_NOT_FOUND");
  }

  if (post.user.id !== userId) {
    throw new Error("FORBIDDEN");
  }

  await postRepository.remove(post);
};