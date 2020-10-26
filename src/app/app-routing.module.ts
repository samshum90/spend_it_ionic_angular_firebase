import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from "./shared/auth.guard";
import { SecureInnerPagesGuard } from "./shared/secure-inner-pages.guard";

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
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'spend-create',
    loadChildren: () => import('./pages/spend-create/spend-create.module').then(m => m.SpendCreatePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'spend-detail/:id',
    loadChildren: () => import('./pages/spend-detail/spend-detail.module').then(m => m.SpendDetailPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'income-detail/:id',
    loadChildren: () => import('./pages/income-detail/income-detail.module').then(m => m.IncomeDetailPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'income-create',
    loadChildren: () => import('./pages/income-create/income-create.module').then(m => m.IncomeCreatePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'expenditure',
    loadChildren: () => import('./pages/expenditure/expenditure.module').then(m => m.ExpenditurePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'income',
    loadChildren: () => import('./pages/income/income.module').then(m => m.IncomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'budget',
    loadChildren: () => import('./pages/budget/budget.module').then(m => m.BudgetPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    loadChildren: () => import('./pages/create/create.module').then( m => m.CreatePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
