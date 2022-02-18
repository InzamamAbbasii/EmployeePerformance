import React from 'react'
import { StyleSheet, Text, ImageBackground, TouchableOpacity, View ,ScrollView} from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
const DirectorDashboard = ({ navigation, route }) => {
  console.log(route.params);
  return (
    <ImageBackground source={require('../assets/Images/background.png')} resizeMode="cover" style={styles.container}>
      <View style={styles.innerView}>
        <ScrollView>
        <View style={styles.texttop}>
          <Text style={styles.btnText}>Director DashBoard</Text>
        </View>
        <TouchableOpacity style={styles.userbtn}
          onPress={() => navigation.navigate('ChooseEvaluationType_Director', { Id: route.params.empNo, Role: 'Director' })}>
          <Text style={styles.btnText}> Start Evaluation </Text>
          <Feather name="chevron-right" size={25} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.userbtn}
          onPress={() => navigation.navigate('EvaluatedTeacher', { Id: route.params.empNo })}>
          <Text style={styles.btnText}>Evaluated Teacher</Text>
          <Feather name="chevron-right" size={25} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.userbtn}
          onPress={() => navigation.navigate('TeacherDetails')}>
          <Text style={styles.btnText}>Evaluation Permission</Text>
          <Feather name="chevron-right" size={25} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.userbtn}
          onPress={() => navigation.navigate('TeacherPerformace_Director', { Id: route.params.empNo })}>
          <Text style={styles.btnText}> View Performace </Text>
          <Feather name="bar-chart" size={25} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.userbtn}
          onPress={() => navigation.navigate('AllocateTask', { Id: route.params.empNo })}>
          <Text style={styles.btnText}>  Allocate Task </Text>
          <Feather name="chevron-right" size={25} color="#000" />
        </TouchableOpacity>

        {/* for task  start*/}
        
        {/* show list of teacher who is not evalualted by any person */}
        <TouchableOpacity style={styles.userbtn}
          onPress={() => navigation.navigate('NotEvaluatedTeachers', { Id: route.params.empNo })}>
          <Text style={styles.btnText}>Not Evaluated Teacher</Text>
          <Feather name="chevron-right" size={25} color="#000" />
        </TouchableOpacity>
       
       {/* show performance of all evaluated teachers based on teacher own kpi weightage*/}
        <TouchableOpacity style={styles.userbtn}
          onPress={() => navigation.navigate('TeacherPerformace_Director1', { Id: route.params.empNo })}>
          <Text style={styles.btnText}> View Performace on Emp Kpi </Text>
          <Feather name="bar-chart" size={25} color="#000" />
        </TouchableOpacity>

        {/* for task  end*/}
        </ScrollView>
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
    minHeight: 50,
    padding: 10,
    //borderRadius: 10,
    alignSelf: 'center'
    //marginTop:15,
  },
  userbtn: {
    backgroundColor: "#FFA07A",
    // marginLeft: 20,
    // marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 15,
    width: "92%",
    padding: 25,
    elevation: 100,
    fontFamily: "SemiBold",
    borderRadius: 10,
  },
  btnText: {
    fontSize: 25,
    padding: 1,
    //  fontFamily: "IndieFlower-Regular",
    textAlign: 'center',
    // fontFamily: "fantasy",
    justifyContent: 'center',
  },
  innerView: {
    // flex:1,
    backgroundColor: '#00FFFF',
    borderRadius: 20,
    paddingBottom: 20,
    //margin:70,
    marginBottom: 40,
    width: '90%',
    marginTop: 20,
    minHeight: 180,
  }
})
export default DirectorDashboard;
