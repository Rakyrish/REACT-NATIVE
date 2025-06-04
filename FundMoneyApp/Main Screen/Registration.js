import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity, Modal, ActivityIndicator, Alert, Button } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export default function App({ navigation }) {
  const [errors, setErrors] = useState({});
  const [phonenumber, setphonenumber] = useState("");
  const [username, setusername] = useState('');
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
      } else {
        Alert.alert('Authentication failed', 'Please try again.');
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Authentication error:', error);
      Alert.alert('Authentication error', error.message);
    } finally {
      setLoading(false);
    }
  };

  // const handlephonenumberChange = (text) => {
  //   if (!text.startsWith("")) {
  //     setphonenumber("");
  //   } else {
  //     setphonenumber(text);
  //   }
  // };

  const validateForm = () => {
    let newErrors = {};
    if (username.length === 0) {
      newErrors.username = 'Please provide your Full Names';
    }
    if (email.length === 0) {
      newErrors.email = 'Please provide Email';
    } else if (!email.endsWith('@gmail.com')) {
      newErrors.email = 'Email must be a Gmail Address';
    }
    if (confirmPassword.length === 0) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegistrationInput = async () => {
    setLoading(true);
    if (!validateForm()) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      return;
    }
    try {
      const response = await fetch('http://127.0.0.1:8000/accounts/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          idNo,
          email,
          phonenumber,
          password,
        }),
      });
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      console.log('Response URL:', response.url);
      if (!response.ok) {
        Alert.alert('Registration failed', 'Please check your input and try again.');
        const errorData = await response.json();
        console.error('Error response data:', errorData);
        throw new Error(errorData.message || 'Registration failed');
      }
      console.log('Response received successfully');
      console.log('Response body:', response);
      
      

      
      const data = await response.json();
      if (data.success) {
        setShowSuccess(true);
        setusername('');
        setIdNo('');
        setEmail('');
        setphonenumber('+254');
        setPassword('');
        setConfirmPassword('');
      } else {
        Alert.alert('Registration failed', data.message || 'Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      Alert.alert('Registration error', error.message);
    } finally {
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

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.textInput}>Username:</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setusername}
        />
        {errors.username && <Text style={styles.textError}>{errors.username}</Text>}


        <Text style={styles.textInput}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
          textContentType="emailAddress"
          autoComplete="email"
        />
        {errors.email && <Text style={styles.textError}>{errors.email}</Text>}

        <Text style={styles.textInput}>Phone Number:</Text>
        <TextInput
          style={styles.input}
          value={phonenumber}
          onChangeText={setphonenumber}
          keyboardType="numeric"
        />
        {errors.phonenumber && <Text style={styles.textError}>{errors.phonenumber}</Text>}

        <Text style={styles.textInput}>Password:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        {errors.password && <Text style={styles.textError}>{errors.password}</Text>}

        {loading ? (
          <ActivityIndicator size="large" color="orange" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleRegistrationInput}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        )}
      </View>

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
  successContainer: {
    width: '80%',
    backgroundColor: 'green',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  successText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginBottom: 10,
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
