import { Request, Response } from 'express';
import { HobbyService } from '../services/hobby.service';

const hobbyService = new HobbyService();

export const getHobbies = async (
  req: Request,
  res: Response
) => {
  try {
    const hobbies = await hobbyService.getHobbies();

    return res.status(200).json({
      message: '취미 목록 조회 성공',
      data: hobbies,
    });
  } catch (error) {
    return res.status(500).json({
      message: '취미 목록 조회 실패',
    });
  }
};