import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Blog } from '../../core/interfaces/blog.interface';

export interface BlogState extends EntityState<Blog> {
    // additional entities state properties
    selectedBlogId: string | null;
    loading: boolean;
    error: string | null;
}

export const blogAdapter: EntityAdapter<Blog> = createEntityAdapter<Blog>();

export const initialBlogState: BlogState = blogAdapter.getInitialState({
    selectedBlogId: null,
    loading: false,
    error: null
});
