import { Component, OnInit } from '@angular/core';
import { Menu } from "primeng/menu";
import { MenuItem, PrimeIcons, PrimeTemplate } from "primeng/api";
import { Router, RouterLink } from "@angular/router";
import { TableModule } from "primeng/table";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import Swal from "sweetalert2";
import { DiretorPage } from "../diretor.modal";
import { DiretorService } from "../diretor.service";
import { DiretoresVisualizarComponent } from "../diretores-visualizar/diretores-visualizar.component";

@Component({
  selector: 'app-diretores-listar',
  standalone: true,
  providers: [DialogService],
  imports: [
    Menu,
    PrimeTemplate,
    RouterLink,
    TableModule
  ],
  templateUrl: './diretores-listar.component.html',
  styleUrl: './diretores-listar.component.css'
})
export class DiretoresListarComponent implements OnInit {
  diretores: DiretorPage[] = [];
  diretorSelecionado?: DiretorPage;
  items: MenuItem[] = [];

  totalRegistros = 0;
  paginaAtual = 0;
  tamanhoPagina = 5;

  ref?: DynamicDialogRef;
  carregando = false;

  constructor(
    private diretorService: DiretorService,
    private router: Router,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.populaMenu();
  }

  abrirMenu(menu: Menu, event: Event, diretor: DiretorPage): void {
    this.diretorSelecionado = diretor;
    menu.toggle(event);
  }

  onPageChange(event: any): void {
    const first = event.first ?? 0;
    const rows = event.rows ?? this.tamanhoPagina;

    this.paginaAtual = Math.floor(first / rows);
    this.tamanhoPagina = rows;

    this.listarDiretores();
  }

  private populaMenu(): void {
    this.items = [
      {
        label: 'Editar',
        icon: PrimeIcons.PENCIL,
        command: () => this.editarDiretor()
      },
      {
        label: 'Excluir',
        icon: PrimeIcons.TRASH,
        command: () => this.confirmarExclusao()
      },
      {
        label: 'Visualizar',
        icon: PrimeIcons.EYE,
        command: () => this.abrirModalVisualizar()
      }
    ];
  }

  private listarDiretores(): void {
    this.carregando = true;

    this.diretorService.listar(this.paginaAtual, this.tamanhoPagina).subscribe({
      next: (resposta) => {
        this.diretores = resposta.content;
        this.totalRegistros = resposta.totalElements;
      },
      error: (error) => {
        console.error('Erro ao listar diretores:', error);

        Swal.fire({
          title: 'Erro ao listar diretores',
          text: error?.error?.message || error?.message || 'Não foi possível carregar os diretores.',
          icon: 'error'
        });
      },
      complete: () => {
        this.carregando = false;
      }
    });
  }

  private editarDiretor(): void {
    if (!this.diretorSelecionado?.id) {
      return;
    }

    this.router.navigate(['/diretores/editar', this.diretorSelecionado.id]);
  }

  private abrirModalVisualizar(): void {
    if (!this.diretorSelecionado?.id) {
      return;
    }

    this.ref = this.dialogService.open(DiretoresVisualizarComponent, {
      header: 'Visualizar',
      width: '60%',
      modal: true,
      closable: true,
      maximizable: true,
      data: {
        id: this.diretorSelecionado.id
      }
    });
  }

  private confirmarExclusao(): void {
    if (!this.diretorSelecionado?.id) {
      return;
    }

    const id = this.diretorSelecionado.id;

    Swal.fire({
      title: 'Deseja excluir esse diretor?',
      text: 'Essa ação tem efeito permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Não, cancelar',
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this.excluir(id);
      }
    });
  }

  private excluir(id: number): void {
    this.diretorService.excluirDiretor(id).subscribe({
      next: () => {
        Swal.fire({
          title: 'Diretor excluído com sucesso',
          text: `Código: ${id}`,
          icon: 'success',
        });

        this.listarDiretores();
      },
      error: (error) => {
        console.error('Erro ao excluir diretor:', error);

        Swal.fire({
          title: 'Erro ao excluir diretor',
          text: error?.error?.message || error?.message || 'Não foi possível excluir o diretor.',
          icon: 'error',
        });
      }
    });
  }
}
