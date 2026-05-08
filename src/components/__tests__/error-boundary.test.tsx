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

  it('resets error state when retry is pressed', () => {
    let shouldThrow = true;
    function ConditionalComponent(): React.ReactElement {
      if (shouldThrow) throw new Error('Test error message');
      return <Text>Recuperado</Text>;
    }

    const { getByText } = render(
      <ErrorBoundary>
        <ConditionalComponent />
      </ErrorBoundary>,
    );

    expect(getByText('Algo deu errado')).toBeTruthy();
    shouldThrow = false;
    fireEvent.press(getByText('Tentar novamente'));
    expect(getByText('Recuperado')).toBeTruthy();
  });
});
