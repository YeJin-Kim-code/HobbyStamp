import { Request, Response } from "express";
import * as postService from "../services/post.service";

export const createPost = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const { hobbyId, title, content } = req.body;

    if (!hobbyId || !title || !content) {
      return res.status(400).json({
        message: "취미, 제목, 내용을 모두 입력해주세요.",
      });
    }

    const post = await postService.createPost(
      userId,
      hobbyId,
      title,
      content
    );

    return res.status(201).json({
      message: "게시글 작성 성공",
      data: post,
    });
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      if (error.message === "USER_NOT_FOUND") {
        return res.status(404).json({
          message: "사용자를 찾을 수 없습니다.",
        });
      }

      if (error.message === "HOBBY_NOT_FOUND") {
        return res.status(404).json({
          message: "취미를 찾을 수 없습니다.",
        });
      }
    }

    return res.status(500).json({
      message: "게시글 작성 실패",
    });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const postId = Number(req.params.id);

    const { hobbyId, title, content } = req.body;

    if (!hobbyId || !title || !content) {
      return res.status(400).json({
        message: "취미, 제목, 내용을 모두 입력해주세요.",
      });
    }

    const post = await postService.updatePost(
      userId,
      postId,
      title,
      content,
      hobbyId
    );

    return res.status(200).json({
      message: "게시글 수정 성공",
      data: post,
    });
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      if (error.message === "POST_NOT_FOUND") {
        return res.status(404).json({
          message: "게시글을 찾을 수 없습니다.",
        });
      }

      if (error.message === "FORBIDDEN") {
        return res.status(403).json({
          message: "게시글 수정 권한이 없습니다.",
        });
      }

      if (error.message === "HOBBY_NOT_FOUND") {
        return res.status(404).json({
          message: "취미를 찾을 수 없습니다.",
        });
      }
    }

    return res.status(500).json({
      message: "게시글 수정 실패",
    });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const postId = Number(req.params.id);

    await postService.deletePost(userId, postId);

    return res.status(200).json({
      message: "게시글 삭제 성공",
    });
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      if (error.message === "POST_NOT_FOUND") {
        return res.status(404).json({
          message: "게시글을 찾을 수 없습니다.",
        });
      }

      if (error.message === "FORBIDDEN") {
        return res.status(403).json({
          message: "게시글 삭제 권한이 없습니다.",
        });
      }
    }

    return res.status(500).json({
      message: "게시글 삭제 실패",
    });
  }
};