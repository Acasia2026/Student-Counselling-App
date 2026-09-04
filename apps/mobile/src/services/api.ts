import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import Constants from 'expo-constants';
import { storage } from './storage';
import { STORAGE_KEYS } from '../utils/constants';

const API_BASE_URL = 
  Constants.expoConfig?.extra?.apiUrl || 
  process.env.EXPO_PUBLIC_API_URL || 
  'http://localhost:3000/api';

class APIClient {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to attach JWT Token
    this.api.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        try {
          const token = await storage.getItem(STORAGE_KEYS.AUTH_TOKEN);
          if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (error) {
          console.error('Error attaching auth token to request:', error);
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor to handle unauthenticated 401s
    this.api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (error.response?.status === 401) {
          try {
            await storage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
            await storage.removeItem(STORAGE_KEYS.USER_DATA);
          } catch (storageError) {
            console.error('Error clearing storage on 401:', storageError);
          }
        }
        return Promise.reject(error);
      }
    );
  }

  get = <T = any>(url: string, params?: any) => this.api.get<T>(url, { params });
  post = <T = any>(url: string, data?: any) => this.api.post<T>(url, data);
  put = <T = any>(url: string, data?: any) => this.api.put<T>(url, data);
  patch = <T = any>(url: string, data?: any) => this.api.patch<T>(url, data);
  delete = <T = any>(url: string) => this.api.delete<T>(url);
}

export const apiClient = new APIClient();
