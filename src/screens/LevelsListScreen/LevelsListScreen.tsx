import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Block from 'components/Block';
import {RootStackParamList} from 'MainStackNavigator';
import React from 'react';
import {FlatList, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Screens} from 'screens/screens';
import styleHelpers from 'styles/styleHelpers';

const levels = [{level: 1}, {level: 2}, {level: 3}, {level: 4}];

type LevelsListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  Screens.LevelsListScreen
>;

const LevelsListScreen = ({navigation}: LevelsListScreenProps) => {
  return (
    <View style={styleHelpers.flex1}>
      <FlatList
        data={levels}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(Screens.LandingScreen);
            }}>
            <Block level={item.level} />
          </TouchableOpacity>
        )}
        numColumns={2}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        columnWrapperStyle={styles.columnWrapperStyle}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {height: 20},
  columnWrapperStyle: {justifyContent: 'space-evenly'},
  flatList: {paddingTop: 20},
});

export default LevelsListScreen;
