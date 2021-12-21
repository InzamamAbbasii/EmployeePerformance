import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
const Home =(props) =>{
    return(
        <SafeAreaView
        style = {{flex:1, justifyContent: 'center', alignItems:'center'}}>
            <Text>HomeScreen</Text>
        </SafeAreaView>
    );
};
export default Home;