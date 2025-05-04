import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LoginScreen from './src/loginScreen/LoginScreen'
import Profile from './src/loginScreen/Profile'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Dashborad from './src/Dashboard/Dashboard'



const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <GestureHandlerRootView style={{flex:1}}>

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component= {LoginScreen}/>
      <Stack.Screen name="Profile" component= {Profile}/>
      <Stack.Screen name="Dashboard" component= {Dashborad}/>
      
      </Stack.Navigator>
    
    </NavigationContainer>
    </GestureHandlerRootView>
  )
}

export default App

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#fff"
  }
})