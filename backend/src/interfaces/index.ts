export interface User {
    id: string; // Firebase UID
    email: string;
    displayName?: string;
    photoURL?: string;
    createdAt: string;
}

export interface Blog {
    id: string; // UUID from Supabase
    title: string;
    content: string; // Markdown or HTML
    authorId: string;
    tags: string[];
    likesCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface Comment {
    id: string;
    blogId: string;
    authorId: string;
    content: string;
    createdAt: string;
}

export interface Like {
    blogId: string;
    userId: string;
    createdAt: string;
}
