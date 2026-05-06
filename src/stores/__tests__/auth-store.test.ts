import { useAuthStore } from '@/stores/auth-store';

beforeEach(() => {
  useAuthStore.getState().reset();
});

describe('auth-store', () => {
  it('starts unauthenticated', () => {
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(useAuthStore.getState().user).toBeNull();
  });

  it('login sets authenticated state', () => {
    useAuthStore.getState().login({ email: 'a@b.com' });
    expect(useAuthStore.getState().isAuthenticated).toBe(true);
    expect(useAuthStore.getState().user).toEqual({ email: 'a@b.com' });
  });

  it('logout clears authenticated state', () => {
    useAuthStore.getState().login({ email: 'a@b.com' });
    useAuthStore.getState().logout();
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(useAuthStore.getState().user).toBeNull();
  });

  it('reset restores initial state after login', () => {
    useAuthStore.getState().login({ email: 'a@b.com' });
    useAuthStore.getState().reset();
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(useAuthStore.getState().user).toBeNull();
  });
});
