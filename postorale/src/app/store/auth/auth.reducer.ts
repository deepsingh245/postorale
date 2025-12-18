import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { User } from '../../core/interfaces/user.interface';

export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

export const initialState: AuthState = {
    user: null,
    loading: false,
    error: null
};

export const authReducer = createReducer(
    initialState,
    on(AuthActions.login, AuthActions.loginWithGoogle, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(AuthActions.loginSuccess, AuthActions.loginWithGoogleSuccess, (state, { user }) => ({
        ...state,
        user,
        loading: false,
        error: null
    })),
    on(AuthActions.loginFailure, AuthActions.loginWithGoogleFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),
    on(AuthActions.logout, (state) => ({
        ...state,
        loading: true
    })),
    on(AuthActions.logoutSuccess, (state) => ({
        ...state,
        user: null,
        loading: false
    })),
    on(AuthActions.checkAuthSessionSuccess, (state, { user }) => ({
        ...state,
        user
    }))
);
