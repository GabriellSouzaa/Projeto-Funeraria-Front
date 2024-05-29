import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlanoFunerario } from '../models/PlanoFunerario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanoFunerarioService {

  private apiUrl = 'http://localhost:8080/funeral-plan'

  constructor(private http: HttpClient) { }

  public listarPlanosFunerarios(): Observable<PlanoFunerario[]>{
    return this.http.get<PlanoFunerario[]>(`${this.apiUrl}`);
  }

  public criarPlanoFunerario(planoFunerario: PlanoFunerario): Observable<any>{
    return this.http.post(`${this.apiUrl}/create`, planoFunerario)
  }

  public removerPlanoFunerario(id: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/delete/${id}`)
  }

  public atualizarPlanoFunerario(planoFunerario: PlanoFunerario, id: number): Observable<any>{
    return this.http.post(`${this.apiUrl}/update/${id}`, planoFunerario)
  }

  
}
