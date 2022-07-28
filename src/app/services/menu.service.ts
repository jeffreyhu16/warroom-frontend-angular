import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MENU_SAMPLE } from '../model/menu-data';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  url: string = environment.apiDomain + '/Menu';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getMenus(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/GetAll`)
      .pipe(
        tap(() => this.log('fetched data')),
        catchError(this.handleError<any[]>('getGridData', []))
      );
  }

  getAllMenus(): Observable<any[]> {
    return of(MENU_SAMPLE);
  }

  getMenu(id: number): Observable<any> {
    const menu = MENU_SAMPLE.filter(item => item.menu_id === id);
    console.log('id: ', id, 'menu: ', menu)
    return of(menu[0]);
  }

  getMenuById(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/${id}`)
      .pipe(
        tap(() => this.log('fetched data')),
        catchError(this.handleError<any[]>('getMenuById', []))
      );
  }

  addMenu(form: any): Observable<any> {
    return this.http.post<any>(`${this.url}/Create`, form, this.httpOptions)
      .pipe(
        catchError(this.handleError<any[]>('addMenu', []))
      );
  }

  addDashboard(id: number, form: any): Observable<any> {
    return this.http.post<any>(`${this.url}/AddDashboard/${id}`, form, this.httpOptions)
      .pipe(
        catchError(this.handleError<any[]>('addDashboard', []))
      );
  }

  updateMenu(id: number, form: any): Observable<any> {
    return this.http.put<any>(`${this.url}/Update/${id}`, form, this.httpOptions)
      .pipe(
        catchError(this.handleError<any[]>('updateMenu', []))
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

  removeMenu(menuId: number): Observable<any> {
    return this.http.delete(`${this.url}/Delete/${menuId}`, this.httpOptions)
      .pipe(
        catchError(this.handleError<any[]>('removeDashboard', []))
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
    this.messageService.add(`MenuService: ${message}`);
  }
}
