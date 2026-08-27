import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import * as mypageController from "../controllers/mypage.controller";

const router = Router();

router.get("/", authenticate, mypageController.getMyPage);

export default router;
