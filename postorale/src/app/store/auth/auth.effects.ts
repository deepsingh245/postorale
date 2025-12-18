import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from './auth.actions';
import { AuthService } from '../../core/services/auth.service';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
    private actions$ = inject(Actions);
    private authService = inject(AuthService);
    private router = inject(Router);

    loginWithGoogle$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loginWithGoogle),
            switchMap(() =>
                this.authService.loginWithGoogle().pipe(
                    map((user) => AuthActions.loginWithGoogleSuccess({ user })),
                    catchError((error) => of(AuthActions.loginWithGoogleFailure({ error: error.message })))
                )
            )
        )
    );

    loginSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.loginSuccess, AuthActions.loginWithGoogleSuccess),
                tap(() => this.router.navigate(['/']))
            ),
        { dispatch: false }
    );

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.logout),
            switchMap(() =>
                this.authService.logout().pipe(
                    map(() => AuthActions.logoutSuccess()),
                    catchError((error) => of(AuthActions.logoutFailure({ error: error.message })))
                )
            )
        )
    );

    logoutSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.logoutSuccess),
                tap(() => this.router.navigate(['/auth/login']))
            ),
        { dispatch: false }
    );
}
