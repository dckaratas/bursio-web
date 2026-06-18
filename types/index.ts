export type Role = "STUDENT" | "DONOR" | "ADMIN";
export type AccountStatus = "PENDING_VERIFICATION" | "ACTIVE" | "SUSPENDED";
export type MatchStatus = "PENDING" | "ACCEPTED" | "DECLINED" | "EXPIRED";
export type ContactPreference = "EMAIL" | "PHONE";
export type ReportReason = "FAKE_PROFILE" | "HARASSMENT" | "SPAM" | "OTHER";
export type ReportStatus = "OPEN" | "REVIEWED" | "RESOLVED";

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  status: AccountStatus;
  emailVerified: boolean;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  email: string;
  role: Role;
}

export interface StudentProfile {
  id: number;
  firstName: string;
  lastName: string;
  universityId: number;  
  universityName: string;
  city: string;
  department: string;
  grade: number;
  gpa: number;
  bio: string;
  motivation: string;
  contactPreference: ContactPreference;
  contactValue: string | null;
  profileComplete: boolean;
}

export interface MatchResponse {
  id: number;
  donorFirstName: string;
  donorLastName: string;
  donorEmail: string;
  studentFirstName: string;
  studentLastName: string;
  studentEmail: string;
  contactPreference: string | null;
  contactValue: string | null;
  status: MatchStatus;
  donorMessage: string | null;
  respondedAt: string | null; 
  expiresAt: string;
  createdAt: string;
  donorId: number;
  studentId: number;
}

export interface University {
  id: number;
  name: string;
  city: string;
  emailDomains: string[];
  active: boolean;
}

export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface MessageResponse {
  message: string;
}

export interface ErrorResponse {
  code: string;
  message: string;
  timestamp: string;
}