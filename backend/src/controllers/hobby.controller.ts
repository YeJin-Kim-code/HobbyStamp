import { Response } from "express";

import { AuthRequest } from "../middlewares/auth.middleware";

import { HobbyService } from "../services/hobby.service";

const hobbyService = new HobbyService();

/*
 * 전체 취미 조회
 *
 * JWT에서 로그인한 사용자 ID를 가져온다.
 *
 * 단순 Hobby 목록만 반환하는 게 아니라,
 * 현재 사용자가 해당 취미를 선택했는지도 함께 반환한다.
 */
export const getHobbies = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "인증 정보가 없습니다.",
      });
    }

    const userId = req.user.userId;

    const hobbies = await hobbyService.getHobbies(userId);

    return res.status(200).json({
      message: "취미 목록 조회 성공",
      data: hobbies,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "취미 목록 조회 실패",
    });
  }
};

/*
 * 관심 취미 등록
 */
export const pinHobby = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "인증 정보가 없습니다.",
      });
    }

    const userId = req.user.userId;

    const hobbyId = Number(req.params.id);

    if (Number.isNaN(hobbyId)) {
      return res.status(400).json({
        message: "올바르지 않은 취미 ID입니다.",
      });
    }

    const result = await hobbyService.pinHobby(userId, hobbyId);

    return res.status(200).json({
      message: "관심 취미 등록 성공",
      data: result,
    });
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      message: error instanceof Error ? error.message : "관심 취미 등록 실패",
    });
  }
};

/*
 * 관심 취미 해제
 */
export const unpinHobby = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "인증 정보가 없습니다.",
      });
    }

    const userId = req.user.userId;

    const hobbyId = Number(req.params.id);

    if (Number.isNaN(hobbyId)) {
      return res.status(400).json({
        message: "올바르지 않은 취미 ID입니다.",
      });
    }

    const result = await hobbyService.unpinHobby(userId, hobbyId);

    return res.status(200).json({
      message: "관심 취미 해제 성공",
      data: result,
    });
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      message: error instanceof Error ? error.message : "관심 취미 해제 실패",
    });
  }
};
