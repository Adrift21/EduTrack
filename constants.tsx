
import { Student, StudentStatus } from './types';

export const MOCK_STUDENTS: Student[] = [
  {
    id: '1',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.j@example.edu',
    dateOfBirth: '2005-05-15',
    enrollmentDate: '2023-09-01',
    grade: 10,
    gpa: 3.8,
    status: StudentStatus.ACTIVE,
    attendance: 95,
    major: 'Computer Science'
  },
  {
    id: '2',
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'bob.smith@example.edu',
    dateOfBirth: '2004-11-22',
    enrollmentDate: '2022-09-01',
    grade: 11,
    gpa: 3.2,
    status: StudentStatus.ACTIVE,
    attendance: 88,
    major: 'Mathematics'
  },
  {
    id: '3',
    firstName: 'Charlie',
    lastName: 'Davis',
    email: 'charlie.d@example.edu',
    dateOfBirth: '2006-02-10',
    enrollmentDate: '2024-01-15',
    grade: 9,
    gpa: 3.9,
    status: StudentStatus.ACTIVE,
    attendance: 98,
    major: 'Physics'
  },
  {
    id: '4',
    firstName: 'Diana',
    lastName: 'Prince',
    email: 'diana.p@example.edu',
    dateOfBirth: '2005-08-30',
    enrollmentDate: '2023-09-01',
    grade: 10,
    gpa: 3.5,
    status: StudentStatus.ACTIVE,
    attendance: 92,
    major: 'History'
  },
  {
    id: '5',
    firstName: 'Edward',
    lastName: 'Norton',
    email: 'ed.norton@example.edu',
    dateOfBirth: '2004-03-12',
    enrollmentDate: '2022-09-01',
    grade: 11,
    gpa: 2.8,
    status: StudentStatus.INACTIVE,
    attendance: 75,
    major: 'Arts'
  },
  {
    id: '6',
    firstName: 'Fiona',
    lastName: 'Gallagher',
    email: 'fiona.g@example.edu',
    dateOfBirth: '2003-12-05',
    enrollmentDate: '2021-09-01',
    grade: 12,
    gpa: 3.7,
    status: StudentStatus.GRADUATED,
    attendance: 94,
    major: 'Biology'
  }
];

export const APP_THEME = {
  primary: '#4f46e5', // indigo-600
  secondary: '#64748b', // slate-500
  accent: '#10b981', // emerald-500
};
