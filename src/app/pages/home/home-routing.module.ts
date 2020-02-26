import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeGuardService as HomeGuard } from "@guards/home-guard.service";

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    canActivate: [HomeGuard],
    children: [
      {
        path: '',
        redirectTo: '/home/article-list',
        pathMatch: 'full',
      },
      {
        path: 'article-list',
        loadChildren: () =>
          import('@pages/article-list/article-list.module').then(
            m => m.ArticleListPageModule
          )
      },
      {
        path: 'create-article',
        loadChildren: () =>
          import('@pages/create-article/create-article.module').then(
            m => m.CreateArticlePageModule
          )
      },
      {
        path: 'user-profile',
        loadChildren: () =>
          import('@pages/user-profile/user-profile.module').then(
            m => m.UserProfilePageModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule { }
