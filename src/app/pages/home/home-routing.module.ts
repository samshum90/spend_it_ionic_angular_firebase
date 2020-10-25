import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'expenditure',
        redirectTo: 'home',
      },
      {
        path: 'income',
        children: [
          {
            path: '',
            loadChildren: ''
          }
        ]
      },
      {
        path: 'budget',
        children: [
          {
            path: '',
            loadChildren: ''
          }
        ]
      },
      {
        path: 'dashboard',
        children: [
          {
            path: '',
            loadChildren: ''
          }
        ]
      },
      {
        path: 'about',
        children: [
          {
            path: '',
            loadChildren: ''
          }
        ]
      },
    ],
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
