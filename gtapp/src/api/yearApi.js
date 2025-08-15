import api from "./client";
const yearApi = {
  getAll: () => api.get("/api/years"),
  create: (data) => api.post("/api/years", data),
};
export default yearApi;
