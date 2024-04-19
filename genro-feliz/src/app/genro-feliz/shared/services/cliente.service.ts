import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/Cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = 'http://localhost:8080/client'

  constructor(private http: HttpClient) { }

  public listarClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${this.apiUrl}`);
  }

  public cadastrarCliente(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(`${this.apiUrl}/cadastrar`, cliente);
  }
}
