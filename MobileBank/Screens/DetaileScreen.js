import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "@expo/vector-icons/Ionicons";
import Loan from "./Loans";
import Home from "./Home";

import Saving from "./Saving";
import Rewards from "./Rewards";

import { registerRootComponent } from 'expo';
import Transfer from './Transfer';

registerRootComponent(() => <Transfer />);


const Tab = createBottomTabNavigator();

export default function DetailScreen() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'Transfer') {
                        iconName = 'swap-horizontal';
                    } else if (route.name === 'Saving') {
                        iconName = 'business-outline';
                    }else if (route.name === 'Loan') {
                            iconName = 'cash-outline';
                        
                    } else if (route.name === 'Rewards') {
                        iconName = 'gift';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'orange',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Home" component={Home} options={{ headerShown: null }} />
            <Tab.Screen name="Transfer" component={Transfer} options={{
                headerStyle: { backgroundColor: 'rgba(0, 0, 0, 0.3)' },
                headerRight: () => (<Ionicons name='person-circle' color={"black"} size={20} />)}
            } />
            <Tab.Screen name="Saving" component={Saving} options={{
                headerStyle: { backgroundColor: 'rgba(0, 0, 0, 0.3)' },
                headerRight: () => (<Ionicons name='person-circle' color={"black"} size={20} />)}
            } />
            <Tab.Screen name="Loan" component={Loan} options={{
                headerStyle: { backgroundColor: 'rgba(0, 0, 0, 0.3)' },
                headerRight: () => (<Ionicons name='person-circle' color={"black"} size={20} />)}
            } />
            <Tab.Screen name="Rewards" component={Rewards} options={{
                headerStyle: { backgroundColor: 'rgba(0, 0, 0, 0.3)' },
                headerRight: () => (<Ionicons name='person-circle' color={"black"} size={20} />)}
            } />
        </Tab.Navigator>
    );
}
