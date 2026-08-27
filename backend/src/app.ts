import express from "express";
import authRouter from "./routes/auth.routes";
import hobbyRoutes from "./routes/hobby.routes";
import hobbyRecordRoutes from "./routes/hobby-record.routes";
import stampRoutes from "./routes/stamp.routes";
import postRoutes from "./routes/post.route";
import commentRoutes from "./routes/comment.routes";
import dashboardRoutes from "./routes/dashboard.routes";
const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/api/hobbies", hobbyRoutes);
app.use("/api/hobby-records", hobbyRecordRoutes);
app.use("/stamps", stampRoutes);
app.use("/posts", postRoutes);

app.use(commentRoutes);
app.use("/dashboard", dashboardRoutes);
export default app;
