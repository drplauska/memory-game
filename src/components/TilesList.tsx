import React from 'react';
import {FlatList} from 'react-native';
import Tile from 'components/Tile';
import {getTilesArray} from 'utils';
import {LevelStatsType, LevelType} from 'types';

interface TilesListProps {
  levelStats: LevelStatsType;
  activeTiles: LevelType[];
  checkedTiles: LevelType[];
  wrongTiles: LevelType[];
  onCorrectGuess: (level: LevelType) => void;
  onWrongGuess: (level: LevelType) => void;
  areTilesRevealed: boolean;
  disabled: boolean;
}

const TilesList = ({
  levelStats,
  activeTiles,
  checkedTiles,
  wrongTiles,
  onCorrectGuess,
  onWrongGuess,
  areTilesRevealed,
  disabled,
}: TilesListProps) => {
  const tilesArray = getTilesArray(levelStats.height, levelStats.width);
  return (
    <FlatList
      data={tilesArray}
      numColumns={levelStats.width}
      scrollEnabled={false}
      renderItem={({item}) => {
        const isGreen = activeTiles.includes(item);
        const isCompleted = checkedTiles.includes(item);
        const isWronged = wrongTiles.includes(item);
        return (
          <Tile
            key={item}
            isGreen={isGreen && areTilesRevealed}
            isCompleted={isCompleted}
            isWronged={isWronged}
            disabled={areTilesRevealed || disabled}
            onPress={() => {
              if (isGreen) {
                onCorrectGuess(item);
              } else {
                onWrongGuess(item);
              }
            }}
          />
        );
      }}
    />
  );
};

export default TilesList;
