import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LieuxComponent } from './lieux/lieux.component';
import { CategoriesComponent } from './categories/categories.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'lieux', component: LieuxComponent },
  { path: 'categories', component: CategoriesComponent }
];
