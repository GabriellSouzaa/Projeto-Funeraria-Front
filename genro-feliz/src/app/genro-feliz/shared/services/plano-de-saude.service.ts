import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlanoDeSaude } from '../models/PlanoDeSaude.model';

@Injectable({
  providedIn: 'root'
})
export class PlanoDeSaudeService {

  constructor(private http: HttpClient) { }

  private apiUrl: string = 'http://localhost:8080/health-plan';

  public listarPlanosDeSaude(): Observable<PlanoDeSaude[]>{
    return this.http.get<PlanoDeSaude[]>(this.apiUrl);
  }

  public criarPlanoDeSaude(planoDeSaude: PlanoDeSaude){
    return this.http.post(`${this.apiUrl}/create`, planoDeSaude)
  }

  public atualizarPlanoDeSaude(planoDeSaude: PlanoDeSaude, id: number){
    return this.http.put(`${this.apiUrl}/update/${id}`, planoDeSaude)
  }

  public deletarPlanoDeSaude(id: number){
    return this.http.delete(`${this.apiUrl}/delete/${id}`)
  }
}
