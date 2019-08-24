import {Address} from './address';
import {Client} from './client';
import {Interview} from './interview';

export class Job {
  id: number;
  client: Client[];
  postingTitle: string;
  minSalary: number;
  maxSalary: number;
  workExp: string;
  featured: boolean;
  targetDate: string;
  expectedRevenue: number;
  address: Address[];
  hiringCompany: string;
  department: string;
  jobType: string;
  scope: string;
  functionalArea: string;
  role: string;
  skillSet: string;
  hike: string;
  benefits: string;
  ageLimit: string;
  qualification: string;
  description: string;
  positions: number;
  referralAmount: number;
  referralBonus: number;
  interviews: Interview[];
}
