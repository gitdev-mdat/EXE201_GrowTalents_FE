import api from "./client";

const course = {
  addCourse: (payload) => api.post("/api/courses", payload),
  getCourses: (params) => api.get("/api/courses", { params }),
};

export default course;
