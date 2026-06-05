import express from 'express';
import authRouter from './routes/auth.routes';
import hobbyRoutes from "./routes/hobby.routes"
const app = express();

app.use(express.json());

app.use('/auth', authRouter);
app.use('/api/hobbies', hobbyRoutes);
export default app;