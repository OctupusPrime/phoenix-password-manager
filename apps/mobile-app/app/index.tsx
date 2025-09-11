import { useEffect } from 'react';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';
import { Text, View, Button } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { useSQLiteContext } from '@/lib/db';

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

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to Phoenix Password Manager</Text>

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
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 80,
    backgroundColor: 'black',
    margin: 30,
  },
});
