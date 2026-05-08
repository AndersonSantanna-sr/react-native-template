import { create } from 'zustand';

import { tokenStorage } from '@/lib/token-storage';

type User = {
  email: string;
};

type AuthState = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: User | null;
  token: string | null;
  initAuth: () => Promise<void>;
  login: (user: User, token?: string) => void;
  logout: () => void;
  reset: () => void;
};

const initialState: Pick<AuthState, 'isAuthenticated' | 'isInitialized' | 'user' | 'token'> = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  token: null,
};

export const useAuthStore = create<AuthState>((set) => ({
  ...initialState,
  initAuth: async () => {
    try {
      const token = await tokenStorage.get();
      if (token) {
        set({ isAuthenticated: true, token, user: null });
      }
    } catch {
      // SecureStore failure — treat as unauthenticated
    } finally {
      set({ isInitialized: true });
    }
  },
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
