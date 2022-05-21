import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingScreen from './screens/LandingScreen';
import {Screens} from './screens/screens';
import LevelsListScreen from 'screens/LevelsListScreen';

export type RootStackParamList = {
  [Screens.LandingScreen]: undefined;
  [Screens.LevelsListScreen]: undefined;
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
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
