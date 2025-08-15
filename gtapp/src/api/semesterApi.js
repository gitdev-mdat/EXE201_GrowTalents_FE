import api from "./client";
const semesterApi = {
  getAll: () => api.get("/api/semesters"),
  getByYear: (year) => api.get(`/api/semesters/year/${year}`),
  create: (data) => api.post("/api/semesters", data),
};
export default semesterApi;
