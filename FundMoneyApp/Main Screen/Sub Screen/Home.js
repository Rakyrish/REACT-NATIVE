import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Alert, TextInput, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Home({navigation}) {
  const [balanceHidden, setBalanceHidden] = useState(false);
  const [balance, setBalanceMoney] = useState(0);
  const [addedAmount, setAddedMoney] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [airtimeIsModalVisible, setAirtimeModal] = useState(false)
  const [airtime, setAirtime] = useState('')

  const toggleLoan = () => {
    navigation.navigate('Loan')
  }
  const toggleSaving = () => {
    navigation.navigate('Saving')
  }
  const toggleBalanceVisibilty = () => {
    setBalanceHidden(!balanceHidden);
  };

  const handleAddMoney = () => {
    setModalVisible(true);
  };

  const handleConfirmAddMoney = () => {
    const amount = parseFloat(addedAmount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Error', 'Invalid Amount');
    } else {
      setBalanceMoney(balance + amount);
      setModalVisible(false);
      setAddedMoney('');
    }
  };
const toggleAddingAirtime = () =>{
  setAirtimeModal(true)
}
const handleBuyingAirtime = () => {
  const amount = parseFloat(airtime);
  if (isNaN(amount) || amount <= 0) {
    Alert.alert('Error', 'Invalid Amount');
  } 
  if (balance < amount){
    Alert.alert('Error', 'You have less balance Amount in your Account')
  }
  else {
    setBalanceMoney(balance - amount);
    setAirtimeModal(false);
    setAirtime('');
    Alert.alert(`successfully, bought airtime of ${amount}`)
  }
};
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.balanceContainer}>
          <TouchableOpacity onPress={toggleBalanceVisibilty}>
            {!balanceHidden ? (
              <Text style={styles.hideBalanceText}>Hide Balance</Text>
            ) : (
              <Text style={styles.hideBalanceText}>Show Balance</Text>
            )}
          </TouchableOpacity>
          {!balanceHidden ? (
            <Text style={styles.balanceText}>Ksh {balance}</Text>
          ) : (
            <Text style={styles.balanceText}>****</Text>
          )}
          <TouchableOpacity style={styles.addButton} onPress={handleAddMoney}>
            <Text style={styles.addButtonText}>Add Money</Text>
          </TouchableOpacity>
          <Modal visible={isModalVisible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Enter Amount</Text>
                <TextInput
                  placeholder="Enter Amount"
                  keyboardType="numeric"
                  value={addedAmount}
                  style={styles.modalInput}
                  onChangeText={setAddedMoney}
                />
                <TouchableOpacity onPress={handleConfirmAddMoney} style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
            </Modal>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.iconContainer}>
              <Ionicons name="home-outline" size={30} color="white" />
            </View>
            <Text style={styles.actionText}>Wallet Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={toggleAddingAirtime}>
            <View style={styles.iconContainer}>
              <Ionicons name="phone-portrait-outline" size={30} color="white" />
            </View>
            <Text style={styles.actionText}>Buy Airtime</Text>
          </TouchableOpacity>
          <Modal visible={airtimeIsModalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Enter Amount</Text>
                <TextInput
                  placeholder="Enter Amount"
                  keyboardType="numeric"
                  value={airtime}
                  style={styles.modalInput}
                  onChangeText={setAirtime}
                />
                <TouchableOpacity style={styles.modalButton} onPress={handleBuyingAirtime}>
                  <Text style={styles.modalButtonText}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setAirtimeModal(false)} style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.iconContainer}>
              <Ionicons name="receipt-outline" size={30} color="white" />
            </View>
            <Text style={styles.actionText}>Bill Payments</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.iconContainer}>
              <Ionicons name="cash-outline" size={30} color="white" />
            </View>
            <Text style={styles.actionText}>Lipa Na Mpesa</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.accountsContainer}>
          <View style={styles.account}>
            <Text style={styles.accountTitle}>Savings</Text>
            {!balanceHidden ? <Text style={styles.balanceText}>Ksh 0</Text> : <Text style={styles.balanceText}>****</Text>}
            <TouchableOpacity style={styles.addButton} onPress={toggleSaving}>
              <Text style={styles.accountButtonText}>Savings</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.account}>
            <Text style={styles.accountTitle}>Loan</Text>
            {!balanceHidden ? <Text style={styles.balanceText}>Ksh 0</Text> : <Text style={styles.balanceText}>****</Text>}
            <TouchableOpacity style={styles.accountButton} onPress={toggleLoan}>
              <Text style={styles.accountButtonText}>Apply Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.referralContainer}>
          <Text style={styles.referralText}>Earn Ksh 250 when your friend repays their loan</Text>
          <TouchableOpacity>
            <Text style={styles.referralButton}>Refer and Earn</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: StatusBar.currentHeight,
    
  },
  balanceContainer: {
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
  },
  hideBalanceText: {
    color: "#007BFF",
    marginBottom: 10,
  },
  balanceText: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: "orange",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  addButtonText: {
    color: "white",
    fontSize: 18,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
    paddingVertical: 20,
    marginBottom: 20,
  },
  actionButton: {
    alignItems: "center",
  },
  actionText: {
    marginTop: 5,
    fontSize: 12,
  },
  iconContainer: {
    backgroundColor: '#ffa570',
    borderRadius: 50,
    padding: 15,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 10,
    marginBottom: 10,
  },
  account: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
    elevation: 5,
  },
  accountTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  accountBalance: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  accountButton: {
    backgroundColor: "orange",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  accountButtonText: {
    color: "white",
    fontSize: 16,
  },
  referralContainer: {
    backgroundColor: "#FFF5E1",
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  referralText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  referralButton: {
    color: "#007BFF",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

