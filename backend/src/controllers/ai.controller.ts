import { Response } from "express";

import { AuthRequest } from "../middlewares/auth.middleware";

import * as aiService from "../services/ai.service";

// ========================================
// 게시글 AI 요약
// ========================================

export const summarizePost = async (req: AuthRequest, res: Response) => {
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

// ========================================
// 취미 유형 AI 분석
// ========================================

export const analyzeHobbyType = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "인증 정보가 없습니다.",
      });
    }

    const userId = req.user.userId;

    const result = await aiService.analyzeHobbyType(userId);

    return res.status(200).json({
      message: "AI 취미 유형 분석 성공",

      data: result,
    });
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      if (error.message === "HOBBY_RECORD_NOT_FOUND") {
        return res.status(404).json({
          message: "분석할 취미 기록이 없습니다.",
        });
      }

      if (
        error.message === "AI_ANALYSIS_FAILED" ||
        error.message === "AI_RESPONSE_FORMAT_INVALID"
      ) {
        return res.status(500).json({
          message: "AI 취미 분석에 실패했습니다.",
        });
      }
    }

    return res.status(500).json({
      message: "AI 취미 분석 중 오류가 발생했습니다.",
    });
  }
};
