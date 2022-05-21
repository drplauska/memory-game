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
}

const TilesList = ({
  levelStats,
  activeTiles,
  checkedTiles,
  wrongTiles,
  onCorrectGuess,
  onWrongGuess,
  areTilesRevealed,
}: TilesListProps) => {
  const tilesArray = getTilesArray(levelStats.height, levelStats.width);
  return (
    <FlatList
      data={tilesArray}
      renderItem={({item}) => {
        const isActive = activeTiles.includes(item);
        const isCompleted = checkedTiles.includes(item);
        const isWronged = wrongTiles.includes(item);
        return (
          <Tile
            key={item}
            isActive={isActive && areTilesRevealed}
            isCompleted={isCompleted}
            isWronged={isWronged}
            disabled={areTilesRevealed}
            onPress={() => {
              if (isActive) {
                onCorrectGuess(item);
              } else {
                onWrongGuess(item);
              }
            }}
          />
        );
      }}
      numColumns={levelStats.width}
    />
  );
};

export default TilesList;
