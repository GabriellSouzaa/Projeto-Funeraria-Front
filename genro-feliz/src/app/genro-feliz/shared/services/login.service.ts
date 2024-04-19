import { FormGroup } from '@angular/forms';
import { Login } from '../models/Login.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:8080/auth/login';

  constructor(private http: HttpClient) { }

  public login(form: FormGroup): Observable<any>{
    return this.http.post(`${this.apiUrl}`, form.value);
  }


}
