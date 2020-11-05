import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from "./shared/guards/auth.guard";
import { SecureInnerPagesGuard } from "./shared/guards/secure-inner-pages.guard";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },
  {
    path: 'registration',
    loadChildren: () => import('./pages/registration/registration.module').then(m => m.RegistrationPageModule),
    canActivate: [SecureInnerPagesGuard]
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./pages/verify-email/verify-email.module').then(m => m.VerifyEmailPageModule)
  },
  {
    path: 'password-forget',
    loadChildren: () => import('./pages/password-forget/password-forget.module').then(m => m.PasswordForgetPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
    canActivate: [SecureInnerPagesGuard]
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
