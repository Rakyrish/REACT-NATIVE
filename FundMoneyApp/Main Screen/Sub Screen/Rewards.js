import React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

export default function Reward() {
    return (
        <View style={styles.container}>
            <View style={styles.RewardContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Rewards</Text>
            </View>
            <View style={styles.balanceContainer}>
                <Text style={styles.balanceText}>Ksh 0</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Enter Invite Code</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>View History</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ff',
        paddingTop: StatusBar.currentHeight,
        borderRadius: 10,
        padding: 20
    },
    RewardContainer: {
        borderRadius: 15,
        padding: 20,
        elevation: 5,
        backgroundColor: 'white'
    },
    headerContainer: {
        padding: 15,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    balanceContainer: {
        margin: 20,
        alignItems: 'center',
    },
    balanceText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 10,
        marginTop: 10,
        padding: 10,
    },
    button: {
        backgroundColor: '#FFa500',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
