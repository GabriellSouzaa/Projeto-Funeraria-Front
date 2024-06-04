import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MorteDePaciente } from '../models/MorteDePaciente.model';

@Injectable({
  providedIn: 'root'
})
export class MorteDePacienteService {

  constructor(private http: HttpClient) { }

  private apiUrl: string = 'http://localhost:8080/patient-death';

  public listarMortesDePaciente(): Observable<MorteDePaciente[]>{
    return this.http.get<MorteDePaciente[]>(`${this.apiUrl}`);
  }

  public cadastrarMorteDePaciente(morteDePaciente: MorteDePaciente): Observable<MorteDePaciente>{
    return this.http.post<MorteDePaciente>(`${this.apiUrl}/create`, morteDePaciente);
  }

  public editarMorteDePaciente(id: number, morteDePaciente: MorteDePaciente): Observable<MorteDePaciente>{
    return this.http.put<MorteDePaciente>(`${this.apiUrl}/update/${id}`, morteDePaciente);

  }
}
