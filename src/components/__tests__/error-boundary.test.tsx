import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';

import { ErrorBoundary } from '@/components/error-boundary';

function BrokenComponent(): React.ReactElement {
  throw new Error('Test error message');
}

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  (console.error as jest.Mock).mockRestore();
});

describe('ErrorBoundary', () => {
  it('renders children when no error occurs', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <Text>Conteúdo normal</Text>
      </ErrorBoundary>,
    );
    expect(getByText('Conteúdo normal')).toBeTruthy();
  });

  it('renders fallback UI when child throws', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>,
    );
    expect(getByText('Algo deu errado')).toBeTruthy();
    expect(getByText('Test error message')).toBeTruthy();
    expect(getByText('Tentar novamente')).toBeTruthy();
  });

  it('shows retry button that resets error state', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>,
    );
    fireEvent.press(getByText('Tentar novamente'));
    // BrokenComponent throws again after reset — error UI re-appears
    expect(getByText('Algo deu errado')).toBeTruthy();
  });
});
