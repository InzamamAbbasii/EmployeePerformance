// Homescreen.js
import React, { useState, useEffect } from 'react';
import { Button, View, Text, TextInput, ScrollView, ImageBackground, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
const EvaluatedTeacher = ({ navigation }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData([]);
    var InsertApiURL = `http://192.168.1.104/EmpPerformanceApi/api/Director/getEvaluatedTeachers`;
    fetch(InsertApiURL,
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((response) => {
        response.forEach(element => {
          setData(data => [...data,
          {
            ID: element.Emp_no,
            Reg_No: element.Emp_firstname,
            QuestionId: element.QuestionId,
            Emp_No: element.Emp_No,
            Course: element.Course,
            Weight: element.Weight,
            tName: element.tName,
          }
          ])
        });
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  return (
    <ImageBackground source={require('../assets/Images/background.png')} resizeMode="cover" style={styles.container}>
      <View style={styles.innerView} >
        <FlatList style={{ padding: 7 }}
          data={data}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => {
            return <TouchableOpacity >
              <Text style={{ fontSize: 20, color: '#eee', textAlign: 'center' }}> {item.tName}</Text>
            </TouchableOpacity>
          }
          }
        />
      </View>

    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerView: {
    alignSelf: 'center',
    padding: 20,
    width: '80%',
    backgroundColor: 'white',
    backgroundColor: '#EB984E',
    borderRadius: 20,
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'

  },
  txt: {
    width: "110%",
    backgroundColor: "#fffff4",
    margin: 20,
    padding: 10,
    fontSize: 25,
    textAlign: 'auto',
    //textAlign:'center',
    color: 'black',
    borderRadius: 10,
  },
  input: {
    flex: 1,
    fontSize: 25,
    marginLeft: 10,
    backgroundColor: 'white'
  },
  text: {
    margin: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
}
)

export default EvaluatedTeacher;