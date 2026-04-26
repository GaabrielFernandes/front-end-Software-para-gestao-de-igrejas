import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { TabsModule } from 'primeng/tabs';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { MembroService } from '../membro.service';
import { ViaCepService } from '../../api-viaCep/via-cep.service';
import { map, filter, switchMap, catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { of } from 'rxjs';
import {NgClass} from "@angular/common";

type OptionItem = { label: string; value: string };

@Component({
  selector: 'app-membros-cadastrar',
  standalone: true,
  providers: [MessageService],
  imports: [
    InputTextModule,
    ReactiveFormsModule,
    FloatLabel,
    SelectModule,
    TabsModule,
    DatePickerModule,
    TextareaModule,
    ButtonModule,
    ToastModule,
    RouterLink,
    NgClass
  ],
  templateUrl: './membros-cadastrar.component.html',
  styleUrl: './membros-cadastrar.component.css'
})
export class MembrosCadastrarComponent implements OnInit {

  formulario!: FormGroup;

  sexo: OptionItem[] = [];
  estadoCivil: OptionItem[] = [];
  tipoMembro: OptionItem[] = [];
  tipoAdmissao: OptionItem[] = [];
  idMembro: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private membroservice: MembroService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private viaCepService:ViaCepService
  ) { }

  ngOnInit(): void {
    this.formulario = this.configuraFormulario();
    this.inicializarCombos();
    this.escutarCep();
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');

      if (idParam) {
        this.idMembro = Number(idParam);
        this.carregarMembro(this.idMembro);
      } else {
        this.idMembro = null;
        this.formulario.reset();
      }
    });
  }

  private inicializarCombos(): void {
    this.populaArraySexo();
    this.populaEstadoCivil();
    this.populaTipoMembro();
    this.populaTipoAdmissao();
  }

  private configuraFormulario(): FormGroup {
    return this.formBuilder.group({
      nomeCompleto: [null, Validators.required],
      sexo: [],
      dataNascimento: [],
      cidadeNascimento: [],
      enderecoAtual: this.formBuilder.group({
        cep:[],
        logradouro:[],
        bairro:[],
        numero:[],
        complemento:[],
        cidade:[],
        uf:[],
      }),
      estadoCivil: [],
      dataCasamento: [],
      conjuge: [],
      mae: [],
      pai: [],
      celular: [],
      email: [],
      tipoMembro: [],
      situacao: [],
      dataBatismo: [],
      pastorOficiante: [],
      dataBatismoEspiritoSanto: [],
      dataAdmissao: [],
      admitidoPor: [],
      admitidoPorOutro: [],
      ministerioPrincipal: [],
      funcaoMinisterial: [],
      departamentoPrincipal: [],
      funcaoDepartamental: [],
      dataRemocao: [],
      removidoPor: [],
      observacoes: [],
    });
  }


  private carregarMembro(id: number): void {
    this.membroservice.buscarPoId(id).subscribe({
      next: (dados) => {
        this.formulario.patchValue(dados);
        console.log("Valor data nascimento");
        console.log(this.formulario.get("dataNascimento")?.value);
      },
      error: () => {

        Swal.fire({
          title: 'Erro ao carregar membro',
          text: 'Não foi possível buscar os dados para edição.',
          icon: 'error'
        }).then(() => this.router.navigate(['/membros']));
      }
    });
  }

  private populaArraySexo(): void {
    this.sexo = [
      { label: 'Masculino', value: 'MASCULINO' },
      { label: 'Feminino', value: 'FEMININO' },
    ];
  }

  private populaEstadoCivil(): void {
    this.estadoCivil = [
      { label: 'Solteiro', value: 'SOLTEIRO' },
      { label: 'Casado', value: 'CASADO' },
      { label: 'Divorciado', value: 'DIVORCIADO' },
      { label: 'Viuvo', value: 'VIUVO' },
    ];
  }

  private populaTipoMembro(): void {
    this.tipoMembro = [
      { label: 'Ativo', value: 'ATIVO' },
      { label: 'Congredado', value: 'CONGREGADO' },
      { label: 'Criança', value: 'CRIANCA' },
      { label: 'Removido', value: 'REMOVIDO' },
      { label: 'Disciplina', value: 'EM_DISCIPLINA' },
    ];
  }

  private populaTipoAdmissao(): void {
    this.tipoAdmissao = [
      { label: 'Batismo', value: 'BATISMO' },
      { label: 'Carta', value: 'CARTA' },
      { label: 'Profissão de fé', value: 'PROFISSAO_FE' },
      { label: 'Outro', value: 'OUTRO' },
    ];
  }

  salvarMembro(): void {
    if (this.formulario.invalid) {
      this.messageService.clear();
      this.messageService.add({
        summary: 'Verifique o formulário',
        severity: 'error',
        detail: 'Campos obrigatórios não preenchidos'
      });
      this.formulario.markAllAsTouched();
      return;
    }
    if (this.idMembro !== null) {
      this.membroservice.atualizar(this.idMembro, this.formulario.value).subscribe({
        next: () => {
          Swal.fire({
            title: 'Alterações salvas!',
            text: 'Membro atualizado com sucesso',
            icon: 'success'
          })
          this.router.navigate(['/membros']);
        },
        error: () => {
          Swal.fire({
            title: 'Erro ao atualizar!',
            text: 'Favor, verifique os dados',
            icon: 'error'
          });
        }
      });
      return;
    }
    this.membroservice.salvar(this.formulario.value).subscribe({
      next: () => {
        Swal.fire({
          title: 'Cadastro realizado!',
          text: 'Membro salvo com sucesso',
          icon: 'success'
        })
        this.router.navigate(['/membros']);
      },
      error: (mensagemErro) => {
        console.log(mensagemErro)
        if (mensagemErro != null) {
          Swal.fire({
            title: 'Erro ao realizar cadastro!',
            text: mensagemErro?.error?.error,
            icon: 'error'
          })
          return
        }
        Swal.fire({
          title: 'Erro ao realizar cadastro!',
          text: 'Favor, verifique os dados',
          icon: 'error'
        });
      }
    });
  }

  private escutarCep(): void {
  const cepCtrl = this.formulario.get('enderecoAtual.cep');
  if (!cepCtrl) return;

  cepCtrl.valueChanges.pipe(
    debounceTime(400),
    distinctUntilChanged(),
    map(v => (v ?? '').toString().replace(/\D/g, '')),
    filter(cep => cep.length === 8),
    switchMap(cep =>
      this.viaCepService.buscar(cep).pipe(
        catchError(() => of({ erro: true } as any))
      )
    )
  ).subscribe((res) => {
    if (!res || res.erro) {
      this.messageService.add({
        severity: 'warn',
        summary: 'CEP inválido',
        detail: 'Não encontrei esse CEP no ViaCEP.'
      });
      return;
    }

    this.formulario.patchValue({
      enderecoAtual: {
        logradouro: res.logradouro ? res.logradouro : this.formulario.get('enderecoAtual.logradouro')?.value,
        bairro: res.bairro ? res.bairro : this.formulario.get('enderecoAtual.bairro')?.value,
        cidade: res.localidade ? res.localidade : this.formulario.get('enderecoAtual.cidade')?.value,
        uf: res.uf ? res.uf : this.formulario.get('enderecoAtual.uf')?.value,
        complemento: res.complemento ? res.complemento : this.formulario.get('enderecoAtual.complemento')?.value,
      }
    });
  });
}

}
