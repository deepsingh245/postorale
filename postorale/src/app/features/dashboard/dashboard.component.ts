import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectUser } from '../../store/auth/auth.selectors';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, ButtonModule, CardModule, TabViewModule],
    template: `
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-300">
      <div class="max-w-6xl mx-auto">
        
        <!-- Header -->
        <div class="flex justify-between items-center mb-8">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p class="text-gray-600 dark:text-gray-400 mt-1" *ngIf="user$ | async as user">
              Welcome back, {{ user.displayName || 'Author' }}
            </p>
          </div>
          <p-button label="New Story" icon="pi pi-plus" styleClass="p-button-rounded"></p-button>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <p-card styleClass="h-full bg-white dark:bg-gray-800 border-none shadow-lg">
            <div class="flex items-center space-x-4">
              <div class="p-3 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-600 dark:text-blue-300">
                <i class="pi pi-file text-xl"></i>
              </div>
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Total Stories</p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">12</p>
              </div>
            </div>
          </p-card>
          
          <p-card styleClass="h-full bg-white dark:bg-gray-800 border-none shadow-lg">
             <div class="flex items-center space-x-4">
              <div class="p-3 bg-green-100 dark:bg-green-900 rounded-full text-green-600 dark:text-green-300">
                <i class="pi pi-heart text-xl"></i>
              </div>
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Total Likes</p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">482</p>
              </div>
            </div>
          </p-card>

          <p-card styleClass="h-full bg-white dark:bg-gray-800 border-none shadow-lg">
             <div class="flex items-center space-x-4">
              <div class="p-3 bg-purple-100 dark:bg-purple-900 rounded-full text-purple-600 dark:text-purple-300">
                <i class="pi pi-users text-xl"></i>
              </div>
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Followers</p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">1.2k</p>
              </div>
            </div>
          </p-card>
        </div>

        <!-- Content Tabs -->
        <p-tabView styleClass="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-2">
            <p-tabPanel header="Published">
                <div class="p-4 text-center text-gray-500">
                    <i class="pi pi-inbox text-4xl mb-2 block"></i>
                    No published stories yet.
                </div>
            </p-tabPanel>
            <p-tabPanel header="Drafts">
                 <div class="p-4 text-center text-gray-500">
                    <i class="pi pi-file-edit text-4xl mb-2 block"></i>
                    Your drafts will appear here.
                </div>
            </p-tabPanel>
        </p-tabView>

      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
    private store = inject(Store);
    user$ = this.store.select(selectUser);

    ngOnInit() {
        // Load dashboard data
    }
}
