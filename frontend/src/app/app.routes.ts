import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LieuxComponent } from './lieux/lieux.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'lieux', component: LieuxComponent }
];
