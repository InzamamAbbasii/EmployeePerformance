// Homescreen.js
import React, { useState, useEffect } from 'react';
import { Button, View, Text, TextInput, ScrollView, ImageBackground, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
const EvaluatedTeacher = ({ navigation,route }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log(route.params.Id);
    setData([]);
    var InsertApiURL = `http://${ip}/EmpPerformanceApi/api/Evaluation/getEvaluatedTeachers?id=${route.params.Id}`;
    fetch(InsertApiURL,
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((response) => {
        response.forEach(element => {
          //getting performace ratio...
          var InsertApiURL1 = `http://${ip}/EmpPerformanceApi/api/Evaluation/getEvaluationResult?empNo=${element.Emp_No}`;
          fetch(InsertApiURL1,
              {
                  method: 'GET',
              }
          )
              .then((response) => response.json())
              .then((response) => {
                  console.log(response);
                  setData(data => [...data,
                  {
                      Emp_No: element.Emp_No,
                      Evaluation_on: element.Evaluation_on,
                      Evaluation_By: element.Evaluation_By,
                      Academic: response.Academic,
                      Administration: response.Administration,
                      Project: response.Project,
                      Average: response.Average,
                  }
                  ])
              })
              .catch((error) => {
                  console.log(error)
              })
          //

      });
      })
      .catch((error) => {
        alert(error)
      })
  }, [])
  return (
    <ImageBackground source={require('../assets/Images/background.png')} resizeMode="cover" style={styles.container}>
      <View style={styles.innerView} >
        <FlatList style={{ padding: 7 }}
          data={data}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => {
            return <TouchableOpacity style={{ backgroundColor: '#038f7e', borderRadius: 10, marginBottom: 10, padding: 10 }}
            // onPress={()=>navigation.navigate('TeacherCourses',{Emp_No:item.Emp_No})}
            >
              <Text style={{ fontSize: 20, color: '#eee', textAlign: 'center' }}> {item.Evaluation_on}</Text>
              <Text style={{ fontSize: 20, color: '#eee', textAlign: 'center' }}> Performace Ratio : {item.Average}</Text>
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