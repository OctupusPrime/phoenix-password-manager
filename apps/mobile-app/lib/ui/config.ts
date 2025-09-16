import { StyleSheet } from 'react-native-unistyles';

const elevationStyles = StyleSheet.create({
  elevation: {
    shadowColor: '#000',
    variants: {
      level: {
        default: {
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0,
          shadowRadius: 0,
          elevation: 0,
        },
        1: {
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.3,
          shadowRadius: 2.22,

          elevation: 3,
        },
        2: {
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.3,
          shadowRadius: 4.65,

          elevation: 6,
        },
        3: {
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,

          elevation: 10,
        },
        4: {
          shadowOffset: {
            width: 0,
            height: 7,
          },
          shadowOpacity: 0.41,
          shadowRadius: 9.11,

          elevation: 14,
        },
        5: {
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.44,
          shadowRadius: 10.32,

          elevation: 16,
        },
      },
    },
  },
});

export { elevationStyles };
