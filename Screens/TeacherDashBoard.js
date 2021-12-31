import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, ImageBackground, TouchableOpacity, View } from 'react-native'
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
const TeacherDashBoard = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const [permission, setPermission] = useState('');
  const [average, setAverage] = useState(0);
  const [academic, setAcademic] = useState(0);
  const [administrationRatio, setAdministrationRatio] = useState(0);
  const [projectRatio, setProjectRatio] = useState(0);
  const [empName, setEmpName] = useState('');
  useEffect(() => {
    setData([]);
    //getting permession...
    var InsertApiURL = `http://${ip}/EmpPerformanceApi/api/Student/getteacherbycourse?empNo=${route.params.empNo}`;
    fetch(InsertApiURL,
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((response) => {
        response.forEach(element => {
          setPermission(element.Permission);
          setEmpName(element.Emp_firstname + element.Emp_middle + " " + element.Emp_lastname)
          setData(data => [...data,
          {
            Emp_no: element.Emp_no,
            Emp_firstname: element.Emp_firstname,
            Emp_lastname: element.Emp_lastname,
            Emp_middle: element.Emp_middle,
            Permission: element.Permission == "Allow" ? 0 : 1,
            // Status: element.Status,
            Selected: '',
          }
          ])
        });
      })
      .catch((error) => {
        console.log(error)
      })

    //getting performace ratio...
    var InsertApiURL = `http://${ip}/EmpPerformanceApi/api/Evaluation/getEvaluationResult?empNo=${route.params.empNo}`;
    fetch(InsertApiURL,
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((response) => {
        setAcademic(response.Academic);
        setAdministrationRatio(response.Administration);
        setProjectRatio(response.Project);
        setAverage(response.Average);
      })
      .catch((error) => {
        alert(error)
      })

  }, [])
  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <View style={styles.texttop}>
        <Text style={styles.btnText}>{empName}</Text>
      </View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 5 }}>Performace Ratio : </Text>
      <View>
        <Text style={{ fontSize: 20, fontWeight: '500', marginLeft: 30 }}>Academic : {academic}</Text>
        <Text style={{ fontSize: 20, fontWeight: '500', marginLeft: 30 }}>Administration : {administrationRatio}</Text>
        <Text style={{ fontSize: 20, fontWeight: '500', marginLeft: 30 }}>Project : {projectRatio}</Text>
        <Text style={{ fontSize: 20, fontWeight: '500', marginLeft: 30 }}>Average : {average}</Text>
      </View>
      {
        permission == "Allow" ? (
          <TouchableOpacity style={styles.userbtn}
            onPress={() => navigation.navigate('ChooseEvaluationType', { Id: route.params.empNo })}>
            <Text style={styles.btnText}> Start Evaluation </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[styles.userbtn,{backgroundColor:'#cccccc'}]} disabled={true}
            onPress={() => navigation.navigate('ChooseEvaluationType', { Id: route.params.empNo })}>
            <Text style={styles.btnText}> Start Evaluation </Text>
          </TouchableOpacity>
        )
      }
      <TouchableOpacity style={styles.userbtn}
        onPress={() => navigation.navigate('EvaluatedTeacher', { Id: route.params.empNo })}>
        <Text style={styles.btnText}>Evaluated Teacher</Text>
      </TouchableOpacity>
    </View>
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
    width: '90%',
    height: '10%',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  userbtn: {
    backgroundColor: "#FFA07A",
    padding: 10,
    marginLeft: 20,
    marginTop: 20,
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
    borderRadius: 15,
    marginBottom: 15,
    width: '80%',
    height: '80%',
  }
})
export default TeacherDashBoard;
