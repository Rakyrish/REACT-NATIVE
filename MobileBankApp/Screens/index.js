import { useEffect } from "react";
import { View, Image, StyleSheet, StatusBar } from "react-native";

export default function StartScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Registration');
    }, 4000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Image source={require('../assets/logo.jpeg')} style={styles.logoImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});
