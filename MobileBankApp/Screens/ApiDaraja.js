import axios from 'axios';
import { Buffer } from 'buffer';

// Consumer Key and Consumer Secret from your Safaricom Developer account
const consumerKey = 'GgZzJ91g5zq8URFkfquh2QDeWzYY09b7q8XJANL8QtF4SRUQ';
const consumerSecret = 'h0R5ZC4wctZ5AoACAvFbXnmYVgzZiHajb5m8XV3DhmvThvI8MgYB3PEo1Ghh9IJB';

// Base64 encode the consumer key and consumer secret
const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

// URL to obtain the access token
const tokenUrl = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';

// Function to get access token
export const getAccessToken = async () => {
  try {
    const response = await axios.get(tokenUrl, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching access token', error);
    throw error;
  }
};

// Function to initiate STK Push
export const initiateSTKPush = async (accessToken, phoneNumber, amount = 1) => {
  const url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
  const shortCode = '174379'; // Replace with your Paybill or Till Number
  const passkey = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'; // Your Passkey
  const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString('base64');

  const payload = {
    BusinessShortCode: shortCode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: 'CustomerPayBillOnline',
    Amount: amount,
    PartyA: phoneNumber,
    PartyB: shortCode,
    PhoneNumber: phoneNumber,
    CallBackURL: 'https://mydomain.com/callback',
    AccountReference: 'BalanceCheck',
    TransactionDesc: 'Balance Check',
  };

  try {
    const response = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('STK Push Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error initiating STK Push', error);
    throw error;
  }
};
