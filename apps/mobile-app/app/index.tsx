import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';
import { Text, View, Button } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { FlashList } from '@shopify/flash-list';
import { useQueryClient } from '@tanstack/react-query';
import * as LocalAuthentication from 'expo-local-authentication';

import { Icon } from '@/components/ui/Icon';

import { useSQLiteContext } from '@/lib/db';
import { dayjs } from '@/lib/dayjs';
import { useColorThemeContext } from '@/lib/unistyles';

const DATA = [
  {
    title: 'First Item',
  },
  {
    title: 'Second Item',
  },
];

export default function IndexPage() {
  const { db, status, error, connect, disconnect } = useSQLiteContext();

  useEffect(() => {
    console.log('DB CHANGED', db);
  }, [db]);

  const randomWidth = useSharedValue(10);

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = useAnimatedStyle(() => {
    return {
      width: withTiming(randomWidth.value, config),
    };
  });

  const { t, i18n } = useTranslation();

  const handleAuthentication = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        biometricsSecurityLevel: 'strong',
      });

      console.log('Authentication result:', result);
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  const queryClient = useQueryClient();

  useEffect(() => {
    console.log('Query Client Changed', queryClient.getDefaultOptions());
  }, [queryClient]);

  const { setColorTheme } = useColorThemeContext();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        style={{
          fontFamily: 'Roboto',
          color: '#6200ee',
          fontSize: 57,
          fontWeight: '500',
          letterSpacing: -0.25,
        }}
      >
        Display
      </Text>
      <Button title="EN" onPress={() => i18n.changeLanguage('en')} />
      <Button title="UK" onPress={() => i18n.changeLanguage('uk')} />

      <Icon name="home" size={48} color="#6200ee" filled />
      <Icon name="settings" size={24} />

      <Text>{dayjs().format('MMMM D, YYYY')}</Text>

      <Text style={{ marginVertical: 16 }}>Db Status: {status}</Text>
      <Text style={{ marginVertical: 16 }}>Db Error: {error}</Text>
      <Button title="Connect" onPress={() => connect('password')} />
      <Button title="Disconnect" onPress={disconnect} />

      <Animated.View style={[styles.box, style]} />
      <Button
        title="toggle"
        onPress={() => {
          randomWidth.value = Math.random() * 350;
        }}
      />

      <Button title="Authenticate" onPress={handleAuthentication} />

      <Button
        title="LightMode"
        onPress={() => setColorTheme({ preferredAppearance: 'light' })}
      />
      <Button
        title="DarkMode"
        onPress={() => setColorTheme({ preferredAppearance: 'dark' })}
      />

      <FlashList
        data={DATA}
        renderItem={({ item }) => <Text>{item.title}</Text>}
        style={{
          backgroundColor: 'red',
          height: 200,
          width: '100%',
          marginTop: 20,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  box: {
    width: 100,
    height: 80,
    backgroundColor: theme.colors.primary,
    margin: 30,
  },
}));
