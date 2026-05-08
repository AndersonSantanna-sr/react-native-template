import axios from 'axios';

import { useAuthStore } from '@/stores/auth-store';

if (__DEV__ && !process.env.EXPO_PUBLIC_API_URL) {
  console.warn('[api] EXPO_PUBLIC_API_URL not set — copy .env.example to .env');
}

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10_000,
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // logout() swallows its own SecureStore errors via .catch(() => {})
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  },
);
