import { Stack } from 'expo-router';
import { QueryClientProvider } from '@tanstack/react-query';

import { SQLiteProvider } from '@/lib/db';
import { queryClient } from '@/lib/react-query';

export default function RootLayout() {
  return (
    <SQLiteProvider>
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen name="index" options={{ title: 'Home' }} />
        </Stack>
      </QueryClientProvider>
    </SQLiteProvider>
  );
}
