import { Router } from 'express';
import { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog } from '../controllers/blog.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.post('/', verifyToken, createBlog);
router.put('/:id', verifyToken, updateBlog);
router.delete('/:id', verifyToken, deleteBlog);

export default router;
