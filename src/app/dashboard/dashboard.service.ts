
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../environments/environment";

export interface DashboardMetrics {
  totalMembros: number;
  totalMesAnterior: number;
  percentualCrescimento: number;
  novosMembrosNoMes: number;
  aniversariantesHoje: number;
  aniversariantesNoMes: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = `${environment.apiUrl}/dashboard`;

  constructor(private http: HttpClient) {}

  getMetrics(): Observable<DashboardMetrics> {
    const meusHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.get<DashboardMetrics>(`${this.apiUrl}/metrics`,{headers: meusHeaders});
  }
}
