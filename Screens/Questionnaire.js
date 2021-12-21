import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ToastAndroid,
  ImageBackground,
  FlatList,
} from "react-native";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
var radio_props = [
  //radio button
  { label: "Excellent ", value: "Excellent", },
  { label: "Good", value: "Good" },
  { label: "Average", value: "Average" },
  { label: "Poor", value: "Poor" }

];
const Questionnaire = ({ navigation }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData([]);
    var InsertApiURL = `http://192.168.1.104/EmpPerformanceApi/api/Admin/getQuestions`;
    fetch(InsertApiURL,
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((response) => {

        response.forEach(element => {
          setData(data => [...data, {
            Qid: element.Qid,
            Question: element.Question,
            Category: element.Category,
          }])
        });
        console.log(data);
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index}
        renderItem={(item, index) =>
          <View style={styles.card}>
            <Text style={styles.question}>Question# {item.item.Qid}</Text>
            <Text style={styles.question}>{item.item.Question}</Text>
            <RadioForm
              style={styles.radiostyle} //radio button
              onChangeText={(text) => setgender(text)}
              radio_props={radio_props}
              initial={-1}
              formHorizontal={false}
              labelHorizontal={true}
              buttonColor={"#2196f3"}
              animation={true}
              onPress={(value) => {
                ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
              }
              }
              buttonsize={20}
              buttonOuterSize={30}
              selectedButtonColor={"green"}
              selectedLabelColor={"red"}
              labelStyle={{ fontSize: 20 }} />
          </View>
        }
      />
      <TouchableOpacity style={styles.btn}
        onPress={() => navigation.navigate('Question')}>
        <Text style={styles.btnText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    padding: 15,
  },
  card: {
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 30,

    elevation: 8,
  },
  question: {
    fontSize: 25,
    marginBottom: 5,
    fontStyle: 'italic',
    color: '#000000',
  },
  options: {
    fontSize: 25,
    color: '#0000FF',
  },
  btn: {
    backgroundColor: '#008080',
    height: 60,
    width: 60,
    position: 'absolute',
    top: '88%',
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 90
  },
  btnText: {
    fontSize: 40,
    color: 'white',
    alignSelf: 'center',
  },
  radiostyle: {
    paddingLeft: 5,
    marginBottom: 10,
  },
}
)
export default Questionnaire;