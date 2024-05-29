import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SalaDeVelorio } from '../models/SalaDeVelorio.model';

@Injectable({
  providedIn: 'root'
})
export class SalasDeVelorioService {

  private apiUrl = 'http://localhost:8080/funeral-parlor'

  constructor(private http: HttpClient) { }

  public listarSalasDeVelorio(): Observable<SalaDeVelorio[]>{
    return this.http.get<SalaDeVelorio[]>(`${this.apiUrl}`);
  }

  public criarSalaDeVelorio(salaDeVelorio: SalaDeVelorio): Observable<SalaDeVelorio>{
    return this.http.post<SalaDeVelorio>(`${this.apiUrl}/create`, salaDeVelorio)
  }

  public removerSalaDeVelorio(id: number): Observable<SalaDeVelorio>{
    return this.http.delete<SalaDeVelorio>(`${this.apiUrl}/delete/${id}`)
  }

  public editarSalaDeVelorio(id: number, salaDeVelorio: SalaDeVelorio): Observable<SalaDeVelorio>{
    return this.http.post<SalaDeVelorio>(`${this.apiUrl}/update/${id}`, salaDeVelorio)
  }
}
