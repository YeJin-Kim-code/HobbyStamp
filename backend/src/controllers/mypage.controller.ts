import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import * as mypageService from "../services/mypage.service";

export const getMyPage = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "인증 정보가 없습니다.",
      });
    }

    const userId = req.user.userId;

    const myPage = await mypageService.getMyPage(userId);

    return res.status(200).json({
      message: "마이페이지 조회 성공",
      data: myPage,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "마이페이지 조회 실패",
    });
  }
};
