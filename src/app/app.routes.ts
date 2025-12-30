import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Products } from './features/products/page/proudcts';
import { NotFoundPage } from './features/not-found-page/not-found-page';
import { authGuard } from './features/auth/Guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'products', component: Products, canActivate: [authGuard] },
  { path: '**', component: NotFoundPage },
];
