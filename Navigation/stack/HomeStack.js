import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet,View,Text,Image,TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import HomePage from '../../Screens/HomePage';
const Stack = createNativeStackNavigator();
const HomeStack =(navigation) => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
            <Stack.Screen name = {'HomePage'}
            component = {HomePage}
            options = {{}}/>
        </Stack.Navigator>

        </NavigationContainer>
     );
};

export default HomeStack
