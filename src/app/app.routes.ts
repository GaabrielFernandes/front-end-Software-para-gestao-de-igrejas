import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { MembrosListarComponent } from './membros/membros-listar/membros-listar.component';
import { SecretariaListarComponent } from './secretaria/secretaria-listar/secretaria-listar.component';
import { TesourariaListarComponent } from './tesouraria/tesouraria-listar/tesouraria-listar.component';
import { ConselhoFiscalListarComponent } from './conselho-fiscal/conselho-fiscal-listar/conselho-fiscal-listar.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadComponent:() => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'membros', loadChildren:()=> import('./membros/membro.routes').then(m => m.MEMBRO_ROUTES) },
  { path: 'secretaria', component: SecretariaListarComponent },
  { path: 'tesouraria', component: TesourariaListarComponent },
  { path: 'conselho_fiscal', component: ConselhoFiscalListarComponent },
  { path: 'settings', component: SettingsComponent },
];
