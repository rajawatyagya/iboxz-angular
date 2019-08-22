import { Injectable } from '@angular/core';
import { JOBS } from '../shared/jobs';
import { Job } from '../shared/job';
import { Observable, of } from 'rxjs';
import {delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor() { }

  getJobs(): Observable<Job[]> {
    return of(JOBS);
  }

  getJob(id: string): Observable<Job> {
    return of(JOBS.filter((job) => (job.id === id))[0]);
  }

  getFeaturedJob(): Observable<Job> {
    return of(JOBS.filter((job) => (job.featured))[0]);
  }
}
