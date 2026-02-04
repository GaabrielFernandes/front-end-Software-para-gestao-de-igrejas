import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface viaCepResponse{
    cep:string;
    logradouro:string,
    bairro:string,
    localidade:string,
    uf:string,
    erro?:string
}

@Injectable({providedIn:'root'})
export class ViaCepService{
    constructor(private http:HttpClient){}

    buscar(cep:string):Observable<ViaCepService>{
        const cepLimpo = cep.replace(/\D/g, '');
        return this.http.get<ViaCepService>(`https://viacep.com.br/ws/${cepLimpo}/json/`)
    }
}