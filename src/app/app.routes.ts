import { Routes } from '@angular/router';
import { BlankLayoutComponent } from './shared/components/layouts/blank-layout/blank-layout.component';
import { HeaderLayoutComponent } from './shared/components/layouts/header-layout/header-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: HeaderLayoutComponent,
        children: [
          {
            path: 'operations',
            loadChildren: () => import('./views/operations/operations.module').then(m => m.OperationsModule)
          }
        ]
      },
    {
        path: '',
        component: BlankLayoutComponent,
        children: [
          {
            path: 'sessions',
            loadChildren: () => import('./views/sessions/sessions.module').then(m => m.SessionsModule)
          }
        ]
      },
      {
        path: '**',
        redirectTo: 'others/404'
      }
];
