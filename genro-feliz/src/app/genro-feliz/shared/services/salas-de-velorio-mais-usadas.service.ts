import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalasDeVelorioMaisUsadasService {

  private apiUrl = 'http://localhost:8080/funeral-parlor-usages'

  constructor(private http: HttpClient) { }

  public obterRelatorioDasSalasDeVelorioMaisUsadas(){
    return this.http.get(`${this.apiUrl}/report`, {
      responseType: 'blob' as 'json',
    })
  }
}
