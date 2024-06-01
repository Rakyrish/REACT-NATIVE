import React from 'react';
import { View, TextInput, StyleSheet, StatusBar, TouchableOpacity, Text, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Transfer() {
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
          
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.iconContainer}>
              <Ionicons name="home-outline" size={30} color="white" />
            </View>
            <Text style={styles.actionText}>Send to Bank</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.iconContainer}>
              <Ionicons name="call-outline" size={30} color="white" />
            </View>
            <Text style={styles.actionText}>Send to Phone No</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight,
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
});
