import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, ImageBackground, TouchableOpacity, View } from 'react-native'
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
const TeacherDashBoard = ({ navigation,route }) => {
    const [data, setData] = useState([]);
    const [permission, setPermission] = useState('');
    useEffect(() => {
      setData([]);
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
                setData(data => [...data,
                    {
                      Emp_no: element.Emp_no,
                      Emp_firstname: element.Emp_firstname,
                      Emp_lastname: element.Emp_lastname,
                      Emp_middle: element.Emp_middle,
                      Permission:element.Permission=="Allow"?0:1,
                      // Status: element.Status,
                      Selected: '',
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
            <View style={styles.innerView}>
                <View style={styles.texttop}>
                    <Text style={styles.btnText}>Teacher</Text>
                    <Text style={styles.btnText}>{permission}</Text>
                </View>
                <TouchableOpacity style={styles.userbtn}
                    onPress={() => navigation.navigate('EvaluatedTeacher')}>
                    <Text style={styles.btnText}> Start Evaluation </Text>
                </TouchableOpacity>
               <TouchableOpacity style={styles.userbtn}
                    onPress={() => navigation.navigate('EvaluatedTeacher',{Id:route.params.empNo})}>
                    <Text style={styles.btnText}>Evaluated Teacher</Text>
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
export default TeacherDashBoard;
