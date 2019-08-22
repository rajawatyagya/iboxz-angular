import { Injectable } from '@angular/core';
import { Overview } from '../shared/overview';
import { OVERVIEW } from '../shared/overviews';
import { Observable, of } from 'rxjs';
import {delay} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class OverviewService {

  constructor() { }

  getOverviews(): Observable<Overview[]> {
    return of(OVERVIEW);
  }

  getOverview(id: string): Observable<Overview> {
    return of(OVERVIEW.filter((overview) => (overview.id === id))[0]);
  }

  getFeaturedOverview(): Observable<Overview> {
    return of(OVERVIEW.filter((overview) => (overview.featured))[0]);
  }
}
