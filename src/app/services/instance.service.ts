import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';
import { ALL_INSTANCES, INSTANCE_SAMPLE } from '../model/instance-data';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstanceService {

  url: string = environment.apiDomain + '/Instance';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getInstanceGridData(): Observable<any[]> {
    const instanceGridData = of(INSTANCE_SAMPLE);
    return instanceGridData;
  }

  getInstances(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/GetAll`)
      .pipe(
        tap(() => this.log('fetched data')),
        catchError(this.handleError<any[]>('getInstances', []))
      );
  }

  getInstance(id: number): Observable<any> {
    const instance = ALL_INSTANCES.filter(item => item.instance_id === id);
    return of(instance[0]);
  }

  getInstanceById(id: number): Observable<any> {
    return this.http.get<any[]>(`${this.url}/${id}`)
      .pipe(
        tap(() => this.log('fetched data')),
        catchError(this.handleError<any[]>('getInstanceById', []))
      );
  }

  getDashboards(id: number): Observable<any> {
    return this.http.get<any[]>(`${this.url}/GetDashboards/${id}`)
      .pipe(
        tap(() => this.log('fetched data')),
        catchError(this.handleError<any[]>('getDashboards', []))
      );
  } 

  getAllInstances(): Observable<any[]> {
    const allRoles = of(ALL_INSTANCES);
    return allRoles;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`InstanceService: ${message}`);
  }
}
