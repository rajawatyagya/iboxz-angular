import { Address } from './address';
import {Job} from './job';
import {Interview} from './interview';

export class Client {
  id: number;
  name: string;
  contact: string;
  fax: string;
  accountManager: string;
  website: string;
  industry: string;
  about: string;
  billingAddress: Address[];
  jobOpenings: Job[];
  interviews: Interview[];
}
