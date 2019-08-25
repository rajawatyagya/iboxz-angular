import { Education } from './education';
import { Experience } from './experience';
import { Address } from '../address';

export class Profile {
  id: number;
  title: string;
  firstname: string;
  lastname: string;
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

export const Gender =             ['Male', 'Female', 'Other'];
export const NameTitle =          ['Mr.', 'Ms.', 'Mrs.', 'Dr.'];
export const HigherSecTitle =     ['Central Board of Secondary Education',
                                  'STANDARD XII / H.S.C.',
                                  'IXTH STANDARD',
                                  'Non-Matric',
                                  'SSC',
                                  'Others'];
export const DiplomaTitle =  ['Diploma',
                                  'LICENTIATE OF ELECTRONICS ENGINEERING',
                                  'Mechanical Engineering License',
                                  'Others'];
export const GradTitle =          ['BACH. OF GEN. LAW',
                                  'BACHELOR OF SCIENCE ( B.Sc Qualification )',
                                  'BACHELOR OF ARCHITECTURE',
                                  'BACHELOR OF ARTS',
                                  'BACHELOR OF BUSINESS STUDIES',
                                  'BACHELOR OF BUSINESS ADMINISTRATION',
                                  'BACHELOR OF BUSINESS MANAGEMENT',
                                  'BACHELOR OF COMMERCE',
                                  'BACHELOR OF COMPUTER APPLICATION',
                                  'Bachelor of Computer Architecture',
                                  'BACHELOR OF COMPUTER SCIENCE',
                                  'Bachelor of Education',
                                  'BACHELOR OF ENGINEERING',
                                  'BACHELOR OF FINE ARTS',
                                  'BACHELOR OF HOSPITAL MANAGEMENT',
                                  'Bachelor of Information Science',
                                  'Bach of Information Tech (BSc)',
                                  'BACHELOR OF LAW',
                                  'BACHELOR OF LIBRARY ARTS',
                                  'BACHELOR OF LIBRARY SCIENCE',
                                  'Bachelor of Management Studies',
                                  'BACHELOR OF PHARMACY',
                                  'BACHELOR OF PLANNING',
                                  'BACHELOR OF SCIENCE (B.Sc)',
                                  'BACHELOR OF SCIENCE ( B.Sc Degree )',
                                  'BACHELOR OF STATISTICS',
                                  'BACHELOR OF TECHNOLOGY',
                                  'BACHELOR OF TEXTILES',
                                  'Bachelor of Veterinary Sciences',
                                  'Bachelors in Human Resource Management',
                                  'BACHELORS IN PHYSIOTHERAPY',
                                  'BACHELORS IN SYSTEMS ENGINEERING',
                                  'Bio-chemicalEngineering',
                                  'Ceramic Engineering',
                                  'ELECT& ELETROENG',
                                  'ELECTRICAL ARTIFICER (INDIAN NAVY)',
                                  'Fashion Designing',
                                  'Grad (Technical)',
                                  'GRADUATE FROM INDIAN NAVAL ACADEMY',
                                  'Graduateship examination in Industrial Engg',
                                  'Gujarat Vidyapith',
                                  'Journalism/Mass Communication',
                                  'LLB',
                                  'Material Science & Technology',
                                  'MBBS',
                                  'Metallurgical Engineering',
                                  'Mining Engineering',
                                  'PR/Advertising',
                                  'Tourism',
                                  'UG Non Technical',
                                  'Undergraduate',
                                  'Bachelor of Bank Management',
                                  'Communication & Computer Engineering',
                                  'Others'];

export const PostGradTitle =      ['Global Management in Business Administration',
                                  'LABOUR WELFARE & INDUSTRIAL RELATIONS',
                                  'M.SC.',
                                  'M.SC-TECH',
                                  'MAST. OF SC. (ENGG.)',
                                  'MASTER IN EDUCATIONAL TECHNOLOGY-COMPUTER APPLICATION',
                                  'Master in science info system',
                                  'Master in Urban Planning',
                                  'MASTER OF ADMINISTRATIVE OFFICE MANAGEMENT',
                                  'MASTER OF ARCHITECTURE',
                                  'MASTER OF BUSINESS ADMINISTRATION',
                                  'MASTER OF BUSINESS ECONOMICS',
                                  'MASTER OF BUSINESS MANAGEMENT',
                                  'MASTER OF COMMERCE',
                                  'MASTER OF COMPUTER APPLICATION',
                                  'MASTER OF COMPUTER SCIENCE',
                                  'MASTER OF DESIGN',
                                  'MASTER OF EDUCATION',
                                  'MASTER OF ENGINEERING',
                                  'MASTER OF FINANCIAL MANAGEMENT',
                                  'Master of Information Technology',
                                  'MASTER OF INFORMATION TECHNOLOGY AND MANAGEMENT',
                                  'MASTER OF LABOUR STUDIES',
                                  'MASTER OF LIBRARY SCIENCE',
                                  'MASTER OF MANAGEMENT STUDIES',
                                  'Master of Personnel Management',
                                  'MASTER OF PHARMACY',
                                  'MASTER OF PHILOSOPHY',
                                  'MASTER OF PLANNING',
                                  'MASTER OF SCIENCE',
                                  'MASTER OF SCIENCE (APPLIED PHYSICS)',
                                  'Master of Science in Electrical Engineering',
                                  'MASTER OF SOCIAL WORK',
                                  'MASTER OF STATISTICS',
                                  'MASTER OF SYSTEM ENGINEERING',
                                  'MASTER OF TECHNOLOGY',
                                  'Masters & Bachelors in E Commerce',
                                  'MASTERS IN ARTS',
                                  'MASTERS IN COMMUNICATION & JOURNALISM',
                                  'MASTERS IN COMPUTER MANAGEMENT',
                                  'MASTERS IN CONSTRUCTION MANAGEMENT',
                                  'MASTERS IN HOSPITAL ADMINISTRATION',
                                  'Masters in Human Resource Management',
                                  'MASTER\'S in INFORMATION MANAGEMENT',
                                  'Masters in International Business',
                                  'MASTERS IN LAW',
                                  'MASTERS IN MARKETING MANAGEMENT',
                                  'Masters in Personnel Management',
                                  'Masters in Science & Technology',
                                  'MD',
                                  'MS',
                                  'Post Graduate Diploma',
                                  'P.G.DIP.(GUID.& COU)',
                                  'PG (Non Technical)',
                                  'POST GRADUATE PROGRAMME',
                                  'Pgrad (Technical)',
                                  'POST GRADUATE DIPLOMA IN MANAGEMENT',
                                  'Post Graduate Diploma in IT Management',
                                  'Master of Textiles',
                                  'Post Graduate Certificate in Business Management',
                                  'Master of Financial Services',
                                  'POSTGRADUATE DIPLOMA IN FINANCIAL STRATEGY',
                                  'Master in Business Law',
                                  'Others'];

export const OtherQualTitle =     ['AMIE',
                                  'ASSO. INST. OF ARCH.',
                                  'ASSOCIATE CHARTERED SECRETARY',
                                  'ASSOCIATE MEMBER OF ACTURIAL SOCIETY OF INDIA',
                                  'ASSOCIATE OF CHARTERED ACCOUNTANCY',
                                  'ASSOCIATESHIP',
                                  'C-Diploma in Advance Computing',
                                  'CER.ASSO.I.I.BANKERS',
                                  'CERTIFICATION',
                                  'CERTIFIED FINANCIAL ANALYST',
                                  'CERTIFIED MANAGEMENT CONSULTING',
                                  'CHARTERED ACCOUNTANCY',
                                  'COMPANY SECRETARY',
                                  'COST & WORKS ACCOUNTANT',
                                  'Ph.D',
                                  'DOEACC',
                                  'DUMMY',
                                  'ENTREPRENEURIAL DEVELOPMENT PROGRAMME',
                                  'FELLOW',
                                  'Graduate Dipl. Intl. Business',
                                  'ICWAI',
                                  'Industrial Training Institute',
                                  'PROFESSIONAL SOCIETY MEMBERSHIP',
                                  'PROFICIENCE PROGRAMME',
                                  'Others'];
