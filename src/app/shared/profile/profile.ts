import { Education } from './education';
import { Experience } from './experience';
import { Address } from './address';

export class Profile {
  id: string;
  name: string;
  image: string;
  designation: string;
  description: string;
  gender: string;
  education: Education[];
  experience: Experience[];
  email: string;
  mobile: string;
  dob: string;
  source: string;
  currentSalary: string;
  expectedSalary: string;
  address: Address[];
  resume: string;
  facebook: string;
  twitter: string;
  linkedin: string;
}
