import HomeScreen from './Screen/HomeScreen';
import AboutScreen from './Screen/AboutScreens';
import MoreOnTech from './Screen/MoreOnTech';
import { StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
     <StatusBar backgroundColor="purple" />
    <NavigationContainer >
      <Stack.Navigator  screenOptions={{headerStyle:{
            backgroundColor: '#ded887'},
            headerTintColor: 'black'
            }}   >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Enjoy our sales, best in  EastAfrica" }} />
        <Stack.Screen name="Register" component={AboutScreen} />
        <Stack.Screen name='MoreOnTech' component={MoreOnTech} options={{ title: "Enjoy our sales, best in  EastAfrica" }} />
      </Stack.Navigator>
    </NavigationContainer>
   
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    
  },
  
})