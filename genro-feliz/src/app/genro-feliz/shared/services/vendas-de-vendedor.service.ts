import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VendasDeVendedorService {

  constructor(private http: HttpClient) { }

  private apiUrl: string = 'http://localhost:8080/seller-salles';

  public obterRelatorioMensalDeVendasPorVendedor(){
    return this.http.get(`${this.apiUrl}/report`, {
      responseType: 'blob' as 'json',
    });
  }
}
