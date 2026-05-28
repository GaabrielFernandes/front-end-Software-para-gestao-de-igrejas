import { CommonModule } from '@angular/common';
import { Component, input, OnInit, output } from '@angular/core';
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
  dataAtual!: Date;
  departamentoUsuario = localStorage.getItem('departamento');

  isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();

  menuItems: MenuItem[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.configurarMenu();
    setInterval(() => {
      this.dataAtual = new Date();
    }, 1000);
  }

  isAdministrador(): boolean {
    return this.departamentoUsuario === 'ADMINISTRADOR';
  }

  isSecretaria(): boolean {
    return this.departamentoUsuario === 'SECRETARIA';
  }

  toggleSubmenu(item: MenuItem, event: Event): void {
    event.preventDefault();
    if (this.isLeftSidebarCollapsed()) {
      this.changeIsLeftSidebarCollapsed.emit(false);
      item.isOpen = true;
      return;
    }
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
      text: 'Ao realizar o logout voce sera redirecionado para a pagina de login',
      icon: 'question',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Nao',
      showConfirmButton: true,
      showCancelButton: true,
    }).then(resultado => {
      if (resultado.isConfirmed) {
        this.router.navigate(['/login']);
        localStorage.removeItem('token');
        localStorage.removeItem('nome');
        localStorage.removeItem('departamento');
        localStorage.removeItem('email');
        localStorage.removeItem('senhaProvisoria');
        sessionStorage.removeItem('mensagemBoasVindas');
      }
    }).catch(() => {
      Swal.fire({
        title: 'Erro ao realizar o logout',
        icon: 'error',
        text: 'Tente novamente mais tarde'
      });
    });
  }

  private configurarMenu(): void {
    const cadastros: SubMenuItem[] = [];

    if (this.isSecretaria()) {
      cadastros.push({ label: 'Membros', icon: 'fal fa-users', routeLink: 'membros' });
    }

    if (this.isAdministrador()) {
      cadastros.push({ label: 'Diretores', icon: 'fal fa-user', routeLink: 'diretores' });
    }

    this.menuItems = [
      {
        label: 'Dashboard',
        icon: 'fal fa-chart-line',
        routeLink: 'dashboard'
      }
    ];

    if (cadastros.length) {
      this.menuItems.push({
        label: 'Cadastros',
        icon: 'fal fa-address-card',
        submenu: cadastros
      });
    }

    this.menuItems.push(
      {
        label: 'Tesouraria',
        icon: 'fal fa-money-bill-wave',
        submenu: [
          { label: 'Movimentacoes', icon: 'fal fa-hand-holding-usd', routeLink: 'tesouraria/receitas' },
        ]
      }
    );
  }
}
