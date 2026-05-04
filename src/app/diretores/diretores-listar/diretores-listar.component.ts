import {Component, OnInit} from '@angular/core';
import {BtnCadastrarComponent} from "../../shared/btn-cadastrar/btn-cadastrar.component";
import {Button} from "primeng/button";
import {DatePipe} from "@angular/common";
import {Menu} from "primeng/menu";
import {MenuItem, PrimeIcons, PrimeTemplate} from "primeng/api";
import {Router, RouterLink} from "@angular/router";
import {TableModule} from "primeng/table";
import {MembroPage, MembroService} from "../../membros/membro.service";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {MembrosVisualizarComponent} from "../../membros/membros-visualizar/membros-visualizar.component";
import Swal from "sweetalert2";
import {DiretorPage} from "../../membros/modal/diretorPage";
import {DiretorService} from "../diretor.service";

@Component({
  selector: 'app-diretores-listar',
  standalone: true,
  providers: [DialogService],
  imports: [
    BtnCadastrarComponent,
    Button,
    Menu,
    PrimeTemplate,
    RouterLink,
    TableModule
  ],
  templateUrl: './diretores-listar.component.html',
  styleUrl: './diretores-listar.component.css'
})
export class DiretoresListarComponent implements OnInit {
  diretor: DiretorPage[] = []
  diretorSelecionado!: DiretorPage
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
    private diretorService: DiretorService,
    private router: Router,
    private dialogService: DialogService
  ) {

  }

  abrirMenu(menu: any, event: Event, membro: MembroPage) {
    this.diretorSelecionado = membro
    menu.toggle(event)
  }

  populaMenu() {
    this.items = [
      {
        label: 'Editar',
        icon: PrimeIcons.PENCIL,
        command: () => {
          this.router.navigate(['/membros/cadastrar', this.diretorSelecionado.id])
        }
      },
      {
        label: 'Excluir',
        icon: PrimeIcons.TRASH,
        command: () => {
          this.excluir(this.diretorSelecionado.id)
        }
      },
      {
        label: 'Visualizar',
        icon: PrimeIcons.EYE,
        command: () => {
          this.abriModalVisualizar(this.diretorSelecionado.id)
        }
      }
    ]
  }

  private listarMembros(): void {
    this.diretorService.listar(this.paginaAtual, this.tamanhoPagina).subscribe(resposta => {
      this.diretor = resposta.content
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
        this.diretorService.excluirMembro(id).subscribe({
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
