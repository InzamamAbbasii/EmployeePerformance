// Homescreen.js
import React, { useEffect, useState } from 'react';
import { Button, View, Text, ToastAndroid, ScrollView, ImageBackground, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
var radio_props = [
  //radio button
  { label: "Allow", value: "Allow", },
  { label: "Not Allow", value: "Not Allow" },
];
const TeacherDetails = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [isFetched, setIsFetched] = useState(true);
  useEffect(() => {
    setData([]);
    var InsertApiURL = `http://${ip}/EmpPerformanceApi/api/Director/allTeachersList`;
    fetch(InsertApiURL,
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((response) => {
        for (let index = 0; index < 10; index++) {
          const element = response[index];
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
  const onChangeValue = (qid, itemSelected) => {
    // console.log(qid, itemSelected);
    const newData = data.map(item => {
      if (item.Emp_no == qid) {
        return {
          ...item,
          Selected: itemSelected,
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
        console.log(element.Emp_no, element.Selected);
        // console.log(route.params.Reg_no,element.Qid,route.params.Emp_no,route.params.Course ,element.Selected,teacherName);
        var InsertApiURL = `http://${ip}/EmpPerformanceApi/api/Director/teacherPermission`;
        var headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        };
        var Data = {
          Emp_no: element.Emp_no,
          Permission: element.Selected
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
                  {/* <TouchableOpacity style={{margin:20,backgroundColor:'#eee'}}> */}
                    <Text style={{ fontSize: 20, color: '#000',}}>{item.Emp_firstname} {item.Emp_middle} {item.Emp_lastname}  </Text>
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
                      onPress={(value) => {
                        onChangeValue(item.Emp_no, value)
                        // ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                      }}
                      buttonsize={20}
                      buttonOuterSize={30}
                      selectedButtonColor={"green"}
                      selectedLabelColor={"green"}
                      labelStyle={{ fontSize: 20, marginRight: 10 }}
                    />
                  {/* </TouchableOpacity> */}
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
    padding:15,
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