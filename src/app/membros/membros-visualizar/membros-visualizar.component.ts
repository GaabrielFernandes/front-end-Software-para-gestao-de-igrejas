import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MembroService } from '../membro.service';

@Component({
  selector: 'app-membros-visualizar',
  standalone: true,
  imports: [],
  templateUrl: './membros-visualizar.component.html',
  styleUrl: './membros-visualizar.component.css'
})
export class MembrosVisualizarComponent implements OnInit {
  id!:number
  membro:any

  ngOnInit(): void {
    this.buscarMembro();
  }

  constructor(
    public ref: DynamicDialogRef,
    public config:DynamicDialogConfig,
    private membroService:MembroService
  ){
    this.id = this.config.data?.id
  }

  private buscarMembro(){
    this.membroService.buscarPoId(this.id).subscribe({
      next:(dados) => this.membro = dados,
      error:() => this.ref.close()
    })
  }
}
