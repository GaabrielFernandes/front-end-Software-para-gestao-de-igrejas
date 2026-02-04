import { Component, Input } from '@angular/core';

type LgpdType = 'cpf' | 'telefone'

@Component({
  selector: 'app-lgpd-field',
  standalone: true,
  imports: [],
  templateUrl: './lgpd-field.component.html',
  styleUrl: './lgpd-field.component.css'
})
export class LgpdFieldComponent {
  @Input({required:true}) value!:string;
  @Input({required:true}) type!:LgpdType;
  @Input() canViewFull = false

  get displayValue(): string {
    if(this.canViewFull){
      return this.value
    }
    return this.type === 'cpf' ? this.maskCPF(this.value) : this.maskTelefone(this.value)
  }

  private maskCPF(cpf: string): string {
    const v = cpf?.replace(/\D/g, '');
    if (!v || v.length !== 11) return '***.***.***-**';
    return `${v.slice(0, 3)}.***.***-${v.slice(9)}`;
  }

  private maskTelefone(tel: string): string {
    const v = tel?.replace(/\D/g, '');
    if (!v || v.length < 10) return '(**) *****-****';
    return `(${v.slice(0, 2)}) *****-**${v.slice(-2)}`;
  }
}
