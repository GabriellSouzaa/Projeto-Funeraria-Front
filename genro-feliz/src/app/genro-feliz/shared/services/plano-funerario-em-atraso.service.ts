import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlanoFunerarioAtrasado } from '../models/PlanoFunerarioAtrasado.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanoFunerarioEmAtrasoService {

  private apiUrl = 'http://localhost:8080/funeral-plan'

  constructor(private http: HttpClient) { }

  public listarPlanosFunerariosEmAtraso(): Observable<PlanoFunerarioAtrasado[]>{
    return this.http.get<PlanoFunerarioAtrasado[]>(`${this.apiUrl}/atrasados`);
  }

  public gerarRelatorioPlanosFunerariosEmAtraso(){
    return this.http.get(`${this.apiUrl}/report/delayed-plan`,
      {
        responseType: 'blob' as 'json',
      }
    );
  }
}
