import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from "./shared/auth.guard";
import { SecureInnerPagesGuard } from "./shared/secure-inner-pages.guard";

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationPageModule)
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./verify-email/verify-email.module').then(m => m.VerifyEmailPageModule)
  },
  {
    path: 'password-forget',
    loadChildren: () => import('./pages/password-forget/password-forget.module').then(m => m.PasswordForgetPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
    canActivate: [SecureInnerPagesGuard]

  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    loadChildren: () => import('./pages/create/create.module').then(m => m.CreatePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'detail/:id',
    loadChildren: './pages/detail/detail.module#DetailPageModule',
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
