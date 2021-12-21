import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native' 
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer'
import Login from './Screens/Login'
import SignUp from './Screens/SignUp'
import Settings from './Screens/Settings'
import AdminDashboard from './Screens/AdminDashboard'

const Drawer = ({navigatioin}) => {
    const Drawer = createDrawerNavigator();
    return (
             <View style={{flex:1}}>
              <Drawer.Navigator initialRouteName="Home">
                {/* <Drawer.Screen name="Login" component={Login} /> */}
                <Drawer.Screen name="AdminDashboard" component={AdminDashboard}/>
                <Drawer.Screen name="SignUp" component={SignUp} />
                <Drawer.Screen name="Settings" component={Settings} />
                <Drawer.Screen name="Logout" component={Login} 
                options = {{headerShown:false}}/>
              </Drawer.Navigator>       
                </View>
    )
}
export default Drawer
const styles = StyleSheet.create({

})