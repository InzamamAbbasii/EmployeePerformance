import React from 'react'
import { StyleSheet, Text, ImageBackground, TouchableOpacity, View } from 'react-native'
const DirectorDashboard = ({ navigation,route }) => {
  console.log(route.params);
  return (
    <ImageBackground source={require('../assets/Images/background.png')} resizeMode="cover" style={styles.container}>
      <View style={styles.innerView}>
        <View style={styles.texttop}>
          <Text style={styles.btnText}>Director DashBoard</Text>
        </View>
        <TouchableOpacity style={styles.userbtn}
          onPress={() => navigation.navigate('TeachersList_Director',{Id:route.params.empNo,Role:'Director'})}>
          <Text style={styles.btnText}> Start Evaluation </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.userbtn}
          onPress={() => navigation.navigate('EvaluatedTeacher',{Id:route.params.empNo})}>
          <Text style={styles.btnText}>Evaluated Teacher</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.userbtn}
          onPress={() => navigation.navigate('TeacherDetails')}>
          <Text style={styles.btnText}>Evaluation Permission</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.userbtn}
          onPress={() => navigation.navigate('TeacherPerformace_Director',{Id:route.params.empNo})}>
          <Text style={styles.btnText}> View Performace </Text>
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
  texttop: {
    backgroundColor: 'orange',
    // height: '10%',
    minHeight:50,
    padding:10,
    borderRadius: 10,
      alignSelf:'center'
    //marginTop:15,
  },
  userbtn: {
    backgroundColor: "#FFA07A",
    marginLeft: 20,
    marginTop: 40,
    width: "90%",
    height:90,
    fontFamily: "SemiBold",
    borderRadius: 15,
    justifyContent:'center'
  },
  btnText: {
    fontSize: 25,padding:10,
    textAlign: 'center',
    fontFamily: "fantasy",
    justifyContent: 'center',
  },
  innerView: {
    // flex:1,
    backgroundColor: '#00FFFF',
    borderRadius: 20,
     paddingBottom:20,
    //margin:70,
    marginBottom: 40,
    width: '90%',
    marginTop:20,
    minHeight:180,
  }
})
export default DirectorDashboard;
