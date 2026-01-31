
export const SOCIAL_LINKS = {
  TELEGRAM: 'https://t.me/jemal_fano',
  FACEBOOK: 'https://facebook.com/jemal_fano',
  YOUTUBE: 'https://youtube.com/@jemal_fano'
};

export const ADMIN_PROFILE = {
  NAME: 'Jemal Fano',
  EMAIL: 'admin@iftu.edu'
};

export enum NavSection {
  DASHBOARD = 'DASHBOARD',
  COURSES = 'COURSES',
  TEACHERS = 'TEACHERS',
  STUDENTS = 'STUDENTS',
  SCHOOLS = 'SCHOOLS',
  AI_ASSISTANT = 'AI_ASSISTANT',
  DOCUMENTATION = 'DOCUMENTATION',
  PROFILE = 'PROFILE',
  ABOUT = 'ABOUT',
  EXAMS = 'EXAMS',
  MATERIALS = 'MATERIALS',
  NEWS = 'NEWS',
  RESULTS = 'RESULTS',
  GRADEBOOK = 'GRADEBOOK',
  REPORTS = 'REPORTS'
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'Admin' | 'Teacher' | 'Student';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Teacher' | 'Student' | 'Admin';
  status: 'Active' | 'Inactive';
  joinDate: string;
  avatar: string;
  department: string;
  phone?: string;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  students: number;
  progress: number;
  category: string;
  image: string;
  description?: string;
  objectives?: string[];
  prerequisites?: string[];
  duration?: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number; 
}

export interface Exam {
  id: string;
  title: string;
  courseId: string;
  courseTitle: string;
  teacherId: string;
  date: string;
  duration: string; 
  totalQuestions: number;
  status: 'Upcoming' | 'Active' | 'Completed';
  questions?: Question[];
}

export interface ExamAttempt {
  id: string;
  examId: string;
  studentId: string;
  score: number;
  total: number;
  date: string;
  answers: Record<string, number>;
}

export interface Material {
  id: string;
  title: string;
  type: 'Note' | 'Document' | 'Video' | 'Link';
  courseTitle: string;
  uploadDate: string;
  size?: string;
  author: string;
}

export interface School {
  id: string;
  name: string;
  location: string;
  students: number;
  phone: string;
  web: string;
  type: 'Central' | 'Branch' | 'Hub' | 'Online';
}

export interface NewsPost {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  image: string;
  category: 'Update' | 'Event' | 'Institutional';
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface StudentResult {
  id: string;
  examTitle: string;
  courseTitle: string;
  score: number;
  total: number;
  grade: string;
  date: string;
  status: 'Pass' | 'Fail';
}

export interface GradeEntry {
  studentId: string;
  studentName: string;
  avatar: string;
  examResults: StudentResult[];
  overallGpa: number;
}