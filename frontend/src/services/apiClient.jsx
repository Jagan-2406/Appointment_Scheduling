import axios from "axios";

// Resolve the API base URL from the Vite environment variable.
// Falls back to the known production URL (includes the required /api prefix).
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://appointment-scheduling-backend-2q31.onrender.com/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

// Add token to outbound requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Global response handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      // 401 – token expired/invalid → redirect to login (unless already on a public page)
      if (status === 401) {
        const currentPath = window.location.pathname;
        const publicPaths = [
          "/",
          "/login",
          "/register",
          "/about",
          "/services",
          "/terms",
          "/privacy",
          "/verify-email",
        ];
        if (!publicPaths.includes(currentPath)) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }
      }

      // 403 – profile incomplete → redirect to complete‑profile page
      if (status === 403 && data?.redirectTo === "/complete-profile") {
        const currentPath = window.location.pathname;
        if (currentPath !== "/complete-profile") {
          window.location.href = "/complete-profile";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
