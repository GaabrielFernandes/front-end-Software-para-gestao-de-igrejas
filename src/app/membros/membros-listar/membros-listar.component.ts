import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Route, Router, RouterLink } from "@angular/router";
import { BtnCadastrarComponent } from '../../shared/btn-cadastrar/btn-cadastrar.component';
import { MembroPage, MembroService } from '../membro.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog'
import { MembrosVisualizarComponent } from '../membros-visualizar/membros-visualizar.component';
import Swal from 'sweetalert2';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-membros-listar',
  standalone: true,
  providers: [DialogService],
  imports: [
    TableModule,
    MenuModule,
    ButtonModule,
    RouterLink,
    BtnCadastrarComponent,
    DatePipe,
  ],
  templateUrl: './membros-listar.component.html',
  styleUrl: './membros-listar.component.css'
})
export class MembrosListarComponent implements OnInit {
  membros: MembroPage[] = []
  membroSelecionado!: MembroPage
  items: MenuItem[] | undefined;
  totalRegistros = 0;
  paginaAtual = 0;
  tamanhoPagina = 5;
  ref!: DynamicDialogRef

  ngOnInit(): void {
    this.populaMenu();
    this.listarMembros();
  }

  constructor(
    private membroService: MembroService,
    private router: Router,
    private dialogService: DialogService
  ) {

  }

  abrirMenu(menu: any, event: Event, membro: MembroPage) {
    this.membroSelecionado = membro
    menu.toggle(event)
  }

  populaMenu() {
    this.items = [
      {
        label: 'Editar',
        icon: PrimeIcons.PENCIL,
        command: () => {
          this.router.navigate(['/membros/cadastrar', this.membroSelecionado.id])
        }
      },
      {
        label: 'Excluir',
        icon: PrimeIcons.TRASH,
        command: () => {
          this.excluir(this.membroSelecionado.id)
        }
      },
      {
        label: 'Visualizar',
        icon: PrimeIcons.EYE,
        command: () => {
          this.abriModalVisualizar(this.membroSelecionado.id)
        }
      }
    ]
  }

  private listarMembros(): void {
    this.membroService.listar(this.paginaAtual, this.tamanhoPagina).subscribe(resposta => {
      this.membros = resposta.content
      this.totalRegistros = resposta.totalElements
    });
  }


  onPageChange(event: any): void {
    this.paginaAtual = event.page;
    this.tamanhoPagina = event.rows;
    this.listarMembros();
  }

  private abriModalVisualizar(id: any) {
    this.ref = this.dialogService.open(MembrosVisualizarComponent, {
      header: 'Visualizar',
      width: '70%',
      modal: true,
      closable: true,
      maximizable:true,
      data: {
        id
      }
    })
  }

  private excluir(id:any) {
    Swal.fire({
      title: 'Deseja excluir esse membro ?',
      text: 'Essa ação tem efeito permanente',
      icon: 'warning',
      showCancelButton:true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Não, cancelar',
    }).then((resultado: any) => {
      if (resultado.isConfirmed) {
        this.membroService.excluirMembro(id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Membro excluido com sucesso',
              text: `Código: ${id}`,
              icon: 'success',
            })
            this.listarMembros();
          },
          error:(error) =>{
            Swal.fire({
              title: 'Erro ao excluir membro',
              text: error.message,
              icon: 'error',
            })
          }
        })
      }
    })
  }
}
