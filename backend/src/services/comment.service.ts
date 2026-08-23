import { AppDataSource } from "../config/data-source";
import { Comment } from "../entities/comment.entity";
import { User } from "../entities/user.entity";
import { Post } from "../entities/post.entity";

const commentRepository = AppDataSource.getRepository(Comment);
const userRepository = AppDataSource.getRepository(User);
const postRepository = AppDataSource.getRepository(Post);


// 댓글 작성
export const createComment = async (
  userId: number,
  postId: number,
  content: string
) => {
  const user = await userRepository.findOne({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  const post = await postRepository.findOne({
    where: { id: postId },
  });

  if (!post) {
    throw new Error("POST_NOT_FOUND");
  }

  const comment = commentRepository.create({
    user,
    post,
    content,
  });

  return await commentRepository.save(comment);
};


// 댓글 목록 조회
export const getComments = async (postId: number) => {
  const post = await postRepository.findOne({
    where: { id: postId },
  });

  if (!post) {
    throw new Error("POST_NOT_FOUND");
  }

  const comments = await commentRepository.find({
    where: {
      post: {
        id: postId,
      },
    },

    relations: {
      user: true,
    },

    order: {
      createdAt: "ASC",
    },
  });

  return comments;
};


// 댓글 수정
export const updateComment = async (
  userId: number,
  commentId: number,
  content: string
) => {
  const comment = await commentRepository.findOne({
    where: {
      id: commentId,
    },

    relations: {
      user: true,
    },
  });

  if (!comment) {
    throw new Error("COMMENT_NOT_FOUND");
  }

  if (comment.user.id !== userId) {
    throw new Error("FORBIDDEN");
  }

  comment.content = content;

  return await commentRepository.save(comment);
};


// 댓글 삭제
export const deleteComment = async (
  userId: number,
  commentId: number
) => {
  const comment = await commentRepository.findOne({
    where: {
      id: commentId,
    },

    relations: {
      user: true,
    },
  });

  if (!comment) {
    throw new Error("COMMENT_NOT_FOUND");
  }

  if (comment.user.id !== userId) {
    throw new Error("FORBIDDEN");
  }

  await commentRepository.remove(comment);
};