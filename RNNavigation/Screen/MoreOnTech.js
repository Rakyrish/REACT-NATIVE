import React, {useState} from 'react'
// import { View } from 'react-native'
// import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Orders from "./Orders"
import Settings from "./Settings"
import Payment from './Payment'
import Ionicons from "@expo/vector-icons/Ionicons"

const Tab = createBottomTabNavigator();
export default  function MoreOnTech () {
    return(
        
        <Tab.Navigator screenOptions={{headerStyle:{
            backgroundColor: 'aqua', 
           
        }} }>
        <Tab.Screen name="Settings" component={Settings} options={{tabBarIcon: (color, size) => <Ionicons name='settings' color={"black"} size={20}/>}} /> 
        <Tab.Screen name="Payment" component={Payment} options={{tabBarIcon: (color, size) => <Ionicons name='wallet'color={"hotpink"} size={20}/> }}/>
        <Tab.Screen name="Orders" component={Orders}  options={{tabBarIcon: (color, size) => <Ionicons name='list' color={"orange"} size={20}/>}} />
        </Tab.Navigator>
       
    )
}