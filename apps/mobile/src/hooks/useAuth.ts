import { useAuthStore } from '../store/authStore';

export function useAuth() {
  const { user, token, isLoading, isInitializing, error, login, logout, signup, clearError } = useAuthStore();

  const isLoggedIn = !!user;

  return {
    user,
    token,
    isLoggedIn,
    isLoading,
    isInitializing,
    error,
    login,
    logout,
    signup,
    clearError,
  };
}
