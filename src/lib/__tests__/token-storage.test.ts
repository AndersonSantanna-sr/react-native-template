jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

import * as SecureStore from 'expo-secure-store';
import { tokenStorage } from '@/lib/token-storage';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('tokenStorage', () => {
  it('get calls SecureStore.getItemAsync with auth_token key', async () => {
    (SecureStore.getItemAsync as jest.Mock).mockResolvedValue('my-token');
    const result = await tokenStorage.get();
    expect(SecureStore.getItemAsync).toHaveBeenCalledWith('auth_token');
    expect(result).toBe('my-token');
  });

  it('set calls SecureStore.setItemAsync with key and value', async () => {
    await tokenStorage.set('my-token');
    expect(SecureStore.setItemAsync).toHaveBeenCalledWith('auth_token', 'my-token');
  });

  it('delete calls SecureStore.deleteItemAsync with auth_token key', async () => {
    await tokenStorage.delete();
    expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith('auth_token');
  });
});
