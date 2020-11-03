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
        path: 'create',
        children: [
          {
            path: '',
            loadChildren: () => import('../../pages/create/create.module').then(m => m.CreatePageModule)
          },
        ],
      },
      {
        path: 'income-detail/:id',
        children: [
          {
            path: '',
            loadChildren: () => import('../../pages/income-detail/income-detail.module').then(m => m.IncomeDetailPageModule),
          },
        ],
      },
      {
        path: 'spend-detail/:id',
        children: [
          {
            path: '',
            loadChildren: () => import('../../pages/spend-detail/spend-detail.module').then(m => m.SpendDetailPageModule)
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
