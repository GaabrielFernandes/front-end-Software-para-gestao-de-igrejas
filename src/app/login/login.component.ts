import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {Password} from "primeng/password";
import {FloatLabel} from "primeng/floatlabel";
import {InputText} from "primeng/inputtext";
import {Button} from "primeng/button";
import {LoginService} from "./login.service";

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

    formulario!:FormGroup

    constructor(private readonly formBuilder: FormBuilder, private readonly loginService:LoginService, private readonly router:Router) {
    }

    ngOnInit(): void {
      this.configuraFormulario()
    }


    configuraFormulario(){
      this.formulario = this.formBuilder.group({
        email:[null, Validators.required],
        senha:[null, Validators.required]
      })
    }

  enviarCredenciais() {
    this.loginService.autenticacao(this.formulario.value).subscribe({
      next: response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('nome', response.nome);
        localStorage.setItem('departamento', response.departamento);
        this.router.navigate(["/dashboard"]);
      },
      error: error => alert('Credenciais inválidas')
    });
  }
}
