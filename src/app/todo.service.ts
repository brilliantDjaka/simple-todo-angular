import { Injectable } from '@angular/core';
import { Todo } from './todo';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private baseUrl = environment.BASE_URL_API;
  private jwt = localStorage.getItem('jwt');
  constructor(private http: HttpClient, private authService: AuthService) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + this.jwt,
    }),
  };
  // TODO implement CRUD and Toggle todo
  getTodos(): Observable<Todo[]> {
    return this.http
      .get<Todo[]>(this.baseUrl + '/todos', this.httpOptions)
      .pipe(catchError((error: HttpErrorResponse)=>this.handleError(error,this.authService)));
  }
  removeCompleted(): Observable<Todo[]> {
    return this.http
      .delete<Todo[]>(this.baseUrl + '/todos', this.httpOptions)
      .pipe(catchError((error: HttpErrorResponse)=>this.handleError(error,this.authService)));
  }
  addTodos(title: string): Observable<Todo> {
    return this.http
      .post<Todo>(this.baseUrl + '/todos', { title }, this.httpOptions)
      .pipe(catchError((error: HttpErrorResponse)=>this.handleError(error,this.authService)));
  }
  checkUncheck(id: string, isDone: boolean): Observable<Todo[]> {
    return this.http
      .patch<Todo[]>(
        `${this.baseUrl}/todos/${id}`,
        { isDone },
        this.httpOptions
      )
      .pipe(catchError((error: HttpErrorResponse)=>this.handleError(error,this.authService)));
  }
  handleError(error: HttpErrorResponse, authService:AuthService) {
    if (error.status == 401) {
      localStorage.clear();
      authService.redirectIfJWTNotExist();
    }
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
