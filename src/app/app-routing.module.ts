import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'opportunities',
    loadChildren: () => import('./features/opportunities/opportunities.module').then(m => m.OpportunitiesModule)
  },
  {
    path: 'organizations',
    loadChildren: () => import('./features/organizations/organizations.module').then(m => m.OrganizationsModule)
  },
  {
    path: 'ngo',
    loadChildren: () => import('./features/ngo-dashboard/ngo-dashboard.module').then(m => m.NgoDashboardModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
