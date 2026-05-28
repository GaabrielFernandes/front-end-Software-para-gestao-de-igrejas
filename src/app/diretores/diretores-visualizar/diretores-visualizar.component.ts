import { Component, OnInit } from '@angular/core';
import { NgClass } from "@angular/common";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { Diretor } from "../diretor.modal";
import { DiretorService } from "../diretor.service";

@Component({
  selector: 'app-diretores-visualizar',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './diretores-visualizar.component.html',
  styleUrl: './diretores-visualizar.component.css'
})
export class DiretoresVisualizarComponent implements OnInit {
  id!: number;
  diretor?: Diretor;
  carregando = false;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private diretorService: DiretorService
  ) {
    this.id = this.config.data?.id;
  }

  ngOnInit(): void {
    if (!this.id) {
      console.error('ID do diretor não foi informado ao abrir o modal.');
      this.ref.close();
      return;
    }

    this.buscarDiretor();
  }

  get departamentoLabel(): string {
    return this.formatarDepartamento(this.diretor?.departamento);
  }

  private buscarDiretor(): void {
    this.carregando = true;

    this.diretorService.buscarPorId(this.id).subscribe({
      next: (dados) => {
        this.diretor = dados;
      },
      error: (error) => {
        console.error('Erro ao buscar diretor:', error);
      },
      complete: () => {
        this.carregando = false;
      }
    });
  }

  private formatarDepartamento(departamento?: string): string {
    switch (departamento) {
      case 'SECRETARIA':
        return 'Secretaria';

      case 'TESOURARIA':
        return 'Tesouraria';

      case 'CONSELHO_FISCAL':
        return 'Conselho Fiscal';

      default:
        return 'Não informado';
    }
  }
}
