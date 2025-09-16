import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { GestureResponderEvent, StyleProp, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const DEFAULT_DURATION = 300;

interface InteractionOverlayProps {
  disabled?: boolean;

  outerRadius: SharedValue<number>;

  disabledStyle?: {
    backgroundColor: string;
    opacity: number;
  };
  hoverStyle?: {
    backgroundColor: string;
    opacity: number;
  };
  focusStyle?: {
    borderColor: string;
    offset: number;
  };
  rippleStyle?: {
    backgroundColor: string;
    opacity: number;
  };
}

interface InteractionOverlayRef {
  hoverIn: () => void;
  hoverOut: () => void;
  focus: () => void;
  blur: () => void;
  pressIn: (e: GestureResponderEvent) => void;
  pressOut: () => void;
}

const InteractionOverlay = forwardRef<
  InteractionOverlayRef,
  InteractionOverlayProps
>(
  (
    {
      disabled = false,
      outerRadius,
      disabledStyle,
      hoverStyle,
      focusStyle,
      rippleStyle,
    },
    ref,
  ) => {
    const containerBackground = useSharedValue('transparent');
    const containerOpacity = useSharedValue(0);

    const focusOpacity = useSharedValue(0);

    const rippleX = useSharedValue(0);
    const rippleY = useSharedValue(0);
    const rippleScale = useSharedValue(0);
    const rippleColor = useSharedValue('transparent');
    const rippleOpacity = useSharedValue(0);

    const showDisable = useCallback(() => {
      if (!disabledStyle) return;

      containerBackground.value = withTiming(disabledStyle.backgroundColor, {
        duration: DEFAULT_DURATION,
      });
      containerOpacity.value = withTiming(disabledStyle.opacity, {
        duration: DEFAULT_DURATION,
      });
    }, [disabledStyle]);

    const showHover = useCallback(() => {
      if (!hoverStyle) return;

      containerBackground.value = withTiming(hoverStyle.backgroundColor, {
        duration: DEFAULT_DURATION,
      });
      containerOpacity.value = withTiming(hoverStyle.opacity, {
        duration: DEFAULT_DURATION,
      });
    }, [hoverStyle]);

    const showFocus = useCallback(() => {
      if (!focusStyle) return;

      containerOpacity.value = withTiming(1, { duration: DEFAULT_DURATION });

      if (hoverStyle)
        containerBackground.value = withTiming(hoverStyle.backgroundColor, {
          duration: DEFAULT_DURATION,
        });

      focusOpacity.value = withTiming(1, { duration: DEFAULT_DURATION });
    }, [focusStyle, hoverStyle]);

    const hideFocus = () => {
      focusOpacity.value = withTiming(0, { duration: DEFAULT_DURATION });
    };

    const showRipple = useCallback(
      (
        x: number,
        y: number,
        containerWidth: number,
        containerHeight: number,
      ) => {
        if (!rippleStyle) return;

        const maxDistance = Math.sqrt(
          Math.pow(Math.max(x, containerWidth - x), 2) +
            Math.pow(Math.max(y, containerHeight - y), 2),
        );

        rippleX.value = x;
        rippleY.value = y;
        rippleScale.value = 0;
        rippleOpacity.value = rippleStyle.opacity;
        rippleColor.value = rippleStyle.backgroundColor;

        rippleScale.value = withTiming(maxDistance * 2, {
          duration: DEFAULT_DURATION,
        });
      },
      [rippleStyle],
    );

    const hideRipple = () => {
      rippleOpacity.value = withTiming(0, { duration: DEFAULT_DURATION });
    };

    const hideContainer = () => {
      containerOpacity.value = withTiming(
        0,
        { duration: DEFAULT_DURATION },
        () => {
          containerBackground.value = 'transparent';
        },
      );
    };

    const currentlyDisabled = useRef(false);

    useEffect(() => {
      if (disabled) {
        showDisable();
        currentlyDisabled.current = true;
        return;
      }

      if (currentlyDisabled.current) {
        hideContainer();
        currentlyDisabled.current = false;
        return;
      }
    }, [disabled]);

    useImperativeHandle(ref, () => ({
      hoverIn: showHover,
      hoverOut: hideContainer,
      focus: showFocus,
      blur: hideFocus,
      pressIn: (e: GestureResponderEvent) => {
        const { pageX, pageY } = e.nativeEvent;

        let relativeX = 0;
        let relativeY = 0;
        let containerWidth = 0;
        let containerHeight = 0;

        e.currentTarget.measure(
          (x, y, width, height, pageX_offset, pageY_offset) => {
            relativeX = pageX - pageX_offset;
            relativeY = pageY - pageY_offset;
            containerWidth = width;
            containerHeight = height;
          },
        );

        containerOpacity.value = 1;

        showRipple(relativeX, relativeY, containerWidth, containerHeight);
      },
      pressOut: hideRipple,
    }));

    const animatedContainerStyles = useAnimatedStyle(() => ({
      backgroundColor: containerBackground.value,
      opacity: containerOpacity.value,
      borderRadius: outerRadius.value,
    }));

    const animatedFocusStyles = useAnimatedStyle(() => ({
      opacity: focusOpacity.value,
      borderRadius:
        outerRadius.value + (focusStyle?.offset ? focusStyle.offset : 0),
    }));

    const animatedRippleContainerStyles = useAnimatedStyle(() => ({
      borderRadius: outerRadius.value,
    }));

    const animatedRippleStyles = useAnimatedStyle(() => ({
      position: 'absolute',
      left: rippleX.value - rippleScale.value / 2,
      top: rippleY.value - rippleScale.value / 2,
      width: rippleScale.value,
      height: rippleScale.value,
      borderRadius: rippleScale.value / 2,
      opacity: rippleOpacity.value,
      backgroundColor: rippleColor.value,
      transform: [{ scale: 1 }],
    }));

    return (
      <Animated.View
        style={[styles.container, animatedContainerStyles]}
        pointerEvents="none"
      >
        {focusStyle && (
          <Animated.View
            style={[
              styles.focusContainer({
                borderColor: focusStyle.borderColor,
                offset: focusStyle.offset,
              }),
              animatedFocusStyles,
            ]}
            pointerEvents="none"
          />
        )}
        <Animated.View
          style={[styles.rippleContainer, animatedRippleContainerStyles]}
          pointerEvents="none"
        >
          <Animated.View style={animatedRippleStyles} pointerEvents="none" />
        </Animated.View>
      </Animated.View>
    );
  },
);

InteractionOverlay.displayName = 'InteractionOverlay';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  focusContainer: ({
    borderRadius,
    offset,
    borderColor,
  }: {
    borderRadius?: number;
    offset: number;
    borderColor: string;
  }) => {
    const negativeOffset = offset * -1;

    return {
      position: 'absolute',
      top: negativeOffset,
      left: negativeOffset,
      right: negativeOffset,
      bottom: negativeOffset,
      borderWidth: 3,
      borderColor,
    };
  },
  rippleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
});

export { InteractionOverlay, InteractionOverlayRef };
