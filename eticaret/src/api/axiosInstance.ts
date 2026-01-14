// axiosInstance.ts
import axios from "axios";
import type { InternalAxiosRequestConfig, AxiosError } from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: "http://192.168.25.136:5102/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Access token'ı ekler
instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = Cookies.get("accessToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Refresh token işlemi
let isRefreshing = false;

type FailedQueueItem = {
  resolve: (value?: string | PromiseLike<string | void | null> | undefined) => void;
  reject: (reason?: unknown) => void;
};

let failedQueue: FailedQueueItem[] = [];

const processQueue = (error: unknown, token?: string) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

instance.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise<string | void | null | undefined>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          if (token && originalRequest.headers) {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
          }
          return instance(originalRequest);
        });
      }

      isRefreshing = true;
      const refreshToken = Cookies.get("refreshToken");

      try {
        const res = await axios.post("http://192.168.25.136:5102/api/Auth/refresh-token", {
          refreshToken: refreshToken,
        });

        const newAccessToken: string = res.data.accessToken;
        Cookies.set("accessToken", newAccessToken);

        processQueue(null, newAccessToken);

        if (originalRequest.headers) {
          originalRequest.headers["Authorization"] = "Bearer " + newAccessToken;
        }
        return instance(originalRequest);
      } catch (err) {
        processQueue(err);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
