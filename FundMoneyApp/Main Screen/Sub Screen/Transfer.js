import React, { useState } from 'react';
import { View, Alert, TextInput, StyleSheet, StatusBar, TouchableOpacity, Text, ScrollView, Modal } from 'react-native';
import axios from 'axios';
import base64 from 'base-64';
import Ionicons from '@expo/vector-icons/Ionicons';

const DEPOSIT_URL = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'; 
const CONSUMER_KEY = 'GgZzJ91g5zq8URFkfquh2QDeWzYY09b7q8XJANL8QtF4SRUQ'; 
const CONSUMER_SECRET = 'h0R5ZC4wctZ5AoACAvFbXnmYVgzZiHajb5m8XV3DhmvThvI8MgYB3PEo1Ghh9IJB'; 
const SHORTCODE = '174379'; 
const PASSKEY = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'; 
const CALLBACK_URL = 'http://192.168.100.219:3000/callback';

const getToken = async () => {
    const auth = base64.encode(`${CONSUMER_KEY}:${CONSUMER_SECRET}`);
    try {
        const response = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
            headers: {
                Authorization: `Basic ${auth}`,
            },
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching token', error);
        throw error;
    }
};

const initiateStkPush = async (phone, amount) => {
    const token = await getToken();
    const timestamp = new Date().toISOString().replace(/[-:T.]/g, "").slice(0, 14); 
    console.log(`Timestamp: ${timestamp}`);
    const password = base64.encode(SHORTCODE + PASSKEY + timestamp);
    console.log(`Encoded Password: ${password}`);

    const payload = {
        BusinessShortCode: SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerBuyGoodsOnline',
        Amount: amount,
        PartyA: phone,
        PartyB: SHORTCODE, 
        PhoneNumber: phone,
        CallBackURL: CALLBACK_URL,
        AccountReference: 'VMXBQZQ',
        TransactionDesc: 'Test',
    };

    console.log('Payload:', JSON.stringify(payload, null, 2));

    try {
        const response = await axios.post(DEPOSIT_URL, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error initiating STK Push', error.response ? error.response.data : error.message);
        throw error;
    }
};

const Transfer = () => {
    const [phone, setPhone] = useState('254');
    const [amount, setAmount] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const toggleModalVisibility = () =>{
      setModalVisible(true)
    }

    const handleDepositNow = async () => {
        if (!phone || !amount) {
            Alert.alert('Error', 'Please enter both phone number and amount');
            return;
        }

        try {
            const result = await initiateStkPush(phone, amount);
            setModalVisible(true);
        } catch (error) {
            Alert.alert('Error', `Failed to initiate STK Push: ${error.message}`);
        }
    };

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Transfer</Text>
          </View>
          <View style={styles.searchContainer}>
            <Ionicons name='search' size={20} color='gray' style={styles.searchIcon} />
            <TextInput 
              style={styles.searchInput}
              placeholder="Search Account Name or Number" 
              placeholderTextColor="gray"
            />
          </View>
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.iconContainer}>
                <Ionicons name="link-outline" size={30} color="white" />
              </View>
              <Text style={styles.actionText}>Request Money</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.iconContainer}>
                <Ionicons name="person-circle-outline" size={30} color="white" />
              </View>
              <Text style={styles.actionText}>Manage Beneficiaries</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton} onPress={toggleModalVisibility}>
              <View style={styles.iconContainer}>
                <Ionicons name="home-outline" size={30} color="white" />
              </View>
              <Text style={styles.actionText}>Send to Daraja sandbox</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.iconContainer}>
                <Ionicons name="call-outline" size={30} color="white" />
              </View>
              <Text style={styles.actionText}>Send to Phone No</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              
            <Text style={styles.modalText}>STK Push initiated. Please check your phone to complete the transaction.</Text>
              <TextInput 
              value={phone} 
              onChangeText={setPhone}
              placeholder='Enter Phone number'
              style={styles.phoneInput}
              keyboardType='numeric'
              />  
              <TextInput 
              value={amount} 
              onChangeText={setAmount}
              placeholder='Amount'
              style={styles.AmountInput}
              keyboardType='numeric'
              />  
              <TouchableOpacity style={styles. addButton} onPress={handleDepositNow}>
              <Text style={styles.addButtonText}>DEPOSIT</Text>
            </TouchableOpacity>
          
              <TouchableOpacity style={styles. addButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.addButtonText}>CLOSE</Text>
            </TouchableOpacity>
            
            </View>
          </View>
        </Modal>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: StatusBar.currentHeight
  },
  input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 12,
      paddingHorizontal: 8,
      width: '80%',
  },
  headerContainer: {
    padding: 15,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 15,
    padding: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  actionButton: {
    alignItems: 'center',
    width: 90,
  },
  iconContainer: {
    backgroundColor: '#ffa500',
    borderRadius: 50,
    padding: 15,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    fontSize: 12,
    textAlign: 'center',
  },
  
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  phoneInput: {
    padding: 5,
    borderWidth: 2,
    borderRadius: 5,
     margin: 10,
    width: '100%'
  },
  AmountInput: {
    padding: 5,
    borderWidth: 2,
    borderRadius: 5,
     margin: 10,
    width: '100%'
  },
  addButton: {
    backgroundColor: "orange",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 5
  },
  addButtonText: {
    color: "white",
    fontSize: 18,
  },
});

export default Transfer;
 
