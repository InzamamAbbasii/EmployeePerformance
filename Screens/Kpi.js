import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Button, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Picker } from '@react-native-picker/picker';
import { ActivityIndicator } from "react-native-paper";
const Kpi = ({ navigation }) => {
  const [academicWeight, setAcademicWeight] = useState(0);
  const [administrationWeight, setAdministrationWeight] = useState(0);
  const [projectWeight, setProjectWeight] = useState(0);
  const [catValue, setcatValue] = useState(0);
  const [catValue1, setcatValue1] = useState([{ 'Value': 0 }]);
  const [selectedStaff, setselectedStaff] = useState('CS');
  const [selectedCategory, setselectedCategory] = useState('Academic');
  const [isFetching, setIsFetching] = useState(false);
  const insertKPIWeightage = () => {

    // console.log(academicWeight,administrationWeight,projectWeight);
    var InsertApiURL = `http://${ip}/EmpPerformanceApi/api/Admin/addkpiweight1`;
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    var Data = {
      Staff: selectedStaff,
      Category: selectedCategory,
      KpiWeight: catValue,
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
  useEffect(() => {
    getSelectedKPIWeight();
  }, [selectedCategory,selectedStaff]);

  const getSelectedKPIWeight = () => {
    setIsFetching(true);
    var InsertApiURL = `http://${ip}/EmpPerformanceApi/api/Admin/getSelectedKPIWeight?staff=${selectedStaff}&category=${selectedCategory}`;
    fetch(InsertApiURL,
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setcatValue(response);
      })
      .catch((error) => {
        alert(error)
      }).finally(() => {
        setIsFetching(false);
      })
  }
  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: '#1bbb', marginHorizontal: 10, borderRadius: 15, padding: 15, minHeight: '60%' }}>
        <ScrollView>

          <Text style={styles.text}>Select Staff</Text>
          <Picker style={{ backgroundColor: '#fff', flex: 1 }}
            selectedValue={selectedStaff}
            onValueChange={(itemValue, itemIndex) =>
              setselectedStaff(itemValue)
            }>
            <Picker.Item label="CS" value="CS" />
            <Picker.Item label="Management" value="Management" />
            <Picker.Item label="All" value="All" />
          </Picker>


          <Text style={styles.text}>Select Category</Text>
          <Picker style={{ backgroundColor: '#fff', flex: 1 }}
            selectedValue={selectedCategory}
            onValueChange={(itemValue, itemIndex) => {
              setselectedCategory(itemValue)
            }
            }>
            <Picker.Item label="Academic" value="Academic" />
            <Picker.Item label="Administrative" value="Administrative" />
            <Picker.Item label="Project" value="Project" />
          </Picker>

          <View style={styles.txtView}>
            <Text style={[styles.text, { marginTop: 5 }]}>{selectedCategory}</Text>
            {
              <View style={styles.input}>
                {
                  isFetching == true ? (
                    <ActivityIndicator color="red" size={'small'} />
                  ) : (
                    <TextInput style={{fontSize:25}}
                      value={catValue.toString()}
                      onChangeText={(txt) => setcatValue(txt)}
                    />
                  )
                }
              </View>
            }
          </View>

          <TouchableOpacity style={styles.userbtn}
            onPress={() => insertKPIWeightage()}>
            <Text style={styles.btnText}>Save</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

    </View>

  );
};
const styles = StyleSheet.create({
  container:
  {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  txtView: {
    flexDirection: 'row',
    height: 60,
    flex: 1,
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 10,
    borderRadius: 25,
    alignItems: 'center',
  },
  text: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    flex: 0.8,
    flexDirection: 'row',
    justifyContent:'center',
    fontSize: 25,
    marginLeft: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    height: 50,

  },
  userbtn: {
    backgroundColor: "#FFA07A",
    padding: 15,
    borderRadius: 15,
  },
  btnText: {
    fontSize: 25,
    textAlign: 'center',
    fontFamily: "fantasy"
  }
})
export default Kpi;