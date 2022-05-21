import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import colors from 'styles/colors';

interface TileProps {
  isActive: boolean;
  onPress: () => void;
  disabled: boolean;
  isCompleted: boolean;
}

const Tile = ({isActive, onPress, disabled, isCompleted}: TileProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.tile,
        isActive || isCompleted ? styles.activeTile : styles.inactiveTile,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  tile: {
    width: 40,
    height: 40,
    borderRadius: 4,
    margin: 5,
  },
  activeTile: {
    backgroundColor: colors.main,
  },
  inactiveTile: {
    backgroundColor: 'gray',
  },
});

export default Tile;
