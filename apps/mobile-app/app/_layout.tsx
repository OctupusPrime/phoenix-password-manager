import { Stack } from 'expo-router';
import { QueryClientProvider } from '@tanstack/react-query';

import { SQLiteProvider } from '@/lib/db';
import { ColorThemeProvider } from '@/lib/unistyles';
import { queryClient } from '@/lib/react-query';

export default function RootLayout() {
  return (
    <SQLiteProvider>
      <QueryClientProvider client={queryClient}>
        <ColorThemeProvider>
          <Stack>
            <Stack.Screen name="index" />
          </Stack>
        </ColorThemeProvider>
      </QueryClientProvider>
    </SQLiteProvider>
  );
}
