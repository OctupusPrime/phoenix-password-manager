import { useState } from 'react';
import { openDatabaseAsync } from 'expo-sqlite';
import { drizzle, ExpoSQLiteDatabase } from 'drizzle-orm/expo-sqlite';
import { migrate } from 'drizzle-orm/expo-sqlite/migrator';

import * as schema from './schema';
import migrations from '@/drizzle/migrations';
import { createSafeContext } from '@/utils/create-safe-context';

type Database = ExpoSQLiteDatabase<typeof schema>;
type ConnectionStatus =
  | 'disconnecting'
  | 'disconnected'
  | 'connecting'
  | 'connected';

export interface SQLiteContextValue {
  db: Database | undefined;

  status: ConnectionStatus;
  error: string | null;

  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

const [Provider, useSQLiteContext] = createSafeContext<SQLiteContextValue>(
  'SQLiteContext component was not found in the tree',
);

interface SQLiteProviderProps {
  children: React.ReactNode;
}

const SQLiteProvider = ({ children }: SQLiteProviderProps) => {
  const [db, setDb] = useState<Database | undefined>(undefined);

  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const [error, setError] = useState<string | null>(null);

  const connect = async () => {
    if (status !== 'disconnected') return;

    setStatus('connecting');
    setError(null);

    try {
      const expoSQLite = await openDatabaseAsync('main.db');
      await expoSQLite.execAsync('PRAGMA journal_mode = WAL');
      await expoSQLite.execAsync('PRAGMA foreign_keys = ON');

      const drizzleSQLite = drizzle(expoSQLite);
      await migrate(drizzleSQLite, migrations);

      //@ts-ignore Bcs drizzleSQLite dont have declared tables
      setDb(drizzleSQLite);
      setStatus('connected');
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      else setError(String(error));

      setStatus('disconnected');
    }
  };

  const disconnect = async () => {
    if (status !== 'connected') return;
    if (!db) return;

    setStatus('disconnecting');
    setError(null);

    try {
      //@ts-ignore Bcs drizzleSQLite dont have $client declared
      await db.$client.closeAsync();

      setDb(undefined);
      setStatus('disconnected');
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      else setError(String(error));

      setStatus('connected');
    }
  };

  return (
    <Provider value={{ db, status, error, connect, disconnect }}>
      {children}
    </Provider>
  );
};

export { SQLiteProvider, useSQLiteContext };
