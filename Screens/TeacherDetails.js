// Homescreen.js
import React, { useEffect, useState } from 'react';
import { Button, View, Text, ToastAndroid, ScrollView, ImageBackground, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import RadioForm from "react-native-simple-radio-button";
import CheckBox from '@react-native-community/checkbox';
var radio_props = [
  { label: "Allow", value: "Allow", },
  { label: "Not Allow", value: "Not Allow" },
];
const TeacherDetails = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [isFetched, setIsFetched] = useState(true);
  useEffect(() => {
    setData([]);
    var InsertApiURL = `http://${ip}/EmpPerformanceApi/api/Director/allTeachersList`;
    fetch(InsertApiURL,{
        method: 'GET',
      }).then((response) => response.json())
      .then((response) => {
        for (let index = 0; index < 10; index++) {
          const element = response[index];
          console.log(element);
          setData(data => [...data,
          {
            Emp_no: element.Emp_no,
            Emp_firstname: element.Emp_firstname,
            Emp_lastname: element.Emp_lastname,
            Emp_middle: element.Emp_middle,
            Permission: element.Permission == "Allow" ? 0 : 1,
            AcademicPermission: element.AcademicPermission=="true"?true:false,
            AdministrationPermission:element.AdministrationPermission=="true"?true:false,
            ProjectPermission:element.ProjectPermission=="true"?true:false,
            ShowCheckBoxes:element.Permission == "Allow" ? true : false,
            // Status: element.Status,
            Selected: '',
          }
          ])
        }
        setIsFetched(false);
        // response.forEach(element => {
        //   setData(data => [...data,
        //   {
        //     Emp_no: element.Emp_no,
        //     Emp_firstname: element.Emp_firstname,
        //     Emp_lastname: element.Emp_lastname,
        //     Emp_middle: element.Emp_middle,
        //     Status: element.Status,
        // Permission:element.Permission,
        //  Selected: '',
        //   }
        //   ])
        // });
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  const onChangeValue = (qid, item,callerValue) => {
    const newData = data.map(item => {
      if (item.Emp_no == qid) {
        return {
          ...item,
          Selected: callerValue,
          Permission:callerValue=='Not Allow'?'Not Allow':'Allow',
          ShowCheckBoxes:callerValue=='Not Allow'?false:true,//true when allow button press else false
          AcademicPermission:callerValue==0?!item.AcademicPermission:item.AcademicPermission,//0 when click on checkbox of Academic
          AdministrationPermission:callerValue==1?!item.AdministrationPermission:item.AdministrationPermission,//1 when click on checkbox of administration
          ProjectPermission:callerValue==2?!item.ProjectPermission:item.ProjectPermission//2 whens click on checkbox of project
        }
      } else {
        return {
          ...item,
        }
      }
    })
    setData(newData);
  }
  const detail = () => {
    data.forEach(element => {
      if (element.Selected !== '') {
        console.log('..........................');
        console.log(element,element.AcademicPermission);
        // console.log(route.params.Reg_no,element.Qid,route.params.Emp_no,route.params.Course ,element.Selected,teacherName);
        var InsertApiURL = `http://${ip}/EmpPerformanceApi/api/Director/teacherPermission`;
        var headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        };
        var Data = {
          Emp_no: element.Emp_no,
          Permission:element.Permission,
          AcademicPermission:element.AcademicPermission,
          AdministrationPermission:element.AdministrationPermission,
          ProjectPermission:element.ProjectPermission
        }
        fetch(InsertApiURL,
          {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(Data)
          }
        )
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
            if (response == "true") {
              alert("Data Saved Successfully!")
            }
            // ToastAndroid.show(response, ToastAndroid.LONG);
          })
          .catch((error) => {
            let errorMsg = error;
            alert(error);
            // ToastAndroid.show(errorMsg, ToastAndroid.LONG);
          })
      }
    });
  }
  return (
    <View style={styles.container} >
      {
        isFetched == true ? (
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : (
          <View style={{ width: '100%', padding: 20 }}>
            <FlatList style={{ padding: 7 }} showsVerticalScrollIndicator={false}
              data={data}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              windowSize={10}
              keyExtractor={(item, index) => index}
              renderItem={({ item, index }) => {
                return (<View style={styles.card}>
                  <Text style={{ fontSize: 20, color: '#000', }}>{item.Emp_firstname} {item.Emp_middle} {item.Emp_lastname}  </Text>
                  {/* <Text style={{ fontSize: 20, color: '#eee' }}> NAme {item.Emp_firstname} </Text> */}
                  <RadioForm
                    style={styles.radiostyle} //radio button
                    onChangeText={(text) => setgender(text)}
                    radio_props={radio_props}
                    initial={item.Permission}
                    formHorizontal={false}
                    labelHorizontal={true}
                    buttonColor={"#2196f3"}
                    // animation={true}
                    onPress={(value) => {onChangeValue(item.Emp_no,item,value)}}
                    buttonsize={20}
                    buttonOuterSize={30}
                    selectedButtonColor={"green"}
                    selectedLabelColor={"green"}
                    labelStyle={{ fontSize: 20, marginRight: 10 }}
                  />
                  {
                    item.ShowCheckBoxes == true? (
                      <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <CheckBox
                            disabled={false}
                            value={item.AcademicPermission}
                            onValueChange={(value) => onChangeValue(item.Emp_no, item,0)}
                          />
                          <Text style={{ fontSize: 18, color: '#222' }}>Academic</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <CheckBox
                            disabled={false}
                            value={item.AdministrationPermission}
                            onValueChange={(value) => onChangeValue(item.Emp_no, item,1)}
                          />
                          <Text style={{ fontSize: 18, color: '#222' }}>Administration</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <CheckBox
                            disabled={false}
                            value={item.ProjectPermission}
                            onValueChange={(value) => onChangeValue(item.Emp_no, item,2)}
                          />
                          <Text style={{ fontSize: 18, color: '#222' }}>Project</Text>
                        </View>
                      </View>
                    ):(<View></View>)
                  }
                </View>
                )
              }
              }
            />
            <TouchableOpacity style={styles.btn} onPress={() => detail()}>
              <Text style={styles.btnText}> Save </Text>
            </TouchableOpacity>
          </View>
        )
      }
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd'
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  card: {
    borderRadius: 20,
    width: '100%',
    // marginHorizontal: 8,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#eee',
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 2.32,
    shadowRadius: 20.46,

    elevation: 5,
  },
  txt: {
    width: "100%",
    fontSize: 30,
    color: 'black',
    borderRadius: 10,
  },
  radiostyle: {
    flexDirection: 'row',
    padding: 5,
    marginLeft: 5,
  },
  btn: {
    backgroundColor: "red",
    borderRadius: 20,
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    fontSize: 20,
    fontWeight: "bold",
    color: '#fff',
    fontFamily: "IndieFlower-Regular",
  },
}
)

export default TeacherDetails;