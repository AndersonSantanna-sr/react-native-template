jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

import * as SecureStore from 'expo-secure-store';
import { useAuthStore } from '@/stores/auth-store';

beforeEach(() => {
  jest.clearAllMocks();
  useAuthStore.getState().reset();
});

describe('auth-store', () => {
  it('starts unauthenticated', () => {
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(useAuthStore.getState().user).toBeNull();
    expect(useAuthStore.getState().token).toBeNull();
  });

  it('login sets authenticated state', () => {
    useAuthStore.getState().login({ email: 'a@b.com' });
    expect(useAuthStore.getState().isAuthenticated).toBe(true);
    expect(useAuthStore.getState().user).toEqual({ email: 'a@b.com' });
  });

  it('login with token persists token to secure store', () => {
    useAuthStore.getState().login({ email: 'a@b.com' }, 'my-jwt');
    expect(SecureStore.setItemAsync).toHaveBeenCalledWith('auth_token', 'my-jwt');
    expect(useAuthStore.getState().token).toBe('my-jwt');
  });

  it('logout clears authenticated state and deletes token', () => {
    useAuthStore.getState().login({ email: 'a@b.com' }, 'my-jwt');
    useAuthStore.getState().logout();
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(useAuthStore.getState().user).toBeNull();
    expect(useAuthStore.getState().token).toBeNull();
    expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith('auth_token');
  });

  it('reset restores initial state after login', () => {
    useAuthStore.getState().login({ email: 'a@b.com' });
    useAuthStore.getState().reset();
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(useAuthStore.getState().user).toBeNull();
  });
});
