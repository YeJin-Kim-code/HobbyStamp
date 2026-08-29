import { Router } from "express";

import { authenticate } from "../middlewares/auth.middleware";
import * as aiController from "../controllers/ai.controller";

const router = Router();

router.post(
  "/posts/:postId/summary",
  authenticate,
  aiController.summarizePost
);
router.post(
  "/me/hobby-analysis",
  authenticate,
  aiController.analyzeHobbyType
);
export default router;