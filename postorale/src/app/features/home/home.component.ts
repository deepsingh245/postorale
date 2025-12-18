import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { BlogActions } from '../../store/blogs/blog.actions';
import { selectAllBlogs, selectBlogLoading } from '../../store/blogs/blog.selectors';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { ChipModule } from 'primeng/chip';
import { AvatarModule } from 'primeng/avatar';
import { RouterLink } from '@angular/router';
// import { CardComponent } from '../../shared/components/card.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, ButtonModule, SkeletonModule, ChipModule, AvatarModule, RouterLink],
    template: `
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      
      <!-- Hero Section -->
      <div class="bg-white dark:bg-gray-800 border-b dark:border-gray-700 py-16">
        <div class="container mx-auto px-4 max-w-5xl text-center">
            <h1 class="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                Stay curious.
            </h1>
            <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Discover stories, thinking, and expertise from writers on any topic.
            </p>
            <button pButton label="Start Reading" class="p-button-rounded p-button-lg px-8"></button>
        </div>
      </div>

      <!-- Main Content -->
      <div class="container mx-auto px-4 max-w-5xl py-12">
        <div class="flex flex-col lg:flex-row gap-12">
            
            <!-- Blog Feed -->
            <div class="lg:w-2/3 space-y-8">
                <div class="border-b dark:border-gray-700 pb-4 mb-6 flex items-center space-x-6 overflow-x-auto">
                    <span class="font-semibold text-gray-900 dark:text-white border-b-2 border-black dark:border-white pb-4 cursor-pointer">For you</span>
                    <span class="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 pb-4 cursor-pointer">Following</span>
                    <span class="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 pb-4 cursor-pointer">Technology</span>
                    <span class="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 pb-4 cursor-pointer">Design</span>
                </div>

                <div *ngIf="loading$ | async; else blogList">
                     <div class="space-y-8">
                        <div *ngFor="let i of [1,2,3]" class="flex flex-col gap-4">
                            <p-skeleton width="60%" height="1.5rem"></p-skeleton>
                            <p-skeleton width="100%" height="4rem"></p-skeleton>
                            <div class="flex justify-between">
                                <p-skeleton width="20%" height="1rem"></p-skeleton>
                                <p-skeleton width="10%" height="1rem"></p-skeleton>
                            </div>
                        </div>
                     </div>
                </div>

                <ng-template #blogList>
                    <div *ngFor="let blog of blogs$ | async" class="group cursor-pointer">
                        <div class="flex items-start gap-6">
                            <div class="flex-1">
                                <div class="flex items-center gap-2 mb-2">
                                    <p-avatar icon="pi pi-user" shape="circle"></p-avatar>
                                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Author Name</span>
                                    <span class="text-gray-400 text-xs">• {{ blog.createdAt | date }}</span>
                                </div>
                                
                                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:underline decoration-2 decoration-gray-900 dark:decoration-white">
                                    {{ blog.title }}
                                </h2>
                                
                                <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 font-serif text-lg">
                                    {{ blog.content }}
                                </p>
                                
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-2">
                                        <p-chip *ngFor="let tag of blog.tags" [label]="tag" styleClass="text-xs"></p-chip>
                                        <span class="text-xs text-gray-500">5 min read</span>
                                    </div>
                                    <div class="flex items-center gap-4 text-gray-400">
                                        <i class="pi pi-bookmark hover:text-gray-700 dark:hover:text-gray-200"></i>
                                        <i class="pi pi-minus-circle hover:text-gray-700 dark:hover:text-gray-200"></i>
                                    </div>
                                </div>
                            </div>
                            <!-- Optional: Blog Image would go here -->
                            <!-- <div class="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded hidden sm:block"></div> -->
                        </div>
                        <div class="h-px bg-gray-200 dark:bg-gray-800 my-8"></div>
                    </div>

                    <!-- Empty State -->
                    <div *ngIf="(blogs$ | async)?.length === 0" class="text-center py-12">
                        <p class="text-gray-500">No blogs found. Be the first to write one!</p>
                        <button pButton label="Write a story" class="mt-4 p-button-outlined" [routerLink]="['/dashboard']"></button>
                    </div>
                </ng-template>
            </div>

            <!-- Sidebar -->
            <div class="lg:w-1/3 border-l dark:border-gray-700 pl-12 hidden lg:block">
                <h3 class="font-bold text-gray-900 dark:text-white mb-4">Recommended topics</h3>
                <div class="flex flex-wrap gap-2 mb-8">
                    <p-chip label="Programming" styleClass="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"></p-chip>
                    <p-chip label="Data Science" styleClass="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"></p-chip>
                    <p-chip label="Self Improvement" styleClass="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"></p-chip>
                    <p-chip label="Writing" styleClass="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"></p-chip>
                </div>

                <h3 class="font-bold text-gray-900 dark:text-white mb-4">Who to follow</h3>
                <div class="space-y-4">
                     <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <p-avatar icon="pi pi-user" shape="circle"></p-avatar>
                            <div class="flex flex-col">
                                <span class="font-bold text-sm text-gray-900 dark:text-white">Jane Doe</span>
                                <span class="text-xs text-gray-500">Writes about Angular</span>
                            </div>
                        </div>
                        <button pButton label="Follow" class="p-button-outlined p-button-sm p-button-rounded"></button>
                     </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent implements OnInit {
    private store = inject(Store);
    blogs$ = this.store.select(selectAllBlogs);
    loading$ = this.store.select(selectBlogLoading);

    ngOnInit() {
        this.store.dispatch(BlogActions.loadBlogs());
    }
}
