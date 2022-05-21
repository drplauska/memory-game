import Block from 'components/Block';
import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';

const levels = [{level: 1}, {level: 2}, {level: 3}, {level: 4}];

const LevelsListScreen = () => {
  return (
    <View>
      <FlatList
        data={levels}
        renderItem={({item}) => <Block level={item.level} />}
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
  flatList: {marginTop: 20},
});

export default LevelsListScreen;
