import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
     {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }

];
