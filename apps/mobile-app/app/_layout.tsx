import { Stack } from 'expo-router';

import { SQLiteProvider } from '@/db/SQLite.context';

export default function RootLayout() {
  return (
    <SQLiteProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Home' }} />
      </Stack>
    </SQLiteProvider>
  );
}
