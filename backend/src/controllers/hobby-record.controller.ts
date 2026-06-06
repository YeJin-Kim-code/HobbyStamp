import { Request, Response } from 'express';
import { HobbyRecordService } from '../services/hobby-record.service';

const hobbyRecordService = new HobbyRecordService();

export const createHobbyRecord = async (req: Request, res: Response) => {
  try {
    const hobbyRecord = await hobbyRecordService.createHobbyRecord(req.body);

    return res.status(201).json({
      message: '기록 작성 성공',
      data: hobbyRecord,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: '서버 오류가 발생했습니다.',
    });
  }
};