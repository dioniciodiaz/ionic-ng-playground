import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPage } from './auth.page';

const routes: Routes = [
  {
    path: '',
    component: AuthPage,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@pages/sign-in/sign-in.module').then(
            m => m.SignInPageModule
          )
      },
      {
        path: 'sign-up',
        loadChildren: () =>
          import('@pages/sign-up/sign-up.module').then(
            m => m.SignUpPageModule
          )
      },
      {
        path: 'forgot-password',
        loadChildren: () =>
          import('@pages/forgot-password/forgot-password.module').then(
            m => m.ForgotPasswordPageModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule { }
