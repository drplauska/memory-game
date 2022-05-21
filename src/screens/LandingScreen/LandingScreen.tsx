import React from 'react';
import {Text, Image, View, StyleSheet, TouchableOpacity} from 'react-native';

const LandingScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{uri: 'https://placekitten.com/g/200/300'}}
      />
      <Text style={styles.text}>Memory game</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => console.error('start')}>
        <Text style={styles.buttonText}>START</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 150,
  },
  image: {width: 200, height: 300},
  text: {fontSize: 16},
  button: {
    marginTop: 35,
    borderWidth: 1,
    borderRadius: 5,
    padding: 6,
  },
  buttonText: {fontSize: 22, color: 'blue'},
});

export default LandingScreen;
