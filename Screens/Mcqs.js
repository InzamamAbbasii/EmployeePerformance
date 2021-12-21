import React,{useState} from "react";
import { View, SafeAreaView, Button, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const Mcqs = ({ navigation }) => {
  const [excellentWeight, setExcellentWeight] = useState(0);
  const [goodWeight, setGoodWeight] = useState(0);
  const [avgWeight, setAvgWeight] = useState(0);
  const [poorWeight, setPoorWeight] = useState(0);
  const insertMCQsWeightage=()=>{
    if(excellentWeight==0 || goodWeight==0 || avgWeight==0 || poorWeight==0){
      alert('Please enter required values');
    }else{
      console.log(excellentWeight,goodWeight,avgWeight,poorWeight);
      var InsertApiURL = "http://192.168.1.104/EmpPerformanceApi/api/Admin/addmcqsweight";
      var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      var Data = {
        Excellent:excellentWeight,
        Good:goodWeight,
        Average:avgWeight,
        Poor:poorWeight,
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
            <Text style={styles.text}>Excellent</Text>
            <TextInput style={styles.input}
            onChangeText={(txt)=>setExcellentWeight(txt)}
            />
          </View>
          <View style={styles.txtView}>
            <Text style={styles.text}>Good</Text>
            <TextInput style={styles.input} 
            onChangeText={(txt)=>setGoodWeight(txt)}
            />
          </View>
          <View style={styles.txtView}>
            <Text style={styles.text}>Average</Text>
            <TextInput style={styles.input} 
            onChangeText={(txt)=>setAvgWeight(txt)}
            />
          </View>
          <View style={styles.txtView}>
            <Text style={styles.text}>Poor</Text>
            <TextInput style={styles.input} 
            onChangeText={(txt)=>setPoorWeight(txt)}/>
          </View>
          <TouchableOpacity style={styles.userbtn}
            onPress={() => insertMCQsWeightage()}>
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
export default Mcqs;