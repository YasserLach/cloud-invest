import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Task } from '../models/task';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }

  private apiUrl = environment.apiUrl;
  

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl).pipe(
      catchError((error) => {
        return throwError(() => new Error('Failed to fetch tasks. Please try again later.'));
      })
    );
  }

  deleteTask(id:string): Observable<any> {
    return this.http.delete(this.apiUrl+'/'+id).pipe(
      catchError((error) => {
        return throwError(() => new Error('Failed to delete task. Please try again later.'));
      })
    );
  }

  addNewTask(task:Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl,task).pipe(
      catchError((error) => {
        return throwError(() => new Error('Failed to add task. Please try again later.'));
      })
    );
  }

  updateTask(task:any,id:string): Observable<Task> {
    return this.http.put<Task>(this.apiUrl+'/'+id,task).pipe(
      catchError((error) => {
        return throwError(() => new Error('Failed to update task. Please try again later.'));
      })
    );
  }

  getTaskById(id:string): Observable<Task> {
    return this.http.get<Task>(this.apiUrl+'/'+id).pipe(
      catchError((error) => {
        return throwError(() => new Error('Failed to fetch task. Please try again later.'));
      })
    );
  }


}
