import { Teacher, Student, Class, Announcement, Assignment, Notification, Grade } from './types';

export const mockTeachers: Teacher[] = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah.j@school.edu', subject: 'Mathematics', classes: ['Grade 10A', 'Grade 10B'], avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
  { id: '2', name: 'Michael Chen', email: 'michael.c@school.edu', subject: 'Physics', classes: ['Grade 11A', 'Grade 12A'], avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael' },
  { id: '3', name: 'Emily Davis', email: 'emily.d@school.edu', subject: 'English', classes: ['Grade 9A', 'Grade 10A'], avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily' },
  { id: '4', name: 'David Wilson', email: 'david.w@school.edu', subject: 'Chemistry', classes: ['Grade 11A', 'Grade 11B'], avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David' },
  { id: '5', name: 'Lisa Anderson', email: 'lisa.a@school.edu', subject: 'Biology', classes: ['Grade 10A', 'Grade 12A'], avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa' },
];

export const mockStudents: Student[] = [
  { id: '1', name: 'Alex Martinez', email: 'alex.m@student.edu', grade: 'Grade 10', class: 'Grade 10A', attendance: 92, gpa: 3.8, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
  { id: '2', name: 'Emma Thompson', email: 'emma.t@student.edu', grade: 'Grade 10', class: 'Grade 10A', attendance: 95, gpa: 3.9, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma' },
  { id: '3', name: 'James Brown', email: 'james.b@student.edu', grade: 'Grade 11', class: 'Grade 11A', attendance: 88, gpa: 3.6, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James' },
  { id: '4', name: 'Olivia Garcia', email: 'olivia.g@student.edu', grade: 'Grade 11', class: 'Grade 11A', attendance: 97, gpa: 4.0, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia' },
  { id: '5', name: 'Noah Taylor', email: 'noah.t@student.edu', grade: 'Grade 12', class: 'Grade 12A', attendance: 90, gpa: 3.7, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Noah' },
  { id: '6', name: 'Sophia Lee', email: 'sophia.l@student.edu', grade: 'Grade 9', class: 'Grade 9A', attendance: 93, gpa: 3.85, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia' },
  { id: '7', name: 'Liam White', email: 'liam.w@student.edu', grade: 'Grade 10', class: 'Grade 10B', attendance: 85, gpa: 3.4, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Liam' },
  { id: '8', name: 'Ava Harris', email: 'ava.h@student.edu', grade: 'Grade 11', class: 'Grade 11B', attendance: 94, gpa: 3.75, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ava' },
];

export const mockClasses: Class[] = [
  { id: '1', name: 'Grade 9A', subject: 'English', teacher: 'Emily Davis', students: 28 },
  { id: '2', name: 'Grade 10A', subject: 'Mathematics', teacher: 'Sarah Johnson', students: 30 },
  { id: '3', name: 'Grade 10B', subject: 'Mathematics', teacher: 'Sarah Johnson', students: 25 },
  { id: '4', name: 'Grade 11A', subject: 'Physics', teacher: 'Michael Chen', students: 27 },
  { id: '5', name: 'Grade 11B', subject: 'Chemistry', teacher: 'David Wilson', students: 26 },
  { id: '6', name: 'Grade 12A', subject: 'Biology', teacher: 'Lisa Anderson', students: 24 },
];

export const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Parent-Teacher Conference',
    content: 'Annual parent-teacher meetings scheduled for next week. Please check your email for appointment times.',
    author: 'Principal Johnson',
    role: 'principal',
    date: '2025-11-10',
    target: ['teacher', 'student']
  },
  {
    id: '2',
    title: 'Mid-term Exams Schedule',
    content: 'Mid-term examinations will begin from November 20th. Students are advised to prepare accordingly.',
    author: 'Principal Johnson',
    role: 'principal',
    date: '2025-11-08',
    target: ['teacher', 'student']
  },
  {
    id: '3',
    title: 'Science Fair 2025',
    content: 'Annual Science Fair will be held on December 15th. All students are encouraged to participate.',
    author: 'Sarah Johnson',
    role: 'teacher',
    date: '2025-11-09',
    target: ['student']
  },
  {
    id: '4',
    title: 'Winter Break Notice',
    content: 'School will be closed from December 23rd to January 2nd for winter break.',
    author: 'Principal Johnson',
    role: 'principal',
    date: '2025-11-07',
    target: ['teacher', 'student']
  },
];

export const mockAssignments: Assignment[] = [
  { id: '1', title: 'Algebra Problem Set 5', subject: 'Mathematics', dueDate: '2025-11-15', status: 'pending', class: 'Grade 10A' },
  { id: '2', title: 'Physics Lab Report', subject: 'Physics', dueDate: '2025-11-18', status: 'submitted', class: 'Grade 11A' },
  { id: '3', title: 'Essay on Shakespeare', subject: 'English', dueDate: '2025-11-20', status: 'graded', grade: 92, class: 'Grade 10A' },
  { id: '4', title: 'Chemistry Experiment', subject: 'Chemistry', dueDate: '2025-11-22', status: 'pending', class: 'Grade 11B' },
  { id: '5', title: 'Cell Biology Project', subject: 'Biology', dueDate: '2025-11-25', status: 'pending', class: 'Grade 12A' },
];

export const mockNotifications: Notification[] = [
  { id: '1', title: 'New Assignment Posted', message: 'Algebra Problem Set 5 has been posted', time: '2 hours ago', read: false, type: 'info' },
  { id: '2', title: 'Grade Updated', message: 'Your essay grade has been posted', time: '5 hours ago', read: false, type: 'success' },
  { id: '3', title: 'Attendance Alert', message: 'Your attendance is below 90%', time: '1 day ago', read: true, type: 'warning' },
  { id: '4', title: 'Upcoming Exam', message: 'Mid-term exam in 8 days', time: '2 days ago', read: true, type: 'info' },
];

export const mockGrades: Grade[] = [
  { id: '1', studentId: '1', studentName: 'Alex Martinez', subject: 'Mathematics', score: 85, maxScore: 100, date: '2025-11-05' },
  { id: '2', studentId: '1', studentName: 'Alex Martinez', subject: 'English', score: 92, maxScore: 100, date: '2025-11-06' },
  { id: '3', studentId: '2', studentName: 'Emma Thompson', subject: 'Mathematics', score: 95, maxScore: 100, date: '2025-11-05' },
  { id: '4', studentId: '2', studentName: 'Emma Thompson', subject: 'English', score: 88, maxScore: 100, date: '2025-11-06' },
  { id: '5', studentId: '3', studentName: 'James Brown', subject: 'Physics', score: 78, maxScore: 100, date: '2025-11-07' },
  { id: '6', studentId: '4', studentName: 'Olivia Garcia', subject: 'Physics', score: 98, maxScore: 100, date: '2025-11-07' },
];

export const attendanceData = [
  { month: 'Jan', attendance: 92 },
  { month: 'Feb', attendance: 88 },
  { month: 'Mar', attendance: 95 },
  { month: 'Apr', attendance: 90 },
  { month: 'May', attendance: 93 },
  { month: 'Jun', attendance: 91 },
];

export const gradeDistributionData = [
  { grade: 'A', students: 45 },
  { grade: 'B', students: 68 },
  { grade: 'C', students: 35 },
  { grade: 'D', students: 12 },
  { grade: 'F', students: 5 },
];

export const performanceData = [
  { subject: 'Math', score: 85 },
  { subject: 'Physics', score: 78 },
  { subject: 'Chemistry', score: 88 },
  { subject: 'Biology', score: 92 },
  { subject: 'English', score: 90 },
];
