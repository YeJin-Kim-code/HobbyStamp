import express from "express";
import cors from "cors";

import authRouter from "./routes/auth.routes";
import hobbyRoutes from "./routes/hobby.routes";
import hobbyRecordRoutes from "./routes/hobby-record.routes";
import stampRoutes from "./routes/stamp.routes";
import postRoutes from "./routes/post.route";
import commentRoutes from "./routes/comment.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import mypageRoutes from "./routes/mypage.routes";
import aiRouter from "./routes/ai.router";

const app = express();

// ========================================
// CORS 설정
// ========================================
//
// 개발 환경:
// FRONTEND_URL=http://localhost:5173
//
// 배포 환경:
// FRONTEND_URL=https://배포된-프론트주소
//
// 프론트 주소가 변경되어도 코드를 수정하지 않고
// 환경변수만 변경할 수 있도록 구성한다.
//
const frontendUrl =
  process.env.FRONTEND_URL || "http://localhost:5173";

app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
  }),
);

// ========================================
// JSON Body Parser
// ========================================

app.use(express.json());

// ========================================
// Routes
// ========================================

app.use("/auth", authRouter);

app.use("/api/hobbies", hobbyRoutes);
app.use("/api/hobby-records", hobbyRecordRoutes);
app.use("/api/stamps", stampRoutes);

app.use("/posts", postRoutes);
app.use(commentRoutes);

app.use("/dashboard", dashboardRoutes);
app.use("/mypage", mypageRoutes);
app.use("/ai", aiRouter);

export default app;