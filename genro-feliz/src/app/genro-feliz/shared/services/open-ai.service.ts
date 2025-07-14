import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenAiService {

  constructor(private http: HttpClient) { }

  private apiUrl: string = 'http://localhost:8080/open-ai';

    public chat(message: string): Observable<string>{
      return this.http.get<string>(`${this.apiUrl}/chat?message=${encodeURIComponent(message)}`);
    }
  }
