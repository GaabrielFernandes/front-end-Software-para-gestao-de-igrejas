import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-btn-cadastrar',
  standalone: true,
  imports: [ButtonModule, RouterLink],
  templateUrl: './btn-cadastrar.component.html',
  styleUrl: './btn-cadastrar.component.css'
})
export class BtnCadastrarComponent {
  @Input() label!: string
  @Input() icon:string = 'pi pi-plus-circle'
  @Input() routerLink!:string
}
