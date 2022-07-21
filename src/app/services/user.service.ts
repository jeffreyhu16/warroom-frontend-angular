import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';
import { USER_SAMPLE } from 'src/app/model/user-data';

@Injectable({
  providedIn: 'root'
})
export class UserService {

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

  getGridData(): Observable<any[]> {
    return this.http.get<any[]>('http://172.17.48.130:8080/v1/influx/')
      .pipe(
        tap(() => this.log('fetched data')),
        catchError(this.handleError<any[]>('getGridData', []))
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
