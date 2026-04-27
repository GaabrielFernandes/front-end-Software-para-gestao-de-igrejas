import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent:() => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'dashboard', loadComponent:() => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'membros', loadChildren:()=> import('./membros/membro.routes').then(m => m.MEMBRO_ROUTES) },
  { path: 'diretores', loadChildren:()=> import ('./diretores/diretores.routes').then(m => m.DIRETOR_ROUTES)},
];
