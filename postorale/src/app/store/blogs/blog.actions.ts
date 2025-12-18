import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Blog } from '../../core/interfaces/blog.interface';

export const BlogActions = createActionGroup({
    source: 'Blog/API',
    events: {
        'Load Blogs': emptyProps(),
        'Load Blogs Success': props<{ blogs: Blog[] }>(),
        'Load Blogs Failure': props<{ error: string }>(),

        'Load Blog': props<{ id: string }>(),
        'Load Blog Success': props<{ blog: Blog }>(),
        'Load Blog Failure': props<{ error: string }>(),

        'Add Blog': props<{ blog: Omit<Blog, 'id' | 'createdAt' | 'updatedAt' | 'likesCount' | 'authorId'> }>(),
        'Add Blog Success': props<{ blog: Blog }>(),
        'Add Blog Failure': props<{ error: string }>(),

        'Update Blog': props<{ blog: Update<Blog> }>(),
        'Update Blog Success': props<{ blog: Update<Blog> }>(),
        'Update Blog Failure': props<{ error: string }>(),

        'Delete Blog': props<{ id: string }>(),
        'Delete Blog Success': props<{ id: string }>(),
        'Delete Blog Failure': props<{ error: string }>()
    }
});
