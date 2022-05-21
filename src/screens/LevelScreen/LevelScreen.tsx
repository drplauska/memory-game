import React, {useEffect, useMemo, useState} from 'react';
import {levels} from 'levels';
import {Alert, FlatList, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from 'MainStackNavigator';
import {Screens} from 'screens/screens';
import {StyleSheet} from 'react-native';
import HealthBarList from 'components/HealthBarList';
import Tile from 'components/Tile';
import {generateArray, generateRandomInteger} from 'utils';

type LevelScreenProps = NativeStackScreenProps<
  RootStackParamList,
  Screens.LevelScreen
>;

const LevelScreen = ({navigation, route}: LevelScreenProps) => {
  const currentLevel = route.params.level;
  const levelStats = levels.find(({level}) => level === currentLevel);

  const [activeHealth, setActiveHealth] = useState(levelStats?.health || 9999);
  const [activeTiles, setActiveTiles] = useState<number[] | undefined>();
  const [tilesRevealed, setTilesRevealed] = useState(false);
  const [checkedTiles, setCheckedTiles] = useState<number[]>([]);

  useEffect(() => {
    navigation.setOptions({headerTitle: `Level ${currentLevel}`});

    startTimers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startTimers = () => {
    setTimeout(() => {
      setTilesRevealed(true);
    }, 1000);
    setTimeout(() => {
      setTilesRevealed(false);
    }, 5000);
  };

  useEffect(() => {
    if (!levelStats || activeTiles) {
      return;
    }
    let randomActiveTiles: number[] = [];
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
      Alert.alert('Pralaimejai');
      navigation.goBack();
    }
  }, [activeHealth, navigation]);

  if (!levelStats) {
    console.error(`Level ${currentLevel} was not found`);
    navigation.goBack();
    return null;
  }

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

  const onWrongGuess = () => {
    setCheckedTiles([]);
    setActiveHealth(activeHealth - 1);
    startTimers();
  };

  const tilesArray = generateArray(
    levelStats?.height * levelStats?.width,
    null,
  ).map((_, i) => i + 1);

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
            return (
              <Tile
                key={item}
                isActive={isActive && tilesRevealed}
                isCompleted={isCompleted}
                disabled={tilesRevealed}
                onPress={() => {
                  if (isActive) {
                    onCorrectGuess(item);
                  } else {
                    onWrongGuess();
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
