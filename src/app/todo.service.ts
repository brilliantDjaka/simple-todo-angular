import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private baseUrl = 'https://simple-todo-nest-js.herokuapp.com';
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    }),
  };
  // TODO implement CRUD and Toggle todo
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.baseUrl + '/todos', this.httpOptions);
  }
  removeCompleted(): Observable<Todo[]> {
    return this.http.delete<Todo[]>(this.baseUrl + '/todos', this.httpOptions);
  }
  addTodos(title: string): Observable<Todo[]> {
    return this.http.post<Todo[]>(
      this.baseUrl + '/todos',
      { title },
      this.httpOptions
    );
  }
  checkUncheck(id: string, isDone: boolean): Observable<Todo[]> {
    return this.http.patch<Todo[]>(
      `${this.baseUrl}/todos/${id}`,
      { isDone },
      this.httpOptions
    );
  }
}
