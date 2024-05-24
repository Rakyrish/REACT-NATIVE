import React, { useState } from 'react';
import { View, Text, StatusBar, StyleSheet, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';

export default function AboutScreen({navigation}) {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+254");
  const [password, setPassWord] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {}; 

    if (!username) newErrors.username = "Username is Required";
    if (!email) newErrors.email = "Email is Required";
    if (!phoneNumber) {
      newErrors.phoneNumber = "Phone Number is Required";
    } else {
      const startsWith07 = phoneNumber.startsWith('07');
      const startsWith254 = phoneNumber.startsWith('+254');
      const lengthValid = startsWith07 ? phoneNumber.length === 10 : startsWith254 ? phoneNumber.length === 13 : false;

      if (!(startsWith07 || startsWith254) || !lengthValid) {
        newErrors.phoneNumber = "Phone Number must start with 07 or +254 and be the correct length";
      }
    }

    if (!password) {
      newErrors.password = "Password is Required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
       navigation.navigate('MoreOnTech')
       setEmail('')
       setPassWord('')
       setPhoneNumber('')
       setUserName('')
    } else {
      Alert.alert('Error', 'Please fill in all fields correctly');
    }
  };
  

  return (
   
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>UserName:</Text>
          <TextInput
            placeholder='Enter your UserName'
            style={styles.input}
            value={username}
            onChangeText={setUserName}
          />
          {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

          <Text style={styles.text}>Enter Email:</Text>
          <TextInput
            placeholder='Enter your E-mail'
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <Text style={styles.text}>Phone Number:</Text>
          <TextInput
            placeholder='Tel'
            style={styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType='numeric' 
          />
          {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}

          <Text style={styles.text}>Password:</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassWord}
            secureTextEntry
          />
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

          <TouchableOpacity style={styles.touchable} onPress={handleSubmit}>
            <Text style={styles.createText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
  
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  container: {
    backgroundColor: "#5f9ea0",
    paddingTop: StatusBar.currentHeight,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%',
    borderRadius: 10,
  },
  inputContainer: {
    backgroundColor: '#deb887',
    width: '90%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  touchable: {
    borderWidth: 1.5,
    padding: 10,
    borderRadius: 10,
    width: '80%',
    marginTop: 25,
    backgroundColor: "darkgrey",
  },
  createText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  }
});