import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Searchbar, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";

const Category = ({ navigation }) => {
  const [metric, setMetric] = useState('');
  const insertMetric = () => {
    if (metric.length == 0) {
      alert('Please enter metric');
    } else {
      console.log(metric);
      var InsertApiURL = `http://${ip}/EmpPerformanceApi/api/Admin/addcat`;
      var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      var Data = {
        Cat:metric,
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
  }
  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: '#1bbb', marginHorizontal: 10, borderRadius: 15, padding: 15, minHeight: '60%', justifyContent: 'center' }}>
        <Text style={styles.txt}>Add New Metric</Text>
        <TextInput
          style={styles.txtbox}
          multiline={true}
          placeholder="Enter Metric...."
          onChangeText={(txt) => setMetric(txt)}
        ></TextInput>
        <TouchableOpacity style={styles.button}
          onPress={() => Category()}>
          <Text style={styles.btnText}
            onPress={() => insertMetric()}>
            Save
          </Text>
        </TouchableOpacity >
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  txtbox: {
    backgroundColor: '#ffff',
    fontSize: 20,
    borderRadius: 10,
    padding: 10,
    marginBottom: 30,
  },
  txt: {
    fontSize: 30,
    marginBottom: 20
  },
  button: {
    backgroundColor: "#FFA07A",
    padding: 3,
    borderRadius: 15,
  },
  btnText: {
    fontSize: 25,
    textAlign: 'center',
    fontFamily: "fantasy",
    padding: 10,
  }
}
)
export default Category;