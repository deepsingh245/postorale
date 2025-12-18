import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import blogRoutes from './routes/blog.routes';
import aiRoutes from './routes/ai.routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

import authRoutes from './routes/auth.routes';
import commentRoutes from './routes/comment.routes';

app.use('/auth', authRoutes);
app.use('/comments', commentRoutes);
app.use('/blogs', blogRoutes);
app.use('/ai', aiRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Postorale Backend is running');
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
