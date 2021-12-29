// Homescreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import Questionnaire from './Questionnaire';
import { Picker } from '@react-native-picker/picker';
const Question = ({ navigation }) => {
  const [selectedQuestionType, setSelectedQuestionType] = useState('Acedamic');
  const [question, setQuestion] = useState('');
  const insertQuestion = () => {
    console.log(selectedQuestionType, question)
    if (question.length == 0) {
      alert('Please Enter Question');
    } else {
      var InsertApiURL = `http://${ip}/EmpPerformanceApi/api/Admin/AddQuestion`;
      var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      var Data = {
        Question:question,
        Category:selectedQuestionType,
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
    // <ImageBackground source={require('../assets/Images/chat.jpg')} resizeMode="cover" style={styles.container}>
    <View style={styles.container}>
      <View style={styles.innerView}>
        <ScrollView >
          <Text style={styles.top}>Add Question</Text>
          <TextInput style={styles.textbox}
            placeholder="Enter Question"
            multiline={true}
            onChangeText={(text) => setQuestion(text)}>
          </TextInput>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', marginHorizontal: 15, paddingHorizontal: 10, borderRadius: 15, marginBottom: 20 }}>
            <Text style={{ flex: 0.8, fontWeight: 'bold', fontSize: 17 }}>Select Metric</Text>
            <Picker style={{ flex: 1.2 }}
              selectedValue={selectedQuestionType}
              mode='dropdown'
              onValueChange={(itemValue, itemIndex) =>
                setSelectedQuestionType(itemValue)
              }>
              <Picker.Item label="Acedamic" value="Acedamic" />
              <Picker.Item label="Administration" value="Administration" />
              <Picker.Item label="Project" value="Project" />
            </Picker>
          </View>
          <View style={styles.buttonView} >
            {/* <Button style={styles.text} 
           title ="Save"
           onPress={() => navigation.navigate('Questionnaire')}/>   */}
            <TouchableOpacity style={styles.userbtn} onPress={() => insertQuestion()}>
              <Text style={styles.btnText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.userbtn} onPress={() => navigation.navigate('Questionnaire')}>
              <Text style={styles.btnText}>View</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
    // </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  innerView: {
    minHeight: '50%',
    backgroundColor: '#1bbb',
    borderRadius: 20,
    width: '93%',
    paddingBottom: 15,
  },
  userbtn: {
    backgroundColor: "red",
    flex: 1,
    borderRadius: 20,
    marginHorizontal: 15,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    fontSize: 20,
    fontWeight: "bold",
    color: '#fff',
    fontFamily: "IndieFlower-Regular",
  },
  textbox: {
    width: "90%",
    backgroundColor: "#fffff4",
    margin: 30,
    fontSize: 25,
    borderRadius: 10,
    alignSelf: 'center',
  },
  buttonView: {
    flexDirection: 'row',
    flex: 1,
  },
  top: {
    fontSize: 40,
    fontFamily: "IndieFlower-Regular",
    color: "#000000",
    margin: 40,
    borderBottomWidth: 1
  },

}
)
export default Question;