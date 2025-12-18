import { createReducer, on } from '@ngrx/store';
import { BlogActions } from './blog.actions';
import { blogAdapter, initialBlogState } from './blog.state';

export const blogReducer = createReducer(
    initialBlogState,
    on(BlogActions.loadBlogs, (state) => ({ ...state, loading: true, error: null })),
    on(BlogActions.loadBlogsSuccess, (state, { blogs }) =>
        blogAdapter.setAll(blogs, { ...state, loading: false })
    ),
    on(BlogActions.loadBlogsFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(BlogActions.addBlogSuccess, (state, { blog }) =>
        blogAdapter.addOne(blog, { ...state, loading: false })
    ),
    on(BlogActions.updateBlogSuccess, (state, { blog }) =>
        blogAdapter.updateOne(blog, { ...state, loading: false })
    ),
    on(BlogActions.deleteBlogSuccess, (state, { id }) =>
        blogAdapter.removeOne(id, { ...state, loading: false })
    )
);
