import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import * as dashboardService from "../services/dashboard.service";

export const getDashboard = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "인증 정보가 없습니다.",
      });
    }

    const userId = req.user.userId;

    const dashboard = await dashboardService.getDashboard(userId);

    return res.status(200).json({
      message: "대시보드 조회 성공",
      data: dashboard,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "대시보드 조회 실패",
    });
  }
};
