import React from 'react';
import {useEffect} from 'react';
import {StyleSheet} from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
} from 'react-native-reanimated';

interface HealthBarProps {
  isOn: boolean;
}

const HealthBar = ({isOn}: HealthBarProps) => {
  const scale = useSharedValue(1);
  useEffect(() => {
    if (!isOn) {
      scale.value = withSequence(
        withTiming(1.5, {duration: 400}),
        withTiming(1, {duration: 250}),
      );
    }
  }, [isOn, scale]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scale.value,
        },
      ],
    };
  }, [isOn]);

  return (
    <Animated.View
      style={[
        styles.healthBar,
        isOn ? styles.healthBarOn : styles.healthBarOff,
        !isOn && animatedStyle,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  healthBar: {width: 20, height: 30},
  healthBarOff: {backgroundColor: 'gray'},
  healthBarOn: {backgroundColor: 'green'},
});

export default HealthBar;
