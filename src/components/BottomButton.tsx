import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import colors from 'styles/colors';
import Animated, {FadeInDown} from 'react-native-reanimated';

interface BottomButtonProps {
  onPress: () => void;
  isVisible: boolean;
  text: string;
}

const BottomButton = ({onPress, isVisible, text}: BottomButtonProps) => {
  const insets = useSafeAreaInsets();

  if (!isVisible) {
    return null;
  }
  return (
    <Animated.View style={styles.container} entering={FadeInDown}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={[
          styles.button,
          {
            paddingBottom: insets.bottom + 10,
          },
        ]}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
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
  },
  button: {
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

export default BottomButton;
