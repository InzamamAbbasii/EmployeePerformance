// Homescreen.js
import React, { useEffect, useState } from 'react';
import { Button, View, Text, ToastAndroid, ScrollView, ImageBackground, StyleSheet, FlatList,TouchableOpacity } from 'react-native';
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
    var InsertApiURL = `http://192.168.1.104/EmpPerformanceApi/api/Director/allTeachersList`;
    fetch(InsertApiURL,
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        for (let index = 0; index < 10; index++) {
          const element = response[index];
          setData(data => [...data,
            {
              Emp_no: element.Emp_no,
              Emp_firstname: element.Emp_firstname,
              Emp_lastname: element.Emp_lastname,
              Emp_middle: element.Emp_middle,
              Status: element.Status,
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
        //   }
        //   ])
        // });
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  return (
    <ImageBackground source={require('../assets/Images/background.png')} resizeMode="cover" style={styles.container}>
      <View style={styles.innerView}>

        <FlatList style={{ padding: 7 }}
          data={data}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => {
            return <TouchableOpacity>
              <Text style={{ fontSize: 20, color: '#eee' }}>{item.Emp_firstname} {item.Emp_middle} {item.Emp_lastname}  </Text>
              {/* <Text style={{ fontSize: 20, color: '#eee' }}> NAme {item.Emp_firstname} </Text> */}
              <RadioForm
                style={styles.radiostyle} //radio button
                onChangeText={(text) => setgender(text)}
                radio_props={radio_props}
                initial={-1}
                formHorizontal={false}
                labelHorizontal={true}
                buttonColor={"#2196f3"}
                // animation={true}
                onPress={(value) => {
                  ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                }
                }
                buttonsize={20}
                buttonOuterSize={30}
                selectedButtonColor={"green"}
                selectedLabelColor={"white"}
                labelStyle={{ fontSize: 20,marginRight:10 }}
                 />
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
    margin: 50,
    width: '90%',
    backgroundColor: '#EB984E',
    borderRadius: 20,
  },
  radiostyle: {
    flexDirection: 'row',
    padding: 5,
    marginLeft: 5,
  },
}
)

export default TeacherDetails;