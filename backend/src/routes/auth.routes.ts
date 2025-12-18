import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { verifyToken, AuthRequest } from '../middlewares/auth.middleware';

const router = Router();

// Endpoint to sync Google User with Supabase
router.post('/google', verifyToken, async (req: AuthRequest, res: Response) => {
    const { uid, email, displayName, photoURL } = req.user as any;

    try {
        const { data, error } = await supabase
            .from('users')
            .upsert({
                id: uid,
                email,
                display_name: displayName,
                photo_url: photoURL,
                created_at: new Date().toISOString()
            })
            .select()
            .single();

        if (error) throw error;
        return res.json(data);
    } catch (error) {
        console.error('Error syncing user:', error);
        return res.status(500).json({ error: 'Failed to sync user' });
    }
});

export default router;
