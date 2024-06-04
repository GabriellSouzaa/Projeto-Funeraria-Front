import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VendaDeCaixao } from '../models/VendaDeCaixao.model';
import { CadastroVendaDeCaixaoNovoForm } from '../../forms/CadastroVendaDeCaixaoNovo.form';

@Injectable({
  providedIn: 'root'
})
export class VendaDeCaixaoService {

  private apiUrl: string = 'http://localhost:8080/coffin-sales';

  constructor(private http: HttpClient) { }

  public listarVendasDeCaixao(): Observable<VendaDeCaixao[]>{
    return this.http.get<VendaDeCaixao[]>(this.apiUrl);
  }

  public cadastrarVendaDeCaixao(vendaDeCaixao: CadastroVendaDeCaixaoNovoForm): Observable<CadastroVendaDeCaixaoNovoForm>{
    return this.http.post<CadastroVendaDeCaixaoNovoForm>(`${this.apiUrl}/create`, vendaDeCaixao);
  } 

  public atualizarVendaDeCaixao(vendaDeCaixao: VendaDeCaixao, id: number): Observable<VendaDeCaixao>{
    return this.http.put<VendaDeCaixao>(`${this.apiUrl}/update/${id}`, vendaDeCaixao);
  }

  public deletarVendaDeCaixao(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  public obterRelatorioDeVendasDeCaixao(){
    return this.http.get(`${this.apiUrl}/report`, {
      responseType: 'blob' as 'json',
    });
  }
}
