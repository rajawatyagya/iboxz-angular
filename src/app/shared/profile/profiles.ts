import { Profile } from './profile';

export const PROFILES: Profile[] = [
  {
    id: '1',
    firstname: 'Sumegha',
    lastname: 'Thakur',
    image: '/assets/images/sumegha.jpg',
    designation: 'Associate / Sr. Associate',
    mobile: '(989) 933-7908',
    email: 'thakursumegha@gmail.com',
    currentSalary: '0',
    expectedSalary: '0',
    source: 'iboxz',
    dob: '28/10/1992',
    resume: '/assets/resumes/sumegha.docx',
    description: 'TC- Technical Support',
    education: [{
      degree: 'Bachelor of Technology',
      department: 'Computer Science',
      duration: 'Aug-2010 To Jun-2014',
      institute: ''
    },
      {
        degree: 'Intermediate',
        department: 'Science',
        duration: 'Apr-2009 To May-2010',
        institute: 'St. Xavier\'s School'
      },
      {
        degree: 'High School',
        department: 'Science',
        duration: 'Apr-2007 To May-2008',
        institute: 'St. Xavier\'s School'
      }],
    experience: [{
      company: 'Teleperformance',
      current: true,
      duration: 'Mar-2017 To Till now',
      skillSet: '',
      summary: 'TC- Technical Support',
      title: 'Associate / Sr. Associate'
    }],
    gender: 'female',
    address: [{
      street: '',
      city: 'Delhi',
      country: 'India',
      state: 'Delhi',
      zipcode: 110017
    }],
    facebook: 'https://www.facebook.com/sumegha',
    twitter: 'https://twitter.com/sumegha',
    linkedin: 'https://www.linkedin.com/in/sumegha/'
  },
];
