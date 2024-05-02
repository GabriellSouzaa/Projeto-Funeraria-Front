import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../models/RegisterRequest.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = 'http://localhost:8080/auth/register';

  constructor(private http: HttpClient) { }

  public register(form: FormGroup): Observable<RegisterRequest>{
    return this.http.post<RegisterRequest>(`${this.apiUrl}`, form.value);
  }
}
