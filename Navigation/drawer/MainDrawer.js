import React  from 'react'
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator, } from '@react-navigation/native-stack';
import Animated, { Transition } from 'react-native-reanimated';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useTransitionProgress } from 'react-native-screens';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const Screens = ({style})=>{
  return(
    <Stack.Navigator
    initialRouteName = {'homestack'}
    screenOptions = {{headerShown:false,
    animationEnabled:true,
    ...Pa}}>
      
    </Stack.Navigator>
  )
}


function DrawerNav(props) {
  return (
    <Drawer.Navigator
      screenOptions = {{headerShown:false}}
      unmountimactiveRoutes ={false}
      initialRouteName = "HomeStack"
      drawerContent = {(props)=>{return <CustomDrawerContent {...props}/>}}
      drawerType ='slide'>
        <Drawer.Screen name = 'Screens'></Drawer.Screen>
      
      </Drawer.Navigator>

     
   
  )
}

export default DrawerNav