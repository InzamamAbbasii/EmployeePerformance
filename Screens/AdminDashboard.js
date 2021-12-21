import React from "react";
import { View, Button, StyleSheet, TouchableOpacity, Text, Searchbar } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
const AdminDashboard = ({ navigation }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={() => navigation.navigate('Question')}
      style={styles.button}>
      <Text style={styles.buttonText}>Add Question</Text>
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
);
const styles = StyleSheet.create({
  container:
  {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00FFFF',
    padding: 10,

  },
  button: {
    elevation: 80,
    backgroundColor: "#009688",
    borderRadius: 20,
    // paddingVertical: 50,
    // paddingHorizontal: 50,
    // paddingBottom:20,
    padding: 25,
    marginBottom: 20,
    marginTop: 20
  },
  buttonText: {
    fontSize: 20,
    color: "#FFD700",
    alignContent: 'center',
    fontWeight: "bold",
    fontFamily: '',
    fontStyle: 'italic',
    alignSelf: "center",
    textTransform: "uppercase",
    marginBottom: 10
  },
  bottomtab: {
    marginTop: '40%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
    padding: 5,
    alignItems: 'stretch'
  },
  icontxt: {
    fontSize: 15,
    color: 'black',
    alignItems: 'center',
  },
  iconstyle: {
    paddingRight: 10,
    fontFamily: "SemiBold",
  }
});
export default AdminDashboard;