import {Routes} from '@angular/router' 
export const MEMBRO_ROUTES: Routes = [
    {path:'',loadComponent:() => import('./membros-listar/membros-listar.component').then(m => m.MembrosListarComponent)},
    {path: 'cadastrar',loadComponent: () => import('./membros-cadastrar/membros-cadastrar.component').then(m => m.MembrosCadastrarComponent),},
    {path: 'cadastrar/:id',loadComponent: () => import('./membros-cadastrar/membros-cadastrar.component').then(m => m.MembrosCadastrarComponent),},
]