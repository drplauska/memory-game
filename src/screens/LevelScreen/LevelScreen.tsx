import React, {useEffect, useMemo, useState} from 'react';
import {levels} from 'levels';
import {Alert, FlatList, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from 'MainStackNavigator';
import {Screens} from 'screens/screens';
import {StyleSheet} from 'react-native';
import HealthBarList from 'components/HealthBarList';
import Tile from 'components/Tile';
import {
  generateArray,
  generateRandomInteger,
  getLevelStats,
  getTilesArray,
} from 'utils';
import {LevelType} from 'types';

type LevelScreenProps = NativeStackScreenProps<
  RootStackParamList,
  Screens.LevelScreen
>;

const LevelScreen = ({navigation, route}: LevelScreenProps) => {
  const currentLevel = route.params.level;
  const [levelWasNotFound, setLevelWasNotFound] = useState(false);
  const levelStats = useMemo(
    () => getLevelStats(currentLevel, () => setLevelWasNotFound(true)),
    [currentLevel],
  );

  const [activeHealth, setActiveHealth] = useState(levelStats?.health || 9999);
  const [activeTiles, setActiveTiles] = useState<LevelType[] | undefined>();
  const [areTilesRevealed, setAreTilesRevealed] = useState(false);
  const [checkedTiles, setCheckedTiles] = useState<LevelType[]>([]);
  const [wrongTiles, setWrongTiles] = useState<LevelType[]>([]);

  useEffect(() => {
    navigation.setOptions({headerTitle: `Level ${currentLevel}`});
    revealTiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (levelWasNotFound) {
      console.error(
        `Level ${currentLevel} was not found! Fallbacked to first level`,
      );
    }
  }, [currentLevel, levelWasNotFound]);

  const revealTiles = () => {
    setAreTilesRevealed(true);
    setTimeout(() => {
      setAreTilesRevealed(false);
    }, 3000);
  };

  const revealTilesShort = () => {
    setAreTilesRevealed(true);
    setTimeout(() => {
      setAreTilesRevealed(false);
    }, 1500);
  };

  useEffect(() => {
    if (!levelStats || activeTiles) {
      return;
    }
    let randomActiveTiles: LevelType[] = [];
    while (randomActiveTiles.length < levelStats.activeTilesCount) {
      const random = generateRandomInteger(
        1,
        levelStats.height * levelStats.width,
      );
      if (!randomActiveTiles.includes(random)) {
        randomActiveTiles.push(random);
      }
    }
    setActiveTiles(randomActiveTiles);
  }, [activeTiles, levelStats]);

  useEffect(() => {
    if (activeHealth === 0) {
      Alert.alert('You lost', ';(', [{onPress: () => navigation.goBack()}]);
    }
  }, [activeHealth, navigation]);

  if (!activeTiles) {
    return <Text>Loading</Text>;
  }

  const onCorrectGuess = (index: number) => {
    if (checkedTiles.includes(index)) {
      return;
    }
    setCheckedTiles([...checkedTiles, index]);
    if (checkedTiles.length + 1 === activeTiles.length) {
      if (levels.find(level => level.level === currentLevel + 1)) {
        return Alert.alert('You won', 'congrats', [
          {
            text: 'Go to next level',
            onPress: () => {
              navigation.replace(Screens.LevelScreen, {
                level: currentLevel + 1,
              });
            },
          },
        ]);
      }
      Alert.alert('You finished all levels', 'congrats', [
        {
          text: 'Go to levels list ',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    }
  };

  const onWrongGuess = (index: number) => {
    setWrongTiles([...wrongTiles, index]);
    setActiveHealth(activeHealth - 1);
    revealTilesShort();
  };

  const tilesArray = getTilesArray(levelStats.height, levelStats.width);

  return (
    <View style={styles.container}>
      <HealthBarList
        totalHealth={levelStats?.health}
        activeHealth={activeHealth}
      />
      <View style={styles.tilesContainer}>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  healthBarList: {
    alignItems: 'center',
  },
  healthBar: {width: 40, height: 60, backgroundColor: 'green'},
  tilesContainer: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 30,
    alignItems: 'center',
  },
  tilesRow: {
    flexDirection: 'row',
  },
});

export default LevelScreen;
