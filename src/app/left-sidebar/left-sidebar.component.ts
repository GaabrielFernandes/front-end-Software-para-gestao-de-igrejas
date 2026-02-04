import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.css',
})
export class LeftSidebarComponent {
  isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();
  items = [
  {
    routeLink: 'dashboard',
    icon: 'fal fa-chart-line', // Gráficos combinam mais com Dashboard que 'home'
    label: 'Dashboard',
  },
  {
    routeLink: 'membros',
    icon: 'fal fa-users', // 'users' é o padrão universal para Membros/Usuários
    label: 'Membros',
  },
  {
    routeLink: 'secretaria',
    icon: 'fal fa-copy', // 'copy' ou 'file-alt' sugerem gestão de documentos
    label: 'Secretaria',
  },
  {
    routeLink: 'tesouraria',
    icon: 'fal fa-money-bill-wave', // Dinheiro ou 'wallet' para o setor financeiro
    label: 'Tesouraria',
  },
  {
    routeLink: 'conselho_fiscal',
    icon: 'fal fa-balance-scale', // Balança representa justiça/auditoria fiscal
    label: 'Conselho Fiscal',
  },
  {
    routeLink: 'settings',
    icon: 'fal fa-user-cog', // 'user-cog' para configurações focadas no usuário
    label: 'Configurações',
  },
];


  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }
}
