import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3000'; // L'URL de votre API backend

  constructor(private http: HttpClient) {}

  getTasks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tasks`);
  }

  createTask(task: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tasks`, task);
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tasks/${taskId}`);
  }

  updateTask(taskId: number, task: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/tasks/${taskId}`, task);
  }
}
