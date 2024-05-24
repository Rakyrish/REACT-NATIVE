import React from 'react';
import { View, Text, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={style.container}>
      <Text style={style.textAbove}>PJ TECH</Text>
      <Text style={style.textBelow}>
        Welcome:
      </Text>
      <Text style={style.textBelow}>
        Join us on this exciting journey as we shape the future, one innovative solution at a time.
      </Text>
      <TouchableOpacity 
        style={style.button} 
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={style.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: '#faebd7',
    paddingTop: StatusBar.currentHeight,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  textAbove: {
    fontSize: 70,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  textBelow: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  }
});
