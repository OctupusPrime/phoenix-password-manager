import { Text } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

interface TypographyProps extends React.ComponentProps<typeof Text> {
  typescale:
    | 'display-l'
    | 'display-m'
    | 'display-s'
    | 'headline-l'
    | 'headline-m'
    | 'headline-s'
    | 'title-l'
    | 'title-m'
    | 'title-s'
    | 'body-l'
    | 'body-m'
    | 'body-s'
    | 'label-l'
    | 'label-m'
    | 'label-s';
}

const Typography = ({
  typescale,
  style: typographyStyles,
  ...rest
}: TypographyProps) => {
  styles.useVariants({
    typescale,
  });

  return <Text style={[styles.text, typographyStyles]} {...rest} />;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto',
    variants: {
      typescale: {
        'display-l': {
          fontSize: 57,
          lineHeight: 64,
          fontWeight: '500',
          letterSpacing: -0.25,
        },
        'display-m': {
          fontSize: 45,
          lineHeight: 52,
          fontWeight: '500',
          letterSpacing: 0,
        },
        'display-s': {
          fontSize: 36,
          lineHeight: 44,
          fontWeight: '500',
          letterSpacing: 0,
        },
        'headline-l': {
          fontSize: 32,
          lineHeight: 40,
          fontWeight: '500',
          letterSpacing: 0,
        },
        'headline-m': {
          fontSize: 28,
          lineHeight: 36,
          fontWeight: '500',
          letterSpacing: 0,
        },
        'headline-s': {
          fontSize: 24,
          lineHeight: 32,
          fontWeight: '500',
          letterSpacing: 0,
        },
        'title-l': {
          fontSize: 22,
          lineHeight: 28,
          fontWeight: '500',
          letterSpacing: 0,
        },
        'title-m': {
          fontSize: 16,
          lineHeight: 24,
          fontWeight: '700',
          letterSpacing: 0.15,
        },
        'title-s': {
          fontSize: 14,
          lineHeight: 20,
          fontWeight: '700',
          letterSpacing: 0.1,
        },
        'body-l': {
          fontSize: 16,
          lineHeight: 24,
          fontWeight: '500',
          letterSpacing: 0.5,
        },
        'body-m': {
          fontSize: 14,
          lineHeight: 20,
          fontWeight: '500',
          letterSpacing: 0.25,
        },
        'body-s': {
          fontSize: 12,
          lineHeight: 16,
          fontWeight: '500',
          letterSpacing: 0.4,
        },
        'label-l': {
          fontSize: 14,
          lineHeight: 20,
          fontWeight: '700',
          letterSpacing: 0.1,
        },
        'label-m': {
          fontSize: 12,
          lineHeight: 16,
          fontWeight: '700',
          letterSpacing: 0.5,
        },
        'label-s': {
          fontSize: 11,
          lineHeight: 16,
          fontWeight: '700',
          letterSpacing: 0.5,
        },
      },
    },
  },
});

export { Typography };
