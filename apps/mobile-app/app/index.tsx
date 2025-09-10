import { useEffect } from 'react';
import { Text, View, Button } from 'react-native';

import { useSQLiteContext } from '@/db/SQLite.context';

export default function IndexPage() {
  const { db, status, error, connect } = useSQLiteContext();

  useEffect(() => {
    console.log('db changed', db);
  }, [db]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to Phoenix Password Manager</Text>
      <Text style={{ marginVertical: 16 }}>Db Status: {status}</Text>
      <Text>DB error: {error}</Text>
      <Button title="Connect" onPress={connect} />
    </View>
  );
}
