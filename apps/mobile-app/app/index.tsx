import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import Button from '@/components/ui/Button';

import { useColorThemeContext } from '@/lib/unistyles';

export default function IndexPage() {
  const { setColorTheme } = useColorThemeContext();

  return (
    <View style={styles.container}>
      <Button
        title="Press Me"
        icon={{
          name: 'touch_app',
          filled: true,
        }}
        variant="filled"
        size="large"
        elevation={1}
      />

      <View style={styles.themeToggleContainer}>
        <Button
          title="Light"
          shape="round"
          onPress={() => setColorTheme({ preferredAppearance: 'light' })}
        />
        <Button
          title="Dark"
          shape="round"
          onPress={() => setColorTheme({ preferredAppearance: 'dark' })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    paddingTop: rt.insets.top,
    paddingBottom: rt.insets.bottom,
    paddingLeft: rt.insets.left,
    paddingRight: rt.insets.right,

    backgroundColor: theme.colors.surface,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },

  themeToggleContainer: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16 + rt.insets.bottom,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
}));
