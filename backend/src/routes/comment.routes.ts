import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { verifyToken, AuthRequest } from '../middlewares/auth.middleware';

const router = Router();

// Get comments for a blog
router.get('/:blogId', async (req: Request, res: Response) => {
    const { blogId } = req.params;
    try {
        const { data, error } = await supabase
            .from('comments')
            .select('*, users(display_name, photo_url)')
            .eq('blog_id', blogId)
            .order('created_at', { ascending: true });

        if (error) throw error;
        return res.json(data);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch comments' });
    }
});

// Post a comment
router.post('/', verifyToken, async (req: AuthRequest, res: Response) => {
    const { blogId, content } = req.body;
    const authorId = req.user?.uid;

    if (!content) return res.status(400).json({ error: 'Content is required' });

    try {
        const { data, error } = await supabase
            .from('comments')
            .insert([{ blog_id: blogId, author_id: authorId, content }])
            .select()
            .single();

        if (error) throw error;
        return res.status(201).json(data);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to post comment' });
    }
});

export default router;
