import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const PermissionItem = ({ icon, title, description }) => (
  <View style={styles.permissionItem}>
    <Icon name={icon} size={30} color="#4F8EF7" style={styles.icon} />
    <View style={styles.textContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  </View>
);

export default function Loan() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Please enable these permissions on your phone.</Text>
      <PermissionItem
        icon="apps-outline"
        title="Installed Apps"
        description="We review installed applications to secure account. Data collection begins upon consent and every subsequent app launch."
      />
      <PermissionItem
        icon="person-outline"
        title="Contacts"
        description="Understanding your network helps Branch to calculate your loan offers. We will never call or message your contacts without your permission. Data collection begins upon consent and every subsequent app launch."
      />
      <PermissionItem
        icon="chatbox-ellipses-outline"
        title="SMS"
        description="Our system reviews your SMS to understand your financial history and determine your personalized loan offers. Data collection begins upon consent and every subsequent app launch."
      />
      <PermissionItem
        icon="location-outline"
        title="Location"
        description="We use your location to determine the products available in your area. Data collection begins upon consent and every subsequent app launch."
      />
      <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText}>Allow Access</Text>
      </TouchableOpacity>
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
    marginRight: 15,
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
  button: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
