import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingScreen from './screens/LandingScreen';
import {Screens} from './screens/screens';

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
      {/* <Stack.Screen
        name="ChannelScreen"
        component={ChannelScreen}
        initialParams={{
          loading: true,
        }}
        options={({route}) => ({
          headerTitle: () => (
            <HeaderTitle
              membersCount={route.params.totalMembers}
              onlineMembersCount={route.params.onlineMembers}
              loading={route.params.loading || false}
            />
          ),
        })}
      /> */}
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
