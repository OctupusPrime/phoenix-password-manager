import { Text } from 'react-native';

import { StyleSheet } from 'react-native-unistyles';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  filled?: boolean;
}
const Icon = ({
  name,
  size = 24,
  color = 'black',
  filled = false,
}: IconProps) => {
  return <Text style={styles.icon({ size, color, filled })}>{name}</Text>;
};

const styles = StyleSheet.create({
  icon: ({
    size,
    color,
    filled,
  }: {
    size: number;
    color: string;
    filled: boolean;
  }) => ({
    fontSize: size,
    color,
    fontFamily: filled
      ? 'Material Symbols Outlined Filled'
      : 'Material Symbols Outlined',
  }),
});

export { Icon };
