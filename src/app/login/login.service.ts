import {Injectable} from "@angular/core";
import {environment} from "../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Login} from "./modal/login";
import {Observable} from "rxjs";
import {TokenResponse} from "./modal/tokenResponse";

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private readonly baseUrl = `${environment.apiUrl}/auth`
  constructor(private http:HttpClient) { }

  autenticacao(credenciais:Login):Observable<TokenResponse>{
    return this.http.post<TokenResponse>(this.baseUrl+'/login', credenciais)
  }

  alterarSenhaPrimeiroAcesso(novaSenha: string): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.put<void>(
      `${this.baseUrl}/primeiro-acesso/senha`,
      { novaSenha },
      { headers }
    );
  }
}
