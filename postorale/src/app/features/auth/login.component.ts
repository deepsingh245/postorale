import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../store/auth/auth.actions';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RouterLink } from '@angular/router';
// import { CardComponent } from '../../shared/components/card.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ButtonModule, InputTextModule, PasswordModule, RouterLink],
  template: `
    <div class="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div class="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl animate-fade-in">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h1>
          <p class="text-gray-600 dark:text-gray-400">Sign in to continue your journey</p>
        </div>

        <div class="space-y-6">
          <button pButton label="Sign in with Google" icon="pi pi-google" 
            class="w-full p-button-outlined p-button-secondary transition-transform hover:scale-105" (click)="loginWithGoogle()">
          </button>

          <div class="relative flex py-2 items-center">
            <div class="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            <span class="flex-shrink-0 mx-4 text-gray-400 text-sm">Or with email</span>
            <div class="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          </div>

          <div class="space-y-4">
            <span class="p-float-label">
                <input pInputText id="email" type="email" class="w-full" placeholder="Email" />
            </span>
            <span class="p-float-label">
                <p-password id="password" [feedback]="false" styleClass="w-full" [inputStyle]="{'width':'100%'}" placeholder="Password"></p-password>
            </span>
            
            <button pButton label="Sign In" class="w-full p-button-primary"></button>
          </div>

          <div class="text-center mt-6">
            <a href="#" class="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400">Forgot password?</a>
          </div>

          <p class="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
            Don't have an account? 
            <a routerLink="/auth/signup" class="text-primary-600 hover:text-primary-500 font-semibold cursor-pointer">Create one</a>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
        animation: fadeIn 0.5s ease-out forwards;
    }
  `]
})
export class LoginComponent {
  private store = inject(Store);

  loginWithGoogle() {
    this.store.dispatch(AuthActions.loginWithGoogle());
  }
}
