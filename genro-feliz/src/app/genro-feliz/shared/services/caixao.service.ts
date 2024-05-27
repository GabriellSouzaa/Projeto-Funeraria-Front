import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Caixao } from '../models/Caixao.model';

@Injectable({
  providedIn: 'root'
})
export class CaixaoService {

  private apiUrl = 'http://localhost:8080/coffin';

  constructor(private http: HttpClient) { }

  public listarCaixoes(): Observable<Caixao[]>{
    return this.http.get<Caixao[]>(`${this.apiUrl}`);
  }

  public excluirCaixao(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
