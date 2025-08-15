// src/api/client.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // hoặc process.env.REACT_APP_API_URL nếu dùng CRA
  headers: {
    "Content-Type": "application/json",
  },
});

//  COMMENT phần interceptor này vìchưa dùng token
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('accessToken');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default api;
