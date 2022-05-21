import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import HealthBar from './HealthBar';
import Separator from './Separator';

interface HealthBarListProps {
  totalHealth: number;
  activeHealth: number;
}

const HealthBarList = ({totalHealth, activeHealth}: HealthBarListProps) => {
  const healthBars = Array(totalHealth).fill(null);

  return (
    <View>
      <FlatList
        data={healthBars}
        renderItem={({index}) => (
          <HealthBar key={index} isOn={index < activeHealth} />
        )}
        horizontal
        ItemSeparatorComponent={Separator}
        contentContainerStyle={styles.healthBarList}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  healthBarList: {
    justifyContent: 'center',
    width: '100%',
    paddingTop: 10,
  },
});

export default HealthBarList;
