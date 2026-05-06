import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, SafeAreaView, Text, TextInput, View } from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import { loginSchema, type LoginFormData } from '@/lib/schemas/auth';
import { useAuthStore } from '@/stores/auth-store';

export default function LoginScreen() {
  const login = useAuthStore((s) => s.login);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const theme = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: LoginFormData) => {
    login({ email: data.email });
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

        <Controller
          control={control}
          name='email'
          render={({ field: { onChange, value } }) => (
            <View className='gap-1'>
              <TextInput
                autoCapitalize='none'
                keyboardType='email-address'
                onChangeText={onChange}
                placeholder='Email'
                placeholderTextColor={theme.textSecondary}
                className='rounded-xl border px-4 py-3 text-base'
                style={{
                  borderColor: theme.backgroundElement,
                  color: theme.text,
                  backgroundColor: theme.backgroundElement,
                }}
                testID='login-email-input'
                value={value}
              />
              {errors.email && (
                <Text className='text-sm text-red-500' testID='login-email-error'>
                  {errors.email.message}
                </Text>
              )}
            </View>
          )}
        />

        <Controller
          control={control}
          name='password'
          render={({ field: { onChange, value } }) => (
            <View className='gap-1'>
              <TextInput
                onChangeText={onChange}
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
                value={value}
              />
              {errors.password && (
                <Text className='text-sm text-red-500' testID='login-password-error'>
                  {errors.password.message}
                </Text>
              )}
            </View>
          )}
        />

        <Pressable
          disabled={!isValid}
          onPress={handleSubmit(onSubmit)}
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
