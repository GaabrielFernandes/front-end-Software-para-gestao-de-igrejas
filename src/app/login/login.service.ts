import {Injectable} from "@angular/core";
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Login} from "./modal/login";
import {Observable} from "rxjs";
import {TokenResponse} from "./modal/tokenResponse";

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private readonly baseUrl = `${environment.apiUrl}/auth`
  constructor(private http:HttpClient) { }

  autenticacao(credenciais:Login):Observable<any>{
    return this.http.post<TokenResponse>(this.baseUrl+'/login', credenciais)
  }
}
