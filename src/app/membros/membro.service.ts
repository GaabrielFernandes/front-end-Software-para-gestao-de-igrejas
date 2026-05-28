import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
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
    const meusHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post<Membro>(`${this.baseUrl}/salvar`, payload, {headers : meusHeaders})
  }

  listar(page:number, size:number):Observable<Page<MembroPage>>{
    const params = new HttpParams().set('page',page).set('size',size)

    const token = localStorage.getItem('token');
    return this.http.get<Page<MembroPage>>(this.baseUrl, {
      params,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  buscarPoId(id:number){
    const meusHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.get<Membro>(`${this.baseUrl}/${id}`,{headers : meusHeaders}).pipe(
      map(response => this.converterDatas(response))
    )
  }

  atualizar(id:number, dto:Membro){
    const meusHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.put<Membro>(`${this.baseUrl}/${id}`,dto, {headers: meusHeader})
  }

  excluirMembro(id:number){
    const meusHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.delete(`${this.baseUrl}/${id}`, {headers: meusHeaders})
  }

  private converterDatas(obj: any): Membro {

    const camposData = [
      'dataNascimento',
      'dataCasamento',
      'dataBatismo',
      'dataAdmissao',
      'dataRemocao'
    ];

    camposData.forEach(campo => {
      if (obj[campo]) {
        const [ano, mes, dia] = obj[campo].split('T')[0].split('-').map(Number);

        obj[campo] = new Date(ano, mes - 1, dia);
      }
    });

    return obj as Membro;
  }
}
