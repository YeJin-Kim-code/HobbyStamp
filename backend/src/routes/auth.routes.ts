import { Router } from 'express';
import { AuthService } from '../services/auth.service';

const router = Router();
const authService = new AuthService();

router.post('/signup', async (req, res) => {
  try {
    const user = await authService.signup(req.body);

    return res.status(201).json({
      message: '회원가입 성공',
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error ? error.message : '회원가입 실패',
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const result = await authService.login(req.body);

    return res.status(200).json({
      message: '로그인 성공',
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error ? error.message : '로그인 실패',
    });
  }
});

export default router;