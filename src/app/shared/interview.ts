import {Client} from './client';
import {Job} from './job';
import {Address} from './address';

export class Interview {
  id: number;
  client: Client[];
  job: Job[];
  name: string;
  candidates: string;
  duration: string;
  interviewLocation: Address[];
  joining: string;
  reminder: string;
}
