import { create } from 'zustand';

type User = {
  email: string;
};

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  reset: () => void;
};

const initialState = {
  isAuthenticated: false,
  user: null,
};

export const useAuthStore = create<AuthState>((set) => ({
  ...initialState,
  login: (user) => set({ isAuthenticated: true, user }),
  logout: () => set({ isAuthenticated: false, user: null }),
  reset: () => set(initialState),
}));
