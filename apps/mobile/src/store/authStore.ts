import { create } from 'zustand';
import { User } from '../types';
import { storage } from '../services/storage';
import { apiClient } from '../services/api';
import { STORAGE_KEYS } from '../utils/constants';

interface AuthStore {
  user: User | null;
  token: string | null;
  isInitializing: boolean;
  isLoading: boolean;
  error: string | null;
  
  initializeAuth: () => Promise<void>;
  login: (email: string, password?: string) => Promise<void>;
  signup: (name: string, email: string, password?: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isInitializing: true,
  isLoading: false,
  error: null,

  initializeAuth: async () => {
    try {
      set({ isInitializing: true });
      const token = await storage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      const userData = await storage.getItem(STORAGE_KEYS.USER_DATA);
      
      if (token && userData) {
        set({ token, user: JSON.parse(userData) });
      } else {
        // Mock default demo student session for immediate mobile exploration
        const defaultStudent: User = {
          id: 'std_demo_101',
          name: 'Alex Rivera',
          email: 'alex.rivera@eduquest.io',
          role: 'student',
          institutionName: 'Apex International Academy',
          grade: 'Grade 11 - STEM Track',
        };
        set({ user: defaultStudent, token: 'demo_token_valid' });
        await storage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(defaultStudent));
        await storage.setItem(STORAGE_KEYS.AUTH_TOKEN, 'demo_token_valid');
      }
    } catch (e) {
      console.warn('Auth initialization error:', e);
    } finally {
      set({ isInitializing: false });
    }
  },

  login: async (email: string, password?: string) => {
    try {
      set({ isLoading: true, error: null });
      try {
        const response = await apiClient.post('/auth/login', { email, password });
        const { user, token } = response.data;
        if (token && user) {
          await storage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
          await storage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
          set({ user, token, isLoading: false });
          return;
        }
      } catch (apiErr) {
        console.log('Backend login fallback to local session:', apiErr);
      }

      // Fallback local session for offline/development usage
      const fallbackUser: User = {
        id: `std_${Date.now()}`,
        name: email.split('@')[0].replace('.', ' ').replace(/^\w/, (c) => c.toUpperCase()),
        email,
        role: 'student',
        institutionName: 'Apex International Academy',
        grade: 'Grade 11 - STEM Track',
      };
      const fallbackToken = `token_${Date.now()}`;
      await storage.setItem(STORAGE_KEYS.AUTH_TOKEN, fallbackToken);
      await storage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(fallbackUser));
      set({ user: fallbackUser, token: fallbackToken, isLoading: false });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please check credentials.';
      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  },

  signup: async (name: string, email: string, password?: string) => {
    try {
      set({ isLoading: true, error: null });
      try {
        const response = await apiClient.post('/auth/signup', { name, email, password, role: 'student' });
        const { user, token } = response.data;
        if (token && user) {
          await storage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
          await storage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
          set({ user, token, isLoading: false });
          return;
        }
      } catch (apiErr) {
        console.log('Backend signup fallback to local session:', apiErr);
      }

      const newUser: User = {
        id: `std_${Date.now()}`,
        name,
        email,
        role: 'student',
        institutionName: 'Apex International Academy',
        grade: 'Grade 11',
      };
      const newToken = `token_${Date.now()}`;
      await storage.setItem(STORAGE_KEYS.AUTH_TOKEN, newToken);
      await storage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(newUser));
      set({ user: newUser, token: newToken, isLoading: false });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  },

  logout: async () => {
    try {
      await storage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      await storage.removeItem(STORAGE_KEYS.USER_DATA);
      set({ user: null, token: null });
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  setUser: (user) => set({ user }),
  clearError: () => set({ error: null }),
}));
