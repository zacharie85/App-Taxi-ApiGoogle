import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "./Screens/LoginScreens"
import HomeScreen from './Screens/HomeScreen';
import renderInitialScreen from './utils/helpers'
import * as Permissions from 'expo-permissions';

import * as Font from 'expo-font';
import PassengerScreen from './Screens/passengerScreen';
import DriverScreen from './Componants/driverScreen';

export default function App() {

  const { Navigator, Screen } = createStackNavigator();
  const [loading, setLoading] = useState(true)
  const [initialScreen, setinitialScreen] = useState("Login");

  const loadRessources = async () => {
    try {
       const result = await new Promise.all([
        await Font.loadAsync({
          "Poppins-Regular": require('./assets/fonts/Poppins-Regular.ttf'),
          "LeckerliOne-Regular": require('./assets/fonts/LeckerliOne-Regular.ttf')
        }),
       // renderInitialScreen(),
        Permissions.askAsync(Permissions.LOCATION)
       ])
          //const root = result[1];
          const status = result[1].status;
          if(status ==="granted"){
            //setinitialScreen(route)
            setLoading(false)// mise a jour su state apres que les police ai charger
          }
       
    } catch (e) {
      console.error("error for loading ressources");
    }
  };

  useEffect(() => {
    loadRessources();
  }, []);  // Tableau vide comme dependanse

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  };
  return (
    <NavigationContainer>
      <Navigator initialRouteName={initialScreen} screenOptions={{ headerShown: false }}>
        <Screen name="Login" component={LoginScreen} />
        <Screen name="Home" component={HomeScreen} />
        <Screen name="Passager" component={PassengerScreen} />
        <Screen name="Driver" component={DriverScreen} />
      </Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
