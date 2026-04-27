import { CommonModule } from '@angular/common';
import {Component, input, OnInit, output} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import Swal from "sweetalert2";

interface MenuItem {
  label: string;
  icon: string;
  routeLink?: string;
  submenu?: SubMenuItem[];
  isOpen?: boolean;
}

interface SubMenuItem {
  label: string;
  icon: string;
  routeLink: string;
}

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css'],
})
export class LeftSidebarComponent implements OnInit {

  nomeUsuario = localStorage.getItem('nome');
  dataAtual!: Date
  departamentoUsuario = localStorage.getItem('departamento');

  ngOnInit() {
    setInterval(()=>{
      this.dataAtual = new Date();
    }, 1000)
  }

  isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();

  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'fal fa-chart-line',
      routeLink: 'dashboard'
    },
    {
      label: 'Cadastros',
      icon: 'fal fa-address-card',
      submenu: [
        { label: 'Membros', icon: 'fal fa-users', routeLink: 'membros' },
        { label: 'Diretores', icon: 'fal fa-user', routeLink: 'diretores' }
      ]
    },
    {
      label: 'Tesouraria',
      icon: 'fal fa-money-bill-wave',
      submenu: [
        { label: 'Movimentações', icon: 'fal fa-hand-holding-usdfal fa-hand-holding-usd', routeLink: 'tesouraria/receitas' },
      ]
    }
  ];

  constructor(private router: Router) {}

  toggleSubmenu(item: MenuItem, event: Event): void {
    event.preventDefault();
    if (this.isLeftSidebarCollapsed()) return;
    item.isOpen = !item.isOpen;
  }

  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }

  logout(): void {
    Swal.fire({
      title: 'Deseja realizar o logout?',
      text: 'Ao realizar o logout você será redirecionado para a página de login',
      icon: 'question',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      showConfirmButton: true,
      showCancelButton: true,
    }).then(resultado => {
      if (resultado.isConfirmed) {
        this.router.navigate(['/login']);
        localStorage.setItem('token', 'null');
        localStorage.removeItem('nome');
        localStorage.removeItem('departamento');
        sessionStorage.removeItem('mensagemBoasVindas');
      }
    }).catch(error => {
      Swal.fire({
        title: 'Erro ao realizar o logout',
        icon: 'error',
        text: 'Tente novamente mais tarde'
      });
    });
  }
}
