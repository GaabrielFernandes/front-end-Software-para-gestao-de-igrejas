import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Membro } from './membro.model';
import { Observable } from 'rxjs';
import { Page } from '../models/page.model';
import {map} from "rxjs/operators";

export interface MembroPage{
  id:number;
  nomeCompleto:string;
  dataBatismo:Date;
  dataAdmissao:Date
}

@Injectable({
  providedIn: 'root'
})
export class MembroService {
  private readonly baseUrl = `${environment.apiUrl}/membros`

  constructor(private http:HttpClient) { }

  salvar(payload:Partial<Membro>):Observable<any>{
    return this.http.post<Membro>(this.baseUrl, payload)
  }

  listar(page:number, size:number):Observable<Page<MembroPage>>{
    const params = new HttpParams().set('page',page).set('size',size)
    return this.http.get<Page<MembroPage>>(this.baseUrl, {params})
  }

  buscarPoId(id:number){
    return this.http.get<Membro>(`${this.baseUrl}/${id}`).pipe(
      map(response => this.converterDatas(response))
    )
  }

  atualizar(id:number, dto:Membro){
    return this.http.put<Membro>(`${this.baseUrl}/${id}`,dto)
  }

  excluirMembro(id:number){
    return this.http.delete(`${this.baseUrl}/${id}`)
  }

  private converterDatas(obj:any):Membro{
    const camposData = [
      'dataNascimento',
      'dataCasamento',
      'dataBatismo',
      'dataAdmissao',
      'dataRemocao'
    ];

    camposData.forEach(campo => {
      if(obj[campo]){
        obj[campo] = new Date(obj[campo]);
      }
    });
    return obj as Membro;
  }
}
