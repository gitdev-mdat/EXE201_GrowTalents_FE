// API Endpoints Constants
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: "/api/auth/login",
    LOGOUT: "/api/auth/logout",
    REGISTER: "/api/auth/register",
    REFRESH_TOKEN: "/api/auth/refresh",
    PROFILE: "/api/auth/profile",
  },

  // Courses
  COURSES: {
    BASE: "/api/courses",
    GET_ALL: "/api/courses",
    GET_BY_ID: (id) => `/api/courses/${id}`,
    CREATE: "/api/courses",
    UPDATE: (id) => `/api/courses/${id}`,
    DELETE: (id) => `/api/courses/${id}`,
  },

  // Attendance
  ATTENDANCE: {
    BASE: "/api/attendance",
    TEACHER_CLASSES: (teacherId) =>
      `/api/attendance/teacher/${teacherId}/classes`,
    CREATE: "/api/attendance/create",
    UPDATE: (id) => `/api/attendance/${id}`,
    DELETE: (id) => `/api/attendance/${id}`,
    HISTORY: (teacherId) => `/api/attendance/history/${teacherId}`,
    BY_SESSION: (sessionId) => `/api/attendance/session/${sessionId}`,
    BY_COURSE: (courseId) => `/api/attendance/course/${courseId}`,
    STATS: (teacherId) => `/api/attendance/stats/${teacherId}`,
    REPORT: "/api/attendance/report",
  },

  // Classes
  CLASSES: {
    BASE: "/api/classes",
    GET_STUDENTS: (classId) => `/api/classes/${classId}/students`,
    GET_BY_TEACHER: (teacherId) => `/api/classes/teacher/${teacherId}`,
  },

  // Students
  STUDENTS: {
    BASE: "/api/students",
    GET_ALL: "/api/students",
    GET_BY_ID: (id) => `/api/students/${id}`,
    CREATE: "/api/students",
    UPDATE: (id) => `/api/students/${id}`,
    DELETE: (id) => `/api/students/${id}`,
    GET_BY_CLASS: (classId) => `/api/students/class/${classId}`,
  },

  // Teachers
  TEACHERS: {
    BASE: "/api/teachers",
    GET_ALL: "/api/teachers",
    GET_BY_ID: (id) => `/api/teachers/${id}`,
    CREATE: "/api/teachers",
    UPDATE: (id) => `/api/teachers/${id}`,
    DELETE: (id) => `/api/teachers/${id}`,
  },

  // Assignments
  ASSIGNMENTS: {
    BASE: "/api/assignments",
    CREATE: "/api/assignments",
    GET_BY_STUDENT_COURSE: (studentId, courseId) =>
      `/api/assignments/students/${studentId}/courses/${courseId}`,
    GET_ALL_BY_STUDENT: (studentId) =>
      `/api/assignments/students/${studentId}/all`,
    GET_BY_TEACHER: "/api/assignments/by-teacher",
    GET_BY_LESSON: "/api/assignments/by-lesson",
  },

  // Semesters
  SEMESTERS: {
    BASE: "/api/semesters",
    GET_ALL: "/api/semesters",
    GET_BY_ID: (id) => `/api/semesters/${id}`,
    CREATE: "/api/semesters",
    UPDATE: (id) => `/api/semesters/${id}`,
    DELETE: (id) => `/api/semesters/${id}`,
    GET_CURRENT: "/api/semesters/current",
  },

  // Years
  YEARS: {
    BASE: "/api/years",
    GET_ALL: "/api/years",
    GET_BY_ID: (id) => `/api/years/${id}`,
    CREATE: "/api/years",
    UPDATE: (id) => `/api/years/${id}`,
    DELETE: (id) => `/api/years/${id}`,
    GET_CURRENT: "/api/years/current",
  },

  // Reports
  REPORTS: {
    BASE: "/api/reports",
    ATTENDANCE: "/api/reports/attendance",
    PERFORMANCE: "/api/reports/performance",
    FINANCIAL: "/api/reports/financial",
  },
};

// API Status Codes
export const API_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

// Request Types
export const REQUEST_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};
