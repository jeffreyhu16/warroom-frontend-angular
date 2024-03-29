import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';
import { ROLE_SAMPLE, ALL_ROLES } from '../model/role-data';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  url: string = environment.apiDomain + '/Role';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getRoleGridData(): Observable<any[]> {
    const roleGridData = of(ROLE_SAMPLE);
    return roleGridData;
  }

  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/GetAll`)
      .pipe(
        tap(() => this.log('fetched data')),
        catchError(this.handleError<any[]>('getRoles', []))
      );
  }

  getAllRoles(): Observable<any[]> {
    const allRoles = of(ALL_ROLES);
    return allRoles;
  }

  addRole(form: any): Observable<any> {
    return this.http.post<any>(`${this.url}/Create`, form, this.httpOptions)
      .pipe(
        catchError(this.handleError<any[]>('addRole', []))
      );
  }

  addDashboard(roleId: number, dashboardId: number): Observable<any> {
    return this.http.post<any>(`${this.url}/AddDashboard/${roleId}?dashboard_id=${dashboardId}`, this.httpOptions)
      .pipe(
        catchError(this.handleError<any[]>('addDashboard', []))
      );
  }

  updateRole(id: number, form: any): Observable<any> {
    return this.http.put<any>(`${this.url}/Update/${id}`, form, this.httpOptions)
      .pipe(
        catchError(this.handleError<any[]>('updateRole', []))
      );
  }

  updateDashboard(id: number, form: any): Observable<any> {
    return this.http.put<any>(`${this.url}/UpdateDashboard/${id}`, form, this.httpOptions)
      .pipe(
        catchError(this.handleError<any[]>('updateDashboard', []))
      );
  }

  removeDashboard(menuId: number, dashboardId: number): Observable<any> {
    return this.http.delete(`${this.url}/DeleteDashboard/${menuId}?dashboard_id=${dashboardId}`, this.httpOptions)
      .pipe(
        catchError(this.handleError<any[]>('removeDashboard', []))
      );
  }

  removeRole(roleId: number): Observable<any> {
    return this.http.delete(`${this.url}/Delete/${roleId}`, this.httpOptions)
      .pipe(
        catchError(this.handleError<any[]>('removeRole', []))
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
    this.messageService.add(`RoleService: ${message}`);
  }
}
