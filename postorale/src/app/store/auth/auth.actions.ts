import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../core/interfaces/user.interface';

export const AuthActions = createActionGroup({
    source: 'Auth',
    events: {
        'Login': props<{ email: string; password: string }>(),
        'Login Success': props<{ user: User }>(),
        'Login Failure': props<{ error: string }>(),

        'Login With Google': emptyProps(),
        'Login With Google Success': props<{ user: User }>(),
        'Login With Google Failure': props<{ error: string }>(),

        'Logout': emptyProps(),
        'Logout Success': emptyProps(),
        'Logout Failure': props<{ error: string }>(),

        'Check Auth Session': emptyProps(),
        'Check Auth Session Success': props<{ user: User | null }>(),
        'Check Auth Session Failure': props<{ error: string }>()
    }
});
