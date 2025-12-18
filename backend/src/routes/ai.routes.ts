import { Router } from 'express';
import { generateBlog, generateOutline } from '../controllers/ai.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

// Protect AI routes to prevent abuse
router.post('/generate-blog', verifyToken, generateBlog);
router.post('/generate-outline', verifyToken, generateOutline);

export default router;
