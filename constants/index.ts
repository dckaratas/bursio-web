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
  SETTINGS: "/settings",
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
    MAINTENANCE: "/api/admin/maintenance",
  },
  PUBLIC: {
    STATUS: "/api/public/status",
  },
  UNIVERSITIES: "/api/universities",
  REPORTS: "/api/reports", 
} as const;

export const DEPARTMENT_CATEGORIES = [
  { value: "MUHENDISLIK_TEKNOLOJI", label: "Mühendislik ve Teknoloji" },
  { value: "TIP_SAGLIK", label: "Tıp ve Sağlık Bilimleri" },
  { value: "HUKUK", label: "Hukuk" },
  { value: "IKTISADI_IDARI", label: "İktisadi ve İdari Bilimler" },
  { value: "EGITIM", label: "Eğitim" },
  { value: "FEN_BILIMLERI", label: "Fen Bilimleri" },
  { value: "SOSYAL_BEŞERI", label: "Sosyal Bilimler ve Beşeri Bilimler" },
  { value: "GUZEL_SANATLAR_TASARIM", label: "Güzel Sanatlar ve Tasarım" },
  { value: "MIMARLIK_SEHIR_PLANLAMA", label: "Mimarlık ve Şehir Planlama" },
  { value: "ILETISIM", label: "İletişim" },
  { value: "ZIRAAT_ORMAN", label: "Ziraat ve Orman" },
  { value: "DIS_HEKIMLIGI_ECZACILIK", label: "Diş Hekimliği ve Eczacılık" },
  { value: "SPOR_BILIMLERI", label: "Spor Bilimleri" },
  { value: "TURIZM_OTELCILIK", label: "Turizm ve Otelcilik" },
  { value: "ILAHIYAT", label: "İlahiyat" },
  { value: "DIGER", label: "Diğer" },
] as const;

export const GRADE_OPTIONS = [
  { value: "0", label: "Hazırlık" },
  { value: "1", label: "1. Sınıf" },
  { value: "2", label: "2. Sınıf" },
  { value: "3", label: "3. Sınıf" },
  { value: "4", label: "4. Sınıf" },
  { value: "5", label: "5. Sınıf" },
  { value: "6", label: "6. Sınıf" },
  { value: "7", label: "Yüksek Lisans" },
] as const;