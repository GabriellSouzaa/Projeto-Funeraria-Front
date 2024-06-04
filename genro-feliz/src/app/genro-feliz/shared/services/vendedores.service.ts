import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vendedor } from '../models/Vendedor.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendedoresService {

  constructor(private http: HttpClient) { }

  private apiUrl: string = 'http://localhost:8080/seller';

  public listarVendedores(): Observable<Vendedor[]> {
    return this.http.get<Vendedor[]>(this.apiUrl);
  }

  public criarVendedor(vendedor: Vendedor): Observable<Vendedor>{
    return this.http.post<Vendedor>(`${this.apiUrl}/create`, vendedor);
  }

  public atualizarVendedor(vendedor: Vendedor, id: number): Observable<Vendedor>{
    return this.http.put<Vendedor>(`${this.apiUrl}/update/${id}`, vendedor);
  }

  public deletarVendedor(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
  
}
