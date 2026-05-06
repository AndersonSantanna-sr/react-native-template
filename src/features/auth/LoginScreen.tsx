import { useState } from 'react';
import { Pressable, SafeAreaView, Text, TextInput, View } from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import { useAuthStore } from '@/stores/auth-store';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((s) => s.login);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const theme = useTheme();

  const isValid = email.length > 0 && password.length > 0;

  const handleLogin = () => {
    login({ email });
  };

  return (
    <SafeAreaView className='flex-1 justify-center' style={{ backgroundColor: theme.background }}>
      <View className='mx-6 gap-4'>
        <Text className='text-3xl font-bold' style={{ color: theme.text }}>
          Bem-vindo
        </Text>
        <Text className='text-base' style={{ color: theme.textSecondary }}>
          Faça login para continuar
        </Text>

        <TextInput
          autoCapitalize='none'
          keyboardType='email-address'
          onChangeText={setEmail}
          placeholder='Email'
          placeholderTextColor={theme.textSecondary}
          className='rounded-xl border px-4 py-3 text-base'
          style={{
            borderColor: theme.backgroundElement,
            color: theme.text,
            backgroundColor: theme.backgroundElement,
          }}
          testID='login-email-input'
          value={email}
        />

        <TextInput
          onChangeText={setPassword}
          placeholder='Senha'
          placeholderTextColor={theme.textSecondary}
          secureTextEntry
          className='rounded-xl border px-4 py-3 text-base'
          style={{
            borderColor: theme.backgroundElement,
            color: theme.text,
            backgroundColor: theme.backgroundElement,
          }}
          testID='login-password-input'
          value={password}
        />

        <Pressable
          disabled={!isValid}
          onPress={handleLogin}
          className={`items-center rounded-xl py-4 ${isValid ? 'bg-blue-800' : 'bg-slate-400'}`}
          testID='login-button'
        >
          <Text className='text-base font-bold text-white'>Entrar</Text>
        </Pressable>

        {isAuthenticated && (
          <Text className='mt-3 font-semibold text-green-700' testID='login-success'>
            Login enviado com sucesso
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}
