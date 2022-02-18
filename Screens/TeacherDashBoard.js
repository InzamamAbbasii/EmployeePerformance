import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, ImageBackground, TouchableOpacity, View } from 'react-native'
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
const TeacherDashBoard = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const [permission, setPermission] = useState('');
  const [academicPermission, setAcademicPermission] = useState(false);
  const [administrationPermission, setAdministrationPermission] = useState(false);
  const [projectPermission, setProjectPermission] = useState(false);
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
          setPermission(element.Permission == 1 ? true : false);
          setEmpName(element.Emp_firstname + element.Emp_middle + " " + element.Emp_lastname)
          setAcademicPermission(element.AcademicPermission == "true" ? true : false);
          setAdministrationPermission(element.AdministrationPermission == "true" ? true : false)
          setProjectPermission(element.ProjectPermission == "true" ? true : false)
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

    //getting performace ratio... from api
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
    <ImageBackground source={require('../assets/Images/back.png')} resizeMode="cover" style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={styles.texttop}>
          <Text style={styles.btnText}>{empName}</Text>
        </View>
        {/* <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 5 }}>Performace Ratio : </Text>
        <View>
          <Text style={{ fontSize: 20, fontWeight: '500', marginLeft: 30 }}>Academic : {academic}</Text>
          <Text style={{ fontSize: 20, fontWeight: '500', marginLeft: 30 }}>Administration : {administrationRatio}</Text>
          <Text style={{ fontSize: 20, fontWeight: '500', marginLeft: 30 }}>Project : {projectRatio}</Text>
          <Text style={{ fontSize: 20, fontWeight: '500', marginLeft: 30 }}>Average : {average}</Text>
        </View> */}
        <TouchableOpacity style={[styles.userbtn, permission == true ? { backgroundColor: '#FFA07A' } : { backgroundColor: '#cccccc' }]} disabled={!permission}
          onPress={() => navigation.navigate('ChooseEvaluationType', { Id: route.params.empNo, AcademicPermission: academicPermission, AdministrationPermission: administrationPermission })}>
          <Text style={styles.btnText}> Start Evaluation </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.userbtn}
          onPress={() => navigation.navigate('EvaluatedTeacher', { Id: route.params.empNo })}>
          {
            permission == true ? (
              <Text style={styles.btnText}>Evaluated Teacher</Text>
            ) : (
              <Text style={styles.btnText}>View Performace</Text>
            )
          }
        </TouchableOpacity>


        {/*-------------------------------- FOR TASK START------------------------------------  */}
        {/* uncomment this button to add kpi bases on Employee Id */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Kpi1', { Id: route.params.empNo })}
          style={styles.kpibutton}>
          <Text style={styles.kpibuttonText}> ADD KPI Weightage</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.userbtn}
          onPress={() => navigation.navigate('EvaluatedTeacherByKpi', { Id: route.params.empNo })}>
          {
            permission == true ? (
              <Text style={styles.btnText}>Evaluated Teacher By Kpi </Text>
            ) : (
              <Text style={styles.btnText}>View Performace By Kpi</Text>
            )
          }
        </TouchableOpacity>


        {/*-------------------------------- FOR TASK END------------------------------------  */}
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
  kpibutton:{
      backgroundColor: "#000",
      borderRadius: 30,
      height: 80,
      marginHorizontal: 10,
      justifyContent: 'center',
      marginVertical: 10,
      marginTop:30,
  },
  kpibuttonText:{
      fontSize: 20,
      color: "#FFFFFF",
      alignContent: 'center',
      fontWeight: "bold",
      fontFamily: '',
      fontStyle: 'italic',
      alignSelf: "center",
      textTransform: "uppercase",
      marginBottom: 10
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
