import { Request, Response } from "express";
import * as commentService from "../services/comment.service";


// 댓글 작성
export const createComment = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.userId;
    const postId = Number(req.params.postId);

    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        message: "댓글 내용을 입력해주세요.",
      });
    }

    const comment = await commentService.createComment(
      userId,
      postId,
      content
    );

    return res.status(201).json({
      message: "댓글 작성 성공",
      data: comment,
    });
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      if (error.message === "USER_NOT_FOUND") {
        return res.status(404).json({
          message: "사용자를 찾을 수 없습니다.",
        });
      }

      if (error.message === "POST_NOT_FOUND") {
        return res.status(404).json({
          message: "게시글을 찾을 수 없습니다.",
        });
      }
    }

    return res.status(500).json({
      message: "댓글 작성 실패",
    });
  }
};


// 댓글 조회
export const getComments = async (
  req: Request,
  res: Response
) => {
  try {
    const postId = Number(req.params.postId);

    const comments = await commentService.getComments(postId);

    return res.status(200).json({
      message: "댓글 조회 성공",
      data: comments,
    });
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      if (error.message === "POST_NOT_FOUND") {
        return res.status(404).json({
          message: "게시글을 찾을 수 없습니다.",
        });
      }
    }

    return res.status(500).json({
      message: "댓글 조회 실패",
    });
  }
};


// 댓글 수정
export const updateComment = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.userId;
    const commentId = Number(req.params.id);

    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        message: "댓글 내용을 입력해주세요.",
      });
    }

    const comment = await commentService.updateComment(
      userId,
      commentId,
      content
    );

    return res.status(200).json({
      message: "댓글 수정 성공",
      data: comment,
    });
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      if (error.message === "COMMENT_NOT_FOUND") {
        return res.status(404).json({
          message: "댓글을 찾을 수 없습니다.",
        });
      }

      if (error.message === "FORBIDDEN") {
        return res.status(403).json({
          message: "댓글 수정 권한이 없습니다.",
        });
      }
    }

    return res.status(500).json({
      message: "댓글 수정 실패",
    });
  }
};


// 댓글 삭제
export const deleteComment = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.userId;
    const commentId = Number(req.params.id);

    await commentService.deleteComment(
      userId,
      commentId
    );

    return res.status(200).json({
      message: "댓글 삭제 성공",
    });
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      if (error.message === "COMMENT_NOT_FOUND") {
        return res.status(404).json({
          message: "댓글을 찾을 수 없습니다.",
        });
      }

      if (error.message === "FORBIDDEN") {
        return res.status(403).json({
          message: "댓글 삭제 권한이 없습니다.",
        });
      }
    }

    return res.status(500).json({
      message: "댓글 삭제 실패",
    });
  }
};