import { act, fireEvent, render } from '@testing-library/react-native';

import LoginScreen from '@/features/auth/LoginScreen';
import { useAuthStore } from '@/stores/auth-store';

jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn().mockResolvedValue(null),
  setItemAsync: jest.fn().mockResolvedValue(undefined),
  deleteItemAsync: jest.fn().mockResolvedValue(undefined),
}));

beforeEach(() => {
  useAuthStore.getState().reset();
});

describe('LoginScreen', () => {
  it('renders fields and submits successfully', async () => {
    const { getByTestId, getByText, queryByTestId } = render(<LoginScreen />);

    expect(getByTestId('login-email-input')).toBeTruthy();
    expect(getByTestId('login-password-input')).toBeTruthy();
    expect(getByTestId('login-button')).toBeTruthy();
    expect(queryByTestId('login-success')).toBeNull();

    await act(async () => {
      fireEvent.changeText(getByTestId('login-email-input'), 'user@example.com');
      fireEvent.changeText(getByTestId('login-password-input'), 'senha123');
    });

    await act(async () => {
      fireEvent.press(getByTestId('login-button'));
    });

    expect(getByText('Login enviado com sucesso')).toBeTruthy();
    expect(getByTestId('login-success')).toBeTruthy();
  });

  it('button disabled when fields empty', () => {
    const { getByTestId } = render(<LoginScreen />);
    expect(getByTestId('login-button').props.accessibilityState?.disabled).toBe(true);
  });

  it('shows email error for invalid email', async () => {
    const { getByTestId, findByTestId } = render(<LoginScreen />);
    fireEvent.changeText(getByTestId('login-email-input'), 'invalid');
    fireEvent(getByTestId('login-email-input'), 'blur');
    const error = await findByTestId('login-email-error');
    expect(error.props.children).toBe('Email inválido');
  });

  it('shows password error for short password', async () => {
    const { getByTestId, findByTestId } = render(<LoginScreen />);
    fireEvent.changeText(getByTestId('login-password-input'), '123');
    fireEvent(getByTestId('login-password-input'), 'blur');
    const error = await findByTestId('login-password-error');
    expect(error.props.children).toBe('Senha deve ter ao menos 6 caracteres');
  });
});
