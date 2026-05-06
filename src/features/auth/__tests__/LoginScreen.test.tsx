import { fireEvent, render } from '@testing-library/react-native';

import LoginScreen from '@/features/auth/LoginScreen';
import { useAuthStore } from '@/stores/auth-store';

beforeEach(() => {
  useAuthStore.getState().reset();
});

describe('LoginScreen', () => {
  it('renders fields and submits successfully', () => {
    const { getByTestId, getByText, queryByTestId } = render(<LoginScreen />);

    expect(getByTestId('login-email-input')).toBeTruthy();
    expect(getByTestId('login-password-input')).toBeTruthy();
    expect(getByTestId('login-button')).toBeTruthy();
    expect(queryByTestId('login-success')).toBeNull();

    fireEvent.changeText(getByTestId('login-email-input'), 'user@example.com');
    fireEvent.changeText(getByTestId('login-password-input'), 'senha123');
    fireEvent.press(getByTestId('login-button'));

    expect(getByText('Login enviado com sucesso')).toBeTruthy();
    expect(getByTestId('login-success')).toBeTruthy();
  });

  it('button disabled when fields empty', () => {
    const { getByTestId } = render(<LoginScreen />);
    const button = getByTestId('login-button');
    expect(button.props.accessibilityState?.disabled).toBe(true);
  });
});
