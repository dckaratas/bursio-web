export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  VERIFY_EMAIL: "/verify-email",
  STUDENT: {
    PROFILE: "/student/profile",
    MATCHES: "/student/matches",
  },
  DONOR: {
    MATCHES: "/donor/matches",
    FIND: "/donor/find",
  },
  ADMIN: {
    DASHBOARD: "/admin",
    USERS: "/admin/users",
    REPORTS: "/admin/reports",
    UNIVERSITIES: "/admin/universities",
  },
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    VERIFY_EMAIL: "/api/auth/verify-email",
  },
  STUDENT: {
    PROFILE: "/api/student/profile",
  },
  MATCHES: {
    RANDOM: "/api/matches/random",
    RESPOND: (id: number) => `/api/matches/${id}/respond`,
    DONOR: "/api/matches/donor",
    STUDENT: "/api/matches/student",
  },
  ADMIN: {
    USERS: "/api/admin/users",
    USER_STATUS: (id: number) => `/api/admin/users/${id}/status`,
    REPORTS: "/api/admin/reports",
    REPORT_STATUS: (id: number) => `/api/admin/reports/${id}/status`,
    UNIVERSITIES: "/api/admin/universities",
    UNIVERSITY_DOMAIN: (id: number) => `/api/admin/universities/${id}/domains`,
    UNIVERSITY_TOGGLE: (id: number) => `/api/admin/universities/${id}/toggle`,
  },
} as const;