import React from "react";
import { View, SafeAreaView, Button, StyleSheet ,TouchableOpacity,Text,Searchbar} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { TouchableHighlight } from "react-native-gesture-handler";

const Settings=({ navigation }) =>{
return(
<View style={styles.container}>
  <TouchableOpacity
   onPress={()=>navigation.navigate('Kpi')} 
   style={styles.button}>
    <Text style={styles.buttonText}>KPI Weightage</Text>
  </TouchableOpacity>
  <TouchableOpacity 
   onPress={()=>navigation.navigate('Mcqs')}
   style={styles.button}>
    <Text style={styles.buttonText}>MCQS WEIGHTAGE</Text>
  </TouchableOpacity>
  <TouchableOpacity
   onPress={()=>navigation.navigate('Category')} 
   style={styles.button}>
     
    <Text style={styles.buttonText}>Add New Metric</Text>
  </TouchableOpacity>
  {/* <View style={styles.bottomtab}>
    <View>
      <TouchableOpacity   //bottom-tab using vector
      onPress= {()=>navigation.navigate('Login')}>
        <Icon name="home" size={25} style={styles.iconstyle} color="#900" />
      </TouchableOpacity>  
      <Text style={styles.icontxt}>Home</Text>
  </View>
  <View>
  <TouchableOpacity
        onPress= {()=>navigation.navigate('Category')}>
        <Feather name = "users" size={25} color="#900"/>
    </TouchableOpacity>
    <Text style={styles.icontxt}>Profile</Text>  
  </View>
  <View>
  <TouchableOpacity
    onPress= {()=>navigation.navigate('Settings')}>
    <Feather name = "settings" size={25} style={styles.iconstyle} color="#900" />
    </TouchableOpacity>
  <Text style={styles.icontxt}>Settings</Text>
  </View>
  
  
  
  
  </View> */}
  </View>
  );
};
const styles = StyleSheet.create({
    container:
    {
      flex:1,
      justifyContent:'center',
      backgroundColor:'#fff',
      padding:10,
    }, 
     button: {
      backgroundColor: "#000",
      borderRadius: 30,
      height:120,
      marginHorizontal:10,
      justifyContent:'center',
      marginVertical:10,
    },
    buttonText: {
      fontSize: 20,
      color: "#FFFFFF",
      alignContent:'center',
      fontWeight: "bold",
      fontFamily:'',
      fontStyle: 'italic',
      alignSelf: "center",
      textTransform: "uppercase",
      marginBottom:10
    },
    bottomtab:{
        marginTop:'40%',
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'white',
        borderRadius:10,
        width:'100%',
        padding:5,
        alignItems:'stretch'
    },
    icontxt:{
      fontSize:15,
      color:'black',
      alignItems:'center',
    },
    iconstyle:{
      paddingRight:10,
    }  
  })
export default Settings;