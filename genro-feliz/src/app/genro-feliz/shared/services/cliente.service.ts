import { Cliente } from './../models/Cliente.model';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Beneficiarios } from '../models/Beneficiarios.model';
import { Desconto } from '../models/Desconto.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = 'http://localhost:8080/client'

  constructor(private http: HttpClient) { }

  public listarClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${this.apiUrl}`);
  }

  public cadastrarCliente(formData: FormData): Observable<Cliente> {

    return this.http.post<Cliente>(`${this.apiUrl}/create`, formData, {
      headers: new HttpHeaders ({

      })
    });
  }

  public editarCliente(cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${this.apiUrl}/update/${cliente.id}`, cliente);

  }

  public deleteClient(cliente: Cliente): Observable<any>{
    return this.http.delete(`${this.apiUrl}/delete/${cliente.id}`);
  }

  public listarBeneficiariosDoCliente(cliente: Cliente): Observable<Beneficiarios[]>{
    return this.http.get<Beneficiarios[]>(`http://localhost:8080/beneficiary/client/${cliente.id}`);
  }

  public gerarRelatorioBeneficiariosDoCliente(cliente: Cliente){
    return this.http.get(`http://localhost:8080/beneficiary/client/report/${cliente.id}`, {
      responseType: 'blob' as 'json',
    })
  }

  public listarDescontos(id: number): Observable<Desconto>{
    return this.http.get<Desconto>(`http://localhost:8080/client/discount/${id}`);
  }



}
