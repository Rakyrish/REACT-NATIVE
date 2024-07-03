import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity, Modal, ActivityIndicator, Alert, Button } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export default function App({ navigation }) {
  const [showPrompt, setShowPrompt] = useState(true);
  const [errors, setErrors] = useState({});
  const [phoneNumber, setPhoneNumber] = useState("+254");
  const [fullNames, setFullNames] = useState('');
  const [email, setEmail] = useState('');
  const [idNo, setIdNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkDeviceForHardware();
  }, []);

  useEffect(() => {
    let timer;
    if (showSuccess) {
      timer = setTimeout(() => {
        navigation.navigate('DetailScreen');
        setShowSuccess(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showSuccess, navigation]);

  const checkDeviceForHardware = async () => {
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      if (!compatible) {
        Alert.alert('Error', 'This device is not compatible with biometric authentication.');
        setLoading(false);
        return;
      }
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      if (!enrolled) {
        Alert.alert('Error', 'No biometric authentication methods are enrolled.');
        setLoading(false);
        return;
      }
      authenticate();
    } catch (error) {
      console.error('Error checking for hardware or enrollment:', error);
      setLoading(false);
    }
  };

  const authenticate = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate',
        fallbackLabel: 'Use Passcode',
        disableDeviceFallback: false,
      });
      if (result.success) {
        setIsAuthenticated(true);
        setShowPrompt(true); 
      } else {
        Alert.alert('Authentication failed', 'Please try again.');
        setIsAuthenticated(true);
        setShowPrompt(true); 
      }
    } catch (error) {
      console.error('Authentication error:', error);
      Alert.alert('Authentication error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = () => {
    let newErrors = {};
    if (phoneNumber.length < 13) {
      newErrors.phoneNumber = 'Invalid number';
    } else {
      setShowPrompt(false);
    }
    setErrors(newErrors);
  };

  const handlePhoneNumberChange = (text) => {
    if (!text.startsWith("+254")) {
      setPhoneNumber("+254");
    } else {
      setPhoneNumber(text);
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (fullNames.length === 0) {
      newErrors.fullNames = 'Please provide your Full Names';
    }
    if (idNo.length === 0) {
      newErrors.idNo = 'Please provide ID number';
    }
    if (email.length === 0) {
      newErrors.email = 'Please provide Email';
    } else if (!email.endsWith('@gmail.com')) {
      newErrors.email = 'Email must be a Gmail Address';
    }
    if (password.length === 0) {
      newErrors.password = 'Please Provide Password';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (confirmPassword.length === 0) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegistrationInput = () => {
    setLoading(true);
    if (!validateForm()) {
      setTimeout(() => {
        setLoading(false);
        setFullNames('');
        setIdNo('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setShowSuccess(true);
      }, 2000);
    } else {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        
      </View>
    );
  }

  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Authentication required</Text>
        <Button title="Retry" onPress={authenticate} />
      </View>
    );
  }
  else{

  return (
    <View style={styles.container}>
      <Modal
        visible={showPrompt}
        transparent={true}
        onRequestClose={() => setShowPrompt(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.promptContainer}>
            <Text style={styles.textPrompt}>Please provide Phone Number to Continue</Text>
            <TextInput
              style={styles.inputPrompt}
              value={phoneNumber}
              onChangeText={handlePhoneNumberChange}
              keyboardType="numeric"
            />
            {errors.phoneNumber && <Text style={styles.textError}>❗{errors.phoneNumber}</Text>}
            <TouchableOpacity style={styles.button} onPress={handleVerify}>
              <Text style={styles.buttonText}>Verify</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {!showPrompt && (
        <View style={styles.inputContainer}>
          <Text style={styles.textInput}>Full Names:</Text>
          <TextInput
            style={styles.input}
            value={fullNames}
            onChangeText={setFullNames}
          />
          {errors.fullNames && <Text style={styles.textError}>{errors.fullNames}</Text>}

          <Text style={styles.textInput}>ID Number:</Text>
          <TextInput
            style={styles.input}
            value={idNo}
            onChangeText={setIdNo}
            keyboardType='numeric'
          />
          {errors.idNo && <Text style={styles.textError}>{errors.idNo}</Text>}

          <Text style={styles.textInput}>Email:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            textContentType="emailAddress"
            keyboardType="email-address"
          />
          {errors.email && <Text style={styles.textError}>{errors.email}</Text>}

          <Text style={styles.textInput}>Password:</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          {errors.password && <Text style={styles.textError}>{errors.password}</Text>}

          <Text style={styles.textInput}>Confirm Password:</Text>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          {errors.confirmPassword && <Text style={styles.textError}>{errors.confirmPassword}</Text>}

          {loading ? (
            <ActivityIndicator size="large" color="orange" />
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleRegistrationInput}>
              <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <Modal
        visible={showSuccess}
        transparent={true}
        onRequestClose={() => setShowSuccess(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.successContainer}>
            <Text style={styles.successText}>Registration Successful!</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    justifyContent: 'center',
    backgroundColor: 'aliceblue',
  },
  inputContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 20,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  textInput: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
    marginBottom: 5,
  },
  button: {
    backgroundColor: 'orange',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
    elevation: 5,
    width: 100,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  promptContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  successContainer: {
    width: '80%',
    backgroundColor: 'green',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  textPrompt: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'gray',
  },
  successText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginBottom: 10,
  },
  inputPrompt: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    margin: 15,
    width: '100%',
    padding: 10,
  },
  textError: {
    color: 'red',
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    margin: 20,
    textAlign: 'center',
  },
});
