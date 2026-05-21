import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LieuxComponent } from './lieux/lieux.component';
import { CategoriesComponent } from './categories/categories.component';
import { CreerEvenementComponent } from './creer-evenement/creer-evenement.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardOrganisateurComponent } from './dashboard-organisateur/dashboard-organisateur.component';
import { DashboardParticipantComponent } from './dashboard-participant/dashboard-participant.component';
import { EvenementDetailComponent } from './evenement-detail/evenement-detail.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import {
  NbAuthComponent,
  NbRegisterComponent,
  NbLogoutComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { CustomLoginComponent } from './auth/custom-login/custom-login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  
  // Routes d'authentification personnalisées sans le layout Nebular
  { path: 'auth', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: CustomLoginComponent },
  { path: 'auth/register', component: NbRegisterComponent },
  { path: 'auth/logout', component: NbLogoutComponent },
  { path: 'auth/request-password', component: NbRequestPasswordComponent },
  { path: 'auth/reset-password', component: NbResetPasswordComponent },
  { path: 'lieux', component: LieuxComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'evenement/:id', component: EvenementDetailComponent },
  
  // Routes protégées
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'creer-evenement', 
    component: CreerEvenementComponent,
    canActivate: [authGuard, roleGuard(['admin', 'agent'])]
  },
  { 
    path: 'dashboard',
    redirectTo: 'dashboard/admin',
    pathMatch: 'full'
  },
  { 
    path: 'dashboard/admin', 
    component: DashboardAdminComponent,
    canActivate: [authGuard, roleGuard(['admin'])]
  },
  { 
    path: 'dashboard/organisateur', 
    component: DashboardOrganisateurComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'organisateur' }
  },
  {
    path: 'dashboard/participant',
    component: DashboardParticipantComponent,
    canActivate: [authGuard]
  },
  
  // Route par défaut (catch-all)
  { path: '**', redirectTo: '' },
  
  // Redirection de l'ancien /login vers /auth/login
  { path: 'login', redirectTo: 'auth/login', pathMatch: 'full' }
];
