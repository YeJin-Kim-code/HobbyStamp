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

export default router;