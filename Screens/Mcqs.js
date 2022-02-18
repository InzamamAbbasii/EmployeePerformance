import React,{useState,useEffect} from "react";
import { View, SafeAreaView, Button, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const Mcqs = ({ navigation }) => {
  const [excellentWeight, setExcellentWeight] = useState('');
  const [goodWeight, setGoodWeight] = useState('');
  const [avgWeight, setAvgWeight] = useState('');
  const [poorWeight, setPoorWeight] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    getMcqsWeight();
  }, [])
  
  const getMcqsWeight = () => {
    setIsFetching(true);
    var InsertApiURL = `http://${ip}/EmpPerformanceApi/api/Admin/getMcqsWeight`;
    fetch(InsertApiURL,
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if(response!='false'){
          setExcellentWeight(response.Excellent.toString());
          setGoodWeight(response.Good.toString());
          setAvgWeight(response.Average.toString());
          setPoorWeight(response.Poor.toString());
        }
      })
      .catch((error) => {
        alert(error)
      }).finally(() => {
        setIsFetching(false);
      })
  }

  const insertMCQsWeightage=()=>{
    if(excellentWeight.length==0 || goodWeight.length==0 || avgWeight.length==0 || poorWeight.length==0){
      alert('Please enter required values');
    }else{
      console.log(excellentWeight,goodWeight,avgWeight,poorWeight);
      var InsertApiURL = `http://${ip}/EmpPerformanceApi/api/Admin/addmcqsweight`;
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
            value={excellentWeight}
            onChangeText={(txt)=>setExcellentWeight(txt)}
            />
          </View>
          <View style={styles.txtView}>
            <Text style={styles.text}>Good</Text>
            <TextInput style={styles.input} 
            value={goodWeight}
            onChangeText={(txt)=>setGoodWeight(txt)}
            />
          </View>
          <View style={styles.txtView}>
            <Text style={styles.text}>Average</Text>
            <TextInput style={styles.input} 
            value={avgWeight}
            onChangeText={(txt)=>setAvgWeight(txt)}
            />
          </View>
          <View style={styles.txtView}>
            <Text style={styles.text}>Poor</Text>
            <TextInput style={styles.input} 
            value={poorWeight}
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