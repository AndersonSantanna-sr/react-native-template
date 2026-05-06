jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn().mockResolvedValue(null),
  setItemAsync: jest.fn().mockResolvedValue(undefined),
  deleteItemAsync: jest.fn().mockResolvedValue(undefined),
}));

import * as SecureStore from 'expo-secure-store';
import { useAuthStore } from '@/stores/auth-store';

beforeEach(() => {
  useAuthStore.getState().reset();
  jest.clearAllMocks();
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
    expect(SecureStore.setItemAsync).not.toHaveBeenCalled();
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
    expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith('auth_token');
    expect(useAuthStore.getState().token).toBeNull();
  });
});
