// Homescreen.js
import React, { useState, useEffect } from 'react';
import { Button, View, Text, TextInput, ScrollView, ImageBackground, ActivityIndicator, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import RadioForm from "react-native-simple-radio-button";

const EvaluatedTeacher = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const [academic, setAcademic] = useState(0);
  const [administrationRatio, setAdministrationRatio] = useState(0);
  const [projectRatio, setProjectRatio] = useState(0);
  const [average, setAverage] = useState(0);
  const [selectedStaff, setSelectedStaff] = useState('All');
  const [isFetch, setIsFetch] = useState(false);

  var radio_props = [
    { label: "All", value: "All", },
    { label: "CS", value: "CS" },
    { label: "Management", value: "Management" },
  ];
  useEffect(() => {
    console.log(route.params.Id);
    // console.log(selectedStaff);
    setData([]); setIsFetch(true);
    var InsertApiURL = `http://${ip}/EmpPerformanceApi/api/Evaluation/getEvaluatedTeachers?id=${route.params.Id}`;
    fetch(InsertApiURL,
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        response.forEach(element => {
          // console.log(element);
          //getting performace ratio...
          var InsertApiURL1 = `http://${ip}/EmpPerformanceApi/api/Evaluation/getEvaluationResult1?empNo=${element.Emp_No}&staff=${selectedStaff}`;
          fetch(InsertApiURL1,
            {
              method: 'GET',
            }
          )
            .then((response) => response.json())
            .then((response) => {
              // console.log(response);
              setData(data => [...data,
              {
                Emp_No: element.Emp_No,
                Evaluation_on: element.Evaluation_on,
                Evaluation_By: element.Evaluation_By,
                AcademicPercentage: response.AcademicPercentage,
                AdministrationPercentage: response.AdministrationPercentage,
                ProjectPercentage: response.ProjectPercentage,
                AveragePercentage: response.AveragePercentage,
              }
              ])
            })
            .catch((error) => {
              alert(error)
            })
        });
      })
      .catch((error) => {
        alert(error)
      }).finally(() => setIsFetch(false));
  }, [selectedStaff])
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ backgroundColor: '#999', alignItems: 'center', padding: 10, marginBottom: 10 }}>
        <RadioForm
          //radio button
          radio_props={radio_props}
          initial={0}
          formHorizontal={true}
          labelHorizontal={true}
          buttonColor={"#2196f3"}
          animation={false}
          onPress={(value) => { console.log(value); setSelectedStaff(value) }}
          buttonsize={20}
          buttonOuterSize={30}
          selectedButtonColor={"green"}
          selectedLabelColor={"green"}
          labelStyle={{ fontSize: 20, marginRight: 10 }}
        />
      </View>
      {
        isFetch == true ? (
          <View>
            <ActivityIndicator color={'red'} size={'large'} />
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <FlatList
              contentContainerStyle={{ paddingBottom: 20 }}
              showsVerticalScrollIndicator={false}
              data={data}
              keyExtractor={(item, index) => index}
              renderItem={({ item, index }) => {
                return <View style={{ backgroundColor: '#038f7e', borderRadius: 10, marginBottom: 10, padding: 10, width: '90%', alignSelf: 'center' }}
                // onPress={()=>navigation.navigate('TeacherCourses',{Emp_No:item.Emp_No})} //navigate to teacher course screen
                >
                  <Text style={{ fontSize: 24, color: 'orange', fontStyle: 'italic', fontWeight: 'bold', textAlign: 'center' }}> {item.Evaluation_on}</Text>

                  <Text style={{ fontSize: 20, color: '#eee', textAlign: 'center' }}> Academic : {item.AcademicPercentage}%</Text>
                  <Text style={{ fontSize: 20, color: '#eee', textAlign: 'center' }}> Administration : {item.AdministrationPercentage}%</Text>
                  <Text style={{ fontSize: 20, color: '#eee', textAlign: 'center' }}> Project : {item.ProjectPercentage}%</Text>
                  <Text style={{ fontSize: 20, color: '#eee', textAlign: 'center' }}> Performace Ratio : {item.AveragePercentage}%</Text>
                </View>
              }
              }
            />
          </View>
        )
      }
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  innerView: {
    alignSelf: 'center',
    // padding: 20,
    width: '90%',
    flex: 1,
    // backgroundColor: '#EB984E',
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