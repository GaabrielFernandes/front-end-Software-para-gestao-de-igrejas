import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgIf } from "@angular/common";
import { Password } from "primeng/password";
import { FloatLabel } from "primeng/floatlabel";
import { InputText } from "primeng/inputtext";
import { Button } from "primeng/button";
import { LoginService } from "./login.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    Password,
    FormsModule,
    FloatLabel,
    InputText,
    Button
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  formulario!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly loginService: LoginService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.configuraFormulario();
  }

  configuraFormulario(): void {
    this.formulario = this.formBuilder.group({
      email: [null, Validators.required],
      senha: [null, Validators.required]
    });
  }

  enviarCredenciais(): void {
    this.loginService.autenticacao(this.formulario.value).subscribe({
      next: response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('nome', response.nome);
        localStorage.setItem('departamento', response.departamento);
        localStorage.setItem('email', response.email);
        localStorage.setItem('senhaProvisoria', String(response.senhaProvisoria));

        if (response.senhaProvisoria) {
          this.solicitarNovaSenha();
          return;
        }

        this.router.navigate(["/dashboard"]);
      },
      error: () => alert('Credenciais invalidas')
    });
  }

  private solicitarNovaSenha(): void {
    const nomeUsuario = localStorage.getItem('nome') || 'seja bem-vindo';

    Swal.fire({
      title: `Bem-vindo, ${nomeUsuario}!`,
      html: `
        <p style="margin: 0 0 1rem; color: #64748b; text-align: left;">
          Para continuar, informe uma nova senha de acesso.
        </p>
        <input id="novaSenha" type="password" class="swal2-input" placeholder="Nova senha">
        <input id="confirmarSenha" type="password" class="swal2-input" placeholder="Confirmar nova senha">
      `,
      confirmButtonText: 'Salvar nova senha',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showCancelButton: false,
      focusConfirm: false,
      preConfirm: () => {
        const novaSenha = (document.getElementById('novaSenha') as HTMLInputElement)?.value;
        const confirmarSenha = (document.getElementById('confirmarSenha') as HTMLInputElement)?.value;

        if (!novaSenha || novaSenha.length < 4) {
          Swal.showValidationMessage('A nova senha deve ter pelo menos 4 caracteres.');
          return false;
        }

        if (novaSenha !== confirmarSenha) {
          Swal.showValidationMessage('As senhas informadas nao conferem.');
          return false;
        }

        return novaSenha;
      }
    }).then(resultado => {
      if (!resultado.isConfirmed || !resultado.value) {
        return;
      }

      this.loginService.alterarSenhaPrimeiroAcesso(resultado.value).subscribe({
        next: () => {
          localStorage.setItem('senhaProvisoria', 'false');
          Swal.fire({
            title: 'Senha atualizada!',
            text: 'Seu acesso foi configurado com sucesso.',
            icon: 'success'
          }).then(() => this.router.navigate(['/dashboard']));
        },
        error: () => {
          Swal.fire({
            title: 'Erro ao atualizar senha',
            text: 'Tente novamente para continuar usando o sistema.',
            icon: 'error'
          }).then(() => this.solicitarNovaSenha());
        }
      });
    });
  }
}
