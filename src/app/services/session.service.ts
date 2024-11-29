import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private apiUrl = 'http://localhost:3000/sessions'; // Point d'accès backend pour les sessions

  constructor(private http: HttpClient) {}

  getSessions(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createSession(name: string): Observable<any> {
    return this.http.post(this.apiUrl, { name });
  }

  joinSessionByKey(key: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/join`, { accessKey: key });
  }
}
