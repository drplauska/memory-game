import React, {useEffect, useMemo, useState} from 'react';
import {levels} from 'levels';
import {FlatList, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from 'MainStackNavigator';
import {Screens} from 'screens/screens';
import {StyleSheet} from 'react-native';
import HealthBarList from 'components/HealthBarList';
import Tile from 'components/Tile';
import {generateArray, generateRandomInteger, getTileId} from 'utils';

type LevelScreenProps = NativeStackScreenProps<
  RootStackParamList,
  Screens.LevelScreen
>;

const LevelScreen = ({navigation, route}: LevelScreenProps) => {
  const currentLevel = route.params.level;
  const levelStats = levels.find(({level}) => level === currentLevel);

  const [activeHealth, setActiveHealth] = useState(levelStats?.health);
  const [activeTiles, setActiveTiles] = useState<number[] | undefined>();

  useEffect(() => {
    navigation.setOptions({headerTitle: `Level ${currentLevel}`});
    console.log('useeffectas');
  }, [navigation, currentLevel]);

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

  if (!levelStats || !activeHealth) {
    console.error(`Level ${currentLevel} was not found`);
    navigation.goBack();
    return null;
  }

  if (!activeTiles) {
    return <Text>Loading</Text>;
  }

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
            return (
              <Tile
                key={item}
                isActive={isActive}
                onPress={() => {
                  if (isActive) {
                    console.log('good');
                  } else {
                    console.log('bad');
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
