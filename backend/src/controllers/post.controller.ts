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