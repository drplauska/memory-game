import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingScreen from './screens/LandingScreen';
import {Screens} from './screens/screens';
import LevelsListScreen from 'screens/LevelsListScreen';
import LevelScreen from 'screens/LevelScreen';
import {LevelType} from 'types';

export type RootStackParamList = {
  [Screens.LandingScreen]: undefined;
  [Screens.LevelsListScreen]: undefined;
  [Screens.LevelScreen]: {level: LevelType};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{}}
      initialRouteName={Screens.LandingScreen}>
      <Stack.Screen
        name={Screens.LandingScreen}
        component={LandingScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={Screens.LevelsListScreen}
        component={LevelsListScreen}
        options={{headerTitle: 'Levels'}}
      />
      <Stack.Screen
        name={Screens.LevelScreen}
        component={LevelScreen}
        options={{headerTitle: 'Level ...'}}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
