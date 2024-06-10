import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import axios from 'axios';
import { Buffer } from 'buffer';

const App = () => {
  const [accessToken, setAccessToken] = useState('');

  const getAccessToken = async () => {
    const consumerKey = 'GgZzJ91g5zq8URFkfquh2QDeWzYY09b7q8XJANL8QtF4SRUQ';
    const consumerSecret = 'h0R5ZC4wctZ5AoACAvFbXnmYVgzZiHajb5m8XV3DhmvThvI8MgYB3PEo1Ghh9IJB';
    const url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';

    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    
    try {
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Basic ${auth}`
        }
      });

      if (response.status === 200) {
        setAccessToken(response.data.access_token);
        Alert.alert('Access Token', response.data.access_token);
      } else {
        Alert.alert('Error', response.data);
      }
    } catch (error) {
      console.error('Error fetching access token', error);
      Alert.alert('Error', 'Failed to fetch access token');
    }
  };

  useEffect(() => {
    // Fetch the access token on component mount
    getAccessToken();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Safaricom Daraja API Access Token</Text>
      <Button title="Get Access Token" onPress={getAccessToken} />
      {accessToken ? (
        <Text style={styles.token}>Access Token: {accessToken}</Text>
      ) : (
        <Text style={styles.token}>No Access Token</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
  },
  token: {
    marginTop: 20,
    fontSize: 14,
    textAlign: 'center',
    padding: 10,
  },
});

export default Transfer;
