import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BlogState, blogAdapter } from './blog.state';

export const selectBlogState = createFeatureSelector<BlogState>('blogs');

const { selectAll, selectEntities } = blogAdapter.getSelectors();

export const selectAllBlogs = createSelector(selectBlogState, selectAll);
export const selectBlogEntities = createSelector(selectBlogState, selectEntities);
export const selectBlogLoading = createSelector(selectBlogState, (state) => state.loading);
export const selectBlogError = createSelector(selectBlogState, (state) => state.error);
