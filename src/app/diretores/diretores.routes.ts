import {Routes} from "@angular/router";

export const DIRETOR_ROUTES:Routes = [
  {path:'', loadComponent:() => import('./diretores-listar/diretores-listar.component').then(m => m.DiretoresListarComponent)},
  {path:'cadastrar', loadComponent:() => import('./diretores-cadastrar/diretores-cadastrar.component').then(m => m.DiretoresCadastrarComponent)},
  {path:'editar/:id', loadComponent:() => import('./diretores-cadastrar/diretores-cadastrar.component').then(m => m.DiretoresCadastrarComponent)},
]
