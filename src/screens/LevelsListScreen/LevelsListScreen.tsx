import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Block from 'components/Block';
import Separator from 'components/Separator';
import {levels} from 'levels';
import {RootStackParamList} from 'MainStackNavigator';
import React from 'react';
import {FlatList, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Screens} from 'screens/screens';
import styleHelpers from 'styles/styleHelpers';

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
              navigation.navigate(Screens.LevelScreen, {level: item.level});
            }}>
            <Block level={item.level} />
          </TouchableOpacity>
        )}
        numColumns={2}
        ItemSeparatorComponent={Separator}
        columnWrapperStyle={styles.columnWrapperStyle}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  columnWrapperStyle: {justifyContent: 'space-evenly'},
  flatList: {paddingTop: 20},
});

export default LevelsListScreen;
