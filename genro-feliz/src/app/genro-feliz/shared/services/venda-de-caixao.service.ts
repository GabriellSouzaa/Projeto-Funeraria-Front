import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VendaDeCaixao } from '../models/VendaDeCaixao.model';

@Injectable({
  providedIn: 'root'
})
export class VendaDeCaixaoService {

  private apiUrl: string = 'http://localhost:8080/coffin-sales';

  constructor(private http: HttpClient) { }

  public listarVendasDeCaixao(): Observable<VendaDeCaixao[]>{
    return this.http.get<VendaDeCaixao[]>(this.apiUrl);
  }

  public cadastrarVendaDeCaixao(vendaDeCaixao: VendaDeCaixao): Observable<VendaDeCaixao>{
    return this.http.post<VendaDeCaixao>(`${this.apiUrl}/create`, vendaDeCaixao);
  } 

  public atualizarVendaDeCaixao(vendaDeCaixao: VendaDeCaixao): Observable<VendaDeCaixao>{
    return this.http.put<VendaDeCaixao>(`${this.apiUrl}/update/${vendaDeCaixao.id}`, vendaDeCaixao);
  }

  public deletarVendaDeCaixao(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
