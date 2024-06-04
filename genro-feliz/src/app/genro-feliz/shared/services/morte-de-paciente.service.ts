import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MorteDePaciente } from '../models/MorteDePaciente.model';
import { MorteDePacienteForm } from '../../forms/MorteDePaciente.form';

@Injectable({
  providedIn: 'root'
})
export class MorteDePacienteService {

  constructor(private http: HttpClient) { }

  private apiUrl: string = 'http://localhost:8080/patient-death';

  public listarMortesDePaciente(): Observable<MorteDePaciente[]>{
    return this.http.get<MorteDePaciente[]>(`${this.apiUrl}`);
  }

  public cadastrarMorteDePaciente(morteDePaciente: MorteDePacienteForm): Observable<MorteDePacienteForm>{
    return this.http.post<MorteDePacienteForm>(`${this.apiUrl}/create`, morteDePaciente);
  }

  public editarMorteDePaciente(id: number, morteDePaciente: MorteDePaciente): Observable<MorteDePaciente>{
    return this.http.put<MorteDePaciente>(`${this.apiUrl}/update/${id}`, morteDePaciente);
  }

  public deletarMorteDePaciente(id: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
