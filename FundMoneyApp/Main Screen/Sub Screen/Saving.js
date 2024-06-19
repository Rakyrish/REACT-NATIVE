import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as Contacts from 'expo-contacts';
import * as SMS from 'expo-sms';

const PermissionItem = ({ icon, title, description, onPress, imageUri }) => (
  <View style={styles.permissionItem}>
    <TouchableOpacity onPress={onPress}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.icon} />
      ) : (
        <Icon name={icon} size={30} color="#4F8EF7" style={styles.icon} />
      )}
    </TouchableOpacity>
    <View style={styles.textContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  </View>
);

export default function App() {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (error) {
        setErrorMsg('Error fetching location: ' + error.message);
      }
    })();
  }, []);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access media library is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera is required!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleContactsPress = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Emails],
      });

      if (data.length > 0) {
        const contact = data[60];
        console.log('Contact:', contact);
        Alert.alert('Contact Information', `Name: ${contact.name} \nEmail: ${contact.emails} `);
      }
    } else {
      Alert.alert('Permission Denied', 'Permission to access contacts was denied.');
    }
  };

  const handleSMSPress = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
     
      const { result } = await SMS.sendSMSAsync(
        ['0717701558'],
        'My sample HelloWorld message',
        {
          attachments: {
            uri: 'path/myfile.png',
            mimeType: 'image/png',
            filename: 'myfile.png',
          },
        }
      );
      console.log('SMS Result:', result);
    } else {
      Alert.alert('SMS Not Available', 'SMS functionality is not available on this device.');
    }
  };

  const handlePress = () => {
    Alert.alert(
      'Add Photo',
      'Choose an option',
      [
        { text: 'Take Photo', onPress: takePhoto },
        { text: 'Pick Image', onPress: pickImage },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Please enable these permissions on your phone.</Text>
      <Text style={styles.header}>Press Each Section to Enable</Text>
      <PermissionItem
        icon="camera"
        title="PassPort"
        description="We review installed applications to secure account. Data collection begins upon consent and every subsequent app launch."
        onPress={handlePress}
        imageUri={image}
      />
      <PermissionItem
        icon="person-outline"
        title="Contacts"
        description="Understanding your network helps Branch to calculate your loan offers. We will never call or message your contacts without your permission. Data collection begins upon consent and every subsequent app launch."
        onPress={handleContactsPress}
      />
      <PermissionItem
        icon="chatbox-ellipses-outline"
        title="SMS"
        description="Our system reviews your SMS to understand your financial history and determine your personalized loan offers. Data collection begins upon consent and every subsequent app launch."
        onPress={handleSMSPress}
      />
      <PermissionItem
        icon="location-outline"
        title="Location"
        description="We use your location to determine the products available in your area. Data collection begins upon consent and every subsequent app launch."
      />
      {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  permissionItem: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    elevation: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 15,
    borderRadius: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    marginTop: 10,
  },
});
