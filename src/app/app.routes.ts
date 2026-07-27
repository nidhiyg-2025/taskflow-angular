import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Layout } from './layout/layout/layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { Tasks } from './pages/tasks/tasks';
import { Analytics } from './pages/analytics/analytics';
import { Calendar } from './pages/calendar/calendar';
import { Settings } from './pages/settings/settings';

export const routes: Routes = [
  {
    path: '',
    component: Login
  },
  {
    path: 'app',
    component: Layout,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'tasks', component: Tasks },
      { path: 'analytics', component: Analytics },
      { path: 'calendar', component: Calendar },
      {
  path:'settings',
  loadComponent:()=> 
  import('./pages/settings/settings')
  .then(m=>m.Settings)
},


      // Default child route
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];