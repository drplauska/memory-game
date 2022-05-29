import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import colors from 'styles/colors';
import Animated, {FadeInDown, FadeOutDown} from 'react-native-reanimated';

interface BottomInfoProps {
  isVisible: boolean;
  text: string;
}

const BottomInfo = ({isVisible, text}: BottomInfoProps) => {
  const insets = useSafeAreaInsets();

  if (!isVisible) {
    return null;
  }
  return (
    <Animated.View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom + 10,
        },
      ]}
      entering={FadeInDown}
      exiting={FadeOutDown}>
      <Text style={styles.text}>{text}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.main,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: 22,
    fontWeight: '500',
  },
});

export default BottomInfo;
