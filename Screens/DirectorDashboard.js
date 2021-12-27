import React from 'react'
import { StyleSheet, Text, ImageBackground, TouchableOpacity, View } from 'react-native'
const DirectorDashboard = ({ navigation,route }) => {
  return (
    <ImageBackground source={require('../assets/Images/background.png')} resizeMode="cover" style={styles.container}>
      <View style={styles.innerView}>
        <View style={styles.texttop}>
          <Text style={styles.btnText}>Director</Text>
        </View>
        <TouchableOpacity style={styles.userbtn}
          onPress={() => navigation.navigate('EvaluatedTeacher',{Id:route.params.empNo})}>
          <Text style={styles.btnText}>Evaluated Teacher</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.userbtn}
          onPress={() => navigation.navigate('TeacherDetails')}>
          <Text style={styles.btnText}>Evaluation Permission</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  // container:
  // {
  //   flex:1,
  //   justifyContent:'center',
  //   backgroundColor:'#00FFFF',
  //   marginTop:'20%',
  //   marginBottom:'40%',
  //   marginLeft:20,
  //   marginRight:20,
  //   borderRadius:10,
  //   paddingBottom:100,
  // },
  texttop: {
    backgroundColor: 'orange',
    width: '50%',
    height: '10%',
    borderRadius: 10,
    marginLeft: '25%',
    //marginTop:15,
    marginBottom: 100,
  },
  userbtn: {
    backgroundColor: "#FFA07A",
    padding: 10,
    marginLeft: 20,
    marginBottom: 40,
    marginTop: 40,
    width: "90%",
    fontFamily: "SemiBold",
    borderRadius: 25,
  },
  btnText: {
    //       flexDirection:'row',
    fontSize: 25,
    textAlign: 'center',
    fontFamily: "fantasy",
    justifyContent: 'center',
    padding: 10,

  },
  innerView: {
    // flex:1,
    backgroundColor: '#00FFFF',
    borderRadius: 20,
    //  padding:20,
    //margin:70,
    marginBottom: 40,
    width: '80%',
    height: '80%',
  }
})
export default DirectorDashboard;
