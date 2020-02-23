import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    children: [
      {
        path: 'article-list',
        loadChildren: () =>
          import('@pages/article-list/article-list.module').then(
            m => m.ArticleListPageModule
          )
      },
      {
        path: 'add-article',
        loadChildren: () =>
          import('@pages/add-article/add-article.module').then(
            m => m.AddArticlePageModule
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
