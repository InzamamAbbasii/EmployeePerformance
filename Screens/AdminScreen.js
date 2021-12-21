import React from "react";
import { View, Button, StyleSheet ,TouchableOpacity,Text,Searchbar} from "react-native";
const AdminScreen = ({ onPress, title,navigation }) => (

  <View style={styles.container}>
  <TouchableOpacity
   onPress={()=>navigation.navigate('AdminScreen')} 
   style={styles.button}>
    <Text style={styles.buttonText}>ACADEMIC Questions</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={()=>navigation.navigate('Admin')}
   style={styles.button}>
    <Text style={styles.buttonText}>ADMINISTRATIVE</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={()=>navigation.navigate('Question')}
   style={styles.button}>
    <Text style={styles.buttonText}>PROJECT </Text>
  </TouchableOpacity>
  </View>
);
const styles = StyleSheet.create({
  
  button: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 50,
    paddingHorizontal: 50,
    paddingBottom:20,
    marginBottom:20,
   
  },
  buttonText: {
    fontSize: 20,
    color: "#FFD700",
    alignContent:'center',
    fontWeight: "bold",
    fontFamily:"IndieFlower-Regular",
    
    alignSelf: "center",
    textTransform: "uppercase",
  },
  container:
  {
    flex:1,
    justifyContent:'center',
    backgroundColor:'#FFFFFF',
    paddingLeft:30,
    paddingRight:30,
    
  }  
});
export default AdminScreen;