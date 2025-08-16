import api from "./client";

const course = {
  addCourse: (payload) => api.post("/api/courses", payload),
  getCourses: (params) => api.get("/api/courses", { params }),
  updateCourse: (id, payload) => api.put(`/api/courses/${id}`, payload),
  deleteCourse: (id) => api.delete(`/api/courses/${id}`),
};

export default course;
