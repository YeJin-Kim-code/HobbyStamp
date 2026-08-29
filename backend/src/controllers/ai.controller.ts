import { Request, Response } from "express";
import * as aiService from "../services/ai.service";

export const summarizePost = async (req: Request, res: Response) => {
  try {
    const postId = Number(req.params.postId);

    if (Number.isNaN(postId)) {
      return res.status(400).json({
        message: "올바른 게시글 ID를 입력해주세요.",
      });
    }

    const summary = await aiService.summarizePost(postId);

    return res.status(200).json({
      message: "AI 게시글 요약 성공",
      data: {
        summary,
      },
    });
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      if (error.message === "POST_NOT_FOUND") {
        return res.status(404).json({
          message: "게시글을 찾을 수 없습니다.",
        });
      }

      if (error.message === "AI_SUMMARY_FAILED") {
        return res.status(500).json({
          message: "AI 요약 생성에 실패했습니다.",
        });
      }
    }

    return res.status(500).json({
      message: "AI 게시글 요약 중 오류가 발생했습니다.",
    });
  }
};