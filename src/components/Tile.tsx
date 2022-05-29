import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import colors from 'styles/colors';
import Animated, {
  FlipInEasyX,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

interface TileProps {
  isGreen: boolean;
  onPress: () => void;
  disabled: boolean;
  isCompleted: boolean;
  isWronged: boolean;
  enteringDelay: number;
}

const Tile = ({
  isGreen,
  onPress,
  disabled,
  isCompleted,
  isWronged,
  enteringDelay,
}: TileProps) => {
  const [color, setColor] = useState(colors.gray);

  useEffect(() => {
    if (isGreen || isCompleted) {
      setColor(colors.main);
      return;
    }
    if (isWronged) {
      setColor(colors.wrong);
      return;
    }
    setColor(colors.gray);
  }, [isCompleted, isGreen, isWronged]);

  const backgroundInterpolate = useAnimatedStyle(
    () => ({backgroundColor: withTiming(color, {duration: 250})}),
    [color],
  );

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Animated.View
        entering={FlipInEasyX.delay(enteringDelay)}
        style={[styles.tile, backgroundInterpolate]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tile: {
    width: 40,
    height: 40,
    borderRadius: 4,
    margin: 5,
  },
});

export default Tile;
