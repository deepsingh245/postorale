import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../interfaces/blog.interface';
import { AUTH_CONFIG } from '../constants/auth.constants';

@Injectable({
    providedIn: 'root'
})
export class BlogService {
    private http = inject(HttpClient);
    private apiUrl = `${AUTH_CONFIG.backendUrl}/blogs`;

    getAllBlogs(): Observable<Blog[]> {
        return this.http.get<Blog[]>(this.apiUrl);
    }

    getBlogById(id: string): Observable<Blog> {
        return this.http.get<Blog>(`${this.apiUrl}/${id}`);
    }

    createBlog(blog: { title: string; content: string; tags: string[] }): Observable<Blog> {
        return this.http.post<Blog>(this.apiUrl, blog);
    }

    updateBlog(id: string, blog: Partial<Blog>): Observable<Blog> {
        return this.http.put<Blog>(`${this.apiUrl}/${id}`, blog);
    }

    deleteBlog(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
