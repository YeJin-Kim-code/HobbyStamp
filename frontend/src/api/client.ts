import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,

  headers: {
    "Content-Type": "application/json",
  },
});

// ========================================
// Request Interceptor
// ========================================
//
// 모든 API 요청이 서버로 가기 직전에 실행된다.
//
// localStorage에 JWT가 있으면
//
// Authorization: Bearer JWT
//
// 형태로 자동으로 붙여준다.
//
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

// ========================================
// Response Interceptor
// ========================================
//
// 서버의 응답을 받은 뒤 실행된다.
//
api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      console.error("인증이 필요합니다.");
    }

    return Promise.reject(error);
  },
);
console.log("API URL:", import.meta.env.VITE_API_URL);
export default api;