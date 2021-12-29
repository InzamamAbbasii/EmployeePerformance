import React,{useState} from "react";
import { View, SafeAreaView, Button, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const Kpi = ({ navigation }) => {
  const [academicWeight, setAcademicWeight] = useState(0);
  const [administrationWeight, setAdministrationWeight] = useState(0);
  const [projectWeight, setProjectWeight] = useState(0);
  const insertKPIWeightage=()=>{
    if(academicWeight==0 || administrationWeight==0 || projectWeight==0){
      alert('Please enter required values');
    }else{
      // console.log(academicWeight,administrationWeight,projectWeight);
      var InsertApiURL = `http://${ip}/EmpPerformanceApi/api/Admin/addkpiweight`;
      var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      var Data = {
        Academic:academicWeight,
        Administration:administrationWeight,
        Project:projectWeight,
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
      <View style={{ backgroundColor: '#1bbb', marginHorizontal: 10, borderRadius: 15, padding: 15, minHeight: '60%' }}>
        <ScrollView>

          <View style={styles.txtView}>
            <Text style={styles.text}>Academic</Text>
            <TextInput style={styles.input}
            onChangeText={(text)=>setAcademicWeight(text)}
            />
          </View>
          <View style={styles.txtView}>
            <Text style={styles.text}>Administration</Text>
            <TextInput style={styles.input} 
            onChangeText={(text)=>setAdministrationWeight(text)}
            />
          </View>
          <View style={styles.txtView}>
            <Text style={styles.text}>Project</Text>
            <TextInput style={styles.input} 
            onChangeText={(txt)=>setProjectWeight(txt)}
            />
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
    marginBottom: 30,
    marginLeft: 10,
    borderRadius: 25,
    alignItems: 'center',
  },
  text: {
    flex: 1.2,
    fontSize: 25,
    marginLeft: 10
  },
  input: {
    flex: 0.8,
    flexDirection: 'row',
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