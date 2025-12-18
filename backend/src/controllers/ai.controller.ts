import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const generateBlog = async (req: Request, res: Response) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        const result = await model.generateContent(`Write a comprehensive, engaging markdown blog post about: ${prompt}. Include a title, introduction, body with headers, and conclusion.`);
        const response = await result.response;
        const text = response.text();

        return res.json({ content: text });
    } catch (error) {
        console.error('Gemini API Error:', error);
        return res.status(500).json({ error: 'Failed to generate blog content' });
    }
};

export const generateOutline = async (req: Request, res: Response) => {
    const { topic } = req.body;

    if (!topic) {
        return res.status(400).json({ error: 'Topic is required' });
    }

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        const result = await model.generateContent(`Create a detailed blog post outline for the topic: ${topic}. Return as a JSON array of strings representing section headers.`);
        const response = await result.response;
        const text = response.text();

        // Attempt to parse JSON if Gemini returns it, or just return text
        return res.json({ outline: text });
    } catch (error) {
        console.error('Gemini API Error:', error);
        return res.status(500).json({ error: 'Failed to generate outline' });
    }
};
