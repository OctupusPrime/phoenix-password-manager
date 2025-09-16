import { StyleProp, Text } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

interface IconProps {
  name: string;
  size?: number;
  filled?: boolean;
  style?: StyleProp<any>;
}
const Icon = ({
  name,
  size = 24,
  filled = false,
  style: iconStyles,
}: IconProps) => {
  return (
    <Text style={[styles.icon({ size, filled }), iconStyles]}>{name}</Text>
  );
};

const styles = StyleSheet.create({
  icon: ({ size, filled }: { size: number; filled: boolean }) => ({
    fontSize: size,
    color: 'black',
    fontFamily: filled
      ? 'Material Symbols Outlined Filled'
      : 'Material Symbols Outlined',
  }),
});

export { Icon };
