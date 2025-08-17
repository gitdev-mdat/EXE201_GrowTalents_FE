// src/api/client.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // hoặc process.env.REACT_APP_API_URL nếu dùng CRA
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor - Add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request for debugging
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('🔥 Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => {
    // Log successful response
    console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`);
    return response;
  },
  (error) => {
    // Handle different error types
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      console.error(`❌ API Error ${status}:`, data?.message || error.message);
      
      // Handle specific status codes
      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('accessToken');
          localStorage.removeItem('token');
          // You might want to redirect to login page here
          break;
        case 403:
          console.error('🚫 Access forbidden');
          break;
        case 404:
          console.error('🔍 Resource not found');
          break;
        case 500:
          console.error('🔥 Server error');
          break;
      }
    } else if (error.request) {
      // Network error
      console.error('🌐 Network Error:', error.message);
    } else {
      // Other error
      console.error('🔥 Unknown Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;
