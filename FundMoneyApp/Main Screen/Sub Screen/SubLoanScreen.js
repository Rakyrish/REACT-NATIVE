import React from 'react';
import { StatusBar, View, TextInput, Text, ScrollView, StyleSheet } from 'react-native';

const InputItem = ({ label, textinput }) => (
  <View style={styles.inputsContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput style={styles.inputs} placeholder={textinput} />
  </View>
);

export default function SubLoanScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputWrapper}>
        <InputItem label="Label 1" textinput="Enter text 1" />
        <InputItem label="Label 2" textinput="Enter text 2" />
        <InputItem label="Label 3" textinput="Enter text 3" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: StatusBar.currentHeight,
    backgroundColor: '#fff',
  },
  inputWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 20,
  },
  inputsContainer: {
    marginBottom: 15,
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputs: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'gray',
    width: '100%',
    padding: 10,
  },
});
