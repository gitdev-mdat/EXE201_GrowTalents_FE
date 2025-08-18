import api from "./client";
const teacherCourseApi = {
  add: (data) => api.post("/api/teachercourses", data),
};
export default teacherCourseApi;
