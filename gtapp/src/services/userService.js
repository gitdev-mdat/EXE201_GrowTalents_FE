import api from "../api/client";

// Vì baseURL = http://host:8082 => phải viết đủ "/api/..."
export const login = (data) => api.post("/api/users/login", data);
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("userId");
};

export const createUser = (payload) => api.post("/api/users", payload);
export const getUserById = (id) => api.get(`/api/users/${id}`);
export const deleteUserById = (id) => api.delete(`/api/users/${id}`);
export const updateUser = (payload) => api.put("/api/users", payload);
