import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import colors from 'styles/colors';

interface TileProps {
  isGreen: boolean;
  onPress: () => void;
  disabled: boolean;
  isCompleted: boolean;
  isWronged: boolean;
}

const Tile = ({
  isGreen,
  onPress,
  disabled,
  isCompleted,
  isWronged,
}: TileProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.tile,
        isGreen || isCompleted
          ? styles.activeTile
          : isWronged
          ? styles.wrongedTile
          : styles.inactiveTile,
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
  wrongedTile: {
    backgroundColor: colors.wrong,
  },
});

export default Tile;
