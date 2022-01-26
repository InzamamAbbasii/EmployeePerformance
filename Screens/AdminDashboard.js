import React, { useState,useEffect } from "react";
import { View, Button, StyleSheet, TouchableOpacity, ImageBackground, Text, Searchbar } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { Switch } from "react-native-paper";
const AdminDashboard = ({ navigation }) => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const onToggleSwitch = () => updateStudentPermission();
  const updateStudentPermission = () => {
    setIsSwitchOn(!isSwitchOn)
    var InsertApiURL = `http://${ip}/EmpPerformanceApi/api/Admin/setStudentEvaluationPermission?permission=${!isSwitchOn}`;
    fetch(InsertApiURL,
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((response) => {
        if(response=='true') alert('Saved Successfully!')
      })
      .catch((error) => {
        alert(error)
      })
  }
  useEffect(() => {
    var InsertApiURL = `http://${ip}/EmpPerformanceApi/api/Admin/getStudentEvaluationPermission`;
    fetch(InsertApiURL,
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log('response ::: ',response);
        if(response=='true')
        setIsSwitchOn(true);
        else
        setIsSwitchOn(false);
      })
      .catch((error) => {
        alert(error)
      })
  }, []);
  
  return (
    <ImageBackground source={require('../assets/Images/admnImg.jpg')} resizeMode="cover" style={styles.container}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Question')}
          style={styles.button}>
          <Text style={styles.buttonText}>Add Question</Text>
          <Feather name="plus-square" size={25} color="#fff" />
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => navigation.navigate('AdminScreen')}
      style={styles.button}>
      <Text style={styles.buttonText}>Appraisal</Text>
    </TouchableOpacity> */}
        {/* <TouchableOpacity onPress={() => navigation.navigate('AdminScreen')}
      style={styles.button}>
      <Text style={styles.buttonText}>Evaluation</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('Question')}
      style={styles.button}>
      <Text style={styles.buttonText}>Questionnaire</Text>
    </TouchableOpacity> */}
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}
          style={styles.button}>
          <Text style={styles.buttonText}>Settings</Text>
          <Feather name="settings" size={25} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity disabled={true}
          // onPress={() => navigation.navigate('StudentPermission')}
          style={styles.button}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Is Students Allows for Evaluation?</Text>
          <Switch value={isSwitchOn} color={'red'} onValueChange={onToggleSwitch} />
        </TouchableOpacity>
        {/* <View style={styles.bottomtab}>
      <View>
        <TouchableOpacity   //bottom-tab using vector
          onPress={() => navigation.navigate('Login')}>
          <Icon name="home" size={25} style={styles.iconstyle} color="#900" />
        </TouchableOpacity>
        <Text style={styles.icontxt}>Home</Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Director')}>
          <Feather name="users" size={25} color="#900" />
        </TouchableOpacity>
        <Text style={styles.icontxt}>Profile</Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Settings')}>
          <Feather name="settings" size={25} style={styles.iconstyle} color="#900" />
        </TouchableOpacity>
        <Text style={styles.icontxt}>Settings</Text>
      </View>
    </View> */}
      </View>
    </ImageBackground>
  )
};
const styles = StyleSheet.create({
  container:
  {
    flex: 1,
    justifyContent: 'center',
    padding: 10,

  },
  button: {
    elevation: 80,
    backgroundColor: "#009688",
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 25,
    margin: 10,
  },
  buttonText: {
    fontSize: 20,
    color: "#FFD700",
    alignSelf: 'center',
    // alignContent: 'center',
    fontWeight: "bold",
    fontStyle: 'italic',
    textTransform: "uppercase",
    marginBottom: 10
  },
  // bottomtab: {
  //   marginTop: '40%',
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   backgroundColor: 'white',
  //   borderRadius: 10,
  //   width: '100%',
  //   padding: 5,
  //   alignItems: 'stretch'
  // },
  icontxt: {
    fontSize: 25,
    color: 'black',
    alignSelf: 'flex-end',
  },
  // iconstyle: {
  //   paddingRight: 10,
  //   fontFamily: "SemiBold",
  // }
});
export default AdminDashboard;