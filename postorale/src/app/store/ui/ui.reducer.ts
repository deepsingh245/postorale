import { createReducer, on } from '@ngrx/store';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ThemeMode } from '../../core/enums/theme.enum';

export const UIActions = createActionGroup({
    source: 'UI',
    events: {
        'Set Theme': props<{ theme: ThemeMode }>(),
        'Toggle Theme': emptyProps(),
        'Set Loading': props<{ isLoading: boolean }>()
    }
});

export interface UIState {
    theme: ThemeMode;
    loading: boolean;
}

export const initialState: UIState = {
    theme: ThemeMode.LIGHT,
    loading: false
};

export const uiReducer = createReducer(
    initialState,
    on(UIActions.setTheme, (state, { theme }) => ({ ...state, theme })),
    on(UIActions.toggleTheme, (state) => ({
        ...state,
        theme: state.theme === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT
    })),
    on(UIActions.setLoading, (state, { isLoading }) => ({ ...state, loading: isLoading }))
);
