import axios from "axios";

const API = axios.create({
  baseURL: "https://neurosync-ai.onrender.com/api"
});

// ================= REQUEST INTERCEPTOR =================
// Automatically Send JWT Token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ================= RESPONSE INTERCEPTOR =================
// Automatically Handle Unauthorized / Expired Token
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {

    const status = error.response?.status;
    const requestURL = error.config?.url || "";

    // Do not treat Login/Register errors as session expiration
    const isAuthRequest =
      requestURL.includes("/auth/login") ||
      requestURL.includes("/auth/register");

    if (status === 401 && !isAuthRequest) {

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.replace("/login");
    }

    return Promise.reject(error);
  }
);

export default API;