
export enum StudentStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  GRADUATED = 'Graduated',
  SUSPENDED = 'Suspended'
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  enrollmentDate: string;
  grade: number;
  gpa: number;
  status: StudentStatus;
  attendance: number; // percentage
  major?: string;
}

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'teacher';
  avatar: string;
}

export interface DashboardStats {
  totalStudents: number;
  averageGpa: number;
  averageAttendance: number;
  activeStudents: number;
}
