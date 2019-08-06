import { Injectable } from '@angular/core';
import { Overview } from '../shared/overview';
import { OVERVIEW } from '../shared/overviews';

@Injectable({
  providedIn: 'root'
})
export class OverviewService {

  constructor() { }

  getOverviews(): Overview[] {
    return OVERVIEW;
  }

  getOverview(id: string): Overview {
    return OVERVIEW.filter((overview) => (overview.id === id))[0];
  }

  getFeaturedOverview(): Overview {
    return OVERVIEW.filter((overview) => (overview.featured))[0];
  }
}
