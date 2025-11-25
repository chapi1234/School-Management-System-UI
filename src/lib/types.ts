export type Role = 'principal' | 'teacher' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  subject: string;
  classes: string[];
  avatar?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  grade: string;
  class: string;
  avatar?: string;
  attendance?: number;
  gpa?: number;
}

export interface Class {
  id: string;
  name: string;
  subject: string;
  teacher: string;
  students: number;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  role: Role;
  date: string;
  target: Role[];
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: number;
  class: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

export interface Grade {
  id: string;
  studentId: string;
  studentName: string;
  subject: string;
  score: number;
  maxScore: number;
  date: string;
}
