import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Task } from './task';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiServerUrl}/task`);
  }

  public addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiServerUrl}/task`, task);
  }

  public saveTask(task: Task): Observable<void> {
    return this.http.put<void>(`${this.apiServerUrl}/task`, task);
  }

  public deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/task/${id}`);
  }
}
