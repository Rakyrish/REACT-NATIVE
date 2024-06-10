import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, ScrollView } from 'react-native';

export default function LoanForm() {
  const [fullName, setFullName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [dob, setDob] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (fullName && idNumber && dob) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [fullName, idNumber, dob]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerText}>My Loans</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.instructionText}>
          Before we offer you a loan, we need a few pieces of information.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Full Legal Name"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          style={styles.input}
          placeholder="National ID Number"
          value={idNumber}
          onChangeText={setIdNumber}
          keyboardType='numeric'
        />
        <TextInput
          style={styles.input}
          placeholder="Date of Birth (as per National ID)"
          value={dob}
          onChangeText={setDob}
        />
        <Text style={styles.agreementText}>
          By tapping Continue you agree to Branch's Terms of Use and Loan Account Agreement
        </Text>
        <TouchableOpacity
          style={[styles.continueButton, isButtonDisabled ? styles.disabledButton : styles.enabledButton]}
          disabled={isButtonDisabled}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 16,
  },
  instructionText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  agreementText: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 20,
    textAlign: 'center',
  },
  continueButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  disabledButton: {
    backgroundColor: 'grey',
  },
  enabledButton: {
    backgroundColor: 'orange',
  },
});
