import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../store/auth/auth.actions';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [CommonModule, ButtonModule, InputTextModule, PasswordModule, FormsModule, RouterLink],
    template: `
    <div class="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div class="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create Account</h1>
          <p class="text-gray-600 dark:text-gray-400">Join Postorale today</p>
        </div>

        <div class="space-y-6">
          <button pButton label="Sign up with Google" icon="pi pi-google" 
            class="w-full p-button-outlined p-button-secondary" (click)="loginWithGoogle()">
          </button>

          <div class="relative flex py-2 items-center">
            <div class="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            <span class="flex-shrink-0 mx-4 text-gray-400 text-sm">Or with email</span>
            <div class="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          </div>

          <div class="space-y-4">
             <!-- Placeholder for Email/Password form -->
            <input pInputText type="email" placeholder="Email address" class="w-full" />
            <p-password placeholder="Password" [feedback]="false" styleClass="w-full" [inputStyle]="{'width':'100%'}"></p-password>
            
            <button pButton label="Create Account" class="w-full p-button-primary"></button>
          </div>

          <p class="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
            Already have an account? 
            <a routerLink="/auth/login" class="text-primary-600 hover:text-primary-500 font-semibold cursor-pointer">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  `
})
export class SignupComponent {
    private store = inject(Store);

    loginWithGoogle() {
        this.store.dispatch(AuthActions.loginWithGoogle());
    }
}
