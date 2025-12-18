import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BlogActions } from './blog.actions';
import { BlogService } from '../../core/services/blog.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class BlogEffects {
    private actions$ = inject(Actions);
    private blogService = inject(BlogService);

    loadBlogs$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BlogActions.loadBlogs),
            switchMap(() =>
                this.blogService.getAllBlogs().pipe(
                    map((blogs) => BlogActions.loadBlogsSuccess({ blogs })),
                    catchError((error) => of(BlogActions.loadBlogsFailure({ error: error.message })))
                )
            )
        )
    );

    loadBlog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BlogActions.loadBlog),
            switchMap(({ id }) =>
                this.blogService.getBlogById(id).pipe(
                    map((blog) => BlogActions.loadBlogSuccess({ blog })),
                    catchError((error) => of(BlogActions.loadBlogFailure({ error: error.message })))
                )
            )
        )
    );

    // Implement add, update, delete similarly...
}
