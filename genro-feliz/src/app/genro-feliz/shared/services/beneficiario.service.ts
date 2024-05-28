import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Beneficiarios } from '../models/Beneficiarios.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeneficiarioService {

  private apiUrl = 'http://localhost:8080/beneficiary';

  constructor(private http: HttpClient) { }

  public listarBeneficiarios(): Observable<Beneficiarios[]>{
    return this.http.get<Beneficiarios[]>(`${this.apiUrl}`);
  }

  public cadastrarBeneficiario(): Observable<Beneficiarios>{
    return this.http.post<Beneficiarios>(`${this.apiUrl}/create`, Beneficiarios);
  }

  public excluirBeneficiario(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  public editarBeneficiario(beneficiario: Beneficiarios): Observable<Beneficiarios>{
    return this.http.put<Beneficiarios>(`${this.apiUrl}/update/${beneficiario.id}`, beneficiario);
  }

  public listarBeneficiariosDoCliente(id: number): Observable<Beneficiarios[]>{
    return this.http.get<Beneficiarios[]>(`${this.apiUrl}/client/${id}`);
  }
}
