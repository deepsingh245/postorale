import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { AuthRequest } from '../middlewares/auth.middleware';

export const getAllBlogs = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase
            .from('blogs')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return res.json(data);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const getBlogById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const { data, error } = await supabase
            .from('blogs')
            .select('*')
            .eq('id', id)
            .single();

        if (error) return res.status(404).json({ error: 'Blog not found' });
        return res.json(data);
    } catch (error) {
        console.error('Error fetching blog:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const createBlog = async (req: AuthRequest, res: Response) => {
    const { title, content, tags } = req.body;
    const authorId = req.user?.uid;

    if (!authorId) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const { data, error } = await supabase
            .from('blogs')
            .insert([
                { title, content, tags, author_id: authorId, likes_count: 0 }
            ])
            .select()
            .single();

        if (error) throw error;
        return res.status(201).json(data);
    } catch (error) {
        console.error('Error creating blog:', error);
        return res.status(500).json({ error: 'Failed to create blog' });
    }
};

export const updateBlog = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { title, content, tags } = req.body;
    const authorId = req.user?.uid;

    if (!authorId) return res.status(401).json({ error: 'Unauthorized' });

    try {
        // Check ownership
        const { data: blog } = await supabase.from('blogs').select('author_id').eq('id', id).single();
        if (!blog) return res.status(404).json({ error: 'Blog not found' });
        if (blog.author_id !== authorId) return res.status(403).json({ error: 'Forbidden' });

        const { data, error } = await supabase
            .from('blogs')
            .update({ title, content, tags, updated_at: new Date().toISOString() })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return res.json(data);
    } catch (error) {
        console.error('Error updating blog:', error);
        return res.status(500).json({ error: 'Failed to update blog' });
    }
};

export const deleteBlog = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const authorId = req.user?.uid;

    if (!authorId) return res.status(401).json({ error: 'Unauthorized' });

    try {
        // Check ownership
        const { data: blog } = await supabase.from('blogs').select('author_id').eq('id', id).single();
        if (!blog) return res.status(404).json({ error: 'Blog not found' });
        if (blog.author_id !== authorId) return res.status(403).json({ error: 'Forbidden' });

        const { error } = await supabase
            .from('blogs')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        console.error('Error deleting blog:', error);
        return res.status(500).json({ error: 'Failed to delete blog' });
    }
};
