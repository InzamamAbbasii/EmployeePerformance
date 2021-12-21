import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { StackRouter } from 'react-navigation'
import App from './App'
import Login from './Screens/Login'
import Drawer from './Drawer'
import AdminDashboard from './Screens/AdminDashboard'
const Stack = createNativeStackNavigator();

const NavigationMain = ({navigation}) => {
    return (
            <NavigationContainer>
              <Stack.Navigator>
              <Stack.Screen   name= "Login"  component={Login} 
              options = {{headerShown:false,}}/>
                  <Stack.Screen   name= "Drawer"  component={Drawer} options= {{headerShown:false,}}/>
                  <Stack.Screen   name= "App"  component={App} />
                  <Stack.Screen name="AdminDashboard" component = {AdminDashboard}/>
              </Stack.Navigator>
            </NavigationContainer>
    )
}

export default NavigationMain

const styles = StyleSheet.create({})