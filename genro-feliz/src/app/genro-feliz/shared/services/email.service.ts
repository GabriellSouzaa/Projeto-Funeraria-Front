import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = 'http://localhost:8080/email'

  constructor(private http: HttpClient) { }

  public sendEmailToDelayedFuneralPlan(nomeCliente: string, id: string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${nomeCliente}/${id}`);
  }

  public sendEmailToBeneficiariesDeath(id: number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/beneficiary/${id}`);
  }
}
