import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  providers: [MessageService],
  imports: [
    ToastModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
    this.boasVindasUsuario()
  }

  boasVindasUsuario(){
    let usuario = localStorage.getItem('nome');
    let mensagemBoasVindas = sessionStorage.getItem('mensagemBoasVindas');
    if(!mensagemBoasVindas){
      setTimeout(() => {
        this.messageService.add({
          severity: 'success',
          summary: `Olá ${usuario}! 👋`,
          detail: 'Bem-vindo ao dashboard',
          life: 3000
        });
      }, 100);
      sessionStorage.setItem('mensagemBoasVindas', 'true');
    }
  }
}
