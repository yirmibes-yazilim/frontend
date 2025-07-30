// axiosInstance.ts
import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: "http://192.168.25.123:5102/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Access token'ı ekler
instance.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Refresh token işlemi
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise(function(resolve, reject) {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return instance(originalRequest);
        });
      }

      isRefreshing = true;
      const refreshToken = Cookies.get("refreshToken");

      try {
        const res = await axios.post("http://192.168.25.123:5102/api/Auth/refresh-token", {
          refreshToken: refreshToken,
        });

        const newAccessToken = res.data.accessToken;
        Cookies.set("accessToken", newAccessToken);

        processQueue(null, newAccessToken);

        originalRequest.headers["Authorization"] = "Bearer " + newAccessToken;
        return instance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
