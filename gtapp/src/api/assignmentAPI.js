import api from "./client";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

const assignment = {
  // Tạo assignment mới
  create: (data) =>
    api.post(API_ENDPOINTS.ASSIGNMENTS.CREATE, data),

  // Lấy assignment theo studentId và courseId
  getByStudentCourse: (studentId, courseId) =>
    api.get(API_ENDPOINTS.ASSIGNMENTS.GET_BY_STUDENT_COURSE(studentId, courseId)),

  // Lấy tất cả assignment của 1 student
  getAllByStudent: (studentId) =>
    api.get(API_ENDPOINTS.ASSIGNMENTS.GET_ALL_BY_STUDENT(studentId)),

  // Lấy assignment theo teacher
  getByTeacher: (params) =>
    api.get(API_ENDPOINTS.ASSIGNMENTS.GET_BY_TEACHER, { params }),

  // Lấy assignment theo lesson
  getByLesson: (params) =>
    api.get(API_ENDPOINTS.ASSIGNMENTS.GET_BY_LESSON, { params }),
};

export default assignment;
