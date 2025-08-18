import api from "./client";
const teacherApi = {
  getAllTeacher: () => api.get("/api/teachers/simple"),
};
export default teacherApi;
