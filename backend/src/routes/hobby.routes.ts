import { Router } from "express";

import {
  getHobbies,
  pinHobby,
  unpinHobby,
} from "../controllers/hobby.controller";

import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

/*
 * 취미 기능은 현재 로그인한 사용자 정보를 사용하므로
 * JWT 인증 미들웨어를 적용한다.
 */

router.get("/", authenticate, getHobbies);

router.post("/:id/pin", authenticate, pinHobby);

router.delete("/:id/pin", authenticate, unpinHobby);

export default router;
