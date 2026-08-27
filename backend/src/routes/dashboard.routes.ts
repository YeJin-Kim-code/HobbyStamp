import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import * as dashboardController from "../controllers/dashboard.controller";

const router = Router();

router.get("/", authenticate, dashboardController.getDashboard);

export default router;
