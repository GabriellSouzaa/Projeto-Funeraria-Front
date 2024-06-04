import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlanoDeSaudeService {

  constructor(private http: HttpClient) { }

  private apiUrl: string = 'http://localhost:8080/plano-de-saude';
}
