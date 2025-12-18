import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, UserCredential, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { AUTH_CONFIG } from '../constants/auth.constants';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { User } from '../interfaces/user.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);
    private firebaseApp = initializeApp(AUTH_CONFIG.firebase);
    private auth = getAuth(this.firebaseApp);
    private currentUserSubject = new BehaviorSubject<User | null>(null);

    currentUser$ = this.currentUserSubject.asObservable();

    constructor() {
        this.initAuthListener();
    }

    private initAuthListener() {
        onAuthStateChanged(this.auth, async (firebaseUser) => {
            if (firebaseUser) {
                const token = await firebaseUser.getIdToken();
                const user: User = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName,
                    photoURL: firebaseUser.photoURL,
                    token
                };
                this.currentUserSubject.next(user);
            } else {
                this.currentUserSubject.next(null);
            }
        });
    }

    loginWithGoogle(): Observable<User> {
        const provider = new GoogleAuthProvider();
        return from(signInWithPopup(this.auth, provider)).pipe(
            switchMap(async (cred: UserCredential) => {
                const token = await cred.user.getIdToken();
                const user: User = {
                    uid: cred.user.uid,
                    email: cred.user.email,
                    displayName: cred.user.displayName,
                    photoURL: cred.user.photoURL,
                    token
                };
                // Register/Login with backend
                await this.syncWithBackend(token);
                return user;
            })
        );
    }

    logout(): Observable<void> {
        return from(signOut(this.auth));
    }

    private async syncWithBackend(token: string): Promise<any> {
        // Call backend to ensure user exists in Supabase
        // This part assumes you have a backend endpoint setup
        // return this.http.post(`${AUTH_CONFIG.backendUrl}/auth/google`, {}, { headers: { Authorization: `Bearer ${token}` } }).toPromise();
        return Promise.resolve();
    }

    getToken(): Observable<string | null> {
        return this.currentUser$.pipe(map(user => user?.token || null));
    }
}
