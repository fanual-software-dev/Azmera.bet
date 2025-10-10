import axios from 'axios';
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from '../utils/token';
import Router from 'next/router';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  withCredentials: true,
});

// Request interceptor: attach access token
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: refresh token on 401
let isRefreshing = false;
type FailedQueueItem = {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
};

let failedQueue: FailedQueueItem[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If access token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        clearTokens();
        Router.push('/login');
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/auth/refresh`,
          { refresh_token: refreshToken }
        );

        const { access_token, refresh_token } = response.data;
        setTokens(access_token, refresh_token);

        api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        processQueue(null, access_token);
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        clearTokens();
        Router.push('/login');
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
