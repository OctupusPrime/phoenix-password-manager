import { forwardRef, useRef } from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  View,
} from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import {
  InteractionOverlay,
  InteractionOverlayRef,
} from './InteractionOverlay';
import { Icon } from './Icon';
import { Typography } from './Typography';

import { elevationStyles } from '@/lib/ui';

interface ButtonProps
  extends Omit<React.ComponentProps<typeof Pressable>, 'style'> {
  size?: 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large';
  shape?: 'round' | 'square';
  variant?: 'elevated' | 'filled' | 'tonal' | 'outlined' | 'text';
  elevation?: 1 | 2 | 3 | 4 | 5;
  style?: StyleProp<any>;

  title: string;
  icon?: {
    name: string;
    filled?: boolean;
  };
}

function getButtonRadius(
  size: ButtonProps['size'],
  shape: ButtonProps['shape'],
): number {
  if (shape === 'round') {
    if (size === 'extra-small' || size === 'small') return 24;
    return 100;
  }

  switch (size) {
    case 'extra-small':
      return 4;
    case 'small':
    case 'medium':
      return 8;
    case 'large':
      return 16;
    case 'extra-large':
      return 20;
    default:
      return 8;
  }
}

const iconSizeMap = {
  'extra-small': 20,
  'small': 20,
  'medium': 24,
  'large': 32,
  'extra-large': 40,
} as const;

const textTypescaleMap = {
  'extra-small': 'label-l',
  'small': 'label-l',
  'medium': 'title-m',
  'large': 'headline-s',
  'extra-large': 'headline-l',
} as const;

const Button = forwardRef<any, ButtonProps>(
  (
    {
      size = 'medium',
      shape = 'round',
      variant = 'filled',
      elevation: elevationLevel,
      style: buttonStyles,
      disabled,
      title,
      icon,
      ...rest
    },
    ref,
  ) => {
    styles.useVariants({
      size,
      variant,
      disabled: Boolean(disabled),
    });

    elevationStyles.useVariants({
      level: elevationLevel,
    });

    const buttonRadius = useSharedValue(getButtonRadius(size, shape));

    const interactionOverlayRef = useRef<InteractionOverlayRef>(null);

    const handlePressIn = (e: GestureResponderEvent) => {
      interactionOverlayRef.current?.pressIn(e);

      buttonRadius.value = withSpring(20, {
        stiffness: 800,
        damping: 40,
        mass: 2,
        overshootClamping: false,
        energyThreshold: 6e-9,
      });
    };

    const handlePressOut = () => {
      interactionOverlayRef.current?.pressOut();

      buttonRadius.value = withSpring(getButtonRadius(size, shape), {
        stiffness: 800,
        damping: 40,
        mass: 2,
        overshootClamping: false,
        energyThreshold: 6e-9,
      });
    };

    const animatedButtonStyles = useAnimatedStyle(() => ({
      borderRadius: buttonRadius.value,
    }));

    return (
      <Pressable
        ref={ref}
        style={[styles.wrapper]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        {...rest}
      >
        <Animated.View
          style={[
            styles.button,
            elevationStyles.elevation,
            buttonStyles,
            animatedButtonStyles,
          ]}
        >
          <InteractionOverlay
            ref={interactionOverlayRef}
            outerRadius={buttonRadius}
            rippleStyle={styles.buttonRipple}
          />

          {icon && (
            <Icon
              name={icon.name}
              size={iconSizeMap[size]}
              filled={icon.filled}
              style={styles.buttonText}
            />
          )}
          <Typography
            typescale={textTypescaleMap[size]}
            style={styles.buttonText}
          >
            {title}
          </Typography>
        </Animated.View>
      </Pressable>
    );
  },
);

Button.displayName = 'Button';

const styles = StyleSheet.create((theme) => ({
  wrapper: {
    minHeight: 48,
    minWidth: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',

    variants: {
      size: {
        'extra-small': {
          paddingHorizontal: 12,
          paddingVertical: 6,
          gap: 4,
        },
        'small': {
          paddingHorizontal: 16,
          paddingVertical: 10,
          gap: 8,
        },
        'medium': {
          paddingHorizontal: 24,
          paddingVertical: 16,
          gap: 8,
        },
        'large': {
          paddingHorizontal: 48,
          paddingVertical: 32,
          gap: 12,
        },
        'extra-large': {
          paddingHorizontal: 64,
          paddingVertical: 48,
          gap: 16,
        },
      },
      variant: {
        elevated: {
          backgroundColor: theme.colors.surfaceContainerLow,
        },
        filled: {
          backgroundColor: theme.colors.primary,
        },
        tonal: {
          backgroundColor: theme.colors.secondaryContainer,
        },
        outlined: {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: theme.colors.outlineVariant,
        },
        text: {
          backgroundColor: 'transparent',
        },
      },
      disabled: {
        true: {
          backgroundColor: 'transparent',
        },
      },
    },
  },
  buttonText: {
    variants: {
      variant: {
        elevated: {
          color: theme.colors.primary,
        },
        filled: {
          color: theme.colors.onPrimary,
        },
        tonal: {
          color: theme.colors.onSecondaryContainer,
        },
        outline: {
          color: theme.colors.onSurfaceVariant,
        },
        text: {
          color: theme.colors.primary,
        },
      },
      disabled: {
        true: {
          color: theme.colors.onSurface,
          opacity: 0.38,
        },
      },
    },
  },
  buttonRipple: {
    opacity: 0.1,
    variants: {
      variant: {
        elevated: {
          backgroundColor: theme.colors.primary,
        },
        filled: {
          backgroundColor: theme.colors.onPrimary,
        },
        tonal: {
          backgroundColor: theme.colors.onSecondaryContainer,
        },
        outline: {
          backgroundColor: theme.colors.onSurfaceVariant,
        },
        text: {
          backgroundColor: theme.colors.primary,
        },
      },
    },
  },
}));

export default Button;
