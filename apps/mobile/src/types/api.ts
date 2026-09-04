import { User } from './index';

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginPayload {
  email: string;
  password?: string;
  pin?: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password?: string;
  role?: string;
  tenantId?: string;
}
