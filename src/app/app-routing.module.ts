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
    loadChildren: () => import('./features/profile/profile-feature.module').then(m => m.ProfileFeatureModule)
  },
  {
    path: 'terms',
    loadComponent: () => import('./features/legal/terms/terms.component').then(m => m.TermsComponent)
  },
  {
    path: 'privacy',
    loadComponent: () => import('./features/legal/privacy/privacy.component').then(m => m.PrivacyComponent)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
