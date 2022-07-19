import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GridEditService {

  emitChangeSource = new BehaviorSubject<any>([]);
  constructor() {
  }

  getChange(): Observable<[]> {
    return this.emitChangeSource.asObservable();
  }

  emitChange(change: any) {
    console.log(change);
    this.emitChangeSource.next(change);
  }
}
