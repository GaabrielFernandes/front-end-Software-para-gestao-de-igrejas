import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { Page } from "../models/page.model";
import { Diretor, DiretorPage } from "./diretor.modal";

@Injectable({
  providedIn: 'root'
})
export class DiretorService {
  private readonly baseUrl = `${environment.apiUrl}/diretor`;

  constructor(private http: HttpClient) { }

  salvar(payload: Partial<Diretor>): Observable<Diretor> {
    return this.http.post<Diretor>(
      `${this.baseUrl}/salvar`,
      payload,
      { headers: this.getJsonHeaders() }
    );
  }

  listar(page: number, size: number): Observable<Page<DiretorPage>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http.get<Page<DiretorPage>>(
      this.baseUrl,
      {
        params,
        headers: this.getAuthHeaders()
      }
    );
  }

  buscarPorId(id: number): Observable<Diretor> {
    return this.http.get<Diretor>(
      `${this.baseUrl}/${id}`,
      { headers: this.getAuthHeaders() }
    );
  }

  atualizar(id: number, dto: Partial<Diretor>): Observable<Diretor> {
    return this.http.put<Diretor>(
      `${this.baseUrl}/atualizar/${id}`,
      dto,
      { headers: this.getJsonHeaders() }
    );
  }

  excluirDiretor(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/${id}`,
      { headers: this.getAuthHeaders() }
    );
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    if (!token || token === 'null') {
      console.warn('Token nao encontrado no localStorage.');
      return new HttpHeaders();
    }

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  private getJsonHeaders(): HttpHeaders {
    return this.getAuthHeaders().set('Content-Type', 'application/json');
  }
}
