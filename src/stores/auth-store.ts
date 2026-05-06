import { create } from 'zustand';

import { tokenStorage } from '@/lib/token-storage';

type User = {
  email: string;
};

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (user: User, token?: string) => void;
  logout: () => void;
  reset: () => void;
};

const initialState: Pick<AuthState, 'isAuthenticated' | 'user' | 'token'> = {
  isAuthenticated: false,
  user: null,
  token: null,
};

export const useAuthStore = create<AuthState>((set) => ({
  ...initialState,
  login: (user, token) => {
    if (token) tokenStorage.set(token).catch(() => {});
    set({ isAuthenticated: true, user, token: token ?? null });
  },
  logout: () => {
    tokenStorage.delete().catch(() => {});
    set({ isAuthenticated: false, user: null, token: null });
  },
  reset: () => {
    tokenStorage.delete().catch(() => {});
    set(initialState);
  },
}));
