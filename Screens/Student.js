import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
const Student=({ navigation }) =>{
    return(
<View style={styles.container}>
       <TouchableOpacity style={styles.userbtn}
            onPress={()=>navigation.navigate('SignUp')
            }>
            <Text style={styles.btnText}>Evaluated Teacher</Text>       
           </TouchableOpacity>
           <TouchableOpacity style={styles.userbtn}
            onPress={()=>navigation.navigate('SignUp')}>
            <Text style={styles.btnText}>Teacher Details</Text>       
           </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container:
    {
      flex:1,
      justifyContent:'center',
      backgroundColor:'#00FFFF',
      marginTop:'20%',
      marginBottom:'40%',
      marginLeft:20,
      marginRight:20,
      borderRadius:10,
    },
    // txtView:{
    //     flexDirection:'row',
    //     height:60,
    //     width:'90%', 
    //     marginBottom:30,
    //     marginLeft:10,
    //     borderRadius:25,
    //     alignItems:'center',
    //   },
    //   text:{
    //     flex:1,
    //     fontSize:25,
    //     marginLeft:10
    //   },
    //   input:{
    //       flexDirection:'row',
    //       fontSize:25,
    //       marginLeft:10,
    //       backgroundColor:'white',
    //       borderRadius:10,
    //       width:'50%',  
    //   },
      userbtn:{
        backgroundColor:"#FFA07A",
        padding:10,
        marginLeft:60,
        marginBottom:30,
        width:"70%",
        fontFamily:"SemiBold",
        borderRadius:25, 
      },
      btnText:{
        fontSize:25,
        textAlign:'center',
        fontFamily:"fantasy"
      }
})
export default  Student;
