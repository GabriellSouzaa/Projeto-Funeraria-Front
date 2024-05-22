import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/Cliente.model';
import { ClientRequest } from '../models/ClientRequest.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = 'http://localhost:8080/client'

  constructor(private http: HttpClient) { }

  public listarClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${this.apiUrl}`);
  }

  public cadastrarCliente(cliente: ClientRequest): Observable<Cliente>{
    return this.http.post<Cliente>(`${this.apiUrl}/create`, cliente);
  }

  public editarCliente(cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${this.apiUrl}/update/${cliente.id}`, cliente);
  
  }

  public deleteClient(cliente: Cliente): Observable<any>{
    console.log(cliente)
    return this.http.delete(`${this.apiUrl}/delete/${cliente.id}`);
  }


}
