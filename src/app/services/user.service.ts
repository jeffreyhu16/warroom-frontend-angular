import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';
import { USER_SAMPLE } from 'src/app/model/user-data';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = environment.apiDomain + '/User';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getUserGridData(): Observable<any[]> {
    const userGridData = of(USER_SAMPLE);
    return userGridData;
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/GetAll`)
      .pipe(
        tap(() => this.log('fetched data')),
        catchError(this.handleError<any[]>('getUsers', []))
      );
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.url}/user`, user, this.httpOptions)
      .pipe(
        catchError(this.handleError<any[]>('addUser', []))
      );
  }

  updateUser(user: any): Observable<any> {
    return this.http.put<any>(`${this.url}/user`, user, this.httpOptions)
      .pipe(
        catchError(this.handleError<any[]>('updateUser', []))
      );
  }

  removeUser(id: number): Observable<any> {
    return this.http.delete(`${this.url}/user/${id}`, this.httpOptions)
      .pipe(
        catchError(this.handleError<any[]>('removeUser', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }
}
