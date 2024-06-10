import React from 'react';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Registration from './Screens/Registration';
import DetailScreen from './Screens/DetaileScreen';
import StartScreen from  './Screens/StartScreen';





const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartScreen">
      <Stack.Screen name="Start" component={StartScreen}  options={{headerShown: false}}/>
        <Stack.Screen name="Registration" component={Registration} options={{headerShown: false}}  />
        <Stack.Screen name="DetailScreen" component={DetailScreen} options={{headerShown: false}}/>
        
                
      </Stack.Navigator>
    </NavigationContainer>
  );
}
