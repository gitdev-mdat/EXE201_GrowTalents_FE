import api from "./client";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

const course = {
  addCourse: (payload) => api.post(API_ENDPOINTS.COURSES.CREATE, payload),
  getCourses: (params) => api.get(API_ENDPOINTS.COURSES.GET_ALL, { params }),
  getCourseById: (id) => api.get(API_ENDPOINTS.COURSES.GET_BY_ID(id)),
  updateCourse: (id, payload) => api.put(API_ENDPOINTS.COURSES.UPDATE(id), payload),
  deleteCourse: (id) => api.delete(API_ENDPOINTS.COURSES.DELETE(id)),
};

export default course;
