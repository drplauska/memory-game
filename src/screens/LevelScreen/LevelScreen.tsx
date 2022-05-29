import React, {useEffect, useMemo, useState} from 'react';
import {Alert, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from 'MainStackNavigator';
import {Screens} from 'screens/screens';
import {StyleSheet} from 'react-native';
import HealthBarList from 'components/HealthBarList';
import {
  doesNextLevelExist,
  generateRandomInteger,
  getFormattedTime,
  getLevelStatsOrFallback,
  getTimeUntilAllTilesShow,
} from 'utils';
import {LevelType} from 'types';
import TilesList from 'components/TilesList';
import BottomButton from 'components/BottomButton';
import useTimer from 'hooks/useTimer';
import BottomInfo from 'components/BottomInfo';

type LevelScreenProps = NativeStackScreenProps<
  RootStackParamList,
  Screens.LevelScreen
>;

const LevelScreen = ({navigation, route}: LevelScreenProps) => {
  const currentLevel = route.params.level;
  const [levelWasNotFound, setLevelWasNotFound] = useState(false);
  const levelStats = useMemo(
    () =>
      getLevelStatsOrFallback(currentLevel, () => setLevelWasNotFound(true)),
    [currentLevel],
  );

  const [activeHealth, setActiveHealth] = useState(levelStats.health);
  const [activeTiles, setActiveTiles] = useState<LevelType[] | undefined>();
  const [areTilesRevealed, setAreTilesRevealed] = useState(false);
  const [checkedTiles, setCheckedTiles] = useState<LevelType[]>([]);
  const [wrongTiles, setWrongTiles] = useState<LevelType[]>([]);
  const [isLost, setIsLost] = useState(false);
  const {isTimerActive, startTimer, timeLeft} = useTimer(() =>
    setAreTilesRevealed(false),
  );

  useEffect(() => {
    navigation.setOptions({headerTitle: `Level ${currentLevel}`});

    setTimeout(() => {
      revealTiles(levelStats.revealTime);
    }, getTimeUntilAllTilesShow(levelStats.width, levelStats.height));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (levelWasNotFound) {
      console.error(
        `Level ${currentLevel} was not found! Fallbacked to first level`,
      );
    }
  }, [currentLevel, levelWasNotFound]);

  const revealTiles = (time: number) => {
    setAreTilesRevealed(true);
    startTimer(time);
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
      setIsLost(true);
    }
  }, [activeHealth, navigation]);

  if (!activeTiles) {
    return <Text>Loading</Text>;
  }

  const handleEndgameAlertAndNavigation = () => {
    if (doesNextLevelExist(currentLevel)) {
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
        text: 'Go to levels list',
        onPress: () => {
          navigation.navigate(Screens.LevelsListScreen);
        },
      },
      {
        text: 'Replay!',
        onPress: () => {
          navigation.replace(Screens.LevelScreen, {level: currentLevel});
        },
      },
    ]);
  };

  const onCorrectGuess = (index: number) => {
    if (checkedTiles.includes(index)) {
      return;
    }
    setCheckedTiles([...checkedTiles, index]);
    const allActiveTilesFound = checkedTiles.length + 1 === activeTiles.length;
    if (allActiveTilesFound) {
      handleEndgameAlertAndNavigation();
    }
  };

  const onWrongGuess = (index: number) => {
    setWrongTiles([...wrongTiles, index]);
    setActiveHealth(activeHealth - 1);
    if (activeHealth > 1) {
      revealTiles(levelStats.shortRevealTime);
    }
  };

  const restartGame = () => {
    navigation.replace(Screens.LevelScreen, {level: currentLevel});
  };

  return (
    <View style={styles.container}>
      <HealthBarList
        totalHealth={levelStats?.health}
        activeHealth={activeHealth}
      />
      <View style={styles.tilesContainer}>
        <TilesList
          activeTiles={activeTiles}
          areTilesRevealed={areTilesRevealed || isLost}
          checkedTiles={checkedTiles}
          levelStats={levelStats}
          onCorrectGuess={onCorrectGuess}
          onWrongGuess={onWrongGuess}
          wrongTiles={wrongTiles}
          disabled={isLost}
        />
      </View>
      <BottomButton text="Restart" onPress={restartGame} isVisible={isLost} />
      <BottomInfo isVisible={isTimerActive} text={getFormattedTime(timeLeft)} />
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
