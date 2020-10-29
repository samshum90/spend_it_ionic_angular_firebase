import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from "../../shared/auth.guard";
import { SecureInnerPagesGuard } from "../../shared/secure-inner-pages.guard";

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import('../../pages/home/home.module').then(m => m.HomePageModule)
          },
        ],
      },
      {
        path: 'expenditure',
        children: [
          {
            path: '',
            loadChildren: () => import('../../pages/expenditure/expenditure.module').then(m => m.ExpenditurePageModule)
          },
          {
            path: 'spend-detail/:id',
            loadChildren: () => import('../../pages/spend-detail/spend-detail.module').then(m => m.SpendDetailPageModule),
          },
        ],
      },
      {
        path: 'income',
        children: [
          {
            path: '',
            loadChildren: () => import('../../pages/income/income.module').then(m => m.IncomePageModule)
          },
          {
            path: 'income-detail/:id',
            loadChildren: () => import('../../pages/income-detail/income-detail.module').then(m => m.IncomeDetailPageModule),

          },
        ],
      },
      {
        path: 'budget',
        children: [
          {
            path: '',
            loadChildren: () => import('../../pages/budget/budget.module').then(m => m.BudgetPageModule)
          },
        ],
      },
      {
        path: 'dashboard',
        children: [
          {
            path: '',
            loadChildren: () => import('../../pages/dashboard/dashboard.module').then(m => m.DashboardPageModule)
          }
        ],
      },
      {
        path: 'charts',
        children: [
          {
            path: '',
            loadChildren: () => import('../../pages/charts/charts.module').then(m => m.ChartsPageModule)
          }
        ],
      },
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
        canActivate: [SecureInnerPagesGuard]
      }
    ]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
    canActivate: [SecureInnerPagesGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
