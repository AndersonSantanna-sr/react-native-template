import { Pressable, SafeAreaView, Text, View } from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import { useAuthStore } from '@/stores/auth-store';

export default function HomeScreen() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const theme = useTheme();

  return (
    <SafeAreaView className='flex-1' style={{ backgroundColor: theme.background }}>
      <View className='flex-1 items-center justify-center gap-4'>
        <Text className='text-2xl font-bold' style={{ color: theme.text }}>
          Olá, {user?.email ?? 'usuário'}!
        </Text>
        <Pressable
          onPress={logout}
          className='rounded-xl bg-red-500 px-6 py-3'
          testID='logout-button'
        >
          <Text className='font-bold text-white'>Sair</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
