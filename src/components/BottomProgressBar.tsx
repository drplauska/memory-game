import React from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import colors from 'styles/colors';
import Animated, {Keyframe} from 'react-native-reanimated';

interface BottomProgressBarProps {
  isVisible: boolean;
  total: number;
}

const BottomProgressBar = ({isVisible, total}: BottomProgressBarProps) => {
  const insets = useSafeAreaInsets();
  const {width} = useWindowDimensions();

  const keyframe = new Keyframe({
    0: {
      width: width,
    },
    100: {
      width: 0,
    },
  }).duration(total);

  if (!isVisible) {
    return null;
  }

  return (
    <View
      style={[
        {
          height: insets.bottom + 40,
        },
        styles.container,
      ]}>
      <Animated.View entering={keyframe} style={[styles.bar]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.gray,
  },
  bar: {
    height: '100%',
    backgroundColor: colors.main,
  },
});

export default BottomProgressBar;
