// Homescreen.js
import React, { useEffect, useState } from 'react';
import { Button, View, Text, ToastAndroid, ScrollView, ImageBackground, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
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
        for (let index = 0; index < 50; index++) {
          const element = response[index];
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
        }
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
      if(element.Selected!==''){
          console.log(element.Emp_no,element.Selected);
            // console.log(route.params.Reg_no,element.Qid,route.params.Emp_no,route.params.Course ,element.Selected,teacherName);
            var InsertApiURL = `http://${ip}/EmpPerformanceApi/api/Director/teacherPermission`;
            var headers = {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            };
            var Data = {
             Emp_no:element.Emp_no,
             Permission:element.Selected
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
                if(response=="true"){
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
    <ImageBackground source={require('../assets/Images/background.png')} resizeMode="cover" style={styles.container}>
      <View style={styles.innerView}>

        <FlatList style={{ padding: 7 }}
          data={data}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={10}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => {
            return <TouchableOpacity>
              <Text style={{ fontSize: 20, color: '#eee' }}>{item.Emp_firstname} {item.Emp_middle} {item.Emp_lastname}  </Text>
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
                selectedLabelColor={"white"}
                labelStyle={{ fontSize: 20, marginRight: 10 }}
              />
            </TouchableOpacity>
          }
          }
        />
      </View>
      <TouchableOpacity style={styles.btn} onPress={()=>detail()}>
        <Text style={styles.btnText}> Save </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  card: {
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 8,
    marginBottom: 10,
    backgroundColor: '#000',
    shadowColor: "#db6363",
    shadowOffset: {
      width: 10,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  txt: {
    width: "100%",
    fontSize: 30,
    color: 'black',
    borderRadius: 10,
  },
  innerView: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    width: '90%',
    marginVertical: 10,
    backgroundColor: '#EB984E',
    borderRadius: 20,
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
    width: '90%',
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