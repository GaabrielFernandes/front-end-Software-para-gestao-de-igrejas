import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ToastModule,
    ChartModule
  ],
  providers: [MessageService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  // Variáveis de Estado e Mocks
  dataAtual: Date = new Date();
  nomeUsuario: string = 'Gabriel Fernandes';

  // Gráfico
  pieData: any;
  pieOptions: any;

  membrosRecentes = [
    { nome: 'Marina Cruz', status: 'Ativo', statusClass: 'active', depto: 'Louvor' },
    { nome: 'Pedro Lima', status: 'Disciplina', statusClass: 'discipline', depto: 'Diaconato' },
    { nome: 'Ana Silva', status: 'Ativo', statusClass: 'active', depto: 'EBD' }
  ];

  proximosAniversariantes = [
    { nome: 'João Pedro', data: '05/05', idade: 22 },
    { nome: 'Maria Eduarda', data: '07/05', idade: 30 },
    { nome: 'Lucas Oliveira', data: '10/05', idade: 15 },
    { nome: 'Beatriz Santos', data: '12/05', idade: 45 },
    { nome: 'Ricardo Alves', data: '15/05', idade: 50 },
    { nome: 'Carla Souza', data: '18/05', idade: 28 },
    { nome: 'Marcos Vinícius', data: '20/05', idade: 35 },
    { nome: 'Fernanda Lima', data: '22/05', idade: 19 },
    { nome: 'Roberto Carlos', data: '25/05', idade: 60 },
    { nome: 'Juliana Paes', data: '28/05', idade: 33 }
  ];

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.configurarBoasVindas();
    this.inicializarGrafico();
  }

  private configurarBoasVindas() {
    const usuario = localStorage.getItem('nome') || this.nomeUsuario;
    const jaExibiu = sessionStorage.getItem('mensagemBoasVindas');

    if (!jaExibiu) {
      setTimeout(() => {
        this.messageService.add({
          severity: 'success',
          summary: `Olá, ${usuario}! 👋`,
          detail: 'Bem-vindo ao sistema de gestão.',
          life: 3000
        });
      }, 500);
      sessionStorage.setItem('mensagemBoasVindas', 'true');
    }
  }

  private inicializarGrafico() {
    this.pieData = {
      labels: ['Crianças', 'Jovens', 'Adultos', 'Idosos'],
      datasets: [
        {
          data: [150, 320, 600, 175],
          backgroundColor: ['#3b82f6', '#22c55e', '#f59e0b', '#64748b'],
          hoverBackgroundColor: ['#2563eb', '#16a34a', '#d97706', '#475569'],
          borderWidth: 0
        }
      ]
    };

    this.pieOptions = {
      cutout: '70%',
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#64748b', usePointStyle: true, padding: 20 }
        }
      }
    };
  }
}
