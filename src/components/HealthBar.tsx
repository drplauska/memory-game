import React from 'react';
import {View} from 'react-native';
import {StyleSheet} from 'react-native';

interface HealthBarProps {
  isOn: boolean;
}

const HealthBar = ({isOn}: HealthBarProps) => {
  return (
    <View
      style={[
        styles.healthBar,
        isOn ? styles.healthBarOn : styles.healthBarOff,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  healthBar: {width: 20, height: 30},
  healthBarOff: {backgroundColor: 'gray'},
  healthBarOn: {backgroundColor: 'green'},
});

export default HealthBar;
