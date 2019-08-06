import { Injectable } from '@angular/core';
import { JOBS } from '../shared/jobs';
import { Job } from '../shared/job';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor() { }

  getJobs(): Job[] {
    return JOBS;
  }

  getJob(id: string): Job {
    return JOBS.filter((job) => (job.id === id))[0];
  }

  getFeaturedJob(): Job {
    return JOBS.filter((job) => (job.featured))[0];
  }
}
