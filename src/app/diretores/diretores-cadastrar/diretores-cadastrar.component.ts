import { Component, OnInit } from '@angular/core';
import { FloatLabel } from "primeng/floatlabel";
import { InputText } from "primeng/inputtext";
import { Password } from "primeng/password";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Select } from "primeng/select";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import Swal from "sweetalert2";
import { DiretorService } from "../diretor.service";
import { Diretor } from "../diretor.modal";

type OptionItem = { label: string, value: string };

@Component({
  selector: 'app-diretores-cadastrar',
  standalone: true,
  imports: [
    FloatLabel,
    InputText,
    Password,
    ReactiveFormsModule,
    Select,
    RouterLink
  ],
  templateUrl: './diretores-cadastrar.component.html',
  styleUrl: './diretores-cadastrar.component.css'
})
export class DiretoresCadastrarComponent implements OnInit {

  formulario!: FormGroup
  departamentos: OptionItem[] = []
  idDiretor: number | null = null

  constructor(
    private formBuilder: FormBuilder,
    private diretorService: DiretorService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.configuraFormulario()
    this.populaDepartamentos()
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id')

      if (idParam) {
        this.idDiretor = Number(idParam)
        this.configurarSenhaComoOpcional()
        this.carregarDiretor(this.idDiretor)
        return
      }

      this.idDiretor = null
      this.configurarSenhaComoObrigatoria()
      this.formulario.reset({ senha: '1234' })
    })
  }

  get modoEdicao(): boolean {
    return this.idDiretor !== null
  }

  configuraFormulario(): void {
    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      senha: ['1234', Validators.required],
      departamento: [null, Validators.required],
    })
  }

  populaDepartamentos(): void {
    this.departamentos = [
      { label: 'Secretaria', value: 'SECRETARIA' },
      { label: 'Tesouraria', value: 'TESOURARIA' },
      { label: 'Conselho Fiscal', value: 'CONSELHO_FISCAL' },
    ]
  }

  salvarDiretor(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched()
      Swal.fire({
        title: 'Verifique o formulario',
        text: 'Campos obrigatorios nao preenchidos',
        icon: 'error'
      })
      return
    }

    const payload: Partial<Diretor> = { ...this.formulario.value }

    if (this.idDiretor !== null) {
      if (!payload.senha) {
        delete payload.senha
      }

      this.diretorService.atualizar(this.idDiretor, payload).subscribe({
        next: () => {
          Swal.fire({
            title: 'Alteracoes salvas!',
            text: 'Diretor atualizado com sucesso',
            icon: 'success'
          })
          this.router.navigate(['/diretores'])
        },
        error: () => {
          Swal.fire({
            title: 'Erro ao atualizar!',
            text: 'Favor, verifique os dados',
            icon: 'error'
          })
        }
      })
      return
    }

    this.diretorService.salvar(payload).subscribe({
      next: () => {
        Swal.fire({
          title: 'Cadastro realizado!',
          text: 'Diretor salvo com sucesso',
          icon: 'success'
        })
        this.router.navigate(['/diretores'])
      },
      error: (error) => {
        Swal.fire({
          title: 'Erro ao realizar cadastro!',
          text: error?.error?.error || 'Favor, verifique os dados',
          icon: 'error'
        })
      }
    })
  }

  private carregarDiretor(id: number): void {
    this.diretorService.buscarPorId(id).subscribe({
      next: (dados) => {
        this.formulario.patchValue({
          nome: dados.nome,
          email: dados.email,
          departamento: dados.departamento,
          senha: null
        })
      },
      error: () => {
        Swal.fire({
          title: 'Erro ao carregar diretor',
          text: 'Nao foi possivel buscar os dados para edicao.',
          icon: 'error'
        }).then(() => this.router.navigate(['/diretores']))
      }
    })
  }

  private configurarSenhaComoOpcional(): void {
    const senhaControl = this.formulario.get('senha')
    senhaControl?.clearValidators()
    senhaControl?.updateValueAndValidity()
  }

  private configurarSenhaComoObrigatoria(): void {
    const senhaControl = this.formulario.get('senha')
    senhaControl?.setValidators([Validators.required])
    senhaControl?.updateValueAndValidity()
  }
}
