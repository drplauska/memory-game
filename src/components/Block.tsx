import React from 'react';
import {StyleSheet, View, useWindowDimensions, Text} from 'react-native';

const Block = ({level}: {level: number}) => {
  const {width} = useWindowDimensions();
  const size = (width / 2) * 0.8;
  return (
    <View style={[styles.block, {width: size, height: size}]}>
      <Text>{level}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    borderWidth: 1,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Block;
