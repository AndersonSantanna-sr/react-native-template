import { loginSchema } from '@/lib/schemas/auth';

describe('loginSchema', () => {
  it('valid email and password passes', () => {
    const result = loginSchema.safeParse({ email: 'user@example.com', password: 'senha123' });
    expect(result.success).toBe(true);
  });

  it('invalid email fails with correct message', () => {
    const result = loginSchema.safeParse({ email: 'invalid', password: 'senha123' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Email inválido');
    }
  });

  it('password shorter than 6 chars fails with correct message', () => {
    const result = loginSchema.safeParse({ email: 'user@example.com', password: '123' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Senha deve ter ao menos 6 caracteres');
    }
  });

  it('empty fields fail', () => {
    const result = loginSchema.safeParse({ email: '', password: '' });
    expect(result.success).toBe(false);
  });
});
